import React from "react";
import Navbar from "./navbar/navbar";

const Header = (props) => {
  return (
    <div
      className="parallax-container"
      style={{
        backgroundImage: `url(${props.url})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 1,
        position : "relative",
        backgroundSize: "cover",
        height: "70vh",
      }}
    >
      <div className="container pt-1">
      <Navbar/>
      <div className="  text-center text-light all-content">
        <div className="row ">
          <h1 className=".lead-1">{props.lead1}</h1>
          <p className="my-3">{props.lead2}</p>
        </div>
      </div>
      </div>
      <style jsx>
        {`
      .all-content{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60vh;
          }
          .lead-1 {
            color: #fff;
            font-size: 2.4rem;
            font-weight: 500;
          }
          .lead-2 {
            font-size: 0.98rem;
            color: #ababb0;
            font-weight: 300;
          }
        `}
      </style>
    </div>
  );
};

export default Header;
