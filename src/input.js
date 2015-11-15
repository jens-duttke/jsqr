var Input = function (dataType, data) {
	if (typeof dataType !== 'undefined') {
		if (!isEnumValue(this.DATA_TYPE, dataType)) {
			throw new TypeError('Unsupported dataType');
		}
	} else {
		dataType = this.DATA_TYPE.DEFAULT;
	}
	try {
		Object.defineProperty(this, 'dataType', {
			configurable: false,
			writeable: true,
			get: function () { return dataType; },
			set: function (value) {
				if (isEnumValue(this.DATA_TYPE, value)) {
					dataType = value;
				} else {
					throw new TypeError('Unsupported dataType');
				}
			}
		});
	} catch (e) {
		this.dataType = dataType;
	}

	if (typeof(data) === 'object') {
		this.data = copyObject(data);
	} else {
		this.data = data;
	}
};

Input.prototype.DATA_TYPE = {
	DEFAULT: 0,
	TEXT: 0,						// Free Formatted Text
	URL: 1,							// Browse to a Website
	BOOKMARK: 2,					// Bookmark a Website
	CALL: 3,						// Make a Phone Call
	SMS: 4,							// Send an SMS
	EMAIL: 5,						// Send an E-Mail
	VCARD: 6,						// Create a vCard
	MECARD: 7,						// Create a meCard
	VEVENT: 8,						// Create a vCalendar Event
	GOOGLE_MAPS: 9,					// Googlem Maps
	BING_MAPS: 10,					// Bing Maps
	GEO: 11,						// Geographical Coordinates
	ITUNES: 12,						// iTunes App URL
	ITUNES_REVIEW: 13,				// iTunes App Review URL
	ANDROID_MARKET: 14,				// Android Market Search
	FACEBOOK_USER_PROFILE: 15,		// Facebook User Profile
	FOURSQUARE: 16,					// Foursquare Venue URL
	TWEET_FETCH: 17,				// Encode Latest Tweet of a User
	TWEET: 18,						// Tweet on Twitter
	BLACKBERRY_MESSENGER_USER: 19,	// Create Blackberry Messenger User
	ANDROID_WIFI: 20,				// WIFI Network for Android
	WIKIPEDIA: 21,					// Wikipedia Article URL
	YOUTUBE_USER: 22,				// Youtube User Videos
	YOUTUBE_VIDEO: 23,				// Youtube Video URL for iPhone
	BITCOIN: 24						// Bitcoin
};

