import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useTasks } from '../contexts/TaskContext';

export default function EditJobScreen() {
  const params = useLocalSearchParams();
  const taskId = params.id as string;
  const taskText = params.text as string;
  
  const [jobTitle, setJobTitle] = useState(taskText || '');
  const { updateTask, deleteTask } = useTasks();

  const handleUpdate = () => {
    if (jobTitle.trim()) {
      updateTask(taskId, jobTitle.trim());
      Alert.alert('Success', 'Task updated successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        }
      ]);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTask(taskId);
            router.back();
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header với nút quay lại */}
      <View style={styles.header}>
        <Pressable style={styles.navButton} onPress={() => router.back()}>
          <Text style={styles.navButtonText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Edit Job</Text>
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteIcon}>🗑️</Text>
        </Pressable>
      </View>

      {/* Nội dung chính */}
      <View style={styles.content}>
        <Text style={styles.title}>EDIT YOUR JOB</Text>

        {/* Icon lớn ở giữa */}
        <View style={styles.iconContainer}>
          <Text style={styles.emojiText}>✏️</Text>
        </View>

        {/* Input job với icon */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>📌</Text>
          <TextInput
            style={styles.input}
            placeholder="input your job"
            placeholderTextColor="#aaa"
            value={jobTitle}
            onChangeText={setJobTitle}
            autoFocus
            onSubmitEditing={handleUpdate}
            returnKeyType="done"
          />
        </View>

        {/* Các nút action */}
        <View style={styles.buttonContainer}>
          <Pressable 
            style={({ pressed }) => [
              styles.updateButton,
              !jobTitle.trim() && styles.buttonDisabled,
              pressed && jobTitle.trim() && styles.buttonPressed
            ]} 
            onPress={handleUpdate}
            disabled={!jobTitle.trim()}
          >
            <Text style={styles.buttonText}>UPDATE ✓</Text>
          </Pressable>
        </View>
      </View>

      {/* Icon nhỏ ở dưới */}
      <View style={styles.footer}>
        <Text style={styles.noteEmoji}>📓</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  navButton: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  navButtonText: {
    color: '#25292e',
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteButton: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  deleteIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: -60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#A259FF',
    marginBottom: 40,
    textAlign: 'center',
  },
  iconContainer: {
    marginBottom: 50,
  },
  emojiText: {
    fontSize: 100,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    color: '#222',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 340,
    gap: 12,
  },
  updateButton: {
    backgroundColor: '#1CC8EE',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#1CC8EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0.1,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  noteEmoji: {
    fontSize: 80,
    opacity: 0.3,
  },
});