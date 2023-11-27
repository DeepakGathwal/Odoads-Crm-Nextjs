import React, { useState ,useEffect } from "react";
import SideBar from "../../../components/dashboard_navbar/Sidebar";
import MaterialTable from "@material-table/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Create_user from "./create_staff";
import { deletStaffApi, getAllStaffApi} from "../../../apis/apis";
import Edit_staff from "./edit_staff";
import withAuth from "../../../hoc/withAuth";
const Index = () => {
  const [posts, setPosts] = useState([]);
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

  //all staff api
  const allData = async () => {
    const data = await getAllStaffApi();
    setPosts(data);
  };
// Fetch all data for the table
  useEffect(() => {
    allData();
  }, []);


  return (
    <>
      <div className="containers">
        <div className="container-sidebar">
          <SideBar />
        </div>
        <div className="container-pages ">
          <button className="btn btn-create mb-3" onClick={handleShow}>
            New Staff
          </button>

          <MaterialTable
            data={posts}
            columns={[
              {
                title: "Image",
                field: "profile_image",
                render: (rowData) => (
                  <img
                    src={rowData.profile_image}
                    alt="Media Thumbnail"
                    style={{ width: 60, height: 55 }}
                  />
                ),
              },
              {
                title: "Name",
                field: "firstname",
                render: (rowData) =>
                  ` ${rowData.firstname} ${rowData.lastname}`,
              },
              {
                title: "Email",
                field: "email",
              },
              {
                title: "Phone",
                field: "phonenumber",
              },
              {
                title: "Role",
                field: "role",
              },
              {
                title: "Created",
                field: "datecreated",
              },
              {
                title: "All Actions",
                render: (rowData) => (
                  <div>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        // Handle edit action here
                        setSelectRow(rowData)
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
                          // Call the deleteMedia()
                        deletStaffApi(rowData.staffid)
                          allData();
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
              },
              rowStyle: {
                backgroundColor: "#FFFFFF",
                fontSize: ".72rem",
              },
            }}
            title="All STAFF"
          />
        </div>
      </div>
      <Create_user show={show} handleClose={handleClose} allData={allData} />
      {selectRow && 
          <Edit_staff
          show={showe}
          handleClose={handleClosee}
          selectRow={selectRow}
          allData={allData}
        />
      }
  
      <style jsx>
        {`
          .containers {
            height: 100vh;
            display: flex;
          }
          .select-1 {
            // width: 17vw;
            border-radius: 2px;
            height: 34px;
          }
        `}
      </style>
    </>
  );
};

export default withAuth(Index);
