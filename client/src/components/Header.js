import React from 'react'
import logo from '../images/logo.ico'
import userService from '../services/user'

function Header({togglePopup, changePopupContent, setPoints, showNotification}) {

  // Outer div style
  const navbarStyle = {
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    backgroundColor: '#000063', 
    top:'0',
    width: '100%', 
    display:'block',
    height: '110px',
  }

  // Header style
  const headerStyle = {
    fontSize: '80px',
    float: 'left',
    textAlign: 'center', 
    color: 'white', 
    padding: '0', 
    margin: '0',
    letterSpacing: '2px',
    top: '50%',
    lineHeight: '110px',
    userSelect: 'none'
  }

  // info button div style
  const infoDivSyle = { 
    fontSize: '30px',
    float: 'right',
    textAlign: 'center',
    margin: '0',
    color: 'white',
    lineHeight: '40px',
    userSelect: 'none'
  }

  // info button div border style
  const infoStyle = {
    border: '4px solid #2962ff',
    padding : '0px 4px 0px 4px',
  }

  // logo style
  const imgStyle = {
    float: 'left',
    width: '110px',
    lineHeight: '110px',
    userSelect: 'none'
  }

  // Reset player points function for info button 
  const resetPlayerPoints = () =>{
    const buttonGameUser = window.localStorage.getItem('buttonGameUser')
    userService
    .resetUser(buttonGameUser)
    .then(res => {
        setPoints(res.points)
        showNotification("Points reset to 20", false, 5000)
        
    }).catch (error => {
      //console.log(error)
      //console.log("too much points or invalid user id")
      showNotification("User has too much points or invalid user id", true, 5000)
      
    })
    
  }

  // OnClick of INFO button, show popup with following content
  const showInfo = () =>{
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
      <li key="5"> Try to reset your points <button onClick={() => resetPlayerPoints()}>Reset points to 20</button></li>,
      <li key="6"> Delete buttonGameUser from local storage and refresh your browser <button>Delete buttonGameUser</button> </li>,
      ]
    changePopupContent(header, infoMessage)
    togglePopup()
  }

  return (
    <div style={navbarStyle}>

        <div id="contentContainer">

            <img src={logo} alt="Logo" style={imgStyle}/>
            <h2 style={headerStyle}>BUTTON GAME</h2>

            <div style={infoDivSyle}>

                <p style={infoStyle} id="infoLink" onClick={() => showInfo()}> INFO </p>

            </div>
        </div>

    </div>
  )
}

export default Header
