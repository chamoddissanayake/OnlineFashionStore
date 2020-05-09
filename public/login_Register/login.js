const BASE_URL = 'http://localhost:5000';

function login() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5000/api/storeManger',
        dataType: 'json',

        success: function(){

            alert("Appointment Added Successfully!");
            console.log("Added");
        },
        error: function(xhr, status, error) {
            alert(xhr.responseText);
        }
    });

}