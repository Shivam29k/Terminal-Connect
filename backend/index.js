const express = require("express");
const {browserRouter} = require("./routes/browser");
const {terminalRouter} = require("./routes/terminal");
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const path = require("path");
const publicDir = path.join(__dirname, 'public');




const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/browser", browserRouter);
app.use("/api/terminal", terminalRouter);


app.get("/", (req, res) => {
  res.send("Backend is up!");
});

app.get('/app', (req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename=Tc.jar');
  res.setHeader('Content-Type', 'application/java-archive');
  res.sendFile(path.join(publicDir, 'Tc.jar'));
  
})





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
