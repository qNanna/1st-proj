import 'phaser'
import settings from '../settings'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game')
    }
    create() {
        if (settings.network == 'google') this.googleTitle = this.createGoogleTitle()
        
        this.logo = this.add.image(0, 0, 'logo')
        this.logo.setInteractive()
        this.logo.on('pointerdown', () => { window.network.openStore() })
        this.onResize()
    }
    onResize() {
        let r = window.resize

        if (settings.network == 'google') this.resizeGoogleTitle()

        r.scale(this.logo, { scale: 0.37 })
        r.pos(this.logo, { x: this.test() })
    }
    test() {
        let g = {
            Left: 0,
            Center: 0.5,
            Right: 1
        }

        return g[settings.variation]
    }
    createGoogleTitle() {
        let googleTitle = this.make.text({
            x: 0,
            y: 0,
            text: settings.name,
            style: {
                fill: settings.Textcolor,
            },
        })
        googleTitle.lineSpacing = 0
        googleTitle.setWordWrapWidth(0.7)
        googleTitle.setFontFamily('Arial Black')
        googleTitle.setAlign('center')
        return googleTitle
    }
    resizeGoogleTitle() {
        let r = window.resize

        this.googleTitle.setStroke('#ffffff', (r.landscape ? r.gameWidth : r.gameHeight) * 0.009)
        this.googleTitle.setFontSize((r.landscape ? r.gameWidth : r.gameHeight) * 0.03)
        r.pos(this.googleTitle, { x: 0.05, y: 0.95, origin: 0 })
        this.googleTitle.y -= this.googleTitle.height
    }
}