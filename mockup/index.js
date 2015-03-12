$.get('//localhost:8080/api/people', function(data){

	var people = JSON.parse(data);
	console.log(people);
})
.fail(function(){
	console.log("Something went wrong");
});