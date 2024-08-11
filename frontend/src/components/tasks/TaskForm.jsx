import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contenxt/AuthContext";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const {authState} = useContext(AuthContext)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/tasks", formData, {
        headers: {
          "x-auth-token": authState.token,
        },
      });
      setFormData({
        title: "",
        description: "",
        completed: false,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="completed"
          value={formData.completed}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">add task</button>
      </div>
    </form>
  );
};
export default TaskForm;
