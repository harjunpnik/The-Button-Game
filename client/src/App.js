import React, {useState} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Popup from './components/Popup'
import Main from './components/Main'
import './index.css'

function App() {

  const [points, setPoints] = useState(null)

  const [showPopup, setShowPopup] = useState(false)
  const [popupHeader, setPopupHeader] = useState("")
  const [popupMessage, setPopupMessage] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(null)
  

  const togglePopup = () => {
    setShowPopup(!showPopup)
    console.log(showPopup)
  }

  const changePopupContent = (header, message) =>{
    setPopupHeader(header)
    setPopupMessage(message)
  }

  const showNotification = (notification, error, timer) =>{
    setNotificationMessage(notification)
    setIsError(error)
    setTimeout(() => {
      setNotificationMessage(null)
      setIsError(null)
    }, timer)

  }
  

  return (
    <div>

      <Header togglePopup={togglePopup} changePopupContent={changePopupContent} setPoints={setPoints} showNotification={showNotification}/>

      <Main points={points} setPoints={setPoints} togglePopup={togglePopup} changePopupContent={changePopupContent} showNotification={showNotification}/>
      
      {showPopup? <Popup message={popupMessage} togglePopup={togglePopup} header={popupHeader} notificationMessage={notificationMessage} isError={isError}/> : null}

      <Footer/>
      

    </div>
  )
}

export default App

