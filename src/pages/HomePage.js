import HomeHeader from "../components/HomeHeader";

const HomePage = () => {
  const contentsString = [
    "Google Maps Web Application",
    "전 세계를 탐험해 보세요!",
    "검색기능을 이용해서 장소를 찾아보세요!",
    "스트리트뷰를 이용해서 실제 장소를 확인해보세요!",
    "장소에 대한 평가 및 의견을 남겨보세요!",
    "자신이 남긴 리뷰를 확인하고, 수정, 삭제해 보세요!",
    "내 리뷰를 클릭해서 장소로 바로가기 해보세요!",
  ];

  return (
    <div className="homePage-container">
      <HomeHeader />
      <div className="homePage-main">
        {contentsString.map((content, index) => {
          if (index === 0) {
            return (
              <h1
                key={index}
                style={{
                  backgroundColor: "#7DCE13",
                  padding: "35px",
                  marginBottom: "100px",
                  color: "#EAE509",
                  boxShadow: "1px 1px 10px #00692A",
                  textShadow: "1px 1px #00692A",
                }}
              >
                {content}
              </h1>
            );
          } else {
            return (
              <div key={index} style={{ padding: "5px", color: "#626B60" }}>
                {content}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default HomePage;
