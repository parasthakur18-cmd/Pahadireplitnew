# Design Guidelines: The Pahadi Company E-Commerce Website

## Design Approach

**Selected Approach:** Reference-Based (Premium E-Commerce + Wellness)

Drawing inspiration from premium artisan e-commerce platforms (Etsy premium shops, sustainable goods marketplaces) and wellness brands that emphasize authenticity, natural origins, and trust-building. The design conveys rustic premium quality through intentional imperfection, natural textures, and transparent storytelling.

**Core Design Principles:**
- Authentic rusticity with premium polish
- Visual storytelling through Himalayan imagery
- Trust-building through transparency and social proof
- Warm, welcoming, earthy experience

---

## Typography

**Font Families:**
- **Primary (Headings):** Merriweather or Lora - serif fonts conveying warmth and tradition
- **Secondary (Body):** Inter or Source Sans Pro - clean, readable sans-serif
- **Accent (Labels/Tags):** Uppercase body font at reduced size

**Hierarchy:**
- **H1 (Hero/Page Titles):** text-4xl md:text-5xl lg:text-6xl, font-bold
- **H2 (Section Headers):** text-3xl md:text-4xl, font-semibold
- **H3 (Subsections):** text-xl md:text-2xl, font-medium
- **Body:** text-base md:text-lg, leading-relaxed
- **Small/Labels:** text-sm, uppercase tracking-wide
- **Product Prices:** text-2xl md:text-3xl, font-bold

---

## Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 to p-8
- Section spacing: py-16 md:py-24 lg:py-32
- Grid gaps: gap-6 md:gap-8
- Card padding: p-6 md:p-8

**Container Strategy:**
- Max width: max-w-7xl for most sections
- Product grids: max-w-6xl
- Text content: max-w-3xl

---

## Component Library

### Navigation
**Header:** Fixed/sticky navigation with logo left, main nav center, cart/WhatsApp icons right. Include trust badge (e.g., "100% Himalayan Sourced") in top announcement bar.

### Hero Sections
**Home Hero:** Full-width background image of Himalayan landscape/farmers, overlay with centered headline + 2-line subtitle + dual CTAs ("Shop Now" primary, "Our Story" secondary). Use backdrop-blur on button backgrounds.

### Product Components

**Product Grid:** 3-column on desktop (lg:grid-cols-3), 2-column tablet (md:grid-cols-2), single column mobile
- Product cards: Image (4:5 ratio), product name, short tagline, price, "Add to Cart" button
- Hover: gentle scale transform
- Badge overlay for "Lab Tested" or "New" labels

**Product Detail Layout:** 
- Two-column: Image gallery left (60%), product info right (40%)
- Gallery: Main image with 4-6 thumbnails below
- Info section: Name, tagline, price, benefits bullets, quantity selector, Add to Cart + WhatsApp Order buttons
- Below: Tabs for "Ingredients/Origin", "Usage Instructions", "Reviews"

**Shopping Cart:**
- Slide-in panel from right or dedicated page
- Line items with thumbnail, name, quantity controls, price, remove option
- Sticky footer with subtotal and checkout CTA
- Empty state with illustration and "Continue Shopping" link

### Trust Elements

**Testimonial Cards:** Grid of 2-3 columns
- Customer photo placeholder circle
- 5-star rating
- Quote text
- Name + location below

**Trust Badges:** Row of 4-5 badges with icons
- "100% Pure Himalayan"
- "Lab Tested"
- "Locally Sourced"
- "Sustainable Packaging"

### Forms

**Contact/WhatsApp Form:**
- Two-column on desktop (form left, contact info/map right)
- Fields: Name, Email, Phone, Product Interest (dropdown), Message
- Large WhatsApp CTA button with phone number visible
- Alternative contact methods listed on right side

**Checkout Form:**
- Single column, clear step indicators
- Sections: Contact Info, Shipping Address, Payment Method
- Order summary sticky on right (desktop)

### Content Sections

**Featured Products:** 
- 2x2 or 3-column grid
- Section header with "Shop All" link
- Category filters as pills above grid

**How It's Sourced:**
- Alternating image-text sections (left-right-left pattern)
- Large imagery of farmers, mountains, production process
- Short 2-3 line descriptions with each image

**Blog/Recipe Cards:**
- 3-column grid
- Featured image (16:9), category tag, title, excerpt, "Read More" link
- Hover: image subtle zoom

**FAQ:**
- Single column accordion
- Question as button, answer expands below
- Group by category (Products, Shipping, Authenticity)

### Footer
**Multi-column footer:**
- Column 1: Logo + brand statement
- Column 2: Quick Links (Shop, About, Blog, Contact)
- Column 3: Policies (Privacy, Terms, Shipping)
- Column 4: Newsletter signup + social icons
- Bottom bar: Copyright, payment icons, WhatsApp contact

---

## Images

**Hero Image:** Full-width Himalayan mountain landscape with farmers/tea gardens in foreground. Warm morning light. Use gradient overlay (bottom to top) for text legibility.

**Product Images:** Clean white/natural wood background, soft natural lighting, products with their natural packaging, occasional props (honey dipper, wooden spoon, traditional vessels)

**Sourcing Section:** Authentic documentary-style photos - farmers harvesting, mountain vistas, production process, village scenes. Natural, unposed, honest photography.

**About/Story Page:** Mix of landscape images and people photos conveying authenticity and tradition.

**Category Headers:** Medium-height (40vh) background images with subtle overlay and centered category name.

---

## Page-Specific Layouts

**Home:** Hero → Featured Products (8 products, 4 per row) → Trust Badges → How We Source (3 alternating sections) → Testimonials (3 columns) → Newsletter Signup → Instagram Feed Preview

**Shop/Category:** Category header image → Filter sidebar (desktop) / dropdown (mobile) + Product grid (3 cols) → Pagination

**Product Detail:** Described above in components

**About Us:** Hero image → Story in 3-4 sections with images → Meet the Team (if applicable) → Values/Certifications

**Blog Landing:** Featured post (large card) → Grid of recent posts (3 cols) → Categories sidebar

**Contact:** Form + info two-column layout → Map embed below → FAQ preview section

---

## Micro-Interactions

Use sparingly:
- Product card hover: scale-105 transition
- Button hover: slight background shift
- Add to Cart: Brief scale animation on success
- Cart icon: Bounce when item added

No scroll-triggered animations or parallax effects - keep it grounded and authentic.