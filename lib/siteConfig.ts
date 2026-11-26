// lib/siteConfig.ts
// Central configuration for the birthday website
// Update these values to personalize the site for someone else

export const siteConfig = {
  // Personal Information
  name: {
    full: "Shreya Dalal",
    first: "Shreya",
    nickname: "Nonu",
  },

  // Birthday Information
  birthday: {
    date: "23 Sept 1998", // Display format
    dateISO: "1998-09-23", // ISO format for calculations if needed
    // The letter stays sealed until midnight on this date in her timezone. Set next year's date to seal it again.
    unlockISO: "2026-09-23",
    utcOffset: "+05:30",
    // You can add time/location here if needed for display
    // time: "10:30 AM",
    // location: "Delhi, India"
  },

  // Site-wide text
  siteTitle: "Birthday Celebration",
  siteTagline: "A surprise made for you",

  // Navigation
  navBrand: "Shreya's birthday",
  navItems: [
    { label: "Home", href: "/" },
    { label: "Celebrate", href: "/celebrate" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Wishes", href: "/#wishes" },
    { label: "Best moments", href: "/best-moments" },
    { label: "Leave a wish", href: "/contact" },
  ],

  // Hero Section
  hero: {
    greeting: "Happy birthday",
    celebrationMessage: "Made for your birthday, 23 September.",
    // The hero leads with what the gift holds
    index: [
      { title: "Twenty-three photographs", meta: "The dome below", href: "#gallery" },
      { title: "A letter from RD", meta: "Six paragraphs", href: "/love-letter" },
      { title: "Best moments", meta: "Six of them", href: "/best-moments" },
      { title: "Celebrate", meta: "Music and confetti", href: "/celebrate" },
    ],
  },

  // Features Section
  features: {
    title: "What's so special today",
    description: "Another year of you. A day for who you are, what you have made better, and the moments still to come.",
    buttonText: "Read your letter",
    buttonLink: "/love-letter"
  },

  // Celebrate Page
  celebrate: {
    title: "Happy birthday",
    description: "Today is your day. Celebrate with joy, laughter and good memories. You deserve all the happiness in the world.",
    giftBoxes: [
      {
        title: "Joy bringer",
        description: "You bring joy and happiness to everyone around you"
      },
      {
        title: "Party legend",
        description: "You know how to celebrate life in style"
      },
      {
        title: "Adventure guide",
        description: "You lead the way to exciting new experiences"
      }
    ]
  },

  // Best Moments
  bestMoments: {
    title: "Best moments",
    description: "A few of the moments that make your life worth celebrating",
    moments: [
      {
        title: "First smile",
        description: "The moment that changed everything: your first smile that lit up the world",
        date: "23 Sept 1998"
      },
      {
        title: "Parent's embrace",
        description: "The warmth and love felt in a parent's embrace, a bond like no other",
        date: "Lifelong"
      },
      {
        title: "Achievements",
        description: "Every milestone reached, every goal accomplished with determination",
        date: "Throughout"
      },
      {
        title: "Friendships",
        description: "The bonds formed with amazing people who make your life beautiful",
        date: "Always"
      },
      {
        title: "Explorations",
        description: "Exploring new horizons, trying new things, living life to the fullest",
        date: "Every day"
      },
      {
        title: "Dreams",
        description: "Chasing dreams and believing in the impossible becoming possible",
        date: "Forever"
      }
    ]
  },

  // Contact Page
  contact: {
    title: "Leave a wish",
    description: "Write something for Shreya. It appears on her wish wall once it has been read.",
    formPlaceholders: {
      name: "Your name",
      message: "Your birthday wishes"
    },
    submitButtonText: "Send wish"
  },

  // Footer
  footer: {
    message: "Made with love for Shreya's birthday",
    creator: "Riddhesh Dalal"
  },
};

// Export individual values for easier destructuring if needed
export const { name, birthday, siteTitle, siteTagline, navBrand, navItems, hero, features, celebrate, bestMoments, contact, footer } = siteConfig;