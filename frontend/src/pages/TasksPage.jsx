import { useContext, useEffect, useState } from "react";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import { AuthContext } from "../contenxt/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const { authState, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const fetchTasks = async () => {
    if (!authState.isAuthenticated) {
      navigate("/login");
    }

    try {
      const tasks = await axios.get("http://localhost:3000/api/tasks", {
        headers: {
          "x-auth-token": authState.token,
        },
      });
      setTasks(tasks.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Your Tasks</h1>
      <br />
      <TaskList tasks={tasks}/>
      <br />
      <TaskForm update={fetchTasks}/>
      <br />
      <button onClick={() => logout()}>logout</button>
    </div>
  );
};
export default TasksPage;
