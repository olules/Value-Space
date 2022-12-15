import React, {useState} from 'react';
import {View, ScrollView, Text, TextInput} from 'react-native';
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
              style={{flex: 1}}
              onChangeText={text => handleChange('cropCount', text)}
            />

            <Picker
              selectedValue={formData.crops}
              style={{flex: 2}}
              onValueChange={itemValue =>
                handleChange([...formData.crops, itemValue])
              }>
              <Picker.Item label="Avocado" value="avocado" />
              <Picker.Item label="Mango" value="mango" />
              <Picker.Item label="Pineapple" value="pineapple" />
            </Picker>
            <Button
              style={{flex: 3}}
              title="Add crop"
              onPress={() => handleChange([...formData.crops, 'new crop'])}
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
              style={{flex: 2}}
              onValueChange={itemValue =>
                handleChange([...formData.trees, itemValue])
              }>
              <Picker.Item label="Avocado" value="avocado" />
              <Picker.Item label="Mango" value="mango" />
              <Picker.Item label="Pineapple" value="pineapple" />
            </Picker>
            <Button
              style={{flex: 3}}
              title="Add tree"
              onPress={() => handleChange([...formData.trees, 'new tree'])}
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
    </ScrollView>
  );
};
const styles = {
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
};
