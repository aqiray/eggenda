'use client'
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, getWeek } from 'date-fns';
import WeeklyGrid from './WeeklyGrid';
import { Task } from '@/types/task';

interface MonthlyViewProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  onCreateTask: (task: Partial<Task>) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function MonthlyView({
  tasks,
  onTaskComplete,
  onCreateTask,
  onUpdateTask,
  onDeleteTask
}: MonthlyViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          ←
        </button>
        <h2 className="text-xl font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          →
        </button>
      </div>

      <WeeklyGrid
        tasks={tasks.filter(task => {
          const taskDate = task.task_date ? new Date(task.task_date) : null;
          return taskDate && 
            taskDate >= monthStart && 
            taskDate <= monthEnd;
        })}
        currentWeek={{ weekNumber: getWeek(currentDate), startDate: monthStart }}
        onCreateTask={onCreateTask}
        // @ts-ignore
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
        onWeekChange={() => {}}
        onToggleUnscheduled={() => {}}
      />
    </div>
  );
} 