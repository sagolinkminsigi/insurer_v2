type int2 = number;
type int4 = number;
type int8 = number;

type text = string;

type timestamptz = string;
type gender = 'male' | 'female' | 'etc';

export interface User {
  id: int8;
  created_at: timestamptz;
  name: text;
  email: text;
  gender: gender;
}

export interface Accident {
  id: number;
  name: string;
  email: string;
}