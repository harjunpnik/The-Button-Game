import React from 'react'
import logo from '../images/logo.ico'
import userService from '../services/user'

function Header({togglePopup, changePopupContent, setPoints, showNotification, setUser}) {

  // Reset player points function for info button 
  const resetPlayerPoints = () =>{
    const buttonGameUser = window.localStorage.getItem('buttonGameUser')
    userService
    .resetUser(buttonGameUser)
    .then(res => {
        // Change points and show notification that reset was successfull
        setPoints(res.points)
        showNotification("Points reset to 20", false, 5000)
        
    }).catch (error => {
      // Tell user that user has too many points or invalid user id
      showNotification("User has too much points or invalid user id", true, 5000)
      
    })
    
  }

  // Gets new user id and sets points to starting points (20 points)
  const getNewUser = () =>{
    userService
    .create()
    .then(res => {
      // save to localstorage id with key 'buttonGameUser'
      window.localStorage.setItem(
        'buttonGameUser', res.data.user
      )
      // Set points and user id, show notification that it was successfull
      setUser(res.data.user)
      setPoints(res.data.points)
      showNotification("New user saved. Starting at 20 points", false, 5000)
    })
  }

  // OnClick of INFO button, show popup with following content
  const showInfo = () =>{
    // Set header text and info message for popup window
    const header = "Info"
    const infoMessage = 
      ["The button game is a game where every player increase the same counter. The players start with 20 points and each time they press the button they lose 1 point. The points of a player can't be negative. ",
      "Every 10 clicks a user gets points as a prize. A player can win up to one prize with a single click. If the same click would win many prizes, the player gets the biggest possible prize from the list below. ",
      <br/>,
      <br/>,
      <b> The prizes are as following: </b> ,
      <li key="1"> <b> 5 points </b> every <b> 10 clicks </b> </li>,
      <li key="2"> <b> 40 points </b> every <b> 100 clicks </b> </li>,
      <li key="3"> <b> 250 points </b> every <b> 500 clicks </b> </li>,
      <br/>,
      "If a player has 0 points he can reset his points back to 20.",
      <br/>,
      <br/>,
      <b>If your game is not working, try to:</b>,
      <li key="4"> Refresh your browser </li>,
      <li key="5"> Try to reset your points <button className="infoButton" onClick={() => resetPlayerPoints()}>Reset points to 20</button></li>,
      <li key="6"> Get a new user id and start from 20 points <button className="infoButton" onClick={() => getNewUser()}>Get new user id</button> </li>,
      ]
    // Change content of popup window and show it 
    changePopupContent(header, infoMessage)
    togglePopup()
  }

  return (
    <div id="navbarStyle">

      <div id="contentContainer">

        <img src={logo} alt="Logo" id="logoImg"/>
        <h2 id="headerStyle">BUTTON GAME</h2>

        <div id="infoDivStyle">

          <p id="infoLink" onClick={() => showInfo()}> INFO </p>

        </div>

      </div>

    </div>
  )
}

export default Header
