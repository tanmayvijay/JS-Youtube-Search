// searchbar handler
$(function(){
	var search_field = $('#query');
	var icon = $('#search-btn');

	// focus event handler
	$(search_field).on('focus', function(){
		$(this).animate({
			width:'100%'
		}, 400);

		$(icon).animate({
			right: '10px'
		}, 400);
	});

	$(search_field).on('blur', function(){
		if(search_field.val() == ''){
			$(search_field).animate({
				width:'45%'
			}, 400, function(){});

			$(icon).animate({
				right: '360px'
			}, 400, function(){});
		}
	});

	$('#search-form').submit(function(e){
		e.preventDefault();
	});
})


function search(){
	//clear results
	$('#results').html('');
	$('#buttons').html('');

	// get form input
	q = $('#query').val();

	$.get(
		"https://www.googleapis.com/youtube/v3/search",
		{
			part: 'snippet, id',
			q: q,
			type: 'video',
			key: 'AIzaSyDBr0reDI5F0k8MgFcUAjJjMrnp-1K7KOA'		
		},
		function(data){
			var next_page_token = data.nextPageToken;
			var prev_page_token = data.prevPageToken;

			$.each(data.items, function(i, item){
				var output = get_output(item);

				$('#results').append(output);
			});

			var buttons = get_buttons(prev_page_token, next_page_token);

			$('#buttons').append(buttons);
		}
	);
}


function get_output(item){
	var video_id = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channel_title = item.snippet.channelTitle;
	var video_date = item.snippet.publishedAt;


	var output = '<li>' +
	'<div class="list-right">' +
	'<img src="' + thumb + '">' +
	'</div>' +
	'<div class="list-right">' +
	'<h3>' + title + '</h3>' +
	'<small> By <span class="channel_title">' + channel_title + '</span> on ' + video_date + '</small>' +
	'<p>' + description + '</p>' +
	'</div>' +
	'</li>' +
	'<div class="clearfix"></div>' +
	'';

	return output;
}



function next_page(){
	var token = $('#next-button').data('token');
	var q = $('#next-button').data('query')

	//clear results
	$('#results').html('');
	$('#buttons').html('');

	// get form input
	q = $('#query').val();

	$.get(
		"https://www.googleapis.com/youtube/v3/search",
		{
			part: 'snippet, id',
			q: q,
			pageToken: token,
			type: 'video',
			key: 'AIzaSyDBr0reDI5F0k8MgFcUAjJjMrnp-1K7KOA'		
		},

		function(data){
			var next_page_token = data.nextPageToken;
			var prev_page_token = data.prevPageToken;

			$.each(data.items, function(i, item){
				var output = get_output(item);

				$('#results').append(output);
			});

			var buttons = get_buttons(prev_page_token, next_page_token);

			$('#buttons').append(buttons);
		}
	);

}



function prev_page(){
	var token = $('#prev-button').data('token');
	var q = $('#prev-button').data('query')

	//clear results
	$('#results').html('');
	$('#buttons').html('');

	// get form input
	q = $('#query').val();

	$.get(
		"https://www.googleapis.com/youtube/v3/search",
		{
			part: 'snippet, id',
			q: q,
			pageToken: token,
			type: 'video',
			key: '# # - - replace with your API key - - # #'		
		},

		function(data){
			var next_page_token = data.nextPageToken;
			var prev_page_token = data.prevPageToken;

			$.each(data.items, function(i, item){
				var output = get_output(item);

				$('#results').append(output);
			});

			var buttons = get_buttons(prev_page_token, next_page_token);

			$('#buttons').append(buttons);
		}
	);

}





function get_buttons(prev_page_token, next_page_token){
	if(!prev_page_token){
		var btnoutput = '<div class="button-container">' +
		'<button id="next-button" class="paging-button" data-token="' + next_page_token + '" data-query="' + q + '" ' +
		'onclick="next_page();"> Next Page</button></div>';
	}
	else{
		var btnoutput = '<div class="button-container">' +
		'<button id="prev-button" class="paging-button" data-token="' + prev_page_token + '" data-query="' + q + '" ' +
		'onclick="prev_page();"> Prev Page</button>' +
		'<button id="next-button" class="paging-button" data-token="' + next_page_token + '" data-query="' + q + '" ' +
		'onclick="next_page();"> Next Page</button></div>';
	}

	return btnoutput;
}