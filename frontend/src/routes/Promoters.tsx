// import { useNavigate } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { userAtom } from "../store/atoms/user";
// import { useEffect } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../config";
// import { coustomAlert } from "../components/coustomAlert";

// interface Promoter {
//   username: string;
//   coupon: string;
//   referred: string[];
//   balance: number;
// }


// export default Promoters;{
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   !token && navigate("/");

//   const [user, _] = useRecoilState(userAtom);
//   const [promoters, setPromoters] = useRecoilState(userAtom);

//   useEffect(() => {
//     axios
//       .get(`${BACKEND_URL}/promoters`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
        
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   return <div>Promoters</div>;
// }

// export default Promoters;
