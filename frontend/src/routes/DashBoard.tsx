import { useState } from "react"
import { useNavigate } from "react-router-dom"

function DashBoard() {
    const token = localStorage.getItem('token')
    const [auth, setAuth] = useState<Boolean>(token ? true : false)
    
    const navigate = useNavigate();
    !auth && navigate('/');
    
    
  return (
    <div>DashBoard</div>
  )
}

export default DashBoard