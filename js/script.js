'use strict';

var flickrFeeds = {
	feed: [],
	flickrOptions: {
		url: 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&lang=en-us&tags=fmx',	
	}
};
	
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
	fplace.innerHTML = '';
	var row = document.createElement('div');
  row.className = 'row'; 
	flickrFeeds.feed
		.sort(compare(filter))
		.forEach(function(item, index){
			var sourceSquare = (item.media.m).replace("_m.jpg", "_q.jpg");   // size suffix _q large square 150x150
			var col = document.createElement('div');
  		col.className = 'three columns';
			col.innerHTML = '\
					<a href='+ item.link + '>\
						<article class="picture-item"> \
	            <div class="image">\
	              <img src="' + sourceSquare + '" alt="picture">\
	            </div>\
	            <div class="img-text"> \
	              <h5><strong>' + trimTitle(item.title) + '</strong></h5> \
	              <p><strong>Date: </strong>' + formatDate(item.date_taken) + '</p> \
	            </div> \
	          </article>\
	        </a>';
      row.appendChild(col);
      if ((index + 1) % 4 === 0) {
      fplace.appendChild(row);
      row = document.createElement('div');
      row.className = 'row';
    } 
	});

	if(row.children.length !== 0) {
		fplace.replaceChild(row, fplace.childNodes[0][0]);
	}
}

function trimTitle(str){
	if (str.length > 12) {
		str = str.slice(0, 12) + "...";
	}
	return str;
}

function formatDate(date) {
	return new Date(date).toDateString(); 
}


var feedtags = document.getElementById('feedtags');
feedtags.addEventListener('change', function(){
	var url;

	if (!feedtags.value) {
		url = flickrFeeds.flickrOptions.url;
	}else {
		var pos = flickrFeeds.flickrOptions.url.indexOf('&tags=')
		url = flickrFeeds.flickrOptions.url.slice(0, pos) + '&tags=' + feedtags.value;
	}

	flickrFeeds.flickrOptions.url = url;
	init();
}, false);


var filter;
feedfilter.addEventListener('change', function(){
	var feedfilter = document.getElementById('feedfilter');
	filter = feedfilter.value;                                  //value equal date_taken or title
	drawFeed();
}, false);


function compare(value) {
  return function( a, b ){
      if (a[value] < b[value]) return -1;
      if (a[value] > b[value]) return 1;
      return 0;
    };
} 

function init(){
	 	var scripts = document.head.getElementsByTagName('script');
	 	if(scripts.length > 0){
        document.head.removeChild(scripts[0]);
     }
    var head = document.getElementsByTagName('head')[0];
    var addScript = document.createElement('script');
    addScript.src = flickrFeeds.flickrOptions.url;
    head.appendChild(addScript);
    drawFeed();
}

init();

