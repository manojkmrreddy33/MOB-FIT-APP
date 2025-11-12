import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import Dashboard from './components/Dashboard';
import MealTracker from './components/MealTracker';
import WorkoutTracker from './components/WorkoutTracker';
import BMICalculator from './components/BMICalculator';
import Profile from './components/Profile';
import Navbar from './components/Navbar';

export type Screen = 'login' | 'register' | 'dashboard' | 'meals' | 'workouts' | 'bmi' | 'profile';

export interface User {
  name: string;
  email: string;
  age: number;
  height: number;
  weight: number;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  amount: number; // in grams
}

export interface MealTemplate {
  id: string;
  name: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
}

export interface Workout {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration?: number;
  caloriesBurned: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleLogin = (email: string, password: string) => {
    // Mock login - in real app, validate credentials
    setUser({
      name: 'John Doe',
      email: email,
      age: 28,
      height: 175,
      weight: 75,
    });
    navigate('dashboard');
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // Mock register - in real app, create user account
    setUser({
      name: name,
      email: email,
      age: 25,
      height: 170,
      weight: 70,
    });
    navigate('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setMeals([]);
    setWorkouts([]);
    navigate('login');
  };

  const addMeal = (meal: Omit<Meal, 'id'>) => {
    setMeals([...meals, { ...meal, id: Date.now().toString() }]);
  };

  const updateMeal = (id: string, updatedMeal: Omit<Meal, 'id'>) => {
    setMeals(meals.map(m => m.id === id ? { ...updatedMeal, id } : m));
  };

  const deleteMeal = (id: string) => {
    setMeals(meals.filter(m => m.id !== id));
  };

  const addWorkout = (workout: Omit<Workout, 'id'>) => {
    setWorkouts([...workouts, { ...workout, id: Date.now().toString() }]);
  };

  const updateWorkout = (id: string, updatedWorkout: Omit<Workout, 'id'>) => {
    setWorkouts(workouts.map(w => w.id === id ? { ...updatedWorkout, id } : w));
  };

  const deleteWorkout = (id: string) => {
    setWorkouts(workouts.filter(w => w.id !== id));
  };

  const updateProfile = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalWorkouts = workouts.length;
  const bmi = user ? (user.weight / ((user.height / 100) ** 2)).toFixed(1) : '0';

  const isAuthenticated = currentScreen !== 'login' && currentScreen !== 'register';

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} onNavigateRegister={() => navigate('register')} isDarkTheme={isDarkTheme} />;
      case 'register':
        return <RegisterScreen onRegister={handleRegister} onNavigateLogin={() => navigate('login')} isDarkTheme={isDarkTheme} />;
      case 'dashboard':
        return (
          <Dashboard
            totalCalories={totalCalories}
            totalWorkouts={totalWorkouts}
            bmi={bmi}
            navigate={navigate}
            isDarkTheme={isDarkTheme}
          />
        );
      case 'meals':
        return (
          <MealTracker
            meals={meals}
            onAddMeal={addMeal}
            onUpdateMeal={updateMeal}
            onDeleteMeal={deleteMeal}
            onBack={() => navigate('dashboard')}
            isDarkTheme={isDarkTheme}
          />
        );
      case 'workouts':
        return (
          <WorkoutTracker
            workouts={workouts}
            onAddWorkout={addWorkout}
            onUpdateWorkout={updateWorkout}
            onDeleteWorkout={deleteWorkout}
            onBack={() => navigate('dashboard')}
            isDarkTheme={isDarkTheme}
          />
        );
      case 'bmi':
        return <BMICalculator user={user} onBack={() => navigate('dashboard')} isDarkTheme={isDarkTheme} />;
      case 'profile':
        return (
          <Profile
            user={user}
            totalCalories={totalCalories}
            totalWorkouts={totalWorkouts}
            onUpdateProfile={updateProfile}
            onLogout={handleLogout}
            onBack={() => navigate('dashboard')}
            isDarkTheme={isDarkTheme}
          />
        );
      default:
        return <LoginScreen onLogin={handleLogin} onNavigateRegister={() => navigate('register')} isDarkTheme={isDarkTheme} />;
    }
  };

  return (
    <div className={isDarkTheme ? 'dark bg-gray-900 min-h-screen' : 'bg-gray-50 min-h-screen'}>
      {isAuthenticated && (
        <Navbar 
          navigate={navigate} 
          onLogout={handleLogout}
          isDarkTheme={isDarkTheme}
          toggleTheme={toggleTheme}
          currentScreen={currentScreen}
        />
      )}
      <div className="mx-auto max-w-md">
        {renderScreen()}
      </div>
    </div>
  );
}