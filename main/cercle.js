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
function createCircle (numSegments, radius){
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
    var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;
  
    // create GLSL shaders, upload the GLSL source, compile the shaders
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  
    // Link the two shaders into a program
    var program = createProgram(gl, vertexShader, fragmentShader);
  
    // look up where the vertex data needs to go.
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  
    // Create a buffer and put three 2d clip space points in it
    var positionBuffer = gl.createBuffer();
  
    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    var numSegments = 50; 
    var radius = 0.5; 
    var positions = createCircle(numSegments, radius)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  
    // Resize canvas to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  
    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  
    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);
  
    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);
  
    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset);
  
    // draw
    var primitiveType = gl.TRIANGLE_FAN;
    var count = numSegments + 2;
    gl.drawArrays(primitiveType, offset, count);
  }
  
main();
  