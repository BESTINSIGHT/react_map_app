//import vid from "../assets/background_video.mp4";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div>
      {/* <video src={vid} autoPlay loop muted>
        video dose't support this page!!
      </video> */}
      <div className="welcomePage-wrpper">
        <div className="welcomePage-item">Hello There!</div>
        <div className="welcomePage-item">Welcome To My Google Maps!</div>
        <Link to={"/HomePage"}>
          <div className="welcomePage-item nav animation_start_btn">
            START
          </div>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
