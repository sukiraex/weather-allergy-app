import { useWeather } from "../../hooks/useWeather";
import { usePollen } from "../../hooks/usePollen";
import { theme } from "../../theme";
import trackericon from './icons/trackericon.png';
import emptycheck from './icons/emptycheck.png';
import tickedcheck from './icons/tickedcheck.png';

const getPollenColor = (label) => {
    switch (label) {
      case 'Low': return theme.warningcolours.Low;
      case 'Medium': return theme.warningcolours.Low;
      case 'High': return theme.warningcolours.Low;
      case 'Very High': return theme.warningcolours.Low;
      default: return theme.warningcolours.Muted;
    }
  };
 
export default function SymptomTracker ({city = 'London'}) {
    const { current, hourly, daily, loading: wLoading, error: wError } = useWeather(city);
    const { daily: pollenDaily, loading: pLoading } = usePollen(city);
    return (
        <><div style={{...theme.card, width: '375px', height: '380px' , textAlign: 'center', flexDirection: 'column'}}>
          
           <div style={{display: 'flex', justifyContent: 'space-between'}}>
           <h3 style={{margin: 0, textAlign: 'left', float: 'left'}}>Symptom Tracker</h3>
           <img src={trackericon}/>
           </div>

           <div>
            <img src={emptycheck}/>
            <span style={{}}>

            </span>

           </div>

        
            
            
            <button style={{...theme.buttons, background: theme.buttons.buttongradient, width:'375px', height: '40px', borderRadius: '14px'}}>Log Symptoms</button>

        </div>
        </>
    );
    
};