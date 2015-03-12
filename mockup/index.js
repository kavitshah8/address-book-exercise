$.get('//localhost:8080/api/people', function(data){
	console.log(data);
})
.fail(function(){
	console.log("Something went wrong");
});