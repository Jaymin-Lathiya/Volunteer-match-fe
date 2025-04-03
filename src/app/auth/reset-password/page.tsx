"use client"
import { decodeData } from '@/utils/helpers';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import cSelect from '../../../../assets/img/icon/c_select.svg'

import emailImage from '../../../../assets/img/icon/c_mail.svg'
import { errorNotification, successNotification } from '@/app/component/Notification/ToastNotification';

async function resetPassword(formData: any) {
    const response = await fetch('http://localhost:3005/api/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error('OTP sending failed');
    }
    return await response.json();
}




const page = () => {

    const router = useRouter()
    const searchParams = useSearchParams()

    const emailParams: any = searchParams?.get('email');

    const otpData: any = searchParams?.get('otp');

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
        otp: decodeData(otpData),
        email: decodeData(emailParams)
    })

    const [formErrors, setFormErrors] = useState({
        password: "",
        confirmPassword: "",
    });

    const validateField = (field: string, value: string) => {
        let errorMessage = "";
        switch (field) {
            case 'password':
                if (!value) errorMessage = "Password is required";
                break;
            case 'confirmPassword':
                if (!value) errorMessage = "Confirm password is required";
                break;
            default:
                break;
        }
        return errorMessage;
    }

    const handleInputChange = (e: any, field: string) => {
        const { value } = e.target;
        let errors: any = { ...formErrors };


        setFormData(prevData => {
            const updatedData = { ...prevData, [field]: value };

            errors[field] = validateField(field, value);
            setFormErrors(errors);
            return updatedData;
        });
    }


    const validateForm = () => {
        const errors: any = {};
        let isValid = true;

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
            const { confirmPassword, ...resetData } = formData;
            let response;
            response = await resetPassword(resetData);
            if (response.data.statusCode === 200) {
                successNotification(response.message)
                router.push("/auth/login");
            }

            console.log("API response", response);
        } catch (error:any) {
            errorNotification(error)
            console.error("Error:", error);
            alert('An error occurred during reset-password!');
        }
    };



    return (
        <section className="contact gray-bg pt-5" id='reset-password'>
            <div className="container">
                <div className="max-w-500 mx-auto pos-rel xb-contact">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="p-0 xb-item--inner">
                                <div className="text-center pb-4 pt-5 px-10 xb-item--holder">
                                    <span className='d-flex align-items-center justify-content-center fs-25 mb-0'>
                                        Reset Password
                                    </span>
                                </div>
                                <form className="contact-from pb-5 px-10 xb-item--form" action="#!" >
                                    <div className="row">
                                        <>
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


                                        <div className="col-12 text-center mt-4">
                                            <button className="fs-17 px-7 py-3 thm-btn" type="submit" onClick={handleSubmit}>Reset Password</button>
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