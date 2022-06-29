import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getFeedsAPI } from "../store/feed/feed.actions";
import Style from "./Feed.module.css"
import Filter from "./Filter";
import Sort from "./Sort";
const Home = () => {
  const dispatch = useDispatch();
  const [searchParams]= useSearchParams()
  const { data, getFeeds } = useSelector((state) => state.feed);
  const location = useLocation()
  // localStorage, check if data
  useEffect(() => {
    if (data.length === 0 || location.search) {
      const sortBy = searchParams.get("sortBy")
      const getBookParams = {
        params : {
            category: searchParams.getAll("category"),
            _sort: sortBy && "realese_year",
            _order: sortBy
        }
     }
      dispatch(getFeedsAPI(getBookParams));
    }
  }, [location.search]);

  return (
    <div >
      <h1>Home</h1>
      <br />
      <div className={Style.divs}>
        <div>
        <Filter/>
        <Sort/>
        </div>
      
      {getFeeds.loading && <div>Loading...</div>}
      {getFeeds.error && <div>Error...</div>}
      <div className={Style.div}>
      {!getFeeds.loading && data.length>0 &&
        data.map((feed) => (
          <div
            key={feed.id}
            style={{
              padding: "10px",
              margin: "auto",
              marginTop: "10px",
              border: "1px solid grey",
              maxWidth: "200px",
            }}
          >
            <div>{feed.title}</div>
            <div>{feed.description}</div>
            <div>{feed.category}</div>
            <div>{feed.realese_year}</div>
          </div>
        ))}
        </div>
       
        </div>
    </div>
  );
};

export default Home;
