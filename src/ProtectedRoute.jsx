import { useLogin} from "./context/LoginContext"
import { Navigate,Outlet} from "react-router-dom";




function ProtectedRote() {
    const {isAutheticated} = useLogin()
    if (!isAutheticated) return <Navigate to='/login' replace/>
    return(
        <Outlet/>
    )
}


export default ProtectedRote