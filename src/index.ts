import * as readline from 'readline';

type Workout = {
  type: string;
  duration: number; 
  caloriesBurned: number;
};

type User = {
  id: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  workouts: Workout[];
};

class FitnessApp {
  private users: User[] = [];

  addUser(id: string, name: string, age: number, weight: number, height: number): void {
    const newUser: User = {
      id,
      name,
      age,
      weight,
      height,
      workouts: [],
    };
    this.users.push(newUser);
    console.log(`User ${name} added successfully!`);
  }

  logWorkout(userId: string, workout: Workout): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.workouts.push(workout);
      console.log('Workout logged successfully!');
    } else {
      console.log('User not found');
    }
  }

  getAllWorkoutsOf(userId: string): Workout[] | undefined {
    const user = this.users.find(u => u.id === userId);
    return user ? user.workouts : undefined;
  }

  getAllWorkoutsByType(userId: string, type: string): Workout[] | undefined {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      return user.workouts.filter(workout => workout.type === type);
    }
    return undefined;
  }

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  updateUser(id: string, updatedFields: Partial<Omit<User, 'id'>>): void {
    const user = this.users.find(u => u.id === id);
    if (user) {
      Object.assign(user, updatedFields);
      console.log('User updated successfully!');
    } else {
      console.log('User not found');
    }
  }
}

const app = new FitnessApp();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (question: string): Promise<string> => {
  return new Promise(resolve => rl.question(question, resolve));
};

const main = async () => {
  let running = true;

  while (running) {
    console.log(`
      Welcome to the Fitness App!
      1. Add User
      2. Log Workout
      3. Get All Workouts of a User
      4. Get All Workouts by Type
      5. Get All Users
      6. Get User Details
      7. Update User
      8. Exit
    `);

    const choice = await askQuestion('Please choose an option (1-8): ');

    switch (choice) {
      case '1':
        const id = await askQuestion('Enter user ID: ');
        const name = await askQuestion('Enter user name: ');
        const age = parseInt(await askQuestion('Enter user age: '), 10);
        const weight = parseFloat(await askQuestion('Enter user weight (kg): '));
        const height = parseFloat(await askQuestion('Enter user height (cm): '));
        app.addUser(id, name, age, weight, height);
        break;

      case '2':
        const userId = await askQuestion('Enter user ID: ');
        const workoutType = await askQuestion('Enter workout type: ');
        const workoutDuration = parseInt(await askQuestion('Enter workout duration (minutes): '), 10);
        const caloriesBurned = parseInt(await askQuestion('Enter calories burned: '), 10);
        app.logWorkout(userId, { type: workoutType, duration: workoutDuration, caloriesBurned });
        break;

      case '3':
        const workoutsUserId = await askQuestion('Enter user ID to view all workouts: ');
        const allWorkouts = app.getAllWorkoutsOf(workoutsUserId);
        console.log(allWorkouts ? allWorkouts : 'No workouts found.');
        break;

      case '4':
        const workoutsByTypeUserId = await askQuestion('Enter user ID: ');
        const type = await askQuestion('Enter workout type (e.g., running, yoga): ');
        const workoutsByType = app.getAllWorkoutsByType(workoutsByTypeUserId, type);
        console.log(workoutsByType ? workoutsByType : 'No workouts of this type found.');
        break;

      case '5':
        const users = app.getUsers();
        console.log(users.length > 0 ? users : 'No users found.');
        break;

      case '6':
        const userDetailsId = await askQuestion('Enter user ID: ');
        const user = app.getUser(userDetailsId);
        console.log(user ? user : 'User not found.');
        break;

      case '7':
        const updateUserId = await askQuestion('Enter user ID to update: ');
        const updatedWeight = parseFloat(await askQuestion('Enter new weight (kg): '));
        const updatedHeight = parseFloat(await askQuestion('Enter new height (cm): '));
        app.updateUser(updateUserId, { weight: updatedWeight, height: updatedHeight });
        break;

      case '8':
        console.log('Exiting the app. Goodbye!');
        running = false;
        rl.close();
        break;

      default:
        console.log('Invalid option. Please choose a valid option (1-8).');
    }
  }
};

// Start the app
main();