var appMain = angular.module('admin', ["ngRoute"]);

appMain.controller('adminCtrl', function($scope , $interval , $http ) {
    $scope.clz1 = "nav-link active";
    $scope.clz2 = "nav-link ";
    $scope.clz3 = "nav-link ";
    $scope.pageIndex = 0;

    $scope.selection = {}


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


    $scope.categoryObjArray = [];


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
            $scope.categoryObjArray.push({name : $scope.selection.Category , noOfItems : 0 });
            var categoryObj = {categoryName : $scope.selection.Category , noOfItems : 0};

            $http.post('/category' , categoryObj );

        }

    }



});



