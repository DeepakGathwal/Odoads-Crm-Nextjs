import React from "react";
import Review from "../customer-review";

const Section3 = () => {

  return (
    <>
      <section className="section  bg-gray " style={{backgroundColor:"#FAFBFB"}}>
        <div className="container">

     
   
          <header className="section-header  text-center " >
            <small>Testimonials</small>
            <h2>Happy Customers</h2>

            <p >
              Join thousands of satisfied customers using our software globally.
            </p>
          </header>
         <Review/>
         </div>
      </section>

      <style jsx>
        {
          `
          h2{
            font-size: 1.5rem;
            font-weight: 400;
          }
          `
        }

      </style>
    </>
  );
};
export default Section3;
