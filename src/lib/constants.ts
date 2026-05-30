export const BRAND = {
  name: "BHAGAT JI JEWELS",
  shortName: "Bhagat Ji",
  tagline: "Where Heritage Becomes Luxury.",
  established: 1960,
  owners: ["Amit Anand", "Vishal Anand"],
  address: {
    line1: "Kaserath Bazaar, Bank Road, Bhram Bazaar",
    city: "Chandausi",
    state: "Uttar Pradesh",
    pin: "244412",
    country: "India",
    full: "Kaserath Bazaar, Bank Road, Bhram Bazaar, Chandausi, Uttar Pradesh 244412, India",
  },
  phones: ["+91 9837020133", "+91 9897540919"],
  whatsapp: ["919837020133", "919897540919"],
  hours: "10:00 AM – 8:00 PM",
  coordinates: { lat: 28.4480714, lng: 78.7821592 },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d219.25278853539754!2d78.7821592!3d28.4480714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390adbe04452d373%3A0xa1de7748ca003aff!2sBhagat%20Ji%20Jewellers!5e0!3m2!1sen!2sin!4v1716820000000!5m2!1sen!2sin",
  mapLink:
    "https://maps.app.goo.gl/JPjys5vXZcGWWKph9",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    pinterest: "https://pinterest.com",
  },
} as const;

export const COLLECTIONS = [
  { id: "heritage-classics", title: "Heritage Classics", subtitle: "Antique temple masterpieces", image: "/jewelry/collection-cards/heritage-classics.png", desc: "Crafted in dark antique gold and studded with fine rubies and emeralds, inspired by India's majestic temple architecture." },
  { id: "brilliance", title: "Brilliance", subtitle: "Certified diamond statements", image: "/jewelry/collection-cards/brilliance.png", desc: "Luminous natural and lab-grown diamonds set in custom gold and platinum, reflecting unmatched fire and brilliance." },
  { id: "platinum-signature", title: "Platinum Signature", subtitle: "950 platinum jewellery", image: "https://images.pexels.com/photos/12081609/pexels-photo-12081609.jpeg?auto=compress&cs=tinysrgb&w=1200", desc: "A fresh open-source inspired platinum edit with rings, bands, chains, pendants, and statement jewellery in cool white-metal tones." },
  { id: "silver-stories", title: "Silver Stories", subtitle: "Premium 925 sterling silver", image: "/jewelry/collection-cards/silver-stories.png", desc: "Anti-tarnish 925 sterling silver earrings, rings, and chains offering affordable premium luxury for youth." },
  { id: "gold-chains", title: "Gold Chains", subtitle: "Classic chain designs", image: "/jewelry/collection-cards/gold-chains.png", desc: "Curated 22K gold chains with timeless links, polished silhouettes, and daily-wear strength." },
  { id: "kada", title: "Kada", subtitle: "Structured gold kadas", image: "/jewelry/collection-cards/kada.png", desc: "Bold 22K gold kada designs with detailed finishing and a confident traditional profile." },
  { id: "cuban", title: "Cuban", subtitle: "Bold link jewellery", image: "/jewelry/collection-cards/cuban.png", desc: "Sculptural Cuban link bangles and bracelets crafted for standout daily luxury." }
] as const;

export const CATEGORIES = [
  "Necklaces",
  "Earrings",
  "Bangles",
  "Rings",
  "Bracelets",
  "Chains",
  "Pendants",
  "Mangalsutra",
  "Nose Pins",
  "Anklets",
  "Coins & Bars",
] as const;

export const OCCASIONS = [
  "Wedding",
  "Engagement",
  "Festive",
  "Anniversary",
  "Daily Wear",
  "Office Wear",
  "Gifting",
  "Investment"
] as const;

export const METALS = ["Gold", "Silver", "Diamond", "Platinum"] as const;

export const PURITIES = [
  "24K Gold (999 Pure)",
  "22K Gold (916 Hallmarked)",
  "18K Gold (750 Hallmarked)",
  "14K Gold",
  "950 Platinum",
  "925 Sterling Silver"
] as const;

export const STORE_LOCATIONS = [
  {
    id: "chandausi-flagship",
    name: "Bhagat Ji Jewels",
    city: "Chandausi",
    address: "Kaserath Bazaar, Bank Road, Bhram Bazaar, Chandausi, Uttar Pradesh 244412",
    phone: "+91 9837020133",
    whatsapp: "919837020133",
    hours: "10:00 AM - 8:00 PM",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d219.25278853539754!2d78.7821592!3d28.4480714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390adbe04452d373%3A0xa1de7748ca003aff!2sBhagat%20Ji%20Jewellers!5e0!3m2!1sen!2sin!4v1716820000000!5m2!1sen!2sin",
    coordinates: { lat: 28.4480714, lng: 78.7821592 }
  }
] as const;

