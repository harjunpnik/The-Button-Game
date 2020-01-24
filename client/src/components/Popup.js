import React from 'react'

function Popup({header, message, togglePopup, notificationMessage, isError}) {

    const popupStyle = {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        margin: 'auto',
        backgroundColor: 'rgba(0,0,0, 0.5)'
    }

    const popupInnerStyle = {
        position: 'absolute',
        left: '15%',
        right: '15%',
        top: '20%',
        margin: 'auto',
        paddingBottom: '8px',
        background: 'white'
    }

    const headerStyle = {
        fontSize: '65px',
        textAlign: 'center', 
        color: 'black', 
        padding: '0', 
        margin: '0',
        letterSpacing: '2px',
    }

    const popupContentStyle = {
        fontSize: '20px',
        marginLeft: '2%',
        marginRight: '2%',
    }

    // Convert to Spread syntax 
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

    const renderContent = () =>
    message
      .map((m,index) =>
        <span
          key={index}
        > {m} </span>
      )

  return (
    <div style={popupStyle}>
        <div style={popupInnerStyle}>
            <button id="closePopupButton" onClick={togglePopup}>X</button>
            
            <h2 style={headerStyle}>{header}</h2>
            
            <div style={popupContentStyle}>{renderContent()}</div>
  <div style={isError?popupNotificationStyle.error: popupNotificationStyle.success} > {notificationMessage} </div>
        </div>
  </div>
  )
}

export default Popup
