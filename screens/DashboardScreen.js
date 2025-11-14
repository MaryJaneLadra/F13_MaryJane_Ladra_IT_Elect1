import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Button, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
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

  const defaultAvatar = 'https://via.placeholder.com/100';

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#F4EEFF' }} // soft pastel lavender
      contentContainerStyle={{ padding: 20 }}
    >
      {/* USER CARD */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          padding: 20,
          borderRadius: 20,
          alignItems: 'center',
          shadowColor: '#A9A0C8',
          shadowOpacity: 0.18,
          shadowRadius: 8,
          elevation: 4,
          marginBottom: 25,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            marginBottom: 10,
            color: '#6A5ACD',
          }}
        >
          Welcome, {user.username} 👋
        </Text>

        <Image
          source={{ uri: user.avatar || defaultAvatar }}
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            marginBottom: 12,
            borderWidth: 3,
            borderColor: '#DCCFFF', // soft purple ring
          }}
        />

        <Text
          style={{
            fontSize: 16,
            color: '#594A8A',
            textAlign: 'center',
            marginBottom: 18,
          }}
        >
          {user.bio || 'No bio yet'}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile', { user })}
          style={{
            backgroundColor: '#A68EF5',
            paddingVertical: 10,
            paddingHorizontal: 25,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            Edit My Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* USERS HEADER */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 12,
          color: '#6A5ACD',
        }}
      >
        All Users
      </Text>

      {/* USERS LIST BOX */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          padding: 12,
          borderRadius: 20,
          shadowColor: '#A9A0C8',
          shadowOpacity: 0.12,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        <FlatList
          scrollEnabled={false}
          data={users}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: '#EEE8FF',
                marginVertical: 10,
              }}
            />
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Chat', {
                  currentUser: user,
                  otherUser: item,
                })
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
              }}
            >
              <Image
                source={{ uri: item.avatar || defaultAvatar }}
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 27,
                  marginRight: 12,
                  borderWidth: 2,
                  borderColor: '#DCCFFF',
                }}
              />

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 17, fontWeight: '600', color: '#4A3F71' }}>
                  {item.username}
                </Text>
                <Text style={{ color: '#7B6BAF', fontSize: 14 }}>
                  {item.bio || 'No bio'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}