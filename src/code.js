var Code = function (encodeMode, version, errorCorrection) {
	if (typeof encodeMode === 'object' && typeof version === 'undefined' && typeof errorCorrection === 'undefined') {
		errorCorrection = encodeMode.errorCorrection;
		version = encodeMode.version;
		encodeMode = encodeMode.encodeMode;
	}

	if (typeof encodeMode !== 'undefined') {
		if (!isEnumValue(this.ENCODE_MODE, encodeMode)) {
			throw new TypeError('Unsupported encodeMode.');
		}
	} else {
		encodeMode = this.ENCODE_MODE.UTF8;
	}
	try {
		Object.defineProperty(this, 'encodeMode', {
			configurable: false,
			writeable: true,
			get: function () { return encodeMode; },
			set: function (value) {
				if (isEnumValue(this.ENCODE_MODE, value)) {
					encodeMode = value;
				} else {
					throw new TypeError('Unsupported encodeMode.');
				}
			}
		});
	} catch (e) {
		this.encodeMode = encodeMode;
	}

	if (typeof version !== 'undefined') {
		if (typeof version !== 'number') {
			throw new TypeError('Invalid version type.');
		} else if (version < -40 || version > 40) {
			throw new RangeError('Invalid version value.');
		}
	} else {
		version = this.DEFAULT;
	}
	try {
		Object.defineProperty(this, 'version', {
			configurable: false,
			writeable: true,
			get: function () { return version; },
			set: function (value) {
				if (typeof value !== 'number') {
					throw new TypeError('Invalid version type.');
				} else if (value < -40 || value > 40) {
					throw new RangeError('Invalid version value.');
				} else {
					version = value;
				}
			}
		});
	} catch (e) {
		this.version = version;
	}

	if (typeof errorCorrection !== 'undefined') {
		if (!isEnumValue(this.ERROR_CORRECTION, errorCorrection)) {
			throw new TypeError('Invalid errorCorrection.');
		}
	} else {
		errorCorrection = this.ERROR_CORRECTION.M;
	}
	try {
		Object.defineProperty(this, 'errorCorrection', {
			configurable: false,
			writeable: true,
			get: function () { return errorCorrection; },
			set: function (value) {
				if (isEnumValue(this.ERROR_CORRECTION, value)) {
					errorCorrection = value;
				} else {
					throw new TypeError('Invalid errorCorrection.');
				}
			}
		});
	} catch (e) {
		this.errorCorrection = errorCorrection;
	}
};

Code.prototype.ENCODE_MODE = {
	NUMERIC: 1,				// Numeric Mode [0-9]
	ALPHA_NUMERIC: 2,		// Alphanumeric Mode [A-Z0-9 $%*+-./:]
	BYTE: 4,				// 8-bit Byte Mode (JIS X 0201)
	UTF8: 0x14,				// 8-bit Byte Mode (UTF-8)
	UTF8_SIGNATURE: 0x24,	// 8-bit Byte Mode (UTF-8 with Signature)

	// UNSUPPORTED
	STRUCTURED_APPEND: 3,	// Structured Append Mode
	FNC1_POS1: 5,			// FNC1 Mode (First Position)
	ECI: 7,					// Extended Channel Interpretation (ECI) Mode
	KANJI: 8,				// Kanji Mode (Shift JIS/JIS X 0208)
	FNC1_POS2: 9			// FNC1 Mode (Second Position)
};

Code.prototype.ERROR_CORRECTION = {
	L: 1,					// Low
	M: 0,
	Q: 3,
	H: 2					// High
};

Code.prototype.DEFAULT = 0;

// Returns the currently used version (if this.version is negative or zero, the value will differ from it)
Code.prototype.getVersion = function (input) {
	if (this.version > 0) {
		return this.version;
	} else {
		return encodeMatrix(processInput(input, this), this, true);
	}
};

// Returns the at least required version (this.version is ignored)
Code.prototype.getMinVersion = function (input) {
	var code = new Code(this.encodeMode, this.DEFAULT, this.errorCorrection);
	return encodeMatrix(processInput(input, code), code, true);
};
