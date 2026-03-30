import { theme } from "../../symptomtheme";
import { useState } from "react";
import  circle  from "./icons/Container.svg"

const symptoms = ["Sneezing", "Runny Nose", "Itchy Eyes", "Congestion", "Headache", "Fatigue"];
const severity = [
    {rate: 'None'},
    {rate: 'Mild'},
    { rate: 'Moderate'},
    { rate: 'High'},
    { rate: 'Severe'},
    { rate: 'Very Severe'}
]






export default function LogSymptoms({ onClose, onSave, savedRate}){

    console.log('savedRate:', savedRate);

    const [rating, setRating] = useState(savedRate); //state variable 
    const now = new Date()

    const IncrementRates = (index) => {
        const newrate = [...rating] //newrate holds a copy of rating 
        newrate[index] = newrate[index] + 1 //will increment value at index
        if (rating[index] >= 5) { //if more than or equal to 5, returns as 5 is max
            return
        } 
        setRating(newrate) //set as newrate
    }

    const DecrementRates = (index) => {
        
        const newrate = [...rating] //same as above
        newrate[index] = newrate[index] - 1 //decrement value at index 
        if (rating[index] <= 0) { //minimum value is 0, cannot go under that
            return
        }
        setRating(newrate) //set as newrate



    }



    return (
        
        <div style={{...theme.card, backgroundColor: '#FFFFFF' , overflow: 'hidden', padding: 0, width: '380px', textAlign: 'left'}}>
            <div style={{background: theme.buttons.buttongradient, padding: '24px 24px', display: 'flex', gap: '1px', maxWidth: '100%', color: '#FFFFFF', position: 'relative'   }}>

                <img src={circle} alt="circle"  style={{width: '45px', height: '45px'}}/>
                <div style={{flexDirection: 'column', display:'flex', marginLeft: '10px'}}>
                <h3 style={{margin: 0, float: 'left', fontWeight: '500', marginBottom: '3px'}}>Log Symptoms</h3>
                <h5 style={{margin: 0, float: 'left', fontWeight: '400'}}>Track how you're feeling</h5>
                </div>
            </div>

            <div style={{color: '#0A0A0A', fontSize: '14px', marginTop: '12px', padding: '0 16px' }}>
                <label>Date & Time</label>
                <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#EFF6FF', padding: '12px', borderRadius: '14px', marginTop: '12px' ,marginBottom: '12px' }}>
                    <label>
                        {
                            now.toLocaleString ( 'en-GB', {
                                weekday: 'short',   //puts date and time in readable format
                                month: 'short',    
                                day: 'numeric',     
                                hour: 'numeric',    
                                minute: '2-digit',  
                                hour12: false        
                            }

                            )
                        }
                    </label>

                </div>
            </div>

            <div style={{fontSize: '14px', padding: '0 16px', marginBottom: '5px', color: '#0A0A0A'}}>
            <label>Rate your symptoms (0-5)</label>
            </div>

            <div style={{overflowY: 'scroll', padding: '0 16px'}}>
                
                {
                    
                symptoms.map((i, index) => (
                        <div key={i} style={{color: '#0A0A0A', fontSize: '14px',}}>

                            <div style={{ backgroundColor: '#EFF6FF', padding: '8px 12px 12px', borderRadius: '14px', marginBottom: '12px', flexDirection: 'column'}}>

                            
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <label>
                                {i}
                            </label>


                            
                            <div style={{}}>
                            <button style={{color:'#0A0A0A', background: '#EFF6FF', border: 'None'}} onClick={() => DecrementRates(index)}>—</button>
                            <label>{rating[index]} - {severity[rating[index]].rate}</label>
                            <button style={{color:'#0A0A0A', background: '#EFF6FF', border: 'None'}}  onClick={() => IncrementRates(index)}>+</button>
                            </div>

                            </div>

                              {/* outer div */}
                              <div style={{ padding: 0, background: '#E5E7EB', borderRadius: '14px', marginTop: '5px', overflow: 'hidden', height: '6px'}}>

                                {/* inner div */}
                                <div style={{width: `${(rating[index] /5) * 100}%` , background: '#3B82F6', height: '10px' }}>

                                </div>
                                {/* inner div */}

                                </div>
                                {/* outer div */}

                            </div>

                            
                           
                        </div>
                    ))
                }


            </div>
            




            <div style={{padding: '10px', display: 'flex', justifyContent: 'space-between'}}>
            <button onClick={onClose} style={{...theme.buttons, background: '#F3F4F6', width:'48%', height: '40px', borderRadius: '14px', color:'#364153' }}>Cancel</button>
            <button onClick={ () => onSave(rating)} style={{...theme.buttons, background: theme.buttons.buttongradient, width:'48%', height: '40px', borderRadius: '14px' }}>Log Symptoms</button>
            </div>
           
        </div>
    );

}