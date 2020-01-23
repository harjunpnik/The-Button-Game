import React from 'react'
import logo from '../images/logo.ico'

function Header({togglePopup, changePopupContent}) {

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

  const infoDivSyle = { 
    fontSize: '30px',
    float: 'right',
    textAlign: 'center',
    margin: '0',
    color: 'white',
    lineHeight: '40px',
    userSelect: 'none'
  }

  const infoStyle = {
    border: '4px solid #2962ff',
    padding : '0px 4px 0px 4px',
  }

  const imgStyle = {
    float: 'left',
    width: '110px',
    lineHeight: '110px',
    userSelect: 'none'
  }

  const showInfo = () =>{
    const header = "Info"
    const infoMessage = ["This is html ", <b>Some other</b>, " and again some other", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero arcu, feugiat in tortor non, consectetur sollicitudin elit. Phasellus vehicula iaculis sem, id ultrices diam condimentum a. Phasellus malesuada quam ex, quis aliquam eros placerat non. In hac habitasse platea dictumst. Mauris viverra ut ex vel pharetra. Praesent aliquam nulla ligula, in sagittis turpis efficitur non. Ut sed tellus sit amet lacus venenatis consectetur lacinia ac sapien."]
    changePopupContent(header, infoMessage)
    togglePopup()
  }

  // TODO  add info text and link

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
