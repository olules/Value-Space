import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text></Text>
        <Button
          title="Add a PAP"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
      </View>
    );
  }
}
export default HomeScreen;
