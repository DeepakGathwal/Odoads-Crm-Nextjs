import React, { useState } from "react";
import SideBar from "../../../components/dashboard_navbar/Sidebar";
import MaterialTable from "@material-table/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Create_user from "./creat_role";
import { deletRolllesApi, getAllRollesApi } from "../../../apis/apis";
import { useEffect } from "react";
import Edit_user from "./edit_role";
import withAuth from "../../../hoc/withAuth";


const Index = () => {
  const [tblData, setTblData] = useState([]);
  const [selectRow, setSelectRow] = useState(null);

  // Create lead modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Edit lead modal
  const [showe, setShowe] = useState(false);
  const handleClosee = () => {
    setShowe(false);
    setSelectRow(null);
  };

  const handleShowe = () => setShowe(true);

  // Fetch all data for the table
  const allData = async () => {
    const data = await getAllRollesApi();
    setTblData(data);
  };

  useEffect(() => {
    allData();
  }, []);

  return (
    <>
      <div className="containers">
        <div className="container-sidebar">
          <SideBar />
        </div>
        <div className="container-pages mb-5 pb-5">
          <button className="btn btn-create mb-3" onClick={handleShow}>
            New Role
          </button>

          <MaterialTable
            data={tblData}
            columns={[
              {
                title: "Role ID",
                field: "roleid",
              },
              {
                title: "Role Name",
                field: "name",
              },
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
                    {/* <IconButton
                      aria-label="delete"
                      onClick={() => {
                        // Handle delete action here

                        // Display a confirmation dialog
                        const confirmed = window.confirm("Are you sure?");

                        // Check if the user clicked "Confirm"
                        if (confirmed) {
                          // Call the deleteMedia()
                          // deletRolllesApi(rowData.roleid);
                          allData();
                        }
                      }}
                      style={{ color: "#FC2D42" }} // Add the desired color here
                    >
                      <DeleteIcon />
                    </IconButton> */}
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
              },
              rowStyle: {
                backgroundColor: "#FFFFFF",
                fontSize: ".72rem",
              },
            }}
            title="New Role"
          />

        </div>
      </div>
      <Create_user show={show} handleClose={handleClose} allData={allData} />
     {selectRow && <>
      <Edit_user
        show={showe}
        handleClose={handleClosee}
        allData={allData}
        selectRow={selectRow}
      />
     </>}
      <style jsx>
        {`
          .containers {
            height: 100vh;
            display: flex;
          }
          .select-1 {
            width: 100%;
            border-radius: 2px;
            height: 34px;
          }
        `}
      </style>
    </>
  );
};

export default withAuth(Index);
