import { theme } from "../../theme";
import { useState } from "react";

const symptoms = ["Sneezing", "Runny Nose", "Itchy Eyes", "Congestion", "Headache", "Fatigue"];


export default function LogSymptoms(){
    const rating = useState([0,0,0,0,0,0]);
    return (
        
        <div style={{...theme.card, backgroundColor: '#FFFFFF', justifyContent: 'space-between', overflow: 'hidden', padding: 0, }}>
            <div style={{background: theme.buttons.buttongradient, padding: '24px 24px', display: 'flex', alignItems: 'center', gap: '1px', maxWidth: '100%', color: '#FFFFFF', flexDirection: 'column'}}>
                <h4 style={{margin: 0, float: 'left', fontWeight: '400',}}>Log Symptoms</h4>
                <h5 style={{margin: 0, float: 'left', fontWeight: '400'}}>Track how you're feeling</h5>
            </div>


      
            <div style={{overflowY: 'scroll'}}>
                {
                    
                    symptoms.map((i) => (
                        <div key={i}>

                            <div style={{justifyContent: 'space-between'}}>
                            
                            
                            <label>
                                {i}
                            </label>
                            <button>+</button>

                            </div>
                           
                        </div>
                    ))
                }


            </div>
            




            <div style={{padding: '10px', display: 'flex', justifyContent: 'space-between'}}>
            <button style={{...theme.buttons, background: '#F3F4F6', width:'48%', height: '40px', borderRadius: '14px', color:'#364153' }}>Cancel</button>
            <button style={{...theme.buttons, background: theme.buttons.buttongradient, width:'48%', height: '40px', borderRadius: '14px' }}>Log Symptoms</button>
            </div>
           
        </div>
    );

}