import { createContext, useContext, useState, ReactNode } from 'react';

export interface Task {
  id: string;
  text: string;
  done: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (text: string) => void;
  updateTask: (id: string, text: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [
  { id: '1', text: 'To check email', done: true },
  { id: '2', text: 'UI task web page', done: false },
  { id: '3', text: 'Learn javascript basic', done: false },
  { id: '4', text: 'Learn HTML Advance', done: false },
  { id: '5', text: 'Medical App UI', done: false },
  { id: '6', text: 'Learn Java', done: false },
];

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      done: false,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, text: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
}