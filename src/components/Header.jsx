import React,{useState, useRef, useEffect} from 'react'
import styles from './header.module.css';
import headerlogo from '../assets/Cricket Club Logo.png';
import arrow from '../assets/arrow right 24px.png';

export default function Header( {userName, club}) {
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
        {/* <button className='navbar-toggler' type="button" data-toggle="collapse" data-target="#mainNavbar">
          <span className='navbar-toggler-icon'></span>
        </button> */}
        <div className='d-flex d-lg-none justify-content-between align-items-center'>
          <div className='navbar-toggler' type="button" data-toggle="collapse" data-target="#mainNavbar" style={{marginRight:"20%"}}>
            <span className='navbar-toggler-icon'></span>
          </div>
          <div className='text-nowrap' style={{fontFamily:'GT Walsheim Trial',fontWeight:800,fontSize:'20px',color:'#0B416A',lineHeight:'100%', marginRight:'10px'}}>{club}</div>
        </div>
        <div className='collapse navbar-collapse' id="mainNavbar">
          {/* <div className='d-flex justify justify-content-between'> */}
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item text-nowrap'><a her="#" className='nav-link'>ACTION CENTER</a></li>
              {/* <li className='nav-item text-nowrap'><a her="#" className='nav-link'>SAFE HANDS DASHBOARD</a></li> */}
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
                  {/* <li className={`dropdown-submenu ${showUpdateClub ?  "show" :""}`}> */}
                  <li>
                    <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct}`} onClick={handleUpdateClubInformation} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Update Club Information <span><svg className={`arrow ${openSubMenu === 'club-update' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                      </svg>
                    </span></a>
                    {/* <ul class={`dropdown-menu inner-menu`} aria-labelledby="navbarDropdown"> */}
                    {openSubMenu === 'club-update' && (
                    <ul className='list-unstyled m-0 p-0'>
                      <li className="dropdown-item" href="#"><span>-</span>Club details</li>
                      <li className="dropdown-item" href="#"><span>-</span>Playing locations</li>
                      <li className="dropdown-item" href="#"><span>-</span>Documents</li>
                      <li className="dropdown-item" href="#"><span>-</span>Sponsers</li>
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
                      <li className="dropdown-item" href="#"><span>-</span>News</li>
                      <li className="dropdown-item" href="#"><span>-</span>Photo gallery</li>
                      <li className="dropdown-item" href="#"><span>-</span>Video gallery</li>
                      <li className="dropdown-item" href="#"><span>-</span>Noticeboard</li>
                      <li className="dropdown-item" href="#"><span>-</span>Announcements</li>
                      <li className="dropdown-item" href="#"><span>-</span>Club calendar</li>
                    </ul>
                    )}
                  </li>
                  <li><a class="dropdown-item" href="#">Customise Club Website</a></li>
                </ul>
              </li>
              {/* <li className='nav-item text-nowrap'><a her="#" className='nav-link'>PEOPLE</a></li> */}
              <li className={`nav-item text-nowrap dropdown ${openmenu === 'people' ? 'show' : ''}`}>
                <a her="#" className={`nav-link custom-toggle dropdown-toggle ${styles.ct}`} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>{toggleMenu('people');setShowClubInfo(!showClubInfo);setShowUpdateClub(false);}}>PEOPLE
                  <img src={arrow} alt="arrow" width="18px" height="18px" className={`arrow ${styles.arrow}`}/>
                </a>

                <ul class={`dropdown-menu ${openmenu === 'people' ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#">Appoint Committe & volunteers</a></li>
                  <li>
                    <a className={`dropdown-item dropdown-toggle d-flex justify-content-between align-items-center ${styles.ct}`} onClick={handleManageMembers} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">Manage Members <span><svg className={`arrow ${openSubMenu === 'manage-members' ? 'rotate' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#7BC058"/>
                      </svg>
                    </span></a>
                    {openSubMenu === 'manage-members' && (
                    <ul className='list-unstyled m-0 p-0'>
                      <li className="dropdown-item" href="#"><span>-</span> Member database</li>
                      <li className="dropdown-item" href="#"><span>-</span> Messaging groups</li>
                      <li className="dropdown-item" href="#"><span>-</span> User management</li>
                    </ul>
                    )}
                  </li>
                  <li><a class="dropdown-item" href="#">Send Emails</a></li>
                </ul>
              </li>
              <li className='nav-item text-nowrap'><a her="#" className='nav-link'>TEAMS</a></li>
              {/* <li className='nav-item text-nowrap'><a her="#" className='nav-link'>COMPETETIONS</a></li> */}
              <li className={`nav-item text-nowrap dropdown ${openmenu === 'competitions' ? 'show' : null}`}>
                <a her="#" className={`nav-link custom-toggle dropdown-toggle ${styles.ct}`} href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>{toggleMenu("competitions")}}>COMPETETIONS
                  <img src={arrow} alt="arrow" width="18px" height="18px" className={`arrow ${styles.arrow}`}/>
                </a>

                <div className={`dropdown-menu ${openmenu === 'competitions' ? 'show' : null}`} aria-labelledby="navbarDropdown">
                  <a className="dropdown-item">Manage Player Eligibility</a>
                  <a className="dropdown-item">Object to Nominations</a>
                  <a className="dropdown-item">View Orders & Invoices</a>
                </div>
              </li>
              <li className='nav-item text-nowrap'><a her="#" className='nav-link'>REPORTS</a></li>
              <li className='nav-item text-nowrap'><a her="#" className='nav-link'>EXIT ADMIN</a></li>
            </ul>
          {/* </div> */}
        </div>
      </div>
    </nav>
  )
}
