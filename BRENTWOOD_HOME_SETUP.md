# Brentwood Home RV Mattress Affiliate Setup Guide

Welcome to your new Brentwood Home RV mattress affiliate pages! This guide will help you configure everything for launch.

## 🚀 Quick Start Checklist

- [ ] Replace affiliate ID placeholders
- [ ] Configure Google Analytics tracking
- [ ] Add product images
- [ ] Test all affiliate links
- [ ] Review content and customize
- [ ] Launch!

---

## 📋 Required Configuration (CRITICAL)

### 1. Brentwood Home Affiliate ID

**Location:** `/src/config/affiliate/brentwoodHome.ts`

**Find and replace:**
```typescript
// Line 15, 23, 30, 37, 40
baseAffiliateUrl: 'https://www.brentwoodhome.com?affid=PLACEHOLDER',
```

**Replace with:**
```typescript
baseAffiliateUrl: 'https://www.brentwoodhome.com?affid=YOUR_ACTUAL_AFFILIATE_ID',
```

**How to get your Brentwood Home affiliate ID:**
1. Sign up at: https://www.brentwoodhome.com/pages/affiliates
2. Once approved, find your affiliate ID in your dashboard
3. Replace `PLACEHOLDER` with your ID in all 5 product URLs

---

### 2. Google Analytics Tracking ID

**Location:** `/src/utils/analytics.ts`

**Find:**
```typescript
// Line 40
const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with actual tracking ID
```

**Replace with:**
```typescript
const GA_TRACKING_ID = 'G-YOUR_ACTUAL_GA4_ID';
```

**OR use environment variables (recommended):**

1. Create `.env` file in project root:
```env
VITE_GA_TRACKING_ID=G-YOUR_ACTUAL_GA4_ID
VITE_BRENTWOOD_AFFILIATE_ID=your_affiliate_id
VITE_CANONICAL_DOMAIN=smartrvhub.com
```

2. Update config files to use environment variables:
```typescript
// In analytics.ts
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-XXXXXXXXXX';

// In brentwoodHome.ts
baseAffiliateUrl: `https://www.brentwoodhome.com?affid=${import.meta.env.VITE_BRENTWOOD_AFFILIATE_ID}`,
```

---

## 🖼️ Product Images (Important)

All pages reference images in `/public/images/affiliate/brentwood-home/`. You need to add:

### Required Images:

**Hero & Lifestyle Images:**
- `rv-bedroom-hero.jpg` - Cozy RV bedroom with premium mattress
- `cypress-mattress.jpg` - Brentwood Cypress Bamboo Gel product image
- `oceano-mattress.jpg` - Brentwood Oceano Luxury product image
- `crystal-cove-mattress.jpg` - Brentwood Crystal Cove Hybrid product image
- `cedar-mattress.jpg` - Brentwood Cedar Natural Luxe product image
- `ojai-mattress.jpg` - Brentwood Ojai Organic product image

**Before/After Comparison:**
- `stock-rv-mattress.jpg` - Example of poor quality stock mattress
- `premium-rv-bedroom.jpg` - Upgraded RV bedroom with quality mattress

**Feature Screenshots:**
- `size-guide-diagram.jpg` - RV mattress size comparison chart
- `installation-steps.jpg` - Installation process photos

### Where to get images:

1. **Brentwood Home Official:**
   - Visit: https://www.brentwoodhome.com
   - Download product images (usually in press kit or right-click save)
   - **IMPORTANT:** Check image usage rights for affiliates

2. **Stock Photos (for lifestyle/RV images):**
   - Unsplash: https://unsplash.com (search "RV bedroom", "RV interior")
   - Pexels: https://pexels.com (free commercial use)

3. **Create Diagrams:**
   - Use Canva or Figma for size comparison charts
   - Create simple infographics for installation steps

### Image Optimization:

```bash
# Install image optimization tool
npm install -g sharp-cli

