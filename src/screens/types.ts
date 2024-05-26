export interface Answer {
  id: number;
  text: string;
  correct: boolean;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export type RootStackParamList = {
  Quiz: undefined;
  Leaderboard: undefined;
};
