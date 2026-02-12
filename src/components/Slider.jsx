import React,{useState,useEffect,useRef} from 'react'
import styles from "./slider.module.css";
import  {getLinksByRole} from '../utils/getLinksByRole'
import {userRoles} from '../constants/userRoles'
import { roleLinks } from '../constants/roleLinks';

 
const Slider = ({ isOpen, onClose, link, onClubSelect, data }) => {
  const linksToShow = userRoles.flatMap(role => roleLinks[role] || []);
  const [menu, setMenu] = useState(null)
  const [openParents, setOpenParents] = useState([]);
  const sliderRef = useRef(null)
  
  useEffect(()=>{
    const handleClickOutside = (e) => {
      if(sliderRef.current&& !sliderRef.current.contains(e.target)){
        setOpenParents([]);
        // setOpenMenu(null);
        // setOpenSubMenu(null);
      }
    }
    document.addEventListener("mousedown",handleClickOutside);
    return () => 
      document.removeEventListener('mousedown',handleClickOutside);
  },[])
 
  const toggleParent = (id) => {
    setOpenParents((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : [...prev, id]
    );
  };

  const toggleMenu = (menu) =>{
    setMenu((prev)=> (prev === menu ? null : menu))
  }

  const handleLinkClick = (path,domain) =>{
    const linkUrl  = path.replace('annatest',domain)
    window.location.href = linkUrl;
  }

  // const data = link === 'myclubs' ? 
  //  [
  //   {
  //     id: "harlow town cc",
  //     name: "Harlow Town CC",
  //     clubLinks: [
  //       { id: 1, name: 'Manage Club', path: "/manageClub", enable: true },
  //       { id: 1, name: 'Customise Club Website', path: "/customiseclubwebsite", enable: false },
  //       { id: 1, name: 'View Club Website', path: "/viewclubwebsite", enable: true },
  //       { id: 1, name: 'Team Reports', path: "/teamreports", enable: true }
  //     ]
  //   },
  //   {
  //     id: "barnes cc",
  //     name: "Barnes CC",
  //     clubLinks: [
  //       { id: 1, name: 'Manage Club', path: "/manageClub", enable: true },
  //       { id: 1, name: 'Customise Club Website', path: "/customiseclubwebsite", enable: true },
  //       { id: 1, name: 'View Club Website', path: "/viewclubwebsite", enable: true },
  //       { id: 1, name: 'Team Reports', path: "/teamreports", enable: true }
  //     ]
  //   }
  // ]:
  // [
  //   {
  //     id: "Chloe Eaton",
  //     name: "Chloe Eaton",
  //     clubLinks: [
  //       "My Stats",
  //       "My Details",
  //       "Play-Cricket Profile & Preferences",
  //       "Roles & Memberships",
  //       "Availability",
  //       "Add Junior Account"
  //     ]
  //   },
  //   {
  //     id: "Violet Eaten",
  //     name: "Violet Eaten",
  //     clubLinks: [
  //       "My Stats",
  //       "Play-Cricket Profile & Preferences",
  //       "Roles & Memberships",
  //       "Availability",
  //     ]
  //   }
  // ]
  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className={styles.backdrop} onClick={onClose}></div>}
 
      {/* Slider Panel */}
      <div className={`${styles.slider} ${isOpen ? styles.open : ""}`} ref={sliderRef}>
        {link === 'myclubs' ? 
        <div className={`${styles.accord} pt-3`}>
          <div>
            {/* <div className="position-relative px-3">
              <input
                  className="form-control pe-5"
                  placeholder="Search for club by Keyword or postcode"
              />
              <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
            </div> */}
            {openParents.length > 0 &&
              <div className='d-flex justify-content-end pr-3 pt-1' onClick={()=>{setOpenParents([])}}>
                <div className='text-white'>COLLAPSE ALL</div>
              </div>
            }
            <div>
              {data.roles.map((parent) => {
                let links = getLinksByRole('main_administrator');
                return(
                  <div key={parent.website.id}>
          
                    {/* Dropdown Header */}
                    <div
                      className="d-flex align-items-center justify-content-between mx-3 pt-3"
                      onClick={() => toggleParent(parent.website.id)}
                    >
                      <div className="d-flex align-items-center">
                        {link === 'myclubs' ? 
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19.9971 20.585L18.583 21.999L14.3408 17.7559L15.7549 16.3418L19.9971 20.585ZM5.14941 4.32031C5.53941 3.93031 6.16957 3.93031 6.55957 4.32031L15.0498 12.8096C15.4397 13.1995 15.4396 13.8297 15.0498 14.2197L12.2197 17.0498C11.8297 17.4398 11.1996 17.4398 10.8096 17.0498L2.31934 8.55957C1.92982 8.16967 1.92983 7.5403 2.31934 7.15039L5.14941 4.32031ZM18.5 2C20.4329 2.0001 22 3.56707 22 5.5C22 7.43293 20.4329 8.9999 18.5 9C16.567 9 15 7.433 15 5.5C15 3.567 16.567 2 18.5 2Z" fill="#FFFFFF"/>
                        </svg>:
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 1C18.072 1 23 5.928 23 12C23 18.072 18.072 23 12 23C5.928 23 1 18.072 1 12C1 5.928 5.928 1 12 1ZM12 13C9.78944 13 8.37066 13.9834 7.4502 15.2217C6.66684 16.2756 6.247 17.522 6.0752 18.5C7.64021 19.9278 9.72045 20.7998 12 20.7998C14.2793 20.7998 16.3589 19.9276 17.9238 18.5C17.752 17.5221 17.3331 16.2755 16.5498 15.2217C15.6293 13.9834 14.2106 13 12 13ZM12 3.2002C7.149 3.2002 3.2002 7.149 3.2002 12C3.2002 13.6869 3.67892 15.2639 4.50586 16.6045C4.80047 15.7483 5.2346 14.8504 5.8457 14.0283C6.74038 12.8248 8.01455 11.7928 9.74121 11.3037C8.68904 10.584 8 9.37436 8 8C8 5.78667 9.78667 4 12 4C14.2133 4 16 5.78667 16 8C16 9.37465 15.3104 10.584 14.2578 11.3037C15.9849 11.7927 17.2595 12.8246 18.1543 14.0283C18.7653 14.8503 19.1986 15.7484 19.4932 16.6045C20.3203 15.2638 20.7998 13.6871 20.7998 12C20.7998 7.149 16.851 3.2002 12 3.2002ZM12 6C10.8912 6 10 6.89124 10 8C10 9.10876 10.8912 10 12 10C13.1088 10 14 9.10876 14 8C14 6.89124 13.1088 6 12 6Z" fill="#FFFFFF"/>
                        </svg>}
                        <span className="ml-2 slider-name text-white font-weight-bold">{parent.website.name}</span>
                      </div>
                      <span className={`slider-arrow ${open ? "open" : ""}`}>
                        <svg width="16" height="16"  className={`arrow ${(openParents.includes(parent.website.id)) ? 'rotate' : ''}`}  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#FFFFFF"/>
                        </svg>
                      </span>
                    </div>
          
                    {/* Dropdown Items */}
                    {/* {openParents.includes(parent.id) && (
                      <ul className="list-unstyled m-0 p-0">
                        {parent.clubLinks.map((item, index) => (
                          item.enable === true ? 
                          <li key={index} className={`dropdown-item ml-4 text-white ${styles.clubcontent}`} onClick={()=>{if(item.name === 'ManageClub'){onClubSelect(parent.name);onClose();}}}>
                            <span>- </span>
                            {item.name}
                          </li> : <></>
                    ))}
                      </ul>
                    )} */}
                    {openParents.includes(parent.website.id) && ( ()=>
                      {
                        // let user = data.UserRoles.filter(u => {if(u.website.id === parent.id){return u}})
                        // links = getLinksByRole(user[0]?.role?.name);
                        const roles = parent.roles.map(role => role.name)
                        const linksToShow = roles.flatMap(role => roleLinks[role] || []);
                        const uniqueLinks = linksToShow.filter((link,index,array) => index === array.findIndex(l =>l.label === link.label))
                        return(<ul className="list-unstyled m-0 p-0">
                          {parent.hasAdminAccess ?                               
                            <li className={`dropdown-item ml-4 text-white ${styles.clubcontent}`} onClick={()=>{onClubSelect(parent.website.name);sessionStorage.setItem('selectedClub',parent.website.name);onClose();}}>
                              <span>- </span>
                              Manage Club
                            </li>: null}
                          {uniqueLinks.map((link)=>(
                              <li className={`dropdown-item ml-4 text-white ${styles.clubcontent}`} onClick={()=>{if(link.label === 'Manage Club'){onClubSelect(parent.name);sessionStorage.setItem('selectedClub',parent.name);onClose();} else{handleLinkClick(link.path,parent.website.subdomain)}}}>
                                <span>- </span>
                                {link.label}
                              </li>
                          ))}
                        </ul>
                        )
                      }
                    )()}
                  </div>
              )})}
            </div>
          </div>
        </div>:
        <div className={`${styles.accord} pt-3`}>
          {openParents.length > 0 &&
            <div className='d-flex justify-content-end pr-3 pt-1' onClick={()=>{setOpenParents([])}}>
              <div className='text-white'>COLLAPSE ALL</div>
            </div>
          }
          <div
            className="d-flex align-items-center justify-content-between mx-3 pt-3"
            onClick={() => toggleParent(data.user.id)}
          >
            <div className="d-flex align-items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1C18.072 1 23 5.928 23 12C23 18.072 18.072 23 12 23C5.928 23 1 18.072 1 12C1 5.928 5.928 1 12 1ZM12 13C9.78944 13 8.37066 13.9834 7.4502 15.2217C6.66684 16.2756 6.247 17.522 6.0752 18.5C7.64021 19.9278 9.72045 20.7998 12 20.7998C14.2793 20.7998 16.3589 19.9276 17.9238 18.5C17.752 17.5221 17.3331 16.2755 16.5498 15.2217C15.6293 13.9834 14.2106 13 12 13ZM12 3.2002C7.149 3.2002 3.2002 7.149 3.2002 12C3.2002 13.6869 3.67892 15.2639 4.50586 16.6045C4.80047 15.7483 5.2346 14.8504 5.8457 14.0283C6.74038 12.8248 8.01455 11.7928 9.74121 11.3037C8.68904 10.584 8 9.37436 8 8C8 5.78667 9.78667 4 12 4C14.2133 4 16 5.78667 16 8C16 9.37465 15.3104 10.584 14.2578 11.3037C15.9849 11.7927 17.2595 12.8246 18.1543 14.0283C18.7653 14.8503 19.1986 15.7484 19.4932 16.6045C20.3203 15.2638 20.7998 13.6871 20.7998 12C20.7998 7.149 16.851 3.2002 12 3.2002ZM12 6C10.8912 6 10 6.89124 10 8C10 9.10876 10.8912 10 12 10C13.1088 10 14 9.10876 14 8C14 6.89124 13.1088 6 12 6Z" fill="#FFFFFF"/>
              </svg>
              <span className="ml-2 slider-name text-white font-weight-bold">{data.user.userName}</span>
            </div>
            <span className={`slider-arrow ${open ? "open" : ""}`}>
              <svg width="16" height="16"  className={`arrow ${(openParents.includes(data.user.id)) ? 'rotate' : ''}`}  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#FFFFFF"/>
              </svg>
            </span>
          </div>
          {openParents.includes(data.user.id) && (
            <ul className="list-unstyled m-0 p-0">
              <li className={`dropdown-item ml-4 text-white ${styles.clubcontent}`}>
                <span className='fs-6'>- My Stats</span>
              </li>
              <li className={`dropdown-item ml-4 text-white ${styles.clubcontent}`}>
                <span className='text-xs'>- My Details</span>
              </li>
              <li className={`dropdown-item ml-4 text-white ${styles.clubcontent}`}>
                <span>- Play-Cricket Profile & Preference</span>
              </li>
              <li className={`dropdown-item ml-4 text-white ${styles.clubcontent}`}>
                <span>- Roles & Memberships</span>
              </li>
              <li className={`dropdown-item ml-4 text-white ${styles.clubcontent}`}>
                <span>- Availability</span>
              </li>
              <li className={`dropdown-item ml-4 text-white ${styles.clubcontent}`}>
                <span>- Add Junior Account</span>
              </li>
            </ul>
          )}
          {data.user.childUsers.map((childParent)=>(
            <div key={childParent.id}>
    
              {/* Dropdown Header */}
              <div
                className="d-flex align-items-center justify-content-between mx-3 pt-3"
                onClick={() => toggleParent(childParent.id)}
              >
                <div className="d-flex align-items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1C18.072 1 23 5.928 23 12C23 18.072 18.072 23 12 23C5.928 23 1 18.072 1 12C1 5.928 5.928 1 12 1ZM9 14C7.4645 14 6.38915 14.4704 5.68457 15.1133C5.17285 15.5803 4.82298 16.1688 4.6377 16.8115C6.2114 19.2108 8.92359 20.7998 12 20.7998C12.6768 20.7998 13.3353 20.7197 13.9688 20.5742C13.8889 19.3531 13.8198 17.8408 13.2568 16.5156C12.9493 15.7918 12.5109 15.1821 11.876 14.7471C11.2438 14.3139 10.3378 14 9 14ZM16.9072 14.7656C16.8398 14.7797 16.7529 14.8023 16.6523 14.8359C16.4498 14.9037 16.2143 15.0063 15.9932 15.1406C15.5189 15.4288 15.2727 15.7547 15.2471 16.0625L15.2266 16.0605C15.7152 17.3748 15.8564 18.8049 15.9277 19.8701C17.4392 19.1124 18.7028 17.9332 19.5645 16.4863C19.4794 16.1981 19.3622 15.9216 19.1934 15.6797C18.8549 15.1949 18.2504 14.75 17 14.75C16.9926 14.7507 16.9628 14.754 16.9072 14.7656ZM12 3.2002C7.149 3.2002 3.2002 7.149 3.2002 12C3.2002 12.8697 3.32913 13.7098 3.56543 14.5039C3.78757 14.1949 4.04364 13.9035 4.33594 13.6367C4.98919 13.0406 5.79727 12.5843 6.74609 12.3066C5.69128 11.5873 5 10.3764 5 9C5 6.78667 6.78667 5 9 5C11.2133 5 13 6.78667 13 9C13 10.3686 12.3162 11.5732 11.2715 12.2939C11.9252 12.4801 12.5019 12.7507 13.0068 13.0967C13.5895 13.4959 14.0481 13.9795 14.415 14.502C14.6647 14.232 14.9516 14.0194 15.2148 13.8594C15.4722 13.703 15.7365 13.5785 15.9814 13.4844C15.3853 13.028 15 12.3109 15 11.5C15 10.1167 16.1167 9 17.5 9C18.8833 9 20 10.1167 20 11.5C20 12.3736 19.5535 13.1391 18.877 13.5859C19.5139 13.8479 20.0001 14.2494 20.3613 14.7363C20.6442 13.8744 20.7998 12.9551 20.7998 12C20.7998 7.149 16.851 3.2002 12 3.2002ZM17.5 10.5C16.9451 10.5 16.5 10.9451 16.5 11.5C16.5 12.0549 16.9451 12.5 17.5 12.5C18.0549 12.5 18.5 12.0549 18.5 11.5C18.5 10.9451 18.0549 10.5 17.5 10.5ZM9 7C7.89124 7 7 7.89124 7 9C7 10.1088 7.89124 11 9 11C10.1088 11 11 10.1088 11 9C11 7.89124 10.1088 7 9 7Z" fill="#FFFFFF"/>
                  </svg>
                  <span className="ml-2 slider-name text-white font-weight-bold">{childParent.userName}</span>
                </div>
                <span className={`slider-arrow ${open ? "open" : ""}`}>
                  <svg width="16" height="16"  className={`arrow ${(openParents.includes(childParent.id)) ? 'rotate' : ''}`}  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.79492 18.885L13.5938 12L6.79492 5.115L8.88804 3L17.7949 12L8.88804 21L6.79492 18.885Z" fill="#FFFFFF"/>
                  </svg>
                </span>
              </div>
    
              {/* Dropdown Items */}
              {openParents.includes(childParent.id) && (
                <ul className="list-unstyled m-0 p-0">
                  <li className={`dropdown-item ml-4 text-white ${styles.clubcontent}`}>
                    <span className='fs-6'>- Stats</span>
                  </li>
                  <li className={`dropdown-item ml-4 text-white ${styles.clubcontent}`}>
                    <span>- Play-Cricket Profile & Preference</span>
                  </li>
                  <li className={`dropdown-item ml-4 text-white ${styles.clubcontent}`}>
                    <span>- Roles & Memberships</span>
                  </li>
                  <li className={`dropdown-item ml-4 text-white ${styles.clubcontent}`}>
                    <span>- Availability</span>
                  </li>
                </ul>
              )}
    
            </div>
          ))}
        </div>}
        <div className={`${styles.content} p-3`}>
          <div className="d-flex align-items-center py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.9 18.6H13.1V16.4H10.9V18.6ZM12 1C5.928 1 1 5.928 1 12C1 18.072 5.928 23 12 23C18.072 23 23 18.072 23 12C23 5.928 18.072 1 12 1ZM12 20.8C7.149 20.8 3.2 16.851 3.2 12C3.2 7.149 7.149 3.2 12 3.2C16.851 3.2 20.8 7.149 20.8 12C20.8 16.851 16.851 20.8 12 20.8ZM12 5.4C9.569 5.4 7.6 7.369 7.6 9.8H9.8C9.8 8.59 10.79 7.6 12 7.6C13.21 7.6 14.2 8.59 14.2 9.8C14.2 12 10.9 11.725 10.9 15.3H13.1C13.1 12.825 16.4 12.55 16.4 9.8C16.4 7.369 14.431 5.4 12 5.4Z" fill="#FFFFFF"/>
            </svg>
            <span className="ml-2 slider-name text-white font-weight-bold">Help Center</span>
          </div>
          {/* <div className="d-flex align-items-center py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.99 11L3 15L6.99 19V16H14V14H6.99V11ZM21 9L17.01 5V8H10V10H17.01V13L21 9Z" fill="#FFFFFF"/>
            </svg>
            <span className="ml-2 slider-name text-white font-weight-bold">Switch user</span>
          </div> */}
          <div className="d-flex align-items-center py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="#FFFFFF"/>
            </svg>
            <span className="ml-2 slider-name text-white font-weight-bold">Log out</span>
          </div>
          <div className="d-flex align-items-center py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="#FFFFFF"/>
            </svg>
            <span className="ml-2 slider-name text-white font-weight-bold">Log out of all ECB apps</span>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default Slider;