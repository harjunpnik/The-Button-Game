import React from 'react'
import logo from '../images/logo.ico'

function Header() {

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
    lineHeight: '110px'
  }

  const infoDivSyle = { 
    fontSize: '30px',
    float: 'right',
    textAlign: 'center',
    margin: '0',
    color: 'white',
    lineHeight: '40px'
  }

  const infoStyle = {
    border: '4px solid #2962ff',
    padding : '0px 4px 0px 4px',
  }

  const imgStyle = {
    float: 'left',
    width: '110px',
    lineHeight: '110px'
  }

  // TODO  add info text and link

  return (
    <div style={navbarStyle}>

        <div id="contentContainer">

            <img src={logo} alt="Logo" style={imgStyle}/>
            <h2 style={headerStyle}>BUTTON GAME</h2>

            <div style={infoDivSyle}>

                <p style={infoStyle} id="infoLink" > INFO </p>

            </div>

        </div>

    </div>
  )
}

export default Header
