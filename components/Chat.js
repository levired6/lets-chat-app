// Chat.js
import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { name, color, userID } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: name });

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let newMessages = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        newMessages.push({
          _id: doc.id,
          ...data,
          createdAt: data.createdAt ? new Date(data.createdAt.toMillis()) : new Date(),
        });
      });
      setMessages(newMessages);
    });

    return () => { if (unsubscribe) unsubscribe(); }
  }, [db, name]);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: userID, name: name }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
export default Chat;