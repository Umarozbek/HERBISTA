import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import CommonEvents from '../../components/CommonEvents/CommonEvents'
import MostBoughtUsers from '../../components/MostBoughtUsers/MostBoughtUsers'
import VideoTour from '../../components/VideoTour/VideoTour'
import Chef from '../../components/Chef/Chef'
import Reservation from '../../components/Reservation/Reservation'
import Gallery from '../../components/Gallery/Gallery'
import Stats from '../../components/Stats/Stats'
import InstagramFeed from '../../components/InstagramFeed/InstagramFeed'

const Home = () => {
  const [category,setCategory] = useState("All")
  
  return (
    <>
      <Header/>
      <div id="explore-menu">
        <ExploreMenu setCategory={setCategory} category={category}/>
      </div>
      <FoodDisplay category={category}/>
      <div id="video-tour">
        <VideoTour/>
      </div>
      <Gallery/>
      <div id="chef">
        <Chef/>
      </div>
      <div id="most-bought-users">
        <MostBoughtUsers/>
      </div>
      <Stats/>
      <hr className="stats-separator" />
      <div id="reservation">
        <Reservation/>
      </div>
      <div id="common-events">
        <CommonEvents/>
      </div>
      <div id="instagram-feed">
        <InstagramFeed/>
      </div>
      <div id="app-download">
        <AppDownload/>
      </div>
    </>
  )
}

export default Home
