const express = require("express");
const {browserRouter} = require("./routes/browser");
const {terminalRouter} = require("./routes/terminal");
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/file", (req, res) => {
  res.download("main.exe");
});

app.use("/api/browser", browserRouter);
app.use("/api/terminal", terminalRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
