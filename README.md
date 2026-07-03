# 🚗 3D Car Soccer - Rocket League Inspired Game

A high-energy, browser-based arcade car-soccer game with responsive controls optimized for both desktop and mobile devices.

## 🎮 Features

### Core Gameplay
- **Boost Mechanics** - Strategic turbo-charge acceleration with regenerating boost bar
- **Aerial Maneuvering** - Double jump and mid-air tricks for complex plays
- **Wall Driving** - Drive on stadium walls for gravity-defying maneuvers
- **Gadget-Based Abilities** - Special powers to dominate the field
- **Physics-Based Ball** - Realistic ball physics with collision detection
- **Real-Time Multiplayer AI** - Opponent AI with intelligent ball-chasing behavior

### Visual Design
- **Futuristic Neon Aesthetic** - Dark enclosed stadiums with glowing cyan/orange lighting
- **Sleek Sci-Fi Cars** - Customizable vehicle skins with dynamic trails
- **Dynamic HUD** - Real-time score, boost meter, timer display
- **Particle Effects** - Trail particles, collision effects, boost trails
- **Responsive UI** - Mobile-first design with touch controls

### Platforms
- ✅ PC (Desktop) - Full keyboard & mouse support
- ✅ Android (Mobile Web) - Touch controls & responsive layout
- ✅ Any Modern Browser - Chrome, Firefox, Safari, Edge

## 🏟️ Stadiums (4 Unique Environments)

1. **Neon Arena** - Blue and purple electric aesthetic
2. **Cyber Dome** - Orange and teal sci-fi environment
3. **Void Nexus** - Dark space with neon accents
4. **Plasma Ridge** - Industrial tech landscape

## 🚙 Selectable Cars (4 Variants)

| Car | Speed | Armor | Description |
|-----|-------|-------|-------------|
| **Speed Demon** | 9/10 | 4/10 | Fast and agile, perfect for scoring |
| **Tank Master** | 5/10 | 9/10 | Durable and powerful for defense |
| **Balanced Rider** | 7/10 | 7/10 | All-around good performance |
| **Agile Flash** | 8/10 | 6/10 | Quick reflexes and acceleration |

## 🎨 Customization

- **Car Colors** - Cyan, Pink, Lime, Yellow, and more
- **Trail Effects** - Neon, Fire, Ice, Plasma
- **Stadium Selection** - Choose your favorite arena
- **Control Preferences** - Keyboard or touch controls

## 🕹️ Controls

### Desktop
- **W/↑** - Move Forward
- **S/↓** - Move Backward
- **A/←** - Move Left
- **D/→** - Move Right
- **SPACE** - Jump
- **E / SHIFT** - Boost
- **ESC** - Pause

### Mobile (Touch Controls)
- **Virtual Joystick** - On-screen analog stick for movement
- **Tap & Drag** - Dynamic boost and jump controls
- **Swipe** - Quick direction changes

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- No installation required - just open in browser!

### Local Setup

```bash
# Clone repository
git clone https://github.com/akeshi02/car-soccer-game.git
cd car-soccer-game

# Start local server (Python 3)
python -m http.server 8000

# Open in browser
http://localhost:8000
```

### Deploy to GitHub Pages

1. Push repository to GitHub
2. Go to Settings → Pages
3. Select `main` branch as source
4. Visit: `https://yourusername.github.io/car-soccer-game`

## 📁 Project Structure

```
car-soccer-game/
├── index.html              # Main HTML entry point
├── package.json           # Project metadata
├── README.md             # Documentation
├── .gitignore            # Git ignore rules
│
├── css/
│   ├── styles.css        # Main styling & theme
│   ├── responsive.css    # Mobile responsive design
│   └── animations.css    # Neon glow & effects
│
├── js/
│   ├── main.js          # Entry point & global state
│   ├── game.js          # Core game loop & logic
│   ├── physics.js       # Physics engine
│   ├── input.js         # Keyboard & touch input
│   ├── camera.js        # Camera system
│   ├── cars.js          # Car mechanics
│   ├── ball.js          # Ball physics
│   ├── stadium.js       # Stadium rendering
│   ├── ui.js            # UI management
│   └── audio.js         # Sound effects
│
└── assets/
    ├── models/          # 3D models (future)
    ├── textures/        # Textures (future)
    ├── sounds/          # Sound files
    └── fonts/           # Custom fonts
```

## 🔧 Game Mechanics

### Physics
- Gravity-based vertical movement
- Friction-based deceleration
- Collision detection (car-ball, car-car, boundary)
- Momentum and angular velocity
- Mass-based impact calculations

### Scoring
- Score goal by hitting ball past opponent's goal line
- Blue team: Y > 60
- Orange team: Y < -60
- 5-minute match duration
- First to highest score wins

### Boost System
- Start with 100% boost charge
- Use SPACE (jump) + E (boost) to turbo
- Regenerates 20% per second when not boosting
- Strategic resource management

## 📱 Mobile Optimization

- **Responsive Grid Layouts** - Auto-fit to screen size
- **Touch-Friendly Buttons** - 44px minimum touch targets
- **Accelerometer Support** - Tilt controls (future)
- **Haptic Feedback** - Vibration on actions (future)
- **Landscape/Portrait** - Adapts to any orientation
- **Battery Optimization** - Reduced animations on low battery

## 🎵 Audio

- Ambient soundtrack
- Jump/boost SFX
- Collision sounds
- Goal celebration audio
- UI interaction feedback

## 🐛 Known Issues & TODOs

- [ ] Add sound effects & background music
- [ ] Implement multiplayer networking
- [ ] Add advanced AI opponent tactics
- [ ] Create 3D model assets
- [ ] Add achievements & leaderboards
- [ ] Mobile app wrapper (React Native/Capacitor)
- [ ] VR support (WebXR)
- [ ] Replay system

## 💡 Future Features

- **Online Multiplayer** - WebSocket-based real-time matches
- **Ranked Seasons** - Competitive play with ranks
- **Cosmetics** - Skins, wheels, decals, explosions
- **Campaign Mode** - Story-driven single-player
- **Tournaments** - Bracket-based competition
- **Replays** - Save and share match highlights
- **Customizable Maps** - Level editor
- **Controller Support** - Xbox, PlayStation, generic gamepads

## 🤝 Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👨‍💻 Credits

- **Inspired by** Rocket League by Psyonix
- **Built with** Vanilla JavaScript, Canvas 2D API
- **Developed by** Game Development Community

## 📞 Support

For issues, questions, or suggestions:
- Open a GitHub Issue
- Email: support@gamesdev.com
- Join Discord Community (link)

## 🌐 Live Demo

[Play Now](https://akeshi02.github.io/car-soccer-game)

---

**Enjoy the game! 🎮⚡**
