import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

const home = () => {
  return (
    <div>
      <div className="containerLogo">
      
          <img className="titleLogo" src="/images/aguila-red.png" alt="" />
      
      </div>
      <div className="container marginCon">
        <div className="row">
          <div className="col">
            <Link
              style={{ textDecoration: "none", color: "#F1F1F1" }}
              to="/mapbirds"
            >
              <div className="card">
                <img
                  src="/images/mapBirdsx.png"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body cardText">
                  <p className="card-text">Map Birds</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col">
            <Link
              style={{ textDecoration: "none", color: "#F1F1F1" }}
              to="/threads"
            >
              <div className="card">
                <img
                  src="/images/forumx.png"
                  className="card-img-top"
                  alt="..."
                />
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
