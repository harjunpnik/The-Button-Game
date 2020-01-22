import React from 'react'
import githubLogo from '../images/githubIcon.png'

function Footer() {

  const footerStyle = {
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    backgroundColor: '#6746c3',
    color: 'white',
    height: '60px',
  }

  const footerLeftStyle ={
    float: 'left',
    paddingLeft: '2px',
    margin: '0',
    lineHeight: '60px'
  }

  const footerRightStyle ={
    float: 'right',
  }

  const imgStyle = {
    float: 'right',
    width: '60px',
  }

  return (
    <div style={footerStyle}>
    
        <div id="contentContainer">

            <p style={footerLeftStyle}>The Button Game - 2020</p>

            <div style={footerRightStyle}> 
                <a href="https://github.com/harjunpnik/The-Button-Game">
                    <img src={githubLogo} alt="github logo" style={imgStyle}/>
                </a>
            </div>
            
        </div>

    </div>
  )
}

export default Footer
