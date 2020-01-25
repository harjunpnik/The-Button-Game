import React from 'react'

function Popup({header, message, togglePopup, notificationMessage, isError}) {

  // Convert to Spread syntax
  // Popup notification style   
  const popupNotificationStyle ={
    error: {
      color: 'red',
      fontSize: '20px',
      marginLeft: '2%',
      marginRight: '2%',
      textAlign: 'center',
    },
    success: {
      color: 'green',
      fontSize: '20px',
      marginLeft: '2%',
      marginRight: '2%',
      textAlign: 'center',
    }
  }

  // Map out message array content
  const renderContent = () =>
    message
    .map((m,index) =>
      <span
        key={index}
      > {m} </span>
    )

  return (
    <div id="popupStyle">
      <div id="popupInnerStyle">
            
        <button id="closePopupButton" onClick={togglePopup}>X</button>
            
        <h2 id="headerPopupStyle">{header}</h2>
            
        <div id="popupContentStyle">{renderContent()}</div>

        <div style={isError?popupNotificationStyle.error: popupNotificationStyle.success} > {notificationMessage} </div>

      </div>
    </div>
  )
}

export default Popup
