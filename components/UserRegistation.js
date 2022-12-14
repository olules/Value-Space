import React, { useState } from 'react';
import { View, Text, Picker, TextInput, Button, Image, ImageEditor } from 'react-native';

const MyApp = () => {
  const [selectedItem, setSelectedItem] = useState('mangoes');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const saveImage = async () => {
    const resizedImageUri = await ImageEditor.cropImage(image, {
      offset: { x: 0, y: 0 },
      size: { width: 200, height: 300 },
      displaySize: { width: 200, height: 300 },
      resizeMode: 'contain',
    });

    setImage(resizedImageUri);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Selected item: {selectedItem}</Text>
      <Picker
        selectedValue={selectedItem}
        onValueChange={(itemValue) => setSelectedItem(itemValue)}
        itemStyle={{ height: 50 }}
      >
        <Picker.Item label="Mangoes" value="mangoes" />
        <Picker.Item label="Apples" value="apples" />
        <Picker.Item label="Oranges" value="oranges" />
      </Picker>
      <Text>Quantity:</Text>
      <TextInput
        value={quantity}
        onChangeText
