



var appMain = angular.module('admin', ["ngRoute"]);

appMain.controller('adminCtrl', function ($scope, $interval, $http , $window) {
    $scope.clz1 = "nav-link active";
    $scope.clz2 = "nav-link ";
    $scope.clz3 = "nav-link ";
    $scope.pageIndex = 0;
    $scope.tableclz = "";
    $scope.alert = "hide";
    $scope.alertBox1 = "hide";
    $scope.alertBox2 = "hide";

    $scope.tableclzM = "";
    $scope.alertM = "hide";
    $scope.alertBox1M = "hide";
    $scope.alertBox2M = "hide";

    $scope.selection = {}
    $scope.storeMAnagerDetails = {}

    $scope.categoryObjArray = [];
    $scope.storeMAnagerDetailsArray = [];

    $scope.changeIndex = function (indexToChange) {
        if (indexToChange == 0) {
            $scope.clz1 = "nav-link active";
            $scope.clz2 = "nav-link ";
            $scope.clz3 = "nav-link ";
            getDetailsofCategory();
        }
        if (indexToChange == 1) {
            $scope.clz1 = "nav-link ";
            $scope.clz2 = "nav-link active";
            $scope.clz3 = "nav-link ";
            getDetailsofStoreManger();
        }
        if (indexToChange == 2) {
            $scope.clz1 = "nav-link "
            $scope.clz2 = "nav-link "
            $scope.clz3 = "nav-link active"
        }
        $scope.pageIndex = indexToChange;
    }


    var tick = function () {
        $scope.clock = Date.now();
    }
    tick();
    $interval(tick, 1000);


    var date = new Date();
    var TodaydateArray = [];

    TodaydateArray = date.toString().split(' ');
    $scope.displayTodayDate = "     " + TodaydateArray[1] + "/" + TodaydateArray[2] + "/" + TodaydateArray[3] + "\t" + "\t";



    $scope.Email = function () {

        http.sendEmail()
    }


    //Get all Data from Category collection
    var getDetailsofCategory = function () {
        $scope.tableclz = "table hide";
        $scope.alert = "hide";
        $scope.alertBox2 = "show ";
        $http.get(`/api/category`)
            .then(function (response) {
                console.log(response);
                $scope.categoryObjArray = response.data;


            })
            .finally(function () {
                if ($scope.categoryObjArray.length == 0) {
                    $scope.alert = "show";
                    $scope.tableclz = "table hide";

                }
                else {
                    $scope.alert = "hide";
                    $scope.tableclz = "table show";

                }
                $scope.alertBox2 = "hide";

            })
    }
    getDetailsofCategory();


    //Adding Category
    $scope.AddCategory = function () {
        $scope.alertBox1 = "show";
        console.log($scope.selection.Category);
        for (var i = 0; i < $scope.categoryObjArray.length; i++) {
            if ($scope.categoryObjArray[i].name == $scope.selection.Category) {

                console.log("already Added");
                return;
            }
        }
        if ($scope.selection.Category == "" || $scope.selection.Category == null) {
            //$scope.showAlert();
        }
        else {
            var id = $scope.categoryObjArray.length.toString();
            var categoryObj = { id: id, categoryName: $scope.selection.Category, noOfItems: 0 };

            $http.post(`/api/category`, categoryObj).then(function (response) {
                console.log(response.data)
                if (response.data == true) {
                    $scope.alertBox1 = "hide";
                    $('#save').modal('show');
                    getDetailsofCategory();
                    $scope.selection.Category = "";

                } else {
                    alert('Error in saving');
                }
            });

        }

    }

    //deleteing category
    var currentDeleteIDCaegory = 0;
    $scope.deleteCategory = function (index) {
        currentDeleteIDCaegory = index;
        console.log(index);
    }

    $scope.deleteCategoryConfirm = function () {
        $http.delete(`/api/category/` + currentDeleteIDCaegory).then(function (response) {
            if (response.data == true) {
                alert('Item Deleted successfully');
                getDetailsofCategory();
            } else {
                alert('Error in deleting');
            }
        });
    }


    //updating category
    var currentUpdateIDCaegory = 0;
    $scope.UpdateCategory = function (index) {
        currentUpdateIDCaegory = index;
        console.log(index);
        $http.get(`/api/category/getOne/` + currentUpdateIDCaegory)
        .then(function (response) {
            console.log(response);
           $scope.selection.updateBoxCategoryName = response.data[0].categoryName;


        })
       
    }

    $scope.UpdateCategoryConfirm = function () {
        $http.put(`/api/category/` + currentUpdateIDCaegory).then(function (response) {
            if (response.data == true) {
                alert('Item Updated successfully');
                getDetailsofCategory();
            } else {
                alert('Error in deleting');
            }
        });
    }


    //Get all Data from StoreManger collection
    var getDetailsofStoreManger = function () {
        $scope.tableclzM = "table hide";
        $scope.alertM = "hide";
        $scope.alertBox2M = "show form-inline";
        $http.get(`/api/storeManger`)
            .then(function (response) {
                console.log(response);
                $scope.storeMAnagerDetailsArray = response.data;


            })
            .finally(function () {
                 if($scope.storeMAnagerDetailsArray.length == 0 ){
                     $scope.alertM = "show";
                     $scope.tableclzM = "table hide";
 
                 }
                 else {
                     $scope.alertM = "hide";
                     $scope.tableclzM = "table show";
 
                 }
                 $scope.alertBox2M = "hide";

            })
    }
    getDetailsofStoreManger();


    //Add StoreManger
    $scope.addStoreManager = function () {
        $scope.alertBox1M = "show";
        var StoreManagerObj = { FirstName: $scope.storeMAnagerDetails.firstname, LastName: $scope.storeMAnagerDetails.lastname, address1: $scope.storeMAnagerDetails.address1, address2: $scope.storeMAnagerDetails.address2, Email: $scope.storeMAnagerDetails.Email, mobileNumber: $scope.storeMAnagerDetails.mobileNumber, password: $scope.storeMAnagerDetails.password };

        console.log(StoreManagerObj);
        $http.post(`/api/storeManger`, StoreManagerObj).then(function (response) {
            console.log(response.data)
            if (response.data == true) {
                $scope.alertBox1M = "show";
                $('#saveStoreManager').modal('show');
                getDetailsofStoreManger();
                $scope.selection.Category = "";
            } else {
                alert('Error in saving');
            }
        });
    }

    //deleteing StoreManger
    var currentDeleteIDStoreManger = 0;
    $scope.deleteStoreManger = function (index) {
        currentDeleteIDStoreManger = index;
        console.log(index);
    }

    $scope.deleteStoreMangerConfirm = function () {
        $http.delete(`/api/storeManger/` + currentDeleteIDStoreManger).then(function (response) {
            if (response.data == true) {
                alert('Item Deleted successfully');
                getDetailsofStoreManger();
            } else {
                alert('Error in deleting');
            }
        });
    }

    $scope.logOut = function () {
        localStorage.removeItem("loggedInUser");
        $window.location.href = '../login';
    }
});



