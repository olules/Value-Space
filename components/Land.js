import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Picker} from 'react-native';

const Land = () => {
  const [village, setVillage] = useState('');
  const [dimension, setDimension] = useState('');
  const [parish, setParish] = useState('');
  const [subCounty, setSubCounty] = useState('');
  const [county, setCounty] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter PAP's location details:</Text>
      <Picker
        label="Land Tenure"
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Customary" value="customary" />
        <Picker.Item label="Freehold" value="freehold" />
        <Picker.Item label="Mailo" value="mailo" />
        <Picker.Item label="Leasehold" value="leasehold" />
        <Picker.Item label="Licensee Tenant" value="licensee-tenant" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Dimensions (in square meters)"
        value={dimension}
        onChangeText={text => setDimension(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Village"
        value={village}
        onChangeText={text => setVillage(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Parish"
        value={parish}
        onChangeText={text => setParish(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sub-county"
        value={subCounty}
        onChangeText={text => setSubCounty(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="County"
        value={county}
        onChangeText={text => setCounty(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
 input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    fontSize: 16,
  },
})

export default Land;
   
