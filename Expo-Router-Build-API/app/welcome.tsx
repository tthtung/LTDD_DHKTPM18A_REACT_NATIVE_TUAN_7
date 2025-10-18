import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function WelcomeScreen() {
  const [name, setName] = useState('');
  
  return (
    <View style={styles.container}>
      {/* Icon lớn ở trên */}
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>📝</Text>
      </View>
      
      <Text style={styles.title}>MANAGE YOUR{'\n'}TASK</Text>
      
      {/* Input với icon */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>👤</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
      </View>
      
      <Pressable
        style={({ pressed }) => [
          styles.button, 
          pressed && styles.buttonPressed,
          !name.trim() && styles.buttonDisabled
        ]}
        onPress={() => {
          if (name.trim()) {
            router.push({ pathname: '/tasks', params: { name } });
          }
        }}
        disabled={!name.trim()}
      >
        <Text style={styles.buttonText}>GET STARTED →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 30,
  },
  iconText: {
    fontSize: 120,
  },
  title: {
    fontSize: 28,
    color: '#A259FF',
    fontWeight: 'bold',
    marginBottom: 50,
    letterSpacing: 1.5,
    textAlign: 'center',
    lineHeight: 36,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 40,
    backgroundColor: '#fafafa',
    paddingHorizontal: 16,
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
  button: {
    backgroundColor: '#1CC8EE',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 260,
    shadowColor: '#1CC8EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});