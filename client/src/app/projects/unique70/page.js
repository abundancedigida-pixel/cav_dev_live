import React from 'react'
import Hero from './components/Hero'
import IdeaBehind from './components/IdeaBehind'
import MasterPlan from './components/MasterPlan'
import HomeLayouts from './components/HomeLayouts'
import ThreeChapters from './components/ThreeChapters'
import CommunityAmbition from './components/CommunityAmbition'
import ProjectEnquiry from './components/ProjectEnquiry'

const page = () => {
  return (
    <div>
      <Hero />
      <IdeaBehind />
      <MasterPlan />
      <HomeLayouts />
      <ThreeChapters />
      <CommunityAmbition />
      <ProjectEnquiry />
    </div>
  )
}

export default page