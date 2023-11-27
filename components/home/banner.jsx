import React, { useEffect, useState } from "react";
import Typed from "react-typed";
import Pages from "./banner-slider";
import Navbar from "../navbar/navbar";
import { useRouter } from "next/router";

const Banner = () => {
  const route = useRouter();

  const [loged, setLogged] = useState();
  useEffect(() => {
    // Check if the localStorage data has expired
    const expirationTime =
      typeof window !== "undefined" && localStorage.getItem("expirationTime");
    if (expirationTime && Date.now() > expirationTime) {
      localStorage.removeItem("user");
      localStorage.removeItem("expirationTime");
    }

    //check user logged in or not
    const userIsAuthenticated =
      typeof window !== "undefined" && localStorage.getItem("user") !== null;
    setLogged(userIsAuthenticated);
  }, []);

  return (
    <div className="header  text-white h-fullscreen body">
      <div className="container pt-0">

          <Navbar />
       
        <div className="position-static ss">
          <div className="row align-items-center h-100">
            <div className="col-7">
              <h1 className="display-6">
                Built to{" "}
                <Typed
                  strings={["Simplify", "Automate", "Connect"]}
                  typeSpeed={80}
                  backSpeed={50}
                  loop
                />
                <span className="typed-cursor"></span>
              </h1>
              <p className="lead2 mt-5 mb-5  w-75">
                End to end{" "}
                <strong>
                  OUTDOOR MEDIA INVENTORY &amp; CAMPAIGN MANAGEMENT
                </strong>{" "}
                System
              </p>
              <div className="pt-5">
                <p
                  className="btn btn-success me-2 h-btn"
                  onClick={() => route.push("/contact")}
                >
                  Contact Us
                </p>
                {loged? <p
                  className="btn btn-outline-light ms-2 h-btn"
                  onClick={() => route.push("/features")}
                >
                 Features
                </p> : <p
                  className="btn btn-outline-light ms-2 h-btn"
                  onClick={() => route.push("/login")}
                >
                  Start free Now
                </p>}
                
              </div>
            </div>

            <div className="col-lg-5">
              <Pages />
            </div>
          </div>
        </div>
        <div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>
      <style jsx>
        {`
   
          .header.h-fullscreen {
            padding: 1.6vh 8vw;
            height: 100vh;
          }
          .ss {
            padding-top: 21vh;
          }
          .constellation {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .btn-success {
            color: #fff !important;
            background-color: #3cd458 !important;
            border-color: #3cd458 !important;
          }
          .btn-outline-light {
            color: rgba(255, 255, 255, 0.6);
            border-color: rgba(255, 255, 255, 0.3);
          }
          .btn-outline-light:hover {
            background-color: white !important;
            color: black !important;
          }
          .h-btn {
            border-radius: 10rem !important;
            padding: 10px 38px 10px !important;
            font-size: 12px !important;
            font-weight: 600 !important;
            width: auto !important;
            -webkit-transition: 0.15s linear !important;
            transition: 0.15s linear !important;
            text-transform: uppercase !important;
            outline: none !important;
            letter-spacing: 1.7px !important;
            cursor: pointer;
          }

          .body {
            margin: auto;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            overflow: auto;
            background: linear-gradient(
              315deg,
              rgba(101, 0, 94, 1) 3%,
              rgba(60, 132, 206, 1) 38%,
              rgba(48, 238, 226, 1) 68%,
              rgba(255, 25, 25, 1) 98%
            );
            animation: gradient 43s ease infinite;
            background-size: 400% 400%;
            background-attachment: fixed;
          }

          @keyframes gradient {
            0% {
              background-position: 0% 0%;
            }
            50% {
              background-position: 100% 100%;
            }
            100% {
              background-position: 0% 0%;
            }
          }

          .wave {
            background: rgb(255 255 255 / 25%);
            border-radius: 1000% 1000% 0 0;
            position: fixed;
            width: 200%;
            height: 12em;
            animation: wave 10s -3s linear infinite;
            transform: translate3d(0, 0, 0);
            opacity: 0.8;
            bottom: 0;
            left: 0;
            z-index: -1;
          }

          .wave:nth-of-type(2) {
            bottom: -1.25em;
            animation: wave 18s linear reverse infinite;
            opacity: 0.8;
          }

          .wave:nth-of-type(3) {
            bottom: -2.5em;
            animation: wave 20s -1s reverse infinite;
            opacity: 0.9;
          }

          @keyframes wave {
            2% {
              transform: translateX(1);
            }

            25% {
              transform: translateX(-25%);
            }

            50% {
              transform: translateX(-50%);
            }

            75% {
              transform: translateX(-25%);
            }

            100% {
              transform: translateX(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Banner;
