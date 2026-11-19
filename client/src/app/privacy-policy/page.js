import React from "react";
import LegalPage from "@/components/common/LegalPage";
import { privacyPolicy } from "@/data/privacyData";

// export const metadata = {
//   title: "Privacy Policy",
// };

const page = () => {
  return <LegalPage {...privacyPolicy} />;
};

export default page;
