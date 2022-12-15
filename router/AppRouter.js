import React from 'react';
import Crops from './components/Crops';
import {View} from 'react-native';
import ProfileScreen from './screens/Profile';
import HomeScreen from './screens/HomeScreen';

class App extends Component {
  state = {
    currentScreen: 'Home',
    stack: ['Home'],
  };

  navigate = screen => {
    this.setState(prevState => ({
      currentScreen: screen,
      stack: [...prevState.stack, screen],
    }));
  };

  goBack = () => {
    this.setState(prevState => {
      const stack = [...prevState.stack];
      stack.pop();
      const currentScreen = stack[stack.length - 1];
      return {currentScreen, stack};
    });
  };

  render() {
    switch (this.state.currentScreen) {
      case 'Home':
        return <HomeScreen navigation={{navigate: this.navigate}} />;
      case 'Profile':
        return <ProfileScreen navigation={{goBack: this.goBack}} />;
      case 'Settings':
        return (
          <SettingsScreen
            navigation={{navigate: this.navigate, goBack: this.goBack}}
          />
        );
      case 'Notifications':
        return (
          <NotificationsScreen
            navigation={{navigate: this.navigate, goBack: this.goBack}}
          />
        );
      case 'Account':
        return (
          <AccountScreen
            navigation={{navigate: this.navigate, goBack: this.goBack}}
          />
        );
    }
  }
}

export default App;
