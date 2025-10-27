# Brentwood Home RV Mattress Affiliate Strategy - Complete Implementation Guide

## Overview

This document summarizes the comprehensive marketing and conversion optimization strategy for Brentwood Home RV mattress affiliate pages.

**Key Metrics:**
- **Commission:** $75-299 per sale (15% of $500-$1,995 products)
- **Cookie Duration:** 120 days (4 months) - **CRITICAL STRATEGIC ADVANTAGE**
- **Average Commission:** ~$187 per sale
- **Target Audience:** Qualified RV owners ready to invest in sleep quality

---

## Strategy Files Created

### 1. Main Strategy Document
**Location:** `/home/user/smart-rv-portal/src/data/affiliate/brentwood-home-strategy.json`

**Contents:**
- **Product Information:** Commission structure, pricing, target audience
- **Conversion Strategy:** Multi-touch, long-consideration funnel optimized for 120-day cookie
- **Affiliate Link Strategy:** Detailed link placement map, UTM structure, campaign naming conventions
- **Conversion Elements:** Primary/secondary CTAs, exit intent modals, sticky headers, floating action buttons
- **Trust Signal Strategy:** Certifications, warranties, trial periods, social proof methods
- **Urgency & Scarcity Tactics:** ETHICAL ONLY - seasonal promotions, bundle deals, authentic urgency
- **Cookie Duration Optimization:** Bookmark strategies, email nurture, return visitor tactics
- **A/B Testing Recommendations:** Priority tests for headlines, CTAs, colors, pricing display
- **Tracking & Analytics:** Custom events, conversion funnel stages, engagement metrics
- **Upsell & Cross-sell Strategy:** Bundles, premium upgrades, complete sleep packages

**Key Highlights:**
- **120-Day Cookie Optimization:** Complete strategy for maximizing the 4-month consideration window
- **Multi-Visit Design:** Content specifically designed to bring users back during research phase
- **Email Nurture Sequence:** 7-email sequence over 90 days to stay top-of-mind
- **Ethical Guidelines:** Clear prohibition of fake scarcity and fabricated testimonials

---

### 2. Configuration File
**Location:** `/home/user/smart-rv-portal/src/config/affiliate/brentwoodHome.ts`

**Contents:**
- **Base Affiliate URL:** Placeholder structure for affiliate ID
- **Product Configurations:** Cypress, Oceano, Crystal Cove with URLs, pricing, commissions
- **RV Size Specifications:** Short Queen, RV King, RV Queen, Three-Quarter dimensions
- **Bundle Opportunities:** Pre-configured bundles with savings calculations
- **Brand Colors:** Design system aligned with Brentwood Home eco-friendly branding
- **Trust Signals:** Certification badges, guarantee messaging
- **Campaign Names:** Standardized naming for consistent tracking
- **Cookie Advantage Messaging:** Pre-written copy for communicating 120-day benefit
- **Seasonal Promotions:** Framework for legitimate time-limited offers
- **Affiliate Disclosure:** FTC-compliant disclosure text (full, short, footer versions)

**Key Highlights:**
- **Type-Safe:** TypeScript configuration with exported types
- **Helper Functions:** Easy access to product, size, and bundle information
- **Brand Consistency:** Pre-defined color palette and design tokens
- **Cookie Messaging:** Ready-to-use copy for different contexts

---

### 3. Tracking Utilities
**Location:** `/home/user/smart-rv-portal/src/utils/affiliate/brentwoodHomeTracking.ts`

**Contents:**
- **Affiliate Link Builder:** Generates fully tracked URLs with UTM parameters
- **Click Tracking:** Detailed affiliate link click analytics
- **Scroll Depth Tracking:** Monitor engagement before clicks
- **Email Capture Tracking:** Critical for 120-day strategy
- **Exit Intent Tracking:** Modal display and interaction events
- **Comparison Engagement:** Track high-intent comparison table usage
- **Return Visitor Tracking:** Monitor users within 120-day cookie window
- **Conversion Tracking:** Actual sales when reported
- **Cookie Window Helpers:** Check if users are within valid window

**Key Highlights:**
- **LocalStorage Integration:** Stores affiliate click timestamps for return visitor tracking
- **120-Day Cookie Monitoring:** Functions to track and remind users of remaining time
- **Comprehensive Events:** 15+ custom events for detailed funnel analysis
- **Development Logging:** Helpful console logs in dev mode for debugging

---

### 4. Marketing Copy Library
**Location:** `/home/user/smart-rv-portal/src/data/affiliate/brentwood-home-copy.json`

