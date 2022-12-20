import React, {useState} from 'react';
import {View, Text, Picker, TextInput, Button, Image} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const CropForm = () => {
  const [crop, setCrop] = useState('');
  const [pap, setPap] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [page, setPage] = useState('form'); // add a page state to track which page to display
  const [formData, setFormData] = useState({}); // add a state to store the form data

  // Fetch the list of crops from Django API
  const fetchcrops = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/crops');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchPaps = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/paps');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectcrop = itemValue => {
    setCrop(itemValue);
  };

  const handleSelectPap = itemValue => {
    setPap(itemValue);
  };

  const handleChangeQuantity = text => {
    setQuantity(text);
  };

  const handleChangeDescription = text => {
    setDescription(text);
  };

  const handleSelectImage = () => {
    // Use the built-in ImagePicker component to select an image from the device's library or camera
    ImagePicker.showImagePicker({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const updatedFormData = [...formData];
        updatedFormData[index].image = response.uri;
        setFormData(updatedFormData);
      }
    });
  };

  const handleSubmit = () => {
    // Check if there is an internet connection
    if (navigator.onLine) {
      // Submit the form data to the Django API
      fetch('http://127.0.0.1:8000/api/crops/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crop,
          quantity,
          description,
          image,
          pap,
        }),
      });

      // Store the form data in the formData state
      setFormData({
        crop,
        pap,
        quantity,
        description,
        image,
      });

      // Navigate to the confirmation page
      setPage('confirmation');
    } else {
      // If there is no internet connection, store the form data in SQLite
      SQLite.openDatabase(
        {
          name: 'formData.db',
          location: 'default',
        },
        () => {
          console.log('SQLite database opened');
        },
        error => {
          console.log(error);
        },
      );

      // Insert the form data into the SQLite database
      SQLite.executeSql(
        'INSERT INTO formData (crop, pap, quantity, description, image) VALUES (?, ?, ?, ?, ?)',
        [crop, pap, quantity, description, image],
        () => {
          console.log('Form data inserted into SQLite database');
        },
        error => {
          console.log(error);
        },
      );

      // Navigate to the confirmation page
      setPage('confirmation');
    }
  };
  // Add a function to check the internet connection status
  const checkConnection = async () => {
    // Get the internet connection status
    const connectionInfo = await NetInfo.fetch();

    // If there is an internet connection
    if (connectionInfo.isConnected) {
      console.log('Internet connection available');

      // Open the SQLite database
      SQLite.openDatabase(
        {
          name: 'formData.db',
          location: 'default',
        },
        () => {
          console.log('SQLite database opened');
        },
        error => {
          console.log(error);
        },
      );

      // Retrieve the stored form data from the SQLite database
      SQLite.executeSql(
        'SELECT * FROM formData',
        [],
        (_, {rows}) => {
          console.log(rows);
          for (let i = 0; i < rows.length; i++) {
            // Submit the form data to the Django API
            fetch('http://127.0.0.1:8000/api/crops/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                crop: rows.item(i).crop,
                quantity: rows.item(i).quantity,
                description: rows.item(i).description,
                image: rows.item(i).image,
                pap: rows.item(i).pap,
              }),
            });
          }
        },
        error => {
          console.log(error);
        },
      );
    } else {
      console.log('No internet connection');
    }
  };
  // Call the checkConnection function every 5 minutes
  setInterval(checkConnection, 5 * 60 * 1000);

  return (
    <View>
      {page === 'form' ? (
        <>
          <Picker selectedValue={crop} onValueChange={handleSelectcrop}>
            {fetchcrops().map(item => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
          <Picker selectedValue={pap} onValueChange={handleSelectPap}>
            {fetchPaps().map(item => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
          <TextInput
            value={quantity}
            onChangeText={handleChangeQuantity}
            placeholder="Quantity"
          />
          <TextInput
            value={description}
            onChangeText={handleChangeDescription}
            placeholder="Description"
          />
          <Button onPress={handleSelectImage} title="Select Image" />
          {image && (
            <Image source={{uri: image}} style={{width: 200, height: 200}} />
          )}
          <Button onPress={handleSubmit} title="Submit" />
        </>
      ) : (
        <ConfirmationPage {...formData} />
      )}
    </View>
  );
};

export default CropForm;
