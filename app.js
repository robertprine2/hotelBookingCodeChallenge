$(document).ready(function(){

var locationInputCount = 0;
var locationArray = [];
var selectedIndex = 0;
var checkIn = "";
var checkOut = ""; 

checkKeyDown = function(event){

	if (event.keyCode == 40 && selectedIndex < locationArray.length - 1){

		event.preventDefault();

		$('#' + selectedIndex).removeClass('active');

		selectedIndex++;
		console.log(selectedIndex);
		$('#' + selectedIndex).addClass('active'); 

	} // end of if down arrow
	else if (event.keyCode == 38 && selectedIndex > 0) {

		event.preventDefault();

		$('#' + selectedIndex).removeClass('active');

		selectedIndex--;
		console.log(selectedIndex);
		$('#' + selectedIndex).addClass('active'); 

	} // end of else if up arrow

	else if(event.keyCode == 13) {

		event.preventDefault();

		$('#locationSearch').val($('#' + selectedIndex).data('name'));

		$('#locationOptions').html('');
	} // end of else if enter is pressed

}; // end of checkKeyDown function

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
					$('#locationOptions').append('<li class="choices" id="' + i + '" data-name="' + resultsArray[i].matching_full_name + '">' + resultsArray[i].matching_full_name + '</li>');
				}
				
				$('#' + selectedIndex).addClass('active');

				document.onkeydown = checkKeyDown;
				
				$('.choices').on('click', function() {

					$('#' + selectedIndex).removeClass('active');

					$('#locationSearch').val($(this).data('name'));

					$('#locationOptions').html('');
				});

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
			console.log($("#error"))
			console.log($("#error")[0].innerHTML)
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

}; // end of checkOutValidation

validateSubmitButton = function() {

	$('#bookingForm').change(function(){

		if($("#error")[0].innerHTML == "" && 
			$('#locationSearch').val() != "" &&
			$('#checkIn').val() != "" &&
			$('#checkOut').val() != "") {

			$("#submit").prop("disabled", false);
		}

	});

}; // end of validateSubmitButton function

locationSearch();
roomsChange(); 
checkInValidation();
checkOutValidation();
validateSubmitButton();

}); // end of document.ready