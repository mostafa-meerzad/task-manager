import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../contenxt/AuthContext";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const history = useHistory();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.targe.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("localhost:3000/api/users");
      login(res.data.token, res.data.user);
      history.push("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
      </div>

      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};
export default Register;
