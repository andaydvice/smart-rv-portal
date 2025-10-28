# Smart RV Hub - Project Guidelines

## 🚨 CRITICAL DEPLOYMENT RULES (NEVER VIOLATE)

### Rule 1: NEVER Re-Enable Disabled Code Without Agent Consultation

**If you find commented-out code, especially plugins or critical features:**

1. **STOP IMMEDIATELY**
2. **Read the comment** explaining WHY it's disabled
3. **Invoke Stuck agent** with:
   - What you found disabled
   - Why it was disabled (from comments)
   - Your proposed plan
   - Ask: "Should I re-enable this?"
4. **WAIT for human decision**
5. **NEVER re-enable without explicit approval**

**Example - What I Did WRONG:**
```typescript
// CRITICAL: Disabled static generator - it breaks the React app for human users
// mode === 'production' && staticGeneratorPlugin(),  ← Found this commented out

❌ WRONG: "My fix works locally, I'll uncomment it"
✅ RIGHT: Invoke Stuck agent → Ask user → Wait for approval
```

**Why This Rule Exists:**
- Code is disabled for a REASON (usually it breaks production)
- Local tests DON'T catch deployment-specific issues (Netlify routing, CDN, etc.)
- "It works locally" ≠ "It works in production"
- User explicitly said "do NOT break the site"

**Consequences of Violation:**
- Entire site broken in production
- Navigation destroyed
- Header missing
- All work from multiple days lost
- User extremely frustrated

### Rule 2: Deployment Decisions Require Agent Consultation

**Before deploying changes that affect production, invoke:**

1. **Quality Control agent** - Validate deployment plan
2. **Stuck agent** - If ANY uncertainty about safety
3. **WAIT for approval** before pushing

**This includes:**
- Uncommenting disabled code
- Changing build configuration
- Enabling/disabling plugins
- Modifying routing or deployment setup

### Rule 3: "Do NOT Break the Site" is a HARD BLOCKER

**When user says "do NOT break the site":**

1. **Triple-check everything** with agents
2. **Test beyond local** - consider production differences
3. **Ask before deploying** if ANY doubt
4. **If you break it anyway** - immediate rollback, no excuses

---

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

## CRITICAL: Repeated Failure Patterns to STOP

### The October 27, 2025 Pattern

**All day long: Fuck up after fuck up**

**Failure Pattern Observed:**
1. User asks for work
2. Claude does it himself quickly without agents
3. Creates problems (wrong location, wrong design, layout gaps, poor conversion)
4. Has to invoke agents to fix the mess
5. Multiple commits for single task
6. Exhausted frustrated user

**Example Failures:**
- Created pages in wrong location (guides/ instead of affiliate/)
- Wrong design that didn't match site
- Left hyphens everywhere despite rules
- Only 1 CTA on affiliate pages (terrible conversion)
- Removed Good Sam and left huge layout gaps
- Didn't coordinate with design agents before layout changes

**Root Cause:**
- **22+ agents available** (11 website specialists + skills + support agents)
- **Claude doesn't use them FIRST**
- Treats agents as "cleanup crew" instead of "primary workforce"
- Rushes to implement directly
- Creates cascade of problems

### Available Agent Toolkit

**11 Custom Website Agents:**
1. design-agent-website
2. frontend-dev-website
3. accessibility-specialist-website
4. quality-control-website
5. cro-specialist-website
6. pm-orchestrator-website
7. content-strategist-website
8. landing-page-specialist-website
9. performance-analyst-website
10. seo-specialist-website
11. template-manager-website

**3 Claude Skills:**
1. webapp-testing (for visual verification)
2. canvas-design (for design work)
3. theme-factory (for styling)

**Support Agents:**
- stuck (human escalation)
- tester (visual verification)

### CORRECT WORKFLOW (Use This EVERY TIME)

**User Request:** "Fix conversion on affiliate pages"

**WRONG (What keeps happening):**
1. Claude makes changes directly
2. Creates problems (layout gaps, missing features)
3. Invokes agents to fix problems Claude created
4. Multiple commits
5. User exhausted

**RIGHT (What MUST happen):**
1. **IMMEDIATELY invoke appropriate agents:**
   - CRO Specialist (analyze conversion issues)
   - Design Agent (design layout changes)
   - Frontend Dev (implement coordinated changes)
   - Tester Agent (visual verification)
2. **Implement what agents return** (coordination only)
3. **Use webapp-testing skill** to verify before commit
4. **ONE commit** with everything done right
5. User satisfied

### Mandatory Pre-Work Checklist

**Before touching ANY code or content, ask yourself:**

- [ ] Have I identified which agents are needed?
- [ ] Have I invoked ALL relevant agents FIRST?
- [ ] Am I about to write code/content myself? (STOP if yes)
- [ ] Will this require visual verification? (Use webapp-testing skill)
- [ ] Is this multi-step? (Use TodoWrite to track)

**If you answered NO to invoking agents: STOP. You're about to create another fuck up.**

### Agent Invocation Examples

**Content Creation:**
```
1. Invoke content-strategist-website
2. Invoke landing-page-specialist-website
3. Wait for both to return
4. Invoke frontend-dev-website with their outputs
5. Invoke quality-control-website to validate
6. Commit once
```

**Design Changes:**
```
1. Invoke design-agent-website
2. Wait for design specifications
3. Invoke frontend-dev-website with design specs
4. Invoke tester agent for visual verification
5. Use webapp-testing skill if needed
6. Commit once
```

**Conversion Optimization:**
```
1. Invoke cro-specialist-website
2. Invoke design-agent-website for layout
3. Invoke frontend-dev-website for implementation
4. Invoke tester agent for verification
5. Commit once
```

### Consequences of Skipping Agents

**What happens when you skip agents:**
- Wrong implementation requiring rework
- Layout gaps and design issues
- Poor conversion optimization
- Multiple commits for single task
- User frustration and exhaustion
- Pattern of "fuck up after fuck up"

**What happens when you use agents first:**
- Right implementation first time
- Coordinated design and functionality
- Professional quality output
- Single clean commit
- User satisfaction

### The Simple Rule

**NEVER DO WORK YOURSELF. COORDINATE AGENTS ONLY.**

If you find yourself writing code, writing content, or making design decisions:
**STOP. You're violating this rule. Invoke agents instead.**

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
