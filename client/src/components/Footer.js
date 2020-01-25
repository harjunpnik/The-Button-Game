import React from 'react'
import githubLogo from '../images/githubIcon.png'

function Footer() {

  return (
    <div  id="footerStyle">
    
      <div id="contentContainer">

        <p id="footerLeftStyle">The Button Game - 2020</p>

        <div id="footerRightStyle"> 
          <a href="https://github.com/harjunpnik/The-Button-Game">
            <img src={githubLogo} alt="github logo" id="githubImgStyle"/>
          </a>
        </div>
            
      </div>

    </div>
  )
}

export default Footer
