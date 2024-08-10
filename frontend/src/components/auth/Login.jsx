import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contenxt/AuthContext";
// import {useHistory} from "react-router-dom"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const history = useHistory();
  const { login } = useContext(AuthContext);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth", formData);
      login(res.data.token, res.data.user);
      // history.push("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};

export default Login;
