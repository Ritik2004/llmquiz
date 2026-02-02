import React from 'react'
import ChatArea from './ChatArea.jsx'
const Right = () => {
  return (
    <div style={{width:"100%"}}>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"10%", borderBottom:"1px solid white",padding:"10px"}}>
        <h1 style={{color: "white"}}>Welcome to Brain Battle</h1>
        </div>
      <div style={{height: "90%", overflow: "hidden"}}>
  <ChatArea/>
</div>
    </div>
  )
}

export default Right