import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./routes/Home"
import Signup from "./routes/Signup"
import Signin from "./routes/Signin"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
