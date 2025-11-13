import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { updateUserProfile } from '../db';

export default function EditProfileScreen({ route, navigation }) {
  const { user } = route.params;
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar || 'https://via.placeholder.com/80');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    if (!username || !bio) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    try {
      await updateUserProfile(user.id, username, bio, avatar);
      Alert.alert('Success', 'Profile updated!');
      navigation.navigate('Dashboard', {
        user: { ...user, username, bio, avatar },
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
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
        <Text style={{ fontSize: 26, textAlign: 'center', marginBottom: 20 }}>Edit Profile</Text>

        <Image source={{ uri: avatar }} style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 15 }} />
        <Button title="Change Profile Picture" onPress={pickImage} />

        <Text>Username:</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={{ borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 6 }}
        />

        <Text>Bio:</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          multiline
          style={{ borderWidth: 1, marginBottom: 20, padding: 8, borderRadius: 6, minHeight: 80, textAlignVertical: 'top' }}
        />

        <Button title="Save Changes" onPress={handleUpdate} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}