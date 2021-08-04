module.exports = {

    "config" : [{
                title: 'Playable name',
                description: 'name',
                type: 'text',
                value: 'name'
            }, {
                title: 'Network',
                description: 'network',
                type: 'radio',
                value: ['facebook', 'vungle', 'tapjoy', 'unity', 'ironsource', 'applovin', 'google'],
                tooltip: 'Only once'
            }, {
                title: "Side",
                description: 'variation',
                type: 'radio',
                value: ["Left", "Center", "Right"]
            }, {
                title: 'Color picker',
                description: 'colorpicker',
                type: 'color',
                value: [{ title: 'Textcolor' }]
            }]

}
