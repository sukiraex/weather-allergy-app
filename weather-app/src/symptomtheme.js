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
        backgroundColor: 'var(--widget-bg)',
        borderRadius: '24px',
        padding: '20px',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      },

      warningcolours: {
        None: 'grey',
        Low: '#59C08D',
        Medium: '#c1cb45',
        High: '#e9b130',
        VeryHigh: '#dc802c',
        Severe: '#d02d2c',
        Muted: 'var(--widget-subtext)'
      },
      input: {
        position: 'absolute',
        opacity: 0,
        cursor: 'pointer',
        height: 0,
        width: 0,
      },
      container: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        marginBottom: '8px',
      },
      checkmark: {
        width: '15px',
        height: '15px',
        borderRadius: '50%',             
        border: '1px solid var(--border)',    
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      },
      checkmarkChecked: {
        backgroundColor: 'transparent',  
        border: '1px solid var(--accent)',
      },
      checkmarkIcon: {
        width: '8px',
        height: '8px',
        color: 'var(--accent)',                // Blue checkmark
      },
        }