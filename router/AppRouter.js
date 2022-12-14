import React, {useState} from 'react';
import {View, Image, Button} from 'react-native';
import {CameraRoll} from 'react-native';

const MyCameraComponent = () => {
  const [photo, setPhoto] = useState(null);

  const handleTakePhoto = () => {
    // Take the photo here
  };

  const handleSavePhoto = () => {
    CameraRoll.saveToCameraRoll(photo.uri)
      .then(() => {
        // The photo was saved successfully
      })
      .catch(error => {
        // Something went wrong
      });
  };

  return (
    <View>
      {photo && <Image source={{uri: photo.uri}} />}

      <Button title="Take Photo" onPress={handleTakePhoto} />

      {photo && <Button title="Save Photo" onPress={handleSavePhoto} />}
    </View>
  );
};

export default MyCameraComponent;
