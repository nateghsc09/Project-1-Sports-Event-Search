




	// ticketmaster api request
	$('#city-search').on('click', function(event){
		event.preventDefault();

		var city = $('#city-name').val().trim();
		var start =$('#start-date').val().trim();
		var end =$('#end-date').val().trim();


		$('#results-table').html("");
		$('#city-name').val('');
		var key = "Od7j5mMr30CGAReRYE4XKAfiULRQvEDW";
		var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sport&apikey="+key+"&city="+city+"&startDateTime="+start+"T01:00:00Z&endDateTime="+end+"T01:00:00Z";
		var events_container = [];
		var event = {
			name: "",
			genre: "",
			location: "",
			date: "",
			url: ""
		};

		$.ajax({
			url: queryURL,
			method: "GET",
			async:true,
	  		dataType: "json",
		})
		.done(function(response){
			console.log(response);

			for (var i = 0; i < 15; i++) {
                
				event.name = response._embedded.events[i]._embedded.attractions[0].name;
				event.genre = response._embedded.events[i].classifications[0].genre.name;
				event.location = response._embedded.events[i]._embedded.venues[0].name;
				event.date = response._embedded.events[i].dates.start.localDate+ " " +response._embedded.events[i].dates.start.localTime;
				event.url = response._embedded.events[i].url;
				events_container.push(event);
				console.log(events_container[i]);
				$('#results-table').append("<div class='row'><div class='col-xs-4'><a href='"+event.url+"'>"+event.name+"</a></div><div class='col-xs-2'>"+event.genre+"</div><div class='col-xs-3'>"+event.location+"</div><div class='col-xs-3'>"+event.date+"</div></div>");
			}

		});

	});




