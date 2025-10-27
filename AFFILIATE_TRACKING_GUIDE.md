# RV Life Pro Affiliate Tracking System - Quick Start Guide

## Overview

A complete affiliate marketing system for RV Life Pro with:
- **Commission**: $16.25 per sale
- **Cookie Duration**: 180 days
- **Advanced Analytics**: Comprehensive tracking and conversion optimization

## Files Created

### Configuration
- `/src/config/affiliate/rvLifePro.ts` - Central configuration (URLs, codes, pricing)
- `/src/config/affiliate/index.ts` - Barrel exports

### Utilities
- `/src/utils/affiliate/rvLifeProTracking.ts` - Tracking helper functions
- `/src/utils/affiliate/index.ts` - Barrel exports

### Components
- `/src/components/affiliate/rv-life-pro/RVLifeAffiliateLink.tsx` - Tracked link button
- `/src/components/affiliate/rv-life-pro/DiscountCodeBox.tsx` - Discount code display
- `/src/components/affiliate/rv-life-pro/ExitIntentModal.tsx` - Exit intent popup
- `/src/components/affiliate/rv-life-pro/index.ts` - Barrel exports

### Hooks
- `/src/hooks/useRVLifeTracking.ts` - Analytics tracking hook

### Documentation
- `/src/components/affiliate/rv-life-pro/README.md` - Complete documentation
- `/src/components/affiliate/rv-life-pro/ExampleUsage.tsx` - Working example page

## Quick Setup (3 Steps)

### Step 1: Configure Your Affiliate ID

Edit `/src/config/affiliate/rvLifePro.ts`:

```typescript
baseAffiliateUrl: 'https://rvlife.com/pro?ref=YOUR_AFFILIATE_ID_HERE'
```

Replace `PLACEHOLDER` with your actual affiliate ID.

### Step 2: Add to Your Page

```tsx
import { RVLifeAffiliateLink, ExitIntentModal } from '@/components/affiliate/rv-life-pro';
import { useRVLifeTracking } from '@/hooks/useRVLifeTracking';

function MyPage() {
  const { trackCTAClick } = useRVLifeTracking({
    pageName: 'my-page',
  });

  return (
    <>
      <RVLifeAffiliateLink
        campaign="my-page-hero"
        buttonText="Try RV Life Pro"
        trackingLabel="Hero CTA"
      />
      <ExitIntentModal />
    </>
  );
}
```

### Step 3: Test

1. Run your dev server: `npm run dev`
2. Open browser console (F12)
3. Click affiliate links - you should see tracking logs
4. Move mouse to top of browser to trigger exit intent

## Common Usage Patterns

### Hero Section CTA

```tsx
<RVLifeAffiliateLink
  campaign="home-hero"
  buttonText="Start Free Trial"
  variant="default"
  size="lg"
  trackingLabel="Hero Primary CTA"
/>
```

### Sidebar Discount Box

```tsx
<DiscountCodeBox
  codeType="standard"
  showUrgency={true}
  location="sidebar"
/>
```

### Exit Intent (Add Once to App/Layout)

```tsx
<ExitIntentModal
  initialDelay={5000}
  disabled={false}
/>
```

### Custom Tracking

```tsx
const { trackCTAClick, trackVideoPlay } = useRVLifeTracking({
  pageName: 'product-page',
  trackScrollDepth: true,
  trackTimeOnPage: true,
});

// Track any click
trackCTAClick('Button Name', 'location');

// Track video
trackVideoPlay('video-id', 'Video Title');
```

## Key Features

### Automatic Tracking
✓ Page views
✓ Scroll depth (25%, 50%, 75%, 100%)
✓ Time on page
✓ Click events
✓ Conversions

### Discount Codes
- **Standard**: `SMARTRV20` (20% off)
- **Exit Intent**: `SMARTRV30` (30% off)

### Session Management
- Exit intent shows once per session
- Tracks all user interactions
- Prevents duplicate tracking

## Component Props Reference

### RVLifeAffiliateLink
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| campaign | string | required | Campaign identifier |
| buttonText | string | "Try RV Life Pro" | Button text |
| variant | string | "default" | Button style |
| size | string | "default" | Button size |
| trackingLabel | string | - | Analytics label |
| showDiscountTooltip | boolean | true | Show code on hover |

### DiscountCodeBox
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| codeType | 'standard' \| 'exit' | 'standard' | Discount level |
| expiryDate | Date | - | Countdown timer |
| showUrgency | boolean | true | Urgency messaging |
| location | string | - | Tracking location |
| compact | boolean | false | Compact display |

### ExitIntentModal
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| disabled | boolean | false | Disable modal |
| initialDelay | number | 5000 | Delay before active (ms) |
| expiryDate | Date | - | Offer expiry |

## Analytics Events Tracked

| Event | Description | Data Captured |
|-------|-------------|---------------|
| `page_view` | Page loaded | Page name, path, timestamp |
| `affiliate_click` | Link clicked | Product, campaign, location |
| `scroll_depth` | User scrolled | Threshold (25%, 50%, etc.) |
| `time_on_page` | Time spent | Duration in seconds |
| `exit_intent_shown` | Modal displayed | Trigger reason |
| `discount_code_copied` | Code copied | Code type, location |
| `conversion` | Purchase/signup | Value, currency |
| `video_play` | Video started | Video ID, title |
| `video_complete` | Video finished | Watch time |

## Troubleshooting

### Not seeing tracking logs?
- Check: `import.meta.env.DEV` is true
- Open browser console (F12)
- Look for emoji prefixed logs (🔗, 🎯, 📊, etc.)

### Links not opening?
- Verify `baseAffiliateUrl` is correct in config
- Check browser popup blocker
- Ensure valid affiliate ID

### Exit intent not showing?
- Wait 5 seconds after page load
- Move mouse to TOP of browser window
- Check sessionStorage - clear if needed
- Only shows once per session

### Discount codes not copying?
- Requires HTTPS in production
- Check clipboard permissions
- Try different browser

## Development Workflow

1. **Development**: Console logs show all tracking
2. **Testing**: Verify events in console
3. **Staging**: Test with real affiliate URLs
4. **Production**: Full GA4 integration

## Analytics Dashboard

All events integrate with:
- Google Analytics 4 (auto-configured)
- Custom analytics system
- Console (dev mode only)

View reports in GA4:
- Events > All events
- Filter by "affiliate_*"
- Custom dimensions for detailed analysis

## Best Practices

1. ✓ Use semantic campaign names
2. ✓ Track all CTAs consistently
3. ✓ Test exit intent on key pages
4. ✓ A/B test button copy and placement
5. ✓ Monitor discount code usage
6. ✓ Review analytics weekly

## Support

For questions or issues:
1. Check full docs: `/src/components/affiliate/rv-life-pro/README.md`
2. Review example: `/src/components/affiliate/rv-life-pro/ExampleUsage.tsx`
3. Check console logs in dev mode
4. Verify configuration in `/src/config/affiliate/rvLifePro.ts`

## Next Steps

1. [ ] Add your affiliate ID to configuration
2. [ ] Test on a sample page
3. [ ] Add to high-traffic pages
4. [ ] Enable exit intent on key pages
5. [ ] Monitor analytics dashboard
6. [ ] Optimize based on data

---

**Ready to start earning commissions!** 💰

For complete documentation, see:
`/home/user/smart-rv-portal/src/components/affiliate/rv-life-pro/README.md`