# Optimize images (run in /public/images/affiliate/brentwood-home/)
npx sharp -i *.jpg -o optimized/ -f webp --quality 85
```

---

## ✅ Testing Checklist

### Before Launch:

1. **Test Affiliate Links:**
   ```bash
   # Search for all affiliate links
   grep -r "brentwoodhome.com" src/

   # Verify no PLACEHOLDER remains
   grep -r "PLACEHOLDER" src/
   ```

   - Click each link
   - Verify it goes to Brentwood Home with your affiliate ID
   - Check that tracking parameters are appended

2. **Test Analytics:**
   - Open browser dev tools → Network tab
   - Navigate to each page
   - Verify GA4 events fire:
     - `page_view`
     - `affiliate_click` (when clicking product links)

3. **Test All Pages Load:**
   ```bash
   npm run build
   npm run preview
   ```

   Visit each page:
   - [ ] http://localhost:4173/rv-mattress-guide
   - [ ] http://localhost:4173/rv-mattress-sizes
   - [ ] http://localhost:4173/rv-sleep-crisis
   - [ ] http://localhost:4173/brentwood-home-rv-mattresses
   - [ ] http://localhost:4173/rv-mattress-health-benefits
   - [ ] http://localhost:4173/rv-mattress-roi-calculator
   - [ ] http://localhost:4173/rv-mattress-installation

4. **Test Mobile Responsiveness:**
   - Open dev tools → Toggle device toolbar
   - Test on iPhone, iPad, Android viewports
   - Verify all CTAs are clickable (minimum 44x44px)

5. **SEO Check:**
   ```bash
   # Verify canonical URLs
   grep -r "smartrvhub.com" src/pages/affiliate/brentwood-home/
   ```

   - Check all pages have canonical URLs
   - Verify meta descriptions under 160 characters
   - Check Open Graph tags present

---

## 📊 Monitoring & Analytics

### Key Metrics to Track:

1. **Traffic Metrics:**
   - Page views per mattress page
   - Average time on page
   - Bounce rate
   - Pages per session

2. **Conversion Metrics:**
   - Affiliate link click-through rate (CTR)
   - Which products get most clicks
   - Which pages convert best
   - Exit intent modal effectiveness

3. **User Behavior:**
   - Scroll depth on buying guide
   - ROI calculator usage
   - FAQ accordion opens
   - Comparison table interactions

### Set Up Google Analytics 4 Custom Events:

Already configured events:
- `affiliate_click` - Fired when user clicks affiliate link
- `affiliate_link_click` - Detailed engagement tracking
- `page_fully_loaded` - Page load performance
- (See `/src/utils/affiliate/brentwoodHomeTracking.ts` for all events)

### Revenue Tracking:

Brentwood Home affiliate dashboard will show:
- Clicks from your site
- Conversions (sales)
- Commission earned
- Conversion rate

**Expected Performance:**
- CTR: 8-12% (clicks / page views)
- Conversion Rate: 3-8% (sales / clicks)
- Average Commission: $187 per sale
- 120-day cookie window (track returning visitors!)

---

## 🎨 Customization (Optional)

### Adjust Color Palette:

**Location:** `/src/styles/affiliate/brentwood-home.css`

Current colors:
```css
--brentwood-primary: #4A90E2;  /* Blue */
--brentwood-secondary: #7B68EE; /* Purple */
--brentwood-accent: #D4AF37;   /* Gold */
```

### Customize Copy:

**Location:** `/src/data/affiliate/brentwood-home-copy.json`

You can edit:
- Hero headlines
- Subheadlines
- Product descriptions
- FAQ answers
- CTA button text

### Add Real Testimonials:

**IMPORTANT:** Only use REAL testimonials from actual Brentwood Home customers.

**How to collect:**
1. Post-purchase email survey
2. Monitor social media mentions
3. Check Trustpilot/Amazon reviews (verified purchases only)
4. Contact Brentwood Home for approved customer stories

**Never fabricate testimonials** - it destroys trust and violates FTC regulations.

---

## 🚨 Legal & Compliance

### FTC Affiliate Disclosure:

Already implemented in footer of pages. Verify it's visible:

**Short disclosure:**
> "This page contains affiliate links. We may earn a commission from qualifying purchases at no cost to you."

**Required placement:**
- Above the fold (visible without scrolling) - ✅ Implemented
- Near affiliate links - ✅ Implemented
- In footer - ✅ Implemented

### Privacy Policy:

Ensure your privacy policy mentions:
- Use of affiliate links
- Google Analytics tracking
- Cookie usage
- User data collection

### Terms of Service:

Check Brentwood Home affiliate terms:
- Allowed promotional methods
- Restricted keywords (e.g., brand name bidding)
- Image usage rights
- Compliance requirements

---

## 📈 A/B Testing Recommendations

### Priority Tests (In Order):

1. **Hero Headlines** (Weeks 1-2)
   - Test 3 variations from copy.json
   - Measure: CTR to product pages

2. **CTA Button Colors** (Weeks 3-4)
   - Test: Primary blue vs. Purple vs. Gold
   - Measure: Click-through rate

3. **Pricing Display** (Weeks 5-6)
   - Test: Show commission vs. Hide commission
   - Test: Original price strikethrough vs. Clean pricing
   - Measure: Affiliate link clicks

4. **Product Showcase Layout** (Weeks 7-8)
   - Test: Grid vs. List view
   - Measure: Engagement and conversions

**Tool Options:**
- Google Optimize (free, integrates with GA4)
- VWO, Optimizely (paid, more features)
- Custom implementation with feature flags

---

## 🎯 Launch Day Checklist

### Final Pre-Launch:

- [ ] All `PLACEHOLDER` text replaced
- [ ] Google Analytics tracking ID configured
- [ ] All affiliate links tested and working
- [ ] Product images added and optimized
- [ ] Mobile responsive design verified
- [ ] Page load speed under 3 seconds
- [ ] SEO meta tags complete
- [ ] FTC disclosures visible
- [ ] Cross-browser tested (Chrome, Safari, Firefox)
- [ ] Spell check all content

### Deploy:

```bash
# Build production bundle
npm run build

