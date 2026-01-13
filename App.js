//App.js
import { useEffect } from 'react';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { disableNetwork, enableNetwork, getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { Alert } from 'react-native';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
import { LogBox } from 'react-native';
import { getStorage } from 'firebase/storage';

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Initialize Firebase once
const App = () => {
  const connectionStatus = useNetInfo();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANbTHADH9CsR9RS8rh0a1uKtKyEUfR3qs",
  authDomain: "lets-chat-app-5eab0.firebaseapp.com",
  projectId: "lets-chat-app-5eab0",
  storageBucket: "lets-chat-app-5eab0.firebasestorage.app",
  messagingSenderId: "960766217824",
  appId: "1:960766217824:web:77c70f1c63577245007d05"
};


 // Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize services simply
const db = getFirestore(app);
const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost")
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start">
          {/* 3. PASS AUTH AS A PROP TO START PER DIRECTIONS */}
          {(props) => <Start auth={auth} {...props} />}
        </Stack.Screen>

        <Stack.Screen name="Chat">
          {/* 3. PASS DB AS A PROP TO CHAT PER DIRECTIONS */}
          {(props) => (<Chat db={db} {...props} />)}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;