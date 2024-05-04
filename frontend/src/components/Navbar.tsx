import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useEffect} from 'react'
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useRecoilState } from 'recoil';
import { userAtom } from '../store/atoms/user';
import { Avatar } from './Avatar';


function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    token || navigate('/');

   const [user, setUser] = useRecoilState(userAtom);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/browser/user`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [token])

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

  return (
    <div className="bg-[#1C1C1C] text-[#3ECF8E] flex justify-between  items-center px-4 lg:px-28 py-2 border-b border-gray-600 absolute w-full top-0 left-0">
        <div className='flex items-center gap-4'>
            <img src={logo} alt="logo" className="h-10"/>
            <h4 className='font-bold'>Terminal-Connect</h4>
        </div>
        <div className='flex gap-3'>
            <button onClick={handleLogout} className='font-medium px-2 py-0.5 hover:-translate-y-1 transition ease-in duration-300 hover:underline hover:underline-offset-8 decoration-4  decoration-green-500 hover:decoration-red-500 hover:text-red-500'>logout</button>
            {/* <button className='font-medium px-2 py-0.5 hover:-translate-y-1 transition ease-in-out duration-300 hover:underline hover:underline-offset-8 decoration-4  '>Account</button> */}
            <Avatar name={user?.name} classx='h-8 w-8'/>
        </div>
    </div>
  )
}

export default Navbar