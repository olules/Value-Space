import React from 'react';
import { View, Text, Picker, TextInput } from 'react-native';

const MyForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue="option1"
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            console.log(itemValue)
          }
        >
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
          <Picker.Item label="Option 3" value="option3" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    flex: 1,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    fontSize: 16,
  },
};

export default MyForm;

