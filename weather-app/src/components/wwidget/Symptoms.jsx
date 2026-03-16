import { useWeather } from "../../hooks/useWeather";
import { usePollen } from "../../hooks/usePollen";
import { theme } from "../../theme";
import trackericon from './icons/trackericon.svg';
import emptycheck from './icons/emptycheck.png';
import tickedcheck from './icons/tickedcheck.png';



const symptoms = [
  {name: "Sneezing", threshold: "Low"},
  {name: "Runny Nose", threshold: "Low"},
  {name: "Itchy eyes", threshold: "Medium"},
  {name: "Congestion", threshold: "Medium"},
  {name: "Headache", threshold: "High"},
  {name: "Fatigue", threshold: "Very High"}
]


const levels = ["Low", "Medium", "High", "Very High"]
const symptomlvl = ["Low", "Moderate", "High"]

const getsymptomseverity = (plevel, x) => {
  switch (plevel) {
    case 'Low' : if (x >=0 && x<3) return 'Low';
     else if (x >=3 && x < 5 ) return 'Moderate'; 
     else return "High";
    case 'Medium': if (x >=4 && x<5)  return 'Low'; 
    else if (x >=5 && x < 6 ) return 'Moderate';
     else return "High";
    case 'High': if (x >=6 && x<7) return 'Low';
     else if (x >=7 && x < 8 ) return 'Moderate';
      else return "High";
    case 'Very High': if (x >=8 && x<9) return 'Low';
     else if (x >=9 && x < 10 ) return 'Moderate';
      else if (x >=10) return 'Very High';
      default: return 'Low'
  }
}

const getsymcolour = (label) => {
  switch (label) {
    case 'Low': return theme.warningcolours.Low;
    case 'Moderate': return theme.warningcolours.Medium;
    case 'High': return theme.warningcolours.High;
    case 'Very High': return theme.warningcolours.VeryHigh;
    default: return theme.warningcolours.textMuted;
  }
};

const isActive = (symptomThreshold, currentLabel) => {
  return levels.indexOf(currentLabel) >= levels.indexOf(symptomThreshold);
};

// const highmodlow = () =


 
export default function SymptomTracker ({city = 'London'}) {
  // const { current, hourly, daily, loading: wLoading, error: wError } = useWeather(city);
    const { overall: pollentoday, loading: pLoading } = usePollen(city);
    // const symlevels = (x) => {
    //   if (pollentoday.score >= 0 || pollentoday.score <4) {
    //     x = "Low"
    //     return x

    //   }
    //   else if (pollentoday.score >= 4 || pollentoday.score < 6 ) {
    //     x = 
    //   }
      

    // }
    return (
        <><div style={{...theme.card, width: '375px', height: '380px' , textAlign: 'center', flexDirection: 'column', position: 'relative'}}>
          
           <div style={{marginBottom: '40px', display: 'flex', justifyContent: 'space-between'}}>
           <h3 style={{margin: 0, textAlign: 'left', float: 'left', fontWeight: '500'}}>Symptom Tracker</h3>
           <img src={trackericon} style={{width: '22px', height: '22px'}}/>
           </div>

           <div style={{flexDirection: 'column'}}>
           
           
        

           </div>

           <div>
            {pollentoday && symptoms.map((i) => (
              <div key={i.name} style={{marginBottom: '12px', fontSize: '14px' , color: isActive(i.threshold, pollentoday.label) ? 'black' : 'grey' , display: 'flex', justifyContent: 'space-between'}}>
                <label>
                {i.name}
                </label>
                <span style={{color: isActive(i.threshold, pollentoday.label) ? getsymcolour(getsymptomseverity(pollentoday.label, pollentoday.score)) : 'grey' }}>{isActive(i.threshold, pollentoday.label) ? getsymptomseverity(pollentoday.label, pollentoday.score) : '——'}</span>
                

              </div>
            ))}
           
 
           </div>
           <div></div>
            <button style={{...theme.buttons, background: theme.buttons.buttongradient, width:'375px', height: '40px', borderRadius: '14px', position: 'relative', bottom: 0}}>Log Symptoms</button>


            





        </div>
        </>
    );
    
};