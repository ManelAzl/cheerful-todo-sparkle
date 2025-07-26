import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Plus, Heart, Star } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  /* This little function helps dreams come true! ✨ */
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }]);
      setInputValue('');
    }
  };

  /* Celebrating small victories, one check at a time! 🎉 */
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  /* Sometimes we need to let go to make room for new adventures! 🌟 */
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const allCompleted = totalCount > 0 && completedCount === totalCount;

  /* Handle Enter key - because hitting Enter should feel magical! */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* This header is absolutely delighted to meet you! */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="text-accent w-8 h-8 animate-bounce-gentle" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              My Lovely To-Dos
            </h1>
            <Star className="text-primary w-8 h-8 animate-sparkle" />
          </div>
          <p className="text-muted-foreground text-lg">
            Every great adventure starts with a single step! 🌈
          </p>
        </div>

        {/* The magical task creation zone! ✨ */}
        <div className="bg-card rounded-3xl p-6 shadow-lg border border-border mb-8">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What's your next adventure? 🚀"
              className="flex-1 rounded-2xl border-2 border-border focus:border-primary transition-all duration-300 text-lg p-6 bg-input"
            />
            <Button
              onClick={addTodo}
              className="rounded-2xl px-6 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg transition-all duration-300 hover:scale-105 hover:animate-bounce-gentle"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add
            </Button>
          </div>
        </div>

        {/* Progress celebration section! 🎊 */}
        {totalCount > 0 && (
          <div className="bg-secondary/50 rounded-2xl p-4 mb-6 text-center">
            <p className="text-secondary-foreground font-medium">
              {allCompleted 
                ? "🎉 Amazing! You've conquered all your tasks! You're absolutely wonderful! 🌟"
                : `You're doing great! ${completedCount} of ${totalCount} tasks completed! 💪`
              }
            </p>
          </div>
        )}

        {/* The delightful list of dreams and goals! */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            /* A gentle nudge to get started! */
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌟</div>
              <p className="text-muted-foreground text-xl">
                Your adventure list is ready for some magic!
              </p>
              <p className="text-muted-foreground">
                Add your first task above to get started! ✨
              </p>
            </div>
          ) : (
            todos.map((todo) => (
              /* Each task is a little bundle of joy! */
              <div
                key={todo.id}
                className={`bg-card rounded-2xl p-4 shadow-md border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                  todo.completed 
                    ? 'border-success bg-success/10 animate-sparkle' 
                    : 'border-border hover:border-accent'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* This checkbox is so excited to be checked! */}
                  <div className="flex-shrink-0">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 ${
                        todo.completed 
                          ? 'bg-success border-success animate-sparkle' 
                          : 'border-accent hover:border-primary hover:animate-wiggle'
                      }`}
                    />
                  </div>
                  
                  {/* The task text - each word is precious! */}
                  <div className="flex-1">
                    <p className={`text-lg transition-all duration-300 ${
                      todo.completed 
                        ? 'line-through text-success opacity-75 font-medium' 
                        : 'text-foreground'
                    }`}>
                      {todo.text}
                    </p>
                  </div>

                  {/* This delete button is here to help, even though it's a bit sad to say goodbye! */}
                  <Button
                    onClick={() => deleteTodo(todo.id)}
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-2 border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 hover:animate-wiggle"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* A little footer full of encouragement! */}
        {todos.length > 0 && (
          <div className="text-center mt-8 p-4">
            <p className="text-muted-foreground">
              Remember: Every task completed is a victory worth celebrating! 🎈
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;