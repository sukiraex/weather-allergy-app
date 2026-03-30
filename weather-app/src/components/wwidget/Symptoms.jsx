import { usePollen } from "../../hooks/usePollen";
import { theme } from "../../symptomtheme";
import trackericon from './icons/trackericon.svg';
import LogSymptoms from "./LogSymptoms";
import { useState } from "react";
import warning from './icons/warning.svg';




const symptoms = [
  {name: "Sneezing",},
  {name: "Runny Nose"},
  {name: "Itchy eyes"},
  {name: "Congestion"},
  {name: "Headache"},
  {name: "Fatigue"}
]




const getsymcolour = (label) => { //returns colour according to level
  switch (label) {
    case '—': return theme.warningcolours.None;
    case 'Low': return theme.warningcolours.Low;
    case 'Moderate': return theme.warningcolours.Medium;
    case 'High': return theme.warningcolours.High;
    case 'Very High': return theme.warningcolours.VeryHigh;
    case 'Severe': return theme.warningcolours.Severe;
    default: return theme.warningcolours.textMuted;
  }
}; 



const severity = ['—','Low', 'Moderate', 'High', 'Very High','Severe']

const isActive = (currentLabel) => {
  return currentLabel > 0
}; //will check if the rating user set is more than 0 


 
export default function SymptomTracker ({city = 'London'}) {

    const { overall: pollentoday} = usePollen(city);
    const [isOpen, setIsOpen] = useState(false); //checks if pop up is open
    const [SavedRate, setSavedRate] = useState([0,0,0,0,0,0]); //will be used to save the user's rating on the pop up

    const onSave = (current) => {
      setSavedRate(current);
      setIsOpen(false); //when saved, setsavedrate to current rating, then setisopen to false so pop up closes


    }



    return (
        <><div style={{...theme.card, width: '430px', height: '410px' , textAlign: 'center', flexDirection: 'column', position: 'relative'}}>
          
           <div style={{marginBottom: '40px', display: 'flex', justifyContent: 'space-between'}}>
           <h3 style={{margin: 0, textAlign: 'left', float: 'left', fontWeight: '500'}}>Symptom Tracker</h3>
           <img src={trackericon} style={{width: '22px', height: '22px'}} alt="calendar"/>
           </div>

        

           <div>
            {pollentoday && symptoms.map((i, index) => (
              <div key={i.name} style={{marginBottom: '12px', fontSize: '14px', display: 'flex', justifyContent: 'space-between' }}>
                
                <label style={theme.container}>
                  <input type="checkbox" checked= {isActive(SavedRate[index])} style={theme.input}/> 


                  {/* checks savedRate to see if user has rated their symptoms, if so checkbox is checked */}

                  <span style={{...theme.checkmark, ...(isActive(SavedRate[index])) ? theme.checkmarkChecked : {} }}>
                  { isActive(SavedRate[index]) && (
                      <svg
                      style={theme.checkmarkIcon}
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="2,7 5.5,10.5 12,3.5" />
                    </svg>
                  )}
                  </span>

                  <label style={{color: (isActive(SavedRate[index])) ? 'black' : 'grey'}}>
                {i.name}
                </label>

                </label>

                <span style={{color: getsymcolour(severity[SavedRate[index]])}}>{severity[SavedRate[index]]}</span>


              </div>
            ))}
           


           </div>

          
           <div  style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', width: '95%', display: 'flex', flexDirection: 'column', gap: '8px'}}>

           {SavedRate.some(r => r >= 3) && (
             <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>

             <div style={{background: '#FFF7ED', width:'95%', borderRadius: '14px', border: '1px solid #FFD6A8', }}>
           
              <div style={{padding: '10px', textAlign: 'left'}}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '4px' }} >
              <img src={warning} alt="warning" style={{width: '14px', height: '14px'}}/>
              <label style={{fontSize: '12px', fontWeight: '600'}}>Today's Status</label>
              </div>
  
              <label style={{fontSize: '12px', fontWeight: '400', marginLeft: '20px'}}>High symptoms today, stay indoors and take medication</label>
              </div>
  
  
             </div>
  
             </div>
           ) }
          

           <div>
           <button onClick={() => setIsOpen(true) } style={{...theme.buttons, background: theme.buttons.buttongradient, width:'95%', height: '40px', borderRadius: '14px'}}>Log Symptoms</button>
            </div>

            </div>
            {
            isOpen && (
              <div style={{  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <LogSymptoms onClose={() => setIsOpen(false)} onSave={onSave} savedRate={SavedRate} />
              </div>
            )
           }





        </div>
        </>
    );
    
};

