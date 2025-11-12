import { Screen } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface DashboardProps {
  totalCalories: number;
  totalWorkouts: number;
  bmi: string;
  navigate: (screen: Screen) => void;
  isDarkTheme: boolean;
}

export default function Dashboard({ totalCalories, totalWorkouts, bmi, navigate, isDarkTheme }: DashboardProps) {
  return (
    <div className="min-h-screen px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className={`text-center ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
          Your Dashboard
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <Card className={`rounded-2xl shadow-md ${
          isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white'
        }`}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Calories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-600">{totalCalories} kcal</p>
          </CardContent>
        </Card>

        <Card className={`rounded-2xl shadow-md ${
          isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white'
        }`}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Workouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600">{totalWorkouts}</p>
          </CardContent>
        </Card>

        <Card className={`rounded-2xl shadow-md ${
          isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white'
        }`}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
              BMI Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-600">{bmi}</p>
          </CardContent>
        </Card>

        <Card className={`rounded-2xl shadow-md ${
          isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white'
        }`}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
              Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-600">7 days 🔥</p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Buttons */}
      <div className="space-y-3">
        <Button
          onClick={() => navigate('meals')}
          className="w-full rounded-xl bg-blue-600 py-6 hover:bg-blue-700"
        >
          <span>🍽️ Meals</span>
        </Button>

        <Button
          onClick={() => navigate('workouts')}
          className="w-full rounded-xl bg-green-600 py-6 hover:bg-green-700"
        >
          <span>💪 Workouts</span>
        </Button>

        <Button
          onClick={() => navigate('bmi')}
          className="w-full rounded-xl bg-purple-600 py-6 hover:bg-purple-700"
        >
          <span>⚖️ BMI Calculator</span>
        </Button>

        <Button
          onClick={() => navigate('profile')}
          className="w-full rounded-xl bg-gray-600 py-6 hover:bg-gray-700"
        >
          <span>👤 Profile</span>
        </Button>
      </div>
    </div>
  );
}