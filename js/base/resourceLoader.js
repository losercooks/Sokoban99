import { RESOURCES } from './const.js'

export class ResourceLoader {
  constructor() {
    this.map = new Map(RESOURCES)
    for (const [key, value] of this.map) {
      const image = new Image()
      image.src = value
      this.map.set(key, image)
    }
  }

  onLoaded(callback) {
    let loadedCount = 0
    for (const image of this.map.values()) {
      image.onload = () => {
        loadedCount++
        if (loadedCount >= this.map.size) {
          callback()
        }
      }
    }
  }

  getImage(key) {
    return this.map.get(key)
  }
}
