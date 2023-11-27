import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { addImgeApi, addStaffApi, getAllRollesApi } from "../../../apis/apis";
const Create_staff = ({ show, handleClose, allData }) => {
  //form data
  const formdata = {
    name: "",
    email: "",
    password: "",
    facebook: "",
    linkdin: "",
    skype: "",
    phone_number: "",
    role_name: "",
    all_Permission: [
      {
        permission: "Contracts",
        short_name: "contracts",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Credit notes",
        short_name: "credit_notes",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Customers",
        short_name: "customers",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Email Templates",
        short_name: "email_templates",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Estimates",
        short_name: "estimates",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Expenses",
        short_name: "expenses",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Goals",
        short_name: "goals",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Invoices",
        short_name: "invoices",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Items",
        short_name: "items",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Knowledge base",
        short_name: "knowledge_base",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Leads",
        short_name: "leads",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Payments",
        short_name: "payments",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Projects",
        short_name: "projects",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Proposals",
        short_name: "proposals",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Reports",
        short_name: "reports",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Roles",
        short_name: "roles",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Settings",
        short_name: "settings",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Staff",
        short_name: "staff",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Subscriptions",
        short_name: "subscriptions",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Surveys",
        short_name: "surveys",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Tasks",
        short_name: "tasks",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Tasks Checklist Templates",
        short_name: "checklist_templates",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Media Inventroy",
        short_name: "media_inventory",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Landlord Management",
        short_name: "landlord_management",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        permission: "Planning, Blocking, Booking",
        short_name: "plan_block_book",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
    ],
  };
  const [defaultValueFile, setdefaultValueFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [data, setData] = useState(formdata);
  const [profile, setProfile] = useState(true);
  const [tblData, setTblData] = useState([]);
  const change = () => setProfile(!profile);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (index, fieldName) => {
    const updatedPermissions = [...data.all_Permission];
    const isChecked = updatedPermissions[index][fieldName] === 1;
    updatedPermissions[index][fieldName] = isChecked ? 0 : 1;
    setData((prevRoleData) => ({
      ...prevRoleData,
      all_Permission: updatedPermissions,
    }));
  };

  //store img upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setdefaultValueFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  //add new staff api
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      data.name !== "" &&
      data.email !== "" &&
      data.password.length >= 8 &&
      data.role_name !== "" &&
      data.phone_number.length == 10
    ) {
      const value = await addStaffApi(data);
      if (value.message == "Satff Member added Successfully") {
        const formData = new FormData();
        formData.append("file", defaultValueFile);
        formData.append("name", "staff");
        const data = await addImgeApi(formData);
        if (data.message === "Success") {
          setPreviewImage(null);
          setdefaultValueFile(null);
        }
        allData();
        setData(formdata);
        handleClose();
        setIsFormSubmitted(false);
      }
    } else {
      setIsFormSubmitted(true);
    }
  };
  const allRoles = async () => {
    const data = await getAllRollesApi();
    setTblData(data);
  };
  useEffect(() => {
    allRoles();
  }, []);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new Satff</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit} style={{ width: "56vw" }}>
        <Modal.Body>
          <div className="container p-0">
            <div className="row d-flex justify-content-center">
              <img
                src={previewImage ? previewImage : "../../imgs/defaulUser.png"}
                alt="Preview"
                className="mt-2"
                style={{ width: "100px", height: "70px", borderRadius: "50%" }}
              />
            </div>
            <div className="row">
              {profile ? (
                <>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="mediaImage" className="control-label">
                        Profile image
                      </label>
                      <input
                        type="file"
                        id="fileupload"
                        name="mediaImage"
                        onChange={handleFileChange}
                        className="form-control"
                        accept="image/jpg,image/jpeg,image/png"
                        aria-describedby="name-error"
                        aria-invalid="true"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="medianame" className="control-label">
                        <small className="req text-danger">* </small>Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className={`form-control ${
                          isFormSubmitted && data.name === ""
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {isFormSubmitted && data.name === "" && (
                        <div className="invalid-feedback">
                          Please enter a name.
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="control-label">
                        <small className="req text-danger">* </small>Email
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        className={`form-control ${
                          isFormSubmitted && data.email === ""
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {isFormSubmitted && data.email === "" && (
                        <div className="invalid-feedback">
                          Please enter a email.
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="password" className="control-label">
                        <small className="req text-danger">* </small>Password
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        className={`form-control ${
                          isFormSubmitted && data.password.length <= 7
                            ? "is-invalid"
                            : ""
                        }`}
                      
                      />
                      {isFormSubmitted && data.password.length <= 7 && (
                        <div className="invalid-feedback">
                          password should be atleast 6 digit.
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="medianame" className="control-label">
                        Facebook
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="facebook"
                        className="form-control customvalidate invalid"
                        value={data.facebook}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="medianame" className="control-label">
                        Linkdin
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="linkdin"
                        className="form-control customvalidate invalid"
                        value={data.linkdin}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="medianame" className="control-label">
                        Skype
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="skype"
                        className="form-control customvalidate invalid"
                        value={data.skype}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone_number" className="control-label">
                        <small className="req text-danger">* </small> Phone
                      </label>
                      <input
                        type="number"
                        id="name"
                        name="phone_number"
                        value={data.phone_number}
                        onChange={handleChange}
                        className={`form-control ${
                          isFormSubmitted && data.phone_number.length !== 10
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {isFormSubmitted && data.phone_number.length !== 10 && (
                        <div className="invalid-feedback">
                          Please enter phone number corectly.
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-12">
                    <div className="form-group mb-2">
                      <label htmlFor="role" className="control-label">
                        <small className="req text-danger">* </small>Select Role
                      </label>
                      <div>
                        <select
                          className={`select-1 ${
                            isFormSubmitted && data.role_name === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="role_name"
                          value={data.role_name}
                          onChange={handleChange}
                        >
                          <option value=" " defaultValue></option>
                          {tblData.map((el) => (
                            <option value={el.roleid}>{el.name}</option>
                          ))}
                        </select>
                        {isFormSubmitted && data.role_name === "" && (
                          <div className="invalid-feedback">
                            Please select a role.
                          </div>
                        )}
                      </div>
                    </div>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Permission</th>
                          <th scope="col" className="text-center">
                            View
                          </th>
                          <th scope="col" className="text-center">
                            View (own)
                          </th>
                          <th scope="col" className="text-center">
                            Create
                          </th>
                          <th scope="col" className="text-center">
                            Edit
                          </th>
                          <th scope="col" className="text-center">
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.all_Permission.map((item, index) => (
                          <tr key={index}>
                            <td>{item.permission}</td>
                            {Object.keys(item).map((key, idx) => {
                              if (
                                key !== "permission" &&
                                key !== "short_name"
                              ) {
                                return (
                                  <td key={idx} className="text-center">
                                    <input
                                      type="checkbox"
                                      checked={item[key] === 1}
                                      onChange={() =>
                                        handleCheckboxChange(index, key)
                                      }
                                    />
                                  </td>
                                );
                              }
                              return null;
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {profile ? (
            <>
              <Button className=" btn btn-create" onClick={change}>
                Save & Next
              </Button>
            </>
          ) : (
            <>
              <Button variant="light" onClick={change}>
                Previous
              </Button>
              <Button className="btn-create" type="submit">
                Save
              </Button>
            </>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Create_staff;
