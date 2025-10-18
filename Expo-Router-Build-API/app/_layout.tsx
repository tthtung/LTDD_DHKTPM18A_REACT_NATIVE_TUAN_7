import { Stack } from 'expo-router';
import { TaskProvider } from '../contexts/TaskContext';

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="tasks" />
        <Stack.Screen 
          name="add-job"
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen 
          name="edit-job"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>
    </TaskProvider>
  );
}