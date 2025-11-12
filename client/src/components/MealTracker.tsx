import { useState, useEffect } from 'react';
import { Meal, MealTemplate } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Edit2, Trash2, Plus, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface MealTrackerProps {
  meals: Meal[];
  onAddMeal: (meal: Omit<Meal, 'id'>) => void;
  onUpdateMeal: (id: string, meal: Omit<Meal, 'id'>) => void;
  onDeleteMeal: (id: string) => void;
  onBack: () => void;
  isDarkTheme: boolean;
}

export default function MealTracker({ meals, onAddMeal, onUpdateMeal, onDeleteMeal, onBack, isDarkTheme }: MealTrackerProps) {
  // Meal templates stored in localStorage
  const [templates, setTemplates] = useState<MealTemplate[]>([]);
  
  // Template form state
  const [templateName, setTemplateName] = useState('');
  const [caloriesPer100g, setCaloriesPer100g] = useState('');
  const [proteinPer100g, setProteinPer100g] = useState('');
  const [carbsPer100g, setCarbsPer100g] = useState('');
  const [fatPer100g, setFatPer100g] = useState('');
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);

  // Meal form state
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [editingMealId, setEditingMealId] = useState<string | null>(null);

  // Load templates from localStorage
  useEffect(() => {
    const savedTemplates = localStorage.getItem('mealTemplates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
  }, []);

  // Save templates to localStorage
  const saveTemplates = (newTemplates: MealTemplate[]) => {
    setTemplates(newTemplates);
    localStorage.setItem('mealTemplates', JSON.stringify(newTemplates));
  };

  const handleAddTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateName || !caloriesPer100g) return;

    const templateData: MealTemplate = {
      id: editingTemplateId || Date.now().toString(),
      name: templateName,
      caloriesPer100g: Number(caloriesPer100g),
      proteinPer100g: Number(proteinPer100g) || 0,
      carbsPer100g: Number(carbsPer100g) || 0,
      fatPer100g: Number(fatPer100g) || 0,
    };

    if (editingTemplateId) {
      saveTemplates(templates.map(t => t.id === editingTemplateId ? templateData : t));
      setEditingTemplateId(null);
    } else {
      saveTemplates([...templates, templateData]);
    }

    // Reset form
    resetTemplateForm();
  };

  const resetTemplateForm = () => {
    setTemplateName('');
    setCaloriesPer100g('');
    setProteinPer100g('');
    setCarbsPer100g('');
    setFatPer100g('');
    setEditingTemplateId(null);
  };

  const handleEditTemplate = (template: MealTemplate) => {
    setTemplateName(template.name);
    setCaloriesPer100g(template.caloriesPer100g.toString());
    setProteinPer100g(template.proteinPer100g.toString());
    setCarbsPer100g(template.carbsPer100g.toString());
    setFatPer100g(template.fatPer100g.toString());
    setEditingTemplateId(template.id);
  };

  const handleDeleteTemplate = (id: string) => {
    saveTemplates(templates.filter(t => t.id !== id));
  };

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate || !amount) return;

    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return;

    const amountNum = Number(amount);
    const multiplier = amountNum / 100;

    const mealData: Omit<Meal, 'id'> = {
      name: template.name,
      calories: Math.round(template.caloriesPer100g * multiplier),
      protein: Math.round(template.proteinPer100g * multiplier),
      carbs: Math.round(template.carbsPer100g * multiplier),
      fat: Math.round(template.fatPer100g * multiplier),
      amount: amountNum,
    };

    if (editingMealId) {
      onUpdateMeal(editingMealId, mealData);
      setEditingMealId(null);
    } else {
      onAddMeal(mealData);
    }

    // Reset form
    setSelectedTemplate('');
    setAmount('');
  };

  const handleEditMeal = (meal: Meal) => {
    const template = templates.find(t => t.name === meal.name);
    if (template) {
      setSelectedTemplate(template.id);
      setAmount(meal.amount.toString());
      setEditingMealId(meal.id);
    }
  };

  const handleCancelMeal = () => {
    setSelectedTemplate('');
    setAmount('');
    setEditingMealId(null);
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
        <h1 className={isDarkTheme ? 'text-white' : 'text-gray-900'}>Meal Tracker</h1>
      </div>

      <Tabs defaultValue="add-meal" className="mb-6">
        <TabsList className={`grid w-full grid-cols-2 ${isDarkTheme ? 'bg-gray-800' : ''}`}>
          <TabsTrigger value="add-meal" className={isDarkTheme ? 'data-[state=active]:bg-gray-700' : ''}>
            Add Meal
          </TabsTrigger>
          <TabsTrigger value="templates" className={isDarkTheme ? 'data-[state=active]:bg-gray-700' : ''}>
            <BookOpen className="mr-2 h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>

        {/* Add Meal Tab */}
        <TabsContent value="add-meal">
          <Card className={`rounded-2xl shadow-md ${
            isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}>
            <CardHeader>
              <CardTitle className={isDarkTheme ? 'text-white' : 'text-gray-900'}>
                {editingMealId ? 'Edit Meal' : 'Log a Meal'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {templates.length === 0 ? (
                <p className={`text-center text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                  No meal templates yet. Create one in the Templates tab first!
                </p>
              ) : (
                <form onSubmit={handleAddMeal} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meal-template" className={isDarkTheme ? 'text-gray-300' : ''}>
                      Select Meal
                    </Label>
                    <select
                      id="meal-template"
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 ${
                        isDarkTheme 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'border-gray-300 bg-white text-gray-900'
                      }`}
                      required
                    >
                      <option value="">Choose a meal...</option>
                      {templates.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name} ({template.caloriesPer100g} cal/100g)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount" className={isDarkTheme ? 'text-gray-300' : ''}>
                      Amount (grams)
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="e.g., 150"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className={`rounded-xl ${
                        isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                      }`}
                      required
                    />
                  </div>

                  {/* Preview */}
                  {selectedTemplate && amount && (
                    <div className={`rounded-xl p-3 text-sm ${
                      isDarkTheme ? 'bg-gray-700' : 'bg-blue-50'
                    }`}>
                      <p className={`mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Preview:</p>
                      {(() => {
                        const template = templates.find(t => t.id === selectedTemplate);
                        if (!template) return null;
                        const multiplier = Number(amount) / 100;
                        return (
                          <div className={`space-y-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                            <p>Calories: {Math.round(template.caloriesPer100g * multiplier)} kcal</p>
                            <p>Protein: {Math.round(template.proteinPer100g * multiplier)}g</p>
                            <p>Carbs: {Math.round(template.carbsPer100g * multiplier)}g</p>
                            <p>Fat: {Math.round(template.fatPer100g * multiplier)}g</p>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700"
                    >
                      {editingMealId ? 'Update Meal' : 'Add Meal'}
                    </Button>
                    {editingMealId && (
                      <Button
                        type="button"
                        onClick={handleCancelMeal}
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
              )}
            </CardContent>
          </Card>

          {/* Meals Log */}
          <div className="mt-6 space-y-3">
            <h2 className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
              Today's Meals
            </h2>
            {meals.length === 0 ? (
              <p className={`text-center text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                No meals logged yet. Start tracking!
              </p>
            ) : (
              meals.map((meal) => (
                <Card 
                  key={meal.id} 
                  className={`rounded-xl shadow-sm ${
                    isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <p className={isDarkTheme ? 'text-white' : 'text-gray-900'}>
                          {meal.name} ({meal.amount}g)
                        </p>
                        <p className="text-sm text-blue-600">{meal.calories} kcal</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEditMeal(meal)}
                          className={`rounded-lg p-2 ${
                            isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                        >
                          <Edit2 className="h-4 w-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => onDeleteMeal(meal.id)}
                          className={`rounded-lg p-2 ${
                            isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                    <div className={`flex gap-4 text-xs ${
                      isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <span>P: {meal.protein}g</span>
                      <span>C: {meal.carbs}g</span>
                      <span>F: {meal.fat}g</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates">
          <Card className={`mb-6 rounded-2xl shadow-md ${
            isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}>
            <CardHeader>
              <CardTitle className={isDarkTheme ? 'text-white' : 'text-gray-900'}>
                {editingTemplateId ? 'Edit Template' : 'Create Meal Template'}
              </CardTitle>
              <p className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                Add macros per 100g for easy meal logging
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddTemplate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name" className={isDarkTheme ? 'text-gray-300' : ''}>
                    Food Name
                  </Label>
                  <Input
                    id="template-name"
                    type="text"
                    placeholder="e.g., Chicken Breast"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className={`rounded-xl ${
                      isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                    }`}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="cal-100g" className={isDarkTheme ? 'text-gray-300' : ''}>
                      Calories/100g
                    </Label>
                    <Input
                      id="cal-100g"
                      type="number"
                      placeholder="165"
                      value={caloriesPer100g}
                      onChange={(e) => setCaloriesPer100g(e.target.value)}
                      className={`rounded-xl ${
                        isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                      }`}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="protein-100g" className={isDarkTheme ? 'text-gray-300' : ''}>
                      Protein/100g
                    </Label>
                    <Input
                      id="protein-100g"
                      type="number"
                      placeholder="31"
                      value={proteinPer100g}
                      onChange={(e) => setProteinPer100g(e.target.value)}
                      className={`rounded-xl ${
                        isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="carbs-100g" className={isDarkTheme ? 'text-gray-300' : ''}>
                      Carbs/100g
                    </Label>
                    <Input
                      id="carbs-100g"
                      type="number"
                      placeholder="0"
                      value={carbsPer100g}
                      onChange={(e) => setCarbsPer100g(e.target.value)}
                      className={`rounded-xl ${
                        isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fat-100g" className={isDarkTheme ? 'text-gray-300' : ''}>
                      Fat/100g
                    </Label>
                    <Input
                      id="fat-100g"
                      type="number"
                      placeholder="3.6"
                      value={fatPer100g}
                      onChange={(e) => setFatPer100g(e.target.value)}
                      className={`rounded-xl ${
                        isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                      }`}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="flex-1 rounded-xl bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {editingTemplateId ? 'Update Template' : 'Save Template'}
                  </Button>
                  {editingTemplateId && (
                    <Button
                      type="button"
                      onClick={resetTemplateForm}
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

          {/* Templates List */}
          <div className="space-y-3">
            <h2 className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
              Saved Templates
            </h2>
            {templates.length === 0 ? (
              <p className={`text-center text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                No templates saved yet. Create your first template!
              </p>
            ) : (
              templates.map((template) => (
                <Card 
                  key={template.id} 
                  className={`rounded-xl shadow-sm ${
                    isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <p className={isDarkTheme ? 'text-white' : 'text-gray-900'}>
                          {template.name}
                        </p>
                        <p className="text-sm text-green-600">
                          {template.caloriesPer100g} kcal/100g
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEditTemplate(template)}
                          className={`rounded-lg p-2 ${
                            isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                        >
                          <Edit2 className="h-4 w-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className={`rounded-lg p-2 ${
                            isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                    <div className={`flex gap-4 text-xs ${
                      isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <span>P: {template.proteinPer100g}g</span>
                      <span>C: {template.carbsPer100g}g</span>
                      <span>F: {template.fatPer100g}g</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
