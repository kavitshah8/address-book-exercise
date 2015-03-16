var sortByFirstName = function (people) {

	people.sort(function(a, b) {

    if (a.firstName < b.firstName) {
    	return -1;
    }

    if (a.firstName > b.firstName) {
    	return 1;
    }

    return 0
	});

};

var createLeftColumn = function (people) {

	$('.app-address-book .app-directory-item').remove();
	
	$('.app-directory-separator').each(function () {
		
		var seperator = $(this).html();
		var removeFlag = 1;
		
		for (var i = people.length - 1; i >= 0; i--) {

			var firstCharacter = people[i].firstName.charAt(0);
			
				if (firstCharacter === seperator) {
					var name = '<div class="app-directory-item">' + people[i].firstName + ' ' + people[i].lastName + '</div>';				
					removeFlag = 0;
					$(this).after(name);
				}
		}

		if (removeFlag) {
			$(this).remove();
		}
	});
};

var attachEventHandler = function (people) {

	$('.app-directory-item').click(function() {

		var nameStr = $(this).html();
		var nameTrim = nameStr.trim();	
		var nameArray = nameTrim.split(' ');
		var firstName = nameArray[0];

		// Find matching value of firstName in the people array  
		for (var i = 0; i < people.length; i++) {
			
			if (firstName === people[i].firstName) {

				var name = '<h2>'+ people[i].firstName + ' ' + people[i].lastName +'</h2>';
				$('.app-person-profile-header h2').replaceWith(name);
				
				var image = '<img src="images/' + people[i].image + '"' +'/>';
				$('.app-person-profile-photo img').remove();
				$('.app-person-profile-photo').append(image);

				// Create & update Right Column's Education section				
				for (var j = 0; j < people[i].education.length; j++) {

					var educationBody = '<div class="app-history-item">'
						+ '<div class="app-history-item-dates">' 
							+ people[i].education[j].startYear + '-' + people[i].education[j].endYear
						+ '</div>'
						+ '<div class="app-history-item-body">'
							+	'<div class="app-history-item-title">'
								+ people[i].education[j].institution
							+ '</div>'
							+ people[i].education[j].degree
						+ '</div>'
					+ '</div>';
				}
				$('.education .app-history-item').remove();
				$('.education .app-section-body').append(educationBody);
				
				// Create & update Right Column's Work section				
				for (var k = 0; k < people[i].workExperience.length; k++) {

					var workBody = '<div class="app-history-item">'
						+ '<div class="app-history-item-dates">' 
							+ people[i].workExperience[k].startYear
							+ '-Present'
						+ '</div>'
						+ '<div class="app-history-item-body">'
							+	'<div class="app-history-item-title">'
								+ people[i].workExperience[k].institution
							+ '</div>'
							+ people[i].workExperience[k].title
						+ '</div>'
					+ '</div>';
				}
				$('.work .app-history-item').remove();
				$('.work .app-section-body').append(workBody);
			};
		}
	});
};

// GET DATA FROM LOCAL SERVER, SORT THE DATA, CREATE DOM, ATTACH EVENT HANDLERS

$.get('//localhost:8080/api/people', function(data) {

	var parsedData = JSON.parse(data);
	sortByFirstName(parsedData.people);
	createLeftColumn(parsedData.people);
	attachEventHandler(parsedData.people);
})
.fail(function() {
	console.log('Something went wrong');
});

