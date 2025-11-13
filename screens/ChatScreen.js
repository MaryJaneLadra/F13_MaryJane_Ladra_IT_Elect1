import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image } from 'react-native';
import { getMessagesBetweenUsers, sendMessage } from '../db';

export default function ChatScreen({ route }) {
  const { currentUser, selectedUser } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const loadMessages = async () => {
    const allMessages = await getMessagesBetweenUsers(currentUser.id, selectedUser.id);
    setMessages(allMessages);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage(currentUser.id, selectedUser.id, text);
    setText('');
    loadMessages();
  };

  const getUserPhoto = (senderId) =>
    senderId === currentUser.id
      ? currentUser.photo || 'https://via.placeholder.com/50'
      : selectedUser.photo || 'https://via.placeholder.com/50';

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Chat with {selectedUser.username}
      </Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: item.sender_id === currentUser.id ? 'row-reverse' : 'row',
              alignItems: 'center',
              marginVertical: 4,
            }}
          >
            <Image
              source={{ uri: getUserPhoto(item.sender_id) }}
              style={{ width: 40, height: 40, borderRadius: 20, marginHorizontal: 6 }}
            />
            <View
              style={{
                backgroundColor: item.sender_id === currentUser.id ? '#DCF8C6' : '#EEE',
                padding: 8,
                borderRadius: 10,
                maxWidth: '70%',
              }}
            >
              <Text>{item.message}</Text>
            </View>
          </View>
        )}
      />

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        style={{ borderWidth: 1, borderRadius: 8, padding: 8, marginVertical: 10 }}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}