**Already Exists - Contains:**
- **Hero Headlines:** 10 variations with A/B test priorities
- **Subheadlines:** 10 options for different contexts and personas
- **CTA Buttons:** Primary, secondary, exit intent, sticky header variations
- **Pain Point Narratives:** Deep emotional stories of RV sleep problems
- **Solution Narratives:** Transformation stories with specific outcomes
- **Product Descriptions:** Detailed copy for each Brentwood Home model
- **Feature-Benefit Mappings:** Generic vs RV-specific benefit translations
- **FAQ Content:** 25+ questions with detailed, searchable answers
- **Testimonial Guidelines:** ETHICAL collection and presentation methods
- **Email Nurture Sequence:** 10-email sequence over 120 days
- **SEO Metadata:** Complete page structure for organic traffic
- **Personas:** Full-time RVers, weekend warriors, solo travelers, renovators

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
1. **Replace Placeholder Affiliate IDs**
   - Update `PLACEHOLDER` in config files with actual Brentwood Home affiliate ID
   - Test affiliate links to ensure tracking works

2. **Install Tracking**
   - Integrate tracking utilities into existing analytics system
   - Test custom events fire correctly
   - Set up dashboard for monitoring key metrics

3. **Create Core Pages**
   - Ultimate RV Mattress Buying Guide (3,500+ words)
   - RV Mattress Size Guide (2,000+ words)
   - Brentwood Home Product Showcase (3,000+ words)

### Phase 2: Conversion Optimization (Week 3-4)
1. **Implement Conversion Elements**
   - Build exit intent modal component
   - Create sticky header CTA
   - Design floating action button (mobile)
   - Implement trust badge bar

2. **Email Capture Strategy**
   - Create lead magnet: "Ultimate RV Mattress Size Guide" PDF
   - Build email capture forms for key placements
   - Set up email automation sequence (7 emails over 90 days)

3. **A/B Testing Setup**
   - Implement testing framework (Google Optimize or similar)
   - Create headline variations
   - Set up CTA button color test
   - Define success metrics and sample sizes

### Phase 3: Content Expansion (Week 5-6)
1. **Problem/Solution Content**
   - Write pain point narratives using copy library
   - Create transformation stories
   - Develop health & wellness content

2. **Comparison & Decision Tools**
   - Build interactive product comparison table
   - Create ROI calculator tool
   - Develop product recommendation quiz

3. **SEO Optimization**
   - Optimize all pages for target keywords
   - Implement schema markup (Product, FAQ, HowTo)
   - Internal linking structure
   - Image optimization with descriptive alt text

### Phase 4: Optimization & Scaling (Week 7-8)
1. **Analyze Performance**
   - Review affiliate link CTR by placement
   - Identify drop-off points in funnel
   - Monitor scroll depth and engagement metrics
   - Track return visitor rates

2. **Iterate Based on Data**
   - Implement winning A/B test variations
   - Adjust email sequence based on open/click rates
   - Refine CTAs based on performance data
   - Optimize underperforming pages

3. **Scale What Works**
   - Create additional content for winning topics
   - Expand email list growth tactics
   - Develop video content for high-engagement topics
   - Build backlinks to top-performing pages

---

## Key Conversion Strategies

### 1. **120-Day Cookie Optimization** (CRITICAL)

**The Advantage:**
Most mattress affiliates have 30-day cookies. You have **120 days** (4 months). This allows capturing long-consideration purchases.

**Implementation:**
- **Transparent Communication:** Tell users they have 4 months to decide
- **Bookmark Encouragement:** Explicit messaging to save page and return later
- **Email Nurture:** Capture emails for follow-up over consideration period
- **Return Visitor Tracking:** Store click timestamp, show remaining days
- **No Pressure Tactics:** Let users research thoroughly, building trust

**Messaging Examples:**
- "You have 120 days to decide - bookmark this page and return when you're ready"
- "Our partnership gives you 4 full months to research. No pressure!"
- "Reminder: You have 87 days remaining in your decision window"

### 2. **Multi-Touch Conversion Funnel**

**Awareness Stage:**
- **Goal:** Introduce sleep quality problems in RVs
- **Content:** Pain-point blog posts, comparison articles
- **Conversion:** Email capture, bookmark, social share

**Consideration Stage:**
- **Goal:** Position Brentwood Home as premium solution
- **Content:** Detailed reviews, size guides, materials education
- **Conversion:** Product page visits, comparison tool usage, return visits

**Evaluation Stage:**
- **Goal:** Address objections and build confidence
- **Content:** Trial period emphasis, certification displays, warranty clarity
- **Conversion:** Affiliate link clicks, add-to-cart behavior

**Purchase Stage:**
- **Goal:** Facilitate final decision
- **Content:** Discount messaging, bundle opportunities, free shipping emphasis
- **Conversion:** Completed purchase

### 3. **Trust Signal Strategy**

**Certifications:**
- Display CertiPUR-US badges (safe foams)
- Show GREENGUARD Gold certification (low VOCs)
- Highlight Made in USA (California)

