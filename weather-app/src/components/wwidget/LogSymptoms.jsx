import { theme } from "../../symptomtheme";
import { useState } from "react";
import  circle  from "./icons/Container.svg"
import plus from "./icons/Button.svg";
import minus from "./icons/Icon.svg";

const symptoms = ["Sneezing", "Runny Nose", "Itchy Eyes", "Congestion", "Headache", "Fatigue"];
const severity = ['None','Low', 'Moderate', 'High', 'Very High','Severe']






export default function LogSymptoms({ onClose, onSave, savedRate, pollenLevel}){

    const getPollenGradient = (level) => {
        switch (level) {
            case 'Low':
                return 'linear-gradient(to right, #59C08D, #4CAF50)';
            case 'Medium':
            case 'Moderate':
                return 'linear-gradient(to right, #c1cb45, #FFC107)';
            case 'High':
                return 'linear-gradient(to right, #F4A021, #EA7B7E, #CA448B)';
            case 'Very High':
            case 'Severe':
                return 'linear-gradient(to right, #D96B6E, #CA448B)';
            default:
                return 'linear-gradient(to right, #D96B6E, #CA448B)';
        }
    };

    const gradient = getPollenGradient(pollenLevel);

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
        
        <div style={{...theme.card, backgroundColor: 'var(--widget-bg)' , overflow: 'hidden', padding: 0, width: 'min(340px, 100%)', boxSizing: 'border-box', textAlign: 'left'}}> {/* clip to div */}
            <div style={{background: gradient, padding: '24px 24px', display: 'flex', gap: '1px', maxWidth: '100%', color: '#FFFFFF', position: 'relative'   }}>

                <img src={circle} alt="circle"  style={{width: '45px', height: '45px'}}/>
                <div style={{flexDirection: 'column', display:'flex', marginLeft: '10px'}}>
                <h3 style={{margin: 0, float: 'left', fontWeight: '500', marginBottom: '3px'}}>Log Symptoms</h3>
                <h5 style={{margin: 0, float: 'left', fontWeight: '400'}}>Track how you're feeling</h5>
                </div>
            </div>

            <div style={{color: 'var(--widget-text)', fontSize: '14px', marginTop: '12px', padding: '0 16px' }}>
                <label>Date & Time</label>
                <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--bg-input)', padding: '12px', borderRadius: '14px', marginTop: '12px' ,marginBottom: '15px' }}>
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

            <div style={{fontSize: '14px', padding: '0 16px', marginBottom: '8px', color: 'var(--widget-text)'}}>
            <label>Rate your symptoms (0-5)</label>
            </div>

            <div style={{ padding: '0 16px'}}> 

            {/* maps symptoms so can be shown without having to create multiple labels and divs for each symptom */}
                
                {
                    
                symptoms.map((i, index) => (
                        <div key={i} style={{color: 'var(--widget-text)', fontSize: '14px',}}>

                            <div style={{ backgroundColor: 'var(--bg-input)', padding: '8px 12px 12px', borderRadius: '14px', marginBottom: '12px', flexDirection: 'column'}}>

                            
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <label>
                                {i}
                            </label>


                            
                            <div style={{display: 'flex', alignItems: 'center' }}>
                            <button style={{color:'var(--widget-text)', background: 'var(--bg-input)', border: 'None'}} onClick={() => DecrementRates(index)}>
                            <img src={minus} alt="minus" style={{verticalAlign: 'middle', }}/>
                            </button>
                            <label style={{width: '110px', textAlign: 'center'}}>{rating[index]} - {severity[rating[index]]}</label>
                            <button style={{color:'var(--widget-text)', background: 'var(--bg-input)', border: 'None'}}  onClick={() => IncrementRates(index)}>
                            <img src={plus} alt="plus" style={{verticalAlign: 'middle', width: '20px', height: '20px'}}/>
                            </button>
                            </div>

                            </div>

                            {/* rating system that works similar to a progress bar, the outer div has the full width, and the inner div's width changes according to the user rating */}

                              {/* outer div */}
                              <div style={{ padding: 0, background: 'var(--bg-input)', borderRadius: '14px', marginTop: '5px', overflow: 'hidden', height: '6px'}}>

                                {/* inner div */}
                                <div style={{width: `${(rating[index] /5) * 100}%` , background: 'var(--accent)', height: '10px' }}>

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
                {/* closes without saving */}
            <button onClick={onClose} style={{...theme.buttons, background: 'var(--bg-input)', width:'48%', height: '40px', borderRadius: '14px', color:'var(--widget-text)' }}>Cancel</button>
            {/* saves rating  */}
            <button onClick={ () => onSave(rating)} style={{...theme.buttons, background: gradient, width:'48%', height: '40px', borderRadius: '14px' }}>Log Symptoms</button>
            </div>
           
        </div>
    );

}