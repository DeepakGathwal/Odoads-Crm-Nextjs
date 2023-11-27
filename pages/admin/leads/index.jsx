import React, { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import SideBar from "../../../components/dashboard_navbar/Sidebar";
import Leadsform from "./create_leads";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { allLeadsApi, deletLeadsApi, filterLeadsApi } from "../../../apis/apis";
import Editleads from "./edit_leads";
import withAuth from "../../../hoc/withAuth";

const Index = () => {
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [assigned, setAssigned] = useState("");
  const [addFil, setAddFil] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [tblData, setTblData] = useState([]);
  const [selectRow, setSelectRow] = useState(null);
  const [uniqueStatusNames, setUniqueStatusNames] = useState([]);
  const [uniqueStaffNames, setUniqueStaffNames] = useState([]);
  const [uniqueSourceNames, setUniqueSourceNames] = useState([]);
  const [additionalFilters, setAdditionalFilters] = useState([]);

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
    const data = await allLeadsApi();
    setOriginalData(data);
    setTblData(data);
  };

  // Fetch and filter leads data
  const filterLeadsData = async () => {
    const data = await filterLeadsApi();

    const uniqueStatusNames = [...new Set(data.map((item) => item.statusName))];
    const uniqueStaffNames = [...new Set(data.map((item) => item.staffname))];
    const uniqueSourceNames = [...new Set(data.map((item) => item.sourcename))];
    const additionalFilters = [...new Set(data.map((item) => item.addiFilter))];

    setUniqueStatusNames(uniqueStatusNames);
    setUniqueStaffNames(uniqueStaffNames);
    setUniqueSourceNames(uniqueSourceNames);
    setAdditionalFilters(additionalFilters);
    allData();
  };
 
  // Filter the table data based on the defaultValue options
  useEffect(() => {
    if (originalData !== "No Lead") {
      const filteredData = originalData.filter((item) => {
        return (
          (status === "" || item.status === status) &&
          (source === "" || item.source === source) &&
          (assigned === "" || item.assignfirst === assigned)
          // Add additional filters here if needed
        );
      });
    setTblData(filteredData);
    }
  }, [status, source, assigned, originalData]);

  useEffect(() => {
    filterLeadsData();
  }, []);

  return (
    <div>
      <div className="containers">
        {/* Sidebar component */}
        <div className="container-sidebar">
          <SideBar />
        </div>
        <div className="container-pages">
          <div className="task-panel">
            <button className="btn btn-create" onClick={handleShow}>
              New Lead
            </button>
            <hr />
            <div className="filter">
              <p className="mb-1">Filter by</p>
              <div className="drop-filter">
                <div>
                  <select
                    className="select-1"
                    onChange={(e) => setAssigned(e.target.value)}
                  >
                    <option value="" disabled defaultValue>
                      Assigned
                    </option>
                    {uniqueStaffNames.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    className="select-1"
                  >
                    <option value="" disabled defaultValue>
                      Status
                    </option>
                    {uniqueStatusNames.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    onChange={(e) => setSource(e.target.value)}
                    className="select-1"
                  >
                    <option value="" disabled defaultValue>
                      Source
                    </option>
                    {uniqueSourceNames.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    onChange={(e) => setAddFil(e.target.value)}
                    className="select-1"
                  >
                    <option value="" disabled defaultValue>
                      Additional Filters
                    </option>
                    {additionalFilters.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div></div>
              </div>
            </div>
            <hr />
            <div className="my-md-4">
              <MaterialTable
                data={tblData}
                columns={[
                  {
                    title: "Name",
                    field: "name",
                  },
                  { title: "Company", field: "company" },
                  {
                    title: "Email",
                    field: "email",
                  },
                  {
                    title: "Phone",
                    field: "phonenumber",
                  },
                  {
                    title: "Assigned",
                    field: "assignfirst",
                  },
                  {
                    title: "Source",
                    field: "source",
                  },
                  {
                    title: "Status",
                    field: "status",
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
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            // Handle delete action here

                            // Display a confirmation dialog
                            const confirmed = window.confirm("Are you sure?");

                            // Check if the user clicked "Confirm"
                            if (confirmed) {
                              // Call the deleteMedia()
                              deletLeadsApi(rowData.id);
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
                  {
                    title: "Last contact",
                    field: "date_converted",
                  },
                  {
                    title: "Created",
                    field: "dateadded",
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
                title="All LEADS"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Create lead form */}
      <Leadsform
        handleClose={handleClose}
        uniqueStatusNames={uniqueStatusNames}
        uniqueStaffNames={uniqueStaffNames}
        uniqueSourceNames={uniqueSourceNames}
        additionalFilters={additionalFilters}
        show={show}
        allData={allData}
      />

      {/* Edit lead form */}
      {selectRow && (
        <Editleads
          handleClose={handleClosee}
          show={showe}
          selectRow={selectRow}
          uniqueStatusNames={uniqueStatusNames}
          uniqueStaffNames={uniqueStaffNames}
          uniqueSourceNames={uniqueSourceNames}
          additionalFilters={additionalFilters}
          allData={allData}
        />
      )}
    </div>
  );
};

export default withAuth(Index);
