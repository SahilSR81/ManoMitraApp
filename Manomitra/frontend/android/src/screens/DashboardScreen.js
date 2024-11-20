import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user_name').then((storedName) => {
      if (storedName) setName(storedName);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to Manomitra, {name}!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MoodTracker')}
      >
        <Text style={styles.buttonText}>Track Your Mood</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ContentRecommendations')}
      >
        <Text style={styles.buttonText}>Get Recommendations</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;