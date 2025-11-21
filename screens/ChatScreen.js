import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image } from 'react-native';
import { getMessages, sendMessage, getUser } from '../db';

export default function ChatScreen({ route }) {
  const { currentUser, otherUser } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [user, setUser] = useState(currentUser);
  const [chatUser, setChatUser] = useState(otherUser);

  const defaultAvatar = 'https://via.placeholder.com/40';

  useEffect(() => {
    loadMessages();
    refreshUsers();
  }, []);

  const loadMessages = async () => {
    const msgs = await getMessages(user.id, chatUser.id);
    setMessages(msgs);
  };

  const refreshUsers = async () => {
    const updatedCurrentUser = await getUser(user.username, user.password);
    const updatedChatUser = await getUser(chatUser.username, chatUser.password);
    if (updatedCurrentUser) setUser(updatedCurrentUser);
    if (updatedChatUser) setChatUser(updatedChatUser);
  };

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage(user.id, chatUser.id, text);
    setText('');
    loadMessages();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
        Chat with {chatUser.username}
      </Text>


      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSender = item.sender_id === user.id;
          const userAvatar = isSender ? (user.avatar || defaultAvatar) : (chatUser.avatar || defaultAvatar);

          return (
            <View style={{
              flexDirection: 'row',
              marginVertical: 4,
              alignSelf: isSender ? 'flex-end' : 'flex-start',
              maxWidth: '75%'
            }}>
              <Image
                source={{ uri: userAvatar }}
                style={{ width: 40, height: 40, borderRadius: 20, marginRight: 8 }}
              />
              <View style={{
                backgroundColor: isSender ? '#DCF8C6' : '#EEE',
                borderRadius: 10,
                padding: 8,
                flexShrink: 1
              }}>
                <Text>{item.message}</Text>
                <Text style={{ fontSize: 10, color: 'gray' }}>{item.timestamp}</Text>
              </View>
            </View>
          );
        }}
      />

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          style={{
            flex: 1,
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            marginRight: 8,
          }}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
}