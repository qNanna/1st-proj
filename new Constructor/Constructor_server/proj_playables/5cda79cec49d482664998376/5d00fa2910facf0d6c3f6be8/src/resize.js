import settings from './settings'

export default class Resize {
    constructor(scenes) {
        this.scenes = scenes
        this.landscape = window.game.scale.orientation == 'landscape-primary'
        this.aspectRatio = [19.5, 9]
    }
    getProps(bounds, parent) {
        let obj = {}
        obj.originX = bounds.origin != undefined ? bounds.origin : bounds.originX != undefined ? bounds.originX : 0.5
        obj.originY = bounds.origin != undefined ? bounds.origin : bounds.originY != undefined ? bounds.originY : 0.5

        obj.parentWidth = parent.width * parent.scaleX || this.gameWidth
        obj.parentHeight = parent.height * parent.scaleY || this.gameHeight
    
        obj.xC = bounds.x != undefined ? bounds.x : 0.5
        obj.yC = bounds.y != undefined ? bounds.y : 0.5

        obj.defaultType = Object.keys(parent).length ? 'height' : 'both'
        obj.types = {
            'both': this.landscape ? obj.parentWidth : obj.parentHeight,
            'width': obj.parentWidth,
            'height': obj.parentHeight
        }
        obj.parentX = (parent.gx || parent.x - obj.parentWidth * parent.originX) || 0
        obj.parentY = (parent.gy || parent.y - obj.parentHeight * parent.originY) || 0
        return obj
    }
    pos(gameObject, bounds = {}, parent = {}) {
        let { originX, originY, parentWidth, parentHeight, xC, yC, parentX, parentY } = this.getProps(bounds, parent)

        gameObject.setOrigin && gameObject.setOrigin(originX, originY)

        gameObject.x = parentX + parentWidth * xC
        gameObject.y = parentY + parentHeight * yC
    }
    scale(gameObject, bounds = {}, parent = {}) {
        let { types, defaultType } = this.getProps(bounds, parent)
        
        gameObject.setScale(types[bounds.type || defaultType] / gameObject.width * (bounds.scale != undefined ? bounds.scale : 1))
    }
    redraw(gameObject, bounds = {}, parent = {}) {
        let { originX, originY, parentWidth, parentHeight, xC, yC, types, defaultType, parentX, parentY } = this.getProps(bounds, parent)

        let width = types[bounds.type || defaultType] * (bounds.width != undefined ? bounds.width : 0.5)
        let height = types[bounds.type || defaultType] * (bounds.height != undefined ? bounds.height : 0.5)

        gameObject.gx = parentX + parentWidth * xC - width * originX
        gameObject.gy = parentY + parentHeight * yC - height * originY
        gameObject.width = width
        gameObject.height = height

        gameObject.clear()
        gameObject.fillStyle(bounds.color || 0x00ff00, bounds.opacity != undefined ? bounds.opacity : 1)
        gameObject.fillRect(parentX + parentWidth * xC - width * originX, parentY + parentHeight * yC - height * originY, width, height)
    }
    resizeBounds() {
        let wrapper = document.querySelector('#phaser')
        let bounds = wrapper.getBoundingClientRect()
        this.gameWidth = bounds.width
        this.gameHeight = bounds.height
        this.landscape = bounds.width > bounds.height
    }
    resize() {
        this.scenes.forEach(el => {
            if (!el.scene.settings.active) return

            el.onResize && el.onResize()
        })
    }
    test(text) {
        let p = document.createElement('p')
        p.style.top = (Math.random() * 200) + 'px'
        p.style.left = 0
        p.innerHTML = text
        p.style.zIndex = 1000
        p.style.position = 'absolute'
        p.style.color = '#ffffff'
        document.body.appendChild(p)
    }
    resizeWrapper() {
        let wrapper = document.querySelector('#phaser')
        if (window.innerWidth > window.innerHeight) {
            wrapper.style.maxWidth = window.innerHeight / this.aspectRatio[1] * this.aspectRatio[0] + 'px'
            wrapper.style.maxHeight = ''
        } else {
            wrapper.style.maxHeight = window.innerWidth / this.aspectRatio[1] * this.aspectRatio[0] + 'px'
            wrapper.style.maxWidth = ''
        }
    }
    resizeWrap() {
        let wrapper = document.querySelector('#phaser')
        let obj = window.dapi.getScreenSize()

        wrapper.style.maxHeight = obj.width + 'px'
        wrapper.style.maxWidth = obj.height + 'px'
    }
    init() {
        this.resizeWrapper()
        this.resizeBounds()

        window.onresize = () => {
            settings.network == 'ironsource' && window.network.os == 'ios' ? this.resizeWrap() : this.resizeWrapper()
            this.resizeBounds()
            this.resize()
        }
    }
}