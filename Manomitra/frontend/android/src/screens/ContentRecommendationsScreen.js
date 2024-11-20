import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ContentRecommendationsScreen = () => {
  const [activeTab, setActiveTab] = useState('quotes');
  const [content, setContent] = useState([]);

  const tabs = [
    { id: 'quotes', icon: 'format-quote-close', label: 'Quotes' },
    { id: 'music', icon: 'music', label: 'Music' },
    { id: 'exercises', icon: 'run', label: 'Exercises' },
    { id: 'stories', icon: 'book-open-variant', label: 'Stories' },
    { id: 'jokes', icon: 'emoticon-outline', label: 'Jokes' },
    { id: 'yogasanas', icon: 'yoga', label: 'Yogasanas' },
  ];

  useEffect(() => {
    // Fetch content based on activeTab
    // This is a placeholder, replace with actual API calls
    const mockContent = {
      quotes: [
        { id: 1, text: 'Be the change you wish to see in the world.', author: 'Mahatma Gandhi' },
        { id: 2, text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
      ],
      music: [
        { id: 1, title: 'Relaxing Piano', artist: 'John Doe', duration: '3:45' },
        { id: 2, title: 'Nature Sounds', artist: 'Jane Smith', duration: '5:20' },
      ],
      exercises: [
        { id: 1, name: 'Deep Breathing', duration: '5 minutes' },
        { id: 2, name: 'Progressive Muscle Relaxation', duration: '10 minutes' },
      ],
      stories: [
        { id: 1, title: 'The Elephant Rope', length: 'Short' },
        { id: 2, title: 'The Two Wolves', length: 'Medium' },
      ],
      jokes: [
        { id: 1, setup: 'Why don't scientists trust atoms?', punchline: 'Because they make up everything!' },
        { id: 2, setup: 'Why did the scarecrow win an award?', punchline: 'He was outstanding in his field!' },
      ],
      yogasanas: [
        { id: 1, name: 'Tadasana (Mountain Pose)', benefits: 'Improves posture and balance' },
        { id: 2, name: 'Vrikshasana (Tree Pose)', benefits: 'Improves balance and concentration' },
      ],
    };

    setContent(mockContent[activeTab]);
  }, [activeTab]);

  const renderItem = ({ item }) => {
    switch (activeTab) {
      case 'quotes':
        return (
          <View style={styles.contentItem}>
            <Text style={styles.quoteText}>"{item.text}"</Text>
            <Text style={styles.quoteAuthor}>- {item.author}</Text>
          </View>
        );
      case 'music':
        return (
          <View style={styles.contentItem}>
            <Text style={styles.musicTitle}>{item.title}</Text>
            <Text style={styles.musicArtist}>{item.artist}</Text>
            <Text style={styles.musicDuration}>{item.duration}</Text>
          </View>
        );
      case 'exercises':
        return (
          <View style={styles.contentItem}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseDuration}>{item.duration}</Text>
          </View>
        );
      case 'stories':
        return (
          <View style={styles.contentItem}>
            <Text style={styles.storyTitle}>{item.title}</Text>
            <Text style={styles.storyLength}>{item.length}</Text>
          </View>
        );
      case 'jokes':
        return (
          <View style={styles.contentItem}>
            <Text style={styles.jokeSetup}>{item.setup}</Text>
            <Text style={styles.jokePunchline}>{item.punchline}</Text>
          </View>
        );
      case 'yogasanas':
        return (
          <View style={styles.contentItem}>
            <Text style={styles.yogasanaName}>{item.name}</Text>
            <Text style={styles.yogasanaBenefits}>{item.benefits}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personalized Content for You</Text>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Icon name={tab.icon} size={24} color={activeTab === tab.id ? '#007AFF' : '#000'} />
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={content}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.contentList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 12,
    marginTop: 5,
  },
  activeTabText: {
    color: '#007AFF',
  },
  contentList: {
    flex: 1,
  },
  contentItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  quoteAuthor: {
    fontSize: 14,
    textAlign: 'right',
  },
  musicTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  musicArtist: {
    fontSize: 14,
  },
  musicDuration: {
    fontSize: 12,
    color: '#666',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseDuration: {
    fontSize: 14,
    color: '#666',
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  storyLength: {
    fontSize: 14,
    color: '#666',
  },
  jokeSetup: {
    fontSize: 16,
    marginBottom: 5,
  },
  jokePunchline: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  yogasanaName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  yogasanaBenefits: {
    fontSize: 14,
    color: '#666',
  },
});

export default ContentRecommendationsScreen;