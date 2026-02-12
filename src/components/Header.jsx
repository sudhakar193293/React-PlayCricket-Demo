import React,{useState, useRef, useEffect} from 'react'
import styles from './header.module.css';
import style from './topHeader.module.css';
import headerlogo from '../assets/Cricket Club Logo.png';
import arrow from '../assets/arrow right 24px.png';
import './header.css';

export default function Header( {club,data}) {
  const permissions = data?.roles?.[0]?.permissions || {}
  const [showClubInfo, setShowClubInfo] = useState(false);
  const [showUpdateClub, setShowUpdateClub] = useState(false)
  const [openmenu, setOpenMenu] =  useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [activeLink, setActiveLink] = useState('')
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

  const handleFixture = (e) => {
    e.preventDefault();
    e.stopPropagation()
    toggleSubMenu('fixture')
  }

  const handleNominations = (e) => {
    e.preventDefault();
    e.stopPropagation()
    toggleSubMenu('nominations')
  }

  const handleClubInformation = (e) => {
    e.preventDefault();
    e.stopPropagation()
    // setShowUpdateClub(!showUpdateClub)
    toggleSubMenu('club-information')
  }

  const handleClubContent = (e) => {
    e.preventDefault();
    e.stopPropagation()
    // setShowUpdateClub(!showUpdateClub)
    toggleSubMenu('club-content')
  }

  const handleClubCommunication = (e) => {
    e.preventDefault();
    e.stopPropagation()
    // setShowUpdateClub(!showUpdateClub)
    toggleSubMenu('club-communication')
  }

  const handleConfigureClub = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSubMenu('configure-club')
  }

  const handleManageMembers = (e) => {
    e.preventDefault();
    e.stopPropagation()
    // setShowUpdateClub(!showUpdateClub)
    toggleSubMenu('members')
  }

  const onAdminExit = () => {
    sessionStorage.clear();
    window.location.href="https://annatest.play-cricket.com/home"
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom" style={{backgroundColor:'#F0F2F7', fontSize:"15px", padding:'0px'}} ref={headerRef}>
      <div className='container-fluid px-4'>
        <span className='navbar-brand d-none d-lg-flex align-items-center'>
        <img src={headerlogo} alt="logo" width="44px" height="44px" style={{border:"2px"}} className='mr-2'/>
        <span className='text-nowrap' style={{fontFamily:'GT-Walsheim-Black-Trial',fontWeight:800,fontSize:'20px',color:'#0B416A',lineHeight:'100%', marginRight:'10px',textTransform:'uppercase'}}>{club}</span>
        </span>
        <div className='d-flex d-lg-none justify-content-between align-items-center'>
          <div className='navbar-toggler' type="button" data-toggle="collapse" data-target="#mainNavbar" style={{marginRight:"20%"}}>
            <span className='navbar-toggler-icon'></span>
          </div>
          <div className='text-nowrap' style={{fontFamily:'GT Walsheim Trial',fontWeight:800,fontSize:'20px',color:'#0B416A',lineHeight:'100%', marginRight:'10px'}}>{club}</div>
        </div>
        <div className='collapse navbar-collapse' id="mainNavbar">
          <ul className='navbar-nav ml-auto header-links'>
            <li className={`${styles.navlink}nav-item text-nowrap`}><a href="https://annatest.play-cricket.com/site_admin/home" className={`nav-link ${activeLink === 'action center' ? 'active' : ''}`} onClick={()=>setActiveLink('action center')}>ACTION CENTER</a></li>
            {!(permissions?.day_to_day?.fixtures === false && permissions?.day_to_day?.find_a === false && permissions?.setup?.scoring_rules === false && permissions?.day_to_day?.results === false) &&
            <li className={`nav-item text-nowrap dropdown hactive ${openmenu === 'fixtureandresults' ? 'show active' : null}`}>
              <a her="#" className={`nav-link custom-toggle dropdown-toggle ${styles.ct}`} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>{toggleMenu("fixtureandresults")}}>FIXTURE &amp; RESULTS
                <img src={arrow} alt="arrow" width="18px" height="18px" className={`arrow ${styles.arrow}`}/>
              </a>
              <ul className={`dropdown-menu ${openmenu === 'fixtureandresults' ? 'show active' : ''}`} aria-labelledby="navbarDropdown">
                {!(permissions?.day_to_day?.fixtures === false && permissions?.day_to_day?.find_a === false && permissions?.setup?.scoring_rules === false) &&
                  <li>
                    <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct}`} onClick={handleFixture} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Fixtures<span><svg className={`arrow ${openSubMenu === 'fixture' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                      </svg>
                    </span></a>
                    {openSubMenu === 'fixture' && (
                    <ul className='list-unstyled m-0 p-0'>
                      {permissions?.day_to_day?.fixtures &&<li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/about_us/club_details"><span>-</span>Fixture management</a></li>}
                      {permissions?.day_to_day?.fixtures &&<li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/about_us/playing_facilities"><span>-</span>Repeat fixtures</a></li>}
                      {permissions?.day_to_day?.find_a && <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/document_library/articles/index"><span>-</span>Find a fixture</a></li>}
                      {permissions?.day_to_day?.find_a && <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/document_library/articles/index"><span>-</span>Find a ground</a></li>}
                      {permissions?.setup?.scoring_rules && <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/document_library/articles/index"><span>-</span>Scoring rules</a></li>}
                    </ul>
                    )}
                  </li>
                }
                {permissions?.day_to_day?.results && <li><a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/results">Results</a></li>}
                {permissions?.day_to_day?.fixtures && <li><a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/player_availability/fixtures?email=false">Player Availability (&email)</a></li>}
              </ul>

              {/* <div className={`dropdown-menu ${openmenu === 'fixture' ? 'show' : null}`} aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href={`https://${clubName}.play-cricket.com/site_admin/matches`}>Manage Fixures</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/results">Confirm Results</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/player_availability/fixtures?email=false">Request Player Availability</a>
              </div> */}
            </li>
}
            <li className={`nav-item text-nowrap dropdown hactive ${openmenu === 'club' ? 'show active' : ''}`}>
              <a her="#" className={`nav-link custom-toggle dropdown-toggle ${styles.ct}`} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>{toggleMenu('club');setShowClubInfo(!showClubInfo);setShowUpdateClub(false);}}>CLUB
                <img src={arrow} alt="arrow" width="18px" height="18px" className={`arrow ${styles.arrow}`}/>
              </a>

              <ul className={`dropdown-menu ${openmenu === 'club' ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                <li>
                  <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct}`} onClick={handleClubInformation} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Club Information <span><svg className={`arrow ${openSubMenu === 'club-information' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                    </svg>
                  </span></a>
                  {openSubMenu === 'club-information' && (
                  <ul className='list-unstyled m-0 p-0'>
                    {permissions?.site_management?.about_us && 
                      <>
                      <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/about_us/club_details"><span>-</span>Club details</a></li>
                      <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/about_us/playing_facilities"><span>-</span>Playing facilities</a></li>
                      </>
                    }
                    {permissions?.site_management?.information_board && <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/document_library/articles/index"><span>-</span>Documents</a></li>}
                  </ul>
                  )}
                </li>
                <li>
                  <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct}`} onClick={handleClubContent} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Club Content <span><svg className={`arrow ${openSubMenu === 'club-content' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                    </svg>
                    </span>
                  </a>
                  {openSubMenu === 'club-content' && (
                  <ul className='list-unstyled m-0 p-0'>
                    {permissions?.site_management?.about_us &&
                      <>
                        <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/videos"><span>- </span>Joining message</a></li>
                        <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/calendar"><span>- </span>Affiliations</a></li>
                        <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/document_library/articles/index"><span>- </span>Sponsers</a></li>
                      </>
                    }
                    {permissions?.setup?.privacy_notices &&
                      <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/videos"><span>- </span>Privacy notices</a></li>
                    } 
                    {permissions?.site_management?.gallery &&
                      <>
                        <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/photos"><span>- </span>Photo gallery</a></li>
                        <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/videos"><span>- </span>Video gallery</a></li>
                      </>
                    }
                    {/* <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/news_articles/news_articles/index"><span>- </span>News</a></li> */}
                    
                  </ul>
                  )}
                </li>
                <li>
                  <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct}`} onClick={handleClubCommunication} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Club Communication <span><svg className={`arrow ${openSubMenu === 'club-communication' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                    </svg>
                  </span></a>
                  {openSubMenu === 'club-communication' && (
                  <ul className='list-unstyled m-0 p-0'>
                    {permissions?.site_management?.information_board &&
                      <>
                        <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/news_articles/news_articles/index"><span>- </span>News</a></li>
                        <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/about_us/club_details"><span>- </span>Members board</a></li>
                        <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/about_us/playing_facilities"><span>- </span>Members forum</a></li>                   
                        <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/document_library/articles/index"><span>- </span>Calendar</a></li>
                      </>
                    }
                  </ul>
                  )}
                </li>
                <li>
                  <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct}`} onClick={handleConfigureClub} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Configure Club Website <span><svg className={`arrow ${openSubMenu === 'configure-club' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                    </svg>
                    </span>
                  </a>
                  {openSubMenu === 'configure-club' && (
                  <ul className='list-unstyled m-0 p-0'>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/videos"><span>- </span>Homepage</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/calendar"><span>- </span>Documents</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/document_library/articles/index"><span>- </span>Fixture & results</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/videos"><span>- </span>Menu</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/photos"><span>- </span>Page builder</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/videos"><span>- </span>Statistics</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/videos"><span>- </span>Badge</a></li>
                  </ul>
                  )}
                </li>
              </ul>
            </li>
            <li className={`nav-item text-nowrap dropdown hactive ${openmenu === 'people' ? 'show active' : ''}`}>
              <a her="#" className={`nav-link custom-toggle dropdown-toggle ${styles.ct}`} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>{toggleMenu('people');setShowClubInfo(!showClubInfo);setShowUpdateClub(false);}}>PEOPLE
                <img src={arrow} alt="arrow" width="18px" height="18px" className={`arrow ${styles.arrow}`}/>
              </a>

              <ul className={`dropdown-menu ${openmenu === 'people' ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                {permissions?.site_management?.about_us &&
                 <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/about_us/officials">Club Officials</a></li>
                }
                <li>
                  <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct}`} onClick={handleManageMembers} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Members <span><svg className={`arrow ${openSubMenu === 'members' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                    </svg>
                  </span></a>
                  {openSubMenu === 'members' && (
                  <ul className='list-unstyled m-0 p-0'>
                    {permissions?.day_to_day?.members &&
                      <>
                        <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/users?initial=true"><span>- </span>Member database</a></li>
                        <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/users?initial=true"><span>- </span>Inactive members</a></li>
                        <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/users?initial=true"><span>- </span>Injury reporting</a></li>
                      </>
                    }
                    {permissions?.setup?.administrator_roles &&
                      <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/users?initial=true"><span>- </span>Administration roles</a></li>
                    }
                    {permissions?.setup?.messaging_groups && 
                      <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/messaging_groups"><span>- </span>Messaging groups</a></li>
                    }
                    {permissions?.upload?.members_upload &&
                      <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/administrator_roles"><span>- </span>Members upload</a></li>
                    }
                  </ul>
                  )}
                </li>
                <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/emails/email_log">Emails</a></li>
              </ul>
            </li>
            {permissions?.setup?.teams &&
              <li className='nav-item text-nowrap'><a href="https://annatest.play-cricket.com/site_admin/teams" className={`nav-link ${activeLink === 'teams' ? 'active' : ''}`} onClick={()=>setActiveLink('teams')}>TEAMS</a></li>
            }
            <li className={`nav-item text-nowrap dropdown hactive ${openmenu === 'competitions' ? 'show' : null}`}>
              <a her="#" className={`nav-link custom-toggle dropdown-toggle ${styles.ct}`} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>{toggleMenu("competitions")}}>COMPETITIONS
                <img src={arrow} alt="arrow" width="18px" height="18px" className={`arrow ${styles.arrow}`}/>
              </a>
              <ul className={`dropdown-menu ${openmenu === 'competitions' ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                <li>
                  <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct}`} onClick={handleNominations} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Nominations<span><svg className={`arrow ${openSubMenu === 'nominations' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                    </svg>
                  </span></a>
                  {(openSubMenu === 'nominations' && permissions?.day_to_day?.members) && (
                  <ul className='list-unstyled m-0 p-0'>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/about_us/club_details"><span>-</span>Player nominations</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/about_us/playing_facilities"><span>-</span>Objections to nominations</a></li>
                    <li className="dropdown-item"><a className='text-dark text-decoration-none' href="https://annatest.play-cricket.com/site_admin/document_library/articles/index"><span>-</span>Suspensions</a></li>
                  </ul>
                  )}
                </li>
                {permissions?.day_to_day?.league &&
                  <>
                    <li><a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/results">Orders</a></li>
                    <li><a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/player_availability/fixtures?email=false">Invoices</a></li>
                  </>
                }
              </ul>
              {/* <div className={`dropdown-menu ${openmenu === 'competitions' ? 'show' : null}`} aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/player_nominations">Manage Player Eligibility</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/player_nomination_statuses">Object to Nominations</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/club_league_orders">View Orders</a>
                <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/club_subscription_invoices">View Invoices</a>
              </div> */}
            </li>
            <li className={`nav-item text-nowrap dropdown hactive ${openmenu === 'reports' ? 'show active' : null}`}>
              <a her="#" className={`nav-link custom-toggle dropdown-toggle ${styles.ct}`} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>{toggleMenu("reports")}}>REPORTS
                <img src={arrow} alt="arrow" width="18px" height="18px" className={`arrow ${styles.arrow}`}/>
              </a>
              <div className={`dropdown-menu ${openmenu === 'reports' ? 'show' : null}`} aria-labelledby="navbarDropdown">
                {permissions?.report_download?.website_statistics &&
                  <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/web_page_reports">Website statistics</a>
                }
                {permissions?.report_download?.matches &&
                  <>
                    <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/ground_usage_reports">Ground usage</a>
                    <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/player_turnouts/fixtures">Player turnout</a>
                    <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/scoring_method_reports">Scoring methods</a>
                    <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/stats_download">Stats download</a>
                  </>
                }
                {permissions?.report_download?.club_registered_players &&
                  <>
                    <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/registered_players">Current Players</a>
                    <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/player_nominations/removed_registrations_report">Remove Registrations</a>
                    <a className="dropdown-item" href="https://annatest.play-cricket.com/site_admin/club_player_suspensions/report">Suspensions</a>
                  </>
                }   
              </div>
            </li>
            <span className={'mx-2 divider'}></span>
            <li className='nav-item text-nowrap'><a className='nav-link' style={{fontFamily:'AvenirNextLTPro-Cn',fontWeight:'700',color:'#626D79'}} onClick={()=>{onAdminExit()}}>EXIT ADMIN</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
