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
    // You can add time/location here if needed for display
    // time: "10:30 AM",
    // location: "Delhi, India"
  },

  // Site-wide text
  siteTitle: "Birthday Celebration",
  siteTagline: "A surprise made for you",

  // Navigation
  navBrand: "Birthday",
  navItems: [
    { label: "Home", href: "/" },
    { label: "Celebrate", href: "/celebrate" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Best Moments", href: "/best-moments" },
    { label: "Contact", href: "/contact" },
  ],

  // Hero Section
  hero: {
    greeting: "Happy Birthday",
    celebrationMessage: "Photos from the years, a letter from RD and a few favourite moments, gathered in one place for your day",
    exploreButtonText: "See the photos",
    letterButtonText: "Read the letter",
  },

  // Features Section
  features: {
    title: "What's so special today",
    description: "Today marks another year of your incredible journey. It's a day to celebrate who you are, the impact you've made, and all the beautiful moments yet to come. Let's make this day unforgettable.",
    buttonText: "Read your letter",
    buttonLink: "/love-letter"
  },

  // Celebrate Page
  celebrate: {
    title: "Happy birthday",
    description: "Today is your day. Celebrate with joy, laughter and good memories. You deserve all the happiness in the world.",
    giftBoxes: [
      {
        title: "Joy Bringer",
        description: "You bring joy and happiness to everyone around you"
      },
      {
        title: "Party Legend",
        description: "You know how to celebrate life in style"
      },
      {
        title: "Adventure Guide",
        description: "You lead the way to exciting new experiences"
      }
    ]
  },

  // Love Letter
  loveLetter: {
    senderName: "RD", // The person sending the letter
    title: "A letter for you",
    subtitle: "On your birthday",
    opening: "Dear Birthday Didi,",
    paragraphs: [
      "First of all, Happy Birthday, you amazing human being! I still can’t believe another year has flown by, and somehow, you’ve managed to become even more awesome than before. How do you do that? Seriously, teach me your ways!",
      "I hope you take a moment to see how much you’ve grown and how many lives you’ve touched, just by being you. You have this rare ability to make things better — whether it’s a bad day, an awkward silence, or a tough situation. You handle it all with that calm strength and a smile that somehow makes everything lighter.",
      "I still remember the countless random talks, the shared jokes that no one else gets, and those times we just sat and laughed until it hurt. Those are the memories I wouldn’t trade for anything.",
      "Here’s to another year of adventures, growth, and all the things that make life feel meaningful.",
      "May this year bring you endless joy, new adventures, unexpected blessings, and moments that take your breath away. May you find strength in challenges, wisdom in experiences, and peace in knowing that you are truly special.",
      "Thank you for being you. Thank you for the light you bring into our lives. Thank you for making the world a better place simply by existing in it."
    ],
    closing: "With all my love and warmest wishes,",
    quote: "Another year older, another year wiser, another year more amazing."
  },

  // Best Moments
  bestMoments: {
    title: "Best Moments",
    description: "A few of the moments that make your life worth celebrating",
    moments: [
      {
        title: "First Smile",
        description: "The moment that changed everything - your first smile that lit up the world",
        date: "23 Sept 1998"
      },
      {
        title: "Parent's Embrace",
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
    title: "Get in touch",
    description: "Share your birthday wishes and special messages",
    formPlaceholders: {
      name: "Your name",
      email: "your@email.com",
      message: "Your birthday wishes"
    },
    submitButtonText: "Send wishes",
    successMessage: "Thank you, your wishes are on their way"
  },

  // Footer
  footer: {
    message: "Made with love for Shreya's birthday",
    creator: "Riddhesh Dalal"
  },
};

// Export individual values for easier destructuring if needed
export const { name, birthday, siteTitle, siteTagline, navBrand, navItems, hero, features, celebrate, loveLetter, bestMoments, contact, footer } = siteConfig;