import React, {useState} from 'react';
import {View, Text, Picker, TextInput, Button, Image, StyleSheet} from 'react-native';

const CropForm = () => {
  const [crops, setCrops] = useState([]);
  const [pap, setPap] = useState('');
  const [formData, setFormData] = useState({});
  const [page, setPage] = useState('form');

  // Fetch the list of crops from Django API
  const fetchCrops = async () => {
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

  const handleSelectCrops = items => {
    setCrops(items);
  };

  const handleSelectPap = itemValue => {
    setPap(itemValue);
  };

  const handleChangeFormField = (index, field, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index][field] = value;
    setFormData(updatedFormData);
  };

  const handleSelectImage = index => {
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

   const handleSubmit = async () => {
  // Check if there is an internet connection
  const connectionStatus = await NetInfo.fetch();

  if (connectionStatus.isConnected) {
    // Submit the form data to the Django API
    crops.forEach(crop => {
      const data = formData.find(item => item.crop === crop);
      fetch('http://127.0.0.1:8000/api/crops/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crop,
          quantity: data.quantity,
          description: data.description,
          image: data.image,
          pap,
        }),
      });
    });
  } else {
    // Store the form data in the device
    await AsyncStorage.setItem('formData', JSON.stringify(formData));
  }

  // Navigate to the confirmation page
  setPage('confirmation');
};
return (
  <View>
    {page === 'form' && (
      <View>
        <Picker
          selectedValue={pap}
          onValueChange={handleSelectPap}
          style={styles.picker}>
          {fetchPaps().map(item => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
        <Picker
          selectedValue={crops}
          onValueChange={handleSelectCrops}
          style={styles.picker}>
          {fetchCrops().map(item => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
        {crops.map((crop, index) => (
          <View key={index} style={styles.formFieldsContainer}>
            <Text style={styles.formFieldLabel}>{crop}</Text>
            <TextInput
              value={formData[index]?.quantity}
              onChangeText={text =>
                handleChangeFormField(index, 'quantity', text)
              }
              placeholder="Quantity"
              style={styles.input}
            />
            <TextInput
              value={formData[index]?.description}
              onChangeText={text =>
                handleChangeFormField(index, 'description', text)
              }
              placeholder="Description"
              style={styles.input}
            />
            <Button
              onPress={() => handleSelectImage(index)}
              title="Select Image"
            />
            {formData[index]?.image && (
              <Image
                source={{uri: formData[index].image}}
                style={{width: 200, height: 200}}
              />
            )}
          </View>
        ))}
        <Button onPress={handleSubmit} title="Submit" />
      </View>
    )}
    {page === 'confirmation' && (
      <View style={styles.confirmationContainer}>
        <Text style={styles.confirmationText}>PAP: {formData[0].pap}</Text>
        {formData.map((item, index) => (
          <View key={index} style={styles.formFieldsContainer}>
            <Text style={styles.confirmationText}>{item.crop}:</Text>
            <Text style={styles.confirmationText}>
              Quantity: {item.quantity}
            </Text>
            <Text style={styles.confirmationText}>
              Description: {item.description}
            </Text>
            {item.image && (
              <Image
                source={{uri: item.image}}
                style={{width: 200, height: 200}}
              />
            )}
          </View>
        ))}
        <Button onPress={() => setPage('form')} title="Submit another form" />
      </View>
    )}
  </View>
);
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
  input: {
    height: 50,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
  formFieldsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  formFieldLabel: {
    fontSize: 18,
  },
  confirmationContainer: {
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 18,
  },
});

export default CropForm;

