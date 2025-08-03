import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import EmployeeSubmissionForm from './components/EmployeeSubmissionForm';
import EmployeeDeregistrationFormGym from './components/EmployeeDeregistrationFormGym';
import EmployeeDeregistrationFormGroupExercise from './components/EmployeeDeregistrationFormGroupExercise';
import GAApprovalForm from './components/GAApprovalForm';
import GAApprovalFormGroupExercise from './components/GAApprovalFormGroupExercise';
import GADeregistrationApprovalFormGym from './components/GADeregistrationApprovalFormGym';
import GADeregistrationApprovalFormGroupExercise from './components/GADeregistrationApprovalFormGroupExercise';
import ReportFormGym from './components/ReportFormGym';
import ReportFormGroupExercise from './components/ReportFormGroupExercise';
import ReportDeregistrationFormGym from './components/ReportDeregistrationFormGym';
import ReportDeregistrationFormGroupExercise from './components/ReportDeregistrationFormGroupExercise';
import ViewPolicies from './components/ViewPolicies';

// View Policies icon
const viewPoliciesIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8, verticalAlign: 'middle' }}>
    <rect x="4" y="2" width="16" height="20" rx="2" stroke="#606060" strokeWidth="2" fill="none" />
    <line x1="8" y1="6" x2="16" y2="6" stroke="#606060" strokeWidth="2" />
    <line x1="8" y1="10" x2="16" y2="10" stroke="#606060" strokeWidth="2" />
    <line x1="8" y1="14" x2="12" y2="14" stroke="#606060" strokeWidth="2" />
  </svg>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavigationBar />
        <main className="main-content">
          <Routes>
            <Route path="/employee" element={<EmployeeSubmissionForm />} />
            <Route path="/employee-deregistration-gym" element={<EmployeeDeregistrationFormGym />} />
            <Route path="/employee-deregistration-group-exercise" element={<EmployeeDeregistrationFormGroupExercise />} />
            <Route path="/ga-approval" element={<GAApprovalForm />} />
            <Route path="/ga-approval-group-exercise" element={<GAApprovalFormGroupExercise />} />
            <Route path="/ga-deregistration-approval-gym" element={<GADeregistrationApprovalFormGym />} />
            <Route path="/ga-deregistration-approval-group-exercise" element={<GADeregistrationApprovalFormGroupExercise />} />
            <Route path="/report-gym" element={<ReportFormGym />} />
            <Route path="/report-group-exercise" element={<ReportFormGroupExercise />} />
            <Route path="/report-deregistration-gym" element={<ReportDeregistrationFormGym />} />
            <Route path="/report-deregistration-group-exercise" element={<ReportDeregistrationFormGroupExercise />} />
            <Route path="/" element={<Navigate to="/employee" replace />} />
          </Routes>
          <ViewPolicies />
        </main>
      </div>
    </Router>
  );
}

export default App;
