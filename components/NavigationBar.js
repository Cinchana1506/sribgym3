import React from 'react';
import {
  Menu,
  Search,
  UserSearch,
  Calendar,
  PencilLine,
  KeyRound,
  Bookmark,
  Grid2X2,
  Bell
} from 'lucide-react';
// consolidated styles imported globally in App

const NavigationBar = () => {
  const handleMenuClick = () => {
    console.log('Menu clicked');
    // Add your menu functionality here
  };

  const handleSearchClick = () => {
    console.log('Search clicked');
    // Add your search functionality here
  };

  const handleUserSearchClick = () => {
    console.log('User Search clicked');
    // Add your user search functionality here
  };

  const handleCalendarClick = () => {
    console.log('Calendar clicked');
    // Add your calendar functionality here
  };

  const handlePencilClick = () => {
    console.log('Pencil clicked');
    // Add your pencil functionality here
  };

  const handleKeyClick = () => {
    console.log('Key clicked');
    // Add your key functionality here
  };

  const handleBookmarkClick = () => {
    console.log('Bookmark clicked');
    // Add your bookmark functionality here
  };

  const handleGridClick = () => {
    console.log('Grid clicked');
    // Add your grid functionality here
  };

  const handleBellClick = () => {
    console.log('Bell clicked');
    // Add your bell functionality here
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
    // Add your profile functionality here
  };

  const handleWorkspaceClick = () => {
    console.log('My Workspace clicked');
    // Add your workspace functionality here
  };

  const handleManagerHubClick = () => {
    console.log('Manager Hub clicked');
    // Add your manager hub functionality here
  };

  return (
    <>
      <div className="navbar">
        {/* Left side - Logo, Hamburger, Workspace selector */}
        <div className="navbar-left">
          <div 
            onClick={handleMenuClick}
            className="nav-button nav-icon icon-button"
            title="Menu"
          >
            <Menu size={24} color="#6B7280" />
          </div>
          <span className="brand-title">Nest</span>

          {/* Workspace selector pills */}
          <div className="workspace-pills">
            <button 
              onClick={handleWorkspaceClick}
              className="nav-button pill-primary"
              title="My Workspace"
            >
              My Workspace
            </button>
            <button 
              onClick={handleManagerHubClick}
              className="nav-button pill-secondary"
              title="Manager Hub"
            >
              Manager Hub
            </button>
          </div>
        </div>

        {/* Right side - Menu icons, Notification bell and profile */}
        <div className="navbar-right">
          {/* Menu icons */}
          <div className="icon-row">
            {/* Light Blue Oval with Search Icons */}
            <div className="blue-oval">
              <div 
                onClick={handleSearchClick}
                className="nav-button nav-icon icon-button"
                title="Search"
              >
                <Search size={18} color="#1976D2" />
              </div>
              <div 
                onClick={handleUserSearchClick}
                className="nav-button nav-icon icon-button"
                title="User Search"
              >
                <UserSearch size={18} color="#1976D2" />
              </div>
            </div>
            <div 
              onClick={handleCalendarClick}
              className="nav-button nav-icon icon-button"
              title="Calendar"
            >
              <Calendar size={20} color="#6B7280" />
            </div>
            <div 
              onClick={handlePencilClick}
              className="nav-button nav-icon icon-button"
              title="Edit"
            >
              <PencilLine size={20} color="#6B7280" />
            </div>
            <div 
              onClick={handleKeyClick}
              className="nav-button nav-icon icon-button"
              title="Key"
            >
              <KeyRound size={20} color="#6B7280" />
            </div>
            <div 
              onClick={handleBookmarkClick}
              className="nav-button nav-icon icon-button"
              title="Bookmark"
            >
              <Bookmark size={20} color="#6B7280" />
            </div>
            <div 
              onClick={handleGridClick}
              className="nav-button nav-icon icon-button"
              title="Grid"
            >
              <Grid2X2 size={20} color="#6B7280" />
            </div>
          </div>

          {/* Bell icon */}
          <div 
            onClick={handleBellClick}
            className="nav-button nav-icon icon-button"
            title="Notifications"
          >
            <Bell size={20} color="#6B7280" />
          </div>

          {/* Profile info */}
          <button 
            onClick={handleProfileClick}
            className="nav-button profile-button"
            title="Profile"
          >
            <img
              src="/samsungimage.png"
              alt="Profile"
              className="profile-avatar"
            />
            <div className="profile-name">
              <span className="primary">Manoj Kandan M</span>
              <span className="secondary">Sr. Developer</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default NavigationBar; 