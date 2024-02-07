import React, { useEffect, useState } from 'react'

const FlashMessage = ({message}) => {
    const[flashMessage,setFlashMessage] = useState('')

    const flashMsgFun = () =>{
        setFlashMessage(message)
        setTimeout(() => {
            setFlashMessage('')
        },2000)
    }
    
    useEffect(() => {
        flashMsgFun()
    },[message])

  return (
    <div>
      <p>{flashMessage}</p>
    </div>
  )
}

export default FlashMessage
