import Button from "../components/Button";
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  const startRoutine = () => {
    let path = "/routine";
    navigate(path);
  }

  return <div>
      <Button text="Start routine" classes="btn-success btn-lg btn-active" onClick={startRoutine} />
  </div>
}

export default Home;