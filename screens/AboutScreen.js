import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../assets/icon.jpeg')}
          style={styles.photo}
        />

        <Text style={styles.title}>Mary Jane Ladra</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Submitted by: Mary Jane A. Ladra</Text>
        
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Bio</Text>
          <Text style={styles.data}>
            I am MJ Ladra, a 3rd-year BSIT student. I’m introverted and a bit shy, but I stay determined with my studies. I may complain about acads, yet I never let myself get bad grades. I enjoy quiet moments, learning at my own pace, and improving little by little.

          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.data}>Abaca, Mabini, Bohol</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Hobbies</Text>
          <Text style={styles.data}>
            Watching movies/series, stanning K-pop, listening to music
          </Text>
          </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#FDEBFF',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#C8A2C8',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  photo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#FFB7E6',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A2C6F',
    marginBottom: 20,
  },
  section: {
    width: '100%',
    marginBottom: 18,
    backgroundColor: '#FFF7FD',
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F3C7FF',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7A4CA0',
    marginBottom: 5,
  },
  data: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
});