import { useState } from "react";
import Button from "../Button";
import Input from "../Input";

const SearchAddress = ({ map, setAddress }) => {
  const [searchText, setSearchText] = useState("");
  const [resultList, setResultList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const doSearch = () => {
    if (searchText) {
      const service = new window.google.maps.places.PlacesService(map);

      const request = {
        query: `${searchText}`,
      };

      service.textSearch(request, (result, status, pagination) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          result
        ) {
          setNextPage(pagination);
          pagination.hasNextPage ? setHasNextPage(true) : setHasNextPage(false);
          setResultList(result);
          console.log("result === ", result);
          console.log("result === ", status);
          console.log("pagination === ", pagination);
        }
      });
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Input
        type={"text"}
        value={searchText}
        placeholder={"주소 입력"}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            doSearch();
          }
        }}
        style={{ width: "85%", height: "2rem", margin: "auto" }}
      />
      <Button style={{ marginLeft: "10px" }} onClick={doSearch}>
        검색
      </Button>
      <ul style={{ padding: "0" }}>
        {resultList.length !== 0 &&
          resultList.map((result, index) => {
            //const color = result.icon_background_color;
            return (
              <li
                key={index}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  margin: "10px 0 10px 0",
                  border: "1px solid black",
                  borderRadius: ".5rem",
                }}
                onClick={() => setAddress(result.formatted_address)}
              >
                <h4>{result.name}</h4>
                <div>{result.formatted_address}</div>
              </li>
            );
          })}
      </ul>
      {hasNextPage && (
        <Button
          onClick={() => {
            nextPage.nextPage();
          }}
        >
          더 보기
        </Button>
      )}
    </div>
  );
};

export default SearchAddress;
