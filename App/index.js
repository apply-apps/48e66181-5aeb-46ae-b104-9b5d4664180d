// Filename: index.js
// Combined code from all files
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, ActivityIndicator, ScrollView, Button, View } from 'react-native';
import axios from 'axios';

const Jokes = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJokes = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant. Please provide answers for given requests.',
          },
          {
            role: 'user',
            content: 'Tell me a joke',
          },
        ],
        model: 'gpt-4o',
      });
      const { data } = response;
      const resultString = data.response;
      setJokes((prev) => [...prev, resultString]);
    } catch (error) {
      console.error('Error fetching jokes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Jokes</Text>
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> : jokes.map((joke, index) => (
          <View key={index} style={styles.jokeContainer}>
            <Text style={styles.jokeText}>{joke}</Text>
          </View>
        ))}
        <Button title="Fetch More Jokes" onPress={fetchJokes} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Jokes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  jokeContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  jokeText: {
    fontSize: 16,
  },
});