import React from 'react';
import { useCalendar } from '../hooks/useCalendar';
import { CheckCircle2, Circle, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const TodoList: React.FC = () => {
  const { todos, toggleTodo, deleteTodo } = useCalendar();

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    if (a.dueDate && b.dueDate) return a.dueDate.getTime() - b.dueDate.getTime();
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    return 0;
  });

  return (
    <div className="space-y-3">
      {sortedTodos.map(todo => (
        <div key={todo.id} className="flex items-center bg-sub1 p-3 rounded-lg">
          <button onClick={() => toggleTodo(todo.id)} className="mr-3">
            {todo.completed ? (
              <CheckCircle2 size={24} className="text-green-500" />
            ) : (
              <Circle size={24} className="text-gray-400" />
            )}
          </button>
          <div className="flex-1">
            <p className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </p>
            {todo.dueDate && (
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <CalendarIcon size={14} className="mr-1" />
                {format(todo.dueDate, 'M月d日')}
              </div>
            )}
          </div>
          <button onClick={() => deleteTodo(todo.id)} className="ml-3 text-gray-400 hover:text-red-500">
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
