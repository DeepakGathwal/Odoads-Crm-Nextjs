import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {AiOutlineLogin} from "react-icons/ai"

const Navbar = () => {
  const [loged, setLogged] = useState();
  const router = useRouter();

  useEffect(() => {
    //check user logged in or not
    const userIsAuthenticated =
      typeof window !== "undefined" && localStorage.getItem("user") !== null;
    setLogged(userIsAuthenticated);
  }, []);
  return (
    <nav className="navbar ps-0">
      <div className="nav-container w-100">
        <p className="nav-logo">
          <img
            src="https://odoads.com/assets/img/logo-light.png"
            onClick={() => router.push("/")}
            style={{cursor:"pointer"}}
          />
        </p>
        <section className="navbar-mobile pt-2">

          <ul className="nav nav-navbar ">
            <li className="nav-item">
              <p className="nav-link" onClick={() => router.push("/")}>
                Home
              </p>
            </li>
            <li className="nav-item">
              <p className="nav-link" onClick={() => router.push("/about")}>
                About
              </p>
            </li>
            <li className="nav-item">
              <p className="nav-link" onClick={() => router.push("/features")}>
                Features
              </p>
            </li>
            <li className="nav-item">
              <p className="nav-link" onClick={() => router.push("/pricing")}>
                Pricing
              </p>
            </li>
            <li className="nav-item">
              <p className="nav-link" onClick={() => router.push("/contact")}>
                Contact
              </p>
            </li>
          </ul>
        </section>
        <form className="nav-search">
          {loged ? (
            <button
              className="search-btn me-2 btn-success"
              type="button"
              onClick={() => router.push("/admin")}
            >
              My Dashboard <AiOutlineLogin style={{fontSize:"14px"}}/>
            </button>
          ) : (
            <>
              <button
                className="search-btn me-2 btn-success ps-3 pe-3"
                type="button"
                onClick={() => router.push("/login")}
              >
                 Login <AiOutlineLogin style={{fontSize:"14px"}}/>
              </button>
          
            </>
          )}
        </form>
      </div>
      <style jsx>
        {`
          .navbar {
            background-color: transparent;
            padding: 4px 20px;
          }

          .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .nav-logo {
            font-weight: bold;
            font-size: 1.1rem;
            text-decoration: none;
            color: #000;
          }

          .nav-item {
            vertical-align: middle;
          }

          .nav-link {
            cursor: pointer;
            padding-top: 1px;
            padding-bottom: 0;
            text-decoration: none;
            color: #c4b8de;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.67rem;
            word-spacing: 2px;
          }

          @media screen and (max-width: 1225px) {
            .nav-link {
              padding-top: 8px;
            }
          }

          .nav-link:hover {
            box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
            color: #ffffff;
          }

          .search-input {
            padding: 5px;
            border: 1px solid #ccc;
          }

          .search-btn {
            padding: 5px 10px;
            border-radius: 10rem;
            font-size: 10px;
            font-weight: 500;
            width: auto;
            -webkit-transition: 0.15s linear;
            transition: 0.15s linear;
            text-transform: uppercase;
            outline: none;
            letter-spacing: 0.7px;
            cursor: pointer;
            border: none;
          }

          .btn-success {
            color: #fff;
            background-color: #3cd458;
          }

          .search-btn:hover {
            box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
