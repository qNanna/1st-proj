import 'phaser'
import config from './config'
import Resize from './resize'
import GameScene from './Scenes/GameScene'
import BootScene from './Scenes/BootScene'
import PreloaderScene from './Scenes/PreloaderScene'
import Network from './network'

class Game extends Phaser.Game {
	constructor () {
		super(config)
		this.scene.add('Boot', BootScene)
		this.scene.add('Preloader', PreloaderScene)
		this.scene.add('Game', GameScene)
	}
}

window.game = new Game()
window.resize = new Resize(window.game.scene.scenes)

window.onload = () => {
	window.network = new Network(() => {
		window.resize.init()
		window.game.scene.start('Boot')
	})
}