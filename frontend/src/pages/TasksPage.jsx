import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";

const TasksPage = () => {
  return (
    <div>
      <h1>Your Tasks</h1>

      <TaskList />
      <TaskForm />
    </div>
  );
};
export default TasksPage;
