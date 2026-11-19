// "use client";
// import Link from "next/link";
// import { Container, Reveal, WordReveal, Eyebrow, SANS } from "@/components/ui/Animations";

// const statusCls = {
//   Available: "bg-[#D6E3FF] text-[#1B4B7F]",
//   Reserved: "bg-[#FFDEA9] text-[#6B4E1B]",
//   "Sold Out": "bg-[#E3E8F2] text-[#44474D]",
// };

// const actionCls = {
//   Enquire: "bg-[#0B1F3A] text-white",
//   Waitlist: "bg-[#E3E8F2] text-[#171C22]",
//   "Similar Units": "bg-[#E3E8F2] text-[#171C22]",
// };

// const units = [
//   { unit: "Unit 302", tower: "Tower A", area: "1,850 sq.ft.", config: "3 BHK", facing: "East Facing", floor: "Floor 3", rate: "₹8,500", status: "Available", action: "Enquire" },
//   { unit: "Unit 704", tower: "Tower A", area: "2,100 sq.ft.", config: "3 BHK", facing: "North Facing", floor: "Floor 7", rate: "₹8,500", status: "Available", action: "Enquire" },
//   { unit: "Unit 1101", tower: "Tower B", area: "2,450 sq.ft.", config: "4 BHK", facing: "East Facing", floor: "Floor 11", rate: "₹8,700", status: "Reserved", action: "Waitlist" },
//   { unit: "Unit 1403", tower: "Tower B", area: "2,450 sq.ft.", config: "4 BHK", facing: "North-East", floor: "Floor 14", rate: "₹8,700", status: "Available", action: "Enquire" },
//   { unit: "Unit 1702", tower: "Tower C", area: "3,200 sq.ft.", config: "4 BHK Sky Villa", facing: "Panoramic", floor: "Floor 17", rate: "₹9,100", status: "Sold Out", action: "Similar Units", muted: true },
// ];

// const heads = ["Unit #", "Tower", "Area", "Config", "Facing", "Floor", "Carpet Rate", "Status", "Action"];

// const UnitInventory = () => {
//   return (
//     <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F1F0EB] py-16`}>
//       <Container>
//         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
//           <div>
//             <Eyebrow className="!text-[10px]">Transparency First</Eyebrow>
//             <h2 className="mt-4 font-light text-[#171C22] tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl lg:text-5xl">
//               <WordReveal text="Unit Inventory & Real-Time Availability" />
//             </h2>
//           </div>
//           <Reveal delay={0.2} className="shrink-0">
//             <p className="max-w-xs bg-[#E3E8F2] px-4 py-3 text-[9px] font-medium uppercase leading-relaxed tracking-[0.12em] text-[#44474D]">
//               Mandate: All values presented in rate (₹/sq.ft.) per RERA carpet standard
//             </p>
//           </Reveal>
//         </div>

