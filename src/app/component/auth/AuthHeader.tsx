import React from 'react'
import Image from 'next/image'
import timeImage from '../../../../assets/img/icon/time.svg'
import locationImage from '../../../../assets/img/icon/location.svg'
import logoImage from '../../../../assets/img/icon/n_pad.svg'


const AuthHeader = () => {
  return (
    <header>
      <div className="header__top-wrap gray-bg">
        <div className="container">
          <div className="header__top ul_li_between">
            <div className="header__top-cta">
              <Image src={logoImage} alt="" /><span>Help Desk :</span> +91 590 088 55
            </div>
            <ul className="header__top-info ul_li">
              <li className='d-flex'><Image src={timeImage} alt="" />Monday - Friday 09:00 am - 05:00 Pm</li>
              <li className='d-flex'><Image src={locationImage} alt="" />456 Elm Avenue Springfield, IL 62701</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AuthHeader