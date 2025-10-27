# RV Life Pro Affiliate Tracking System

A comprehensive affiliate marketing tracking system for RV Life Pro with advanced analytics, conversion tracking, and user engagement optimization.

## Commission Details

- **Product**: RV Life Pro
- **Commission**: $16.25 per sale
- **Cookie Duration**: 180 days
- **Affiliate Network**: To be configured (see `src/config/affiliate/rvLifePro.ts`)

## System Overview

This affiliate tracking system includes:

1. **Configuration Management** - Centralized settings for URLs, codes, and pricing
2. **Tracking Utilities** - Helper functions for link building and analytics
3. **React Components** - Ready-to-use UI components with built-in tracking
4. **Analytics Hook** - Comprehensive tracking for all user interactions
5. **Exit Intent System** - Recover abandoning visitors with special offers

## Installation & Setup

### 1. Configure Your Affiliate ID

Edit `/home/user/smart-rv-portal/src/config/affiliate/rvLifePro.ts`:

```typescript
export const RV_LIFE_PRO_CONFIG = {
  baseAffiliateUrl: 'https://rvlife.com/pro?ref=YOUR_AFFILIATE_ID', // Replace PLACEHOLDER
  // ... rest of config
};
```

### 2. Import Components

```typescript
import {
  RVLifeAffiliateLink,
  DiscountCodeBox,
  ExitIntentModal,
} from '@/components/affiliate/rv-life-pro';
```

### 3. Use the Analytics Hook

```typescript
import { useRVLifeTracking } from '@/hooks/useRVLifeTracking';

function MyPage() {
  const { trackCTAClick, trackVideoPlay } = useRVLifeTracking({
    pageName: 'rv-life-pro-landing',
  });

  // Use tracking functions
}
```

## Component Usage

### RVLifeAffiliateLink

A tracked affiliate link button with automatic UTM parameters and analytics.

```tsx
import { RVLifeAffiliateLink } from '@/components/affiliate/rv-life-pro';

function HeroSection() {
  return (
    <RVLifeAffiliateLink
      campaign="home-hero"
      buttonText="Start Free Trial"
      variant="default"
      size="lg"
      trackingLabel="Hero CTA Button"
      showDiscountTooltip={true}
    />
  );
}
```

**Props:**
- `campaign` (required): Campaign identifier for tracking
- `buttonText`: Button text (default: "Try RV Life Pro")
- `variant`: Button style variant
- `size`: Button size
- `trackingLabel`: Custom label for analytics
- `showDiscountTooltip`: Show discount code on hover
- `showIcon`: Show external link icon
- `className`: Additional CSS classes

### DiscountCodeBox

Prominent discount code display with copy-to-clipboard functionality.

```tsx
import { DiscountCodeBox } from '@/components/affiliate/rv-life-pro';

function Sidebar() {
  return (
    <DiscountCodeBox
      codeType="standard"
      expiryDate={new Date('2024-12-31')}
      showUrgency={true}
      location="sidebar"
    />
  );
}
```

**Props:**
- `codeType`: 'standard' (20% off) or 'exit' (30% off)
- `expiryDate`: Optional expiry date for countdown
- `showUrgency`: Display urgency messaging
- `location`: Location identifier for tracking
- `compact`: Use compact display mode
- `className`: Additional CSS classes

### ExitIntentModal

Detects exit intent and displays enhanced offer.

```tsx
import { ExitIntentModal } from '@/components/affiliate/rv-life-pro';

function App() {
  return (
    <>
      {/* Your app content */}
      <ExitIntentModal
        disabled={false}
        initialDelay={5000}
        expiryDate={new Date('2024-12-31')}
      />
    </>
  );
}
```

**Props:**
- `disabled`: Disable exit intent detection
- `initialDelay`: Delay before activation (ms, default: 5000)
- `expiryDate`: Optional expiry for special offer

**Features:**
- Shows only once per session
- Detects mouse leaving viewport
- 30% discount vs standard 20%
- Tracks display and conversion

## Utility Functions

### buildAffiliateLink

Constructs a tracked affiliate URL with UTM parameters.

```typescript
import { buildAffiliateLink } from '@/utils/affiliate/rvLifeProTracking';

const url = buildAffiliateLink('features-page');
// Returns: "https://rvlife.com/pro?ref=YOUR_ID&utm_source=smart-rv-hub&utm_medium=affiliate&utm_campaign=features-page&utm_content=..."
```

### trackAffiliateClick

Track clicks with analytics.

```typescript
import { trackAffiliateClick } from '@/utils/affiliate/rvLifeProTracking';

trackAffiliateClick('Footer CTA', 'footer-section');
```

### getDiscountCode / getExitDiscountCode

Get discount codes.

```typescript
import { getDiscountCode, getExitDiscountCode } from '@/utils/affiliate/rvLifeProTracking';

const standardCode = getDiscountCode(); // "SMARTRV20"
const exitCode = getExitDiscountCode(); // "SMARTRV30"
```

### trackConversion

Track conversions on thank you pages.

```typescript
import { trackConversion } from '@/utils/affiliate/rvLifeProTracking';

trackConversion('ORD-12345', 65);
```

### calculateSavings

Calculate savings for a discount code.

