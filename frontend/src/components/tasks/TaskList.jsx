import { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const tasks = await axios.get("http://localhost:3000/api/tasks");
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
      {tasks.map(({ title, description, completed }, i) => {
        return (
          <div key={title + i}>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{completed ? "completed" : "not completed"}</p>
          </div>
        );
      })}
    </div>
  );
};
export default TaskList;
