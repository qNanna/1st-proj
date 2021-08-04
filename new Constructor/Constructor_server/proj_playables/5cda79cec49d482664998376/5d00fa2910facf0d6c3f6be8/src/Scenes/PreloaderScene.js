import 'phaser'
import assets from '../assets/base64'

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('Preloader')
    }
    preload() {
        this.createLoadingText()

        this.textures.addBase64('logo', assets.phaserLogo)

        this.textures.on('onload', () => {
            this.loadingText.destroy()

            this.scene.start('Game')
        })

        this.onResize()
    }
    onResize() {
        let r = window.resize

        r.pos(this.loadingText)
        this.loadingText.setFontSize(r.gameWidth * 0.1)
    }
    createLoadingText() {
        this.loadingText = this.make.text({
            x: 0,
            y: 0,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        })
    }
}