//         <Reveal y={40} className="mt-8">
//           <div className="overflow-x-auto bg-white shadow-[0_10px_40px_-24px_rgba(11,31,58,0.35)]">
//             <table className="w-full min-w-[960px] text-left">
//               <thead>
//                 <tr className="bg-[#000615]">
//                   {heads.map((h, i) => (
//                     <th
//                       key={h}
//                       className={`px-5 py-4 text-[9px] font-bold uppercase tracking-[0.12em] text-white ${
//                         i === heads.length - 1 ? "text-right" : ""
//                       }`}
//                     >
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {units.map((u) => (
//                   <tr key={u.unit} className={`border-b border-[#EDEBE4] ${u.muted ? "opacity-70" : ""}`}>
//                     <td className="px-5 py-5 text-base font-semibold text-[#171C22]">{u.unit}</td>
//                     <td className="px-5 py-5 text-sm text-[#44474D]">{u.tower}</td>
//                     <td className="px-5 py-5 text-sm text-[#44474D]">{u.area}</td>
//                     <td className="px-5 py-5 text-sm text-[#44474D]">{u.config}</td>
//                     <td className="px-5 py-5 text-sm text-[#44474D]">{u.facing}</td>
//                     <td className="px-5 py-5 text-sm text-[#44474D]">{u.floor}</td>
//                     <td className="px-5 py-5 text-base font-bold text-[#336192]">
//                       {u.rate}
//                       <span className="text-[10px] font-normal"> / sq.ft.</span>
//                     </td>
//                     <td className="px-5 py-5">
//                       <span className={`inline-block px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide ${statusCls[u.status]}`}>
//                         {u.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-5 text-right">
//                       <Link
//                         href="#consultation"
//                         className={`inline-block px-4 py-2.5 text-[10px] font-bold uppercase tracking-wide ${actionCls[u.action]}`}
//                       >
//                         {u.action}
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Reveal>
//       </Container>
//     </section>
//   );
// };

// export default UnitInventory;









"use client";
import Link from "next/link";
import { Container, Reveal, WordReveal, Eyebrow, SANS } from "@/components/ui/Animations";

const statusCls = {
  Available: "bg-[#D6E3FF] text-[#1B4B7F]",
  Reserved: "bg-[#FFDEA9] text-[#6B4E1B]",
  "Sold Out": "bg-[#E3E8F2] text-[#44474D]",
};

const actionCls = {
  Available: "bg-[#0B1F3A] text-white hover:bg-[#164A7A]",
  Reserved: "bg-[#E3E8F2] text-[#171C22] hover:bg-[#D6E3FF]",
  "Sold Out": "bg-[#E3E8F2] text-[#44474D] opacity-60 cursor-not-allowed",
};

const heads = ["Unit Name", "Floor Elevation", "Property Typology", "Rate Specifier", "Status", "Action"];

const UnitInventory = ({ property }) => {
  const floorUnits = property?.floorUnits || [];

  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F1F0EB] py-16`}>
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <Eyebrow className="!text-[10px]">Transparency First</Eyebrow>
            <h2 className="mt-4 font-light text-[#171C22] tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl lg:text-5xl">
              <WordReveal text="Unit Inventory & Real-Time Availability" />
            </h2>
          </div>
          <Reveal delay={0.2} className="shrink-0">
            <p className="max-w-xs bg-[#E3E8F2] px-4 py-3 text-[9px] font-medium uppercase leading-relaxed tracking-[0.12em] text-[#44474D]">
              {property?.inventoryPreset || "Audited Real-Time Inventory Status"}
            </p>
          </Reveal>
        </div>

        <Reveal y={40} className="mt-8">
          <div className="overflow-x-auto bg-white shadow-[0_10px_40px_-24px_rgba(11,31,58,0.35)]">
            {floorUnits.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-base font-medium text-[#171C22]">{property?.propertyName}</p>
                <p className="mt-1 text-xs text-[#44474D]">
                  Independent Private Residence • Status: {property?.developmentStatus}
                </p>
                <Link
                  href="#consultation"
                  className="mt-5 inline-block bg-[#0B1F3A] px-6 py-3 text-[10px] font-bold uppercase tracking-wide text-white"
                >
                  Enquire for Entire Estate
                </Link>
              </div>
            ) : (
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="bg-[#000615]">
                    {heads.map((h, i) => (
                      <th
                        key={h}
                        className={`px-5 py-4 text-[9px] font-bold uppercase tracking-[0.12em] text-white ${
                          i === heads.length - 1 ? "text-right" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {floorUnits.map((u, idx) => (
                    <tr key={`${u.floor}-${u.unitName}-${idx}`} className="border-b border-[#EDEBE4]">
                      <td className="px-5 py-5 text-base font-semibold text-[#171C22]">{u.unitName}</td>
                      <td className="px-5 py-5 text-sm text-[#44474D]">Floor {u.floor}</td>
                      <td className="px-5 py-5 text-sm text-[#44474D]">{property?.propertyType}</td>
                      <td className="px-5 py-5 text-base font-bold text-[#336192]">
                        ₹{property?.pricePerSqft?.toLocaleString("en-IN") || "0"}
                        <span className="text-[10px] font-normal"> / sq.ft.</span>
                      </td>
                      <td className="px-5 py-5">
                        <span className={`inline-block px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide ${statusCls[u.status] || "bg-[#D6E3FF] text-[#1B4B7F]"}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-5 py-5 text-right">
                        {u.status === "Sold Out" ? (
                          <span className={`inline-block px-4 py-2.5 text-[10px] font-bold uppercase tracking-wide ${actionCls[u.status]}`}>
                            Sold Out
                          </span>
                        ) : (
                          <Link
                            href="#consultation"
                            className={`inline-block px-4 py-2.5 text-[10px] font-bold uppercase tracking-wide transition-colors duration-300 ${actionCls[u.status] || "bg-[#0B1F3A] text-white"}`}
                          >
                            {u.status === "Reserved" ? "Waitlist" : "Enquire"}
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default UnitInventory;