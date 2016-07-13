'use strict';

	var flickrFeeds = {
		feed: [],
		flickrOptions: {
			url: 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&lang=en-us&tags=fmx',
			tags: ''
		}
	};

	if(head){
	  head.removeChild('script');
	}
	var script = document.createElement('script');
  script.src = flickrFeeds.flickrOptions.url;
  var head = document.head;
  head.appendChild(script);

	function jsonFlickrFeed(data){
		var count = 0;
	    flickrFeeds.feed = data.items.map(function( item ){
	    	item.count = count++;
	      return item;
	    });
	  drawFeed();
	}

function drawFeed(){
	var fplace = document.getElementById('fplace');
	flickrFeeds.feed
		.forEach(function(item, index){
			fplace.innerHTML += '\
					<article class="picture-item"> \
            <div class="image">\
              <img src="' + item.media.m + '" alt="picture">\
            </div>\
            <div class="img-text"> \
              <h5><strong>' + item.title + '</strong></h5> \
              <p><strong>Date: </strong>' + item.date_taken + '</p> \
            </div> \
          </article>';
	});
}
