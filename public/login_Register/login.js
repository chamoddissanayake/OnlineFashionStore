
function login() {
    $.ajax({
        type: 'GET',
        url: '/api/storeManger',
        dataType: 'json',

        success: function () {

            alert("Appointment Added Successfully!");
            console.log("Added");
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    });

}