import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ImageBackground,
} from "react-native";

export default function Messenger() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (text.trim() === "") return;
    setMessages((prev) => [...prev, { id: Date.now().toString(), text }]);
    setText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("./assets/mjladra.jpeg")}
        style={styles.background}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.message}>
                <Text>{item.text}</Text>
              </View>
            )}
          />

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Type a message"
              value={text}
              onChangeText={setText}
            />
            <Button title="Send" onPress={sendMessage} />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    marginVertical: 4,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 6,
    alignSelf: "flex-end",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 6,
    padding: 5,
    marginBottom: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginRight: 8,
    backgroundColor: "#fff",
  },
});
