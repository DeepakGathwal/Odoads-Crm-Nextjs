import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ModalBody, ModalFooter } from "react-bootstrap";
import { BiEdit, BiRupee } from "react-icons/bi";
import MaterialTable from "@material-table/core";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  getAllStaffApi,
  getCustomerApi,
  invoicesItemApi,
  updateInvoice,
} from "../../../apis/apis";
import Edit_BillModal from "./editBill";
import EditItem from "./editItem";

const Update_invoice = ({ show, handleClose, allData, selectRow }) => {
  const [finalState, setFinalstate] = useState({});
  const [singleItem, setsSingleItem] = useState(null);
  const [billData, setBillData] = useState([]);
  const [formdata, setFormdata] = useState(selectRow);
  const [selectedOption, setSelectedOption] = useState("");
  const [discountPrice, setDiscountprice] = useState(0);
  const [staff, setStaff] = useState([]);
  const [addData, setAdddata] = useState([]);
  const [totalRate, setTotalRate] = useState(0);
  const [total, setTotal] = useState(0);
  const [gstAmount, setGstamount] = useState(0);
  const [relatedData, setrelatedData] = useState([]);
  const [discountAmount, setDiscountamount] = useState(0);
  const [amount, setAmount] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const [showe, setShowe] = useState(false);
  const handleClosee = () => {
    setShowe(false);
    setsSingleItem([]);
  };
  const handleShowe = () => setShowe(true);

  const transferBillData = (FormData) => {
    setBillData(FormData);
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // bill modal
  const [showbill, setShowbill] = useState(false);
  const handleClosebill = () => setShowbill(false);
  const handleShow = () => {
    setShowbill(true);
  };

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

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const allItems = async () => {
    const getId = formdata.id;
    const data = await invoicesItemApi(getId);
    setAdddata(data);
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
      invoice: formdata,
      amount: amount,
    });
  };

  useEffect(() => {
    mergeStates();
  }, [billData, formdata, addData, amount]);

  //update invoice api
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await updateInvoice(finalState)
   if(data.message == "Success"){
     allData();
   
     handleClose();

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
    allItems();
  };

  useEffect(() => {
    getUserS();
  }, [formdata]);

  return (
    <>
      <addItem />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Invoice</Modal.Title>
        </Modal.Header>
        {formdata && (
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
                            className="select-1"
                            name="customer"
                            value={formdata.name}
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
                        </div>
                      </div>
                      <div className="col-lg-6 mt-2">
                        <small
                          className="req text-primary icon_edit"
                          onClick={handleShow}
                        >
                          <BiEdit />
                        </small>
                        <p className="bill_p">Bill to</p>
                        <address>
                          <span>--</span>
                          <br />
                          <span>--</span>,<span> --</span>
                          <br />
                          <span>--</span>,<span> --</span>
                        </address>
                      </div>
                      <div className="col-lg-6 mt-4">
                        <p className="bill_p">Ship to</p>
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
                            className="form-control"
                            style={{ borderLeft: "none!important" }}
                            placeholder="Invoice number"
                            name="number"
                            value={formdata.number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mt-2">
                        <label htmlFor="" className="control-label">
                          <small className="req text-danger">*</small>Invoice
                          Date
                        </label>
                        <input
                          type="date"
                          id="start_date"
                          name="date"
                          className="form-control"
                          autoComplete="off"
                          aria-invalid="false"
                          value={formdata.date}
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
                          name="duedate"
                          className="form-control"
                          autoComplete="off"
                          aria-invalid="false"
                          value={formdata.duedate}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-lg-12 mt-2">
                        <input type="checkbox" disabled={true} />
                        <label className="ms-2 text-center" htmlFor="">
                          Prevent sending overdue reminders for this invoice
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mt-2">
                    <div className="row">
                      <div className="col-lg-12">
                        <label htmlFor="" className="control-label">
                          Allowed payment modes for this invoice
                        </label>
                        <div>
                          <select
                            className="select-1"
                            name="payment_mode"
                            value={formdata.payment_mode}
                            onChange={handleChange}
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
                          >
                            <option value="INR">INR</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 mt-2">
                        <label htmlFor="" className="control-label">
                          Sale Agent
                        </label>
                        <div>
                          <select
                            className="select-1"
                            name="sale_agent"
                            value={formdata.sale_agent}
                            onChange={handleChange}
                          >
                            <option value="" disabled>
                              Nothing Selected
                            </option>
                            {staff.map((el) => (
                              <option value={el.firstname}>
                                {el.firstname}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 mt-2">
                        <label htmlFor="" className="control-label">
                          Recurring Invoice?
                        </label>
                        <div>
                          <select
                            className="select-1"
                            name="recurring"
                            value={
                              formdata.recurring 
                            }
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
                        </div>
                      </div>
                      <div className="col-lg-6 mt-2">
                        <label htmlFor="" className="control-label">
                          Status
                        </label>
                        <select
                          className={`select-1`}
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
                      </div>
                      <div className="col-lg-12 mt-2">
                        <label htmlFor="" className="control-label">
                          Total Cycles
                        </label>
                        <div className="d-flex">
                          <input
                            type="number"
                            name="total_cycles"
                            className="form-control"
                            value={formdata.total_cycles}
                            onChange={handleChange}
                            style={{ borderLeft: "none!important" }}
                          />
                          <span className="span_infinity d-flex">
                            <input
                              type="checkbox"
                              disabled={true}
                              onChange={handleCheckboxChange}
                            />
                            infinity
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-12 mt-2">
                        <label htmlFor="" className="control-label">
                          Admin Note
                        </label>
                        <textarea
                          id=""
                          name="adminnote"
                          value={formdata.adminnote}
                          className="form-control ddd"
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
                      <MaterialTable
                        columns={[
                          {
                            title: "Item",
                            field: "description",
                            cellStyle: { color: "#412cd3", fontSize: "11.5px" },
                          },
                          {
                            title: "Description",
                            field: "long_description",
                            cellStyle: { fontSize: "11.5px" },
                          },
                          {
                            title: "Qty",
                            field: "qty",
                            cellStyle: { fontSize: "11.5px" },
                          },
                          {
                            title: "Rate",
                            field: "rate",
                            cellStyle: { fontSize: "11.5px" },
                          },
                          {
                            title: "Tax",
                            field: "taxname",
                            cellStyle: { color: "#412cd3", fontSize: "11.5px" },
                          },
                          {
                            title: "Unit",
                            field: "unit",
                            cellStyle: { fontSize: "11.5px" },
                          },
                          {
                            title: "All Actions",
                            render: (rowData) => (
                              <div>
                                <IconButton
                                  aria-label="edit"
                                  onClick={() => {
                                    // Handle edit action here
                                    setsSingleItem(rowData);
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
                                    const confirmed =
                                      window.confirm("Are you sure?");

                                    // Check if the user clicked "Confirm"
                                    if (confirmed) {
                                      // Call the deleteMedia()
                                      // allData();
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
                        data={addData}
                        options={{
                          sorting: true,
                          search: true,
                          whiteSpace: "nowrap", // Prevents text from wrapping
                          overflow: "hidden", // Hides any overflowing text
                          textOverflow: "ellipsis", // Truncates the text with an ellipsi
                          headerStyle: {
                            backgroundColor: "#f6f8fa",
                            color: "#4e75ad",
                            whiteSpace: "nowrap", // Prevents text from wrapping
                            overflow: "hidden", // Hides any overflowing text
                            textOverflow: "ellipsis", // Truncates the text with an ellipsi
                          },
                        }}
                        title="ALL ITEMS"
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
                          <td>
                          <input
                            type="number"
                            name="subTotal"
                            className="form-control"
                            value={formdata.subTotal}
                            onChange={handleChange}
                            style={{ borderLeft: "none!important" }}
                          />
                          </td>

                          <td className="d-flex">
                            <BiRupee />
                            {totalRate}
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Discount</td>
                          <td className="d-flex">
                            {/* <input disabled={selectedOption === "fixed_amount"} value={discountAmount} onChange={DiscountChange} type="number" className="form-control discount_input" /> */}
                            <select
                              disabled={selectedOption === "fixed_amount"}
                              className="select-1"
                              name="discount_total"
                              value={formdata.discount_total}
                              onChange={DiscountChange}
                            >
                              <option value=""></option>
                              <option value="10">10</option>
                              <option value="20">20</option>
                            </select>
                            <select
                              className="select-1 dis_drop"
                              value={selectedOption}
                              onChange={handleDropdownChange}
                            >
                              <option value="" disabled selected hidden>
                                %
                              </option>
                              <option value="percentage">%</option>
                              <option value="fixed_amount">fiexd Amount</option>
                            </select>
                          </td>
                          <td>
                            <BiRupee />
                            {discountPrice}
                          </td>
                        </tr>

                        {total > 0 && (
                          <tr>
                            <td></td>
                            <td className="fw-bold">Incluid GST 18% :</td>
                            <td> <input
                            type="number"
                            name="total"
                            className="form-control"
                            value={formdata.total}
                            onChange={handleChange}
                         
                          /></td>
                            <td className="d-flex">
                              <BiRupee />
                              {gstAmount}
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
        )}
      </Modal>

      {selectRow && (
        <Edit_BillModal
          showbill={showbill}
          handleClosebill={handleClosebill}
          onTransferData={transferBillData}
          selectRow={selectRow}
        />
      )}
      {singleItem && (
        <EditItem
          handleClosee={handleClosee}
          singleItem={singleItem}
          showe={showe}
        />
      )}
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

export default Update_invoice;
