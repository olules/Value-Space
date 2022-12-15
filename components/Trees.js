import React, {useState, useEffect} from 'react';
import {View, TextInput, Picker, Button, AsyncStorage} from 'react-native';

import React from 'react';
import {View, TextInput, Picker, Text, Button} from 'react-native';

const Trees = () => {
  const [trees, setTrees] = React.useState([]);
  const [treeCount, setTreeCount] = React.useState(0);
  /*
  useEffect(() => {
    // Fetch the data from the Django database.
     fetch('http://example.com/api/items')
      .then(response => response.json())
      .then(data => {
        setChoices(data);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch.
      });
  }, []); 
  });
  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem('formData', value);
      alert(`Saved: ${value}`);
    } catch (error) {
      alert(`Error saving data: ${error}`);
    }
  };*/
   const handleSubmit = event => {
     event.preventDefault();
     // Do something with the form data (e.g. send it to an API)
   };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          placeholder="Enter number of trees"
          value={treeCount}
          style={{flex: 1}}
          onChangeText={e => setTreeCount(e.target.value)}
        />

        <Picker
          selectedValue={trees}
          style={{flex: 2}}
          onValueChange={itemValue => setTrees([...trees, itemValue])}>
          <Picker.Item label="Avocado" value="avocado" />
          <Picker.Item label="Mango" value="mango" />
          <Picker.Item label="Pineapple" value="pineapple" />
        </Picker>
        <Button
          style={{flex: 3}}
          title="Add tree"
          onPress={() => setTrees([...trees, 'new tree'])}
        />
      </View>
      <Text>
        {trees.map(tree => (
          <Text key={tree}>
            {tree} {treeCount}
          </Text>
        ))}
      </Text>

      <Button title="Submit" onPress={handleSubmit} />
    </View>
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

export default Trees;
