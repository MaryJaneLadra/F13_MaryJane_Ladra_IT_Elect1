import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import { getAllUsers } from '../db';

export default function DashboardScreen({ navigation, route }) {
  const { user } = route.params;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const all = await getAllUsers();
    setUsers(all.filter(u => u.id !== user.id));
  };

  const defaultAvatar = 'https://via.placeholder.com/40';

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Welcome, {user.username} 👋</Text>
      <Image source={{ uri: user.avatar || defaultAvatar }} style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }} />
      <Text>Your Bio: {user.bio || 'No bio yet'}</Text>
      <Button title="Edit My Profile" onPress={() => navigation.navigate('EditProfile', { user })} />

      <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }}>All Users:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Chat', { currentUser: user, otherUser: item })}>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, paddingVertical: 8 }}>
              <Image source={{ uri: item.avatar || defaultAvatar }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} />
              <View>
                <Text>{item.username}</Text>
                <Text style={{ color: 'gray' }}>{item.bio}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
  
}