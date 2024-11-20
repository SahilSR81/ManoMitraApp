import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MoodTrackerScreen = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [notes, setNotes] = useState('');

  const moods = [
    { score: 5, icon: 'emoticon-excited-outline', color: '#4CAF50' },
    { score: 4, icon: 'emoticon-happy-outline', color: '#8BC34A' },
    { score: 3, icon: 'emoticon-neutral-outline', color: '#FFC107' },
    { score: 2, icon: 'emoticon-sad-outline', color: '#FF9800' },
    { score: 1, icon: 'emoticon-cry-outline', color: '#F44336' },
  ];

  const handleSubmit = () => {
    // Implement mood submission logic here
    console.log('Mood:', selectedMood, 'Notes:', notes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      <View style={styles.moodContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.score}
            style={[
              styles.moodButton,
              selectedMood === mood.score && styles.selectedMoodButton,
            ]}
            onPress={() => setSelectedMood(mood.score)}
          >
            <Icon name={mood.icon} size={40} color={mood.color} />
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Add notes (optional)"
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      <TouchableOpacity
        style={[styles.submitButton, !selectedMood && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!selectedMood}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
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
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  moodButton: {
    padding: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selectedMoodButton: {
    borderColor: '#007AFF',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MoodTrackerScreen;