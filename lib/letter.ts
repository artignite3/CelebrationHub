// The letter lives apart from siteConfig on purpose: siteConfig is bundled into client components,
// and this text must reach the browser only once the letter is unlocked.
// Import it from server components only (the letter page and the home teaser).
export const loveLetter = {
  senderName: "RD", // The person sending the letter
  title: "A letter for you",
  subtitle: "On your birthday",
  opening: "Dear Birthday Didi,",
  paragraphs: [
    "First of all, Happy Birthday, you amazing human being! I still can’t believe another year has flown by, and somehow, you’ve managed to become even more awesome than before. How do you do that? Seriously, teach me your ways!",
    "I hope you take a moment to see how much you’ve grown and how many lives you’ve touched, just by being you. You have this rare ability to make things better, whether it’s a bad day, an awkward silence, or a tough situation. You handle it all with that calm strength and a smile that somehow makes everything lighter.",
    "I still remember the countless random talks, the shared jokes that no one else gets, and those times we just sat and laughed until it hurt. Those are the memories I wouldn’t trade for anything.",
    "Here’s to another year of adventures, growth, and all the things that make life feel meaningful.",
    "May this year bring you endless joy, new adventures, unexpected blessings, and moments that take your breath away. May you find strength in challenges, wisdom in experiences, and peace in knowing that you are truly special.",
    "Thank you for being you. Thank you for the light you bring into our lives. Thank you for making the world a better place simply by existing in it."
  ],
  closing: "With all my love and warmest wishes,",
  quote: "Another year older, another year wiser, another year more amazing."
}
