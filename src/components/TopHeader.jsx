import React,{useState, useRef, useEffect} from 'react'
import styles from './topHeader.module.css';
import logo from '../assets/PC Admin logo_primary.png'
import styl from './header.module.css';

export default function TopHeader({clubs,sendData, onMenuClick}){
    const [showClubs, setShowClubs] = useState(false);
     const notifyRef = useRef(null)
    useEffect(()=>{
    const handleClickOutside = (e) => {
        if(notifyRef.current&& !notifyRef.current.contains(e.target)){
        setShowClubs(false);
        }
    }
    document.addEventListener("mousedown",handleClickOutside);
    return () => 
        document.removeEventListener('mousedown',handleClickOutside);
    },[])
    return(
        <>
        <div className={`bg-white ${styles.container}`}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img src={logo} alt="logo" width="150px" height="33px" className="mr-2"/>
                </div>
                <ul className={` d-none d-lg-flex justify-content-between list-unstyled ${styles.custom}`}>
                    <li>
                    <a href="#" className="text-decoration-none">Accessibility</a>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1C18.072 1 23 5.928 23 12C23 18.072 18.072 23 12 23C5.928 23 1 18.072 1 12C1 5.928 5.928 1 12 1ZM12 3.2002C7.149 3.2002 3.2002 7.149 3.2002 12C3.2002 16.851 7.149 20.7998 12 20.7998C16.851 20.7998 20.7998 16.851 20.7998 12C20.7998 7.149 16.851 3.2002 12 3.2002ZM17.333 8.5C17.6997 8.5 18 8.8152 18 9.2002C17.9999 9.58511 17.6996 9.90039 17.333 9.90039H14V18.2998C14 18.6848 13.6997 19 13.333 19C12.9665 18.9998 12.667 18.6847 12.667 18.2998V14.7998H11.333V18.2998C11.333 18.6847 11.0335 18.9998 10.667 19C10.3003 19 10 18.6848 10 18.2998V9.90039H6.66699C6.30039 9.90039 6.0001 9.58511 6 9.2002C6 8.8152 6.30033 8.5 6.66699 8.5H17.333ZM12 5C12.7333 5 13.333 5.63039 13.333 6.40039C13.3328 7.17021 12.7332 7.7998 12 7.7998C11.2668 7.7998 10.6672 7.17021 10.667 6.40039C10.667 5.63039 11.2667 5 12 5Z" fill="#7BC058"/>
                    </svg>
                    <span className={`mx-2 ${styles.divider}`}></span>
                    </li>
                    <li>
                    <a href="https://play-cricket.ecb.co.uk/hc/en-us?_ga=2.252760970.2035827330.1767185775-2012106595.1764749022" target="blank" className="text-decoration-none">Support</a>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9 18.6H13.1V16.4H10.9V18.6ZM12 1C5.928 1 1 5.928 1 12C1 18.072 5.928 23 12 23C18.072 23 23 18.072 23 12C23 5.928 18.072 1 12 1ZM12 20.8C7.149 20.8 3.2 16.851 3.2 12C3.2 7.149 7.149 3.2 12 3.2C16.851 3.2 20.8 7.149 20.8 12C20.8 16.851 16.851 20.8 12 20.8ZM12 5.4C9.569 5.4 7.6 7.369 7.6 9.8H9.8C9.8 8.59 10.79 7.6 12 7.6C13.21 7.6 14.2 8.59 14.2 9.8C14.2 12 10.9 11.725 10.9 15.3H13.1C13.1 12.825 16.4 12.55 16.4 9.8C16.4 7.369 14.431 5.4 12 5.4Z" fill="#7BC058"/>
                    </svg>
                    <span className={`mx-2 ${styles.divider}`}></span>
                    </li>
                    <li>
                    <a href="#" className="text-decoration-none">My Account</a>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1C18.072 1 23 5.928 23 12C23 18.072 18.072 23 12 23C5.928 23 1 18.072 1 12C1 5.928 5.928 1 12 1ZM12 13C9.78944 13 8.37066 13.9834 7.4502 15.2217C6.66684 16.2756 6.247 17.522 6.0752 18.5C7.64021 19.9278 9.72045 20.7998 12 20.7998C14.2793 20.7998 16.3589 19.9276 17.9238 18.5C17.752 17.5221 17.3331 16.2755 16.5498 15.2217C15.6293 13.9834 14.2106 13 12 13ZM12 3.2002C7.149 3.2002 3.2002 7.149 3.2002 12C3.2002 13.6869 3.67892 15.2639 4.50586 16.6045C4.80047 15.7483 5.2346 14.8504 5.8457 14.0283C6.74038 12.8248 8.01455 11.7928 9.74121 11.3037C8.68904 10.584 8 9.37436 8 8C8 5.78667 9.78667 4 12 4C14.2133 4 16 5.78667 16 8C16 9.37465 15.3104 10.584 14.2578 11.3037C15.9849 11.7927 17.2595 12.8246 18.1543 14.0283C18.7653 14.8503 19.1986 15.7484 19.4932 16.6045C20.3203 15.2638 20.7998 13.6871 20.7998 12C20.7998 7.149 16.851 3.2002 12 3.2002ZM12 6C10.8912 6 10 6.89124 10 8C10 9.10876 10.8912 10 12 10C13.1088 10 14 9.10876 14 8C14 6.89124 13.1088 6 12 6Z" fill="#7BC058"/>
                    </svg>
                    <span className={`mx-2 ${styles.divider}`}></span>
                    </li>
                    <li className={`text-decoration-none dropdown ${showClubs ? 'show' : null}`} ref={notifyRef}>
                    <a href="#" className={`nav-link custom-toggle dropdown-toggle ${styl.ct}`} onClick={()=>{onMenuClick();}}>My Clubs & Leagues</a>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1918_67329)">
                        <path d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM17.5 18.4385L16.4375 19.501L13.25 16.3135L14.3125 15.251L17.5 18.4385ZM6.3457 6.21973C6.63868 5.92676 7.1123 5.92675 7.40527 6.21973L13.7832 12.5977C14.076 12.8906 14.0761 13.3643 13.7832 13.6572L11.6572 15.7832C11.3643 16.0761 10.8906 16.076 10.5977 15.7832L4.21973 9.40527C3.92675 9.1123 3.92676 8.63868 4.21973 8.3457L6.3457 6.21973ZM15 6C16.1046 6 17 6.89543 17 8C17 9.10457 16.1046 10 15 10C13.8954 10 13 9.10457 13 8C13 6.89543 13.8954 6 15 6Z" fill="#7BC058"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1918_67329">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <div className={`dropdown-menu ${showClubs  ? 'show' : null}`} aria-labelledby="navbarDropdown">
                    {clubs && clubs.length > 0 && clubs.map((club)=>(
                    <li onClick={()=>{sendData(club);setShowClubs(false)}}className='dropdown-item'>{club}</li>
                    ))}
                    </div>
                    </li>
                </ul>
                <ul className={`d-flex d-lg-none justify-content-between list-unstyled ${styles.custom}`}>
                    <li>
                    {/* <a href="#" className="text-decoration-none">My Account</a> */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1C18.072 1 23 5.928 23 12C23 18.072 18.072 23 12 23C5.928 23 1 18.072 1 12C1 5.928 5.928 1 12 1ZM12 13C9.78944 13 8.37066 13.9834 7.4502 15.2217C6.66684 16.2756 6.247 17.522 6.0752 18.5C7.64021 19.9278 9.72045 20.7998 12 20.7998C14.2793 20.7998 16.3589 19.9276 17.9238 18.5C17.752 17.5221 17.3331 16.2755 16.5498 15.2217C15.6293 13.9834 14.2106 13 12 13ZM12 3.2002C7.149 3.2002 3.2002 7.149 3.2002 12C3.2002 13.6869 3.67892 15.2639 4.50586 16.6045C4.80047 15.7483 5.2346 14.8504 5.8457 14.0283C6.74038 12.8248 8.01455 11.7928 9.74121 11.3037C8.68904 10.584 8 9.37436 8 8C8 5.78667 9.78667 4 12 4C14.2133 4 16 5.78667 16 8C16 9.37465 15.3104 10.584 14.2578 11.3037C15.9849 11.7927 17.2595 12.8246 18.1543 14.0283C18.7653 14.8503 19.1986 15.7484 19.4932 16.6045C20.3203 15.2638 20.7998 13.6871 20.7998 12C20.7998 7.149 16.851 3.2002 12 3.2002ZM12 6C10.8912 6 10 6.89124 10 8C10 9.10876 10.8912 10 12 10C13.1088 10 14 9.10876 14 8C14 6.89124 13.1088 6 12 6Z" fill="#7BC058"/>
                    </svg>
                    <span className={`mx-2 ${styles.divider}`}></span>
                    </li>
                    <li className={`text-decoration-none dropdown ${showClubs ? 'show' : null}`} ref={notifyRef}>
                    {/* <a href="#" className={`nav-link custom-toggle dropdown-toggle ${styl.ct}`} onClick={()=>{onMenuClick();}}>My Clubs & Leagues</a> */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{onMenuClick();}}>
                        <g clip-path="url(#clip0_1918_67329)">
                        <path d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM17.5 18.4385L16.4375 19.501L13.25 16.3135L14.3125 15.251L17.5 18.4385ZM6.3457 6.21973C6.63868 5.92676 7.1123 5.92675 7.40527 6.21973L13.7832 12.5977C14.076 12.8906 14.0761 13.3643 13.7832 13.6572L11.6572 15.7832C11.3643 16.0761 10.8906 16.076 10.5977 15.7832L4.21973 9.40527C3.92675 9.1123 3.92676 8.63868 4.21973 8.3457L6.3457 6.21973ZM15 6C16.1046 6 17 6.89543 17 8C17 9.10457 16.1046 10 15 10C13.8954 10 13 9.10457 13 8C13 6.89543 13.8954 6 15 6Z" fill="#7BC058"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1918_67329">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <div className={`dropdown-menu ${showClubs  ? 'show' : null}`} aria-labelledby="navbarDropdown">
                    {clubs && clubs.length > 0 && clubs.map((club)=>(
                    <li onClick={()=>{sendData(club);setShowClubs(false)}}className='dropdown-item'>{club}</li>
                    ))}
                    </div>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}