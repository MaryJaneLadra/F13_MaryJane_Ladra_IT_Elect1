import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { updateUserProfile } from '../db';


export default function EditProfileScreen({ route, navigation }) {
  const { user } = route.params;
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);

  const handleUpdate = async () => {
    if (!username || !bio) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    try {
      await updateUserProfile(user.id, username, bio);
      Alert.alert('Success', 'Profile updated!');
      navigation.navigate('Dashboard', {
        user: { ...user, username, bio },
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ fontSize: 26, textAlign: 'center', marginBottom: 20 }}>
          Edit Profile
        </Text>

        <Text>Username:</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={{
            borderWidth: 1,
            marginBottom: 10,
            padding: 8,
            borderRadius: 6,
          }}
        />

        <Text>Bio:</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          multiline
          style={{
            borderWidth: 1,
            marginBottom: 20,
            padding: 8,
            borderRadius: 6,
            minHeight: 80,
            textAlignVertical: 'top',
          }}
        />

        <Button title="Save Changes" onPress={handleUpdate} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}