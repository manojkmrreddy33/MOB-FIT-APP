import { useState, useEffect } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft } from 'lucide-react';

interface BMICalculatorProps {
  user: User | null;
  onBack: () => void;
  isDarkTheme: boolean;
}

export default function BMICalculator({ user, onBack, isDarkTheme }: BMICalculatorProps) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [categoryColor, setCategoryColor] = useState('');

  useEffect(() => {
    if (user) {
      setHeight(user.height.toString());
      setWeight(user.weight.toString());
    }
  }, [user]);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!height || !weight) return;

    const heightInMeters = Number(height) / 100;
    const weightInKg = Number(weight);
    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
    
    setBmi(calculatedBMI);

    // Determine category
    if (calculatedBMI < 18.5) {
      setCategory('Underweight');
      setCategoryColor(isDarkTheme ? 'bg-yellow-900 border-yellow-700 text-yellow-300' : 'bg-yellow-100 border-yellow-300 text-yellow-800');
    } else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
      setCategory('Fit');
      setCategoryColor(isDarkTheme ? 'bg-green-900 border-green-700 text-green-300' : 'bg-green-100 border-green-300 text-green-800');
    } else if (calculatedBMI >= 25 && calculatedBMI < 30) {
      setCategory('Overweight');
      setCategoryColor(isDarkTheme ? 'bg-orange-900 border-orange-700 text-orange-300' : 'bg-orange-100 border-orange-300 text-orange-800');
    } else {
      setCategory('Obese');
      setCategoryColor(isDarkTheme ? 'bg-red-900 border-red-700 text-red-300' : 'bg-red-100 border-red-300 text-red-800');
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 pt-20">
      <div className="mb-6 flex items-center">
        <button 
          onClick={onBack} 
          className={`mr-3 rounded-lg p-2 ${
            isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          <ArrowLeft className={`h-5 w-5 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`} />
        </button>
        <h1 className={isDarkTheme ? 'text-white' : 'text-gray-900'}>BMI Calculator</h1>
      </div>

      <Card className={`mb-6 rounded-2xl shadow-md ${
        isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white'
      }`}>
        <CardHeader>
          <CardTitle className={isDarkTheme ? 'text-white' : 'text-gray-900'}>
            Calculate Your BMI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={calculateBMI} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="height" className={isDarkTheme ? 'text-gray-300' : ''}>
                Height (cm)
              </Label>
              <Input
                id="height"
                type="number"
                placeholder="175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className={`rounded-xl ${
                  isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                }`}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className={isDarkTheme ? 'text-gray-300' : ''}>
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className={`rounded-xl ${
                  isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                }`}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-purple-600 hover:bg-purple-700"
            >
              Calculate BMI
            </Button>
          </form>
        </CardContent>
      </Card>

      {bmi !== null && (
        <Card className={`rounded-2xl shadow-md ${
          isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white'
        }`}>
          <CardHeader>
            <CardTitle className={isDarkTheme ? 'text-white' : 'text-gray-900'}>
              Your Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className={`mb-2 text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                Your BMI
              </p>
              <p className="text-purple-600">{bmi.toFixed(1)}</p>
            </div>

            <div className={`rounded-xl border-2 p-4 text-center ${categoryColor}`}>
              <p className="mb-1 text-sm">Category</p>
              <p>{category}</p>
            </div>

            <div className={`space-y-2 rounded-xl p-4 text-xs ${
              isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'
            }`}>
              <p>BMI Categories:</p>
              <div className="space-y-1">
                <p>• Underweight: Below 18.5</p>
                <p>• Normal weight: 18.5 - 24.9</p>
                <p>• Overweight: 25 - 29.9</p>
                <p>• Obese: 30 and above</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
