import {Navigate} from "react-router-dom";
import  authUser from "../utils/auth";

export const PrivateRoute = ({ component: RouteComponent}) => {
    const auth = authUser.getInstance()
    return (
        auth.token ? (<RouteComponent/>) : (<Navigate to="/login" />)
    );
}