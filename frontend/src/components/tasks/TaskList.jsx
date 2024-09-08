// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../../contenxt/AuthContext";
// import { useNavigate } from "react-router-dom";

const TaskList = ({tasks}) => {
  // const [tasks, setTasks] = useState([]);

  // const navigate = useNavigate();

  // const { authState } = useContext(AuthContext);
  // console.log("task list");
  // console.log(authState);
  // console.log(authState.isAuthenticated);

  // const fetchTasks = async () => {
  //   if (!authState.isAuthenticated) {
  //     navigate("/login");
  //   }

  //   try {
  //     const tasks = await axios.get("http://localhost:3000/api/tasks", {
  //       headers: {
  //         "x-auth-token": authState.token,
  //       },
  //     });
  //     setTasks(tasks.data);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };

  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  return (
    <div>
      {tasks.map(({ title, description, completed }, i) => {
        return (
          <div key={title + i} className="border m-3 p-3">
            <h3 className="text-xl font-bold">{title}</h3>
            <p>{description}</p>
            <p className={`${completed ? "text-blue-400": "text-red-400"}`}>{completed ? "completed" : "not completed"}</p>
          </div>
        );
      })}
      <br />
      <br />
    </div>
  );
};
export default TaskList;
