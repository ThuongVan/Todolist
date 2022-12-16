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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const getData = () => {
    try {
      AsyncStorage.getItem('taskItems').then(value => {
        if (value != null) {
          setTaskItems(JSON.parse(value));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleAddTask = async () => {
    if (task.length === 0) {
      Alert.alert('Warning!', 'Please write your task');
    } else if (taskItems.includes(task)) {
      Alert.alert('Warning!', 'Task already exists');
    } else {
      try {
        Keyboard.dismiss();
        const newTaskItems = [...taskItems, task];
        setTaskItems(newTaskItems);
        await AsyncStorage.setItem('taskItems', JSON.stringify(newTaskItems));
        setTask(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const completeTask = index => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    AsyncStorage.setItem('taskItems', JSON.stringify(itemsCopy));
  };
  

  useEffect(() => {
    SplashScreen.hide();
  }, []);


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
              data={taskItems}
              renderItem={({item, index}) => (
                <Task text={item} completeTask={() => completeTask(index)} />
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
