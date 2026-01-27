import React,{useState, useRef, useEffect} from 'react'
import styles from './header.module.css';
import headerlogo from '../assets/Cricket Club Logo.png';
import arrow from '../assets/arrow right 24px.png';

export default function Header( {club}) {
  const [showClubInfo, setShowClubInfo] = useState(false);
  const [showUpdateClub, setShowUpdateClub] = useState(false)
  const [openmenu, setOpenMenu] =  useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const headerRef = useRef(null)

  useEffect(()=>{
    const handleClickOutside = (e) => {
      if(headerRef.current&& !headerRef.current.contains(e.target)){
        setOpenMenu(null);
        setOpenSubMenu(null);
      }
    }
    document.addEventListener("mousedown",handleClickOutside);
    return () => 
      document.removeEventListener('mousedown',handleClickOutside);
  },[])

  const toggleMenu = (menu) => {
    setOpenMenu((prev)=> (prev === menu ? null : menu))
    setOpenSubMenu(null);
  }

  const toggleSubMenu = (submenu) => {
    setOpenSubMenu((prev)=> (prev === submenu ?  null : submenu))
  }

  const handleUpdateClubInformation = (e) => {
    e.preventDefault();
    e.stopPropagation()
    setShowUpdateClub(!showUpdateClub)
    toggleSubMenu('club-update')
  }

  const handleManageClubInformation = (e) => {
    e.preventDefault();
    e.stopPropagation()
    setShowUpdateClub(!showUpdateClub)
    toggleSubMenu('manage-club')
  }

  const handleManageMembers = (e) => {
    e.preventDefault();
    e.stopPropagation()
    setShowUpdateClub(!showUpdateClub)
    toggleSubMenu('manage-members')
  }

  const clubName = 'annatest';
  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom" style={{backgroundColor:'#F0F2F7', fontSize:"15px", padding:'0px'}} ref={headerRef}>
      <div className='container-fluid px-4'>
        <span className='navbar-brand d-none d-lg-flex align-items-center'>
        <img src={headerlogo} alt="logo" width="44px" height="44px" style={{border:"2px"}} className='mr-2'/>
        <span className='text-nowrap' style={{fontFamily:'GT Walsheim Trial',fontWeight:800,fontSize:'20px',color:'#0B416A',lineHeight:'100%', marginRight:'10px'}}>{club}</span>
        </span>
        <div className='d-flex d-lg-none justify-content-between align-items-center'>
          <div className='navbar-toggler' type="button" data-toggle="collapse" data-target="#mainNavbar" style={{marginRight:"20%"}}>
            <span className='navbar-toggler-icon'></span>
          </div>
          <div className='text-nowrap' style={{fontFamily:'GT Walsheim Trial',fontWeight:800,fontSize:'20px',color:'#0B416A',lineHeight:'100%', marginRight:'10px'}}>{club}</div>
        </div>
        <div className='collapse navbar-collapse' id="mainNavbar">
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item text-nowrap'><a href="https://annatest.play-cricket.com/site_admin/home" className='nav-link'>ACTION CENTER</a></li>
            <li className={`nav-item text-nowrap dropdown ${openmenu === 'fixture' ? 'show' : null}`}>
              <a her="#" className={`nav-link custom-toggle dropdown-toggle ${styles.ct}`} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>{toggleMenu("fixture")}}>FIXTURE & RESULTS
                <img src={arrow} alt="arrow" width="18px" height="18px" className={`arrow ${styles.arrow}`}/>
              </a>

              <div className={`dropdown-menu ${openmenu === 'fixture' ? 'show' : null}`} aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href={`https://${clubName}.play-cricket.com/site_admin/matches`}>Manage Fixures</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/results">Confirm Results</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/player_availability/fixtures?email=false">Request Player Availability</a>
              </div>
            </li>
            <li className={`nav-item text-nowrap dropdown ${openmenu === 'club' ? 'show' : ''}`}>
              <a her="#" className={`nav-link custom-toggle dropdown-toggle ${styles.ct}`} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>{toggleMenu('club');setShowClubInfo(!showClubInfo);setShowUpdateClub(false);}}>CLUB
                <img src={arrow} alt="arrow" width="18px" height="18px" className={`arrow ${styles.arrow}`}/>
              </a>

              <ul class={`dropdown-menu ${openmenu === 'club' ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                <li>
                  <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct}`} onClick={handleUpdateClubInformation} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Update Club Information <span><svg className={`arrow ${openSubMenu === 'club-update' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                    </svg>
                  </span></a>
                  {openSubMenu === 'club-update' && (
                  <ul className='list-unstyled m-0 p-0'>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/about_us/club_details"><span>-</span>Club details</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/about_us/playing_facilities"><span>-</span>Playing locations</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/document_library/articles/index"><span>-</span>Documents</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/document_library/articles/index"><span>-</span>Sponsers</a></li>
                  </ul>
                  )}
                </li>
                <li>
                  <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct}`} onClick={handleManageClubInformation} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Manage Club Content <span><svg className={`arrow ${openSubMenu === 'manage-club' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                    </svg>
                    </span>
                  </a>
                  {openSubMenu === 'manage-club' && (
                  <ul className='list-unstyled m-0 p-0'>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/news_articles/news_articles/index"><span>- </span>News</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/photos"><span>- </span>Photo gallery</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/videos"><span>- </span>Video gallery</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/videos"><span>- </span>Noticeboard</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/website_configurations/announcements"><span>-</span>Announcements</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/calendar"><span>- </span>Club calender</a></li>
                  </ul>
                  )}
                </li>
                <li><a class="dropdown-item" href="https://annatest.play-cricket.com/site_admin/website_configurations/home_page">Customise Club Website</a></li>
              </ul>
            </li>
            <li className={`nav-item text-nowrap dropdown ${openmenu === 'people' ? 'show' : ''}`}>
              <a her="#" className={`nav-link custom-toggle dropdown-toggle ${styles.ct}`} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>{toggleMenu('people');setShowClubInfo(!showClubInfo);setShowUpdateClub(false);}}>PEOPLE
                <img src={arrow} alt="arrow" width="18px" height="18px" className={`arrow ${styles.arrow}`}/>
              </a>

              <ul class={`dropdown-menu ${openmenu === 'people' ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                 <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/about_us/officials">Appoint Committe & volunteers</a></li>
                <li>
                  <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct}`} onClick={handleManageMembers} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Manage Members <span><svg className={`arrow ${openSubMenu === 'manage-members' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                    </svg>
                  </span></a>
                  {openSubMenu === 'manage-members' && (
                  <ul className='list-unstyled m-0 p-0'>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/users?initial=true"><span>- </span>Member database</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/messaging_groups"><span>- </span>Messaging groups</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/administrator_roles"><span>- </span>User Management</a></li>
                  </ul>
                  )}
                </li>
                <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/emails/email_log">Send Emails</a></li>
              </ul>
            </li>
            <li className='nav-item text-nowrap'><a href="https://annatest.play-cricket.com/site_admin/teams" className='nav-link'>TEAMS</a></li>
            <li className={`nav-item text-nowrap dropdown ${openmenu === 'competitions' ? 'show' : null}`}>
              <a her="#" className={`nav-link custom-toggle dropdown-toggle ${styles.ct}`} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>{toggleMenu("competitions")}}>COMPETITIONS
                <img src={arrow} alt="arrow" width="18px" height="18px" className={`arrow ${styles.arrow}`}/>
              </a>

              <div className={`dropdown-menu ${openmenu === 'competitions' ? 'show' : null}`} aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/player_nominations">Manage Player Eligibility</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/player_nomination_statuses">Object to Nominations</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/club_league_orders">View Orders</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/club_subscription_invoices">View Invoices</a>
              </div>
            </li>
            <li className={`nav-item text-nowrap dropdown ${openmenu === 'reports' ? 'show' : null}`}>
              <a her="#" className={`nav-link custom-toggle dropdown-toggle ${styles.ct}`} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>{toggleMenu("reports")}}>Reports
                <img src={arrow} alt="arrow" width="18px" height="18px" className={`arrow ${styles.arrow}`}/>
              </a>
              <div className={`dropdown-menu ${openmenu === 'reports' ? 'show' : null}`} aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/ground_usage_reports">Ground Usage</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/web_page_reports">Website Statistics</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/player_turnouts/fixtures">Player Turnout</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/scoring_method_reports">Scoring Methods</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/stats_download">Stats Download</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/registered_players">Registered Players</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/player_nominations/removed_registrations_report">Remove Registrations</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/club_player_suspensions/report">Suspensions</a>
              </div>
            </li>
            <li className='nav-item text-nowrap'><a href="https://annatest.play-cricket.com/home" className='nav-link'>EXIT ADMIN</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
