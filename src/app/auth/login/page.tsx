"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import npadImage from '../../../../assets/img/icon/n_pad.svg';
import emailImage from '../../../../assets/img/icon/c_mail.svg';
import callImage from '../../../../assets/img/icon/c_call.svg';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
import './login.scss';
import { useRouter } from 'next/navigation';
import { setCookie } from '@/utils/cookieUtils';
import { ACCESS_TOKEN } from '@/utils/enums/misc';
import { errorNotification, successNotification } from '@/app/component/Notification/ToastNotification';


async function signInAPI(formData: any) {
  const response = await fetch('http://localhost:3005/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Sign-in failed');
  }
  return await response.json();
}

async function userSignInAPI(formData: any) {
  const response = await fetch('http://localhost:3005/api/user-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Sign-in failed');
  }
  return await response.json();
}


const page = () => {
  
    const router = useRouter()
  

  const [captchaValue, setCaptchaValue] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'volunteer',
  });

  const handleCaptchaChange = (value: any) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // if (!captchaValue) {
    //   alert('Please complete the CAPTCHA!');
    //   return;
    // }

  
      try {
        let response;
        if (formData.userType === "organization") {
          response = await signInAPI(formData);
          console.log("data", response)
          if (response.data.statusCode === 200) {
            successNotification(response.data.message)
            setCookie(ACCESS_TOKEN, response.data.token);
            router.push("/");
          }
        } else {
          console.log("data", response)

          response = await userSignInAPI(formData);
          if (response.data.statusCode === 200) {
            successNotification(response.data.message)
            setCookie(ACCESS_TOKEN, response.data.token);
            router.push("/");
          }
        }
  
        console.log("API response", response);
    } catch (error:any) {
      console.error('Error during login', error);
                  errorNotification(error)
      
    }
  };

  const responseGoogle = (response: any) => {
    console.log('Google login success:', response);
  };

  const responseGoogleError = () => {
    console.log('Google login error occurred');
  };

  const responseFacebook = (response: any) => {
    console.log('Facebook login success:', response);
  };

  const responseFacebookError = (error: any) => {
    console.log('Facebook login error:', error);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <section className="contact pt-5 gray-bg" id="login">
        <div className="container">
          <div className="xb-contact pos-rel max-w-500 mx-auto">
            <div className="row">
              <div className="col-lg-12 ">
                <div className="xb-item--inner p-0">
                  <div className="xb-item--holder pb-4 pt-5 px-10 text-center">
                    <span className="d-flex align-items-center justify-content-center mb-0 fs-25">
                      <Image src={npadImage} alt="" />Login
                    </span>
                  </div>
                  <form
                    className="xb-item--form contact-from pb-5 px-10"
                    action="#!"
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-lg-12 text-center pb-4">Login As</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 ">
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <div
                            className={`rounded fs-15 rounded-4 px-3 cursor-pointer text-center ${
                              formData.userType === 'volunteer'
                                ? 'border-primary-1px text-primary'
                                : 'border'
                            }`}
                            onClick={() =>
                              setFormData({ ...formData, userType: 'volunteer' })
                            }
                          >
                            Volunteer
                          </div>
                          <div
                            className={`rounded fs-15 rounded-4 px-3 cursor-pointer text-center ms-2 ${
                              formData.userType === 'organization'
                                ? 'border-primary-1px text-primary'
                                : 'border'
                            }`}
                            onClick={() =>
                              setFormData({ ...formData, userType: 'organization' })
                            }
                          >
                            Organization
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="xb-item--field">
                          <span>
                            <Image src={emailImage} alt="" />
                          </span>
                          <input
                            type="text"
                            placeholder="Enter Your Email"
                            required
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="xb-item--field">
                          <span>
                            <Image src={callImage} alt="" />
                          </span>
                          <input
                            type="password"
                            placeholder="Enter Your Password"
                            required
                            onChange={(e) => {
                              setFormData({ ...formData, password: e.target.value });
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 goole-col">
                        <div className="xb-item--field mb-3 border rounded">
                          <GoogleLogin
                            width={'100%'}
                            onSuccess={responseGoogle}
                            onError={responseGoogleError}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 ">
                        <div className="">
                          <FacebookLogin
                            appId="YOUR_FACEBOOK_APP_ID"
                            fields="name,email,picture"
                            callback={responseFacebook}
                            cssClass="rounded border px-3 py-3 w-100 h-100 bg-transparent"
                            onFailure={responseFacebookError}
                            icon="fa-facebook"
                          />
                        </div>
                      </div>

                      <div className="col-12 d-flex justify-content-end mt-1">
                        <Link href={"/auth/forgot-password"}>Forgot Password ?</Link>
                      </div>

                      <div className="col-12 mt-4 d-flex justify-content-center">
                        <ReCAPTCHA
                          sitekey="YOUR_GOOGLE_RECAPTCHA_SITE_KEY"
                          onChange={handleCaptchaChange}
                        />
                      </div>

                      <Link href="/auth/sign-up" className="text-center mt-3">
                        Register
                      </Link>
                      <div className="col-12 text-center mt-4">
                        <button className="thm-btn px-7 py-3 fs-17" type="submit">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </GoogleOAuthProvider>
  );
};

export default page;
