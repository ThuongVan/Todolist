import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import Task from './Task';
import SplashScreen from 'react-native-splash-screen';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addTask, deleteTask, loadTasks} from './src/redux/tasksSlice';

export default function Home() {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const [task, setTask] = useState('');

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    getData();
  }, []);

const handleAddTask = () => {
  if (task.length === 0) {
    Alert.alert('Warning!', 'Please write your task');
  } else if (tasks.includes(task)) {
    Alert.alert('Warning!', 'Task already exists');
  } else {
    Keyboard.dismiss();
    dispatch(addTask(task));
    setTask('');
    saveTasks();
  }
};

const completeTask = index => {
  dispatch(deleteTask(index));
  saveTasks();
};


const getData = () => {
  AsyncStorage.getItem('tasks').then(value => {
    if (value == null) {
      AsyncStorage.setItem('tasks', JSON.stringify([]));
    } else {
      dispatch(loadTasks(JSON.parse(value)));
    }
  });
};

  const saveTasks = () => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }
  useEffect(() => {
    saveTasks();
  }, [tasks]);
  
  
  return (
    <View style={styles.container}>
      <View
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled">
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <View style={styles.items}>
            <FlatList
              data={tasks}
              renderItem={({item, index}) => (
                <Task text={item} index={index} completeTask={() => completeTask(index)} />
              )}
            />
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 40,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 60,
    borderColor: 'gray',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
});
