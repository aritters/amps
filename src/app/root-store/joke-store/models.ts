export interface JokeResult {
  type: string;
  value: Joke[];
}

export interface Joke {
  id: string;
  joke: string;
}
