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
  

  const togglePopup = () => {
    setShowPopup(!showPopup)
    console.log(showPopup)
  }

  const changePopupContent = (header, message) =>{
    setPopupHeader(header)
    setPopupMessage(message)
  }
  

  return (
    <div>

      <Header togglePopup={togglePopup} changePopupContent={changePopupContent} setPoints={setPoints}/>

      <Main points={points} setPoints={setPoints}/>
      
      {showPopup? <Popup message={popupMessage} togglePopup={togglePopup} header={popupHeader}/> : null}

      <Footer/>
      

    </div>
  )
}

export default App
