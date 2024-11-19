import { authService } from "../api/authentication";
import { useNavigate } from "react-router-dom";

interface accountShowCaseProps{
    setLoginCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccountShowCase({ setLoginCheck }: accountShowCaseProps){

    const navigate = useNavigate();

    const handleLogOut = () =>{
        authService.logout();
        navigate('/user-info');
        setLoginCheck(false);
    }

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <button
                onClick={handleLogOut}
                >LOG OUT
            </button>
        </>
    )
}