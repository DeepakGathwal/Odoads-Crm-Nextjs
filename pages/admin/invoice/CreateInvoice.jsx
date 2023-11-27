import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ModalBody, ModalFooter } from "react-bootstrap";
import { BiEdit, BiRupee } from "react-icons/bi";
import BillModal from "./billmodal";
import MaterialTable from "@material-table/core";
import AddItem from "./addItem";
import {
  createInvoiceApi,
  getAllStaffApi,
  getCustomerApi,
} from "../../../apis/apis";

const Add_Invoice = ({ show, handleClose, allData }) => {
  const Data = {
    customer: "",
    invoice_number: "",
    start_date: "",
    end_date: "",
    payment_mode: "Bank",
    currency: "INR",
    sale_agent: "",
    recurring_invoice: "",
    discount: "00.00",
    total_cycle: "0",
    admin_note: "",
    status: "",
  };
  const [finalState, setFinalstate] = useState({});
  const [billData, setBillData] = useState([]);
  const [addItem, setAdditem] = useState([]);
  const [formdata, setFormdata] = useState(Data);
  const [selectedOption, setSelectedOption] = useState("");
  const [discountPrice, setDiscountprice] = useState(0);
  const [staff, setStaff] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  const transferBillData = (FormData) => {
    setBillData(FormData);
  };

  const transferAdditem = (FormData) => {
    setAdditem(FormData);
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  // bill modal state
  const [showbill, setShowbill] = useState(false);
  const handleClosebill = () => setShowbill(false);
  const handleShow = () => {
    setShowbill(true);
  };

  //addmodal
  const [addData, setAdddata] = useState([]);
  const [totalRate, setTotalRate] = useState(0);
  const [total, setTotal] = useState(0);
  const [gstAmount, setGstamount] = useState(0);
  const [relatedData, setrelatedData] = useState([]);
  const [discountAmount, setDiscountamount] = useState(0);
  const [amount, setAmount] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const mergeAmount = () => {
    setAmount({
      ...amount,
      sub_total: totalRate,
      grand_total: total,
      gst: gstAmount,
      discount: discountAmount,
    });
  };

  useEffect(() => {
    mergeAmount();
  }, [totalRate, total, gstAmount, discountAmount]);

  const handleFormSubmit = (TableData) => {
    // Update the table data state with the new form data
    setAdddata([...addData, TableData]);
    const Gst = 18;
    const sub_total = addData.reduce(
      (sum, item) => sum + Number(item.Rate),
      Number(TableData.Rate)
    );
    const gstamount = (sub_total * Gst) / 100;
    const GrandTotal = sub_total + gstamount;
    setGstamount(gstamount);
    setTotal(GrandTotal);
    setTotalRate(sub_total);
  };

  const [showadd, setShowadd] = useState(false);
  const handleCloseadd = () => setShowadd(false);
  const handleShowadd = () => {
    setShowadd(true);
    setDiscountamount("");
    setDiscountprice(0);
  };

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  //discount
  const DiscountChange = useCallback(
    (event) => {
      const value = event.target.value;
      const newDiscountAmount = value;
      const newDiscountPrice = totalRate * (newDiscountAmount / 100);
      const newgst = Math.round(0.18 * (totalRate - newDiscountPrice));
      const newTotal = Math.round(totalRate + newgst - newDiscountPrice);
      setGstamount(newgst);
      setDiscountprice(newDiscountPrice);
      setTotal(newTotal);
      setDiscountamount(newDiscountAmount);
    },
    [total]
  );

  //marge all state
  const mergeStates = () => {
    setFinalstate({
      ...finalState,
      bill_ship: billData,
      invoice: formdata,
      amount: amount,
    });
  };

  useEffect(() => {
    mergeStates();
  }, [billData, formdata, addData, amount]);

  //create invoice api
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formdata.customer !== "" &&
      formdata.invoice_number !== "" &&
      formdata.start_date !== "" &&
      formdata.end_date !== "" &&
      formdata.sale_agent !== "" &&
      formdata.recurring_invoice !== "" &&
      formdata.status !== "" &&
      formdata.admin_note !== "" &&
      billData.length !== 0 &&
      addData.length !== 0
    ) {
      const data = await createInvoiceApi(finalState, addData);
      if (data.message === "Success") {
        allData();
        setFormdata(Data);
        handleClose();
        setIsFormSubmitted(false);
        setAdddata([]);
        setGstamount();
        setDiscountamount("");
        setDiscountprice(0);
        setTotal();
        setTotalRate(0);
      }
    } else {
      setIsFormSubmitted(true);
    }
  };

  const getUserS = async () => {
    const value = await getCustomerApi();
    setrelatedData(value);
    getStaff();
  };

  const getStaff = async () => {
    const value = await getAllStaffApi();
    setStaff(value);
  };

  useEffect(() => {
    getUserS();
  }, []);

  return (
    <>
      <addItem />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invoice</Modal.Title>
        </Modal.Header>
        <form action="" onSubmit={handleSubmit}>
          <ModalBody>
            <div className="filter" style={{ width: "56vw" }}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-12 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small>Customer
                      </label>
                      <div>
                        <select
                          className={`select-1 ${
                            isFormSubmitted && formdata.customer === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="customer"
                          value={formdata.customer}
                          onChange={handleChange}
                        >
                          <option value="" disabled selected hidden>
                            Nothing Selected
                          </option>
                          {relatedData.map((el) => {
                            return (
                              <option value={el.company}>{el.company}</option>
                            );
                          })}
                        </select>
                        {isFormSubmitted && formdata.customer === "" && (
                          <div className="invalid-feedback">
                            Please select customer.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 mt-2">
                      <small
                        className="req text-primary icon_edit"
                        onClick={handleShow}
                      >
                        <BiEdit />
                      </small>
                      <p className="bill_p">
                        {" "}
                        <small className="req text-danger">*</small>Bill to
                      </p>
                      <address>
                        <span>--</span>
                        <br />
                        <span>--</span>,<span> --</span>
                        <br />
                        <span>--</span>,<span> --</span>
                      </address>
                    </div>
                    <div className="col-lg-6 mt-4">
                      <p className="bill_p">
                        {" "}
                        <small className="req text-danger">*</small>Ship to
                      </p>
                      <address>
                        <span>--</span>
                        <br />
                        <span>--</span>,<span> --</span>
                        <br />
                        <span>--</span>,<span> --</span>
                      </address>
                    </div>
                    <div className="col-lg-12 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small>Invoice
                        Number
                      </label>
                      <div className="d-flex">
                        <span className="span_ncp">NCP-</span>
                        <input
                          type="number"
                          className={`form-control ${
                            isFormSubmitted && formdata.invoice_number === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{ borderLeft: "none!important" }}
                          placeholder="Invoice number"
                          name="invoice_number"
                          value={formdata.invoice_number}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small>Invoice Date
                      </label>
                      <input
                        type="date"
                        id="start_date"
                        min={new Date().toISOString().split("T")[0]}
                        name="start_date"
                        className={`form-control ${
                          isFormSubmitted && formdata.start_date === ""
                            ? "is-invalid"
                            : ""
                        }`}
                        autoComplete="off"
                        aria-invalid="false"
                        value={formdata.start_date}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-6 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small>Due Date
                      </label>
                      <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        min={formdata.start_date}
                        className={`form-control ${
                          isFormSubmitted && formdata.end_date === ""
                            ? "is-invalid"
                            : ""
                        }`}
                        autoComplete="off"
                        aria-invalid="false"
                        value={formdata.end_date}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-2">
                  <div className="row">
                    <div className="col-lg-12">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small> Allowed
                        payment modes for this invoice
                      </label>
                      <div>
                        <select
                          className="select-1"
                          name="payment_mode"
                          value={formdata.payment_mode}
                          onChange={handleChange}
                          disabled={true}
                        >
                          <option value="Bank">Bank</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small>Currency
                      </label>
                      <div>
                        <select
                          className="select-1"
                          name="currency"
                          value={formdata.currency}
                          onChange={handleChange}
                          disabled={true}
                        >
                          <option value="INR">INR</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small> Sale Agent
                      </label>
                      <div>
                        <select
                          className={`select-1 ${
                            isFormSubmitted && formdata.sale_agent === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="sale_agent"
                          value={formdata.sale_agent}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Nothing Selected
                          </option>
                          {staff.map((el) => (
                            <option value={el.firstname}>{el.firstname}</option>
                          ))}
                        </select>
                        {isFormSubmitted && formdata.sale_agent === "" && (
                          <div className="invalid-feedback">Please select.</div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small> Recurring
                        Invoice?
                      </label>
                      <div>
                        <select
                          className={`select-1 ${
                            isFormSubmitted && formdata.recurring_invoice === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="recurring_invoice"
                          value={formdata.recurring_invoice}
                          onChange={handleChange}
                        >
                          <option value="" disabled selected hidden>
                            Nothing Selected
                          </option>
                          <option value="" disabled>
                            No
                          </option>
                          <option value="1">Every 1 Month</option>
                          <option value="6">Every 6 Month</option>
                          <option value="12">Every 12 Month</option>
                        </select>
                        {isFormSubmitted &&
                          formdata.recurring_invoice === "" && (
                            <div className="invalid-feedback">
                              Please select.
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-lg-6 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small> Status
                      </label>
                      <select
                        className={`select-1 ${
                          isFormSubmitted && formdata.status === ""
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formdata.status}
                        onChange={handleChange}
                        name="status"
                      >
                        <option value="New">New</option>
                        <option value="Processing">In Progress</option>
                        <option value="Hold">On Hold</option>
                        <option value="Trashed">Cancelled</option>
                        <option value="Completed">Finished</option>
                        <option value="OPEN">OPEN</option>
                      </select>
                      {isFormSubmitted && formdata.status === "" && (
                        <div className="invalid-feedback">Please select.</div>
                      )}
                    </div>
                    <div className="col-lg-12 mt-2">
                      <label htmlFor="" className="control-label">
                        Total Cycles
                      </label>
                      <div className="d-flex">
                        <input
                          type="number"
                          name="total_cycle"
                          className="form-control"
                          value={formdata.total_cycle}
                          onChange={handleChange}
                          style={{ borderLeft: "none!important" }}
                          // disabled={isChecked}
                        />
                        {/* <span className="span_infinity d-flex">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                          infinity
                        </span> */}
                      </div>
                    </div>
                    <div className="col-lg-12 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small>Admin Note
                      </label>
                      <textarea
                        id=""
                        name="admin_note"
                        value={formdata.admin_note}
                        className={`form-control ddd ${
                          isFormSubmitted && formdata.admin_note === ""
                            ? "is-invalid"
                            : ""
                        }`}
                        rows="8"
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="">
                <div className="row">
                  <div className="col-lg-12">
                    <button
                      className={`btn btn-create ${
                        isFormSubmitted && addData.length == 0
                          ? "is-invalid"
                          : ""
                      }`}
                      type="button"
                      onClick={handleShowadd}
                    >
                      <small className="req text-danger">*</small> Add Item
                    </button>
                    {isFormSubmitted && addData.length == 0 && (
                      <div className="invalid-feedback">
                        Please add atleast 1 item
                      </div>
                    )}
                  </div>
                  <div className="col-lg-12">
                    <MaterialTable
                      columns={[
                        {
                          title: "Item",
                          field: "Item",
                          cellStyle: { color: "#412cd3", fontSize: "11.5px" },
                        },
                        {
                          title: "Description",
                          field: "Description",
                          cellStyle: { fontSize: "11.5px" },
                        },
                        {
                          title: "Qty",
                          field: "Qty",
                          cellStyle: { fontSize: "11.5px" },
                        },
                        {
                          title: "Rate",
                          field: "Rate",
                          cellStyle: { fontSize: "11.5px" },
                        },
                        {
                          title: "Tax1",
                          field: "Tax1",
                          cellStyle: { color: "#412cd3", fontSize: "11.5px" },
                        },
                        {
                          title: "Amount",
                          field: "Amount",
                          cellStyle: { fontSize: "11.5px" },
                        },
                      ]}
                      data={addData}
                      options={{
                        sorting: true,
                        search: true,
                        headerStyle: {
                          backgroundColor: "#f6f8fa",
                          color: "#4e75ad",
                        },
                      }}
                      title="ALL ITEM"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <table className="table amount_table mt-5">
                    <tbody>
                      <tr>
                        <td>Sub Total</td>
                        <td>:</td>
                        <td className="d-flex">
                          <BiRupee />
                          {parseInt(totalRate)}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Discount</td>
                        <td className="d-flex">
                          <select
                            disabled={selectedOption === "0"}
                            className="select-1 "
                            value={discountAmount}
                            onChange={DiscountChange}
                          >
                            <option value=""></option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                          </select>
                          <select
                            className="select-1 "
                            style={{ width: "10px" }}
                            value={selectedOption}
                            onChange={handleDropdownChange}
                          >
                            <option value="" disabled></option>
                            <option value="percentage">Discount %</option>
                            <option value="0">fiexd Amount</option>
                          </select>
                        </td>
                        <td>
                          <BiRupee />
                          {parseInt(discountPrice)}
                          {isFormSubmitted && discountPrice === 0 && (
                            <div style={{ fontSize: ".6rem", color: "red" }}>
                              select discount
                            </div>
                          )}
                        </td>
                      </tr>

                      {total > 0 && (
                        <tr>
                          <td></td>
                          <td className="fw-bold">Incluid GST 18% :</td>
                          <td className="d-flex">
                            <BiRupee />
                            {parseInt(gstAmount)}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td></td>
                        <td className="fw-bold">Total :</td>
                        <td className="d-flex">
                          <BiRupee />
                          {total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-create" type="submit">
              Save & Email
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      <BillModal
        showbill={showbill}
        handleClosebill={handleClosebill}
        onTransferData={transferBillData}
      />
      <AddItem
        showadd={showadd}
        handleCloseadd={handleCloseadd}
        onFormSubmit={handleFormSubmit}
        transferAdditem={transferAdditem}
      />
      <style jsx>
        {`
          .container {
            padding: 0px !important;
          }
          .btn-create {
            width: 10vw;
          }
          .customer_status {
            background: #e4e8f1;
            color: #48576a;
            margin-bottom: 0;
            font-size: 12px;
            font-style: normal;
          }
          .select-1 {
            width: 100% !important;
          }
          .ddd {
            height: 80px !important ;
          }
          .bill_p {
            margin-bottom: 0px;
            font-size: 12px;
            font-weight: 500;
          }
          .span_ncp {
            background-color: #fbfdff;
            color: #97a8be;
            padding: 6px 12px;
            font-size: 14px;
            font-weight: 400;
            border: 1px solid #ccc;
            border-radius: 4px;
            line-height: 1;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .span_infinity {
            background-color: #fbfdff;
            color: black;
            padding: 6px 12px;
            font-size: 14px;
            font-weight: 400;
            border: 1px solid #ccc;
            border-radius: 4px;
            line-height: 1;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            justify-content: center;
            align-items: center;
          }
          .span_infinity input {
            margin-right: 4px;
          }
          .icon_edit {
            font-size: 14px !important;
            margin-right: 4px !important;
            cursor: pointer;
          }
          .btn_bank {
            text-align: left;
            background-color: white !important;
            padding: 7px !important;
          }
          .btn_bank span {
            float: right;
          }
          .bank_div {
            padding: 5px;
            box-shadow: 0 1px 7px 2px rgba(135, 158, 171, 0.2);
          }
          .select_btn {
            background-color: white;
            color: black;
            font-size: 12px !important;
          }
          .amount_table {
            width: 40%;
            float: right;
            font-size: 12px;
          }
          .discount_input {
            height: 28px !important;
          }
          .dis_drop {
            width: 30% !important;
            padding: 0px !important;
            height: 28px !important;
            color: #526dce !important;
          }
        `}
      </style>
    </>
  );
};

export default Add_Invoice;
