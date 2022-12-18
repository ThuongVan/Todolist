import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from './src/redux/tasksSlice';

const Task = ({ text,index }) => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <TextInput style={styles.itemText} value={text} />
      </View>
      <TouchableOpacity style={styles.delButton} onPress={() => dispatch(deleteTask(index))}>
        <Text style={styles.delText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Task;
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
    fontSize: 20,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
  delButton: {
    backgroundColor: '#FF6883',
    height: 20,
    width: 50,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  delText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

