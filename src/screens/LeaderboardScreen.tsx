import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const LeaderboardScreen: React.FC = () => {
  const [quizScores, setQuizScores] = useState<number[]>([]);

  useEffect(() => {
    const fetchQuizScores = async () => {
      try {
        const storedScores = await AsyncStorage.getItem('quizScores');
        if (storedScores !== null) {
          const parsedScores = JSON.parse(storedScores);
          setQuizScores(parsedScores);
        }
      } catch (error) {
        console.log('Error retrieving quiz scores:', error);
      }
    };

    fetchQuizScores();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      {quizScores.map((score, index) => (
        <View key={index} style={styles.leaderboardEntry}>
          <Text style={styles.leaderboardText}>{`Player ${
            index + 1
          } - Score: ${score}`}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  leaderboardEntry: {
    width: '100%',
    marginBottom: 10,
  },
  leaderboardText: {
    fontSize: 18,
  },
});

export default LeaderboardScreen;
