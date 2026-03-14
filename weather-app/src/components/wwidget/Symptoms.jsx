import { useWeather } from "../../hooks/useWeather";
import { usePollen } from "../../hooks/usePollen";
import { theme } from "../../theme";

const getPollenLevel = (label) => {
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
        <><div style={{...theme.card, width: '380px', textAlign: 'center'}}>
            <span>
            <h3 style={{textAlign: 'left'}}>Symptom Tracker</h3>
            <img src={"weather-allergy-app/weather-app/src/components/wwidget/icons/trackericon.svg"}/>
            </span>
            
            <button style={{...theme.buttons, background: theme.buttons.buttongradient, width:'339px', height: '40px', borderRadius: '14px'}}>Log Symptoms</button>

        </div>
        </>
    );
    
};