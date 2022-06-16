import { authService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = () => {
    
    const history = useHistory();

    const onLogOutClick = () => {
        authService.signOut(); // 파이어베이스 로그아웃
        history.push("/");
    }

    return (
        <>
            <p>Profile</p>
            <button onClick={onLogOutClick} >Log Out</button>
        </>
    ) 
        
}

export default Profile;