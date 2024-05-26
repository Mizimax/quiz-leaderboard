import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Button} from 'react-native';
import {questions} from '../mocks/question';
import {useNavigation} from '@react-navigation/native';
import {getRandomQuestions} from '../utils/common';
import {Answer, Question, RootStackParamList} from './types';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RadioButton} from 'react-native-paper';

type QuizScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Quiz'>;

const QuizScreen: React.FC = () => {
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const navigation = useNavigation<QuizScreenNavigationProp>();
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleQuizCompletion = async () => {
    try {
      const existingScoresJSON = await AsyncStorage.getItem('quizScores');
      const existingScores = existingScoresJSON
        ? JSON.parse(existingScoresJSON)
        : [];
      const updatedScores = [...existingScores, score];
      await AsyncStorage.setItem('quizScores', JSON.stringify(updatedScores));
      navigation.navigate('Leaderboard');
    } catch (error) {
      console.log('Error storing quiz score:', error);
    }
  };

  useEffect(() => {
    const randomizedQuestions = getRandomQuestions(questions, 20);
    setQuizQuestions(randomizedQuestions);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {quizQuestions.map((question, index) => (
        <View key={question.id} style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {index + 1}. {question.text}
          </Text>
          {question.answers.map((answer: Answer) => (
            <View key={answer.id}>
              <RadioButton.Android
                value={answer.text}
                onPress={() => handleAnswerSelect(answer.correct)}
              />
              <Text>{answer.text}</Text>
            </View>
          ))}
        </View>
      ))}
      <Button title="Go to Leaderboard" onPress={handleQuizCompletion} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default QuizScreen;
