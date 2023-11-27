import React from "react";
import { CiMobile2, CiSettings } from "react-icons/ci";
import { TbTools } from "react-icons/tb";
import { BsRecycle, BsChat, BsLayers } from "react-icons/bs";

const Section1 = () => {
  const data = [
    {
      icon: <CiMobile2 className="icon_homepage" />,
      heading: " Media Inventory",
      contant: `Dedicated CRM for OOH Industry to manage media assets,
    generation of plan PPT/ Excel/ PDF including sites
    information, rates, availability, images with live Google
    map and Google earth plotting.`,
    },
    {
      icon: (
        <CiSettings className="icon_homepage" style={{ color: "#50a1ff" }} />
      ),
      heading: " Campaigns Management",
      contant: `Booking, blocking, FOC and rotational information of campaigns.
   Cost sheet, campaign profitability, site performance, PO management.`,
    },
    {
      icon: <TbTools className="icon_homepage" style={{ color: "#926dde" }} />,
      heading: "Leads / Media Request",
      contant: `This enables marketing and sales teams to work 
  together on the leads, never missing out any interaction or touch-points..`,
    },
    {
      icon: <BsLayers className="icon_homepage" style={{ color: "#ffba00" }} />,
      heading: "Invoice & Contracts",
      contant: `Estimations, invoicing, credit notes, payments, revenue, outstanding, contracts.`,
    },
    {
      icon: (
        <BsRecycle className="icon_homepage" style={{ color: "#ff4954" }} />
      ),
      heading: "Business Intelligence",
      contant: `Dashboards to track your business growth with 150+ custom reports.`,
    },
    {
      icon: <BsChat className="icon_homepage" style={{ color: "#3cd458" }} />,
      heading: "Customer Management",
      contant: `Managing customer and their contact information, Customer interaction history,
   Sending the documents directly from the program and many more.`,
    },
  ];
  return (
    <div className="container-xxl   container-xl container-lg container-md  ps-5 pe-5">
      <section className="section pb-0">
        <div className="">
          <header className="section-header text-center">
            <small>Welcome</small>
            <h2>Get a Better Understanding</h2>
            <hr style={{ borderTopColor: "#919191"}}  className="my-3"/>
            <p className="lead2">
              Holisticly implement fully tested process improvements rather than
              dynamic internal.
            </p>
          </header>
          <div className="row gap-y">
            <div
              className="col-md-8 mx-auto my-5"
              style={{textAlign: "center" }}
            >
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/_tAziy85tX0?controls=0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen=""
              ></iframe>
            </div>
            <div className="w-100"></div>
            {data.map((items, index) => (
              <div className="col-md-6 col-xl-4" key={index}>
                <div className="media my-2">
                  <div>{items.icon}</div>
                  <div className="media-body">
                    <h5 className="lead2"> {items.heading}</h5>
                    <p>{items.contant}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Rest of the code */}
          </div>
        </div>
      </section>
      <style jsx>
        {`
          h2 {
            font-size: 2.10938rem;
            font-family: Dosis, sans-serif;
          }
          .lead2 {
            font-weight: 400;
            color: #757575 !important;
            line-height: 1.4;
            font-size: 1.23047rem;
            letter-spacing: 0.5px;
            font-family: Dosis, sans-serif;
          }
          p {
            font-family: "Open Sans", sans-serif;
            font-size: 0.9375rem;
            font-weight: 300;
            line-height: 1.9;
            color: #757575;
          }
          .icon {
            font-size: 2rem;
          }
        `}
      </style>
    </div>
  );
};

export default Section1;
