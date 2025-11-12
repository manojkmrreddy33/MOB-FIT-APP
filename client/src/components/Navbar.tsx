import { useState } from 'react';
import { Screen } from '../App';
import { Menu, X, Sun, Moon, Home, Utensils, Dumbbell, Calculator, User, LogOut } from 'lucide-react';

interface NavbarProps {
  navigate: (screen: Screen) => void;
  onLogout: () => void;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  currentScreen: Screen;
}

export default function Navbar({ navigate, onLogout, isDarkTheme, toggleTheme, currentScreen }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (screen: Screen) => {
    navigate(screen);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { screen: 'dashboard' as Screen, label: 'Dashboard', icon: Home },
    { screen: 'meals' as Screen, label: 'Meals', icon: Utensils },
    { screen: 'workouts' as Screen, label: 'Workouts', icon: Dumbbell },
    { screen: 'bmi' as Screen, label: 'BMI Calculator', icon: Calculator },
    { screen: 'profile' as Screen, label: 'Profile', icon: User },
  ];

  return (
    <>
      <nav className={`sticky top-0 z-50 border-b ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <span className={`text-xl ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                💪 FitTrack
              </span>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`rounded-lg p-2 transition-colors ${
                  isDarkTheme ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkTheme ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Hamburger Menu */}
              <button
                onClick={toggleMenu}
                className={`rounded-lg p-2 transition-colors ${
                  isDarkTheme ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className={`fixed right-0 top-16 z-50 w-64 shadow-lg ${
            isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border-l border-b rounded-bl-lg`}>
            <div className="py-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.screen;
                return (
                  <button
                    key={item.screen}
                    onClick={() => handleNavigate(item.screen)}
                    className={`flex w-full items-center gap-3 px-4 py-3 transition-colors ${
                      isActive
                        ? isDarkTheme 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-500 text-white'
                        : isDarkTheme
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              <div className={`my-2 border-t ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}`} />
              
              <button
                onClick={() => {
                  onLogout();
                  setIsMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-3 transition-colors ${
                  isDarkTheme 
                    ? 'text-red-400 hover:bg-gray-700' 
                    : 'text-red-600 hover:bg-gray-100'
                }`}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
