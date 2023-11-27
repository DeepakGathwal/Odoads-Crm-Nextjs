import React, { useEffect, useState } from "react";
import SideBar from "../../../components/dashboard_navbar/Sidebar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable from "@material-table/core";
import Add_customer from "./add_coustomer";
import { deleteCustomerApi, getCustomerApi } from "../../../apis/apis";
import Edit_customer from "./edit_coustomer";
import withAuth from "../../../hoc/withAuth";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [selectRow, setSelectRow] = useState(null);
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
    const allData = await getCustomerApi();
    setPosts(allData);
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
                  NEW CUSTOMER
                </button>
              </div>
            </div>
            <hr />
            <div className="row customer_rev">
              <div className="col-lg-12">
                <h4>Customers Summary</h4>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>{posts.length}</h3>
                <span>Total Customer</span>
              </div>
              {/* <div className="col-lg-2 margin_right">
                <h3>2</h3>
                <span style={{ color: "#b8ca29" }}>Active Customers</span>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>0</h3>
                <span style={{ color: "#fc4748" }}>Inactive Customers</span>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>4</h3>
                <span style={{ color: "#4e52b7" }}>Active Contacts</span>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>0</h3>
                <span style={{ color: "#fc4748" }}>Inactive Contacts</span>
              </div>
              <div className="col-lg-2 ">
                <h3>2</h3>
                <span style={{ color: "#777777" }}>
                  Contacts Logged In Today
                </span>
              </div> */}
            </div>
            <hr />
            <div className="row">
              <div className="row">
                <MaterialTable
                  data={posts}
                  columns={[
                    { title: "company", field: "company" },

                    { title: "city", field: "city" },
                    { title: "Phone", field: "phonenumber" },
                    { title: "zip", field: "zip" },
                    { title: "state", field: "state" },
                    { title: "address", field: "address" },
                    { title: "Data Created", field: "dateCreated" },
                    {
                      title: "All Actions",
                      render: (rowData) => (
                        <div>
                          <IconButton
                            aria-label="edit"
                            onClick={() => {
                              // Handle edit action here
                              setSelectRow(rowData);
                              handleShowe();
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
                                deleteCustomerApi(rowData.id);
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
                    { title: "website", field: "website" },
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
                      whiteSpace: "nowrap", // Prevents text from wrapping
                      overflow: "hidden", // Hides any overflowing text
                    },
                  }}
                  title="ALL CUSTOMER"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Add_customer show={show} handleClose={handleClose} getData={getData} />
      {selectRow && (
        <Edit_customer
          show={showe}
          handleClose={handleClosee}
          selectRow={selectRow}
          getData={getData}
        />
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
