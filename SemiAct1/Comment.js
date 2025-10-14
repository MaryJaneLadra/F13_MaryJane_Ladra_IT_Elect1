import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";

export default function Comment() {
  const [comments, setComments] = useState([
    { id: "1", text: "This is the first comment!" },
    { id: "2", text: "Nice post 👍" },
  ]);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment.trim().length === 0) return;
    setComments([
      ...comments,
      { id: Date.now().toString(), text: newComment },
    ]);
    setNewComment("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentBox}>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/147/147144.png" }}
        style={styles.avatar}
      />
      <View style={styles.commentContent}>
        <Text style={styles.commentText}>{item.text}</Text>
        <TouchableOpacity style={styles.replyBtn}>
          <Text style={styles.replyText}>Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1517816428104-797678c7cf0e" }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Write a comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={addComment}>
            <Text style={styles.sendText}>Comment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.85)", // light overlay for readability
    padding: 10,
  },
  commentBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentText: { fontSize: 16, color: "#333" },
  replyBtn: { marginTop: 4 },
  replyText: { color: "#007bff", fontWeight: "500" },
  inputRow: {
    flexDirection: "row",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 20,
  },
  sendText: { color: "#fff", fontWeight: "600" },
});
