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
      <style>
        {`
          .nav-button {
            cursor: pointer !important;
          }
          .nav-button:hover {
            cursor: pointer !important;
          }
          .nav-icon {
            cursor: pointer !important;
            pointer-events: auto !important;
          }
          .nav-icon:hover {
            cursor: pointer !important;
          }
          .nav-icon svg {
            cursor: pointer !important;
            pointer-events: auto !important;
          }
        `}
      </style>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e7eb',
        fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif",
        position: 'relative',
      }}>
        {/* Left side - Logo, Hamburger, Workspace selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div 
            onClick={handleMenuClick}
            className="nav-button nav-icon"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease'
            }}
            title="Menu"
            onMouseEnter={(e) => {
              e.target.style.cursor = 'pointer';
              e.target.style.opacity = '0.7';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '1';
            }}
          >
            <Menu size={24} color="#6B7280" />
          </div>
          <span style={{ fontWeight: 500, fontSize: 18, color: '#202224', letterSpacing: 0.2 }}>Nest</span>

          {/* Workspace selector pills */}
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative', marginLeft: 16 }}>
            <button 
              onClick={handleWorkspaceClick}
              className="nav-button"
              style={{
                background: 'linear-gradient(160deg, #00C3F0 0%, #00AEE9 100%)',
                color: '#fff',
                fontSize: 14,
                padding: '8px 16px',
                borderRadius: 20,
                position: 'relative',
                zIndex: 2,
                fontWeight: 500,
                boxShadow: '0 1px 3px rgba(0, 195, 240, 0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              title="My Workspace"
              onMouseEnter={(e) => {
                e.target.style.cursor = 'pointer';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 2px 8px rgba(0, 195, 240, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 195, 240, 0.3)';
              }}
            >
              My Workspace
            </button>
            <button 
              onClick={handleManagerHubClick}
              className="nav-button"
              style={{
                background: '#F3F3F3',
                color: '#6B7280',
                fontSize: 14,
                padding: '8px 16px',
                borderRadius: 20,
                position: 'relative',
                marginLeft: -4,
                zIndex: 1,
                fontWeight: 500,
                border: '1px solid #E5E7EB',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease, transform 0.2s ease'
              }}
              title="Manager Hub"
              onMouseEnter={(e) => {
                e.target.style.cursor = 'pointer';
                e.target.style.backgroundColor = '#E5E7EB';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#F3F3F3';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Manager Hub
            </button>
          </div>
        </div>

        {/* Right side - Menu icons, Notification bell and profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Menu icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Light Blue Oval with Search Icons */}
            <div style={{
              background: '#E3F2FD',
              borderRadius: '20px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid #BBDEFB'
            }}>
              <div 
                onClick={handleSearchClick}
                className="nav-button nav-icon"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease'
                }}
                title="Search"
                onMouseEnter={(e) => {
                  e.target.style.cursor = 'pointer';
                  e.target.style.opacity = '0.7';
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '1';
                }}
              >
                <Search size={18} color="#1976D2" />
              </div>
              <div 
                onClick={handleUserSearchClick}
                className="nav-button nav-icon"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease'
                }}
                title="User Search"
                onMouseEnter={(e) => {
                  e.target.style.cursor = 'pointer';
                  e.target.style.opacity = '0.7';
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '1';
                }}
              >
                <UserSearch size={18} color="#1976D2" />
              </div>
            </div>
            <div 
              onClick={handleCalendarClick}
              className="nav-button nav-icon"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease'
              }}
              title="Calendar"
              onMouseEnter={(e) => {
                e.target.style.cursor = 'pointer';
                e.target.style.opacity = '0.7';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1';
              }}
            >
              <Calendar size={20} color="#6B7280" />
            </div>
            <div 
              onClick={handlePencilClick}
              className="nav-button nav-icon"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease'
              }}
              title="Edit"
              onMouseEnter={(e) => {
                e.target.style.cursor = 'pointer';
                e.target.style.opacity = '0.7';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1';
              }}
            >
              <PencilLine size={20} color="#6B7280" />
            </div>
            <div 
              onClick={handleKeyClick}
              className="nav-button nav-icon"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease'
              }}
              title="Key"
              onMouseEnter={(e) => {
                e.target.style.cursor = 'pointer';
                e.target.style.opacity = '0.7';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1';
              }}
            >
              <KeyRound size={20} color="#6B7280" />
            </div>
            <div 
              onClick={handleBookmarkClick}
              className="nav-button nav-icon"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease'
              }}
              title="Bookmark"
              onMouseEnter={(e) => {
                e.target.style.cursor = 'pointer';
                e.target.style.opacity = '0.7';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1';
              }}
            >
              <Bookmark size={20} color="#6B7280" />
            </div>
            <div 
              onClick={handleGridClick}
              className="nav-button nav-icon"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease'
              }}
              title="Grid"
              onMouseEnter={(e) => {
                e.target.style.cursor = 'pointer';
                e.target.style.opacity = '0.7';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1';
              }}
            >
              <Grid2X2 size={20} color="#6B7280" />
            </div>
          </div>

          {/* Bell icon */}
          <div 
            onClick={handleBellClick}
            className="nav-button nav-icon"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease'
            }}
            title="Notifications"
            onMouseEnter={(e) => {
              e.target.style.cursor = 'pointer';
              e.target.style.opacity = '0.7';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '1';
            }}
          >
            <Bell size={20} color="#6B7280" />
          </div>

          {/* Profile info */}
          <button 
            onClick={handleProfileClick}
            className="nav-button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: '#fff',
              borderRadius: 24,
              padding: '6px 16px 6px 6px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E5E7EB',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s ease, transform 0.2s ease'
            }}
            title="Profile"
            onMouseEnter={(e) => {
              e.target.style.cursor = 'pointer';
              e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              e.target.style.transform = 'scale(1)';
            }}
          >
                                    <img
                          src="/samsungimage.png"
                          alt="Profile"
                          style={{
                            borderRadius: '50%',
                            width: 32,
                            height: 32,
                            border: '2px solid #E5E7EB',
                            objectFit: 'cover'
                          }}
                        />
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <span style={{ fontWeight: 600, fontSize: 14, color: '#202224', lineHeight: 1.2 }}>Manoj Kandan M</span>
                          <span style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.2 }}>Sr. Developer</span>
                        </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default NavigationBar; 