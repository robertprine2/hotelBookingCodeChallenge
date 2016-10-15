$(document).ready(function(){

var locationInputCount = 0;
var locationArray = [];
var selectedIndex = -1;
var checkIn = "";
var checkOut = ""; 



locationSearch = function() {

	$('#locationSearch').on('input', function() {

		locationInputCount++;

		var query = $('#locationSearch').val();

		if (query.indexOf(" ") != -1) {
			query = query.replace(" ", "%20");
		}

		var queryURL = "https://api.teleport.org/api/cities/?search=" + query;
		
		if(locationInputCount > 2) {
			$.ajax({url: queryURL, method: 'GET'}).done(function(response){
				
				locationArray = [];
				$('#locationOptions').html('');
				var resultsArray = response._embedded["city:search-results"];

				for(i = 0; i < resultsArray.length; i++){
					locationArray.push(resultsArray[i].matching_full_name);
					$('#locationOptions').append('<li>' + resultsArray[i].matching_full_name + '</li>');
				}

				checkKeyDown(event);
	

			});
		}

	});

};
//https://api.teleport.org/api/cities/{?search}

roomsChange = function() {
	$("#roomAmount").change(function() {
		stopForLoop = parseInt($("#roomAmount").val()) + 1;
		

		for(i = 1; i < stopForLoop; i++) {
			roomId = "#room" + i;			
			console.log(roomId);
			$(roomId).removeClass('hide');
			$(roomId).addClass('show');
		}

		for(i = stopForLoop; i < 10; i++) {
			roomId = "#room" + i;
			console.log(roomId);
			$(roomId).removeClass('show');
			$(roomId).addClass('hide');
		}
	});
}; // end of roomsChange function
 
checkInValidation = function() {

	$("#checkIn").change(function() {
		
		checkIn = new Date(this.value);
		console.log(checkIn);
		var indd = checkIn.getDate()+1;
		var inmm = checkIn.getMonth()+1;
		var inyyyy = checkIn.getFullYear();

		console.log("checkIn");
		console.log(indd, inmm, inyyyy);

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();

		if (checkIn < today) {
			$("#error").html("Your check in date is in the past. Unless you have a DeLorean and flux capacitor I would suggest picking a date in the future.")
			$("#checkIn").val("");
		} // end of if checkIn earlier than today

		else if(checkOut != "" && checkIn >= checkOut) {
			
			$("#error").html("Your check in date is after or the same as your check out date. Unless you would like a negative (pun intended) stay, I would suggest picking a date before you plan on leaving.")
			$("#checkIn").val("");
			
			
		} // end of else if checkOut is before checkIn
		else {
			$("#error").html("");
		}

	});

}; // end of dateValidation function

checkOutValidation = function() {

	$("#checkOut").change(function() {

		checkOut = new Date(this.value);

		var today = new Date();

		if (checkOut < today) {
			$("#error").html("Your check out date is in the past. Unless you have a DeLorean and flux capacitor I would suggest picking a date in the future.")
			$("#checkOut").val("");
		}	

		else if(checkIn != "" && checkIn >= checkOut) {
			
			$("#error").html("Your check in date is after or the same as your check out date. Unless you would like a negative (pun intended) stay, I would suggest picking a date before you plan on leaving.")
			$("#checkOut").val("");
			
		} // end of if checkOut is before checkIn

		else {
			$("#error").html("");
		}

	});

};


locationSearch();
roomsChange(); 
checkInValidation();
checkOutValidation();

}); // end of document.ready