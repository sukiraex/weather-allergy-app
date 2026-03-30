export const theme = {
    buttons: {
        outline: 'none',
        buttongradient: 'linear-gradient(to right, #ED8D20, #EA7B7E, #CA448B)',
        border: 'none',
        cursor: 'pointer',
        fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        color: '#FFFF',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
        

    }, 

  

    card: {
        backgroundColor: '#dce8f0',
        borderRadius: '24px',
        padding: '20px',
        width: '340px',
        fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      },

      warningcolours: {
        Low: '#59C08D',
        Medium: '#c1cb45',
        High: '#e9b130',
        VeryHigh: '#dc802c',
        Severe: '#d02d2c',
        Muted: '#7a95aa'
      },

     
      container: {
        cursor: 'pointer',
        fontSize: '14px',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        position: 'relative',
      },
      input: {
        position: 'absolute',
        opacity: 0,
        cursor: 'pointer',
        height: 0,
        width: 0,
      },
      checkmark: {
        width: '15px',
        height: '15px',
        borderRadius: '50%',             
        border: '1px solid #D0D5DD',    
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      },
      checkmarkChecked: {
        backgroundColor: 'transparent',  
        border: '1px solid #3B82F6',
      },
      checkmarkIcon: {
        width: '8px',
        height: '8px',
        color: '#3B82F6',                // Blue checkmark
      },
        }