Input.prototype.toString = function () {
	var	_this = this,
		str, tmp, replaceObj;

	switch (this.dataType) {
		case this.DATA_TYPE.DEFAULT:
		case this.DATA_TYPE.TEXT:
			validateType('data', 'string', 'number', 'object');
			if (typeof this.data === 'object') {
				validateType('data.text', 'string', 'number');
				validateRequired('data.text');
				return dataStr('text');
			} else { // string or number
				validateRequired('data');
				return dataStr();
			}

		case this.DATA_TYPE.URL:
			validateType('data', 'string', 'object');
			if (typeof this.data === 'object') {
				validateType('data.url', 'string');
				validateRequired('data.url');
				return (/^[a-zA-Z]+:\/\//.test(dataStr('url')) ? '' : 'http://') + dataStr('url');
			} else { // string
				validateRequired('data');
				return (/^[a-zA-Z]+:\/\//.test(dataStr()) ? '' : 'http://') + dataStr();
			}

		case this.DATA_TYPE.BOOKMARK:
			// https://www.nttdocomo.co.jp/english/service/developer/make/content/barcode/function/application/bookmark/
			validateType('data', 'object');
			validateType('data.title', 'string', 'number');
			validateType('data.url', 'string');
			validateRequired('data.title', 'data.url');

			return 'MEBKM:TITLE:' + dataStr('title') + ';URL:' + (/^[a-zA-Z]+:\/\//.test(dataStr('url')) ? '' : 'http://') + dataStr('url');

		case this.DATA_TYPE.CALL:
			validateType('data', 'string', 'number', 'object');
			if (typeof this.data === 'object') {
				validateType('data.phoneNumber', 'string', 'number');
				validateRequired('data.phoneNumber');
				return 'TEL:' + dataStr('phoneNumber');
			} else { // string or number
				validateRequired('data');
				return 'TEL:' + dataStr();
			}

		case this.DATA_TYPE.SMS:
			validateType('data', 'object');
			validateType('data.phoneNumber', 'string', 'number');
			validateType('data.message', 'string', 'number');
			validateRequired('data.phoneNumber');

			return 'SMSTO:' + dataStr('phoneNumber') + ':' + dataStr('message');

		case this.DATA_TYPE.EMAIL:
			// MATMSG: http://www.nttdocomo.co.jp/english/service/imode/make/content/barcode/function/application/mail/
			validateType('data', 'object');
			validateType('data.recipient', 'string');
			validateType('data.subject', 'string');
			validateType('data.body', 'string');
			validateRequired('data.recipient');

			// return 'MATMSG:TO:' + dataStr('recipient') + ';SUB:' + dataStr('subject') + ';BODY:' + dataStr('body');
			return 'SMTP:' + dataStr('recipient').replace(':', '') + ':' + dataStr('subject').replace(/:/g, '\\:') + ':' + dataStr('body');

		case this.DATA_TYPE.VCARD:
			// http://tools.ietf.org/html/rfc2426
			validateType('data', 'object');
			validateType('data.version', 'string', 'number');
			validateType('data.type', 'string');
			validateType('data.firstName', 'string', 'number');
			validateType('data.middleName', 'string', 'number');
			validateType('data.lastName', 'string', 'number');
			validateType('data.organization', 'string', 'number');
			validateType('data.title', 'string', 'number');
			validateType('data.mobilePhone', 'string', 'number');
			validateType('data.work', 'object');
			validateType('data.work.street', 'string', 'number');
			validateType('data.work.city', 'string');
			validateType('data.work.zip', 'string', 'number');
			validateType('data.work.state', 'string');
			validateType('data.work.country', 'string');
			validateType('data.work.phone', 'string', 'number');
			validateType('data.work.fax', 'string', 'number');
			validateType('data.work.eMail', 'string');
			validateType('data.work.url', 'string');
			validateType('data.home', 'object');
			validateType('data.home.street', 'string', 'number');
			validateType('data.home.city', 'string', 'number');
			validateType('data.home.zip', 'string', 'number');
			validateType('data.home.state', 'string', 'number');
			validateType('data.home.country', 'string');
			validateType('data.home.phone', 'string', 'number');
			validateType('data.home.eMail', 'string');
			validateType('data.home.url', 'string');
			validateType('data.birthday', Date, null);
			validateRequired('data.version', 'data.type');

			replaceObj = {
				'\\':'\\\\',
				';':'\\;',
				',':'\\,',
				'\n':'\\n'
			};

			str = [];

			switch (parseFloat(dataStr('version'))) {
				case 2.1:
					str[0] = '2.1';
					break;
				case 3:
					str[0] = '3.0';
					break;
				default:
					throw new Error('Unsupported VCARD.version (' + dataStr('version') + ')');
			}

			switch (dataStr('type').toLowerCase()) {
				case 'person':
					str[1] = (dataStr('firstName').length > 0 || dataStr('middleName').length > 0 || dataStr('lastName').length > 0 ? 'FN:' + (translateChars(dataStr('firstName'), replaceObj) + ' ' + translateChars(dataStr('middleName'), replaceObj) + ' ' + translateChars(dataStr('lastName'), replaceObj)).replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '') + '\n' : '') +
						(dataStr('organization').length > 0 ? 'ORG:' + translateChars(dataStr('organization'), replaceObj) + '\n' : '');
					break;
				case 'company':
					str[1] = (dataStr('organization').length > 0 ? 'ORG:' + translateChars(dataStr('organization'), replaceObj) + '\n' : '') +
						(dataStr('organization').length > 0 ? 'FN:' + translateChars(dataStr('organization'), replaceObj) + '\n' : '') +
						'X-ABShowAs:COMPANY\n';
					break;
				default:
					throw new Error('Unsupported VCARD.type (' + dataStr('type') + ')');
			}

			return 'BEGIN:VCARD\n' +
				'VERSION:' + str[0] + '\n' +
				(dataStr('lastName').length > 0 || dataStr('firstName').length > 0 || dataStr('middleName').length > 0 ? 'N:' + translateChars(dataStr('lastName'), replaceObj) + ';' + translateChars(dataStr('firstName'), replaceObj) + ';' + translateChars(dataStr('middleName'), replaceObj) + ';;\n' : '') +
				str[1] +
				(dataStr('title').length > 0 ? 'TITLE:' + translateChars(dataStr('title'), replaceObj) + '\n' : '') +
				(data('work') && dataStr('work.eMail').length > 0 ? 'EMAIL;' + (str[0] === '3.0' ? 'type=INTERNET;type=' : 'INTERNET;') + 'WORK:' + translateChars(dataStr('work.eMail'), replaceObj) + '\n' : '') +
				(data('home') && dataStr('home.eMail').length > 0 ? 'EMAIL;' + (str[0] === '3.0' ? 'type=INTERNET;type=' : 'INTERNET;') + 'HOME:' + translateChars(dataStr('home.eMail'), replaceObj) + '\n' : '') +
				(dataStr('mobilePhone').length > 0 ? 'TEL;' + (str[0] === '3.0' ? 'type=' : '') + 'CELL:' + translateChars(dataStr('mobilePhone'), replaceObj) + '\n' : '') +
				(data('work') && dataStr('work.phone').length > 0 ? 'TEL;' + (str[0] === '3.0' ? 'type=' : '') + 'WORK:' + translateChars(dataStr('work.phone'), replaceObj) + '\n' : '') +
				(data('home') && dataStr('home.phone').length > 0 ? 'TEL;' + (str[0] === '3.0' ? 'type=' : '') + 'HOME:' + translateChars(dataStr('home.phone'), replaceObj) + '\n' : '') +
				(data('work') && dataStr('work.fax').length > 0 ? 'TEL;' + (str[0] === '3.0' ? 'type=WORK,' : 'WORK;') + 'FAX:' + translateChars(dataStr('work.fax'), replaceObj) + '\n' : '') +
				(data('work') && (dataStr('work.street').length > 0 || dataStr('work.city').length > 0 || dataStr('work.state').length > 0 || dataStr('work.zip').length > 0 || dataStr('work.country').length > 0) ? 'ADR;' + (str[0] === '3.0' ? 'type=' : '') + 'WORK:;;' + translateChars(dataStr('work.street'), replaceObj) + ';' + translateChars(dataStr('work.city'), replaceObj) + ';' + translateChars(dataStr('work.state'), replaceObj) + ';' + translateChars(dataStr('work.zip'), replaceObj) + ';' + translateChars(dataStr('work.country'), replaceObj) + '\n' : '') +
				(data('home') && (dataStr('home.street').length > 0 || dataStr('home.city').length > 0 || dataStr('home.state').length > 0 || dataStr('home.zip').length > 0 || dataStr('home.country').length > 0) ? 'ADR;' + (str[0] === '3.0' ? 'type=' : '') + 'HOME:;;' + translateChars(dataStr('home.street'), replaceObj) + ';' + translateChars(dataStr('home.city'), replaceObj) + ';' + translateChars(dataStr('home.state'), replaceObj) + ';' + translateChars(dataStr('home.zip'), replaceObj) + ';' + translateChars(dataStr('home.country'), replaceObj) + '\n' : '') +
				(data('birthday') && data('birthday') !== null ? 'BDAY;value=date:' + data('birthday').getFullYear() + ('0' + (data('birthday').getMonth() + 1)).substr(-2) + ('0' + data('birthday').getDate()).substr(-2) + ';' : '') +
				(data('work') && dataStr('work.url').length > 0 ? 'URL;' + (str[0] === '3.0' ? 'type=' : '') + 'WORK:' + translateChars(dataStr('work.url'), replaceObj) + '\n' : '') +
				(data('home') && dataStr('home.url').length > 0 ? 'URL;' + (str[0] === '3.0' ? 'type=' : '') + 'HOME:' + translateChars(dataStr('home.url'), replaceObj) + '\n' : '') +
				'END:VCARD';

		case this.DATA_TYPE.MECARD:
			// http://www.nttdocomo.co.jp/english/service/imode/make/content/barcode/function/application/addressbook/index.html
			// http://www.nttdocomo.co.jp/english/service/imode/make/content/barcode/function/application/common/
			validateType('data', 'object');
			validateType('data.firstName', 'string', 'number');
			validateType('data.lastName', 'string', 'number');
			validateType('data.eMail', 'string');
			validateType('data.phoneNumber', 'string', 'number');
			validateType('data.videoCall', 'string', 'number');
			validateType('data.birthday', Date, null);
			validateType('data.poBox', 'string', 'number');
			validateType('data.room', 'string', 'number');
			validateType('data.street', 'string', 'number');
			validateType('data.city', 'string');
			validateType('data.state', 'string');
			validateType('data.zip', 'string', 'number');
			validateType('data.country', 'string');
			validateType('data.url', 'string', 'number');
			validateType('data.memo', 'string', 'number');

			replaceObj = {
				'\\':'\\\\',
				':':'\\:',
				';':'\\;',
				',':'\\,'
			};

			return 'MECARD:' +
				(dataStr('lastName').length > 0 || dataStr('firstName') > 0 ? 'N:' + translateChars(dataStr('lastName'), replaceObj) + (dataStr('firstName').length > 0 ? ',' + translateChars(dataStr('firstName'), replaceObj) : '') + ';' : '') +
				(dataStr('phoneNumber').length > 0 ? 'TEL:' + translateChars(dataStr('phoneNumber'), replaceObj) + ';' : '') +
				(dataStr('videoCall').length > 0 ? 'TEL-AV:' + translateChars(dataStr('videoCall'), replaceObj) + ';' : '') +
				(dataStr('eMail').length > 0 ? 'EMAIL:' + translateChars(dataStr('eMail'), replaceObj) + ';' : '') +
				(dataStr('url').length > 0 ? 'URL:' + translateChars(dataStr('url'), replaceObj) + ';' : '') +
				(dataStr('memo').length > 0 ? 'NOTE:' + translateChars(dataStr('memo'), replaceObj) + ';' : '') +
				(data('birthday') && data('birthday') !== null ? 'BDAY:' + data('birthday').getFullYear() + ('0' + (data('birthday').getMonth() + 1)).substr(-2) + ('0' + data('birthday').getDate()).substr(-2) + ';' : '') +
				(dataStr('street').length > 0 ? 'ADR:' + translateChars(dataStr('poBox'), replaceObj) + ',' + translateChars(dataStr('room'), replaceObj) + ',' + translateChars(dataStr('street'), replaceObj) + ',' + translateChars(dataStr('city'), replaceObj) + ',' + translateChars(dataStr('state'), replaceObj) + ',' + translateChars(dataStr('zip'), replaceObj) + ',' + translateChars(dataStr('country'), replaceObj) + ';' : '') +
				';';

		case this.DATA_TYPE.VEVENT:
			// http://tools.ietf.org/html/rfc5545
			validateType('data', 'object');
			validateType('data.format', 'string');
			validateType('data.summary', 'string', 'number');
			validateType('data.description', 'string', 'number');
			validateType('data.locationName', 'string', 'number');
			validateType('data.fullDay', 'boolean');
			validateType('data.startDate', Date);
			validateType('data.endDate', Date);
			validateRequired('data.format', 'data.summary', 'data.fullDay', 'data.startDate', 'data.endDate');

			if (Date.parse(dataStr('startDate')) > Date.parse(dataStr('endDate'))) {
				throw new RangeError('VEVENT.startDate must be older than VEVENT.endDate');
			}

			replaceObj = {
				'\\':'\\\\',
				';':'\\;',
				',':'\\,',
				'\n':'\\n'
			};

			str = 'BEGIN:VEVENT\n' +
				'SUMMARY:' + translateChars(dataStr('summary'), replaceObj) + '\n' +
				(dataStr('description').length > 0 ? 'DESCRIPTION:' + translateChars(dataStr('description'), replaceObj) + '\n' : '') +
				(dataStr('locationName').length > 0 ? 'LOCATION:' + translateChars(dataStr('locationName'), replaceObj) + '\n' : '') +
				'DTSTART:' + data('startDate').getFullYear() + ('0' + (data('startDate').getMonth() + 1)).substr(-2) + ('0' + data('startDate').getDate()).substr(-2) + (!data('fullDay') ? 'T' + ('0' + data('startDate').getHours()).substr(-2) + ('0' + data('startDate').getMinutes()).substr(-2) + ('0' + data('startDate').getSeconds()).substr(-2) : '') + '\n' +
				'DTEND:' + data('endDate').getFullYear() + ('0' + (data('endDate').getMonth() + 1)).substr(-2) + ('0' + data('endDate').getDate()).substr(-2) + (!data('fullDay') ? 'T' + ('0' + data('endDate').getHours()).substr(-2) + ('0' + data('endDate').getMinutes()).substr(-2) + ('0' + data('endDate').getSeconds()).substr(-2) : '') + '\n' +
				'END:VEVENT';

			switch (dataStr('format').toLowerCase()) {
				case 'icalendar':	// iCalendar
					return 'BEGIN:VCALENDAR\n' +
						'VERSION:2.0\n' +
						str + '\n' +
						'END:VCALENDAR';
				case 'zxing':	// ZXing
					return str;
				default:
					throw new Error('Unsupported VEVENT.format (' + dataStr('format') + ')');
			}

		case this.DATA_TYPE.GOOGLE_MAPS:
			validateType('data', 'object');
			validateType('data.locationName', 'string');
			validateType('data.longitude', 'string', 'number');
			validateType('data.latitude', 'string', 'number');
			validateRequired('data.longitude', 'data.latitude');

			return 'http://maps.google.com/maps?f=q&q=' + dataStr('latitude') + '%2C' + dataStr('longitude') + '+%28' + encodeURIComponent(dataStr('locationName')) + '%29';

		case this.DATA_TYPE.BING_MAPS:
			validateType('data', 'object');
			validateType('data.longitude', 'string', 'number');
			validateType('data.latitude', 'string', 'number');
			validateRequired('data.longitude', 'data.latitude');

			return 'http://www.bing.com/maps/?v=2&cp=' + dataStr('latitude') + '~' + dataStr('longitude') + '&lvl=16&dir=0&sty=r';

		case this.DATA_TYPE.GEO:
			validateType('data', 'object');
			validateType('data.longitude', 'string', 'number');
			validateType('data.latitude', 'string', 'number');
			validateRequired('data.longitude', 'data.latitude');

			return 'GEO:' + dataStr('latitude') + ',' + dataStr('longitude');

		case this.DATA_TYPE.ITUNES:
			validateType('data', 'string', 'number', 'object');
			if (typeof this.data === 'object') {
				validateType('data.appId', 'string', 'number');
				validateRequired('data.appId');
				str = dataStr('appId');
			} else { // string or number
				validateRequired('data');
				str = dataStr();
			}

			if (!/\d+$/.test(str)) {
				throw new Error('Invalid ITUNES.appId. The id must be numeric');
			}
			return 'http://itunes.apple.com/app/id' + /\d+$/.exec(str)[0];

		case this.DATA_TYPE.ITUNES_REVIEW:
			validateType('data', 'string', 'number', 'object');
			if (typeof this.data === 'object') {
				validateType('data.appId', 'string', 'number');
				validateRequired('data.appId');
				str = dataStr('appId');
			} else { // string or number
				validateRequired('data');
				str = dataStr();
			}

			if (!/\d+$/.test(str)) {
				throw new Error('Invalid ITUNES.appId. The id must be numeric');
			}
			return 'itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=' + /\d+$/.exec(str)[0];

		case this.DATA_TYPE.ANDROID_MARKET:
			// http://developer.android.com/guide/publishing/publishing.html

			validateType('data', 'object');
			validateType('data.searchType', 'string');
			validateType('data.linkType', 'string');
			validateType('data.search', 'string', 'number');
			validateRequired('data.searchType', 'data.linkType', 'data.search');

			switch (dataStr('linkType').toLowerCase()) {
				case 'market':
					str = 'market://';
					break;
				case 'website':
					str = 'http://market.android.com/';
					break;
				default:
					throw new Error('Unsupported ANDROID_MARKET.linkType (' + dataStr('linkType') + ')');
			}

			switch (dataStr('searchType').toLowerCase()) {
				case 'raw':
					return str + 'search?q=' + encodeURIComponent(dataStr('search'));
				case 'package':
					return str + 'search?q=pname%3A' + encodeURIComponent(dataStr('search'));
				case 'publisher':
					return str + 'search?q=pub%3A' + encodeURIComponent(dataStr('search'));
				case 'details':
					return str + 'details?id=' + encodeURIComponent(dataStr('search'));
				default:
					throw new Error('Unsupported ANDROID_MARKET.searchType (' + dataStr('searchType') + ')');
			}

		case this.DATA_TYPE.FACEBOOK_USER_PROFILE:
			validateType('data', 'string', 'number', 'object');
			if (typeof this.data === 'object') {
				validateType('data.profileId', 'string', 'number');
				validateRequired('data.profileId');
				str = dataStr('profileId');
			} else { // string or number
				validateRequired('data');
				str = dataStr();
			}

			if (/^\d{15}$/.test(str)){
				return 'fb://profile/' + str;
			} else if (/(\/profile\/|(\?|&)id=)(\d{15})(%26|&|$)/.test(str)) {
				return 'fb://profile/' + /(\/profile\/|(\?|&)id=)(\d{15})(%26|&|$)/.exec(str)[3];
			}
			throw new Error('Invalid FACEBOOK_USER_PROFILE.profileId. The id must be numeric, 15 characters in length');

		case this.DATA_TYPE.FOURSQUARE:
			// https://developer.foursquare.com/docs/
			validateType('data', 'string', 'object');
			if (typeof this.data === 'object') {
				validateType('data.venueId', 'string');
				validateRequired('data.venueId');
				str = dataStr('venueId');
			} else { // string
				validateRequired('data');
				str = dataStr();
			}
			if (!/[a-z\d]+$/i.test(str)) {
				throw new Error('Invalid FOURSQUARE.venueId. The id must be alphanumeric');
			}
			return 'http://foursquare.com/venue/' + /[a-z\d]+$/i.exec(str)[0];

		case this.DATA_TYPE.WIKIPEDIA:
			validateType('data', 'string', 'number', 'object');
			if (typeof this.data === 'object') {
				validateType('data.url', 'string', 'number');
				validateRequired('data.url');
				str = dataStr('url');
			} else { // string or number
				validateRequired('data');
				str = dataStr();
			}

			replaceObj = {
				' ':'_'
			};

			tmp = /\/\/([a-z\-]*)\.?wikipedia.org\/wiki\/(.*)/i.exec(str);
			if (tmp === null || tmp.length !== 3) {
				return 'http://qrwp.org/' + translateChars(str, replaceObj);
			} else {
				return 'http://' + (tmp[1].length > 0 ? tmp[1] + '.' : '') + 'qrwp.org/' + translateChars(tmp[2], replaceObj);
			}

		case this.DATA_TYPE.YOUTUBE_USER:
			validateType('data', 'string', 'number', 'object');
			if (typeof this.data === 'object') {
				validateType('data.userName', 'string', 'number');
				validateRequired('data.userName');
				str = dataStr('userName');
			} else { // string or number
				validateRequired('data');
				str = dataStr();
			}

			return 'http://youtube.com/user/' + str;

		case this.DATA_TYPE.YOUTUBE_VIDEO:
			validateType('data', 'string', 'number', 'object');
			if (typeof this.data === 'object') {
				validateType('data.videoId', 'string', 'number');
				validateRequired('data.videoId');
				str = dataStr('videoId');
			} else { // string or number
				validateRequired('data');
				str = dataStr();
			}

			if (/^[-_A-Za-z\d]+$/.test(str)){
				return 'youtube://' + str;
			} else if (/(^youtube:\/\/|youtu.be\/|(\?|&)v=|\/v\/)([-_A-Za-z\d]+)(%26|&|$)/.test(str)) {
				return 'youtube://' + /(^youtube:\/\/|youtu.be\/|(\?|&)v=|\/v\/)([-_A-Za-z\d]+)(%26|&|$)/.exec(str)[3];
			}
			throw new Error('Invalid YOUTUBE_VIDEO.videoId. The id must be alphanumeric');

		case this.DATA_TYPE.TWEET_FETCH:
			throw new Error('DATA_TYPE.TWEET_FETCH is currently unsupported');

		case this.DATA_TYPE.TWEET:
			validateType('data', 'string', 'number', 'object');
			if (typeof this.data === 'object') {
				validateType('data.text', 'string', 'number');
				validateRequired('data.text');
				return 'http://twitter.com/home?status=' + encodeURIComponent(dataStr('text'));
			} else { // string or number
				validateRequired('data');
				return 'http://twitter.com/home?status=' + encodeURIComponent(dataStr());
			}

		case this.DATA_TYPE.BLACKBERRY_MESSENGER_USER:
			validateType('data', 'object');
			validateType('data.firstName', 'string');
			validateType('data.lastName', 'string');
			validateType('data.bbmPin', 'string');
			validateRequired('data.bbmPin');

			if (!/^[a-z\d]{8}$/i.test(dataStr('bbmPin'))) {
				throw new Error('Invalid BLACKBERRY_MESSENGER_USER.bbmPin. The pin must be alphanumeric, eight characters in length');
			}
			return 'bbm:' + dataStr('bbmPin') + '00000000' + dataStr('firstName') + ' ' + dataStr('lastName');

		case this.DATA_TYPE.ANDROID_WIFI:
			validateType('data', 'object');
			validateType('data.ssid', 'string');
			validateType('data.password', 'string', 'number');
			validateType('data.networkType', 'string');
			validateRequired('data.ssid', 'data.networkType');

			return 'WIFI:S:' + dataStr('ssid') +
				';T:' + dataStr('networkType') +
				(dataStr('password').length > 0 ? ';P:' + dataStr('password') : '') +
				';;';

		case this.DATA_TYPE.BITCOIN:
			validateType('data', 'string', 'object');
			if (typeof this.data === 'object') {
				validateType('data.hash', 'string');
				validateRequired('data.hash');
				str = dataStr('hash');
			} else { // string
				validateRequired('data');
				str = dataStr();
			}
			if (!/^(bitcoin:)?[a-z\d]+$/i.test(str)) {
				throw new Error('Invalid BITCOIN.hash. The hash must be alphanumeric');
			}
			return (/^bitcoin:/.test(str) ? '' : 'bitcoin:') + str;

		default:
			throw new TypeError('Unsupported dataType');
	}

	function data (propsPath) {
		var prop = _this.data;

		if (typeof propsPath === 'string') {
			var	props = propsPath.split('.'), i;

			for (i = 0; i < props.length; i++) {
				prop = prop[props[i]];
			}
		}
		return prop;
	}

	function dataStr (propsPath) {
		var dat = data(propsPath);
		return (typeof dat === 'undefined' ? '' : dat.toString());
	}

	function translateChars (str, replaceObj) {
		for (var r in replaceObj) {
			if (replaceObj.hasOwnProperty(r)) {
				str = str.replace(r, replaceObj[r], 'g');
			}
		}
		return str;
	}

	function validateType () {
		var	props = arguments[0].split('.'),
			prop = _this, i;

		for (i = 0; i < props.length; i++) {
			prop = prop[props[i]];
		}
		for (i = 1; i < arguments.length; i++) {
			if ((typeof prop === 'object' && typeof arguments[i] === 'function' && prop !== null && prop.constructor === arguments[i]) || (prop === null && arguments[i] === null) || (typeof prop === arguments[i])) {
				return true;
			}
			if (typeof arguments[i] === 'function') {
				arguments[i] = arguments[i].name;
			}
		}
		if (typeof prop === 'undefined') {
			throw new TypeError(arguments[0] + ' is undefined');
		} else {
			throw new TypeError('Unexcepted type (' + typeof prop + ') of ' + arguments[0] + ' (' + [].slice.call(arguments, 1).join('|') + ')');
		}
	}

	// Throws an error if a property is a string, but contains no characters.
	function validateRequired () {
		var props, prop, i, j;

		for (i = 0; i < arguments.length; i++) {
			props = arguments[i].split('.');
			prop = _this;

			for (j = 0; j < props.length; j++) {
				prop = prop[props[j]];
			}

			if (typeof prop === 'string' && prop.length === 0) {
				throw new Error(arguments[i] + ' cannot be empty');
			}
		}
	}
};
