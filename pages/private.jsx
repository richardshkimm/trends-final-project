import withAuth from "../Components/withAuth";
import {useUser} from "../Components/useUser";
import { LogoutOutlined } from "@mui/icons-material";

const Private = () => {
    const {user, logout} = useUser();


    return (
        <div>
            <div>Private</div>
            {
                user?.email && 
                <div>
                    <div>Email : {user.email}</div>
                    <button onClick ={ () => logout()}>Logout</button>
            </div>
            }
        </div>
        )
    }

export default withAuth(Private);