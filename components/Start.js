import { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  ImageBackground, 
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert 
} from 'react-native';
import { signInAnonymously } from "firebase/auth";

// Import the background image asset
const image = require('../assets/Background-Image.png');

// Define the available background colors
const backgroundColors = {
  black: '#090C08',
  purple: '#474056',
  gray: '#8A95A5',
  green: '#B9C6AE',
};

const Start = ({ navigation, auth }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(backgroundColors.black);
  
const signInUser = () => {
    // Call signInAnonymously per directions
    signInAnonymously(auth)
      .then(result => {
        // Navigate with uid, name, and color
        navigation.navigate('Chat', { 
            userID: result.user.uid, 
            name: name, 
            color: color 
        });
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Unable to sign in, try again later.");
      });
  }

  return (
    <ImageBackground style={styles.imageBackground} source={image}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.titleContainer}><Text style={styles.title}>Chat App</Text></View>
        <View style={styles.box}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'
            placeholderTextColor='#757083'
          />
          <Text style={styles.chooseColorText}>Choose Background Color:</Text>
          <View style={styles.colorPickerContainer}>
            {Object.keys(backgroundColors).map((key) => {
              const hex = backgroundColors[key];
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.colorCircle, { backgroundColor: hex }, color === hex && styles.colorSelected]}
                  onPress={() => setColor(hex)}
                />
              );
            })}
          </View>
          <TouchableOpacity style={styles.button} onPress={signInUser}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

// ... styles remain the same as your provided code ...
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    flex: 1, 
    width: '100%',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  box: {
    width: '88%',
    backgroundColor: '#FFFFFF',
    padding: '6%',
    marginBottom: 30,
    minHeight: 260,
    alignItems: 'center',
    borderRadius: 10,
  },
  textInput: {
    width: '100%', 
    padding: 15,
    borderWidth: 1,
    borderColor: '#757083',
    borderRadius: 5,
    fontSize: 16,
    fontWeight: '300',
    opacity: 0.5,
    marginBottom: 20,
  },
  chooseColorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  colorPickerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  colorSelected: {
    borderWidth: 4,
    borderColor: '#FFD700',
  },
  button: {
    width: '100%',
    backgroundColor: '#757083',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default Start;