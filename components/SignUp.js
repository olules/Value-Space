import React from 'react';
import {View, Picker, TextInput} from 'react-native';

const App = () => {
  const [selectedCrop, setSelectedCrop] = React.useState('corn');
  const [cropQuantity, setCropQuantity] = React.useState(0);

  return (
    <View>
      <Picker
        selectedValue={selectedCrop}
        onValueChange={(itemValue, itemIndex) => setSelectedCrop(itemValue)}>
        <Picker.Item label="Corn" value="corn" />
        <Picker.Item label="Wheat" value="wheat" />
      </Picker>
      <TextInput
        value={cropQuantity}
        onChangeText={text => setCropQuantity(text)}
        keyboardType="numeric"
      />
    </View>
  );
};
