var ___JSQR___ = 'JSQR';

// ************************************************************************
// **** JSQR Interface ****************************************************
// ************************************************************************

window[___JSQR___] = function () { };

window[___JSQR___].prototype.encode = function (input, code) {
	return new window[___JSQR___].prototype.Matrix(input, code);
};

// ************************************************************************
// **** Input Sub Class ***************************************************
// ************************************************************************

window[___JSQR___].prototype.Input = Input;
window[___JSQR___].prototype.DATA_TYPE = window[___JSQR___].prototype.Input.prototype.DATA_TYPE;

// ************************************************************************
// **** Code Sub Class ****************************************************
// ************************************************************************

window[___JSQR___].prototype.Code = Code;
window[___JSQR___].prototype.ENCODE_MODE = window[___JSQR___].prototype.Code.prototype.ENCODE_MODE;
window[___JSQR___].prototype.ERROR_CORRECTION = window[___JSQR___].prototype.Code.prototype.ERROR_CORRECTION;
window[___JSQR___].prototype.DEFAULT = window[___JSQR___].prototype.Code.prototype.DEFAULT;

// ************************************************************************
// **** Matrix Sub Class **************************************************
// ************************************************************************

window[___JSQR___].prototype.Matrix = Matrix;
