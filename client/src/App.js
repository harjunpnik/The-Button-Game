import React, {useState} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Popup from './components/Popup'
import Main from './components/Main'
import './index.css'

function App() {

  // Points for the game and user for game
  const [points, setPoints] = useState(null)
  const [user, setUser] = useState(null)

  // States for the Popup
  const [showPopup, setShowPopup] = useState(false) //Show popup boolean
  const [popupHeader, setPopupHeader] = useState("") // Set header
  const [popupMessage, setPopupMessage] = useState([]) // Set Message, As array. Can include html tags, example: ["This ", <b>is</b>, " a message"]
  const [notificationMessage, setNotificationMessage] = useState(null) // set notification messsage for user feedback on errors and successes
  const [isError, setIsError] = useState(null) // setNotification (boolean) status to error or not 
  
  // function to toggle popup
  const togglePopup = () => {
    setShowPopup(!showPopup)
  }
  // Function to change content of Popups
  const changePopupContent = (header, message) =>{
    setPopupHeader(header)
    setPopupMessage(message)
  }
  // Function to show notification on event and timer for message to disappear 
  const showNotification = (notification, error, timer) =>{
    setNotificationMessage(notification)
    setIsError(error)
    // Wait timer, NOTE: Timer is in MS, not seconds
    setTimeout(() => {
      setNotificationMessage(null)
      setIsError(null)
    }, timer)

  }
  

  return (
    <div>

      <Header togglePopup={togglePopup} changePopupContent={changePopupContent} setPoints={setPoints} showNotification={showNotification} setUser={setUser}/>

      <Main points={points} setPoints={setPoints} togglePopup={togglePopup} changePopupContent={changePopupContent} showNotification={showNotification} user={user} setUser={setUser}/>
      
      {showPopup? <Popup message={popupMessage} togglePopup={togglePopup} header={popupHeader} notificationMessage={notificationMessage} isError={isError}/> : null}

      <Footer/>

    </div>
  )
}

export default App