**Guarantees:**
- **120-Night Trial:** Emphasize 4-month risk-free testing
- **25-Year Warranty:** Industry-leading coverage
- **Free Shipping & Returns:** Remove friction

**Social Proof:**
- Verified ratings from Brentwood Home's site
- Third-party reviews (Sleep Foundation, Good Housekeeping)
- Real user testimonials (ONLY with permission)
- Aggregate data (500,000+ customers, 35+ years in business)

### 4. **Ethical Urgency Tactics**

**USE (Authentic):**
- Seasonal promotions (Presidents Day, Memorial Day, Labor Day, Black Friday)
- Bundle savings (genuine discounts for package deals)
- Shipping deadlines for holidays (calculated from real shipping times)
- Problem awareness ("every night of poor sleep accumulates")

**NEVER USE (Fake):**
- Countdown timers resetting on page reload
- "Only 2 left in stock" when untrue
- "100 people viewing this now" fabrications
- Fake recent purchase notifications
- Artificial scarcity tactics

### 5. **Email Nurture Sequence**

**7 Emails Over 90 Days:**
1. **Day 1:** Welcome + Size Guide delivery
2. **Day 3:** Common RV mattress mistakes to avoid
3. **Day 7:** Real RVer success story
4. **Day 14:** Video measuring tutorial
5. **Day 30:** Bundle savings opportunities
6. **Day 60:** Seasonal promotion alert (if active)
7. **Day 90:** Resource roundup + gentle reminder

**Goals:**
- Stay top-of-mind during long consideration
- Provide genuine value at each touchpoint
- Address objections progressively
- Facilitate return visits to content
- Gentle nudge without pressure

---

## A/B Testing Priority

### Test 1: Hero Headlines (HIGHEST PRIORITY)
**Variants:**
- A: "Sleep Better in Your RV with Premium Eco-Friendly Mattresses" (benefit)
- B: "Stop Settling for Poor Sleep in Your RV" (pain-point)
- C: "120-Night Trial: Find Your Perfect RV Mattress Risk-Free" (risk-reversal)

**Hypothesis:** Pain-point headlines convert better
**Success Metric:** Hero CTA click-through rate
**Sample Size:** 1,000 visitors per variant

