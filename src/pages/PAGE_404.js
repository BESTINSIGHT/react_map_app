import { Link } from "react-router-dom";

const PAGE_404 = () => {
  return (
    <div className="page-404-container page-404-contents">
      <Link to={"/"}>PAGE NOT FOUND!!!!!</Link>
    </div>
  );
};

export default PAGE_404;
