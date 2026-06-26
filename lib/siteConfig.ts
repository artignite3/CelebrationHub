// lib/siteConfig.ts
// Central configuration for the birthday website
// Update these values to personalize the site for someone else

export const siteConfig = {
  // Personal Information
  name: {
    full: "Shreya Dalal",
    first: "Shreya",
    nickname: "Nonu", // Changed to "PP" as requested
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
  siteTagline: "A Special Surprise Just For You!",

  // Navigation
  navBrand: "🎂 Birthday",
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
    celebrationMessage: "Enjoy This Special Surprise Made Just For You!",
    exploreButtonText: "Explore Memories 📸",
  },

  // Features Section
  features: {
    title: "What's So Special Today",
    description: "Today marks another year of your incredible journey. It's a day to celebrate who you are, the impact you've made, and all the beautiful moments yet to come. Let's make this day unforgettable.",
    buttonText: "Click Me 💌",
    buttonLink: "/love-letter"
  },

  // Celebrate Page
  celebrate: {
    title: "Happy Birthday!",
    subTitle: "Shreya!",
    description: "Today is your special day! Celebrate with joy, laughter, and wonderful memories. You deserve all the happiness in the world.",
    giftBoxes: [
      {
        icon: "🎁",
        title: "Joy Bringer",
        description: "You bring joy and happiness to everyone around you"
      },
      {
        icon: "🎉",
        title: "Party Legend",
        description: "You know how to celebrate life in style"
      },
      {
        icon: "🧭",
        title: "Adventure Guide",
        description: "You lead the way to exciting new experiences"
      }
    ]
  },

  // Love Letter
  loveLetter: {
    senderName: "RD", // The person sending the letter
    senderEmoji: "💝",
    title: "A Special Letter For You",
    subtitle: "On Your Special Day",
    opening: "Dear Birthday Didi,",
    paragraphs: [
      "First of all, Happy Birthday, you amazing human being! 🎉 I still can’t believe another year has flown by, and somehow, you’ve managed to become even more awesome than before. How do you do that? Seriously, teach me your ways!",
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
    description: "A collection of the most beautiful moments that make life worth celebrating",
    moments: [
      {
        title: "First Smile",
        description: "The moment that changed everything - your first smile that lit up the world",
        emoji: "😊",
        date: "23 Sept 1998"
      },
      {
        title: "Parent's Embrace",
        description: "The warmth and love felt in a parent's embrace, a bond like no other",
        emoji: "👣",
        date: "Lifelong"
      },
      {
        title: "Achievements",
        description: "Every milestone reached, every goal accomplished with determination",
        emoji: "🏆",
        date: "Throughout"
      },
      {
        title: "Friendships",
        description: "The bonds formed with amazing people who make Your life beautiful",
        emoji: "👥",
        date: "Always"
      },
      {
        title: "Explorations",
        description: "Exploring new horizons, trying new things, living life to the fullest",
        emoji: "🌍",
        date: "Every Day"
      },
      {
        title: "Dreams",
        description: "Chasing dreams and believing in the impossible becoming possible",
        emoji: "💭",
        date: "Forever"
      }
    ]
  },

  // Contact Page
  contact: {
    title: "Get in Touch",
    description: "Share your birthday wishes and special messages",
    formPlaceholders: {
      name: "Your name",
      email: "your@email.com",
      message: "Your birthday wishes..."
    },
    submitButtonText: "Send Wishes 🎉",
    successMessage: "Thank you for your message! 🎉"
  },

  // Footer
  footer: {
    message: "Make this birthday unforgettable",
    creator: "Made By Riddhesh Dalal <3"
  },
};

// Export individual values for easier destructuring if needed
export const { name, birthday, siteTitle, siteTagline, navBrand, navItems, hero, features, celebrate, loveLetter, bestMoments, contact, footer } = siteConfig;