import React,{useEffect, useState} from 'react';
import TopHeader from './TopHeader';
import Header from './Header';
import topStyles from './topHeader.module.css';
import styles from './header.module.css';
import '../../src/styles/styles.css';
import Slider from './Slider';


export default function MainHeader({userName,clubs}) {
  const [selectedClub, setSelectedClub] = useState('HARLOW TOWN CC')
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const handleClub = (c) => {
    setSelectedClub(c);
  }
  return (
    <>
    <TopHeader clubs={clubs} sendData={handleClub} onMenuClick={()=> setIsSliderOpen(true)}/>
    <Slider isOpen={isSliderOpen} onClose={()=>setIsSliderOpen(false)}/>
    <Header userName={userName} club={selectedClub}/>
    </>
  )
}
