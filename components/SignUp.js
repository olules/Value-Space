import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    fetch('http://your-server.com/register', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        // Handle successful registration
        alert(response.message);
      })
      .catch(error => {
        // Handle registration errors
        alert('An error occurred while trying to register the user.');
      });
  };

  return (
    <View>
      <Text>Username:</Text>
      <TextInput value={username} onChangeText={text => setUsername(text)} />
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <Button onPress={handleSubmit} title="Register" />
    </View>
  );
};

export default RegisterForm;
