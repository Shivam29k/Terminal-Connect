import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import Signin from "./routes/Signin";
import DashBoard from "./routes/DashBoard";
import { RecoilRoot } from "recoil";
import Buy from "./routes/Buy";
import Payments from "./routes/Payments";


function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/buy/:plan" element={<Buy />} />
          <Route path="/payments" element={<Payments />} />

          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
