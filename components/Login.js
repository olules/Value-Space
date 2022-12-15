import React from 'react';
import {View, TextInput, Button} from 'react-native';

const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = (username, password) => {
    // Set the request body
    const body = JSON.stringify({username, password});

    // Send the request
    fetch('https://example.com/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
      .then(response => response.json())
      .then(data => {
        // Login was successful
        // The session cookie will be included in the response
        // Get the session cookie from the response
        const cookie = response.headers.get('Set-Cookie');
        // Store the session cookie in local storage
        localStorage.setItem('session', cookie);
        // Redirect to the protected page
        window.location.href = '/protected';
      })
      .catch(error => {
        // Login failed
        // Show an error message
        alert('Login failed. Please try again.');
      });
  };


  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginForm;
