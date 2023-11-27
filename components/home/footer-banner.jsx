import React from "react";
import Link from "next/link";

const BubblesAnimation = () => {
  return (
    <div className="wrapper py-5">
      <section className="container ">
        <header className="section-header text-light my-5 text-center">
          <h2 className=" fw-400" style={{fontSize:"1.9rem"}}>
            Get It <span className="mark-underline">Now</span>
          </h2>
          <p className="desc  mt-3" >
            If you have made your decision to own this services, go ahead and
            press on the <br/> following button to get registered in less than a
            minute.
          </p>
        </header>
        <p className="text-center ">
          <Link className="btn f-btn" href="/login">
            Start Free Now
          </Link>
        </p>
      </section>

      <style jsx>
        {`
        .desc{
          font-weight: 300;
          line-height: 23px;
          font-size: 0.7rem;
        }
          .wrapper {
            height: 60vh;
            width: 100%;
            background-image: linear-gradient(
              to top,
              rgba(6, 118, 103, 0.579) 0%,
              RGB(103, 138, 153) 100%
            );
            position: relative;
          }
          .wrapper .container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: sans-serif;
            letter-spacing: 1px;
            word-spacing: 2px;
            color: #fff;
            font-size: 40px;
            text-transform: uppercase;
          }
        `}
      </style>
    </div>
  );
};

export default BubblesAnimation;
