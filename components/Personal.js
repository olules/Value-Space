import React, {useState, useEffect} from 'react';
import {PermissionsAndroid, View, Text, Button, Image, CameraRoll} from 'react-native';

// ...

const Personal = () =>{
   const [firstname, setFirstName] = useState('');
   const [lastname, setLastName] = useState('');
   const [age, setAge] = useState('');
   const [telephone, setTelephone] = useState('');
   const [image, setImage] = useState(null);
   const [email, setEmail] = useState(null);
   const [nin, setNin] = useState('');

  async function launchCamera() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Launch the camera
        CameraRoll.launchCamera(null, response => {
          if (response.didCancel) {
            // Handle cancelled photo
            console.log('The operation was cancelled by the user');
          } else if (response.error) {
            // Handle error
            console.error(response.error);
          } else {
            // Handle photo
            console.log(response.uri);
            // Convert the photo to a base64-encoded string
            const base64Photo = `data:image/jpeg;base64,${response.data}`;

            // Send the photo to the Django server
            fetch('http://YOUR_DJANGO_SERVER_URL/upload_photo', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                photo: base64Photo,
              }),
            });
          }
        });
      } else {
        // Handle permission denied
        console.log('Permission to access the camera was denied');
       
      }
    } catch (err) {
      // Handle error
      console.error(err);
    }
  };

  return (
    <View>
      <View>
        {image && <Image source={{uri: image.uri}} />}
        <Button title="Take PAP's Photo" onPress={launchCamera} />
        /*
        {image && <Button title="Save image" onPress={handleSaveImage} />}
        */
      </View>
      <TextInput
        placeholder="First Name"
        value={firstname}
        label="First name of PAP"
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        placeholder="Last Name(s)"
        value={lastname}
        label="Last Name of PAP"
        onChangeText={text => setLastName(text)}
      />
      <TextInput
        placeholder="Telephone Contact"
        value={telephone}
        label="Telephone Contact of PAP"
        onChangeText={e => setTelephone(e.target.value)}
      />
      <TextInput
        placeholder="Email"
        value={email}
        label="Email of PAP"
        onChangeText={e => setEmail(e.target.value)}
      />
      <TextInput
        placeholder="NIN"
        value={nin}
        label="NIN of PAP"
        onChangeText={e => setNin(e.target.value)}
      />
      <TextInput
        placeholder="Age"
        value={age}
        label="Age of PAP"
        onChangeText={e => setAge(e.target.value)}
      />
      <Button title="Submit" onPress={() => handleSubmit(name, email)} />
    </View>
  );
}



export default Personal;
