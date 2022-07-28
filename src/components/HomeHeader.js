import { Link } from "react-router-dom";

const HomeHeader = ({ className }) => {
  return (
    <header className={`${className}`}>
      <div className="homeHeader-container">
        <div className="homeHeader-logo">
          <Link to={"/"}>Made By Yunseok Jang</Link>
        </div>
        <nav>
          <ul className="ul-link">
            <li>
              <Link to={"/HomePage"}>Home</Link>
            </li>
            <li>
              <Link to={"/MapPage"}>Map</Link>
            </li>
            <li>History</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