### Test 2: Primary CTA Button Color
**Variants:**
- A: Forest Green (#2C5F2D) - eco-friendly association
- B: Warm Orange (#D97706) - high contrast
- C: Deep Blue (#1E40AF) - trust signal

**Hypothesis:** Green performs best (eco-brand alignment)
**Success Metric:** Click-through rate
**Sample Size:** 2,000 visitors per variant

### Test 3: Primary CTA Copy
**Variants:**
- A: "Explore Brentwood Home RV Mattresses"
- B: "Find Your Perfect RV Mattress"
- C: "Shop Eco-Friendly RV Mattresses"
- D: "Start Your 120-Night Trial"

**Hypothesis:** "Start Your Trial" converts best (action + risk-reversal)
**Success Metric:** Clicks + actual affiliate sales
**Sample Size:** 1,500 visitors per variant

### Test 4: Pricing Display
**Variants:**
- A: Show price ranges ($500-$1,995)
- B: Hide prices, show "See Pricing" button
- C: Show "Starting at $500"

**Hypothesis:** Hiding prices increases CTR but may reduce quality
**Success Metric:** CTR AND actual conversions
**Sample Size:** 2,000 visitors per variant

---

## Tracking & Analytics

### Custom Events to Implement

1. **affiliate_page_view** - Page loads with context
2. **scroll_depth** - 25%, 50%, 75%, 100% milestones
3. **affiliate_link_click** - Any affiliate link clicked
4. **email_captured** - Lead magnet email submission
5. **exit_intent_displayed** - Modal shown
6. **exit_intent_action** - User interaction with modal
7. **comparison_engagement** - Comparison table usage
8. **lead_magnet_download** - PDF/resource download
9. **return_visitor** - User returns within cookie window
10. **cta_interaction** - Button hover/click
11. **sticky_header_cta** - Sticky CTA interactions
12. **floating_action_button** - Mobile FAB clicks
13. **bundle_interaction** - Bundle offer engagement
14. **product_card_interaction** - Product card clicks
15. **affiliate_conversion** - Actual sale completed

### Key Metrics Dashboard

**Top-Level Metrics:**
- Affiliate Link CTR: Target 8-12%
- Affiliate Sales Conversion: Target 3-8%
- Average Order Value: Target $800-1,200
- Email Capture Rate: Target 5-8%
- Return Visitor Rate (30-day): Target 20-30%
- Average Session Duration: Target 120+ seconds
- Scroll Depth Average: Target 60%+

**Funnel Stages:**
1. **Awareness:** Page views
2. **Engagement:** Time > 60s + scroll > 50%
3. **Consideration:** Comparison viewed OR lead magnet downloaded
4. **Intent:** Affiliate link clicked
5. **Conversion:** Purchase completed

---

## Content Checklist

### Core Pages (Required)
- [ ] Ultimate RV Mattress Buying Guide (3,500+ words)
- [ ] RV Mattress Size Guide (2,000+ words)
- [ ] Brentwood Home Product Showcase (3,000+ words)
- [ ] Health & Wellness Benefits (2,500+ words)
- [ ] ROI Calculator (interactive tool + 1,500+ words)
- [ ] Installation & Care Guide (2,000+ words)

### Supporting Content
- [ ] Pain point narrative pages (3-4 stories)
- [ ] Transformation/solution stories (3-4 stories)
- [ ] Individual product detail pages (Cypress, Oceano, Crystal Cove)
- [ ] FAQ hub page
- [ ] About/Affiliate Disclosure page

### Lead Magnets
- [ ] RV Mattress Size Guide PDF (8-page downloadable)
- [ ] RV Sleep Quality Checklist (interactive PDF)
- [ ] Seasonal Buyer's Guide (quarterly updated)
- [ ] Mattress Measurement Template (printable)

### Email Sequence
- [ ] Welcome email + lead magnet delivery
- [ ] Day 3: Common mistakes email
- [ ] Day 7: Success story email
- [ ] Day 14: Measurement tutorial email
- [ ] Day 30: Bundle savings email
- [ ] Day 60: Seasonal promotion email
- [ ] Day 90: Resource roundup email

---

## Success Metrics & Goals

### Short-Term (First 3 Months)
- **Traffic:** 5,000+ monthly visitors to affiliate content
- **Email List:** 200+ subscribers
- **Affiliate Clicks:** 400+ monthly clicks (8% CTR)
- **Sales:** 12-24 conversions (3-6% of clicks)
- **Revenue:** $2,250-4,500 in affiliate commissions

### Medium-Term (3-6 Months)
- **Traffic:** 10,000+ monthly visitors
- **Email List:** 500+ subscribers
- **Affiliate Clicks:** 1,000+ monthly clicks (10% CTR)
- **Sales:** 40-80 conversions (4-8% of clicks)
- **Revenue:** $7,500-15,000 monthly commissions

### Long-Term (6-12 Months)
- **Traffic:** 20,000+ monthly visitors
- **Email List:** 1,500+ subscribers
- **Affiliate Clicks:** 2,400+ monthly clicks (12% CTR)
- **Sales:** 120-192 conversions (5-8% of clicks)
- **Revenue:** $22,500-36,000 monthly commissions

---

## Ethical Guidelines

### Always Do:
✅ Disclose affiliate relationships clearly
✅ Recommend products you genuinely believe in
✅ Provide complete, accurate product information
✅ Use only verified testimonials with permission
✅ Show real pricing and honest comparisons
✅ Focus on value to reader, not just commission
✅ Create urgency through problem awareness, not fake scarcity
✅ Honor FTC affiliate disclosure requirements

### Never Do:
❌ Fabricate testimonials or customer reviews
❌ Use fake countdown timers or artificial scarcity
❌ Make misleading claims about product benefits
❌ Hide important information (returns, warranty, limitations)
❌ Create fake "recent purchases" notifications
❌ Pressure tactics that damage trust
❌ Prioritize commission over reader benefit

---

## Next Steps

1. **Review all strategy files:**
   - `/home/user/smart-rv-portal/src/data/affiliate/brentwood-home-strategy.json`
   - `/home/user/smart-rv-portal/src/config/affiliate/brentwoodHome.ts`
   - `/home/user/smart-rv-portal/src/utils/affiliate/brentwoodHomeTracking.ts`
   - `/home/user/smart-rv-portal/src/data/affiliate/brentwood-home-copy.json`

2. **Update Affiliate IDs:**
   - Replace all `PLACEHOLDER` instances with actual Brentwood Home affiliate ID

3. **Begin Phase 1 Implementation:**
   - Start with core page content creation
   - Use copy library for headlines, CTAs, and body content
   - Implement tracking utilities

4. **Test Everything:**
   - Verify affiliate links track correctly
   - Test email capture forms
   - Confirm analytics events fire
   - Mobile responsive testing

5. **Launch and Iterate:**
   - Start with minimal viable content
   - Monitor metrics weekly
   - Run A/B tests continuously
   - Optimize based on data

---

## Questions or Issues?

Refer to specific strategy documents for detailed implementation guidance. All files include comprehensive examples, best practices, and technical specifications.

**Remember:** The 120-day cookie duration is your competitive advantage. Design everything to bring users back during their 4-month consideration period. Build trust through transparency and value, not pressure tactics.
