const express = require("express");
const connectDB = require("./config/db");
const tasks = require("./routes/tasks");
const users = require("./routes/users");
const auth = require("./routes/auth");

const { config } = require("dotenv");
config();

connectDB();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use("/api/tasks", tasks);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.send("Task Manager API");
});

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});
