import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

const home = () => {
  return (
    <div>
      <h2 className="title">map A bird</h2>
      <div className="container marginCon">
        <div className="row">
          <div className="col">
            <Link style={{ textDecoration: "none", color: "#F1F1F1" }} to="/mapbirds">
              <div className="card cardheight" /* style="width: 18rem;" */>
                <img src="/images/mapBirds.png" className="card-img-top cardImg" alt="..." />
                <div className="card-body cardText">
                  <p className="card-text">Map Birds</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col">
            <Link style={{ textDecoration: "none", color: "#F1F1F1" }} to="/threads">
              <div className="card cardheight" /* style="width: 18rem;" */>
                <img src="/images/forum.png" className="card-img-top cardImg" alt="..." />
                <div className="card-body cardText">
                  <p className="card-text">Forum</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
