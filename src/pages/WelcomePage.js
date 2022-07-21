import vid from "../assets/background_video.mp4";

const WelcomePage = ({ setCurrentNav }) => {
  return (
    <div>
      {/* <video src={vid} autoPlay loop muted>
        video dose't support this page!!
      </video> */}
      <div className="welcomePage-wrpper">
        <div className="welcomePage-item">welcome to my google maps!!</div>
        <div
          className="welcomePage-item nav cursor-point"
          onClick={() => {
            setCurrentNav("HomePage");
          }}
        >
          START
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
