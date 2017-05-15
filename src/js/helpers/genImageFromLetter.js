export default function genImage(letter) {
    var colours = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext("2d")
    canvas.width = '100'
    canvas.height = '100'
    
    var w = 100
    var x = 50
    var y = 50
    ctx.beginPath()
    ctx.fillStyle = colours[Math.floor(Math.random()*colours.length)]
    ctx.arc(x, y, w/2, 0, 2 * Math.PI, false)
    ctx.fill()

    ctx.font = '35pt Calibri'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(letter, x, y+15)
    return canvas.toDataURL()
}