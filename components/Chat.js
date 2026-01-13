//Chat.js
import { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    Platform, 
    KeyboardAvoidingView,
} from 'react-native';
// Ensure 'react-native-gifted-chat' is installed in your project
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";

const Chat = ({ route, navigation, isConnected, db, storage }) => {
    // 1. Extract name and color from the navigation parameters
    const { name, color, userID } = route.params;
    // 2. State for storing messages
    const [messages, setMessages] = useState([]);

    let unsubMessages;

    // Set screen title and initialize messages on mount
  useEffect(() => {
    navigation.setOptions({ title: name });
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
        
        // Target messages collection sorted by createdAt
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach(doc => {
                // Convert TimeStamp to Date object
                    newMessages.push({
                        _id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    })
               })
               cacheMessages(newMessages);
            setMessages(newMessages);
        })
    } else loadCachedMessages();


        return () => { if (unsubMessages) unsubMessages(); 
        }
     }, [isConnected]);

       const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  const onSend = async (newMessages) => {
    console.log('onSend in Chat.js called with:', newMessages);
    try {
      await addDoc(collection(db, "messages"), newMessages[0]);
      console.log('Message sent to Firestore successfully!');
    } catch (error) {
      console.error('Error sending message to Firestore:', error);
      // Optionally, display an error message to the user
    }
  }

  const renderInputToolbar = (props) => {
    if (isConnected === true) return <InputToolbar {...props} />;
    else return null;
  }
    
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: { backgroundColor: "#000" },
                    left: { backgroundColor: "#FFF" }
                }}
            />
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{ _id: userID, name: name }}
                renderBubble={renderBubble}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
export default Chat;