var Matrix = function (input, code) {
	var matrix, i,
		_this = this;

	matrix = encodeMatrix(processInput(input, code), code);

	for (i = 0; i < matrix.length; i++) {
		this[i] = matrix[i];
	}

	try {
		Object.defineProperty(this, 'scale', {
			configurable: false,
			writeable: true,
			get: function () { return scale; },
			set: function (value) {
				if (typeof value !== 'number') {
					throw new TypeError('Invalid scale type');
				} else if (value <= 0 || value > 256) {
					throw new RangeError('Scale value out of range');
				} else {
					scale = value;
				}
			}
		});

		var scale = 4;
	} catch (e) {
		this.scale = 4;
	}

	try {
		Object.defineProperty(this, 'margin', {
			configurable: false,
			writeable: true,
			get: function () { return margin; },
			set: function (value) {
				if (typeof value !== 'number') {
					throw new TypeError('Invalid margin type');
				} else if (value < 0 || value > 256) {
					throw new RangeError('Margin value out of range');
				} else {
					margin = value;
				}
			}
		});

		var margin = 4;
	} catch (e) {
		this.margin = 4;
	}

	try {
		Object.defineProperty(this, 'color1', {
			configurable: false,
			writeable: true,
			get: function () { return color1; },
			set: function (value) {
				if (typeof value === 'string') {
					color1 = value;
				} else {
					throw new TypeError('Invalid color1 type');
				}
			}
		});

		var color1 = 'rgb(0,0,0)';
	} catch (e) {
		this.color1 = 'rgb(0,0,0)';
	}

	try {
		Object.defineProperty(this, 'color0', {
			configurable: false,
			writeable: true,
			get: function () { return color0; },
			set: function (value) {
				if (typeof value === 'string') {
					color0 = value;
				} else {
					throw new TypeError('Invalid color2 type');
				}
			}
		});

		var color0 = 'none';
	} catch (e) {
		this.color0 = 'none';
	}

	try {
		Object.defineProperty(this, 'length', {
			configurable: false,
			writeable: false,
			get: function () {
				return matrix.length;
			}
		});
	} catch (e) {
		this.length = new function () {
			this.toString = function () {
				return matrix.length;
			};
		};
	}

	try {
		Object.defineProperty(this, 'width', {
			configurable: false,
			writeable: false,
			get: function () {
				return matrix.length + (_this.margin << 1);
			}
		});
	} catch (e) {
		this.width = new function () {
			this.toString = function () {
				return matrix.length + (_this.margin << 1);
			};
		};
	}

	try {
		Object.defineProperty(this, 'pixelWidth', {
			configurable: false,
			writeable: false,
			get: function () {
				return (matrix.length + (_this.margin << 1)) * _this.scale;
			}
		});
	} catch (e) {
		this.pixelWidth = new function () {
			this.toString = function () {
				return (matrix.length + (_this.margin << 1)) * _this.scale;
			};
		};
	}

	/* *********** */

	this.draw = function (canvas, left, top) {
		var	context = canvas.getContext('2d'),
			scale = this.scale,
			margin = this.margin,
			x, y;

		for (y = 0; y < matrix.length; y++) {
			for (x = 0; x < matrix[y].length; x++) {
				if (matrix[y][x]) {
					context.fillRect(left + (x + margin) * scale, top + (y + margin) * scale, scale, scale);
				}
			}
		}
	};

	/*
		If not specified elsewise, the default tag type for the pixel-elements is DIV.
		Make sure pixel-elements in the output-container are block elements and have no margin, padding, border, outline or anything else which could affect the layout of the div-blocks.
		If the boolean value positionOnly is not set, "position:absolute" and "background" is set for each tag. It's recommend to set this positionOnly to "true" and set these CSS properties using a CSS selector (#out div div { ... }) to improve the speed.
		This function use a horizontal RLE compression to keep the number of required DIV-elements smaller. The compression ratio is about 1:2.
		A compression ratio of 1:3 would be possible, if we would addionally use a vertical RLE, but this would require much more complex code.

		Example:          horizontal RLE:   horizontal + vertical RLE:
		********          --------          --------
		*      *          -      -          |      |
		* **** *          - ---- -          | ++++ |
		* **** *          - ---- -          | ++++ |
		* **** *          - ---- -          | ++++ |
		* **** *          - ---- -          | ++++ |
		*      *          -      -          |      |
		********          --------          |------|
		44 DIVs           12 DIVs           5 DIVs
		(here, the compression ratio is higher, because of the simple structure of the block)
	*/
	this.drawHTML = function (container, tagName, positionOnly) {
		tagName = tagName || 'div';

		var	scale = this.scale,
			margin = this.margin,
			background = this.color1,
			html = '<div style="position:relative; background:' + this.color2 + '">',
			x, y, xW;

		for (y = 0; y < matrix.length; y++) {
			for (x = 0; x < matrix.length; x = x + xW) {
				xW = 1;
				if (matrix[y][x] === 1) {
					while (x + xW < matrix.length && matrix[y][x + xW] === 1) { xW ++; }
					if (positionOnly) {
						// Faster but requires a additional stylesheet (#out div div { position:absolute; background:#000; height:4px; }):
						html += '<' + tagName + ' style="width:' + (xW * scale) + 'px; height:' + scale + 'px; left:' + ((x + margin) * scale) + 'px; top:' + ((y + margin) * scale) + 'px;"></' + tagName + '>';
					} else {
						html += '<' + tagName + ' style="position:absolute; width:' + (xW * scale) + 'px; height:' + scale + 'px; left:' + ((x + margin) * scale) + 'px; top:' + ((y + margin) * scale) + 'px; background:' + background + ';"></' + tagName + '>';
					}
				}
			}
		}
		html += + '</div>';

		if (container && typeof container.innerHTML != 'undefined') {
			container.innerHTML = html;
		}
		return html;
	};

	this.toDataURL = function () {
	};

	this.toSVG = function () {
	};

	this.toArray = function () {
		var x, y, arr = typedArray(matrix.length + (margin << 1), 0);

		for (y = 0; y < matrix.length; y++) {
			arr[y + margin] = typedArray(matrix[y].length + (margin << 1), 0);
			for (x = 0; x < matrix[y].length; x++) {
				arr[y + margin][x + margin] = matrix[y][x];
			}
		}
		return arr;
	};

	this.toString = function () {
		return this.toArray().toString();
	};
};
