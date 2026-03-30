import { usePollen } from "../../hooks/usePollen";
import { theme } from "../../symptomtheme";
import trackericon from './icons/trackericon.svg';
import LogSymptoms from "./LogSymptoms";
import { useState } from "react";




const symptoms = [
  {name: "Sneezing", threshold: "Low"},
  {name: "Runny Nose", threshold: "Low"},
  {name: "Itchy eyes", threshold: "Medium"},
  {name: "Congestion", threshold: "Medium"},
  {name: "Headache", threshold: "High"},
  {name: "Fatigue", threshold: "Very High"}
]


const levels = ["Low", "Medium", "High", "Very High"]

const getsymptomseverity = (name, x) => {
  switch (name) {
    case 'Sneezing' : if (x >=0 && x<4) return 'Low';
     else if (x >=4 && x < 7 ) return 'Moderate'; 
     else return "High";

     case 'Runny Nose' : if (x >=0 && x<4) return 'Low';
     else if (x >=4 && x < 7 ) return 'Moderate'; 
     else return "High";

    case 'Itchy eyes':  if (x >=4 && x<7)  return 'Low'; 
    else if (x >=7 && x < 8 ) return 'Moderate';
     else return "High";

     case 'Congestion': if (x >=4 && x<7)  return 'Low'; 
    else if (x >=7 && x < 8 ) return 'Moderate';
     else return "High";

    case 'Headache': if (x >=6 && x<8) return 'Low';
     else if (x >=8 && x < 9 ) return 'Moderate';
      else return "High";

    case 'Fatigue': if (x >=8 && x<9) return 'Low';
     else if (x >=9 && x < 10 ) return 'Moderate';
      else return 'High';
      
    default: return 'Low'
  }
}

const getsymcolour = (label) => {
  switch (label) {
    case 'Low': return theme.warningcolours.Low;
    case 'Moderate': return theme.warningcolours.Medium;
    case 'High': return theme.warningcolours.VeryHigh;
    default: return theme.warningcolours.textMuted;
  }
};

const isActive = (symptomThreshold, currentLabel) => {
  return levels.indexOf(currentLabel) >= levels.indexOf(symptomThreshold);
};


 
export default function SymptomTracker ({city = 'London'}) {

    const { overall: pollentoday} = usePollen(city);
    const [isOpen, setIsOpen] = useState(false);
    const [SavedRate, setSavedRate] = useState([0,0,0,0,0,0]);
    const onSave = (current) => {
      setSavedRate(current);
      setIsOpen(false);


    }


    return (
        <><div style={{...theme.card, width: '430px', height: '410px' , textAlign: 'center', flexDirection: 'column', position: 'relative'}}>
          
           <div style={{marginBottom: '40px', display: 'flex', justifyContent: 'space-between'}}>
           <h3 style={{margin: 0, textAlign: 'left', float: 'left', fontWeight: '500'}}>Symptom Tracker</h3>
           <img src={trackericon} style={{width: '22px', height: '22px'}} alt="calendar"/>
           </div>

        

           <div>
            {pollentoday && symptoms.map((i) => (
              <div key={i.name} style={{marginBottom: '12px', fontSize: '14px' , color: isActive(i.threshold, pollentoday.label) ? 'black' : 'grey' , display: 'flex' , justifyContent: 'space-between'}}>
                
                <label style={theme.container}>
                  <input type="checkbox" readOnly checked={ isActive(i.threshold, pollentoday.label)} style={theme.input}/>
                  <span style={{...theme.checkmark,...(isActive(i.threshold, pollentoday.label) ? theme.checkmarkChecked : {}) }}>
                  {isActive(i.threshold, pollentoday.label) && (
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
                {i.name}

                </label>
                <span style={{color: isActive(i.threshold, pollentoday.label) ? getsymcolour(getsymptomseverity(i.name, pollentoday.score)) : 'grey' }}>{isActive(i.threshold, pollentoday.label) ? getsymptomseverity(i.name, pollentoday.score) : '—'}</span>


              </div>
            ))}
           


           </div>
           

           <button onClick={() => setIsOpen(true) } style={{...theme.buttons, background: theme.buttons.buttongradient, width:'95%', height: '40px', borderRadius: '14px', position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)'}}>Log Symptoms</button>
           {
            isOpen && (
              <div style={{  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <LogSymptoms onClose={() => setIsOpen(false)} onSave={onSave} savedRate={SavedRate}/>
              </div>
            )
           }
            





        </div>
        </>
    );
    
};

