import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/taskApi";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasksData = await fetchTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };

    getTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    try {
      const taskData = { title: newTask };
      await createTask(taskData);
      const tasksData = await fetchTasks();
      setTasks(tasksData);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEditTask = (taskId, title) => {
    setEditTaskId(taskId);
    setEditTaskTitle(title);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (editTaskTitle.trim() === "") return;
    try {
      await updateTask(editTaskId, { title: editTaskTitle });
      const tasksData = await fetchTasks();
      setTasks(tasksData);
      setEditTaskId(null);
      setEditTaskTitle("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h1>Your Tasks</h1>

      {/* Task Form */}
      <form onSubmit={editTaskId ? handleUpdateTask : handleAddTask}>
        <input
          type="text"
          value={editTaskId ? editTaskTitle : newTask}
          onChange={(e) =>
            editTaskId
              ? setEditTaskTitle(e.target.value)
              : setNewTask(e.target.value)
          }
          placeholder={editTaskId ? "Edit Task" : "New Task"}
        />
        <button type="submit">{editTaskId ? "Update Task" : "Add Task"}</button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}{" "}
            <button onClick={() => handleEditTask(task._id, task.title)}>
              Edit
            </button>{" "}
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;