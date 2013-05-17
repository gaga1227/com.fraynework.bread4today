/* ------------------------------------------------------------------------------ */
/* App - utils */
/* ------------------------------------------------------------------------------ */
window.App = (function(app){
	
	//create empty App obj if none found
	var App = app || {};

	/* ------------------------------------------------------------------------------ */
	/* utils - logger */
	window.Logger = function() {
		var oldConsoleLog = null,
			pub = {};
		pub.enableLogger = function enableLogger() {
			if(oldConsoleLog == null) return;
			window['console']['log'] = oldConsoleLog;
		};
		pub.disableLogger = function disableLogger() {
			oldConsoleLog = console.log;
			window['console']['log'] = function() {};
		};
		return pub;
	}();
	
	/* ------------------------------------------------------------------------------ */
	/* utils - Platform */
	window.Platform = new function(){
		//detecting functions
		function checkPlatform(os) { return (navigator.userAgent.toLowerCase().indexOf(os.toLowerCase())>=0); }
		function checkEvent(e) { return (e in document.documentElement); }
		function IsGCFInstalled() {
			try {
				var i = new ActiveXObject('ChromeTab.ChromeFrame');
				if (i) { return true; }
			} catch(e) {
				//console.log('ChromeFrame not available, error:', e.message);
			}
			return false;
		}
		//add properties
		this.ie = checkPlatform('msie');
		this.gcf = IsGCFInstalled();
		this.iPhone = checkPlatform('iPhone');
		this.iPad = checkPlatform('iPad');
		this.iPod = checkPlatform('iPod');
		this.iOS = this.iPhone||this.iPad||this.iPod;
		this.android = checkPlatform('android');
		this.touchOS = checkEvent('ontouchstart');
		this.debugLog = function(){
			console.log('iPhone: '+this.iPhone);
			console.log('iPad: '+this.iPad);
			console.log('iPod: '+this.iPod);
			console.log('iOS: '+this.iOS);
			console.log('android: '+this.android);
			console.log('touchOS: '+this.touchOS);
		}
		//return self
		return this;
	}
	
	/* ------------------------------------------------------------------------------ */
	/* utils - alert */
	if ( !window.Platform.iOS && !window.Platform.android ) {
		window.alert = function(msg){ console.log('window.alert: '+msg); }
	}
	
	/* ------------------------------------------------------------------------------ */
	/* utils */
	App.utils = {
				
		/* ------------------------------------------------------------------------------ */
		/*addDeviceClass*/
		addDeviceClass:	function() {
			var p = Platform;
				$html = $('html:eq(0)');
			$html.removeClass('no-js').addClass('js');
			if (p.touchOS) {
				$html.addClass('touch');
			}
			else {
				$html.addClass('no-touch');
			}
			if (p.iOS) {
				$html.addClass('ios');
				if (p.iPhone) {	$html.addClass('iphone'); }
				else if (p.iPod) {	$html.addClass('ipod'); }
				else if (p.iPad) {	$html.addClass('ipad'); }
			} 
			else if (p.android) {
				$html.addClass('android');
			}
		},	
		
		/* ------------------------------------------------------------------------------ */
		/*popmsg - JQM*/	
		popmsg: function(showSwitch, customOpts, dismiss){
			
			//vars
			var opts,
				defaultOpts = 						//default jqm loader opts for reset
				{
					theme:			'a',			//skin swatch
					text:			'loading',		//string: msg
					textVisible: 	false,			//boolean: show/hide spinner
					textonly:		false,			//boolean: show/hide text msg
					html:			''				//String: replace all content
				};
			
			//update params
			if (showSwitch != 'show' ) {
				showSwitch = 'hide';
				opts = defaultOpts;
			} else {
				opts = customOpts;
			}
			
			//call jqm loader
			$.mobile.loading( showSwitch, opts );
			
			//attach dismiss behavior
			if (dismiss) {
				$('.ui-loader').one('click', function(){
					$.mobile.loading( 'hide' );	
				});
			}
			
		},
		
		/* ------------------------------------------------------------------------------ */
		/*addContact*/		
		addContact: function(dataObj) {
			
			//exit if no API
			if ( !navigator.contacts ) return false;
						
			//vars
			var contact = navigator.contacts.create( dataObj ),
				onSuccess = function(contact) {
					//alert('New contact is saved!');
					console.log('New contact is saved!');
				},
				onError = function(contactError) {
					//alert('Error saving contact: ' + contactError.code);
					console.log('Error saving new contact: ' + contactError.code);
				}
			
			//save contact
			contact.save(onSuccess, onError);
			
		},
		
		/* ------------------------------------------------------------------------------ */
		/*checkConnection*/
		checkConnection: function() {
			
			//exit if no API
			if ( !navigator.network || !navigator.network.connection ) return false;
			
			//vars
			var networkState = navigator.network.connection.type;
			
			//return state
			return networkState;
			
		},
		
		/* ------------------------------------------------------------------------------ */
		/*reloadApp*/
		reloadApp: function() {
			
			//update to main app file address without page id
			window.location = String(window.location).substr(0, String(window.location).indexOf('#'));	
		
		},
				
		/* ------------------------------------------------------------------------------ */
		/*init*/
		init: function() {
			
			//alert('app.utils.init()');
			
			//attach devices class to html
			this.addDeviceClass();
			
			//initPush
			//this.initPush();
			
			//initFile
			//this.initFile();
		}
		
	};
	
	return App;
	
})(window.App);