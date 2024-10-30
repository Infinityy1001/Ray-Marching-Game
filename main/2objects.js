function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
function createRectangleVertices(){
  return [
    -0.8, -0.5,
    -0.4, -0.5,
    -0.8, 0.5,
    -0.8, 0.5,
    -0.4, -0.5,
    -0.4, 0.5,
  ];
}
function createCircleVertices (numSegments, radius){
  var positions = []

  positions.push(0,0); 

  for (let i = 0; i <= numSegments; i++){
      let angle = (i/numSegments)*Math.PI*2; 
      let x = radius *Math.cos(angle);
      let y = radius *Math.sin(angle);
      positions.push(x,y); 
  }
  return positions; 
}

function main() {
  // Get A WebGL context
  var canvas = document.querySelector("#c");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  // Get the strings for our GLSL shaders
  var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
  var fragmentShaderSourceBlue = document.querySelector("#fragment-shader-blue").text;
  var fragmentShaderSourceRed = document.querySelector("#fragment-shader-red").text;

  // create GLSL shaders, upload the GLSL source, compile the shaders
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);

  var fragmentShaderBlue = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSourceBlue);
  var programBlue = createProgram(gl, vertexShader, fragmentShaderBlue);

  var fragmentShaderRed = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSourceRed);
  var programRed = createProgram(gl, vertexShader, fragmentShaderRed);
 
 
  

  // look up where the vertex data needs to go.
  var positionAttributeLocationBlue = gl.getAttribLocation(programBlue, "a_position");
  var positionAttributeLocationRed = gl.getAttribLocation(programRed, "a_position");

 // Rectangle

  var rectangleBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, rectangleBuffer); 

  var rectangleVertices = createRectangleVertices(); 
  gl.bufferData(
    gl.ARRAY_BUFFER, 
    new Float32Array (rectangleVertices), 
    gl.STATIC_DRAW
  );
  
  // Cercle

  var circleBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, circleBuffer); 

  var numSegments = 50; 
  var radius = 0.3;
  var circleVertices = createCircleVertices(numSegments, radius, 0.5); // Decalé sur la droite 
  gl.bufferData(
    gl.ARRAY_BUFFER, 
    new Float32Array(circleVertices), 
    gl.STATIC_DRAW
  ); 


  // Resize canvas to window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Nettoyer le canva 
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Utiliser le programme shader
  gl.useProgram(programRed);
  gl.enableVertexAttribArray(positionAttributeLocationRed);

  // Dessiner le rectangle 
  gl.bindBuffer(gl.ARRAY_BUFFER, rectangleBuffer);
  var size = 2;          
  var type = gl.FLOAT;   
  var normalize = false; 
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;  
  gl.vertexAttribPointer(
    positionAttributeLocationRed, 
    size, 
    type, 
    normalize, 
    stride,
    offset);
  var primitiveTypeRectangle = gl.TRIANGLES
  var offset = 0
  var count_rectangle = 6
  gl.drawArrays(
    primitiveTypeRectangle,
    offset , 
    count_rectangle);

  // Dessiner le cercle
  gl.useProgram(programBlue);
  gl.enableVertexAttribArray(positionAttributeLocationBlue);
  gl.bindBuffer(gl.ARRAY_BUFFER, circleBuffer);
  gl.vertexAttribPointer(
    positionAttributeLocationBlue , 
    size, 
    type, 
    normalize, 
    stride,
    offset);
  
  var primitiveType_Circle = gl.TRIANGLE_FAN; 
  var count_circle = numSegments + 2
  gl.drawArrays(
    primitiveType_Circle, 
    offset,
    count_circle
  );

}

main();
