'use strict'
let M = Math

function randomColor () {
  return 'rgba(' +
    M.floor(M.random() * 255) + ', ' +
    M.floor(M.random() * 255) + ', ' +
    M.floor(M.random() * 255) + ', 1.0)'
}

$(() => {
  'use strict'
  let elem = document.getElementById('draw-shapes')
  let params = { width: window.innerWidth, height: window.innerHeight }
  let two = new Two(params).appendTo(elem)
  let centerX = two.width / 2
  let centerY = two.height / 2

  let background = two.makeRectangle(centerX, centerY, two.width, two.height)
  background.fill = 'rgb(109, 140, 149)'
  background.noStroke()

  radial()

  function radial() {
    let colors = ['aqua', 'blue', 'gold']
    let angle = 0;
    let draw =  setInterval(() => {
      if (angle > M.PI) {clearInterval(draw); saveImage()}
      let curve = two.makeCurve(
        centerX / 10,
        two.height * 1.2,
        M.cos(angle) * two.width * 2,
        two.height - (M.sin(angle) * two.height * 2),
        true
      )
      curve.stroke = colors[M.floor(angle * (60 / M.PI)) % colors.length]
      curve.linewidth = 100
      angle += M.PI / 180; two.update()
    }, 50)
    // for (let angle = 0; angle < M.PI; angle += M.PI / 180) {
    //   let curve = two.makeCurve(
    //     centerX / 10,
    //     two.height * 1.2,
    //     M.cos(angle) * two.width * 2,
    //     two.height - (M.sin(angle) * two.height * 2),
    //     true
    //   )
    //   curve.stroke = colors[M.floor(angle * (60 / M.PI)) % colors.length]
    //   curve.linewidth = 100
    // }
    // two.update()
  }

  function rectangleGradient() {
    background.fill = 'black' // 'rgb(36, 15, 48)' // 'rgb(79, 5, 64)'
    let x = 0
    let curvePoints = []
    let waveDrawer = setInterval(() => {
      if (x > two.width) {clearInterval(waveDrawer); saveImage()}

      let y = centerY + (M.sin((x / two.width) * M.PI * 200) * centerY)
      let inv_y = centerY + (M.sin((x / two.width) * M.PI * 50) * centerY * -1)
      let point = two.makeRectangle(x, y, M.random() * 50, M.random() * 200)
      let point2 = two.makeRectangle(x, inv_y, M.random() * 50, M.random() * 200)

      curvePoints.push(x)
      curvePoints.push(y)

      let red = 255 / 5
      let green = 255 / 5
      let blue = 255 / 5

      // dark purple to black gradient centered
      // red = M.floor(M.abs(y - (centerY)) / two.width * 255)
      // green = 0
      // blue = red

      // dark aqua to black gradient centered
      // red = 0
      // green = M.floor(M.abs(y - (centerY)) / two.width * 255)
      // blue = green

      // dark purple to black gradient bottom
      red = 0
      green = M.floor(y / two.height * 255)
      blue = green

      point.fill = `rgb(${red}, ${green}, ${blue})`
      point2.fill = `rgb(${red}, ${green}, ${blue})`
      point.noStroke()
      point2.noStroke()
      x++; two.update()
    }, 0)
  }

  function saveImage() {
    var svg = document.querySelector( "svg" );
    var svgData = new XMLSerializer().serializeToString( svg );

    var canvas = document.createElement( "canvas" );
    var svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    var ctx = canvas.getContext( "2d" );

    var img = document.createElement( "img" );
    img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( svgData ) );

    img.onload = function() {
      ctx.drawImage( img, 0, 0 );
      document.getElementById('download').href = canvas.toDataURL( "image/png" )
    };
  }


  function drawCurve (arr) {
    arr.push(true)
    let curve = two.makeCurve.apply(two, arr)
    curve.stroke = 'black'
    curve.linewidth = 5
    curve.noFill()
  }
})
