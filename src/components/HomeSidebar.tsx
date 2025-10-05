import React, { useState } from 'react';
import MemberList from './MemberList';
import ChannelList from './ChannelList';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoSection: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: '論文調査', completed: false },
    { id: 2, text: 'コーディング', completed: false }
  ]);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="p-2">
      <div className="px-2 py-1 mb-2">
        <h3 className="text-sm font-bold text-gray-500 uppercase">TODO</h3>
      </div>
      <div className="space-y-2 px-2">
        {todos.map(todo => (
          <div key={todo.id} className="flex items-center">
            <input 
              type="checkbox" 
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mr-2 rounded cursor-pointer"
            />
            <span className={`text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
              {todo.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const HomeSidebar: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      {/* 深見研究室 - 比率1 */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <h2 className="text-lg font-bold text-primary">深見研究室</h2>
      </div>
      
      {/* メンバー - 比率1 */}
      <div className="border-b border-border flex-shrink-0">
        <MemberList />
      </div>
      
      {/* Channels - 比率5 */}
      <div className="border-b border-border overflow-y-auto" style={{ flex: '5' }}>
        <ChannelList />
      </div>
      
      {/* TODO - 比率3 */}
      <div className="overflow-y-auto" style={{ flex: '3' }}>
        <TodoSection />
      </div>
    </div>
  );
};

export default HomeSidebar;
