# The Pahadi Company - E-Commerce Platform

## Overview

The Pahadi Company is a premium e-commerce platform specializing in authentic Himalayan products including honey, ghee, herbal teas, and wellness items. The application is built as a full-stack TypeScript solution featuring a React frontend with shadcn/ui components and an Express backend with Drizzle ORM for database management.

The platform emphasizes authenticity, sustainability, and direct farmer partnerships, with a design philosophy centered on "rustic premium" aesthetics - combining traditional Himalayan heritage with modern e-commerce functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing (alternative to React Router)
- Tailwind CSS with custom configuration for styling

**Design System**
- shadcn/ui component library configured in "new-york" style
- Custom Tailwind theme with earth-tone color palette (orange, sage, neutral)
- Typography: Merriweather (serif) for headings, Inter (sans-serif) for body text
- Responsive breakpoints following mobile-first approach

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- Local component state with React hooks
- Session-based cart management using localStorage for session IDs

**Key Features**
- Product catalog with filtering by category
- Shopping cart with session persistence
- Product detail pages with reviews and wishlist functionality
- Blog/content pages for SEO and customer education
- Multi-variant header designs for A/B testing potential
- Breadcrumb navigation with Schema.org structured data
- SEO meta tags management via custom hooks

### Backend Architecture

**Server Framework**
- Express.js running in ESM mode
- Dual-mode setup: development (with Vite middleware) and production (serving static files)
- Session management with custom session ID generation

**API Structure**
- RESTful API endpoints under `/api` namespace
- Key endpoints:
  - `/api/products` - Product catalog operations
  - `/api/cart` - Cart management (add, remove, update, clear)
  - `/api/reviews` - Product reviews
  - `/api/wishlist` - User wishlist functionality
  - `/sitemap.xml` - Dynamic sitemap generation for SEO

**Data Layer**
- Drizzle ORM configured for PostgreSQL
- Schema definitions in `shared/schema.ts` for type sharing between client/server
- In-memory storage implementation (`MemStorage`) for development
- Database migrations managed via Drizzle Kit

**Database Schema**
- `users` - User authentication (currently basic setup)
- `products` - Product catalog with variants, pricing, stock levels
- `reviews` - Customer reviews linked to products and sessions
- `wishlists` - User wishlist items
- `cartItems` - Shopping cart entries (session-based)

### Data Storage Solutions

**Primary Database**
- PostgreSQL via Neon serverless driver (`@neondatabase/serverless`)
- Connection pooling and serverless-optimized queries
- Schema migrations tracked in `/migrations` directory

**Session Storage**
- Client-side: localStorage for session ID persistence
- Server-side: Session validation via UUID-based session IDs
- `connect-pg-simple` available for PostgreSQL-backed session storage (currently not implemented)

**Asset Storage**
- Static assets served from `/attached_assets` directory
- Product images stored locally in development
- Generated images for products, sourcing, and marketing content

### SEO & Marketing Features

**SEO Implementation**
- Dynamic meta tags via `useSEOMeta` custom hook
- Structured data (Schema.org) for products, breadcrumbs, and reviews
- XML sitemap generation with product listings and images
- robots.txt configuration for search engine crawling
- Open Graph tags for social media sharing

**Content Strategy**
- Blog system for content marketing (recipes, wellness guides, product information)
- Multi-page architecture (Home, Products, About, Sourcing, Blog, Contact)
- Testimonials and social proof throughout the site

## External Dependencies

### Third-Party UI Libraries
- **Radix UI** - Headless accessible component primitives (dialogs, dropdowns, accordions, etc.)
- **Lucide React** - Icon library for consistent iconography
- **Embla Carousel** - Touch-friendly carousel implementation
- **cmdk** - Command palette/search interface components

### Database & ORM
- **Drizzle ORM** - Type-safe ORM for PostgreSQL with Zod integration
- **@neondatabase/serverless** - Serverless PostgreSQL driver optimized for edge deployments

### Form & Validation
- **React Hook Form** - Form state management with `@hookform/resolvers`
- **Zod** - Schema validation integrated with Drizzle (`drizzle-zod`)

### Styling & Theming
- **Tailwind CSS** - Utility-first CSS framework with custom configuration
- **class-variance-authority** - Type-safe variant management for components
- **tailwind-merge** - Utility for merging Tailwind classes without conflicts

### Developer Tools
- **Replit Plugins** - Development tools for the Replit environment:
  - `vite-plugin-runtime-error-modal` - Runtime error overlay
  - `vite-plugin-cartographer` - Development mapping
  - `vite-plugin-dev-banner` - Development environment banner

### Fonts
- **Google Fonts** - Merriweather (serif) and Inter (sans-serif) loaded via CDN

### Build & Deployment
- **esbuild** - Fast JavaScript bundler for production builds
- **tsx** - TypeScript execution for development server
- **PostCSS** - CSS processing with Autoprefixer

### Potential Future Integrations
- Payment gateway (Razorpay/Stripe for Indian market)
- WhatsApp Business API for order management
- Email service provider (SendGrid/AWS SES) for transactional emails
- Analytics (Google Analytics/Mixpanel)
- Image CDN for optimized product images