import React, { useState } from 'react';
import { DeclarationCheckbox } from './ReusableComponents';

const Declarations = () => {
  const [declarations, setDeclarations] = useState({
    responsibility: true,
    dosAndDonts: true,
    paymentGuidelines: true
  });

  const handleDeclarationChange = (key) => {
    setDeclarations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <section style={{ background: 'none', padding: '0', margin: 0, borderRadius: 0, boxShadow: 'none', width: '100%', fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>
      <div style={{ fontWeight: 700, color: '#202224', fontSize: 16, marginBottom: 16, padding: 0, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Employee Self Declaration</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 0, width: '100%' }}>
        <DeclarationCheckbox
          label="I hereby declare to take full responsibility of any incidents caused during workout sessions."
          checked={declarations.responsibility}
          onChange={() => handleDeclarationChange('responsibility')}
        />
        <DeclarationCheckbox
          label={
            <>
              I hereby declare, that I have read the <a href="#" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 500 }}>Do's and Don'ts</a> on using the SRI-B Gymnasium.
            </>
          }
          checked={declarations.dosAndDonts}
          onChange={() => handleDeclarationChange('dosAndDonts')}
        />
        <DeclarationCheckbox
          label={
            <>
              I hereby declare, that I have read the <a href="#" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 500 }}>OS Employees payment guidelines</a>.
            </>
          }
          checked={declarations.paymentGuidelines}
          onChange={() => handleDeclarationChange('paymentGuidelines')}
        />
      </div>
    </section>
  );
};

export default Declarations; 