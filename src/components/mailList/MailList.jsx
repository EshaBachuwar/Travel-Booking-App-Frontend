import React from 'react'

const MailList = () => {
  return (
    <div className='mt-3 bg-primary text-white d-flex flex-column align-items-center gap-3 p-5' style={{width:"100%"}}>
      <h1>Save time, save money!</h1>
      <span>Sign up and we'll send the best deals to you</span>
      <div>
        <input type="text" placeholder="Your Email" className='border-0 me-3 rounded-2 ps-2' style={{width:"18rem",height:"3rem"}}/>
        <button className='text-white fw-bold border-0 rounded-2 cursor-pointer p-2' style={{height:"4rem",backgroundColor:"rgb(64, 88, 224)"}}>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList