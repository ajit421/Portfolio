# 📝 Updating Projects

## Quick Update

To add or update projects in your portfolio:

### Method 1: GitHub Repository (Automatic)
Your portfolio automatically fetches your latest public repositories from GitHub. To have a project appear:

1. **Make repo public** on GitHub
2. **Add topics/tags** to categorize:
   - `iot` - IoT projects
   - `ai`, `ml`, `machine-learning` - AI/ML projects
   - `web`, `webapp` - Web projects
   - `pcb`, `hardware` - PCB/Hardware projects
   - `automation` - Automation projects

3. **Write a good README.md** - First paragraph becomes project description
4. **Wait or refresh** - Projects update automatically (cached for 30 minutes)

### Method 2: Featured Projects (Manual)
To ensure specific projects appear even if API fails:

1. **Open** `src/data/projectsFallback.json`

2. **Add new project**:
   ```json
   {
     "id": 9,
     "name": "Your Project Name",
     "description": "Brief description of what it does",
     "topics": ["iot", "python", "hardware"],
     "html_url": "https://github.com/yourusername/repo",
     "homepage": "https://demo-url.com",
     "stargazers_count": 10,
     "language": "Python",
     "created_at": "2024-01-15T00:00:00Z",
     "updated_at": "2024-02-10T00:00:00Z"
   }
   ```

3. **Save file** - Changes appear immediately

### Project Display Settings

**Filtering Categories:**
Projects auto-categorize based on topics:
- **IoT**: `iot`, `raspberry-pi`, `arduino`, `esp32`
- **AI/ML**: `ai`, `ml`, `machine-learning`, `deep-learning`
- **Web**: `web`, `webapp`, `react`, `vue`, `nextjs`
- **PCB**: `pcb`, `kicad`, `hardware`, `electronics`
- **Automation**: `automation`, `bot`, `scraping`

**Visibility:**
- Public repos only
- Must have description
- Archived repos excluded (can be changed in `githubService.js`)

### Tips for Better Project Display

**Good Project Names:**
- ✅ "IoT Home Automation System"
- ❌ "project-final-v2"

**Good Descriptions:**
- ✅ "Smart home control system using ESP32 and MQTT protocol"
- ❌ "My project"

**Topics to Add:**
- Technology: `python`, `javascript`, `cpp`
- Domain: `iot`, `ai`, `web`
- Framework: `vue`, `react`, `flask`, `tensorflow`

### Hiding Specific Projects

To prevent a project from showing:

1. Make the repository **private**, OR
2. Remove it from `projectsFallback.json`, OR
3. Edit `src/services/githubService.js`:
   ```javascript
   // Filter out specific repos
   const EXCLUDED_REPOS = ['repo-name-1', 'repo-name-2']
   ```

### Customizing Project Display Order

Projects are automatically sorted by:
1. Stars (descending)
2. Last updated (most recent first)

To pin a project to the top, add to `projectsFallback.json` with high star count.

### Troubleshooting

**Projects not showing:**
- Check repo is public
- Verify GitHub username in `githubService.js`
- Check browser console for API errors
- Clear cache (wait 30 minutes or refresh)

**Wrong category:**
- Add/update repository topics on GitHub
- Check topic spelling matches filter categories

**Old data showing:**
- Cache expires after 30 minutes
- Force refresh: Clear browser cache + localStorage

---

Need more help? See [CONTENT_UPDATE.md](CONTENT_UPDATE.md) for other content changes.
