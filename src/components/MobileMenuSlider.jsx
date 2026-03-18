import React,{useState,useEffect,useRef} from 'react';
import styles from "./MobileMenuSlider.module.css";
import headerlogo from '../assets/Cricket Club Logo.png';
import MobileNavElements from './MobileNavElements';
 
const MobileMenuSlider = ({ isOpen, onClose, data }) => {
  const MobileMenuSliderRef = useRef(null)

  useEffect(()=>{
    const handleClickOutside = (e) => {
      if(MobileMenuSliderRef.current&& !MobileMenuSliderRef.current.contains(e.target)){
      }
    }
    document.addEventListener("mousedown",handleClickOutside);
    return () => 
      document.removeEventListener('mousedown',handleClickOutside);
  },[])
 

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className={`${styles.backdrop} d-lg-none`} onClick={onClose}></div>}
      {/* Slider Panel */}
      <div className={`${styles.slider} ${isOpen ? styles.open : ""} d-lg-none`} ref={MobileMenuSliderRef}>
        <div className={`${styles.top}`}>
          <div className={`${styles.logo}`}>
            <img src={headerlogo} alt="logo"/>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{onClose()}}>
              <path d="M16.708 5.52832C17.195 5.04133 17.9847 5.04133 18.4717 5.52832C18.9587 6.01531 18.9587 6.805 18.4717 7.29199L14.2939 11.4697C14.0011 11.7626 14.0011 12.2374 14.2939 12.5303L18.4717 16.708C18.9587 17.195 18.9587 17.9847 18.4717 18.4717C17.9847 18.9587 17.195 18.9587 16.708 18.4717L12.5303 14.2939C12.2374 14.0011 11.7626 14.0011 11.4697 14.2939L7.29199 18.4717C6.805 18.9587 6.01531 18.9587 5.52832 18.4717C5.04133 17.9847 5.04133 17.195 5.52832 16.708L9.70605 12.5303C9.99895 12.2374 9.99895 11.7626 9.70605 11.4697L5.52832 7.29199C5.04133 6.805 5.04133 6.01531 5.52832 5.52832C6.01531 5.04133 6.805 5.04133 7.29199 5.52832L11.4697 9.70605C11.7626 9.99895 12.2374 9.99895 12.5303 9.70605L16.708 5.52832Z" fill="#0B416A" stroke="#0B416A" strokeWidth="0.5"/>
            </svg>
          </div>
          <div className={`${styles.club_container}`}>
            <div>
              {data?.website?.name}
            </div>
            <span>Site Admin</span>
          </div>
        </div>
        <div className={`${styles.nav_container}`}>
          <MobileNavElements data={data}/>
        </div>
      </div>
    </>
  );
};
 
export default MobileMenuSlider;