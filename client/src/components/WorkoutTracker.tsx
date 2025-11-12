import { useState } from 'react';
import { Workout } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';

interface WorkoutTrackerProps {
  workouts: Workout[];
  onAddWorkout: (workout: Omit<Workout, 'id'>) => void;
  onUpdateWorkout: (id: string, workout: Omit<Workout, 'id'>) => void;
  onDeleteWorkout: (id: string) => void;
  onBack: () => void;
  isDarkTheme: boolean;
}

export default function WorkoutTracker({ workouts, onAddWorkout, onUpdateWorkout, onDeleteWorkout, onBack, isDarkTheme }: WorkoutTrackerProps) {
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sets || !reps || !caloriesBurned) return;

    const workoutData: Omit<Workout, 'id'> = {
      name,
      sets: Number(sets),
      reps: Number(reps),
      duration: duration ? Number(duration) : undefined,
      caloriesBurned: Number(caloriesBurned),
    };

    if (editingId) {
      onUpdateWorkout(editingId, workoutData);
      setEditingId(null);
    } else {
      onAddWorkout(workoutData);
    }

    // Reset form
    setName('');
    setSets('');
    setReps('');
    setDuration('');
    setCaloriesBurned('');
  };

  const handleEdit = (workout: Workout) => {
    setName(workout.name);
    setSets(workout.sets.toString());
    setReps(workout.reps.toString());
    setDuration(workout.duration?.toString() || '');
    setCaloriesBurned(workout.caloriesBurned.toString());
    setEditingId(workout.id);
  };

  const handleCancel = () => {
    setName('');
    setSets('');
    setReps('');
    setDuration('');
    setCaloriesBurned('');
    setEditingId(null);
  };

  return (
    <div className="min-h-screen px-4 py-6 pt-20 pb-8">
      <div className="mb-6 flex items-center">
        <button 
          onClick={onBack} 
          className={`mr-3 rounded-lg p-2 ${
            isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          <ArrowLeft className={`h-5 w-5 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`} />
        </button>
        <h1 className={isDarkTheme ? 'text-white' : 'text-gray-900'}>Workout Tracker</h1>
      </div>

      {/* Form */}
      <Card className={`mb-6 rounded-2xl shadow-md ${
        isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white'
      }`}>
        <CardHeader>
          <CardTitle className={isDarkTheme ? 'text-white' : 'text-gray-900'}>
            {editingId ? 'Edit Workout' : 'Add New Workout'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workout-name" className={isDarkTheme ? 'text-gray-300' : ''}>
                Exercise Name
              </Label>
              <Input
                id="workout-name"
                type="text"
                placeholder="e.g., Bench Press"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`rounded-xl ${
                  isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                }`}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="sets" className={isDarkTheme ? 'text-gray-300' : ''}>
                  Sets
                </Label>
                <Input
                  id="sets"
                  type="number"
                  placeholder="3"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  className={`rounded-xl ${
                    isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                  }`}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reps" className={isDarkTheme ? 'text-gray-300' : ''}>
                  Reps
                </Label>
                <Input
                  id="reps"
                  type="number"
                  placeholder="12"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className={`rounded-xl ${
                    isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                  }`}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="duration" className={isDarkTheme ? 'text-gray-300' : ''}>
                  Duration (mins) <span className="text-xs text-gray-500">(optional)</span>
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className={`rounded-xl ${
                    isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                  }`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="calories-burned" className={isDarkTheme ? 'text-gray-300' : ''}>
                  Calories Burned
                </Label>
                <Input
                  id="calories-burned"
                  type="number"
                  placeholder="250"
                  value={caloriesBurned}
                  onChange={(e) => setCaloriesBurned(e.target.value)}
                  className={`rounded-xl ${
                    isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                  }`}
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1 rounded-xl bg-green-600 hover:bg-green-700"
              >
                {editingId ? 'Update Workout' : 'Add Workout'}
              </Button>
              {editingId && (
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
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Workouts List */}
      <div className="space-y-3">
        <h2 className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
          Today's Workouts
        </h2>
        {workouts.length === 0 ? (
          <p className={`text-center text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
            No workouts added yet. Let's get moving!
          </p>
        ) : (
          workouts.map((workout) => (
            <Card 
              key={workout.id} 
              className={`rounded-xl shadow-sm ${
                isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <CardContent className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex-1">
                    <p className={isDarkTheme ? 'text-white' : 'text-gray-900'}>{workout.name}</p>
                    <div className="mt-1 flex flex-wrap gap-2 text-sm">
                      <span className="text-green-600">
                        {workout.sets} sets × {workout.reps} reps
                      </span>
                      {workout.duration && (
                        <span className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>
                          • {workout.duration} mins
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(workout)}
                      className={`rounded-lg p-2 ${
                        isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Edit2 className="h-4 w-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => onDeleteWorkout(workout.id)}
                      className={`rounded-lg p-2 ${
                        isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>
                <div className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span>🔥 {workout.caloriesBurned} calories burned</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
