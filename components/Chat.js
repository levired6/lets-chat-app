//Chat.js
import { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    Platform, 
    KeyboardAvoidingView,
    Alert
} from 'react-native';
// Ensure 'react-native-gifted-chat' is installed in your project
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
    // 1. Extract name and color from the navigation parameters
    const { name, color, userID } = route.params;

    // 2. State for storing messages
    const [messages, setMessages] = useState([]);

    // Set screen title and initialize messages on mount
    useEffect(() => {
        // Set the header title dynamically
        navigation.setOptions({ title: name });
        
        // Target messages collection sorted by createdAt
const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let newMessages = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                // Convert TimeStamp to Date object
                    newMessages.push({
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt ? new Date(data.createdAt.toMillis()) : new Date(),
                    });
            });
            setMessages(newMessages);
        });

        return () => { if (unsubscribe) unsubscribe(); };
    }, [db, name]);

const onSend = (newMessages) => {
        // Use addDoc to save the first item in newMessages
        addDoc(collection(db, "messages"), {
            ...newMessages[0],
            createdAt: new Date() // Ensure a fresh Date object is sent
        }).catch((error) => {
            console.error("Firestore Error:", error);
            Alert.alert("Error", "Could not send message.");
        });
    };
    
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