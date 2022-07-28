import { NavLink } from "react-router-dom";

const HomeHeader = ({ className }) => {
  return (
    <header className={`${className}`}>
      <div className="homePage-header-container">
        <div className="homeHeader-logo">
          <NavLink to={"/"} exact={"true"}>
            Made By Yunseok Jang
          </NavLink>
        </div>
        <nav className="homeHeader-nav-container">
          <ul className="ul-link">
            <li>
              <NavLink to={"/HomePage"} exact={"true"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/MapPage"} exact={"true"}>
                Map
              </NavLink>
            </li>
            <li>History</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
