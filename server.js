const express = require("express");
const connectDB = require("./config/db");
const tasks = require("./routes/tasks");

connectDB();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use("/api/tasks", tasks);

app.get("/", (req, res) => {
  res.send("Task Manager API");
});

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});
