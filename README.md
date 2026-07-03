# 🎉 CelebrationHub: A Customizable Celebration Website Template

A beautiful, interactive celebration website template perfect for birthdays, anniversaries, and special occasions. Built with Next.js, Tailwind CSS, and GSAP, this template features animations, music, photo galleries, and heartfelt messages to create memorable digital experiences.

![Celebration Website Preview](public/og-image.jpg) <!-- You can add an OG image -->

## ✨ Features

- **🎵 Background Music**: Play celebration music throughout the experience
- **🎨 Interactive 3D Gallery**: Explore memories in a beautiful 3D dome gallery with drag-to-rotate functionality
- **🎉 Celebration Page**: Animated celebration elements (cake, confetti, fireworks, etc.)
- **💌 Personal Messages**: Customizable heartfelt message section (love letter, anniversary note, etc.)
- **🏆 Highlights Section**: Showcase special moments, milestones, and achievements in beautiful cards
- **💌 Contact Form**: Allow visitors to send messages, wishes, or RSVPs
- **✨ Smooth Animations**: Powered by GSAP (GreenSock Animation Platform) for fluid, engaging animations
- **📱 Fully Responsive**: Looks great on all devices from mobile to desktop
- **⚙️ Easy Customization**: Centralized configuration via `siteConfig.ts` - no need to touch component code

## 🛠️ Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Animations**: [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)
- **3D Graphics**: Custom 3D dome implementation using [OGL](https://github.com/oframe/ogl)
- **Icons**: [Lucide React](https://lucide.dev)
- **Icons**: [Lucide React](https://lucide.dev)
- **Testing**: Jest & React Testing Library
- **Language**: TypeScript

## 🛠️ How to Customize

All customizable content is located in `/lib/siteConfig.ts`. Simply update the values in this file to personalize the site for your occasion:

1. **Personal Information**: Names, nicknames, event details
2. **Event Information**: Date, title, tagline
3. **Navigation**: Adjust links and labels
4. **Sections**: Hero, features, celebration, love letter, highlights, contact, footer
5. **Media**: Replace images in `/public/data/pic/` and music in `/public/data/music/`
6. **Colors & Styles**: Modify Tailwind configuration or component styles as needed

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/celebrationhub.git
cd celebrationhub

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Build for production
npm run build
# or
yarn build

# Start production server
npm start
# or
yarn start
```

## 📁 Project Structure

```
celebrationhub/
├── app/                    # Next.js 13 app router (pages)
├── components/             # Reusable React components
├── lib/                    # Configuration and utility functions
│   ├── siteConfig.ts       # Main configuration file (customize here)
│   ├── dateUtils.ts        # Date formatting utilities
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
│   ├── data/               # Images and music
│   └── ...                 # Other static files
├── styles/                 # Global styles
├── public/                 # Static assets served directly
├── ...                     # Configuration files
```

## 🔧 Customization Guide

### 1. Site Configuration (`lib/siteConfig.ts`)

Edit the `siteConfig` object to change:
- Names and personal information
- Event title, date, and tagline
- Navigation items and labels
- Section titles, descriptions, and button texts
- Celebration elements (gift boxes, achievement badges, etc.)
- Love letter / message content
- Highlights/milestones
- Contact form placeholders and messages
- Footer text

### 2. Media Assets

- **Images**: Replace files in `public/data/pic/` with your own images (keep same naming convention or update references in gallery components)
- **Music**: Replace audio files in `public/data/music/` (currently supports .mp3 format)

### 3. Styling Adjustments

- Tailwind configuration: `tailwind.config.ts` and `postcss.config.mjs`
- Global styles: `app/globals.css`
- Component-specific styles: Tailwind classes within components

## 🖥️ Available Scripts

In the project directory, you can run:

- `npm run dev` / `yarn dev` - Starts development server at `http://localhost:3000`
- `npm run build` / `yarn build` - Builds the application for production
- `npm start` / `yarn start` - Runs the built application in production mode
- `npm run lint` / `yarn lint` - Runs ESLint for code quality
- `npm test` / `yarn test` - Runs Jest tests
- `npm run test:watch` / `yarn test:watch` - Runs Jest in watch mode
- `npm run test:coverage` / `yarn test:coverage` - Runs tests with coverage report

## 📱 Responsive Design

The website is fully responsive and adapts to:
- Mobile phones (320px+ width)
- Tablets (768px+ width)
- Laptops (1024px+ width)
- Desktop monitors (1440px+ width)

All animations and interactions are optimized for smooth performance across devices.

## 🤝 Contributing

This template is meant to be forked and personalized for your specific celebrations. However, if you'd like to contribute to the base template:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎯 Perfect For

- Birthday celebrations
- Anniversary commemorations
- Graduation parties
- Retirement parties
- Baby showers
- Engagement announcements
- Holiday celebrations
- Any special occasion worth celebrating

## 💖 Created With

This template was built with:
- [Next.js](https://nextjs.org) - The React framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [GSAP](https://greensock.com/gsap/) - Professional-grade animation library
- [OGL](https://github.com/oframe/ogl) - Lightweight WebGL wrapper
- [Lucide Icons](https://lucide.dev) - Beautifully simple icons
- And lots of ❤️ for creating joyful experiences

---

*Make every celebration memorable with CelebrationHub - where technology meets joy.*