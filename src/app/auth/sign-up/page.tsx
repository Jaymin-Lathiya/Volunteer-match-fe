"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import npadImage from '../../../../assets/img/icon/n_pad.svg'
import emailImage from '../../../../assets/img/icon/c_mail.svg'
import callImage from '../../../../assets/img/icon/c_call.svg'
import cSelect from '../../../../assets/img/icon/c_select.svg'
import './sign-up.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { errorNotification, successNotification } from '@/app/component/Notification/ToastNotification'

async function signInAPI(formData: any) {
  const response = await fetch('http://localhost:3005/api/signup', {
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
  const response = await fetch('http://localhost:3005/api/user-signup', {
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

  const [userType, setUserType] = useState("volunteer")

  const [formData, setFormData] = useState({
    orgName: "",
    orgType: "",
    website: "",
    mobileNumber: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    userType: userType
  })

  const [volunteerformData, setVolunteerFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    userType: userType
  })

  const [formErrors, setFormErrors] = useState({
    orgName: "",
    orgType: "",
    website: "",
    mobileNumber: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    volunteerEmail: "",
    volunteerPassword: "",
    volunteerConfirmPassword: ""
  });

  const validateField = (field: string, value: string) => {
    let errorMessage = "";
    switch (field) {
      case 'orgName':
        if (!value) errorMessage = "Organization name is required";
        break;
      case 'orgType':
        if (!value) errorMessage = "Organization type is required";
        break;
      case 'website':
        if (!value) errorMessage = "Website is required";
        break;
      case 'mobileNumber':
        if (!value) errorMessage = "Mobile number is required";
        break;
      case 'email':
        if (!value) errorMessage = "Email is required";
        break;
      case 'address':
        if (!value) errorMessage = "Address is required";
        break;
      case 'password':
        if (!value) errorMessage = "Password is required";
        break;
      case 'confirmPassword':
        if (!value) errorMessage = "Confirm password is required";
        break;
      case 'fullName':
        if (!value) errorMessage = "Full name is required";
        break;
      case 'volunteerEmail':
        if (!value) errorMessage = "Email is required";
        break;
      case 'volunteerPassword':
        if (!value) errorMessage = "Password is required";
        break;
      case 'volunteerConfirmPassword':
        if (!value) errorMessage = "Confirm password is required";
        break;
      default:
        break;
    }
    return errorMessage;
  }

  const handleInputChange = (e: any, field: string) => {
    const { value } = e.target;
    let errors:any = { ...formErrors };


    if (userType === "organization") {
      setFormData(prevData => {
        const updatedData = { ...prevData, [field]: value };

        errors[field] = validateField(field, value);
        setFormErrors(errors);
        return updatedData;
      });
    } else {
      setVolunteerFormData(prevData => {
        const updatedData = { ...prevData, [field]: value };

        errors[field] = validateField(field, value);
        setFormErrors(errors);
        return updatedData;
      });
    }
  };

  const validateForm = () => {
    const errors: any = {};
    let isValid = true;

    if (userType === "organization") {
      if (!formData.orgName) {
        errors.orgName = "Organization name is required";
        isValid = false;
      }
      if (!formData.orgType) {
        errors.orgType = "Organization type is required";
        isValid = false;
      }
      if (!formData.website) {
        errors.website = "Website is required";
        isValid = false;
      }
      if (!formData.mobileNumber) {
        errors.mobileNumber = "Mobile number is required";
        isValid = false;
      }
      if (!formData.email) {
        errors.email = "Email is required";
        isValid = false;
      }
      if (!formData.address) {
        errors.address = "Address is required";
        isValid = false;
      }
      if (!formData.password) {
        errors.password = "Password is required";
        isValid = false;
      }
      if (!formData.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
        isValid = false;
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    } else if (userType === "volunteer") {
      if (!volunteerformData.fullName) {
        errors.fullName = "Full name is required";
        isValid = false;
      }
      if (!volunteerformData.email) {
        errors.volunteerEmail = "Email is required";
        isValid = false;
      }
      if (!volunteerformData.mobileNumber) {
        errors.mobileNumber = "Mobile number is required";
        isValid = false;
      }
      if (!volunteerformData.password) {
        errors.volunteerPassword = "Password is required";
        isValid = false;
      }
      if (!volunteerformData.confirmPassword) {
        errors.volunteerConfirmPassword = "Confirm password is required";
        isValid = false;
      }
      if (volunteerformData.password !== volunteerformData.confirmPassword) {
        errors.volunteerConfirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    try {
      let response;
      if (userType === "organization") {
        response = await signInAPI(formData);
        console.log("response.data.statusCode === 201",response.data.statusCode === 201)
        if (response.data.statusCode === 201) {
          successNotification(response.message)
          router.push("/");
        }
      } else {
        response = await userSignInAPI(volunteerformData);
          if (response.data.statusCode === 201) {
            successNotification(response.message)
            router.push("/");
          }
      }

      console.log("API response", response);
    } catch (error:any) {
      console.error("Error:", error);
                  errorNotification(error)
  
    }
  };

  return (
    <section className="contact gray-bg pt-5" id='sign-up'>
      <div className="container">
        <div className="max-w-500 mx-auto pos-rel xb-contact">
          <div className="row">
            <div className="col-lg-12">
              <div className="p-0 xb-item--inner">
                <div className="text-center pb-4 pt-5 px-10 xb-item--holder">
                  <span className='d-flex align-items-center justify-content-center fs-25 mb-0'>
                    <Image src={npadImage} alt="" />Sign-Up
                  </span>
                </div>
                <form className="contact-from pb-5 px-10 xb-item--form" action="#!" >
                  <div className="row">
                    <div className="col-lg-12 text-center pb-4">
                      Sign-Up As
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className='d-flex align-items-center justify-content-center pb-4'>
                        <div className={`rounded fs-15 rounded-4 px-3 cursor-pointer text-center ${userType === "volunteer" ? "border-primary-1px text-primary" : "border"}`} onClick={() => { setUserType("volunteer"); setFormData({ ...formData, userType: "volunteer" }) }}>
                          Volunteer
                        </div>
                        <div className={`rounded fs-15  rounded-4 px-3 cursor-pointer text-center ms-2 ${userType === "organization" ? "border-primary-1px text-primary" : "border"}`} onClick={() =>{ setUserType("organization"),setFormData({ ...formData, userType: "organization" })}}>
                          Organization
                        </div>
                      </div>
                    </div>
                    {
                      userType === "organization" ? (<>
                        <div className="col-lg-12">
                          <div className="xb-item--field">
                            <span><Image src={emailImage} alt="" /></span>
                            <input type="text" placeholder="Enter Organization Name"
                              required
                              value={formData.orgName}
                              onChange={(e) => handleInputChange(e, "orgName")}
                            />
                            {formErrors.orgName && <span className="error-text text-danger mt-6 fs-15 ">{formErrors.orgName}</span>}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="xb-item--field">
                            <span><Image src={cSelect} alt="" /></span>
                            <select name="select" id="nice-select" className='text-secondary fs-14 ms-7 mt-1' value={formData.orgType} onChange={(e) => handleInputChange(e, "orgType")}>
                              <option >Select Organization Type</option>
                              <option value="non_profit">Non-Profit</option>
                              <option value="charity">Charity</option>
                              <option value="government_agency">Government Agency</option>
                              <option value="edu_institution">Educational Institution</option>
                              <option value="personal_business">Personal - Business</option>
                            </select>
                            {formErrors.orgType && <span className="error-text text-danger mt-6 fs-15">{formErrors.orgType}</span>}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="xb-item--field">
                            <span><Image src={emailImage} alt="" /></span>
                            <input type="text" placeholder="Enter Your Website Link"
                              required
                              value={formData.website}
                              onChange={(e) => handleInputChange(e, "website")}
                            />
                            {formErrors.website && <span className="error-text text-danger mt-6 fs-15">{formErrors.website}</span>}
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="xb-item--field">
                            <span><Image src={callImage} alt="" /></span>
                            <input
                              type="text"
                              placeholder="Enter Your Contact Number"
                              required
                              value={formData.mobileNumber}
                              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                const target = e.target as HTMLInputElement;
                                target.value = target.value.replace(/[^0-9]/g, '');
                              }}
                              onChange={(e) => handleInputChange(e, "mobileNumber")}
                            />
                            {formErrors.mobileNumber && <span className="error-text text-danger mt-6 fs-15">{formErrors.mobileNumber}</span>}
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="xb-item--field">
                            <span><Image src={emailImage} alt="" /></span>
                            <input
                              type="email"
                              placeholder="Enter Your Email "
                              required
                              value={formData.email}
                              onChange={(e) => handleInputChange(e, "email")}
                            />
                            {formErrors.email && <span className="error-text text-danger mt-6 fs-15">{formErrors.email}</span>}
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="xb-item--field">
                            <span><Image src={cSelect} alt="" /></span>
                            <input
                              type="text"
                              placeholder="Enter Your Full Address "
                              required
                              value={formData.address}
                              onChange={(e) => handleInputChange(e, "address")}
                            />
                            {formErrors.address && <span className="error-text text-danger mt-6 fs-15">{formErrors.address}</span>}
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="xb-item--field">
                            <span><Image src={cSelect} alt="" /></span>
                            <input
                              type="password"
                              placeholder="Enter Your Password"
                              required
                              value={formData.password}
                              onChange={(e) => handleInputChange(e, "password")}
                            />
                            {formErrors.password && <span className="error-text text-danger mt-6 fs-15">{formErrors.password}</span>}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="xb-item--field">
                            <span><Image src={emailImage} alt="" /></span>
                            <input
                              type="password"
                              placeholder="Confirm Your Password"
                              required
                              value={formData.confirmPassword}
                              onChange={(e) => handleInputChange(e, "confirmPassword")}
                            />
                            {formErrors.confirmPassword && <span className="error-text text-danger mt-6 fs-15">{formErrors.confirmPassword}</span>}
                          </div>
                        </div>
                      </>
                      )
                        :
                        (
                          <>
                            <div className="col-lg-12">
                              <div className="xb-item--field">
                                <span><Image src={emailImage} alt="" /></span>
                                <input
                                  type="text"
                                  placeholder="Enter Your Full Name"
                                  required
                                  value={volunteerformData.fullName}
                                  onChange={(e) => handleInputChange(e, "fullName")}
                                />
                                {formErrors.fullName && <span className="error-text text-danger mt-6 fs-15">{formErrors.fullName}</span>}
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="xb-item--field">
                                <span><Image src={emailImage} alt="" /></span>
                                <input
                                  type="email"
                                  placeholder="Enter Your Email"
                                  required
                                  value={volunteerformData.email}
                                  onChange={(e) => handleInputChange(e, "email")}
                                />
                                {formErrors.volunteerEmail && <span className="error-text text-danger mt-6 fs-15">{formErrors.volunteerEmail}</span>}
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="xb-item--field">
                                <span><Image src={callImage} alt="" /></span>
                                <input
                                  type="text"
                                  placeholder="Enter Your Mobile Number"
                                  required
                                  value={volunteerformData.mobileNumber}
                                  onChange={(e) => handleInputChange(e, "mobileNumber")}
                                />
                                {formErrors.mobileNumber && <span className="error-text text-danger mt-6 fs-15">{formErrors.mobileNumber}</span>}
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="xb-item--field">
                                <span><Image src={emailImage} alt="" /></span>
                                <input
                                  type="password"
                                  placeholder="Enter Your Password"
                                  required
                                  value={volunteerformData.password}
                                  onChange={(e) => handleInputChange(e, "password")}
                                />
                                {formErrors.volunteerPassword && <span className="error-text text-danger mt-6 fs-15">{formErrors.volunteerPassword}</span>}
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="xb-item--field">
                                <span><Image src={emailImage} alt="" /></span>
                                <input
                                  type="password"
                                  placeholder="Confirm Your Password"
                                  required
                                  value={volunteerformData.confirmPassword}
                                  onChange={(e) => handleInputChange(e, "confirmPassword")}
                                />
                                {formErrors.volunteerConfirmPassword && <span className="error-text text-danger mt-6 fs-15">{formErrors.volunteerConfirmPassword}</span>}
                              </div>
                            </div>
                          </>
                        )
                    }
                    <div className='text-center'>
                      <p className='mb-0'>
                        Already Registered ?
                      </p>
                    </div>
                    <Link href={"/auth/login"} className='text-center'>
                      Login
                    </Link>

                    <div className="col-12 text-center mt-4">
                      <button className="fs-17 px-7 py-3 thm-btn" type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page
