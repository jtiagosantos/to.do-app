import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

import { generateId } from '../utils/generateId';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task = {
      id: generateId(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((prevState) => ([
      ...prevState,
      task,
    ]));
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const updatedTask = {
          ...task,
          done: !task.done,
        }

        return updatedTask;
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})