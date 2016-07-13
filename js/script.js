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
	var row = document.createElement('div');
  row.className = 'row';
	flickrFeeds.feed
		.forEach(function(item, index){
			var col = document.createElement('div');
  		col.className = 'four columns';
			col.innerHTML = '\
					<article class="picture-item"> \
            <div class="image">\
              <img src="' + item.media.m + '" alt="picture">\
            </div>\
            <div class="img-text"> \
              <h5><strong>' + item.title + '</strong></h5> \
              <p><strong>Date: </strong>' + item.date_taken + '</p> \
            </div> \
          </article>';
          row.appendChild(col);
          if ((index + 1) % 3 === 0) {
          fplace.appendChild(row);
          row = document.createElement('div');
          row.className = 'row';
        } 
	});
		if(row.children.length !== 0) {
			fplace.appendChild(row);
		}
}