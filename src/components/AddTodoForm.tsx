import React, { useState } from 'react';
import { useCalendar } from '../hooks/useCalendar';
import { Plus } from 'lucide-react';

const AddTodoForm: React.FC = () => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { addTodo } = useCalendar();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    const newTodo = {
      id: `todo-${Date.now()}`,
      text,
      completed: false,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    };
    addTodo(newTodo);
    setText('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="新しいタスクを追加..."
        className="w-full p-2 border border-border rounded-lg mb-2"
      />
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 border border-border rounded-lg flex-1"
        />
        <button type="submit" className="p-2 bg-primary text-white rounded-lg hover:bg-opacity-90">
          <Plus size={24} />
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
