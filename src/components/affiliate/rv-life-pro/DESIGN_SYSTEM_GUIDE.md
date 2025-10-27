# RV Life Pro Design System - Complete Guide

A comprehensive, reusable design system for creating high-converting RV Life Pro affiliate landing pages.

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Design Tokens](#design-tokens)
4. [Components](#components)
5. [Usage Examples](#usage-examples)
6. [Best Practices](#best-practices)

---

## Overview

This design system provides a complete set of components and styles for building professional, high-converting affiliate landing pages. All components are:

- **WCAG 2.1 AA compliant** - Fully accessible
- **Mobile-first responsive** - Optimized for all devices
- **Touch-friendly** - 44x44px minimum touch targets
- **Performance-optimized** - Lazy loading and smooth animations
- **TypeScript-powered** - Full type safety

### What's Included

- **CSS Design System** (`rv-life-pro.css`) - Complete color palette, typography, spacing, and utilities
- **8 Core Components** - Button, Card, Testimonial, Trust Badge, Feature Block, Hero, Pricing, FAQ
- **Multiple Variants** - Each component has multiple layout and style options

---

## Getting Started

### Installation

The design system is already installed in your project. Simply import the components:

```typescript
import {
  RVLifeButton,
  RVLifeCard,
  RVLifeHeroSection,
  RVLifePricingCard,
  // ... other components
} from '@/components/affiliate/rv-life-pro';
```

The CSS is automatically imported when you use any component.

### Basic Structure

```tsx
import { RVLifeHeroSection, RVLifeButton } from '@/components/affiliate/rv-life-pro';

function MyLandingPage() {
  return (
    <RVLifeHeroSection
      headline="Transform Your RV Journey"
      subheadline="Access 14,000+ campgrounds with RV Life Pro"
      cta={{
        primary: {
          text: "Start Free Trial",
          href: "/signup"
        }
      }}
      backgroundImage="/hero-image.jpg"
    />
  );
}
```

---

## Design Tokens

### Color Palette

```css
--rv-life-primary-blue: #2C5F8D      /* Trust, reliability */
--rv-life-secondary-green: #4A7C59   /* Nature, safety */
--rv-life-accent-orange: #E67E22     /* Energy, CTAs */
--rv-life-warning-red: #C0392B       /* Danger, urgency */
--rv-life-neutral-grey: #34495E      /* Text */
--rv-life-light-bg: #ECF0F1          /* Backgrounds */
```

### Typography

- **Headlines**: Montserrat Bold (48-64px desktop, 32-40px mobile)
- **Body**: Open Sans (16-18px)
- **Stats**: Roboto Slab (accent font)

### Spacing System (8px base)

```css
--rv-spacing-xs: 4px
--rv-spacing-sm: 8px
--rv-spacing-md: 16px
--rv-spacing-lg: 24px
--rv-spacing-xl: 32px
--rv-spacing-2xl: 48px
--rv-spacing-3xl: 64px
--rv-spacing-4xl: 96px
```

---

## Components

### 1. RVLifeButton

Primary CTA component with three variants.

**Variants:**
- `primary` - Orange background for main CTAs
- `secondary` - Blue outlined for secondary actions
- `tertiary` - Text link with underline

```tsx
import { RVLifeButton } from '@/components/affiliate/rv-life-pro';

<RVLifeButton
  variant="primary"
  size="large"
  href="/signup"
>
  Get Started Now
</RVLifeButton>

// With icon
<RVLifeButton
  variant="secondary"
  icon={<ArrowRight className="w-5 h-5" />}
  iconPosition="right"
>
  Learn More
</RVLifeButton>

// Loading state
<RVLifeButton
  variant="primary"
  loading={true}
>
  Processing...
</RVLifeButton>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'tertiary'
- `size`: 'small' | 'medium' | 'large'
- `loading`: boolean
- `icon`: React.ReactNode
- `iconPosition`: 'left' | 'right'
- `fullWidth`: boolean

---

### 2. RVLifeCard

Versatile card component for content sections.

```tsx
import { RVLifeCard, RVLifeCardGrid } from '@/components/affiliate/rv-life-pro';
import { MapPin } from 'lucide-react';

<RVLifeCardGrid columns={3}>
  <RVLifeCard
    icon={<MapPin />}
    headline="14,000+ Campgrounds"
    body="Access the largest database of RV-friendly campgrounds"
    cta={{
      text: "Explore Campgrounds",
      href: "/campgrounds"
    }}
  />
  {/* More cards... */}
</RVLifeCardGrid>
```

**Additional Card Types:**
- `RVLifeIconCard` - Simplified icon card
- `RVLifeStatCard` - For displaying statistics

---

### 3. RVLifeTestimonial

Social proof component with multiple layouts.

```tsx
import { RVLifeTestimonial, RVLifeTestimonialGrid } from '@/components/affiliate/rv-life-pro';

<RVLifeTestimonial
  quote="RV Life Pro completely changed how we plan our trips!"
  author={{
    name: "Sarah Johnson",
    location: "Denver, CO",
    rvType: "Class A Motorhome",
    photo: "/testimonials/sarah.jpg"
  }}
  rating={5}
  verified={true}
  layout="card"
/>
```

**Layouts:**
- `card` - Full card with shadow
- `inline` - Photo left, content right
- `featured` - Large centered testimonial

**Additional Components:**
- `RVLifeTestimonialGrid` - Grid layout
- `RVLifeTestimonialCarousel` - Auto-rotating carousel

---

### 4. RVLifeTrustBadge

Trust indicators for near pricing and CTAs.

```tsx
import { RVLifeTrustBadge, RVLifeTrustBadgeGroup } from '@/components/affiliate/rv-life-pro';

<RVLifeTrustBadgeGroup
  badges={[
    { type: 'moneyback' },
    { type: 'secure' },
    { type: 'rating', rating: 4.8 }
  ]}
  layout="horizontal"
  centered
/>
```

**Badge Types:**
- `moneyback` - 30-Day Money Back Guarantee
- `secure` - Secure Payment
- `rating` - Star ratings
- `verified` - Verified badge
- `award` - Award/certification
- `guarantee` - General guarantee
- `satisfaction` - Satisfaction guarantee
- `users` - User count
- `support` - 24/7 support

---

### 5. RVLifeFeatureBlock

Feature showcase with multiple layouts.

```tsx
import { RVLifeFeatureBlock } from '@/components/affiliate/rv-life-pro';
import { Map } from 'lucide-react';

<RVLifeFeatureBlock
  icon={<Map />}
  title="Interactive Trip Planning"
  description="Plan your perfect RV journey with our advanced mapping tools"
  benefits={[
    "Real-time traffic updates",
    "RV-specific routing",
    "Offline map access"
  ]}
  proofPoint={{
    text: "Used by 50,000+ RVers",
    icon: <TrendingUp />
  }}
  screenshot={{
    src: "/features/trip-planning.jpg",
    alt: "Trip planning interface"
  }}
  layout="right"
/>
```

**Layouts:**
- `default` - Vertical stack
- `left` - Image on left
- `right` - Content on left, image on right
- `centered` - Centered content

**Additional Components:**
- `RVLifeFeatureComparison` - Side-by-side comparison table
- `RVLifeBenefitsList` - Styled benefits list

---

### 6. RVLifeHeroSection

Full-width hero component for landing pages.

```tsx
import { RVLifeHeroSection } from '@/components/affiliate/rv-life-pro';

<RVLifeHeroSection
  headline="Discover Your Perfect RV Adventure"
  subheadline="Access 14,000+ campgrounds nationwide"
  description="Join thousands of RVers who trust RV Life Pro for their journey planning"
  cta={{
    primary: {
      text: "Start Free Trial",
      href: "/signup"
    },
    secondary: {
      text: "Watch Demo",
      onClick: () => setShowVideo(true)
    }
  }}
  backgroundImage="/hero-bg.jpg"
  backgroundOverlay={true}
  overlayOpacity={0.7}
  trustIndicators={[
    { type: 'rating', rating: 4.8 },
    { type: 'users', text: '50,000+ RVers' }
  ]}
  height="large"
  alignment="center"
  showScrollIndicator={true}
/>
```

**Heights:**
- `small` - 400-500px
- `medium` - 500-600px
- `large` - 600-700px
- `full` - Full viewport height

**Additional Hero Types:**
- `RVLifeHeroSplit` - Split content/image layout
- `RVLifeHeroMinimal` - Minimal centered hero

---

### 7. RVLifePricingCard

Pricing card with discount code support.

```tsx
import { RVLifePricingCard, RVLifePricingGrid } from '@/components/affiliate/rv-life-pro';

<RVLifePricingGrid columns={3}>
  <RVLifePricingCard
    name="Annual Plan"
    description="Best value for full-time RVers"
    price={{
      original: 65,
      current: 52,
      currency: "$",
      period: "year"
    }}
    discountCode={{
      code: "SMARTRV20",
      savings: "Save $13 instantly!"
    }}
    features={[
      "14,000+ campground database",
      "Trip planning tools",
      "Offline maps",
      "24/7 support"
    ]}
    cta={{
      text: "Get Started",
      href: "/signup"
    }}
    trustBadges={[
      { type: 'moneyback' },
      { type: 'secure' }
    ]}
    featured={true}
    popularBadge={true}
    limitedTime={{
      text: "Limited Time Offer",
      countdown: new Date('2024-12-31')
    }}
  />
</RVLifePricingGrid>
```

**Additional Components:**
- `RVLifePricingComparison` - Full comparison table

---

### 8. RVLifeFAQAccordion

Expandable FAQ component with search.

```tsx
import { RVLifeFAQAccordion } from '@/components/affiliate/rv-life-pro';

<RVLifeFAQAccordion
  title="Frequently Asked Questions"
  description="Find answers to common questions about RV Life Pro"
  faqs={[
    {
      question: "How does the free trial work?",
      answer: "You get full access to all features for 7 days. No credit card required!",
      category: 'general'
    },
    {
      question: "Can I use it offline?",
      answer: "Yes! Download maps for offline access during your trips.",
      category: 'product'
    }
  ]}
  showSearch={true}
  showCategories={true}
  defaultOpen={0}
  allowMultiple={false}
/>
```

**Categories:**
- `general` - General questions
- `pricing` - Pricing questions
- `product` - Product features
- `shipping` - Shipping info
- `returns` - Return policy
- `support` - Support questions
- `security` - Security & privacy

**Additional Components:**
- `RVLifeFAQSection` - FAQ with background and CTA
- `RVLifeSimpleFAQ` - Simple list without accordion

---

## Usage Examples

### Complete Landing Page

```tsx
import {
  RVLifeHeroSection,
  RVLifeFeatureBlock,
  RVLifeTestimonialGrid,
  RVLifePricingCard,
  RVLifeFAQSection,
} from '@/components/affiliate/rv-life-pro';

function RVLifeProLandingPage() {
  return (
    <>
      {/* Hero */}
      <RVLifeHeroSection
        headline="Transform Your RV Journey"
        subheadline="The #1 Trip Planning Tool for RVers"
        cta={{
          primary: { text: "Start Free Trial", href: "/signup" }
        }}
        backgroundImage="/hero.jpg"
      />

      {/* Features */}
      <section className="rv-section">
        <div className="rv-container">
          <h2 className="rv-headline-primary text-center mb-12">
            Everything You Need to Plan the Perfect Trip
          </h2>
          <RVLifeFeatureBlock
            icon={<Map />}
            title="Interactive Trip Planning"
            description="Advanced tools for planning your perfect route"
            benefits={[
              "RV-specific routing",
              "Real-time traffic",
              "Offline access"
            ]}
            layout="right"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="rv-section bg-[var(--rv-life-light-bg)]">
        <div className="rv-container">
          <h2 className="rv-headline-primary text-center mb-12">
            Loved by 50,000+ RVers
          </h2>
          <RVLifeTestimonialGrid
            testimonials={testimonials}
            layout="card"
            columns={3}
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="rv-section">
        <div className="rv-container">
          <h2 className="rv-headline-primary text-center mb-12">
            Choose Your Plan
          </h2>
          <RVLifePricingCard
            name="Annual Plan"
            price={{ original: 65, current: 52 }}
            discountCode={{ code: "SMARTRV20", savings: "Save $13!" }}
            features={features}
            cta={{ text: "Get Started", href: "/signup" }}
            featured={true}
          />
        </div>
      </section>

      {/* FAQ */}
      <RVLifeFAQSection
        faqs={faqs}
        ctaText="Contact Support"
        ctaHref="/contact"
      />
    </>
  );
}
```

---

## Best Practices

### Performance

1. **Lazy Load Images**: Images in components use lazy loading by default
2. **Minimize Animations**: Respect `prefers-reduced-motion`
3. **Use Appropriate Sizes**: Choose component sizes based on context

### Accessibility

1. **Maintain Heading Hierarchy**: Use h1, h2, h3 in order
2. **Provide Alt Text**: Always include alt text for images
3. **Test Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
4. **High Contrast**: Design meets WCAG AA standards

### Conversion Optimization

1. **Clear CTAs**: Use primary buttons for main actions
2. **Trust Signals**: Place trust badges near CTAs and pricing
3. **Social Proof**: Include testimonials throughout the page
4. **Urgency**: Use limited-time offers strategically
5. **Reduce Friction**: Minimize form fields and steps

### Mobile Experience

1. **Touch Targets**: All components have 44x44px minimum touch targets
2. **Responsive Typography**: Text sizes adjust automatically
3. **Stack on Mobile**: Multi-column layouts stack on small screens
4. **Fast Loading**: Optimize images and minimize bundle size

### Design Consistency

1. **Use Design Tokens**: Leverage CSS variables for colors and spacing
2. **Component Variants**: Use built-in variants rather than custom styles
3. **Maintain Spacing**: Use the 8px spacing system
4. **Typography Scale**: Use predefined typography classes

---

## CSS Utility Classes

The design system includes helpful utility classes:

### Typography
```css
.rv-headline-hero        /* Large hero headlines */
.rv-headline-primary     /* Primary section headlines */
.rv-headline-secondary   /* Secondary headlines */
.rv-body-large          /* Large body text */
.rv-body-base           /* Standard body text */
```

### Animations
```css
.rv-fade-in             /* Fade in animation */
.rv-fade-up             /* Fade up animation */
.rv-slide-in-right      /* Slide in from right */
.rv-lift-hover          /* Lift on hover effect */
```

### Layout
```css
.rv-container           /* Responsive container */
.rv-section             /* Section spacing */
```

---

## Support

For questions or issues:

1. Check component TypeScript definitions for prop types
2. Review example usage in this guide
3. Inspect the CSS design system file for available utilities
4. Test components in isolation before integrating

---

## Version

**Design System Version**: 1.0.0
**Last Updated**: October 2024

All components are production-ready and fully tested.
