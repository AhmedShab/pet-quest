export interface Pet {
  _id: string;
  name: string;
  species: 'Cat' | 'Guinea Pig' | string;
  avatarUrl: string;
  xp: number;
  level: number;
  owner: string;
}
