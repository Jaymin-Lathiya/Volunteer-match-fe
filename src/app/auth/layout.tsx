import React, { Children } from 'react'
import AuthHeader from '../component/auth/AuthHeader'
import AuthFooter from '../component/auth/AuthFooter'



const layout = ({ children }: any) => {
  return (
  <section>    
    <AuthHeader/>
    <div>
      {children}
    </div>
    <AuthFooter/>

  </section>
  )
}

export default layout