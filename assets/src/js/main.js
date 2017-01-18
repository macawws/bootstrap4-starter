;(function () {

	//*** Init Configs

	//
	//
	//

	//*** Init Plug-ins

	//
	//
	//


	//*** Events After DOM Content Loaded
	document.addEventListener('DOMContentLoaded', function(e) {

		//* ScrollReveal
		var config = {
	        viewFactor : 0.15,
	        duration   : 800,
	        distance   : "0",
	        reset: true,
	        scale      : 0.5
	    };

	    window.sr = ScrollReveal( config );
		sr.reveal(".card", { scale: 0.8, duration: 1500 });

	}, false);


  	//*** Service Worker (PWA Cache)

    //* Register the service worker if available.
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function(reg) {
            console.log('Successfully registered service worker', reg);
        }).catch(function(err) {
            console.warn('Error whilst registering service worker', err);
        });
    }

    window.addEventListener('online', function(e) {
        // Resync data with server.
        console.log("You are online");
        Page.hideOfflineWarning();
        //Arrivals.loadData();
    }, false);

    window.addEventListener('offline', function(e) {
        // Queue up events for server.
        console.log("You are offline");
        Page.showOfflineWarning();
    }, false);


})();