```typescript
import { calculateSavings } from '@/utils/affiliate/rvLifeProTracking';

const { savings, percentage, finalPrice } = calculateSavings('standard');
// Returns: { savings: 13, percentage: 20, finalPrice: 52 }
```

## Analytics Hook

The `useRVLifeTracking` hook provides comprehensive analytics:

```typescript
import { useRVLifeTracking } from '@/hooks/useRVLifeTracking';

function RVLifeProPage() {
  const {
    trackCTAClick,
    trackVideoPlay,
    trackVideoComplete,
    trackFormInteraction,
    trackFormSubmit,
    trackCustomEvent,
    trackFeatureClick,
  } = useRVLifeTracking({
    pageName: 'rv-life-pro-landing',
    trackScrollDepth: true,
    trackTimeOnPage: true,
    scrollThresholds: [25, 50, 75, 90, 100],
  });

  return (
    <div>
      <button onClick={() => trackCTAClick('Primary CTA', 'hero')}>
        Get Started
      </button>
      <video
        onPlay={() => trackVideoPlay('demo-video', 'RV Life Pro Demo')}
        onEnded={() => trackVideoComplete('demo-video', 'RV Life Pro Demo', 120)}
      />
    </div>
  );
}
```

**Automatic Tracking:**
- Page views
- Scroll depth (configurable thresholds)
- Time on page (with activity detection)

**Manual Tracking:**
- `trackCTAClick(ctaName, location)` - Track CTA clicks
- `trackVideoPlay(videoId, videoTitle)` - Track video starts
- `trackVideoComplete(videoId, videoTitle, watchTime)` - Track completions
- `trackFormInteraction(formName, fieldName, action)` - Track form fields
- `trackFormSubmit(formName, success)` - Track submissions
- `trackCustomEvent(eventName, metadata)` - Custom events
- `trackFeatureClick(featureName, action)` - Feature interactions

## Complete Example

```tsx
import React from 'react';
import {
  RVLifeAffiliateLink,
  DiscountCodeBox,
  ExitIntentModal,
} from '@/components/affiliate/rv-life-pro';
import { useRVLifeTracking } from '@/hooks/useRVLifeTracking';

function RVLifeProLandingPage() {
  const { trackCTAClick, trackFeatureClick } = useRVLifeTracking({
    pageName: 'rv-life-pro-landing',
    trackScrollDepth: true,
    trackTimeOnPage: true,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Discover Your Perfect RV Adventure
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Access 14,000+ campgrounds with RV Life Pro
        </p>
        <RVLifeAffiliateLink
          campaign="landing-hero"
          buttonText="Start 7-Day Free Trial"
          variant="default"
          size="lg"
          trackingLabel="Hero Primary CTA"
        />
      </section>

      {/* Sidebar with Discount Code */}
      <aside className="lg:w-1/3">
        <DiscountCodeBox
          codeType="standard"
          expiryDate={new Date('2024-12-31')}
          showUrgency={true}
          location="sidebar"
        />
      </aside>

      {/* Features */}
      <section className="mb-16">
        <div className="grid grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              onClick={() => trackFeatureClick(feature.name, 'click')}
              className="cursor-pointer"
            >
              {/* Feature content */}
            </div>
          ))}
        </div>
      </section>

      {/* Exit Intent Modal */}
      <ExitIntentModal
        initialDelay={5000}
        expiryDate={new Date('2024-12-31')}
      />
    </div>
  );
}

export default RVLifeProLandingPage;
```

## Configuration Options

Edit `/home/user/smart-rv-portal/src/config/affiliate/rvLifePro.ts`:

```typescript
export const RV_LIFE_PRO_CONFIG = {
  baseAffiliateUrl: 'https://rvlife.com/pro?ref=YOUR_ID',

  discountCodes: {
    standard: 'SMARTRV20', // Customize codes
    exit: 'SMARTRV30',
  },

  pricing: {
    annual: 65,
    discountedAnnual: 52,
    exitDiscountAnnual: 45.50,
  },

  // Customize features, tracking, campaigns, etc.
};
```

## Analytics Integration

All tracking automatically integrates with:
- Google Analytics 4 (if configured)
- Console logging (development mode only)
- Custom analytics system (via `/home/user/smart-rv-portal/src/utils/analytics.ts`)

## Best Practices

1. **Use Campaign Names Consistently**: Define campaigns in config and reference them
2. **Track All CTAs**: Use trackCTAClick for every affiliate link
3. **Leverage Exit Intent**: Install on high-value pages
4. **Monitor Discount Code Usage**: Track copy events to measure effectiveness
5. **A/B Test Placements**: Use location parameter to compare performance
6. **Review Analytics**: Check console in dev mode for debugging

## Troubleshooting

### Links not tracking
- Check that analytics.ts is properly initialized
- Verify console in dev mode shows tracking events
- Ensure GA4 tracking ID is configured

### Exit intent not showing
- Check sessionStorage - clears on new session
- Verify initialDelay has passed
- Ensure mouse leaves from top of viewport

### Discount codes not copying
- Check browser clipboard permissions
- Verify HTTPS (required for clipboard API)

## Support

For issues or questions about the affiliate tracking system, check:
- Configuration: `/home/user/smart-rv-portal/src/config/affiliate/rvLifePro.ts`
- Analytics: `/home/user/smart-rv-portal/src/utils/analytics.ts`
- Development console for debugging logs
