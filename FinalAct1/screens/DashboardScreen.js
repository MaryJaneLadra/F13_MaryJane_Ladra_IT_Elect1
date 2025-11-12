import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { getAllUsers } from '../db';

export default function DashboardScreen({ navigation, route }) {
  const { user } = route.params;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const all = await getAllUsers();
    setUsers(all);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Welcome, {user.username} 👋</Text>
      <Text>Your Bio: {user.bio || 'No bio yet'}</Text>
      <Button title="Edit My Profile" onPress={() => navigation.navigate('EditProfile', { user })} />
      <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }}>All Users:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ borderBottomWidth: 1, paddingVertical: 8 }}>
            <Text>{item.username}</Text>
            <Text style={{ color: 'gray' }}>{item.bio}</Text>
          </View>
        )}
      />
    </View>
  );
}