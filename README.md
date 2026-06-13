# Sokoban - A Classic Puzzle Game

This is a classic Sokoban puzzle game built as a WeChat Mini-Game. The goal is to push all the boxes onto their designated target locations.

---

## Project Structure

The project is organized to separate logic, assets, and configuration, making it scalable and easy to maintain.

```
.
├── cloudfunctions/   # Backend cloud functions (e.g., for leaderboards)
├── images/           # All static image assets
│   ├── tiles/
│   │   ├── gameplay/     # Core gameplay sprites (player, box, wall, etc.)
│   │   └── environment/  # Decorative sprites (trees, etc.)
│   └── ui/             # UI elements like buttons and icons
├── js/               # Core JavaScript game logic
│   ├── base/           # Base classes (Sprite, ResourceLoader)
│   ├── entities/       # Game object definitions (Player, Box, Wall)
│   ├── libs/           # Third-party libraries (e.g., weapp-adapter)
│   ├── runtime/        # High-level managers (Director, Camera)
│   ├── databus.js      # Global state management
│   ├── game_scene.js   # Main scene logic
│   ├── main.js         # Game entry point and main loop
│   └── resources.js    # Asset path definitions
├── levels/           # Game level data in JSON format
├── game.js           # WeChat Mini-Game entry file
├── game.json         # Mini-Game configuration (e.g., window settings)
└── project.config.json # WeChat DevTools project configuration
```

### Key File Explanations

*   **`main.js`**: Initializes the game, creates the canvas, loads all resources, and starts the main game loop.
*   **`game_scene.js`**: Manages the setup of a level, renders all game entities (player, boxes, walls), and handles the core game logic for movement and collision.
*   **`resources.js`**: A central registry that maps easy-to-remember names to the actual paths of image assets. This was recently updated to reflect the new `images/tiles/` structure.
*   **`entities/*.js`**: Each file in this directory defines a game object's behavior and appearance. For example, `player.js` controls how the player is drawn and how it responds to input.
*   **`levels/*.json`**: Defines the layout of each level using a 2D array, making it simple to add new puzzles.

---

## Development Guide

To get started with development:

1.  **Prerequisites**: Install [WeChat Developer Tools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html).
2.  **Import Project**: Open the Developer Tools, choose "Import Project", and select the root directory of this repository.
3.  **AppID**: You can use a test AppID provided by the developer tools for initial development.
4.  **Run & Debug**:
    *   Use the **Simulator** for quick layout checks.
    *   Use the **"Real-time Debugging"** feature to run and test the game on your physical smartphone for the most accurate results.
