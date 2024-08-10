import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Task Manager</h1>
      <Link to={"/tasks"}>Go to Tasks</Link>
    </div>
  );
};
export default Home;
