import React, {useState} from 'react';
import {View, Picker, TextInput, Button, Image} from 'react-native';

const App = () => {
  const [formData, setFormData] = useState({
    fruit: '',
    count: '',
    image: null,
  });

  const handleFruitChange = fruit => {
    setFormData(formData => ({...formData, fruit}));
  };

  const handleCountChange = event => {
    const {value} = event.target;
    setFormData(formData => ({...formData, count: value}));
  };

  const handleImageChange = image => {
    setFormData(formData => ({...formData, image}));
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Do something with the form data (e.g. send it to an API)
  };

  return (
    <form onSubmit={handleSubmit}>
      <Picker selectedValue={formData.fruit} onValueChange={handleFruitChange}>
        <Picker.Item label="Mangoes" value="mangoes" />
        <Picker.Item label="Pineapples" value="pineapples" />
        <Picker.Item label="Cherries" value="cherries" />
      </Picker>
      <TextInput
        value={formData.count}
        onChange={handleCountChange}
        keyboardType="numeric"
      />
      <Button
        title="Take Picture"
        onPress={() => handleImageChange(/* Take picture here */)}
      />
      {formData.image && <Image source={{uri: formData.image}} />}
      <Button title="Submit" />
    </form>
  );
};

export default App;
