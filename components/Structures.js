import React, {useState} from 'react';
import {View, Text, Picker, Image, TextInput, Button} from 'react-native';

const MyApp = () => {
  const [selectedItem, setSelectedItem] = useState(0);  
  const [selectedItemDimension, setSelectedItemDimension] = useState(0);
  const [selectedItemImage, setSelectedItemImage] = useState(null);

  return (
    <View style={{flex: 1, padding: 16}}>
      <Text>Number of selected items: {selectedItemDimension}</Text>
      <Picker
        selectedValue={selectedItem}
        onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
        itemStyle={{height: 50}}>
        <Picker.Item label="Mangoes" value={1} />
        <Picker.Item label="Apples" value={2} />
        <Picker.Item label="Bananas" value={3} />
      </Picker>
      <TextInput
        placeholder="Enter Dimension Length or Area of the Structure"
        keyboardType="numeric"
        onChangeText={e => setSelectedItemDimension(e.target.value)}
      />
      <Button
        title="Take picture"
        onPress={() => {
          // Take a picture using the device's camera and set it as the selected item image
          // Note: This is just a placeholder and may not be implemented properly
          setSelectedItemImage('https://picsum.photos/200/300');
        }}
      />
      {selectedItemImage && (
        <Image
          source={{uri: selectedItemImage}}
          style={{width: 200, height: 300}}
        />
      )}
    </View>
  );
};

export default MyApp;
