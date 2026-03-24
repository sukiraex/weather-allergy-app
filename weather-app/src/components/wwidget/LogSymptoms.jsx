import { theme } from "../../theme";

export default function LogSymptoms(){
    return (
        <div style={{...theme.card, backgroundColor: '#FFFFFF', justifyContent: 'space-between', overflow: 'hidden', padding: 0, }}>
            <div style={{background: theme.buttons.buttongradient, padding: '24px 24px', display: 'flex', alignItems: 'center', gap: '1px', maxWidth: '100%', color: '#FFFFFF', flexDirection: 'column'}}>
                <h4 style={{margin: 0, textAlign: 'left', float: 'left', fontWeight: '400',}}>Log Symptoms</h4>
                <h5 style={{margin: 0, textAlign: 'left', float: 'left', fontWeight: '400'}}>Track how you're feeling</h5>
            </div>
            <button style={{...theme.buttons, background: '#F3F4F6', width:'50%', height: '40px', borderRadius: '14px', color:'#364153' }}>Cancel</button>

            <button style={{...theme.buttons, background: theme.buttons.buttongradient, width:'50%', height: '40px', borderRadius: '14px' }}>Log Symptoms</button>

        </div>
    );

}