# 项目目录结构说明

这是一个基于JavaScript的推箱子小游戏的项目结构。项目主要分为游戏逻辑、资源文件、关卡数据和云函数四个部分。

## 根目录

```
.
├── cloudfunctions/
├── images/
├── js/
├── levels/
├── game.js
├── game.json
└── project.config.json
```

*   `game.js`: 微信小游戏的入口文件，负责初始化游戏。
*   `game.json`: 微信小游戏的配置文件，定义了小游戏的窗口表现等。
*   `project.config.json`: 微信开发者工具的项目配置文件，包含了项目设置、AppID等信息。

---

## `cloudfunctions/`

这个目录存放了所有的云函数，为游戏提供后端服务。

```
cloudfunctions/
├── getLevels/
│   ├── index.js
│   └── package.json
└── uploadScore/
    ├── index.js
    └── package.json
```

*   `getLevels/`: 用于从云端获取关卡数据的云函数。
    *   `index.js`: 函数的主要逻辑代码。
    *   `package.json`: 定义了函数的依赖。
*   `uploadScore/`: 用于上传玩家分数或游戏记录到云端的云函数。
    *   `index.js`: 函数的主要逻辑代码。
    *   `package.json`: 定义了函数的依赖。

---

## `images/`

存放游戏所需的所有静态图片资源。

```
images/
├── box.png       # 箱子
├── floor.png     # 地板
├── player.png    # 玩家
├── target.png    # 目标点
└── wall.png      # 墙壁
```

---

## `js/`

存放游戏的核心JavaScript代码。

```
js/
├── base/
├── entities/
├── libs/
├── runtime/
├── databus.js
├── game_scene.js
├── main.js
└── resources.js
```

*   **`base/`**: 存放基础的、可复用的底层代码。
    *   `resourceLoader.js`: 资源加载器，负责在游戏开始前预加载所有图片资源。
    *   `sprite.js`: 精灵类，是所有游戏中可见对象（如玩家、箱子）的基类，处理渲染和位置。
    *   `utils.js`: 工具函数库，可能包含一些通用的辅助函数。
*   **`entities/`**: 存放游戏中所有“实体”的定义，每个文件对应一种游戏元素。
    *   `player.js`: 定义玩家的行为和渲染。
    *   `box.js`: 定义箱子的行为和渲染。
    *   `wall.js`: 定义墙壁。
    *   `floor.js`: 定义地板。
    *   `target.js`: 定义目标点。
    *   `decoration.js`: 定义装饰性元素，例如我们之前修改过的“海洋”。
    *   `entity.js`: 所有实体的基类。
*   **`libs/`**: 存放第三方的JavaScript库。
    *   `weapp-adapter.js`: 微信小游戏环境的适配器，让一些标准的Web API（如 `requestAnimationFrame`）能在小游戏环境中运行。
*   **`runtime/`**: 存放游戏运行时的核心管理模块。
    *   `camera.js`: 摄像头或视口管理，用于跟随玩家移动，当地图大于屏幕时非常有用。
    *   `director.js`: 导演类，用于管理游戏的不同场景（如主菜单、游戏场景、排行榜）。
*   `databus.js`: 全局状态管理器，用于在游戏的不同模块间共享数据，例如游戏是否结束、分数等。
*   `game_scene.js`: 游戏主场景，负责初始化关卡、渲染所有实体、处理游戏逻辑。
*   `main.js`: 游戏主循环和入口，负责创建canvas、启动游戏循环 (`requestAnimationFrame`)、监听用户输入和更新游戏状态。
*   `resources.js`: 定义了需要加载的图片资源列表。

---

## `levels/`

存放游戏的关卡数据。

```
levels/
└── level1.json
```

*   `level1.json`: 以JSON格式定义的关卡文件。它是一个二维数组，用不同的数字代表不同的游戏元素（如墙、地板、玩家、箱子），游戏引擎通过解析这个文件来动态生成关卡地图。这种设计使得添加新关卡变得非常容易。
