import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { IoDocumentSharp } from "react-icons/io5";
import browswerss from "../assets/browser_ss.png";
import terminalss from "../assets/terminal_ss.png";
import Footer from "../components/Footer";
import { GrLinkNext } from "react-icons/gr";

function Home() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // navigate('/');
  return (
    <div className="flex bg-[#1C1C1C] text-[#3ECF8E] min-h-[100vh] w-full items-center flex-col gap-3">
      <Navbar />
      <div className="text-center mt-16 container py-5">
        <h1 className="text-3xl font-bold">Welcome to Terminal-Connect</h1>
        <p>Connect to your terminal from anywhere in the world</p>
      </div>
      <a
        href="https://stitch-nerve-efd.notion.site/Terminal-Connect-Docs-dd6087499c764542ad426b6e0694cbae"
        className="rounded-md p-2 px-6 text-green-100 font-bold text-xl hover:text-emerald-500  cursor-pointer hover:bg-black hover:scale-110 transition-all  bg-zinc-500 flex  items-center gap-2"
      >
        {" "}
        <IoDocumentSharp />
        <span>Docs</span>
      </a>
      {token && (
        <a
          onClick={() => navigate("/dashboard")}
          className="rounded-md p-2 px-6 text-green-100 font-bold text-xl hover:text-emerald-500  cursor-pointer hover:bg-black hover:scale-110 transition-all  bg-zinc-500 flex  items-center gap-2"
        >
          {" "}
          <span>Dashboard</span>
        </a>
      )}

      <div className="italic container text-center">
        Next Plan: Upon Good Support we soon gonna bring Chat-GPT in the
        terminal
      </div>


      {!token && <div className="bg-zinc-700 rounded-md text-gray-200 p-4 font-bold flex flex-col gap-4">
        <p>Get Started Today and get 5 free Credits</p>
        <button onClick={()=>(navigate("/signin"))} className="bg-emerald-500 text-[#1c1c1c] py-1 px-4 rounded ml-auto flex items-center gap-2 hover:text-emerald-500 hover:bg-black transition-all duration-300 hover:scale-110">
          Get Started <GrLinkNext />
        </button>
      </div>
}
      <div className="flex flex-col lg:flex-row w-5/6 justify-center gap-8 items-center my-8">
        <div className="">
          Browser Chat Interface
          <img
            src={browswerss}
            alt=""
            className="h-96 max-w-80 shadow-xl shadow-zinc-700 rounded-lg"
          />
        </div>
        <div>
          Terminal Chat Interface
          <img
            src={terminalss}
            alt=""
            className="h-96 max-w-80 shadow-xl shadow-zinc-700 rounded-lg"
          />
        </div>
      </div>

      <div className="w-5/6 py-8">
        <iframe
          className="w-full h-[30vh]  md:h-[60vh] lg:h-[80vh]"
          src="https://www.youtube.com/embed/diOEtiOT-VA?si=nxkuj4PPFYQwQ-Gg"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
