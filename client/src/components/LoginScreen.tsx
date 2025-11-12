import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onNavigateRegister: () => void;
  isDarkTheme: boolean;
}

export default function LoginScreen({ onLogin, onNavigateRegister, isDarkTheme }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className={`rounded-2xl p-6 shadow-lg sm:p-8 ${
          isDarkTheme ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h1 className={`mb-6 text-center ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            Welcome Back 👋
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className={isDarkTheme ? 'text-gray-300' : ''}>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`rounded-xl ${
                  isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                }`}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className={isDarkTheme ? 'text-gray-300' : ''}>Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`rounded-xl ${
                  isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                }`}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>
          </form>

          <p className={`mt-6 text-center text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <button
              onClick={onNavigateRegister}
              className="text-blue-600 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}