import React from 'react'
import Navbar from '../../components/navabar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/propertyList/PropertyList'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <div className='mt-5 d-flex flex-column align-items-center gap-sm-0 gap-lg-4'>
            <Featured />
            <h1 className='text-start fs-3 fw-semibold d-flex justify-content-start ' style={{width:'65%'}} >Browse by property type</h1>
            <PropertyList/>
            <h1 className='text-start fs-3 fw-semibold  d-flex justify-content-start ' style={{width:'65%'}} >Home guests love</h1>
            <FeaturedProperties/>
            <MailList/>
            <Footer/>
        </div>
    </div>
  )
}

export default Home