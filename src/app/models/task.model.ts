export interface Task {
  _id: string;           // MongoDB ID
  petType: string;          // Reference to pet type
  type: string;           // e.g., 'feed', 'clean', 'play'
  timeOfDay: string;        // ISO string format
  completed?: boolean;    // Optional flag
  xpReward: number;       // XP gained when completed
  label: string;         // Description of the task
  date: Date;            // Date the task is scheduled for
}
