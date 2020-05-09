var app = angular.module('admin', ["ngRoute"]);

app.controller('adminCtrl', function($scope , $interval ) {
    $scope.clz1 = "nav-link active";
    $scope.clz2 = "nav-link ";
    $scope.clz3 = "nav-link ";
    $scope.pageIndex = 0;


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
});