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
  ImageBackground,
} from 'react-native';
import { addUser, getUser } from '../db';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleAuth = async () => {
    if (isSignup) {
      if (!username || !password || !bio) {
        Alert.alert('Error', 'Please fill out all fields');
        return;
      }
      await addUser(username, password, bio);
      Alert.alert('Success', 'Account created!');
      setIsSignup(false);
      setUsername('');
      setPassword('');
      setBio('');
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
    <ImageBackground
      source={require('../assets/bg.jpg')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            padding: 30,
          }}
        >

          <Text
            style={{
              fontSize: 32,
              textAlign: 'center',
              marginBottom: 30,
              fontWeight: 'bold',
              color: 'white',
              textShadowColor: 'black',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 4,
            }}
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </Text>

          <TextInput
            placeholder="Username"
            placeholderTextColor="#eee"
            value={username}
            onChangeText={setUsername}
            style={{
              borderWidth: 1,
              marginBottom: 15,
              padding: 10,
              borderRadius: 6,
              backgroundColor: 'rgba(255,255,255,0.3)',
              color: 'white',
              borderColor: 'white',
            }}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#eee"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{
              borderWidth: 1,
              marginBottom: 15,
              padding: 10,
              borderRadius: 6,
              backgroundColor: 'rgba(255,255,255,0.3)',
              color: 'white',
              borderColor: 'white',
            }}
          />

          {isSignup && (
            <TextInput
              placeholder="Bio"
              placeholderTextColor="#eee"
              value={bio}
              onChangeText={setBio}
              style={{
                borderWidth: 1,
                marginBottom: 15,
                padding: 10,
                borderRadius: 6,
                backgroundColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                borderColor: 'white',
              }}
            />
          )}

          <Button title={isSignup ? 'Sign Up' : 'Login'} onPress={handleAuth} />

          <Text
            style={{
              color: 'white',
              marginTop: 20,
              textAlign: 'center',
              textDecorationLine: 'underline',
              textShadowColor: 'black',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 4,
            }}
            onPress={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Already have an account? Login' : 'New here? Sign up'}
          </Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}