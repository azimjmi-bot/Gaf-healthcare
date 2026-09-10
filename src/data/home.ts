export const YOUTUBE_CHANNEL = "https://www.youtube.com/@GAFHealthcare";

export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Gaf+Healthcare+Pvt+Ltd/@2.7964412,73.9897062,3z/data=!3m1!4b1!4m6!3m5!1s0x8f5eeeb21f6fc0cf:0xed19d271ea0345d9!8m2!3d2.7964412!4d73.9897062!16s%2Fg%2F11njffh0c0?entry=ttu";

/** Public Google Business Profile figures from the listing the desk supplied. */
export const GOOGLE_PROFILE = {
  rating: "5.0",
  reviewCount: 10,
  sourceLabel: "Google reviews",
};

export const HOME_VIDEOS = [
  {
    id: "ByvmaXZwtps",
    title: "Grandfather’s Gratitude: Raghd’s Congenital Valve Surgery Succeeds at Fortis, India",
  },
  {
    id: "SG5ish2qHQQ",
    title: "Heart Healed, Hope Restored | Ibrahim’s Life-Saving Surgery Success",
  },
  {
    id: "VMUKALCQwMI",
    title: "Iraqi Family’s Journey: Baby Ibrahim’s Life-Saving Heart Surgery in India",
  },
  {
    id: "0SXI9tohwng",
    title: "Life-Changing Experience | Patient Testimonial",
  },
] as const;

/**
 * Destination cards link only to existing catalog filters.
 * Germany is on the mock but is not in the country taxonomy, so it is omitted.
 */
export const HOME_DESTINATIONS = [
  {
    name: "India",
    filter: "India",
    blurb: "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Taj Mahal, India",
  },
  {
    name: "Turkey",
    filter: "Türkiye",
    blurb: "Istanbul",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Istanbul skyline, Turkey",
  },
  {
    name: "Thailand",
    filter: "Thailand",
    blurb: "Bangkok",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Temple in Bangkok, Thailand",
  },
  {
    name: "UAE",
    filter: "United Arab Emirates",
    blurb: "Dubai",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea77f140d33?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Dubai skyline, United Arab Emirates",
  },
  {
    name: "Singapore",
    filter: "Singapore",
    blurb: "Singapore",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Marina Bay, Singapore",
  },
  {
    name: "South Korea",
    filter: "South Korea",
    blurb: "Seoul",
    image:
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Seoul cityscape, South Korea",
  },
] as const;

/** Verbatim patient reviews from the GAF Healthcare Pvt Ltd Google listing. */
export const HOME_REVIEWS = [
  {
    name: "Baraka Mwijarubi",
    text: "Initially I was very hesitant what to do, where to go for the treatment of my father who was suffering with prostate cancer. Thanks to google, I came into touch with Gaf Healthcare. They have arranged everything, starting from treatment plan, video consultation, airport pickup, to surgery and following up. My father was operated in Sahyadri Pune, robotic prostatectomy was done. Now he is fine.",
  },
  {
    name: "Anna Silvest",
    text: "The hospitality was at its point. I appreciate the great service I got from the team. Being away from Home and get the feeling like you are at home is what Gaf is doing. Thank you once more, this have lifetime memories in my life.",
  },
  {
    name: "Francis Makange",
    text: "Wonderful experience with Gaf Healthcare. I was quite hesitant before traveling. But the way entire journey has been planned, charted out and facilitated by Gaf was truly exceptional. Dr. Ritu in Max has treated me well. My eye surgery went well.",
  },
  {
    name: "Ummy Msangi",
    text: "Very nice hospitality, I have taken my mother to Fortis Hospital with help of Gaf healthcare. Initially, I was anxious but these guys made me very comfortable and mama got treated well. Thank you so much guys.",
  },
] as const;

export const HOME_COST_SLUGS = [
  "breast-conserving-surgery-lumpectomy",
  "cabg-coronary-artery-bypass-grafting",
  "total-knee-replacement",
  "intensity-modulated-radiotherapy-imrt",
] as const;
