[JSQR](http://jsqr.de/) - JSQR - JavaScript Quick Response Code Encoder Library
===============================================================================

JSQR is the JavaScript Library that is able to encode different data formats, like vCards, vCalendar Events, geo coordinates etc. into QR codes directly in the browser on the client, without any requests to a remote server. This increases the flexibility, speed and security of web applications.

Try it yourself using the [QR Code Generator](http://www.jsqr.de/encode.html) or the [Bookmarklet](http://www.jsqr.de/bookmarklet.html).

Basic Usages
------------
```js
var qr = new JSQR();                                // Initialize a new JSQR object
var code = new qr.Code();                           // Initialize a new Code object

code.encodeMode = code.ENCODE_MODE.BYTE;            // Set the code data type
code.version = code.DEFAULT;                        // Set the code version
                                                    //   (DEFAULT = use the smallest possible version)
code.errorCorrection = code.ERROR_CORRECTION.H;     // Set the error correction level (H = High)

var input = new qr.Input();                         // Initialize a new Input object
input.dataType = input.DATA_TYPE.TEXT;              // Specify the data type of 'data'
                                                    //   Here, 'data' contains only text
input.data = 'http://www.jsqr.de';                  // Specify the data which should be encoded

var matrix = new qr.Matrix(input, code);            // Initialize a new Matrix object using the input
                                                    //   and code, defined above
                                                    // At this point, the QR Code get generated

matrix.scale = 4;                                   // Specify the scaling for graphic output
matrix.margin = 2;                                  // Specify the margin for graphic output

var canvas = document.createElement('canvas');      // Create a new Canvas element
canvas.setAttribute('width', matrix.pixelWidth);    // Set the canvas width to the size of the QR code
canvas.setAttribute('height', matrix.pixelWidth);   // Set the canvas height to the size of the QR code
canvas.getContext('2d').fillStyle = 'rgb(0,0,0)';   // Set the foreground color of the canvas to black
matrix.draw(canvas, 0, 0);                          // Draw the QR code into the canvas
                                                    //   at position 0 (left), 0 (top)
document.body.appendChild(canvas);                  // Append the canvas element to the documents body
```

Browser Compatibility
---------------------
IE8+, Chrome, Firefox, Safari, Opera, Mobile Safari, Android, Windows Mobile, ETC.

License
-------
MIT License

Contact
-------
j.duttke@web.de
