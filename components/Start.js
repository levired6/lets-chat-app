import { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  ImageBackground, 
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity 
} from 'react-native';

// Import the background image asset
const image = require('../assets/Background-Image.png');

// Define the available background colors
const backgroundColors = {
  black: '#090C08',
  purple: '#474056',
  gray: '#8A95A5',
  green: '#B9C6AE',
};

const Start = ({ navigation }) => {
  // State for user's name input
  const [name, setName] = useState('');
  // State for the selected background color, default to the first color
  const [color, setColor] = useState(backgroundColors.black);

  return (
    // 1. ImageBackground component covering the whole screen
    <ImageBackground
      style={styles.imageBackground}
      source={image} 
    >
       <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

      {/* Container for the app title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Chat App</Text>
      </View>

      {/* Configuration Box for Name Input and Color Picker */}
      <View style={styles.box}>
        
        {/* Text Input for Name */}
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder='Type your username here'
          placeholderTextColor='#757083' // Custom placeholder color for better contrast
        />

        {/* Color Picker Section */}
        <Text style={styles.chooseColorText}>Choose Background Color:</Text>
        <View style={styles.colorPickerContainer}>
          {/* Map through colors to create touchable circles */}
          {Object.keys(backgroundColors).map((key) => {
            const hex = backgroundColors[key];
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.colorCircle,
                  { backgroundColor: hex },
                  // Apply a selected border style if this is the chosen color
                  color === hex && styles.colorSelected,
                ]}
                onPress={() => setColor(hex)}
                // Use a descriptive accessibility label
                accessibilityLabel={`Choose ${key} background color`}
                accessibilityHint={`Sets the chat screen background to ${key}.`}
                accessibilityRole="button"
              />
            );
          })}
        </View>

        {/* Start Chat Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => 
            // Navigate to Chat screen, passing both name and color
            navigation.navigate('Chat', { name: name, color: color })
          }
          accessibilityLabel="Go to Chat Screen"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // Style for the main container, ensuring it takes up the full screen
  imageBackground: {
    flex: 1,
    resizeMode: 'cover', // Cover the entire screen
    justifyContent: 'center',
    alignItems: 'center',
  },

    // ADDED: Style to ensure KAV takes up the full space
  keyboardAvoidingView: {
    flex: 1, 
    width: '100%', // Ensure it spans the full width
    alignItems: 'center', // Keep content centered
  },
  
  // Container for the title
  titleContainer: {
    flex: 1, // Takes up the top half
    justifyContent: 'center',
    marginBottom: 60, // Space between title and input box
  },
  
  // App Title Style
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF', // White text on the dark background
    // Adding a subtle shadow for better contrast
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  // Configuration Box (Simulating the white box in the brief design)
  box: {
    width: '88%', // 88% width as per brief (or similar standard)
    backgroundColor: '#FFFFFF', // White background for the input area
    padding: '6%', // Internal padding
    marginBottom: 30, // Space from the bottom
    minHeight: 260, // Minimum height for structure
    alignItems: 'center', // Center content horizontally inside the box
    borderRadius: 10, // Slight rounding
  },

  // Text Input for Name
  textInput: {
    width: '100%', 
    padding: 15,
    borderWidth: 1,
    borderColor: '#757083', // Gray border
    borderRadius: 5,
    fontSize: 16,
    fontWeight: '300',
    opacity: 0.5,
    marginBottom: 20,
  },

  // Color Picker Label
  chooseColorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    alignSelf: 'flex-start', // Align to the left
    marginBottom: 10,
  },

  // Container for the color circles
  colorPickerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10, // Internal padding for circles
  },

  // Individual color circle
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25, // Half the width/height to make it a perfect circle
    marginHorizontal: 10,
  },

  // Highlight style for the selected color
  colorSelected: {
    borderWidth: 4,
    borderColor: '#FFD700', // Gold border to highlight selection
  },

  // Start Chatting Button
  button: {
    width: '100%',
    backgroundColor: '#757083', // Gray button background
    padding: 15,
    borderRadius: 5,
    alignItems: 'center', // Center text horizontally
  },

  // Text inside the button
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
  
});

export default Start;