export interface LevelDefinition {
  level: number;
  minXp: number;
}

export const LEVEL_DEFINITIONS: LevelDefinition[] = [
  { level: 1, minXp: 0 },
  { level: 2, minXp: 50 },
  { level: 3, minXp: 100 },
  { level: 4, minXp: 150 },
  { level: 5, minXp: 200 },
  { level: 6, minXp: 250 },
  { level: 7, minXp: 300 },
  { level: 8, minXp: 350 },
  { level: 9, minXp: 400 },
  { level: 10, minXp: 450 },
  { level: 11, minXp: 500 },
].sort((a, b) => a.minXp - b.minXp);

