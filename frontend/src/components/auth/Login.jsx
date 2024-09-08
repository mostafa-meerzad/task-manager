import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contenxt/AuthContext";
// import {useHistory} from "react-router-dom"
// import RegisterPage from "../../pages/RegisterPage";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  // const history = useHistory();
  const { login,  } = useContext(AuthContext);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth", formData);
      login(res.data.token, res.data.user);
      // axios.defaults.headers.common["x-auth-token"] = res.data.token
      console.log("res: ", res);
      navigate("/")
      // Navigate("/")
      // history.push("/");
    } catch (error) {
      console.log(error.response);
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.data.error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">password: </label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
      <br />
      <Link to={"/register"}>sign up</Link>
      <br />
      <Link to={"/"}>Home</Link>
      {/* <Navigate to={"/register"} > sign up</Navigate> */}
    </>
  );
};

export default Login;
