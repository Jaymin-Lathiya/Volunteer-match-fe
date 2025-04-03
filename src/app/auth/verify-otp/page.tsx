"use client"
import { errorNotification, successNotification } from '@/app/component/Notification/ToastNotification';
import {  decodeData, encodeData,  maskEmail } from '@/utils/helpers'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

async function verifyOTP(formData: any) {
    const response = await fetch('http://localhost:3005/api/verify-otp', {
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



const page = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [decodedEmail, setDecodedEmail] = useState<string>("");

    const emailParams:any = searchParams?.get('email');

    const [formData, setFormData] = useState({
        email: decodeData(emailParams),
        otp: ""  
    });
    const [formErrors, setFormErrors] = useState({
        email: "",
        otp: ""
    });



    const validateForm = () => {
        const errors: any = {};
        let isValid = true;
        if (!formData.email) {
            errors.email = "Email is required";
            isValid = false;
        }

        if (formData.otp.length !== 6 || /[^0-9]/.test(formData.otp)) { 
            errors.otp = "OTP must be 6 digits";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleInputChange = (e: any, index: number) => {
        const value = e.target.value;

        if (/[^0-9]/.test(value)) return; 

        const updatedOtp = formData.otp.split('');
        updatedOtp[index] = value;

        setFormData(prevData => ({
            ...prevData,
            otp: updatedOtp.join('')
        }));

       
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement;
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            const updatedOtp = formData.otp.split('');
            updatedOtp[index] = ''; 
            setFormData(prevData => ({
                ...prevData,
                otp: updatedOtp.join('') 
            }));

            if (index > 0) {
                const prevInput = document.getElementById(`otp-input-${index - 1}`) as HTMLInputElement;
                if (prevInput) prevInput.focus();
            }
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            return;
        }

        try {
            const response = await verifyOTP(formData);
            if(response.data.statusCode===200){
                successNotification(response.message)
                router.push(`/auth/reset-password?email=${encodeData(formData.email)}&otp=${encodeData(formData.otp)}`);
            }
        } catch (error:any) {
            console.error("Error:", error);
            errorNotification(error)
        }
    };

    const handleResendOtp=async()=>{
        try {
            const data = await sendOTP({email:formData.email});
            if(data.statusCode===200){
                alert("OTP send Successfully")
            }
        } catch (error) {
            console.error("Error:", error);
            alert('An error occurred during OTP sending!');
        }

    }


    useEffect(() => {
        if (emailParams) {
            const decodedEmailData = decodeData(emailParams);
            setDecodedEmail(decodedEmailData);
        }
    }, [searchParams]);

    return (
        <section className="contact gray-bg pt-5" id='otp-verify'>
            <div className="container py-10">
                <div className="max-w-500 mx-auto pos-rel xb-contact">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="">
                                <div className="card border-0 px-2 text-center py-4">
                                    <p className='fs-17 pb-4 mb-0'>Please enter the one-time password <br /> to verify your account</p>
                                    <div>
                                        <span>A code has been sent to </span>
                                        <small id="maskedEmail">{maskEmail(decodedEmail)}</small>
                                    </div>
                                    <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">
                                        {Array.from({ length: 6 }).map((_, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                id={`otp-input-${index}`}
                                                className="m-2 text-center form-control rounded border"
                                                value={formData.otp[index] || ''} 
                                                onChange={(e) => handleInputChange(e, index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                maxLength={1}
                                                style={{ width: '40px', height: '40px', textAlign: 'center' }}
                                            />
                                        ))}
                                    </div>
                                    {formErrors.otp && <div className="text-danger mt-2">{formErrors.otp}</div>}
                                    <div className='col-12 text-center mt-4'>
                                      <div className='text-decoration-underline text-primary' onClick={handleResendOtp}>Resend OTP</div>
                                    </div>
                                    <div className="col-12 text-center mt-4">
                                            <button className="fs-17 px-7 py-3 thm-btn" type="submit" onClick={handleSubmit} >Verify OTP</button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default page;
