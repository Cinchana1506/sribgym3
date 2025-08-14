import React from 'react';
// styles consolidated globally in App
import { ArrowLeft } from "lucide-react";
import { BsClock } from 'react-icons/bs';

const BreadcrumbHeader = ({ title = "Gym Registration - Employee Initiation" }) => {
  return (
    <>
      {/* Breadcrumbs - separate section above header */}
      <div className="breadcrumb-text">
        My Workspace &gt; Gym Registration
      </div>

      {/* Header with Arrow + Title + Clock */}
      <div className="header-row">
        <div className="header-left">
          <ArrowLeft size={24} color="#222" />
          <div className="header-title">
            <span className="main">Gym Registration</span>
            <span className="sub">- Employee Initiation</span>
          </div>
        </div>
        <img src="/clock.png" className="clock-icon" alt="Clock" />
      </div>
    </>
  );
};

export default BreadcrumbHeader; 