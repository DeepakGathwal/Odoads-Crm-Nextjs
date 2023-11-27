import React from "react";

const Dashboard1 = () => {
  return (
    <div className="container-fluid py-2 p-4 rounded-3">
      <div className="row">
        <div className="col-md-4  d-flex  p-2 py-3">
          <img
            src={"../../imgs/man.png"}
            alt="Preview"
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
          />

          <div className="text-start ps-3 pt-3">
            <h5 className="">Welcome back</h5>
            <p className="text-mute">It's nice to see you again</p>
          </div>
        </div>
        <div className="col-md-4 p-2 py-3">
          {" "}
          <div className="text-start p-2 pt-3">
            <h5 className="">31 Tasks</h5>
            <p className="text-mute">Are currently pending</p>
          </div>
        </div>
        <div className="col-md-4 p-2">
          <div className="card p-3 py-2 border-0 ">
            <p className="text-dark">
              Start using our media and campaign management tools
            </p>

            <h6> Learn More</h6>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container-fluid {
            background-color: #ffffff;
          }
          .card {
            background-color: #ffb433;
            opacity: 0.85;
            box-shadow: #ffd283 -3px 7px 15px -4px;
          }
          .text-mute {
            color: #9aabc3;
            font-size: 0.85rem;
          }
          h5 {
            font-weight: 400;
            font-size: 1.3rem;
          }
          h6 {
            cursor: pointer;
            border-bottom: 1px solid transparent;
            width: fit-content;
          }
          h6:hover {
            border-bottom: 1px solid black;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard1;
