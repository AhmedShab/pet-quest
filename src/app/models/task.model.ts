export interface Task {
  _id: string;           // MongoDB ID
  petId: string;          // Reference to pet
  type: string;           // e.g., 'feed', 'clean', 'play'
  dueDate: string;        // ISO string format
  xpReward: number;       // XP gained when completed
  completed?: boolean;    // Optional flag
}
