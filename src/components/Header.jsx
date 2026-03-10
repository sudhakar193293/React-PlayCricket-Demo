import React,{useState, useRef, useEffect} from 'react'
import styles from './header.module.css';
import style from './topHeader.module.css';
import headerlogo from '../assets/Cricket Club Logo.png';
import arrow from '../assets/arrow right 24px.png';
import './header.css';
import { getPermissions } from '../utils/getPermissions';

export default function Header( {club,data}) {
  const permissions = (data.roles[0].isCustom === false) && (data.roles[0].name === 'super_admin' || data.roles[0].name === 'main_administrator' || data.roles[0].name === 'ecb_admin') ? getPermissions() : data?.roles?.[0]?.permissions
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
    window.location.href="https://annatest.play-cricket-staging.com/home"
  }

  const handleLinkClick = (path,domain,link) =>{
    console.log(path,domain,link);
    if(link === 'action center'){
      setActiveLink('action center');
      const linkUrl  = path.replace('annatest',domain);
      window.location.href = linkUrl;
    }
    else if(link === 'teams'){
      setActiveLink('teams');
      const linkUrl  = path.replace('annatest',domain);
      window.location.href = linkUrl;
    }
    else{
      const linkUrl  = path.replace('annatest',domain)
      window.location.href = linkUrl;
    }
  }

  return (
    <nav className={`navbar navbar-expand-lg navbar-light border-bottom ${styles.container}`} ref={headerRef}>
      <div className={`d-none d-lg-flex align-items-center ${styles.logoContainer}`}>
        <img src={headerlogo} alt="logo"/>
        <span className='text-nowrap'>{data?.website?.name}</span>
      </div>
      <div className='d-flex d-lg-none justify-content-between align-items-center'>
        <div className='navbar-toggler' type="button" data-toggle="collapse" data-target="#mainNavbar" style={{marginRight:"20%"}}>
          <span className='navbar-toggler-icon'></span>
        </div>
        <div className='text-nowrap' style={{fontFamily:'GT Walsheim Trial',fontWeight:800,fontSize:'20px',color:'#0B416A',lineHeight:'100%', marginRight:'10px'}}>{data?.website?.name}</div>
      </div>
      <div className='collapse navbar-collapse' id="mainNavbar" style={{flexGrow:'0',marginLeft:'auto',paddingRight:"0px"}}>
        <ul className={`navbar-nav ${styles["header-links"]} ${styles.headerNav}`}>
          <li className={`nav-item text-nowrap`}><a className={`nav-link ${styles.cursor} ${activeLink === 'action center' ? 'active' : ''}`} onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/home',data?.website?.subdomain,'action center')}>ACTION CENTER</a></li>
          {!(permissions?.day_to_day?.fixtures === false && permissions?.day_to_day?.find_a === false && permissions?.setup?.scoring_rules === false && permissions?.day_to_day?.results === false) &&
            <li className={`nav-item text-nowrap dropdown hactive ${openmenu === 'fixtureandresults' ? 'show active' : null}`}>
              <a her="#" className={`nav-link custom-toggle dropdown-toggle ${styles.ct}`} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>{toggleMenu("fixtureandresults")}}>FIXTURE &amp; RESULTS
                <img src={arrow} alt="arrow" width="18px" height="18px" className={`arrow ${styles.arrow}`}/>
              </a>
              <ul className={`dropdown-menu ${openmenu === 'fixtureandresults' ? 'show active' : ''}`} aria-labelledby="navbarDropdown">
                {!(permissions?.day_to_day?.fixtures === false && permissions?.day_to_day?.find_a === false && permissions?.setup?.scoring_rules === false) &&
                  <li>
                    <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct} ${openSubMenu === 'fixture' ? styles.sub_menu_active : ''}`} onClick={handleFixture} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Fixtures<span><svg className={`arrow ${openSubMenu === 'fixture' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                      </svg>
                    </span></a>
                    {openSubMenu === 'fixture' && (
                    <ul className='list-unstyled m-0 p-0'>
                      {permissions?.day_to_day?.fixtures &&<li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/matches',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Fixture management</a></li>}
                      {permissions?.day_to_day?.fixtures &&<li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/repeat_fixtures',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Repeat fixtures</a></li>}
                      {permissions?.day_to_day?.find_a && <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/fixture_bureau',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Find a fixture</a></li>}
                      {permissions?.day_to_day?.find_a && <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/ground_availabilities',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Find a ground</a></li>}
                      {permissions?.setup?.scoring_rules && <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/club_scoring_rules',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Scoring rules</a></li>}
                    </ul>
                    )}
                  </li>
                }
                {permissions?.day_to_day?.results && <li><a className="dropdown-item" onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/results',data?.website?.subdomain)}>Results</a></li>}
                {permissions?.day_to_day?.fixtures && <li><a className="dropdown-item" onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/player_availability/fixtures?email=false',data?.website?.subdomain)}>Player Availability (&email)</a></li>}
              </ul>
            </li>
          }
          <li className={`nav-item text-nowrap dropdown hactive ${openmenu === 'club' ? 'show active' : ''}`}>
            <a her="#" className={`nav-link custom-toggle dropdown-toggle ${styles.ct}`} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>{toggleMenu('club');setShowClubInfo(!showClubInfo);setShowUpdateClub(false);}}>CLUB
              <img src={arrow} alt="arrow" width="18px" height="18px" className={`arrow ${styles.arrow}`}/>
            </a>

            <ul className={`dropdown-menu ${openmenu === 'club' ? 'show' : ''}`} aria-labelledby="navbarDropdown">
              <li>
                <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct} ${openSubMenu === 'club-information' ? styles.sub_menu_active : ''}`} onClick={handleClubInformation} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Club Information <span><svg className={`arrow ${openSubMenu === 'club-information' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                  </svg>
                </span></a>
                {openSubMenu === 'club-information' && (
                <ul className='list-unstyled m-0 p-0'>
                  {permissions?.site_management?.about_us && 
                    <>
                    <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/about_us/club_details',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Club details</a></li>
                    <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/about_us/playing_facilities',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Playing facilities</a></li>
                    </>
                  }
                  {permissions?.site_management?.information_board && <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/document_library/articles/index',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Documents</a></li>}
                </ul>
                )}
              </li>
              <li>
                <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct}  ${openSubMenu === 'club-content' ? styles.sub_menu_active : ''}`} onClick={handleClubContent} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Club Content <span><svg className={`arrow ${openSubMenu === 'club-content' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                  </svg>
                  </span>
                </a>
                {openSubMenu === 'club-content' && (
                <ul className='list-unstyled m-0 p-0'>
                  {permissions?.site_management?.about_us &&
                    <>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/about_us/joining_message',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Joining message</a></li>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/about_us/affiliations',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Affiliations</a></li>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/about_us/sponsors',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Sponsers</a></li>
                    </>
                  }
                  {permissions?.setup?.privacy_notices &&
                    <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/privacy_notices',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Privacy notices</a></li>
                  } 
                  {permissions?.site_management?.gallery &&
                    <>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/photos',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Photo gallery</a></li>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/videos',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Video gallery</a></li>
                    </>
                  }                    
                </ul>
                )}
              </li>
              <li>
                <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct} ${openSubMenu === 'club-communication' ? styles.sub_menu_active : ''}`} onClick={handleClubCommunication} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Club Communication <span><svg className={`arrow ${openSubMenu === 'club-communication' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                  </svg>
                </span></a>
                {openSubMenu === 'club-communication' && (
                <ul className='list-unstyled m-0 p-0'>
                  {permissions?.site_management?.information_board &&
                    <>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/news_articles/news_articles/index',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>News</a></li>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/posts',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Members board</a></li>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/member_forums',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Members forum</a></li>                   
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/calendar',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Calendar</a></li>
                    </>
                  }
                </ul>
                )}
              </li>
              <li>
                <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct} ${openSubMenu === 'configure-club' ? styles.sub_menu_active : ''}`} onClick={handleConfigureClub} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Configure Club Website <span><svg className={`arrow ${openSubMenu === 'configure-club' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                  </svg>
                  </span>
                </a>
                {openSubMenu === 'configure-club' && (
                <ul className='list-unstyled m-0 p-0'>
                  {permissions?.site_management?.website_configuration &&
                    <>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/website_configurations/home_page',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Homepage</a></li>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/website_configurations/docs_config',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Documents</a></li>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/website_configurations/fixtures',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Fixture & results</a></li>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/menu_configs',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Menu</a></li>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/custom_pages',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Page builder</a></li>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/website_configurations/statistics',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Statistics</a></li>
                    </>
                  }
                  {permissions?.upload?.badge &&
                    <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/website_configurations/badge',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Badge</a></li>
                  }
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
              <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/about_us/officials',data?.website?.subdomain)}>Club Officials</a></li>
              }
              <li>
                <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct} ${openSubMenu === 'members' ? styles.sub_menu_active : ''}`} onClick={handleManageMembers} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Members <span><svg className={`arrow ${openSubMenu === 'members' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                  </svg>
                </span></a>
                {openSubMenu === 'members' && (
                <ul className='list-unstyled m-0 p-0'>
                  {permissions?.day_to_day?.members &&
                    <>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/users?initial=true',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Member database</a></li>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/inactive_member_workflows',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Inactive members</a></li>
                      <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/injury_reports',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Injury reporting</a></li>
                    </>
                  }
                  {permissions?.setup?.administrator_roles &&
                    <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/administrator_roles',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Administration roles</a></li>
                  }
                  {permissions?.setup?.messaging_groups && 
                    <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/messaging_groups',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Messaging groups</a></li>
                  }
                  {permissions?.upload?.members_upload &&
                    <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/member_uploads',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Members upload</a></li>
                  }
                </ul>
                )}
              </li>
              <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/website_configurations/badge',data?.website?.subdomain)}>Emails</a></li>
            </ul>
          </li>
          {permissions?.setup?.teams &&
            <li className='nav-item text-nowrap'><a className={`nav-link ${styles.cursor} ${activeLink === 'teams' ? 'active' : ''}`} onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/teams',data?.website?.subdomain,'teams')}>TEAMS</a></li>
          }
          <li className={`nav-item text-nowrap dropdown hactive ${openmenu === 'competitions' ? 'show' : null}`}>
            <a her="#" className={`nav-link custom-toggle dropdown-toggle ${styles.ct} `} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>{toggleMenu("competitions")}}>COMPETITIONS
              <img src={arrow} alt="arrow" width="18px" height="18px" className={`arrow ${styles.arrow}`}/>
            </a>
            <ul className={`dropdown-menu ${openmenu === 'competitions' ? 'show' : ''}`} aria-labelledby="navbarDropdown">
              <li>
                <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct} ${openSubMenu === 'nominations' ? styles.sub_menu_active : ''}`} onClick={handleNominations} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Nominations<span><svg className={`arrow ${openSubMenu === 'nominations' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                  </svg>
                </span></a>
                {(openSubMenu === 'nominations' && permissions?.day_to_day?.members) && (
                <ul className='list-unstyled m-0 p-0'>
                  <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/player_nominations',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Player nominations</a></li>
                  <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/player_nomination_statuses',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Objections to nominations</a></li>
                  <li><a className='dropdown-item text-dark text-decoration-none' onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/club_player_suspensions',data?.website?.subdomain)}><span className={`${styles.hyphen}`}>&mdash;&nbsp;&nbsp;</span>Suspensions</a></li>
                </ul>
                )}
              </li>
              {permissions?.day_to_day?.league &&
                <>
                  <li><a className="dropdown-item" onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/club_league_orders',data?.website?.subdomain)}>Orders</a></li>
                  <li><a className="dropdown-item" onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/club_subscription_invoices',data?.website?.subdomain)}>Invoices</a></li>
                </>
              }
            </ul>
          </li>
          <li className={`nav-item text-nowrap dropdown hactive ${openmenu === 'reports' ? 'show active' : null}`}>
            <a her="#" className={`nav-link custom-toggle dropdown-toggle ${styles.ct}`} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>{toggleMenu("reports")}}>REPORTS
              <img src={arrow} alt="arrow" width="18px" height="18px" className={`arrow ${styles.arrow}`}/>
            </a>
            <ul className={`dropdown-menu ${openmenu === 'reports' ? 'show' : null}`} aria-labelledby="navbarDropdown" style={{width:'200px'}}>
              {permissions?.report_download?.website_statistics &&
                <li><a className="dropdown-item" onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/web_page_reports',data?.website?.subdomain)}>Website statistics</a></li>
              }
              {permissions?.report_download?.ground_usage &&
                <li><a className="dropdown-item" onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/ground_usage_reports',data?.website?.subdomain)}>Ground usage</a></li>
              }
              {permissions?.report_download?.matches &&
                <>
                  <li><a className="dropdown-item" onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/player_turnouts/fixtures',data?.website?.subdomain)}>Player turnout</a></li>
                  <li><a className="dropdown-item" onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/scoring_method_reports',data?.website?.subdomain)}>Scoring methods</a></li>
                  <li><a className="dropdown-item" onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/stats_download',data?.website?.subdomain)}>Stats download</a></li>
                </>
              }
              {permissions?.day_to_day?.members &&
                <li><a className="dropdown-item" onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/player_nominations/removed_registrations_report',data?.website?.subdomain)}>Removed Registrations</a></li>
              }
              {permissions?.report_download?.club_registered_players &&
                <>
                  <li><a className="dropdown-item" onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/registered_players',data?.website?.subdomain)}>Current Players</a></li>
                  <li><a className="dropdown-item" onClick={()=>handleLinkClick('https://annatest.play-cricket-staging.com/site_admin/club_player_suspensions/report',data?.website?.subdomain)}>Suspensions</a></li>
                </>
              }   
            </ul>
          </li>
          <span className={`nav-item d-none d-lg-flex mx-2 ${styles.divider}`}></span>
          <li className={`nav-item text-nowrap ${styles.exit_Admin}`}><a className='nav-link' onClick={()=>{onAdminExit()}}>EXIT ADMIN</a></li>
        </ul>
      </div>
    </nav>
  )
}
