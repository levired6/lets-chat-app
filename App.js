//App.js
import { useState, useEffect } from 'react';
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"; // Add this import
import AsyncStorage from '@react-native-async-storage/async-storage';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
import { LogBox, View, ActivityIndicator } from 'react-native';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANbTHADH9CsR9RS8rh0a1uKtKyEUfR3qs",
  authDomain: "lets-chat-app-5eab0.firebaseapp.com",
  projectId: "lets-chat-app-5eab0",
  storageBucket: "lets-chat-app-5eab0.firebasestorage.app",
  messagingSenderId: "960766217824",
  appId: "1:960766217824:web:77c70f1c63577245007d05"
};

// This ensures the "auth" component is registered before the app renders.
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with Persistence immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);
// -------------------------------------------------

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  // We keep the ready state to ensure the NavigationContainer doesn't 
  // try to use the auth/db objects before they are fully assigned.
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  useEffect(() => {
    if (auth && db) {
      setIsFirebaseReady(true);
    }
  }, []);

  // Safety Gate: If Firebase objects aren't created yet, show loading
  if (!isFirebaseReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ); 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start">
          {/* 3. PASS AUTH AS A PROP TO START */}
          {(props) => <Start auth={auth} {...props} />}
        </Stack.Screen>

        <Stack.Screen name="Chat">
          {/* 3. PASS DB AS A PROP TO CHAT */}
          {(props) => (<Chat db={db} {...props} />)}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;