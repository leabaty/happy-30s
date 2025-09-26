# Happy 30s - Birthday Advent Calendar

A beautiful, mobile-first birthday advent calendar built with Next.js, TypeScript, and MongoDB. Features interactive gift opening with smooth animations, responsive design, and real-time updates.

## ✨ Features

- 🎁 **Interactive Gift Opening**: Click to reveal gifts with spinning animations
- 📱 **Mobile-First Design**: Optimized for mobile with responsive layout
- 🔒 **Scheduled Unlocking**: Gifts unlock based on order and availability
- ⚡ **Real-time Updates**: Optimistic UI with TanStack Query
- 🎨 **Beautiful Animations**: Smooth transitions and spinning gift effects
- 🖼️ **Full-Width Images**: Immersive image display when gifts are opened
- ♿ **Accessible**: Screen reader friendly with proper focus management
- 🧪 **Well Tested**: Comprehensive test suite with Vitest

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router & Turbopack
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **State Management**: TanStack Query (React Query)
- **Styling**: CSS Modules with custom animations
- **Fonts**: Next.js Font Optimization (Rampart One)
- **Images**: Next.js Image Optimization
- **Effects**: Canvas Confetti
- **Testing**: Vitest with Testing Library
- **Development**: ESLint, TypeScript Plugin for CSS Modules

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd happy-30s
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory:

   ```env
   MONGODB_URI=mongodb://localhost:27017/happy30s
   ```

4. Seed the database with sample data:

   ```bash
   npm run seed
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### GET /api/gifts

Returns all gifts sorted by order.

```json
[
  {
    "_id": "...",
    "title": "First Surprise",
    "image_link": "https://...",
    "image_alt": "Beautiful flowers",
    "thumb_url": "https://...",
    "message": "Happy 30th birthday!",
    "love_surname": "Chérie",
    "opened": false,
    "opened_at": null,
    "unlock_at": "2024-01-01T00:00:00Z",
    "order": 1,
    "slug": "first-surprise",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### PATCH /api/gifts/:id/open

Atomically opens a gift (sets `opened=true` and `opened_at=now`) only if it's currently closed.

**Response**: Updated gift object or existing gift if already opened.

## Data Model

```typescript
interface IGift {
  _id: ObjectId;
  title: string;
  image_link: string;
  image_alt?: string;
  thumb_url?: string;
  message?: string;
  love_surname: string;
  opened: boolean;
  opened_at?: Date;
  unlock_at?: Date;
  order: number;
  slug: string; // unique
  created_at: Date;
  updated_at: Date;
}
```

## 🎯 Key Features

### Gift Selection Logic

The `pickNextGift` utility finds the first unopened gift available for opening based on order.

### Optimistic UI

- Immediately updates UI when opening gifts
- Shows spinning gift animation during loading
- Handles API errors gracefully with TanStack Query
- Synchronizes state across multiple tabs

### Full-Width Image Display

- Images break out of container padding for immersive viewing
- Responsive heights (450px desktop, 350px tablet, 300px mobile)
- Maintains aspect ratio with `object-fit: contain`

### Loading States

- Spinning gift box animation during initial load and gift opening
- Black overlay with white text for consistency
- Prevents content flashing during state transitions

### Mobile-First Design

- Responsive grid layout for gift thumbnails
- Touch-friendly interaction areas
- Optimized image loading with Next.js Image
- Smooth scroll behaviors

### Accessibility

- Proper focus management (removes click outlines, keeps keyboard navigation)
- Alt text for all images
- Loading indicators for screen readers
- Semantic HTML structure

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Vitest tests
- `npm run test:ui` - Run tests with Vitest UI
- `npm run seed` - Seed database with sample data
- `npm run generate-css-types` - Generate TypeScript types for CSS modules

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

Tests cover:

- Gift selection logic (`pickNextGift`)
- Utility functions and edge cases
- Component behavior and error conditions

## � Project Structure

```
happy-30s/
├── src/
│   ├── app/
│   │   ├── api/gifts/          # API endpoints
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── page.tsx            # Main page component
│   │   └── page.module.css     # Page-specific styles
│   ├── components/
│   │   ├── BigGift.tsx         # Main gift display component
│   │   ├── BigGift.module.css  # BigGift styles
│   │   ├── GiftSummaryGrid.tsx # Grid of all gifts
│   │   ├── GiftSummaryGrid.module.css
│   │   └── QueryProvider.tsx   # TanStack Query setup
│   ├── lib/
│   │   └── dbConnect.ts        # MongoDB connection
│   ├── models/
│   │   └── Gift.ts             # Gift data model
│   ├── scripts/
│   │   └── seed.ts             # Database seeding
│   ├── test/
│   │   └── setup.ts            # Test configuration
│   └── utils/
│       ├── giftUtils.ts        # Gift selection logic
│       └── giftUtils.test.ts   # Unit tests
├── package.json
├── next.config.ts              # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── vitest.config.ts           # Vitest configuration
└── README.md
```

## �🚀 Deployment

The app is ready to deploy on platforms like Vercel, Netlify, or any Node.js hosting provider.

1. Set environment variables in your hosting platform:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```
2. Ensure MongoDB is accessible from your deployment environment
3. The build process will automatically run during deployment
4. For manual deployment: `npm run build` then `npm start`

## 📝 License

This project is licensed under the MIT License.
