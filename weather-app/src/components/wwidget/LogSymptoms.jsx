import { theme } from "../../theme";

export default function LogSymptoms(){
    return (
        <div style={{...theme.card, backgroundColor: '#FFFFFF', justifyContent: 'space-between'}}>
            <div style={{background: theme.buttons.buttongradient}}>hi</div>
            <button style={{...theme.buttons, background: '#F3F4F6', width:'50%', height: '40px', borderRadius: '14px', color:'#364153' }}>Cancel</button>

            <button style={{...theme.buttons, background: theme.buttons.buttongradient, width:'50%', height: '40px', borderRadius: '14px' }}>Log Symptoms</button>

        </div>
    );

}