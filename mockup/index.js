$.get('//localhost:8080/api/people', function(data){

	var data = JSON.parse(data);
	sortByFirstName(data.people);
})
.fail(function(){
	console.log("Something went wrong");
});

var sortByFirstName = function(people){
	people.sort(function(a, b){
    if(a.firstName < b.firstName) return -1;
    if(a.firstName > b.firstName) return 1;
    return 0;
	});
};