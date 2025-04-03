"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import emailImage from '../../../../assets/img/icon/c_mail.svg'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { encodeData} from '@/utils/helpers';
import { successNotification } from '@/app/component/Notification/ToastNotification';



async function sendOTP(formData: any) {
    const response = await fetch('http://localhost:3005/api/forgot-password', {
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



const page = ({ }) => {

    const router = useRouter()
    const searchParams = useSearchParams()
 
    const [formData, setFormData] = useState({
        email: "",
    })
    const [formErrors, setFormErrors] = useState({
        email: "",
    });

 

    const validateForm = () => {
        const errors: any = {};
        let isValid = true;
        if (!formData.email) {
            errors.email = "Email is required";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    }

    const validateField = (field: string, value: string) => {
        let errorMessage = "";
        switch (field) {

            case 'email':
                if (!value) errorMessage = "Email is required";
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            return;
        }

        try {
            let response;
            response = await sendOTP(formData);
            if (response.data.statusCode === 200) {
                successNotification(response.message)
                router.push(`/auth/verify-otp?email=${encodeData(formData.email)}`);
            }
            console.log("API response", response);
        } catch (error) {
            console.error("Error:", error);
            alert('An error occurred during sending OTP!');
        }
    };



    return (
        <section className="contact gray-bg pt-5" id='forgot-password'>
            <div className="container">
                <div className="max-w-500 mx-auto pos-rel xb-contact">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="p-0 xb-item--inner">

                                <form className="contact-from pb-5 px-10 xb-item--form" action="#!" >
                                    <div className="row">
                                        <div className="col-lg-12 text-center py-4">
                                            Forgot-Password
                                        </div>
                                    </div>
                                    <div className="row">

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
                                        <div className='text-center'>
                                            <p className='mb-0'>
                                                Already Registered ?
                                            </p>
                                        </div>
                                        <Link href={"/auth/login"} className='text-center'>
                                            Login
                                        </Link>

                                        <div className="col-12 text-center mt-4">
                                            <button className="fs-17 px-7 py-3 thm-btn" type="submit" onClick={handleSubmit} >Send OTP</button>
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