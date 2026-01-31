---
description: How to set up a new GitHub remote repository
---

# Setting Up GitHub Remote

Follow these steps to connect this local repository to GitHub:

## 1. Create Repository on GitHub

- Go to https://github.com/new
- Repository name: `health-reboot` (or your preferred name)
- Description: "AI-driven holistic health and wellness system"
- **Important**: Choose **Private** (this handles health data!)
- **Do NOT** initialize with README, .gitignore, or license (we already have these)
- Click "Create repository"

## 2. Configure Git User (if needed)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 3. Add Remote and Push

Replace `YOUR_USERNAME` with your GitHub username:

// turbo
```bash
git remote add origin https://github.com/YOUR_USERNAME/health-reboot.git
```

// turbo
```bash
git branch -M main
```

// turbo
```bash
git push -u origin main
```

## 4. Verify

```bash
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/health-reboot.git (fetch)
origin  https://github.com/YOUR_USERNAME/health-reboot.git (push)
```

## 5. Future Commits

After making changes:

```bash
git add .
git commit -m "Your commit message"
git push
```

## Security Reminders

✅ Repository is set to **Private**
✅ `.gitignore` excludes `.env` and sensitive files
✅ `SECURITY.md` documents best practices

**Never push real health data or API credentials!**
