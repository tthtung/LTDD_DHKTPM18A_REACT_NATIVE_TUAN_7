import { View, Text, StyleSheet, FlatList, TextInput, Pressable, Image, Alert } from 'react-native';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useTasks } from '../contexts/TaskContext';

export default function TasksScreen() {
  const params = useLocalSearchParams();
  const name = params.name as string;
  const [search, setSearch] = useState('');
  
  const { tasks, toggleTask, deleteTask } = useTasks();

  // Lọc tasks theo search
  const filteredTasks = tasks.filter(t => 
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  // Edit task
  const editTask = (id: string, text: string) => {
    router.push({
      pathname: '/edit-job',
      params: { id, text }
    });
  };

  // Delete task với confirmation
  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTask(id)
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
        <Text style={styles.headerTitle}>My Tasks</Text>
        <View style={styles.placeholder} />
      </View>

      {/* User Info Section */}
      <View style={styles.userSection}>
        <Image 
          source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
          style={styles.avatar} 
        />
        <View style={styles.userInfo}>
          <Text style={styles.hiText}>Hi {name || 'Twinkle'}</Text>
          <Text style={styles.subText}>Have {filteredTasks.length} tasks today</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </Pressable>
        )}
      </View>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>
            {search ? 'No tasks found' : 'No tasks yet'}
          </Text>
          <Text style={styles.emptySubText}>
            {search ? 'Try a different search' : 'Tap + to add a new task'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskRow}>
              <Pressable 
                style={[styles.checkBox, item.done && styles.checked]}
                onPress={() => toggleTask(item.id)}
              >
                {item.done && <Text style={styles.checkMark}>✓</Text>}
              </Pressable>
              <Text style={[styles.taskText, item.done && styles.taskTextDone]}>
                {item.text}
              </Text>
              <View style={styles.actionButtons}>
                <Pressable 
                  style={styles.editBtn} 
                  onPress={() => editTask(item.id, item.text)}
                >
                  <Text style={styles.editIcon}>✏️</Text>
                </Pressable>
                <Pressable 
                  style={styles.deleteBtn} 
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.deleteIcon}>🗑️</Text>
                </Pressable>
              </View>
            </View>
          )}
          style={styles.taskList}
          contentContainerStyle={styles.taskListContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Floating Action Button */}
      <Pressable 
        style={({ pressed }) => [
          styles.fab,
          pressed && styles.fabPressed
        ]} 
        onPress={() => router.push('/add-job')}
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
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
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 14,
    borderWidth: 2,
    borderColor: '#00BDD6',
  },
  userInfo: {
    flex: 1,
  },
  hiText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: '#888',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginBottom: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  clearIcon: {
    fontSize: 18,
    color: '#888',
    paddingHorizontal: 8,
  },
  taskList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  taskListContent: {
    paddingBottom: 100,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DEF1F4',
    borderRadius: 24,
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#00BDD6',
    marginRight: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#00BDD6',
    borderColor: '#00BDD6',
  },
  checkMark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editBtn: {
    padding: 4,
  },
  editIcon: {
    fontSize: 20,
  },
  deleteBtn: {
    padding: 4,
  },
  deleteIcon: {
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#00BDD6',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00BDD6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  fabPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});