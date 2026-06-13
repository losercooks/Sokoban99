let instance;

/**
 * 全局状态管理器, 带事件发布/订阅功能
 */
export default class DataBus {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;
    this._events = {};
    this.reset();
  }

  reset() {
    this._gameOver = false;
    this.steps = 0;
    this._events = {}; // Also clear events on reset
  }

  // Use a getter/setter for gameOver to automatically emit an event
  get gameOver() {
    return this._gameOver;
  }

  set gameOver(value) {
    this._gameOver = value;
    if (value) {
      this.emit('gameOver');
    }
  }

  /**
   * 监听事件
   * @param {string} eventName 事件名称
   * @param {function} callback 回调函数
   */
  on(eventName, callback) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].push(callback);
  }

  /**
   * 触发事件
   * @param {string} eventName 事件名称
   * @param  {...any} args 传递给回调函数的参数
   */
  emit(eventName, ...args) {
    const eventCallbacks = this._events[eventName];
    if (eventCallbacks) {
      eventCallbacks.forEach(callback => {
        callback(...args);
      });
    }
  }
}
