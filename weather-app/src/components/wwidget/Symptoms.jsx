import { useWeather } from "../../hooks/useWeather";
import { usePollen } from "../../hooks/usePollen";
import { theme } from "../../theme";
 
export default function SymptomTracker ({city = 'London'}) {
    const { current, hourly, daily, loading: wLoading, error: wError } = useWeather(city);
    const { daily: pollenDaily, loading: pLoading } = usePollen(city);
    return (
        <><div style={{...theme.card, width: '380px'}}>
            <button style={{...theme.buttons, background: theme.buttons.buttongradient, width:'339px', height: '40px', borderRadius: '14px'}}>Log Symptoms</button>
        </div>
        </>
    );
    
}