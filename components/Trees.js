import React, {useState} from 'react';
import {View, Text, Picker, TextInput, Button, Image} from 'react-native';

const TreeForm = () => {
  const [tree, setTree] = useState('');
  const [pap, setPap] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  // Fetch the list of trees from Django API
  const fetchTrees = async () => {
    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/trees',
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectTree = itemValue => {
    setTree(itemValue);
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
        setImage(response.uri);
      }
    });
  };

  const handleSubmit = () => {
    // Submit the form data to the Django API
    fetch('http://127.0.0.1:8000/api/trees/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tree,
        quantity,
        description,
        image,
        pap,
      }),
    });
  };

  return (
    <View>
      <Picker selectedValue={tree} onValueChange={handleSelectTree}>
        {fetchTrees().map(item => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
       <Picker selectedValue={pap} onValueChange={handleSelectPap}>
        {fetchPaps().map(item => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
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
    </View>
  );
};
export default TreeForm;
