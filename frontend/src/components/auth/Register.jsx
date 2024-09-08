import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../contenxt/AuthContext";
import { Link, useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  // const history = useHistory();
  const navigate = useNavigate()
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/users", formData);
      login(res.data.token, res.data.user);
      console.log(res)
      console.log(res.data)
      console.log(res.data.user)
      // history.push("/login");
      navigate("/")
    } catch (error) {
      // console.log(error);
      console.log(error.response.data);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name: </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div>
          <label htmlFor="email">email: </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div>
          <label htmlFor="password">password: </label>
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
      <br />
      <Link to={"/login"}>login</Link>
    </>
  );
};
export default Register;
