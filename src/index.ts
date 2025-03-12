// index.ts

interface Workout {
    type: string; // e.g., "running", "yoga", etc.
    duration: number; // in minutes
    caloriesBurned: number; // calories burned during the workout
    date: Date; // date of the workout
  }
  
  interface User {
    id: string;
    name: string;
    age: number;
    weight: number; // in kg
    height: number; // in cm
    workouts: Workout[];
  }
  
  class FitnessTracker {
    private users: Map<string, User>;
  
    constructor() {
      this.users = new Map();
    }
  
    // Add a user to the system
    addUser(id: string, name: string, age: number, weight: number, height: number): void {
      if (this.users.has(id)) {
        throw new Error('User with this ID already exists.');
      }
      if (age <= 0 || weight <= 0 || height <= 0) {
        throw new Error('Age, weight, and height must be positive values.');
      }
  
      const user: User = { id, name, age, weight, height, workouts: [] };
      this.users.set(id, user);
    }
  
    // Log a workout for a user
    logWorkout(userId: string, workout: Workout): void {
      const user = this.users.get(userId);
      if (!user) {
        throw new Error('User not found.');
      }
      if (workout.duration <= 0 || workout.caloriesBurned <= 0) {
        throw new Error('Workout duration and calories burned must be positive values.');
      }
      user.workouts.push(workout);
    }
  
    // Get all workouts of a user
    getAllWorkoutsOf(userId: string): Workout[] {
      const user = this.users.get(userId);
      if (!user) {
        throw new Error('User not found.');
      }
      return user.workouts;
    }
  
    // Get workouts filtered by type for a user
    getAllWorkoutsByType(userId: string, type: string): Workout[] {
      const user = this.users.get(userId);
      if (!user) {
        throw new Error('User not found.');
      }
      return user.workouts.filter(workout => workout.type === type);
    }
  
    // Get all users in the system
    getUsers(): User[] {
      return Array.from(this.users.values());
    }
  
    // Get details of a user by ID
    getUser(id: string): User | undefined {
      return this.users.get(id);
    }
  
    // Update user details
    updateUser(id: string, updatedFields: Partial<Omit<User, 'id'>>): void {
      const user = this.users.get(id);
      if (!user) {
        throw new Error('User not found.');
      }
  
      if (updatedFields.age && updatedFields.age <= 0) {
        throw new Error('Age must be a positive value.');
      }
      if (updatedFields.weight && updatedFields.weight <= 0) {
        throw new Error('Weight must be a positive value.');
      }
      if (updatedFields.height && updatedFields.height <= 0) {
        throw new Error('Height must be a positive value.');
      }
  
      Object.assign(user, updatedFields);
    }
  }
  
  // Example usage:
  
  const tracker = new FitnessTracker();
  
  // Adding users
  tracker.addUser('1', 'Alice', 30, 70, 165);
  tracker.addUser('2', 'Bob', 25, 80, 175);
  
  // Logging workouts
  tracker.logWorkout('1', { type: 'running', duration: 30, caloriesBurned: 300, date: new Date() });
  tracker.logWorkout('1', { type: 'yoga', duration: 45, caloriesBurned: 200, date: new Date() });
  
  // Getting all workouts of a user
  console.log(tracker.getAllWorkoutsOf('1'));
  
  // Getting all workouts of a specific type
  console.log(tracker.getAllWorkoutsByType('1', 'running'));
  
  // Updating user details
  tracker.updateUser('1', { age: 31, weight: 72 });
  
  // Fetching updated user
  console.log(tracker.getUser('1'));
  
  // Get all users
  console.log(tracker.getUsers());
  