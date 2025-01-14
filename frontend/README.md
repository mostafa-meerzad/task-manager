# New Updates

Let's tackle the update and delete functionality for tasks step by step.

### 1. **Backend Routes (Node.js / Express)**

#### Update Task Route (`PUT /api/tasks/:id`)

```javascript
// Update a task
router.put("/:id", auth, async (req, res) => {
  const { title } = req.body;

  try {
    // Find the task by ID
    let task = await Task.findById(req.params.id);

    // Make sure task exists
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Make sure the task belongs to the logged-in user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Update the task
    task.title = title || task.title;
    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
```

#### Delete Task Route (`DELETE /api/tasks/:id`)

```javascript
// Delete a task
router.delete("/:id", auth, async (req, res) => {
  try {
    // Find the task by ID
    let task = await Task.findById(req.params.id);

    // Make sure task exists
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Make sure the task belongs to the logged-in user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await task.remove();

    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
```

### 2. **Frontend (React)**

Now let's handle the frontend for updating and deleting tasks.

#### Task API Functions

Add the update and delete task functions to your API helper.

#### `src/api/taskApi.js`

```javascript
import axios from "axios";
import { getToken } from "../utils/token";

// Fetch tasks
export const fetchTasks = async () => {
  const response = await axios.get("/api/tasks", {
    headers: {
      "x-auth-token": getToken(),
    },
  });
  return response.data;
};

// Create a task
export const createTask = async (task) => {
  const response = await axios.post("/api/tasks", task, {
    headers: {
      "x-auth-token": getToken(),
    },
  });
  return response.data;
};

// Update a task
export const updateTask = async (taskId, updatedTask) => {
  const response = await axios.put(`/api/tasks/${taskId}`, updatedTask, {
    headers: {
      "x-auth-token": getToken(),
    },
  });
  return response.data;
};

// Delete a task
export const deleteTask = async (taskId) => {
  const response = await axios.delete(`/api/tasks/${taskId}`, {
    headers: {
      "x-auth-token": getToken(),
    },
  });
  return response.data;
};
```

#### Tasks Page Update

We'll update the `TasksPage` to include functionality for updating and deleting tasks.

#### `src/components/TasksPage.js`

```javascript
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
```

### Summary

1. **Backend:**

   - **Update Route:** `PUT /api/tasks/:id` updates a task for the logged-in user.
   - **Delete Route:** `DELETE /api/tasks/:id` deletes a task for the logged-in user.

2. **Frontend:**
   - **Task API Helpers:** Functions for updating and deleting tasks.
   - **TasksPage Component:** Implements edit and delete functionality for tasks with a single form for both adding and updating.

This should give you full CRUD functionality for tasks in your app! Let me know if you'd like to refine or extend this functionality.
