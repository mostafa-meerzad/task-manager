import { useState } from "react";
import axios from "axios";

const TaskForm = ({fetchData}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/tasks", formData);
      fetchData()
      setFormData({
        title: "",
        description: "",
        completed: false,
      });
    } catch (error) {
      console.log(error.response.data);
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
