import React,{useEffect, useState} from 'react';
import TopHeader from './TopHeader';
import Header from './Header';
import topStyles from './topHeader.module.css';
import styles from './header.module.css';
import '../../src/styles/bootstrap-scoped.min.css';
import '../../src/styles/styles.css';
import Slider from './Slider';
import MobileMenuSlider from './MobileMenuSlider';


export default function MainHeader({clubs,data}) {
  const [selectedClub, setSelectedClub] = useState('');
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');
  const [isMobileSliderOpen, setIsMobileSlider] = useState(false);

  const handleClub = (c) => {
    setSelectedClub(c);
  }
  const clubHandler = (c) => {
    setSelectedClub(c);
  }
  console.log("version after css changes");
  return (
    <>
    {(data?.headerData) && <MobileMenuSlider isOpen={isMobileSliderOpen} onClose={()=>setIsMobileSlider(false)} data={data.headerData}/>}
    {data?.topHeaderData &&
      <>
        <TopHeader clubs={clubs} data={data.topHeaderData} sendData={handleClub} onMenuClick={(link)=> {setSelectedLink(link);setIsSliderOpen(true)}}/>
        <Slider isOpen={isSliderOpen} onClose={()=>setIsSliderOpen(false)} link={selectedLink} onClubSelect={clubHandler} data={data.topHeaderData}/>
      </>
    }
    {(data?.headerData) && <Header club={selectedClub} onMobileMenuClick={(val)=>{setIsMobileSlider(val)}} data={data.headerData}/>}
    </>
  )
}
