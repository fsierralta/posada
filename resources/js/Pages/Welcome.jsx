import Body from "@/Components/Front/Body"
import Footer from "@/Components/Front/Footer"
import Layout from "@/Components/Front/Layout"
import React from 'react'

export default function WelcomeNew({ auth, laravelVersion="", phpVersion="" }) {
  return (
    <Layout 
      auth={auth}
    >
       <Body/>
     
       
    </Layout>
     

  )
}


