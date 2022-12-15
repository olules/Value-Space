import React from 'react';
import {View, Picker} from 'react-native';

class MyPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], // will hold the items to display in the Picker
    };
  }

  componentDidMount() {
    // fetch the items from the Django API endpoint
    fetch('http://my-django-app.com/api/items')
      .then(response => response.json())
      .then(items => {
        // update the state with the fetched items
        this.setState({items});
      });
  }

  render() {
    return (
      <View>
        <Picker>
          {this.state.items.map(item => (
            <Picker.Item label={item.name} value={item.id} />
          ))}
        </Picker>
      </View>
    );
  }
}
export default MyPicker;