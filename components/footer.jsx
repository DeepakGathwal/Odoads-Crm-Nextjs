import React from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container pb-3 pt-3">
        <div className="row gap-y align-items-center">
          <div className="col-6 col-lg-8">
            <p style={{ margin: 0 }}>
              © {new Date().getFullYear()} Odoads by{" "}
              <Link href="https://www.gohoardings.com">Gohoardings</Link>, All
              rights reserved.
            </p>
            <Link href="/disclaimer" style={{ fontSize: "10px" }}>
              Disclaimer
            </Link>{" "}
            |{" "}
            <Link href="/privacy-policy" style={{ fontSize: "10px" }}>
              Privacy Policy
            </Link>
          </div>

          <div className="col-6 col-lg-4 text-end ">
            <div className="social">
              <Link href="https://www.facebook.com/odoads" target="_blank" className="p-2">
                <FaFacebookF style={{fontSize:"13px",color:"#A9AAAE"}}  />
              </Link>
              <Link
                href="https://www.linkedin.com/company/odoads"
                target="_blank"
        
                className="p-2"
              >
                <FaLinkedinIn  style={{fontSize:"15px",color:"#A9AAAE"}}  />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .footer {
            margin: 0;
            font-family: "Open Sans", sans-serif;
            font-size: 0.9375rem;
            font-weight: 300;
            line-height: 1.5;
            color: #757575;
            background-color: #fff;
          }

          
        `}
      </style>
    </footer>
  );
};

export default Footer;
