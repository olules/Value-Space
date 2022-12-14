import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';


class ProfileScreen extends Component {
  render() {
    return (
      <View>
        <Text>Profile Screen</Text>
        <Button
          title="Go Back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default ProfileScreen;