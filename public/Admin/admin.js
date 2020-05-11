var appMain = angular.module('admin', ["ngRoute"]);

appMain.controller('adminCtrl', function($scope , $interval , $http ) {
    $scope.clz1 = "nav-link active";
    $scope.clz2 = "nav-link ";
    $scope.clz3 = "nav-link ";
    $scope.pageIndex = 0;
    $scope.tableclz = "";
    $scope.alert = "hide";
    $scope.alertBox = "hide";

    $scope.selection = {}

    $scope.storeMAnagerDetails = {}

    $scope.categoryObjArray = [];

    $scope.changeIndex= function(indexToChange){
        if(indexToChange == 0) {
            $scope.clz1 = "nav-link active"
            $scope.clz2 = "nav-link "
            $scope.clz3 = "nav-link "
        }
        if(indexToChange == 1) {
            $scope.clz1 = "nav-link "
            $scope.clz2 = "nav-link active"
            $scope.clz3 = "nav-link "
        }
        if(indexToChange == 2) {
            $scope.clz1 = "nav-link "
            $scope.clz2 = "nav-link "
            $scope.clz3 = "nav-link active"
        }
        $scope.pageIndex = indexToChange;
    }


    var tick = function() {
        $scope.clock = Date.now();
    }
    tick();
    $interval(tick, 1000);


    var date = new Date();
    var TodaydateArray = [];

    TodaydateArray =  date.toString().split(' ');
    $scope.displayTodayDate = "     " + TodaydateArray[1] + "/" + TodaydateArray[2] + "/" + TodaydateArray[3] + "\t" + "\t";



    $scope.Email = function () {

        http.sendEmail()
    }


    //Get all Data from Category collection
    var getDetailsofCategory = function(){
        $scope.tableclz = "table hide";
        $scope.alert = "hide";
        $scope.alertBox = "show";
        $http.get('/category')
            .then(function (response) {
                console.log(response);
                $scope.categoryObjArray = response.data;


            })
            .finally(function () {
                $scope.alertBox = "hide";
                if($scope.categoryObjArray.length == 0 ){
                    $scope.alert = "show";
                    $scope.tableclz = "table hide";
                }
                else {
                    $scope.alert = "hide";
                    $scope.tableclz = "table show";
                }

            })
    }
    getDetailsofCategory();


    //Adding Category
    $scope.AddCategory = function () {
        console.log( $scope.selection.Category);
        for(var i = 0 ; i < $scope.categoryObjArray.length ; i++) {
            if($scope.categoryObjArray[i].name == $scope.selection.Category ){

                console.log("already Added");
                return;
            }
        }
        if($scope.selection.Category == "" || $scope.selection.Category == null ){
            //$scope.showAlert();
        }
        else {
            var id =  $scope.categoryObjArray.length.toString();
            var categoryObj = {id : id ,categoryName : $scope.selection.Category , noOfItems : 0};

            $http.post('/category' , categoryObj ).then(function (response) {
                console.log(response.data)
                if (response.data == true) {
                    alert('Item Saved successfully');
                    getDetailsofCategory();
                    $scope.selection.Category = "";
                } else {
                    alert('Error in saving');
                }
            });

        }

    }

    //deleteing category
    $scope.deleteCategory = function (index) {
        var id = index;
        console.log(index);

        $http.delete('/category/'+id).then(function (response) {
            if (response.data == true) {
                alert('Item Deleted successfully');
                getDetailsofCategory();
            } else {
                alert('Error in deleting');
            }
        });
    }


    //Add StoreManger
    $scope.addStoreManager = function () {
        var StoreManagerObj = {FistName : $scope.storeMAnagerDetails.firstname , LastName : $scope.storeMAnagerDetails.lastname , address1 : $scope.storeMAnagerDetails.address1  , address2 : $scope.storeMAnagerDetails.address2 , Email : $scope.storeMAnagerDetails.Email , mobileNumber : $scope.storeMAnagerDetails.mobileNumber , password : $scope.storeMAnagerDetails.password};

        console.log(StoreManagerObj);
        $http.post('/storeManger' , StoreManagerObj).then(function (response) {
            console.log(response.data)
            if (response.data == true) {
                alert('Item Saved successfully');
                getDetailsofCategory();
                $scope.selection.Category = "";
            } else {
                alert('Error in saving');
            }
        });
    }
});



