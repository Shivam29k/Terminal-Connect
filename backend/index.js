const express = require("express");
const {browserRouter} = require("./routes/browser");
const {terminalRouter} = require("./routes/terminal");
const PORT = process.env.PORT || 3001;
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Backend is up!");
});

app.get("/file", (req, res) => {
  res.download("main.exe");
});
app.get("/app", (req, res) => {
  res.download("Tc.jar");
});

app.use("/api/browser", browserRouter);
app.use("/api/terminal", terminalRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
