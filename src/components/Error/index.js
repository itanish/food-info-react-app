import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ErrorComponent = () => {
    const navigate = useNavigate();
    useEffect(() => {
      setTimeout(function () {
        navigate("/")
      }, 2000);
    }, [])
    

    return (
      <>
        <h3>You are not authorised to view this page.</h3>
        <h5>You will be redirected to home page.</h5>
      </>
    );
}

export default ErrorComponent;