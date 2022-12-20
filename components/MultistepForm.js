import React, {useState} from 'react';
import {View, ScrollView, Text, TextInput, StyleSheet} from 'react-native';
import Personal from './Personal';
import Crops from './Crops';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = () => {
    // submit the form data here
    onSubmit(formData);
  };
 /* const [crops, setCrops] = React.useState([]);
  const [cropCount, setCropCount] = React.useState(0); */

  return (
    <ScrollView>
      {currentStep === 1 && (
        <View style={styles.container}>
          <Text>PAP's Personal Information</Text>
          <View>
            <View>
              {image && <Image source={{uri: image.uri}} />}
              <Button
                title="Take PAP's Photo"
                onPress={Personal.launchCamera}
              />

              {image && (
                <Button title="Save image" onPress={Personal.handleSaveImage} />
              )}
            </View>
            <TextInput
              placeholder="First Name"
              value={formData.firstname}
              name="firstname"
              label="First name of PAP"
              onChangeText={text => handleChange('firstname', text)}
            />
            <TextInput
              placeholder="Last Name(s)"
              value={formData.lastname}
              name="lastname"
              label="Last Name of PAP"
              onChangeText={text => handleChange('lastname', text)}
            />
            <TextInput
              placeholder="Telephone Contact"
              value={formData.telephone}
              name="telephone"
              label="Telephone Contact of PAP"
              onChangeText={text => handleChange('telephone', text)}
            />
            <TextInput
              placeholder="Email"
              value={formData.email}
              name="email"
              label="Email of PAP"
              onChangeText={text => handleChange('email', text)}
            />
            <TextInput
              placeholder="NIN"
              value={formData.nin}
              name="nin"
              label="NIN of PAP"
              onChangeText={text => handleChange('nin', text)}
            />
            <TextInput
              placeholder="Age"
              value={formData.age}
              name="age"
              label="Age of PAP"
              onChangeText={text => handleChange('age', text)}
            />
            <Button title="Add Crops" onPress={handleNext} />
          </View>
        </View>
      )}
      {currentStep === 2 && (
        <View style={styles.container}>
          <Text>Crop Details</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="Enter number of crops"
              value={formData.cropCount}
              name="cropCount"
              style={{flex: 1}}
              onChangeText={text => handleChange('cropCount', text)}
            />

            <Picker
              selectedValue={formData.crops}
              name="crops"
              style={styles.picker1}
              onValueChange={itemValue => handleChange([...crops, itemValue])}>
              <Picker.Item label="Avocado" value="avocado" />
              <Picker.Item label="Mango" value="mango" />
              <Picker.Item label="Pineapple" value="pineapple" />
            </Picker>
            <Button
              style={{flex: 3}}
              title="Add crop"
              onPress={() => handleChange([...crops, 'new crop'])}
            />
          </View>
          <Text>
            {formData.crops.map(crop => (
              <Text key={crop}>
                {crop} {formData.cropCount}
              </Text>
            ))}
          </Text>
        </View>
      )}
      {currentStep === 3 && (
        <View style={styles.container}>
          <Text>Tree Details</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="Enter number of trees"
              value={formData.treeCount}
              style={{flex: 1}}
              onChangeText={text => handleChange('treeCount', text)}
            />

            <Picker
              selectedValue={formData.trees}
              name="trees"
              style={styles.picker1}
              onValueChange={itemValue =>
                handleChange(['trees', itemValue])
              }>
              <Picker.Item label="Avocado" value="avocado" />
              <Picker.Item label="Mango" value="mango" />
              <Picker.Item label="Pineapple" value="pineapple" />
            </Picker>
            <Button
              style={{flex: 3}}
              title="Add tree"
              onPress={() => handleChange([trees, 'new tree'])}
            />
          </View>
          <Text>
            {formData.trees.map(tree => (
              <Text key={tree}>
                {tree} {formData.treeCount}
              </Text>
            ))}
          </Text>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
      {currentStep === 4 && (
        <View style={styles.container}>
          <View style={{flex: 1, padding: 16}}>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                placeholder="Enter Dimensions of the structure"
                value={formData.dimension}
                style={{flex: 1}}
                name="dimension"
                onChangeText={text => handleChange('dimension', text)}
              />
              <Text>Number of selected items: {selectedItemDimension}</Text>
              <Picker
                selectedValue={formData.selectedItem}
                onValueChange={(itemValue, itemIndex) =>
                 setSelectedItem(itemValue)
                }
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

              <Text>
                {formData.trees.map(tree => (
                  <Text key={tree}>
                    {tree} {formData.treeCount}
                  </Text>
                ))}
              </Text>
            </View>{' '}
          </View>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    fontSize: 16,
  },
  picker1: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    fontSize: 16,
    flex: 2
  },
});
;
