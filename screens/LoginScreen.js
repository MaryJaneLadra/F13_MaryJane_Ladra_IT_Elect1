import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { addUser, getUser, getAllUsers } from '../db';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('https://via.placeholder.com/80');
  const [isSignup, setIsSignup] = useState(false);

  const handleAuth = async () => {
    if (isSignup) {
      if (!username || !password || !bio) {
        Alert.alert('Error', 'Please fill out all fields');
        return;
      }

      const existingUsers = await getAllUsers();
      const duplicate = existingUsers.find(u => u.username === username);
      if (duplicate) {
        Alert.alert('Error', 'Username already exists');
        return;
      }

      await addUser(username, password, bio, avatar);
      Alert.alert('Success', 'Account created!');
      setIsSignup(false);
      setUsername('');
      setPassword('');
      setBio('');
      setAvatar('https://via.placeholder.com/80');
    } else {
      const user = await getUser(username, password);
      if (user) {
        navigation.navigate('Dashboard', { user });
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    }
  };
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
        <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>
          {isSignup ? 'Sign Up' : 'Login'}
        </Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{ borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 6 }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{ borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 6 }}
        />

        {isSignup && (
          <TextInput
            placeholder="Bio"
            value={bio}
            onChangeText={setBio}
            style={{ borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 6 }}
          />
        )}

        <Button title={isSignup ? 'Sign Up' : 'Login'} onPress={handleAuth} />

        <Text
          style={{ color: 'blue', marginTop: 15, textAlign: 'center' }}
          onPress={() => setIsSignup(!isSignup)}
        >
          {isSignup ? 'Already have an account? Login' : 'New here? Sign up'}
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}