export const GOLD_SAVINGS_PLANS = [
  {
    id: "bhagat-golden-accumulate",
    name: "Bhagat Golden Accumulate Scheme",
    tenure: "11 Months",
    minInstallment: 2000,
    multiplier: 11,
    bonusPercent: 75, // 75% of one month installment as bonus
    description: "Pay 11 monthly installments, and Bhagat Ji Jewels will contribute 75% of the 12th installment as a discount. Redeem against any jewelry."
  },
  {
    id: "bhagat-royal-future",
    name: "Bhagat Royal Future Savings",
    tenure: "6 Months",
    minInstallment: 5000,
    multiplier: 6,
    bonusPercent: 30, // 30% of one month installment as bonus
    description: "A short-term planning scheme for upcoming anniversaries or gifts. Pay for 6 months and receive a 30% discount bonus on maturity."
  }
] as const;

export const BRAND_STORY = {
  intro: "Established in 1960 by the Anand family, BHAGAT JI JEWELS has been a beacon of purity and exceptional craftsmanship for over six decades. From a single showroom in the historic Kaserath Bazaar of Chandausi, we have expanded to serve discerning clientele across Uttar Pradesh and beyond.",
  timeline: [
    { year: "1960", title: "The Foundation", desc: "Founders establish the first store in Chandausi, Uttar Pradesh, promising 100% purity and customer trust." },
    { year: "1982", title: "Generational Growth", desc: "The second generation introduces innovative diamond-cutting techniques and expands to regional exhibitions." },
    { year: "2005", title: "Moradabad Showroom", desc: "Opening of the state-of-the-art experience center in Moradabad to cater to international exports and bridal clients." },
    { year: "2018", title: "Digital Pioneer", desc: "Introduction of state-of-the-art Virtual Try-On and WhatsApp Concierge, bridging legacy with technology." },
    { year: "2026", title: "The Next Era", desc: "Launching 5 regional lounges and online premium digital gold offerings to mark 66 years of heritage." }
  ]
} as const;

export const BESTSELLERS = [
  { id: "1", name: "Imperial Gold Choker", category: "Necklaces", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80", badge: "Heritage" },
  { id: "15", name: "Imperial Gold Jhumkas", category: "Earrings", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80", badge: "Bestseller" },
  { id: "33", name: "Ornate Gold Kangan", category: "Bangles", image: "https://images.unsplash.com/photo-1617032213175-1fc37d0f3d41?w=600&q=80", badge: "Limited" },
  { id: "47", name: "Imperial Diamond Solitaire Ring", category: "Rings", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80", badge: "New" },
  { id: "109", name: "Imperial Gold Full Bridal Set", category: "Bridal Sets", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", badge: "Exclusive" },
] as const;

export const TRUST_POINTS = [
  { title: "BIS Hallmark Certified", desc: "Every piece verified for purity and authenticity." },
  { title: "Trusted Since 1960", desc: "Over six decades of generational trust." },
  { title: "Premium Craftsmanship", desc: "Master artisans shaping timeless heirlooms." },
  { title: "Custom Jewelry", desc: "Bespoke creations tailored to your vision." },
  { title: "Transparent Pricing", desc: "Honest value with complete clarity." },
  { title: "Luxury Packaging", desc: "Presentation worthy of royalty." },
  { title: "Lifetime Relationship", desc: "We journey with you beyond the purchase." },
] as const;

export const TESTIMONIALS = [
  { name: "Priya & Rahul Sharma", location: "Delhi", text: "Our wedding jewelry from Bhagat Ji Jewels was nothing short of royal. Three generations of our family trust them — and now we understand why.", rating: 5 },
  { name: "Anjali Mehta", location: "Mumbai", text: "The craftsmanship is extraordinary. Walking into their Chandausi store feels like entering a palace of gold. Truly world-class.", rating: 5 },
  { name: "Rajesh Anand", location: "Lucknow", text: "Since 1960, they have never compromised on purity. My mother's necklace, now mine — still gleams like the day she received it.", rating: 5 },
  { name: "Sneha Kapoor", location: "Noida", text: "The bridal collection made me feel like royalty. Every detail, every stone — perfection. This is not a shop, it is a legacy.", rating: 5 },
] as const;

export const INSTAGRAM_POSTS = [
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
  "https://images.unsplash.com/photo-1617032213175-1fc37d0f3d41?w=400&q=80",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
  "https://images.unsplash.com/photo-1603561591411-07134e9227c9?w=400&q=80",
  "https://images.unsplash.com/photo-1601121143461-5415b4e6c4b8?w=400&q=80",
] as const;
