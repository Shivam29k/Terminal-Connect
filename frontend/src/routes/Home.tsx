import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate();
  // navigate('/');
  return (
    <div className="flex bg-[#1C1C1C] text-[#3ECF8E] min-h-[100vh] w-full  justify-center items-center flex-col gap-3 ">
      <div className="text-3xl bg-black px-3 py-2 rounded font-bold cursor-pointer hover:scale-110 transition-all duration-300" onClick={()=>navigate('/signin')}>signin</div>
      <div className="text-3xl bg-black px-3 py-2 rounded font-bold cursor-pointer hover:scale-110 transition-all duration-300" onClick={()=>navigate('/signup')}>signup</div>

    </div>
  )
}

export default Home