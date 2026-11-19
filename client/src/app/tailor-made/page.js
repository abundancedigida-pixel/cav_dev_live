import React from 'react'
import TailorHero from './components/TailorHero'
import FamilyWayOfLiving from './components/FamilyWayOfLiving'
import ShapeSpaces from './components/ShapeSpaces'
import ImagineMore from './components/ImagineMore'
import ArtisanalDetails from './components/ArtisanalDetails'
import TailorFAQ from './components/TailorFAQ'
import TailorEnquiry from './components/TailorEnquiry'

const page = () => {
  return (
    <div>
      <TailorHero />
      <FamilyWayOfLiving />
      <ShapeSpaces />
      <ImagineMore />
      <ArtisanalDetails />
      <TailorFAQ />
      <TailorEnquiry />
    </div>
  )
}

export default page
