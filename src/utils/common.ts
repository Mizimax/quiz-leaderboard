import {Question} from '../screens/types';

export const randomizeArray = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

export const getRandomQuestions = (
  questions: Question[],
  count: number,
): Question[] => {
  const randomQuestions = randomizeArray(questions);
  return randomQuestions.slice(0, count).map(question => ({
    ...question,
    answers: randomizeArray(question.answers),
  }));
};
