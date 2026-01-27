import React,{useEffect, useState} from 'react';
import TopHeader from './TopHeader';
import Header from './Header';
import topStyles from './topHeader.module.css';
import styles from './header.module.css';
import '../../src/styles/styles.css';
import Slider from './Slider';


export default function MainHeader({clubs, data}) {
  const [selectedClub, setSelectedClub] = useState('')
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState('')
  const handleClub = (c) => {
    setSelectedClub(c);
  }
  const clubHandler = (c) => {
    setSelectedClub(c);
  }
  return (
    <>
    <TopHeader clubs={clubs} data={data} sendData={handleClub} onMenuClick={(link)=> {setSelectedLink(link);setIsSliderOpen(true)}}/>
    <Slider isOpen={isSliderOpen} onClose={()=>setIsSliderOpen(false)} link={selectedLink} onClubSelect={clubHandler} data={data}/>
    {selectedClub !== '' && <Header club={selectedClub}/>}
    </>
  )
}
