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
    { value: "2.5", label: "Bathrooms" },
    { value: "~1,400", label: "Sq. Ft." },
    { value: "0.23", label: "Acre Lot" },
    { value: "1965", label: "Built" },
    { value: "2026", label: "Renovated" },
  ],
  headline: "Reworked for the way you live now.",
  description:
    "A freshly renovated split-level in the heart of West County, pairing approximately 1,400 square feet with modern finishes, a flexible basement bonus room, and a location that keeps everyday errands, parks, and Parkway schools close at hand.",
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
      title: "Bonus room below",
      text: "A finished basement bonus room adds flexible space for work, play, media, or guests.",
    },
    {
      number: "04",
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
  contact: {
    /** Web3Forms browser-side access key for buyer inquiry submissions. */
    web3formsAccessKey: "83a7da91-ecb9-46cb-a8eb-5c840e05ba61",
    subject: "Buyer inquiry — 1210 Miremont Drive",
  },
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=1210+Miremont+Drive+Ballwin+MO+63011",
  offerGuidelines:
    "All offers must be submitted with either a current lender pre-approval letter or proof of funds for cash purchases. Pre-qualification letters will not be accepted. The seller may verify financing information and will consider the strength of the financing terms and likelihood of closing when evaluating offers.",
  logo: "/images/logo.png",
  images: [
    "/images/IMG_7624.jpg",
    "/images/IMG_7628.jpg",
    "/images/IMG_7629.jpg",
    "/images/IMG_7630.jpg",
    "/images/IMG_7631.jpg",
    "/images/IMG_7633.jpg",
    "/images/IMG_7634.jpg",
    "/images/IMG_7540.jpg",
    "/images/IMG_7547.jpg",
    "/images/IMG_7541.jpg",
    "/images/IMG_7548.jpg",
    "/images/IMG_7535.jpg",
    "/images/IMG_7564.jpg",
    "/images/IMG_7534.jpg",
    "/images/IMG_7620.jpg",
    "/images/IMG_7553.jpg",
    "/images/IMG_7552.jpg",
    "/images/IMG_7558.jpg",
    "/images/IMG_7570.jpg",
  ],
  comingSoon: {
    eyebrow: "The next address is taking shape",
    headline: "A new renovation is coming soon.",
    text: "We are preparing another thoughtfully updated home. Check back for the first look, property details, and showing information.",
    image: "/images/coming-soon-renovation-collage.webp",
  },
} as const;
