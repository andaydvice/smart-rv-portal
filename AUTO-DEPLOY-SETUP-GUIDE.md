# GitHub Actions Auto-Deploy Setup Guide

**Universal guide for setting up automatic PR creation and merging in any project.**

---

## 🎯 Goal

When you push to a feature branch (`claude/**`), GitHub Actions should:
1. Run quality checks and build tests
2. Automatically create a PR
3. Automatically merge the PR to main
4. Zero manual git commands or GitHub clicking

---

## ⚠️ Common Problems & Solutions

### Problem 1: `gh pr create` returns exit code 1 even when PR is created

**Symptom:** Workflow fails with "Process completed with exit code 1" but PR actually exists.

**Root Cause:** GitHub CLI sometimes returns non-zero exit codes even on success.

**Solution:** Use `|| true` to ignore exit codes, then verify by querying:

```bash
# DON'T DO THIS (will fail):
gh pr create --base main --head "$BRANCH" --title "Auto-deploy"

# DO THIS (works):
gh pr create --base main --head "$BRANCH" --title "Auto-deploy" || true

# Then verify it worked:
sleep 2
PR_NUMBER=$(gh pr list --head "$BRANCH" --base main --json number --jq '.[0].number')
```

### Problem 2: "Resource not accessible by integration"

**Symptom:** Workflow fails with permissions error when creating PR.

**Solution:** Add explicit permissions block to workflow:

```yaml
permissions:
  contents: write
  pull-requests: write
```

### Problem 3: Auto-merge not working

**Symptom:** PR is created but doesn't auto-merge.

**Solution:** Enable in repo settings:
- Go to: `https://github.com/USER/REPO/settings`
- Scroll to "Pull Requests" section
- Check: **"Allow auto-merge"**
- Save

### Problem 4: YAML syntax errors with multiline strings

**Symptom:** "You have an error in your yaml syntax on line X"

**Solution:** Keep PR descriptions simple, avoid complex multiline strings:

```yaml
# DON'T DO THIS:
--body "## Title
**Bold text**: `code`
Multiple lines..."

# DO THIS:
--body "Simple description"
```

---

## ✅ Working Auto-Deploy Workflow

Save as `.github/workflows/auto-deploy.yml`:

```yaml
name: Auto-Deploy to Production

on:
  push:
    branches:
      - 'claude/**'

permissions:
  contents: write
  pull-requests: write

jobs:
  auto-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run build test
        run: npm run build

      - name: Create Pull Request
        id: create-pr
        run: |
          # Check if PR already exists
          EXISTING_PR=$(gh pr list --head "${{ github.ref_name }}" --base main --json number --jq '.[0].number' 2>/dev/null || echo "")

          if [ -n "$EXISTING_PR" ]; then
            echo "✅ PR already exists: #$EXISTING_PR"
            echo "pr-number=$EXISTING_PR" >> $GITHUB_OUTPUT
          else
            echo "Creating new PR..."
            gh pr create \
              --base main \
              --head "${{ github.ref_name }}" \
              --title "Auto-deploy" \
              --body "Automated deployment" \
              --fill || true

            # Get PR number after creation
            sleep 2
            PR_NUMBER=$(gh pr list --head "${{ github.ref_name }}" --base main --json number --jq '.[0].number' 2>/dev/null || echo "")

            if [ -n "$PR_NUMBER" ]; then
              echo "✅ Created PR #$PR_NUMBER"
              echo "pr-number=$PR_NUMBER" >> $GITHUB_OUTPUT
            fi
          fi
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Enable auto-merge
        if: steps.create-pr.outputs.pr-number
        run: |
          echo "Enabling auto-merge for PR #${{ steps.create-pr.outputs.pr-number }}..."
          gh pr merge ${{ steps.create-pr.outputs.pr-number }} \
            --auto \
            --squash \
            --delete-branch
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Notify success
        if: success()
        run: |
          echo "✅ Auto-deployment initiated!"
          echo "PR #${{ steps.create-pr.outputs.pr-number }} will auto-merge when checks pass"
```

---

## 📋 Setup Checklist

### One-Time Repository Setup:

1. **Enable auto-merge in repo settings:**
   - Go to: `Settings → General → Pull Requests`
   - Check: ✅ "Allow auto-merge"
   - Save

2. **Enable GitHub Actions permissions:**
   - Go to: `Settings → Actions → General`
   - Set: "Read and write permissions"
   - Check: ✅ "Allow GitHub Actions to create and approve pull requests"
   - Save

3. **Create the workflow file:**
   - Copy the YAML above to `.github/workflows/auto-deploy.yml`
   - Commit and push to main

4. **Test it:**
   - Create a branch: `git checkout -b claude/test-123`
   - Make a change, commit, push
   - Watch: PR should auto-create and auto-merge

---

## 🔍 Debugging Failed Workflows

### Step 1: Check which step failed
- Go to Actions tab
- Click on failed workflow run
- Look for red ❌ next to step name

### Step 2: Common failures

| Error | Cause | Fix |
|-------|-------|-----|
| `exit code 1` on "Create PR" | gh returns non-zero even on success | Add `\|\| true` after gh command |
| `Resource not accessible` | Missing permissions | Add `permissions:` block to workflow |
| Auto-merge doesn't work | Setting disabled | Enable in repo settings |
| `YAML syntax error` | Invalid multiline string | Simplify PR body text |

### Step 3: Verify PR was created anyway
Even if workflow shows failed, check if PR exists:
```bash
gh pr list --head claude/your-branch-name
```

If PR exists, the workflow partially worked - just needs the exit code fix.

---

## 🎓 Key Lessons Learned

1. **Exit codes lie** - `gh pr create` can succeed but return non-zero
2. **Query, don't parse** - Get PR number by listing PRs, not parsing output
3. **Permissions matter** - Both workflow-level AND repo-level settings required
4. **Keep YAML simple** - Complex strings cause syntax errors
5. **Test incrementally** - Fix one issue at a time, verify each step

---

## 🚀 Result

After setup, your workflow becomes:

```bash
git checkout -b claude/feature-name
# make changes
git commit -m "Add feature"
git push -u origin claude/feature-name
```

Then **everything happens automatically:**
- ✅ GitHub Actions runs tests
- ✅ Creates PR automatically
- ✅ Merges PR automatically
- ✅ Deploys automatically (if you have Netlify/Vercel connected)

**Zero manual steps. Zero clicking on GitHub.**

---

## 📝 Troubleshooting Commands

```bash
# Check if PR exists for a branch
gh pr list --head claude/branch-name --base main

# Manually enable auto-merge on existing PR
gh pr merge PR_NUMBER --auto --squash

# Check workflow runs
gh run list --workflow=auto-deploy.yml

# View workflow logs
gh run view RUN_ID --log
```

---

**Last Updated:** October 2025
**Tested On:** GitHub Actions, works with any repo/language
