export interface Category {
  readonly id: number;
  name: string;
  questions: Question[];
}

export interface Question {
  readonly id: number;
  title: string;
  answer: string;
}
