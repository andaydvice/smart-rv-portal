# Smart RV Hub - Project Guidelines

## Content Writing Rules

### Typography Standards

#### Hyphen Usage
**CRITICAL RULE: Remove all hyphens in content text UNLESS they are part of an official brand name.**

**Examples of CORRECT usage:**

✅ **Brand names (keep hyphens):**
- RV Life Pro
- Good Sam
- Built-in (when referring to technical specifications)
- Any trademarked product names

✅ **Text content (remove hyphens):**
- "real time updates" (not "real-time updates")
- "weather aware routing" (not "weather-aware routing")
- "full time RV living" (not "full-time RV living")
- "bridge strike prevention" (not "bridge-strike prevention")
- "cost effective solution" (not "cost-effective solution")
- "self driving features" (not "self-driving features")
- "user friendly interface" (not "user-friendly interface")

**Rationale:**
- Improves readability for senior audience (65+)
- Reduces visual clutter
- Maintains clean, accessible design
- Exception only for official brand names and trademarks

### Paragraph Structure
- New paragraph at the end of each sentence
- Improves readability for older demographics
- Creates visual breathing room

### Color Usage
**NEVER use text the same colors as CTAs:**
- Primary CTA: Orange (#E67E22 / orange-500)
- Secondary CTA: Blue (#2C5F8D / blue-600)
- Keep body text gray/white for contrast
- Maintain WCAG 2.1 AA contrast ratios (4.5:1 minimum)

### Design Consistency
- Dark theme: `from-gray-900 to-gray-800`
- No hyphens in body text (except brand names)
- Double spaced paragraphs for readability
- Touch targets 54-60px (senior friendly)

## Content Creation Workflow

### MANDATORY Agent Invocation
**Before ANY content creation, you MUST:**

1. **Invoke Content Strategist** - provides approved copy
2. **Invoke Landing Page Specialist** - provides structure
3. **Block all progress** until these agents return results

**After content creation:**
4. **Invoke Quality Control** - validates output
5. **Cannot mark task complete** without QC sign-off

### System Prompt Enforcement
```
CRITICAL RULE: You cannot write ANY content yourself.
Your role is COORDINATION only.

1. Identify required agents
2. Invoke agents
3. Implement their outputs
4. Validate with QC

If you write content directly = TASK FAILED
If you skip agent invocation = TASK FAILED
```

## Technical Standards

### SEO Requirements
- Breadcrumbs on all pages
- Product schema markup
- Canonical URLs
- Meta descriptions 150-160 characters
- H1 > H2 > H3 logical hierarchy

### Performance Targets
- Page load < 3 seconds on 4G
- Largest Contentful Paint < 2.5s
- First Input Delay < 100ms
- Cumulative Layout Shift < 0.1

### Accessibility Standards
- WCAG 2.1 AA compliance minimum
- Color contrast ratios verified
- Touch targets 44px minimum (60px preferred)
- Screen reader tested
- Keyboard navigation functional

## Deployment
- Auto-deploy via GitHub Actions
- Pre-commit hooks validate SEO and build
- Netlify deployment on push to main
- No manual testing required before push

---
*Project-specific Claude Code configuration for Smart RV Hub*
