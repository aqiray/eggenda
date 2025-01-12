'use client'

import { Task } from '@/types/task';
import { Droppable } from '@hello-pangea/dnd';
import TaskItem from './TaskItem';

interface TaskPoolProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function TaskPool({ tasks, onUpdateTask, onDelete, isOpen, onClose }: TaskPoolProps) {
  return (
    <div className={`
      fixed top-0 left-0 h-full w-80 bg-background border-r border-border
      transform transition-transform duration-300 ease-in-out z-50
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex flex-col">
        <h2 className="text-lg font-semibold">Unscheduled Tasks</h2>
        <p className="text-sm text-gray-500">{tasks.length} total</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4 h-[calc(100vh-4rem)] overflow-y-auto">
        <Droppable droppableId="task-pool">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`
                min-h-[100px] rounded-lg grid grid-cols-2 gap-2 border-gray-200 dark:border-gray-700
                ${snapshot.isDraggingOver
                  ? 'bg-gray-100 dark:bg-gray-800 border-primary'
                  : 'bg-gray-50/50 dark:bg-gray-800/50'
                }
                transition-colors duration-200
              `}
            >
              {tasks.map((task, index) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  index={index}
                  onUpdate={onUpdateTask}
                  onDelete={onDelete}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
} 