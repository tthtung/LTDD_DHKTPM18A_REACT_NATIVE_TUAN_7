import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useTasks } from '../contexts/TaskContext';

export default function AddJobScreen() {
  const [jobTitle, setJobTitle] = useState('');
  const { addTask } = useTasks();

  const handleFinish = () => {
    if (jobTitle.trim()) {
      addTask(jobTitle.trim());
      Alert.alert('Success', 'Task added successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        }
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header với nút quay lại */}
      <View style={styles.header}>
        <Pressable style={styles.navButton} onPress={() => router.back()}>
          <Text style={styles.navButtonText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Add Job</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Nội dung chính */}
      <View style={styles.content}>
        <Text style={styles.title}>ADD YOUR JOB</Text>

        {/* Icon lớn ở giữa */}
        <View style={styles.iconContainer}>
          <Text style={styles.emojiText}>📝</Text>
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
            onSubmitEditing={handleFinish}
            returnKeyType="done"
          />
        </View>

        {/* Nút Finish */}
        <Pressable 
          style={({ pressed }) => [
            styles.finishButton,
            !jobTitle.trim() && styles.finishButtonDisabled,
            pressed && jobTitle.trim() && styles.finishButtonPressed
          ]} 
          onPress={handleFinish}
          disabled={!jobTitle.trim()}
        >
          <Text style={styles.buttonText}>FINISH →</Text>
        </Pressable>
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
  placeholder: {
    width: 40,
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
  finishButton: {
    backgroundColor: '#1CC8EE',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 28,
    shadowColor: '#1CC8EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  finishButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0.1,
  },
  finishButtonPressed: {
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