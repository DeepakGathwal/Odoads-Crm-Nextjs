import React from "react";
import Header from "../../components/static-header";
import Footer from "@/components/footer";
const PrivacyPolicy = () => {
  return (
    <>
      <Header
        url="../../imgs/business-people.jpg"
        lead1="Privacy Policy"
        lead=""
        lead2=""
      />
      <main className="main-content">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-xl-12 mr-md-auto pt-8 pb-8">
              <article>
                <br />
                <p>
                  At odoads, accessible from https://odoads.com, one of our main
                  priorities is the privacy of our visitors. This Privacy Policy
                  document contains types of information that is collected and
                  recorded by odoads and how we use it.
                </p>
                <p>
                  If you have additional questions or require more information
                  about our Privacy Policy, do not hesitate to contact us
                  through email at notification@odoads.com
                </p>
                <h6 id="extended-license" data-provide="anchor">
                  Log Files<a className="anchor" href="#extended-license"></a>
                </h6>
                <p>
                  odoads follows a standard procedure of using log files. These
                  files log visitors when they visit websites. All hosting
                  companies do this and a part of hosting services' analytics.
                  The information collected by log files include internet
                  protocol (IP) addresses, browser type, Internet Service
                  Provider (ISP), date and time stamp, referring/exit pages, and
                  possibly the number of clicks. These are not linked to any
                  information that is personally identifiable. The purpose of
                  the information is for analyzing trends, administering the
                  site, tracking users' movement on the website, and gathering
                  demographic information.
                </p>
                <h6 id="extended-license" data-provide="anchor">
                  Cookies and Web Beacons
                  <a className="anchor" href="#extended-license"></a>
                </h6>
                <p>
                  Like any other website, odoads uses 'cookies'. These cookies
                  are used to store information including visitors' preferences,
                  and the pages on the website that the visitor accessed or
                  visited. The information is used to optimize the users'
                  experience by customizing our web page content based on
                  visitors' browser type and/or other information.
                </p>
                <h6 id="extended-license" data-provide="anchor">
                  Privacy Policies
                  <a className="anchor" href="#extended-license"></a>
                </h6>
                <p>
                  You may consult this list to find the Privacy Policy for each
                  of the advertising partners of odoads. Our Privacy Policy was
                  created with the help of the Privacy Policy Generator.
                </p>
                <p>
                  Third-party ad servers or ad networks use technologies like
                  cookies, JavaScript, or Web Beacons that are used in their
                  respective advertisements and links that appear on odoads,
                  which are sent directly to users' browser. They automatically
                  receive your IP address when this occurs. These technologies
                  are used to measure the effectiveness of their advertising
                  campaigns and/or to personalize the advertising content that
                  you see on websites that you visit.
                </p>
                <p>
                  Note that odoads has no access to or control over these
                  cookies that are used by third-party advertisers.
                </p>
                <h6 id="extended-license" data-provide="anchor">
                  Third Party Privacy Policies
                  <a className="anchor" href="#extended-license"></a>
                </h6>
                <p>
                  odoads's Privacy Policy does not apply to other advertisers or
                  websites. Thus, we are advising you to consult the respective
                  Privacy Policies of these third-party ad servers for more
                  detailed information. It may include their practices and
                  instructions about how to opt-out of certain options. You may
                  find a complete list of these Privacy Policies and their links
                  here: Privacy Policy Links.
                </p>
                <p>
                  You can choose to disable cookies through your individual
                  browser options. To know more detailed information about
                  cookie management with specific web browsers, it can be found
                  at the browsers' respective websites. What Are Cookies?
                </p>
                <h6 id="extended-license" data-provide="anchor">
                  Children's Information
                  <a className="anchor" href="#extended-license"></a>
                </h6>
                <p>
                  Another part of our priority is adding protection for children
                  while using the internet. We encourage parents and guardians
                  to observe, participate in, and/or monitor and guide their
                  online activity.
                </p>
                <p>
                  odoads does not knowingly collect any Personal Identifiable
                  Information from children under the age of 13. If you think
                  that your child provided this kind of information on our
                  website, we strongly encourage you to contact us immediately
                  and we will do our best efforts to promptly remove such
                  information from our records
                </p>
                <h6 id="extended-license" data-provide="anchor">
                  Online Privacy Policy Only
                  <a className="anchor" href="#extended-license"></a>
                </h6>
                <p>
                  This Privacy Policy applies only to our online activities and
                  is valid for visitors to our website with regards to the
                  information that they shared and/or collect in odoads. This
                  policy is not applicable to any information collected offline
                  or via channels other than this website.
                </p>
                <h6 id="extended-license" data-provide="anchor">
                  Consent<a className="anchor" href="#extended-license"></a>
                </h6>
                <p>
                  By using our website, you hereby consent to our Privacy Policy
                  and agree to its Terms and Conditions.
                </p>
              </article>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .main-content {
              margin: 0;
              font-family: "Open Sans", sans-serif;
              font-size: 0.8.8rem;
              font-weight: 300;
              line-height: 1.6;

              text-align: left;
              background-color: #fff;
            }
            p {
              font-size: 0.8rem;
              color: #757575;
            }
          `}
        </style>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
