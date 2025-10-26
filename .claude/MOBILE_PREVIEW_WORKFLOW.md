# Mobile Preview Workflow

## Important: Always Use This Workflow for Design Changes

### Preview URL (Permanent - Bookmark This!)
**[https://claude-check-code-skills-011cuvjadradw6jviabsknjp--smartrvhub.netlify.app](https://claude-check-code-skills-011cuvjadradw6jviabsknjp--smartrvhub.netlify.app)**

### Branch Information
- **Branch Name**: `claude/check-code-skills-011CUVJAdradW6jviABSKNjp`
- **Netlify Site**: smartrvhub.com
- **Production**: smartrvhub.com
- **GitHub Repo**: andaydvice/smart-rv-portal

### Workflow After Making Design Changes

1. **Make changes** to code
2. **Commit changes** with descriptive message
3. **Push to branch**: `claude/check-code-skills-011CUVJAdradW6jviABSKNjp`
4. **Wait 2-3 minutes** for Netlify to auto-deploy
5. **Provide preview URL** to user for mobile testing
6. **User refreshes** the bookmarked URL on mobile to see changes

### Key Settings
- **Netlify Branch Deploys**: Enabled for "All" branches
- **Auto-deploy**: ON
- **Build Command**: `npm ci && npm run build` (from netlify.toml)
- **Publish Directory**: `dist`

### Important Notes
- Claude Code Web has NO built-in preview
- Tunneling services (ngrok, localtunnel) are BLOCKED in Claude Code Web
- User accesses preview via GitHub mobile app or mobile browser
- Always provide the preview URL as a clickable link after pushing changes
- Deploy time: 2-3 minutes after push

### User Preferences
- User is on Claude Code Web (mobile)
- User uses GitHub mobile app
- User needs to see visual changes on mobile device
- User wants permanent URL (not changing URLs per task)
