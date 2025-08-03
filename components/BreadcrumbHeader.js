import React from 'react';
import { ArrowLeft } from "lucide-react";
import { BsClock } from 'react-icons/bs';

const BreadcrumbHeader = ({ title = "Gym Registration - Employee Initiation" }) => {
  return (
    <>
      {/* Breadcrumbs - separate section above header */}
      <div style={{ fontSize: 12, color: 'black', marginBottom: 14, marginTop: 15, fontWeight: 400, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>
        My Workspace &gt; Gym Registration
      </div>

      {/* Header with Arrow + Title + Clock */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ArrowLeft size={24} color="#222" />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, fontSize: 20, color: '#1a1a1a', lineHeight: 1.2, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>
              Gym Registration
            </span>
            <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a', lineHeight: 1.2, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>
              - Employee Initiation
            </span>
          </div>
        </div>
        <BsClock size={28} color="#00B2FF" />
      </div>
    </>
  );
};

export default BreadcrumbHeader; 