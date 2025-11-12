import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Edit2, UserCircle } from 'lucide-react';

interface ProfileProps {
  user: User | null;
  totalCalories: number;
  totalWorkouts: number;
  onUpdateProfile: (user: User) => void;
  onLogout: () => void;
  onBack: () => void;
  isDarkTheme: boolean;
}

export default function Profile({ user, totalCalories, totalWorkouts, onUpdateProfile, onLogout, onBack, isDarkTheme }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [age, setAge] = useState(user?.age.toString() || '');
  const [height, setHeight] = useState(user?.height.toString() || '');
  const [weight, setWeight] = useState(user?.weight.toString() || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !age || !height || !weight) return;

    onUpdateProfile({
      name,
      email,
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setAge(user?.age.toString() || '');
    setHeight(user?.height.toString() || '');
    setWeight(user?.weight.toString() || '');
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen px-4 py-6 pt-20">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={onBack} 
            className={`mr-3 rounded-lg p-2 ${
              isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className={`h-5 w-5 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`} />
          </button>
          <h1 className={isDarkTheme ? 'text-white' : 'text-gray-900'}>My Profile</h1>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className={`rounded-lg p-2 ${
              isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <Edit2 className="h-5 w-5 text-blue-600" />
          </button>
        )}
      </div>

      {/* Profile Avatar */}
      <div className="mb-6 flex justify-center">
        <div className="rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1">
          <div className={`rounded-full p-2 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
            <UserCircle className={`h-20 w-20 ${isDarkTheme ? 'text-gray-400' : 'text-gray-400'}`} />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <Card className={`mb-6 rounded-2xl shadow-md ${
        isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white'
      }`}>
        <CardHeader>
          <CardTitle className={isDarkTheme ? 'text-white' : 'text-gray-900'}>
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className={isDarkTheme ? 'text-gray-300' : ''}>Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`rounded-xl ${
                    isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : ''
                  }`}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className={isDarkTheme ? 'text-gray-300' : ''}>Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`rounded-xl ${
                    isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : ''
                  }`}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="age" className={isDarkTheme ? 'text-gray-300' : ''}>Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={`rounded-xl ${
                      isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height" className={isDarkTheme ? 'text-gray-300' : ''}>Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className={`rounded-xl ${
                      isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className={isDarkTheme ? 'text-gray-300' : ''}>Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className={`rounded-xl ${
                      isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700"
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className={`rounded-xl ${
                    isDarkTheme ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''
                  }`}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 text-sm">
              <div className={`flex justify-between border-b pb-2 ${
                isDarkTheme ? 'border-gray-700' : 'border-gray-100'
              }`}>
                <span className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>Name</span>
                <span className={isDarkTheme ? 'text-gray-200' : 'text-gray-900'}>{user.name}</span>
              </div>
              <div className={`flex justify-between border-b pb-2 ${
                isDarkTheme ? 'border-gray-700' : 'border-gray-100'
              }`}>
                <span className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>Email</span>
                <span className={isDarkTheme ? 'text-gray-200' : 'text-gray-900'}>{user.email}</span>
              </div>
              <div className={`flex justify-between border-b pb-2 ${
                isDarkTheme ? 'border-gray-700' : 'border-gray-100'
              }`}>
                <span className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>Age</span>
                <span className={isDarkTheme ? 'text-gray-200' : 'text-gray-900'}>{user.age} years</span>
              </div>
              <div className={`flex justify-between border-b pb-2 ${
                isDarkTheme ? 'border-gray-700' : 'border-gray-100'
              }`}>
                <span className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>Height</span>
                <span className={isDarkTheme ? 'text-gray-200' : 'text-gray-900'}>{user.height} cm</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>Weight</span>
                <span className={isDarkTheme ? 'text-gray-200' : 'text-gray-900'}>{user.weight} kg</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className={`mb-6 rounded-2xl shadow-md ${
        isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white'
      }`}>
        <CardHeader>
          <CardTitle className={isDarkTheme ? 'text-white' : 'text-gray-900'}>
            My Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>Total Calories Consumed</span>
              <span className="text-blue-600">{totalCalories} kcal</span>
            </div>
            <div className="flex justify-between">
              <span className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>Total Workouts</span>
              <span className="text-green-600">{totalWorkouts}</span>
            </div>
            <div className="flex justify-between">
              <span className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>Current BMI</span>
              <span className="text-purple-600">
                {(user.weight / ((user.height / 100) ** 2)).toFixed(1)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Button
        onClick={onLogout}
        variant="outline"
        className={`w-full rounded-xl ${
          isDarkTheme 
            ? 'border-red-700 text-red-400 hover:bg-red-900/20' 
            : 'border-red-200 text-red-600 hover:bg-red-50'
        }`}
      >
        Logout
      </Button>
    </div>
  );
}
