import { getAllCampaignApi, getAllStaffApi } from "@/apis/apis";
import React, { useState, useEffect } from "react";
import { MdCall } from "react-icons/md";

const Dashboard2 = () => {
  const [posts, setPosts] = useState([]);
  const [allCamp, setAllCamp] = useState([]);
  //all staff api
  const allData = async () => {
    const data = await getAllStaffApi();
    setPosts(data);
  };

  //all campaign api
  const getData = async () => {
    const allData = await getAllCampaignApi();
    console.log(allData);
    const filteData = allData.filter(
      (data) => new Date(data.deadline) >= new Date()
    );
    setAllCamp(filteData);
  };

  useEffect(() => {
    getData();
    allData();
  }, []);

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-md-8 p-0 pe-3 ">
          <div className="card rounded-3 p-3 border-0 no-data">
            <h5 className="mb-0">
              Ongoing & Upcoming Campaigns
              {/* <img
                src="../../imgs/staff.png"
                alt="Preview"
                className="float-end"
                style={{ height: "30px", visibility: "hidden" }}
              /> */}
              <p className="float-end text-mute ">Coustomer</p>
            </h5>
            <hr />
            {allCamp ? (
              allCamp.map((data, i) => (
                <div className="row" key={i}>
                  <div className="col-md-8 d-flex  p-2 py-1">
                    <img
                      src="../../imgs/billboard.png"
                      alt="Preview"
                      style={{
                        width: "40px",
                        height: "40px",
                        opacity: "0.5",
                      }}
                    />

                    <div className="text-start ps-3 pt-1">
                      <h6
                        className="name mb-0"
                        style={{ textTransform: "capitalize" }}
                      >
                        {data.name}
                      </h6>
                      <p className="text-mute">
                        End date {formatDate(data.deadline)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 p-2  pt-3 ">
                    <div
                      className="card p-1 ps-2 pe-2 border-0 float-end "
                      style={{
                        width: "10vw",
                        backgroundColor: "#EEEFF4",
                        textAlign: "center",
                      }}
                    >
                      <p
                        className=" mb-0"
                        style={{ fontSize: ".6rem", letterSpacing: ".5px" }}
                      >
                        {data.customer}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className=" text-mute d-flex justify-content-center ">
                No campaign to show
              </div>
            )}
          </div>
        </div>
        <div className="col-md-4 p-0">
          <div className="card rounded-3 p-3 border-0 no-data">
            <h5 className="mb-0">
              My Staff
              <img
                src="../../imgs/staff.png"
                alt="Preview"
                className="float-end"
                style={{ height: "30px" }}
              />
            </h5>
            <hr />

            {posts ? (
              posts.map((data, i) => (
                <div className="row" key={i}>
                  <div className="col-md-10 d-flex  p-2 py-1">
                    <img
                      src={
                        data.profile_image
                          ? data.profile_image
                          : "../../imgs/defaulUser.png"
                      }
                      alt="Preview"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />

                    <div className="text-start ps-3 pt-1">
                      <h6
                        className="name mb-0"
                        style={{ textTransform: "capitalize" }}
                      >
                        {data.firstname}
                      </h6>
                      <p className="text-mute">{data.role}</p>
                    </div>
                  </div>
                  <div className="col-md-2 p-2  pt-3">
                    <a href={`tel:${data.phonenumber}`}>
                      <div
                        className="card p-1 card-hov "
                        style={{ width: "fit-content" }}
                      >
                        <MdCall style={{ color: "#86888C" }} />
                      </div>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className=" text-mute d-flex justify-content-center ">
                No staff to show
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .no-data {
          min-height: 55vh;
        }
        .name {
          font-size: 0.84rem;
          font-weight: 400;
        }
        .text-mute {
          font-size: 0.7rem;
          color: #9aabc3;
        }
        h5 {
          font-weight: 500;
          font-size: 1.05rem;
        }
        .card-hov{
          transition-duration: .3s;
        }
        .card-hov:hover{
        background-color:#EEEFF4;
        }
      `}</style>
    </div>
  );
};

export default Dashboard2;
