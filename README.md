# sight.w

A gaming/activity website with themes, games, movies, and more.

## Files

- `index.html` - Main HTML structure
- `styles.css` - All CSS styles
- `script.js` - JavaScript functionality

## Testing Locally

**IMPORTANT:** Don't just double-click `index.html` - it won't work properly due to browser security restrictions.

### Option 1: VS Code Live Server (Recommended)
1. Install VS Code
2. Install the "Live Server" extension
3. Open the folder in VS Code
4. Right-click `index.html` → "Open with Live Server"

### Option 2: Python Simple Server
```bash
cd sight-w
python -m http.server 8000
```
Then open http://localhost:8000

### Option 3: Node.js Server
```bash
npx serve .
```

## Deploying to GitHub Pages

1. **Create a new GitHub repository**
   - Go to github.com → New repository
   - Name it (e.g., `sight-w`)

2. **Upload files**
   - Upload `index.html`, `styles.css`, and `script.js` to the repository root

3. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` → `/ (root)` → Save

4. **Access your site**
   ```
   https://YOUR-USERNAME.github.io/sight-w/
   ```

## Features

- **7 Themes**: Dark, Light, Ocean, Forest, Earthy, Neon, Sunset
- **Games**: Two game sources with 300+ games
- **Movies**: Streaming section
- **Tab Cloak**: Disguise as Canvas, Google, or Drive
- **Panic Button**: Press P to redirect to Google Classroom
- **about:blank Cloak**: Bypass filters
- **Keyboard Shortcuts**: A (Activities), M (Movies), H (Home), P (Panic)
- **Stats Overlay**: FPS, Ping, Battery

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| A | Open Activities |
| M | Open Movies |
| H | Go Home |
| P | Panic (redirect to Classroom) |

## Credits

- 2nd Games from [NativeLite](https://github.com/parcoillegacy/nativelite)
- Proxy by mathpunch Official
