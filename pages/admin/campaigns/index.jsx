import React, { useEffect, useState } from "react";
import SideBar from "../../../components/dashboard_navbar/Sidebar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable from "@material-table/core";
import { deletCampaignApi, getAllCampaignApi } from "../../../apis/apis";
import Creat_campaign from "./creat_campaign";
import Edit_campaign from "./edit_campaign";
import withAuth from "../../../hoc/withAuth";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [selectRow, setSelectRow] = useState(null);
  const [campaignData, setCampaignData] = useState({
    process: 0,
    New: 0,
    Hold: 0,
    Trashed: 0,
    Completed: 0,
    OPEN: 0
  });

  //creat modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // Edit modal
  const [showe, setShowe] = useState(false);
  const handleClosee = () => {
    setShowe(false);
    setSelectRow(null);
  };
  const handleShowe = () => setShowe(true);
  const getData = async () => {
    const allData = await getAllCampaignApi();
    const process = allData.filter((media) => media.status === "Processing").length;
    const New = allData.filter((media) => media.status === "New").length;
    const Hold = allData.filter((media) => media.status === "Hold").length;
    const Trashed = allData.filter((media) => media.status === "Trashed").length;
    const Completed = allData.filter((media) => media.status === "Completed").length;
    const OPEN = allData.filter((media) => media.status === "OPEN").length;
  

    setPosts(allData);
    setCampaignData({
      process,
      New,
      Hold,
      Trashed,
      Completed,
      OPEN
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="containers">
        <div className="container-sidebar">
          <SideBar />
        </div>
        <div className="container-pages ">
          <div className=" main_container">
            <div className="row ">
              <div className="col-lg-12 ">
                <button
                  type="button"
                  className="btn btn-create"
                  onClick={handleShow}
                >
                  NEW CAMPAIGN
                </button>
              </div>
            </div>
            <hr />
            <div className="row customer_rev">
              <div className="col-lg-12">
                <h4>Campaing Summary</h4>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>{campaignData.New}</h3>
                <span>New</span>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>{campaignData.OPEN}</h3>
                <span style={{ color: "rgb(82 193 12)" }}>Open</span>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>{campaignData.process}</h3>
                <span style={{ color: "#b8ca29" }}>Processing</span>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>{campaignData.Hold}</h3>
                <span style={{ color: "#4e52b7" }}>On Hold</span>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>{campaignData.Trashed}</h3>
                <span style={{ color: "#fc4748" }}>Cancelled</span>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>{campaignData.Completed}</h3>
                <span style={{ color: "green" }}>Finished</span>
              </div>
            </div>
            <hr />
        
              <div className="row">
                <MaterialTable
                  data={posts}
                  columns={[
                    { title: "Campaign name", field: "name" },
                    { title: "Coustomer", field: "customer" },
                    { title: "Start date", field: "start_date" },
                    { title: "Deadline", field: "deadline" },
                    { title: "Status", field: "status" },
                    { title: "Purchase Order(PO)", field: "purchase_order" },
                    {
                      title: "All Actions",
                      render: (rowData) => (
                        <div>
                          <IconButton
                            aria-label="edit"
                            onClick={() => {
                              // Handle edit action here
                                 setSelectRow(rowData)
                                handleShowe()
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              // Handle delete action here

                              // Display a confirmation dialog
                              const confirmed = window.confirm("Are you sure?");

                              // Check if the user clicked "Confirm"
                              if (confirmed) {
                                // Call the deletMedia() function
                                 deletCampaignApi(rowData.id);
                                 getData();
                              }
                            }}
                            style={{ color: "#FC2D42" }} // Add the desired color here
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      ),
                    },
                   
                  ]}
                  options={{
                    headerStyle: {
                      backgroundColor: "#caf0ec",
                      color: "#14877c",
                      padding: ".2em .7em",
                      margin: "0px",
                      whiteSpace: "nowrap", // Prevents text from wrapping
                      overflow: "hidden", // Hides any overflowing text
                      textOverflow: "ellipsis", // Truncates the text with an ellipsi
                    },
                    rowStyle: {
                      backgroundColor: "#FFFFFF",
                      fontSize: ".72rem",
                    },
                  }}
                  title=""
                />
            
            </div>
          </div>
        </div>
      </div>

      <Creat_campaign show={show} handleClose={handleClose} getAllCampaign={getData} />
      {selectRow &&(
        <Edit_campaign show={showe} handleClose={handleClosee} selectRow={selectRow}  getAllCampaign={getData}/>
      )}
      <style jsx>
        {`
          .main_container {
            background: #fff;
            border: 1px solid #dce1ef;
            border-radius: 4px;
            padding: 20px;
            position: relative;
          }

          .margin_right {
            border-right: 1px solid #f0f0f0;
          }
          span {
            font-size: 13px;
            font-weight: 400;
          }
          .customer_rev {
            color: #323a45;
          }
          h3 {
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 20px;
          }
          h4 {
            font-size: 18px;
            font-weight: 400;
          }
          .lable {
            margin-left: 7px;
            font-size: 14px;
          }
          .select_number {
            padding: 3px 12px 2px 12px;
            color: #4e75ad;
            font-size: 13px;
            border-radius: 4px;
            border-color: #4e75ad;
          }
        `}
      </style>
    </>
  );
};

export default withAuth(Index);
