var sortByFirstName = function(people){

	people.sort(function(a, b){

    if(a.firstName < b.firstName){
			return -1;
    }

    if(a.firstName > b.firstName){
			return 1;
    }

    return 0;

	});

};

var createDOM = function (people){

	for(var i = 0; i < people.length; i++){

		$('.app-directory').append('<div class="app-directory-item">' + people[i].firstName + ' ' + people[i].lastName + '</div>');
	}
};

// GET DATA FROM LOCAL SERVER, SORT THE DATA, CREATE DOM

$.get('//localhost:8080/api/people', function(data){

	var parsedData = JSON.parse(data);
	sortByFirstName(parsedData.people);
	createDOM(parsedData.people);
})
.fail(function(){
	console.log('Something went wrong');
});

