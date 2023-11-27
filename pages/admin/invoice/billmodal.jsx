import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ModalBody, ModalFooter } from "react-bootstrap";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { getCityApi, getStateApi } from "../../../apis/apis";

const BillModal = ({ showbill, handleClosebill, onTransferData }) => {
  const [state, setState] = useState([]);
  const [billingCity, setBillingCity] = useState([]);
  const [shippingCity, setShippingCity] = useState([]);
  const getData = {
    billing_street: "",
    billing_city: "",
    billing_state: "",
    billing_zip: "",
    shiping_street: "",
    shiping_city: "",
    shiping_state: "",
    shiping_zip: "",
  };
  const [FormData, setFormData] = useState(getData);
  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
    onTransferData(FormData);
  };

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      FormData.billing_street !== "" &&
      FormData.billing_city !== "" &&
      FormData.billing_state !== "" &&
      FormData.shiping_zip.length == 6 &&
      FormData.billing_zip.length == 6 &&
      FormData.shiping_city !== "" &&
      FormData.shiping_state !== "" &&
      FormData.shiping_street !== ""
    ) {
      onTransferData(FormData);
      setFormData(getData);
      handleClosebill();
    } else {
      setIsFormSubmitted(true);
    }
  };

  const stateList = async () => {
    const data = await getStateApi();
    setState(data);
  };

  // Fetch city option
  const CityList = async () => {
    if (FormData.customer_state !== "") {
      const datas = await getCityApi(FormData.customer_state);
      if (FormData.billing_state !== "") {
        const billingCityData = await getCityApi(FormData.billing_state);
        setBillingCity(billingCityData);
      }

      if (FormData.shiping_state !== "") {
        const shippingCityData = await getCityApi(FormData.shiping_state);
        setShippingCity(shippingCityData);
      }
    }
  };
  useEffect(() => {
    CityList();
  }, [FormData.customer_state, FormData.billing_state, FormData.shiping_state]);

  useEffect(() => {
    stateList();
  }, []);
  return (
    <>
      <Modal show={showbill} onHide={handleClosebill}>
        <Modal.Header>
          <Modal.Title>Billing & Shipping Address</Modal.Title>
        </Modal.Header>
        <form action="" onSubmit={handleSubmit}>
          <ModalBody>
            <div className="filter " style={{ width: "55.5vw" }}>
              <div className="row">
                <div className="col-lg-6 mt-3">
                  <div className="row">
                    <div className="col-lg-6">
                      <p>
                        <BsFillQuestionCircleFill className="icon" />
                        Billing Address
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">*</small>Street
                      </label>
                      <div className="form-floating">
                        <textarea
                          className={`form-control ddd ${
                            isFormSubmitted && FormData.billing_street === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="billing_street"
                          value={FormData.billing_street}
                          onChange={handleChange}
                          placeholder="Adress here...."
                          id="floatingTextarea"
                        ></textarea>
                        {isFormSubmitted && FormData.billing_street === "" && (
                          <div className="invalid-feedback">
                            Please write billing street.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">*</small>State
                      </label>

                      <div>
                        <select
                          name="billing_state"
                          value={FormData.billing_state}
                          className={`select-1 ${
                            FormData.billing_state === "" ? "is-invalid" : ""
                          }`}
                          onChange={handleChange}
                        >
                          <option value="" disabled></option>
                          {/* Default defaultValue option */}
                          {state.map((option, i) => (
                            <option key={i} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        {isFormSubmitted && FormData.billing_state === "" && (
                          <div className="invalid-feedback">
                            Please select a Billing State.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">*</small>City
                      </label>
                      <div>
                        <select
                          className={`select-1 ${
                            FormData.billing_city === "" ? "is-invalid" : ""
                          }`}
                          name="billing_city"
                          value={FormData.billing_city}
                          onChange={handleChange}
                        >
                          <option value="" disabled></option>
                          {billingCity.map((option, i) => (
                            <option key={i} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        {isFormSubmitted && FormData.billing_city === "" && (
                          <div className="invalid-feedback">
                            Please select a Billing City.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">*</small>Zip Code
                      </label>
                      <input
                        type="number"
                        name="billing_zip"
                        value={FormData.billing_zip}
                        onChange={handleChange}
                        className={`form-control  ${
                          isFormSubmitted && FormData.billing_zip.length !== 6
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {isFormSubmitted && FormData.billing_zip.length !== 6 && (
                        <div className="invalid-feedback">
                          Please write billing zip corectly.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-3">
                  <div className="row">
                    <div className="col-lg-6">
                      <p>
                        <BsFillQuestionCircleFill className="icon" />
                        Shipping Address
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">*</small>Street
                      </label>
                      <div className="form-floating">
                        <textarea
                          className={`form-control ddd ${
                            isFormSubmitted && FormData.shiping_street === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="shiping_street"
                          value={FormData.shiping_street}
                          onChange={handleChange}
                          placeholder="Adress here...."
                          id="floatingTextarea"
                        ></textarea>
                        {isFormSubmitted && FormData.shiping_street === "" && (
                          <div className="invalid-feedback">
                            Please write shiping street.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">*</small>State
                      </label>

                      <div>
                        <select
                          name="shiping_state"
                          value={FormData.shiping_state}
                          className={`select-1 ${
                            FormData.shiping_state === "" ? "is-invalid" : ""
                          }`}
                          onChange={handleChange}
                        >
                          <option value="" disabled></option>
                          {/* Default defaultValue option */}
                          {state.map((option, i) => (
                            <option key={i} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        {isFormSubmitted && FormData.shiping_state === "" && (
                          <div className="invalid-feedback">
                            Please select a Shiping State.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">*</small>City
                      </label>
                      <div>
                        <select
                          className={`select-1 ${
                            FormData.shiping_city === "" ? "is-invalid" : ""
                          }`}
                          name="shiping_city"
                          value={FormData.shiping_city}
                          onChange={handleChange}
                        >
                          <option value="" disabled></option>
                          {shippingCity.map((option, i) => (
                            <option key={i} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        {isFormSubmitted && FormData.shiping_city === "" && (
                          <div className="invalid-feedback">
                            Please select a Shiping City.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">*</small>Zip Code
                      </label>
                      <input
                        type="number"
                        name="shiping_zip"
                        value={FormData.shiping_zip}
                        onChange={handleChange}
                        className={`form-control  ${
                          isFormSubmitted && FormData.shiping_zip.length !== 6
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {isFormSubmitted && FormData.shiping_zip.length !== 6 && (
                        <div className="invalid-feedback">
                          Please write shiping zip corectly.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-create float-end"
              variant="primary"
              type="submit"
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      <style jsx>
        {`
          .same_p {
            font-size: 11px;
            color: #b5afaf;
          }
          .ddd {
            height: 80px !important ;
          }
          .icon {
            font-size: 20px;
            margin-right: 4px;
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

export default BillModal;
