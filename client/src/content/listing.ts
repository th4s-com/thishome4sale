/**
 * RENOVATION LEDGER CONTENT FILE
 * This is the only file that normally needs editing when a property changes.
 * Set status to "for-sale" or "coming-soon", then update the fields below.
 */

export type ListingStatus = "for-sale" | "coming-soon";

export const listing = {
  status: "for-sale" as ListingStatus,
  label: "For Sale By Owner",
  price: "$399,900",
  address: {
    street: "1210 Miremont Drive",
    cityStateZip: "Ballwin, Missouri 63011",
  },
  openHouse: {
    enabled: true,
    date: "Sunday, July 19",
    time: "1:00–3:00 PM",
    month: "JUL",
    day: "19",
  },
  facts: [
    { value: "3", label: "Bedrooms" },
    { value: "2", label: "Bathrooms" },
    { value: "1,380", label: "Sq. Ft." },
    { value: "0.23", label: "Acre Lot" },
    { value: "1965", label: "Built" },
    { value: "2026", label: "Renovated" },
  ],
  headline: "Reworked for the way you live now.",
  description:
    "A freshly renovated split-level in the heart of West County, pairing a functional layout with modern finishes and a location that keeps everyday errands, parks, and Parkway schools close at hand.",
  highlights: [
    {
      number: "01",
      title: "Freshly renovated",
      text: "Thoughtful 2026 updates give this established home a crisp, move-in-ready point of view.",
    },
    {
      number: "02",
      title: "Easy West County living",
      text: "Minutes from Manchester Road shopping, Costco, local parks, and daily conveniences.",
    },
    {
      number: "03",
      title: "Parkway schools",
      text: "Located near Pierremont Elementary, Parkway West Middle, and Parkway West High School.",
    },
  ],
  neighborhood: "Waycliffe Estates",
  record: [
    { label: "Sale route", value: "Direct from owner" },
    { label: "Open house", value: "Sun · Jul 19 · 1–3 PM" },
    { label: "School community", value: "Parkway" },
    { label: "Offer documentation", value: "Pre-approval / funds" },
  ],
  zillowUrl:
    "https://www.zillow.com/homedetails/1210-Miremont-Dr-Ballwin-MO-63011/2807056_zpid/",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=1210+Miremont+Drive+Ballwin+MO+63011",
  offerGuidelines:
    "All offers must be submitted with either a current lender pre-approval letter or proof of funds for cash purchases. Pre-qualification letters will not be accepted. The seller may verify financing information and will consider the strength of the financing terms and likelihood of closing when evaluating offers.",
  logo: "/manus-storage/logo-cropped_3f392358.png",
  images: [
    "/manus-storage/IMG_7624_fd3381c3.jpg",
    "/manus-storage/IMG_7628_c32015f5.jpg",
    "/manus-storage/IMG_7629_e7be515c.jpg",
    "/manus-storage/IMG_7630_b0877a27.jpg",
    "/manus-storage/IMG_7631_2fd944de.jpg",
    "/manus-storage/IMG_7633_24013165.jpg",
    "/manus-storage/IMG_7634_5b29ea64.jpg",
    "/manus-storage/IMG_7540_907f434e.jpg",
    "/manus-storage/IMG_7547_7016e875.jpg",
    "/manus-storage/IMG_7541_7baaf9f4.jpg",
    "/manus-storage/IMG_7548_04118864.jpg",
    "/manus-storage/IMG_7535_29d9f929.jpg",
    "/manus-storage/IMG_7564_fd660df4.jpg",
    "/manus-storage/IMG_7534_8df97573.jpg",
    "/manus-storage/IMG_7620_cd6955a4.jpg",
    "/manus-storage/IMG_7553_210b067e.jpg",
    "/manus-storage/IMG_7552_09180146.jpg",
    "/manus-storage/IMG_7558_d18835fc.jpg",
    "/manus-storage/IMG_7559_e7fc9241.jpg",
    "/manus-storage/IMG_7570_7cb64d9c.jpg",
  ],
  comingSoon: {
    eyebrow: "The next address is taking shape",
    headline: "A new renovation is coming soon.",
    text: "We are preparing another thoughtfully updated home. Check back for the first look, property details, and showing information.",
    image: "/manus-storage/coming-soon-renovation-collage_19a9d0ba.png",
  },
} as const;
