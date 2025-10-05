import React from 'react';
import MemberList from './MemberList';
import ChannelList from './ChannelList';

const TodoSection: React.FC = () => {
  const todos = [
    { id: 1, text: '論文調査', completed: false },
    { id: 2, text: 'コーディング', completed: false }
  ];

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
              className="mr-2 rounded"
              readOnly
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
      {/* 深見研究室 */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-bold text-primary">深見研究室</h2>
      </div>
      
      {/* メンバー */}
      <div className="border-b border-border">
        <MemberList />
      </div>
      
      {/* Channels */}
      <div className="flex-1 border-b border-border">
        <ChannelList />
      </div>
      
      {/* TODO */}
      <div>
        <TodoSection />
      </div>
    </div>
  );
};

export default HomeSidebar;
