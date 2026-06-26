# 🎂 Happy Birthday Pankhudi! - A Surprise Birthday Website

A beautiful, interactive birthday celebration website created as a special surprise for Pankhudi. This Next.js application features animations, music, photo galleries, and heartfelt messages to make her birthday extra special.

![Birthday Website Preview](public/og-image.png) <!-- You can add an Og image later -->

## 🎉 Features

- **🎵 Birthday Music**: Playful birthday melody that plays throughout the celebration
- **🎨 Interactive 3D Gallery**: Explore memories in a beautiful 3D dome gallery with drag-to-rotate functionality
- **🎂 Celebration Page**: Animated cake and confetti for the ultimate birthday experience
- **💌 Love Letter**: A heartfelt personal message expressing appreciation and love
- **🏆 Best Moments**: Special memories and milestones highlighted in beautiful cards
- **💌 Contact Form**: Send birthday wishes and special messages
- **✨ Smooth Animations**: Powered by GSAP for fluid, engaging animations
- **📱 Fully Responsive**: Looks great on all devices from mobile to desktop

## 🏗️ Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org) (App Router)
- **Styling**: Tailwind CSS
- **Animations**: [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)
- **3D Gallery**: Custom 3D dome gallery component
- **Icons**: [Lucide React](https://lucide.dev)
- **Fonts**: [Geist Font](https://vercel.com/font) (Vercel's official font)
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
birthday/
├── app/
│   ├── layout.tsx              # Root layout with fonts and metadata
│   ├── page.tsx                # Home page with birthday greeting
│   ├── celebrate/              # Celebration page with cake animation
│   ├── gallery/                # Image gallery section
│   ├── best-moments/           # Special memories showcase
│   ├── love-letter/            # Heartfelt personal message
│   ├── contact/                # Contact form for birthday wishes
│   └── globals.css             # Global styles
├── components/
│   ├── navigation.tsx          # Site navigation
│   ├── hero-section.tsx        # Animated hero section
│   ├── gallery-section.tsx     # Interactive 3D gallery
│   ├── cake-animation.tsx      # Birthday cake animation
│   ├── confetti.tsx            # Celebration confetti effect
│   ├── dome-gallery.tsx        # 3D photo dome gallery
│   ├── light-rays.tsx          # Animated light rays effect
│   ├── prismatic-burst.tsx     # Prismatic light burst effect
│   ├── celebration-popup.tsx   # Celebration popup modal
│   ├── best-moments-card.tsx   # Memory card component
│   └── footer-section.tsx      # Site footer
├── public/
│   ├── data/
│   │   ├── music/              # Birthday music (1.mp3)
│   │   └── pic/                # Birthday photos (1.jpg - 21.jpg)
│   └── ...                     # SVG icons and illustrations
├── styles/                     # Additional styling if needed
└── public/                     # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd birthday
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the birthday surprise!

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

### Preview Production Build

```bash
npm start
# or
yarn start
# or
pnpm start
# or
bun start
```

## 📱 Sections Overview

### 🏠 Home Page
The landing page features a stunning animated birthday greeting for Pankhudi with:
- Floating celebration text ("Happy Birthday Pankhudi!")
- Animated prismatic burst effects
- Call-to-action button to explore memories
- Responsive design that works on all devices

### 🎂 Celebrate Page
The main celebration hub featuring:
- Animated birthday cake with candles
- Continuous birthday music playback
- Festive confetti effects
- Interactive celebration elements
- Three gift boxes representing different aspects of celebration

### 🖼️ Gallery Section
An innovative 3D photo dome gallery where users can:
- Click and drag to rotate the photo sphere
- View memories from all angles
- Experience smooth animations and transitions
- See special celebration moments in an immersive way

### 🏆 Best Moments Page
A curated collection of special memories featuring:
- First smile
- Parent's embrace
- Achievements and milestones
- Meaningful friendships
- Life explorations and adventures
- Dreams and aspirations

### 💌 Love Letter Page
A heartfelt personal message that includes:
- Warm birthday wishes
- Appreciation for her qualities
- Shared memories and inside jokes
- Hopes and dreams for her future
- Romantic paper letter aesthetic with decorative elements

### 💬 Contact Page
A simple form for well-wishers to:
- Leave birthday messages
- Share memories and anecdotes
- Send love and appreciation
- Connect with the birthday celebration

## 🎵 Media Assets

### Music
- `/public/data/music/1.mp3` - Birthday celebration music that loops throughout the site

### Photos
- `/public/data/pic/` - Collection of 21 memorable photos (1.jpg through 21.jpg) showcasing special moments

## 🎨 Customization

To personalize this birthday site for someone else, you can modify the centralized configuration file:

### 1. Update the Configuration File
Edit `lib/siteConfig.ts` to customize all text content, names, dates, and more. This file contains all configurable content in a structured TypeScript format.

### 2. Update Media Assets
Replace the media files in the `public/data/` directory:
- **Music**: Replace `/public/data/music/1.mp3` with your preferred birthday track
- **Photos**: Replace or add images in `/public/data/pic/` (supports JPG/PNG formats)

For more detailed customization options, see the full customization guide below.

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Key Technologies Explained

**GSAP Animations**: Used throughout for smooth entrance animations, transitions, and interactive effects.

**3D Dome Gallery**: A custom Three.js-inspired implementation that displays photos on a rotatable sphere, allowing users to explore memories from all angles.

**Tailwind CSS**: Utility-first CSS framework used for responsive design and rapid styling.

**Next.js 13 App Router**: Modern React framework with server components, routing, and optimized performance.

## 💡 How It Works

### Animation System
The site uses GSAP (GreenSock Animation Platform) for all animations:
- Entrance animations on page load
- Scroll-triggered animations in the gallery
- Interactive animations responding to mouse movement
- Continuous subtle animations for ambient effects

### Music System
- Background music plays automatically on celebration pages
- Audio loops seamlessly for continuous enjoyment
- User interaction required on some browsers due to autoplay policies

### Gallery Interaction
The 3D dome gallery uses:
- Mouse/touch dragging for rotation
- Inertia-based spinning after release
- Smooth transitions when viewing individual photos
- Lighting effects that respond to cursor position

## 🎁 Perfect For

- Surprise birthday celebrations
- Anniversary commemorations
- Special milestone celebrations
- Long-distance gift-giving
- Creating lasting digital memories

## 📱 Responsive Design

The website is fully responsive and adapts to:
- Mobile phones (320px+ width)
- Tablets (768px+ width)
- Laptops (1024px+ width)
- Desktop monitors (1440px+ width)

All animations and interactions work smoothly across devices.

## 🤝 Contributing

This was created as a personal gift, but if you'd like to adapt it for someone special:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/personalization`)
3. Commit your changes (`git commit -am 'Personalize for [Name]'`)
4. Push to the branch (`git push origin feature/personalization`)
5. Create a new Pull Request

## 🎯 Future Enhancements

Ideas for future versions:
- [ ] Add video support in the gallery
- [ ] Include guestbook/signature feature
- [ ] Add photo upload capability for guests
- [ ] Implement dark/light mode toggle
- [ ] Add more interactive celebration elements
- [ ] Include personalized mini-games or activities

## 💖 Created With Love

This birthday website was created with lots of love, joy, and celebration in mind. Every animation, photo, and message was carefully chosen to make Pankhudi's special day unforgettable.

**Happy Birthday, Pankhudi!** 🎉🎂🎈

---

*Made with Next.js, Tailwind CSS, GSAP, and lots of ❤️*