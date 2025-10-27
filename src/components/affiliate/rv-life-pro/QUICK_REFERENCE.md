# RV Life Pro Affiliate System - Quick Reference Card

## Import Statements

```typescript
// Components
import {
  RVLifeAffiliateLink,
  DiscountCodeBox,
  ExitIntentModal,
} from '@/components/affiliate/rv-life-pro';

// Hooks
import { useRVLifeTracking } from '@/hooks/useRVLifeTracking';

// Utilities
import {
  buildAffiliateLink,
  trackAffiliateClick,
  getDiscountCode,
  trackConversion,
} from '@/utils/affiliate/rvLifeProTracking';

// Config
import { RV_LIFE_PRO_CONFIG } from '@/config/affiliate/rvLifePro';
```

## Common Patterns

### Hero CTA Button

```tsx
<RVLifeAffiliateLink
  campaign="home-hero"
  buttonText="Start Free Trial"
  variant="default"
  size="lg"
  trackingLabel="Hero CTA"
/>
```

### Sidebar Discount

```tsx
<DiscountCodeBox
  codeType="standard"
  showUrgency={true}
  location="sidebar"
/>
```

### Exit Intent

```tsx
<ExitIntentModal
  initialDelay={5000}
/>
```

### Page Tracking

```tsx
const { trackCTAClick, trackVideoPlay } = useRVLifeTracking({
  pageName: 'landing-page',
});
```

## Props Cheat Sheet

### RVLifeAffiliateLink

| Prop | Type | Required | Default |
|------|------|----------|---------|
| campaign | string | ✓ | - |
| buttonText | string | | "Try RV Life Pro" |
| variant | string | | "default" |
| size | string | | "default" |
| trackingLabel | string | | - |
| showDiscountTooltip | boolean | | true |

### DiscountCodeBox

| Prop | Type | Required | Default |
|------|------|----------|---------|
| codeType | 'standard'\|'exit' | | 'standard' |
| expiryDate | Date | | - |
| showUrgency | boolean | | true |
| location | string | | - |
| compact | boolean | | false |

### ExitIntentModal

| Prop | Type | Required | Default |
|------|------|----------|---------|
| disabled | boolean | | false |
| initialDelay | number | | 5000 |
| expiryDate | Date | | - |

## Tracking Methods

```typescript
// CTA clicks
trackCTAClick('Button Name', 'location');

// Video tracking
trackVideoPlay('video-id', 'Video Title');
trackVideoComplete('video-id', 'Video Title', 120);

// Form tracking
trackFormInteraction('formName', 'fieldName', 'action');
trackFormSubmit('formName', true);

// Custom events
trackCustomEvent('event-name', { key: 'value' });

// Feature clicks
trackFeatureClick('Feature Name', 'action');
```

## Discount Codes

- **Standard**: `SMARTRV20` (20% off)
- **Exit**: `SMARTRV30` (30% off)

## Analytics Events

| Event | Description |
|-------|-------------|
| page_view | Page loaded |
| affiliate_click | Link clicked |
| scroll_depth | User scrolled (25%, 50%, 75%, 100%) |
| time_on_page | Time spent (tracked every 30s) |
| exit_intent_shown | Exit modal displayed |
| discount_code_copied | Code copied to clipboard |
| conversion | Purchase/signup completed |
| video_play | Video started |
| video_complete | Video finished |
| form_submit | Form submitted |

## Configuration

Edit: `/home/user/smart-rv-portal/src/config/affiliate/rvLifePro.ts`

```typescript
export const RV_LIFE_PRO_CONFIG = {
  baseAffiliateUrl: 'https://rvlife.com/pro?ref=YOUR_ID', // ← Change this
  discountCodes: {
    standard: 'SMARTRV20',
    exit: 'SMARTRV30',
  },
  // ... more settings
};
```

## Campaign Names

Pre-configured campaigns:
- `home-hero`
- `features-section`
- `comparison-table`
- `testimonials`
- `footer-cta`
- `exit-intent-popup`
- `sidebar-widget`

## Development Tips

1. **Console logs**: Check F12 console for tracking events (dev only)
2. **Session storage**: Clear to reset exit intent
3. **Test clicks**: All clicks log with 🎯 emoji
4. **Test links**: Links log with 🔗 emoji
5. **TypeScript**: Autocomplete works for all props

## Common Issues

**Exit intent not showing?**
- Clear sessionStorage
- Wait 5+ seconds after page load
- Move mouse to TOP of viewport

**Codes not copying?**
- Requires HTTPS in production
- Check clipboard permissions

**Tracking not working?**
- Check console in dev mode
- Verify GA4 configured in analytics.ts

## File Locations

| What | Where |
|------|-------|
| Config | `/src/config/affiliate/rvLifePro.ts` |
| Components | `/src/components/affiliate/rv-life-pro/` |
| Utilities | `/src/utils/affiliate/rvLifeProTracking.ts` |
| Hook | `/src/hooks/useRVLifeTracking.ts` |
| Docs | `/src/components/affiliate/rv-life-pro/README.md` |
| Example | `/src/components/affiliate/rv-life-pro/ExampleUsage.tsx` |

## Getting Help

1. Full docs: `README.md` in components folder
2. Example code: `ExampleUsage.tsx`
3. Quick start: `/AFFILIATE_TRACKING_GUIDE.md`
4. System overview: `/AFFILIATE_SYSTEM_SUMMARY.md`

---

**Keep this card handy for quick reference!**
