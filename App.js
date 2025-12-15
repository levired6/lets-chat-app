import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // NavigationContainer manages the navigation tree
    <NavigationContainer>
      {/* Stack Navigator handles the transition between screens */}
      <Stack.Navigator
        initialRouteName="Start" // Set the starting screen
      >
        {/* Start Screen definition */}
        <Stack.Screen
          name="Start"
          component={Start}
        />
        {/* Chat Screen definition */}
        <Stack.Screen
          name="Chat"
          component={Chat}
          // The Chat screen's title will be dynamically set by the component
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;