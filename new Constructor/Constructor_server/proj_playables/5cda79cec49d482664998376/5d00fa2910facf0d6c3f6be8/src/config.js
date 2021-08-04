import 'phaser'
 
export default {
    type: Phaser.CANVAS,
    parent: "phaser",
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.RESIZE
    },
    canvasStyle: {
        margin: 0,
        padding: 0
    },
    backgroundColor: '#212121'
}