# Test production build locally
npm run preview

# Deploy to hosting (example: Netlify)
# Your deployment command here
```

### Post-Launch (Week 1):

- [ ] Submit sitemap to Google Search Console
- [ ] Monitor Google Analytics for errors
- [ ] Check affiliate dashboard for tracking
- [ ] Test affiliate links from live site
- [ ] Monitor page load performance
- [ ] Check for 404 errors or broken links
- [ ] Share pages on social media
- [ ] Send email to newsletter subscribers

---

## 📞 Support & Resources

### Brentwood Home Affiliate Support:
- Dashboard: https://www.brentwoodhome.com/affiliate-dashboard
- Support Email: affiliates@brentwoodhome.com
- Product Info: https://www.brentwoodhome.com/pages/mattresses

### Documentation:
- Full implementation docs: `/BRENTWOOD_HOME_IMPLEMENTATION_SUMMARY.md`
- Strategy details: `/src/data/affiliate/brentwood-home-strategy.json`
- Copy library: `/src/data/affiliate/brentwood-home-copy.json`

### Troubleshooting:

**Affiliate links not working?**
- Verify affiliate ID is correct
- Check links open in new tab with tracking parameters
- Test in incognito mode (no ad blockers)

**Analytics not tracking?**
- Verify GA tracking ID is correct
- Check browser console for errors
- Use GA4 DebugView to see real-time events

**Images not loading?**
- Verify images exist in `/public/images/affiliate/brentwood-home/`
- Check file names match exactly (case-sensitive)
- Optimize large images (under 500KB each)

---

## 🎉 Success Metrics

### Month 1 Goals:
- 5,000+ page views across all mattress pages
- 400+ affiliate link clicks (8% CTR)
- 12-24 conversions (3-6% conversion rate)
- $2,250-$4,500 in commissions

### Month 3 Goals:
- 10,000+ monthly page views
- 1,000+ affiliate link clicks (10% CTR)
- 40-80 conversions (4-8% conversion rate)
- $7,500-$15,000 in commissions

### Year 1 Goals:
- 20,000+ monthly page views
- 2,400+ monthly clicks (12% CTR)
- 120-192 conversions (5-8% conversion rate)
- $22,500-$36,000 monthly commissions

---

## 🔄 Ongoing Optimization

### Monthly Tasks:
- [ ] Review analytics for top-performing pages
- [ ] Update seasonal promotions
- [ ] Add new testimonials as collected
- [ ] Refresh product pricing if changed
- [ ] Check for broken affiliate links
- [ ] Monitor Brentwood Home for new products

### Quarterly Tasks:
- [ ] Comprehensive SEO audit
- [ ] A/B test results analysis
- [ ] Content refresh (update statistics, add new FAQs)
- [ ] Competitor analysis
- [ ] User feedback collection

---

**Good luck with your Brentwood Home RV mattress affiliate program!** 🚀💰

This is a high-quality, ethical implementation designed for long-term success. The 120-day cookie window gives you a huge advantage - focus on providing value and building trust, and the conversions will follow.

**Questions?** Check the comprehensive docs or review the code comments throughout the implementation.
