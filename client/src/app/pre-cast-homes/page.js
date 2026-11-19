import React from 'react'
import PrecastHero from './components/PrecastHero'
import DifferentNeeds from './components/DifferentNeeds'
import SolarEnergy from './components/SolarEnergy'
import TerraceAmenities from './components/TerraceAmenities'
import AvailableOn from './components/AvailableOn'
import SalesProcess from './components/SalesProcess'
import BusinessBenefits from './components/BusinessBenefits'
import PrecastEnquiry from './components/PrecastEnquiry'
import RegulatoryDocs from './components/RegulatoryDocs'

const page = () => {
  return (
    <div>
      <PrecastHero />
      <DifferentNeeds />
      <SolarEnergy />
      <TerraceAmenities />
      <AvailableOn />
      <RegulatoryDocs />
      <SalesProcess />
      <BusinessBenefits />
      <PrecastEnquiry />
    </div>
  )
}

export default page
