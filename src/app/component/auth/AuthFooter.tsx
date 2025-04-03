import React from 'react'
import Image from 'next/image'
import callImage from '../../../../assets/img/icon/f_call.svg'
import emailImage from '../../../../assets/img/icon/f_mail.svg'


const AuthFooter = () => {
  return (
    <footer className="site-footer gray-bg pt-65">
      <div className="container">
        <div className="row mt-none-30 pb-60">
          <div className="col-lg-3 mt-30 col-md-6 footer__custom-col">
            <div className="footer__widget">
              <h3 className="widget-title">Do you have questions or went more information? Contact us now</h3>
              <ul className="footer__cta list-unstyled mt-50">
                <li className="ul_li"><span><Image src={callImage} alt=""/></span>+91590 088 55
                </li>
                <li className="ul_li"><span><Image src={emailImage}alt=""/></span>e.visa@gmail.com
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 mt-30 col-md-6 footer__custom-col">
            <div className="footer__widget">
              <h3 className="widget-title">Explore Link</h3>
              <ul className="footer__links list-unstyled">
                <li><a href="#!"><span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                  viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                    fill="#B1B4BA" />
                </svg></span>About Us</a></li>
                <li><a href="#!"><span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                  viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                    fill="#B1B4BA" />
                </svg></span>Blog</a></li>
                <li><a href="#!"><span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                  viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                    fill="#B1B4BA" />
                </svg></span>Testimonials</a></li>
                <li><a href="#!"><span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                  viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                    fill="#B1B4BA" />
                </svg></span>Terms & Conditions</a></li>
                <li><a href="#!"><span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                  viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                    fill="#B1B4BA" />
                </svg></span>Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 mt-30 col-md-6 footer__custom-col">
            <div className="footer__widget">
              <h3 className="widget-title">Services</h3>
              <ul className="footer__links list-unstyled">
                <li><a href="#!"><span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                  viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                    fill="#B1B4BA" />
                </svg></span>Tourist Visa</a></li>
                <li><a href="#!"><span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                  viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                    fill="#B1B4BA" />
                </svg></span>Commercial Visa</a></li>
                <li><a href="#!"><span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                  viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                    fill="#B1B4BA" />
                </svg></span>Student Visa</a></li>
                <li><a href="#!"><span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                  viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                    fill="#B1B4BA" />
                </svg></span>Residence Visa</a></li>
                <li><a href="#!"><span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                  viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                    fill="#B1B4BA" />
                </svg></span>Working Visa</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 mt-30 col-md-6 footer__custom-col">
            <div className="footer__widget">
              <h3 className="widget-title">Our branches</h3>
              <ul className="footer__links list-unstyled">
                <li><a href="#!"><span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                  viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                    fill="#B1B4BA" />
                </svg></span>Canada</a></li>
                <li><a href="#!"><span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                  viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                    fill="#B1B4BA" />
                </svg></span>Coimbatore</a></li>
                <li><a href="#!"><span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                  viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                    fill="#B1B4BA" />
                </svg></span>Tirunelveli</a></li>
                <li><a href="#!"><span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                  viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                    fill="#B1B4BA" />
                </svg></span>Germany</a></li>
                <li><a href="#!"><span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                  viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                    fill="#B1B4BA" />
                </svg></span>Chennai</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__copyright ">
          <div className="footer__copyright-text mt-15 text-center">
            Copyright © 2024 Volunteer-match All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default AuthFooter