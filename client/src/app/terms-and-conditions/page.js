import React from 'react'
import LegalPage from "@/components/common/LegalPage"
import { termsAndConditions } from "@/data/termsData";

export const metadata = {
  title: "Terms and Conditions",
};

const page = () => {
  return <LegalPage {...termsAndConditions} />
}

export default page
