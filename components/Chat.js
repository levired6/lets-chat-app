import { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    Platform, 
    KeyboardAvoidingView 
} from 'react-native';
// Ensure 'react-native-gifted-chat' is installed in your project
import { Bubble, GiftedChat, SystemMessage } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
    // 1. Extract name and color from the navigation parameters
    const { name, color } = route.params;

    // 2. State for storing messages
    const [messages, setMessages] = useState([]);
    
    // Function to handle sending new messages
    const onSend = (newMessages = []) => {
        // Appends the new message(s) to the existing messages array
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    }

    // Set screen title and initialize messages on mount
    useEffect(() => {
        // Set the header title dynamically
        navigation.setOptions({ title: name });

        // 3. Add initial static messages
        setMessages([
            // Initial message from a "recipient" (user id 2)
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2, 
                    name: 'Recipient User',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            // System message
            {
                _id: 2,
                text: `You have entered the chat. Welcome ${name}!`,
                createdAt: new Date(),
                system: true, 
            },
        ]);
    }, [name, navigation]); 

    // Custom function to render message bubbles and apply styles
    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                // Messages sent by the current user (_id: 1)
                right: {
                    backgroundColor: "#000",
                },
                // Messages received from others (e.g., _id: 2)
                left: {
                    backgroundColor: "#FFF",
                }
            }}
            textStyle={{
                right: {
                    color: "#FFF", // White text on dark bubble
                },
                left: {
                    color: "#000", // Black text on white bubble
                },
            }}
        />
    }

    // Custom renderer for system messages to ensure visibility
    const renderSystemMessage = (props) => {
        return (
            <SystemMessage 
                {...props} 
                textStyle={{ color: '#FFF', textAlign: 'center' }}
            />
        );
    }

    return (
        // Wrapper applying the selected background color
        <View style={[styles.container, { backgroundColor: color }]}>
            
            {/* The main chat component */}
            <GiftedChat
                messages={messages} 
                onSend={messages => onSend(messages)} 
                renderBubble={renderBubble} 
                renderSystemMessage={renderSystemMessage}
                // Define the current user's identity (this user sends the "right" messages)
                user={{
                    _id: 1, 
                    name: name, 
                }}
            />

            {/* Keyboard Avoiding Logic for mobile platforms */}
            { Platform.OS === 'ios' ? 
                <KeyboardAvoidingView behavior="padding" /> 
                : null 
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;