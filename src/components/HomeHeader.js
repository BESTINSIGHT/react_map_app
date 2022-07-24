const HomeHeader = ({ className }) => {
  return (
    <header className={`${className}`}>
      <div className="homeHeader-container">
        <div className="homeHeader-logo">Yunseok Jang</div>
        <nav className="homeHeader-nav">
          <button>소개</button>
          <button>지도</button>
          <button>맛집 리뷰</button>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
