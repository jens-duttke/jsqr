[JSQR](http://jsqr.de/) - JavaScript QR Code Encoder Library
===============================================================================

JSQR is the JavaScript library that is able to encode any text and many different data formats, like URLs, vCards, vCalendar Events, geo coordinates, etc. into QR codes directly in the browser on the client, without any requests to a remote server. This increases the flexibility, speed and security of web applications.

Try it yourself using the [QR Code Generator](http://www.jsqr.de/encode.html) or the [Bookmarklet](http://www.jsqr.de/bookmarklet.html).

Basic Usages
------------
```js
var qr = new JSQR();                              // Initialize a new JSQR object
var code = new qr.Code();                         // Initialize a new Code object

code.encodeMode = code.ENCODE_MODE.BYTE;          // Set the code data type
code.version = code.DEFAULT;                      // Set the code version
                                                  //   (DEFAULT = use the smallest possible version)
code.errorCorrection = code.ERROR_CORRECTION.H;   // Set the error correction level (H = High)

var input = new qr.Input();                       // Initialize a new Input object
input.dataType = input.DATA_TYPE.TEXT;            // Specify the data type of 'data'
                                                  //   Here, 'data' contains only text
input.data = 'http://www.jsqr.de';                // Specify the data which should be encoded

var matrix = new qr.Matrix(input, code);          // Initialize a new Matrix object using the input
                                                  //   and code, defined above
                                                  //   At this point, the QR Code get generated

matrix.scale = 4;                                 // Specify the scaling for graphic output
matrix.margin = 2;                                // Specify the margin for graphic output

var canvas = document.createElement('canvas');    // Create a new Canvas element
canvas.setAttribute('width', matrix.pixelWidth);  // Set the canvas width to the size of the QR code
canvas.setAttribute('height', matrix.pixelWidth); // Set the canvas height to the size of the QR code
canvas.getContext('2d').fillStyle = 'rgb(0,0,0)'; // Set the foreground color of the canvas to black
matrix.draw(canvas, 0, 0);                        // Draw the QR code into the canvas
                                                  //   at position 0 (left), 0 (top)
document.body.appendChild(canvas);                // Append the canvas element to the documents body
```

Browser Compatibility
---------------------
IE8+, Chrome, Firefox, Safari, Opera, Mobile Safari, Android, Windows Mobile, etc.

License
-------
Dual licensed under the MIT or GPL Version 2 licenses.

What you need to build JSQR
---------------------------

In order to build JSQR, you need to have the latest Node.js/npm and git 1.7 or later. Earlier versions might work, but are not supported.

For Windows, you have to download and install [git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/download/).

Mac OS X users should install [Homebrew](http://brew.sh/). Once Homebrew is installed, run `brew install git` to install git,
and `brew install node` to install Node.js.

Linux/BSD users should use their appropriate package managers to install git and Node.js, or build from source.

How to build JSQR
-----------------
Clone a copy of the main JSQR git repo by running:

```bash
git clone git://github.com/jens-duttke/jsqr.git
```

Enter the `jsqr/` directory and install the required npm packages
```bash
cd jsqr && npm install
```

Now by running the `grunt` command, in the `jsqr/` directory, you can build a full version of JSQR:
```bash
grunt
```

Contact
-------
support@jsqr.de
