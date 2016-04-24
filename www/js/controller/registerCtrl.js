starter.controller('registerCtrl', function($scope, $ionicSwipeCardDelegate,$ionicLoading, $rootScope, $state,$timeout, ionicToast, defaultService) {

    if (localStorage.getItem("USER") === null) {}else{ $state.go("main")};

    var ck_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var ck_password= /^[A-Za-z0-9!@#$%^&*()_]{7,10}$/;

    $scope.logPage = function(){
      $state.go("login");
    }

    $scope.registerUser = function(regData){
      $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner>loading...'
      });

            var count = 0;
            for(var value in regData){
                if(regData[value] !=""){
                    ++count;
                }
            }
           if(!regData || count< 4){
                $scope.error = "Fill in the entire form";
                $timeout(function(){ $scope.error = ""; }, 2500);
                $ionicLoading.hide();
            }else if(regData.userPassword != regData.userPasswordTwo){
                $scope.error = "Passwords are not the same";
                $timeout(function(){ $scope.error = ""; }, 2500);
                $ionicLoading.hide();
            }else if(!ck_email.test(regData.userEmail)){
        			  $scope.error = "invalid email";
                $timeout(function(){ $scope.error = ""; }, 2500);
                $ionicLoading.hide();
        		}else if(!ck_password.test(regData.userPassword)){
        			  $scope.error = "Password must have one uppercase, any number and a special character with a minimum of 7 characters.";
                $timeout(function(){ $scope.error = ""; }, 4000);
                $ionicLoading.hide();
        		}else {

                    regData.method = "insertUser";
                    regData.userType = 2;
                    defaultService.data(regData)
                    .then(function(data){

                        switch (data.data.success) {
                            case true:
                                window.localStorage['USER'] = JSON.stringify(data.data.user);
                                //console.log(JSON.parse(window.localStorage['USER']));
                                ionicToast.show('Successfully registered', 'bottom', false, 2500);
                                $ionicLoading.hide();
                                $state.go("main");
                                break;
                            case false:
                                $scope.error = data.data.message;
                                $ionicLoading.hide();
                                break;
                            default:
                        }

                    }, function(error){
                        switch(error.status){
              						case -1:
              							$scope.error = "Connection failed, Please check Internet Connection";
                            $timeout(function(){ $scope.error = ""; }, 2500);
                            $ionicLoading.hide();
              						break;
              						case 400:
              							$scope.error = error.data.message;
              							$timeout(function(){ $scope.error = ""; }, 2500);
                            $ionicLoading.hide();
              						break;
              						default:
              							$scope.error = "";
              						break;
              					}
                        $ionicLoading.hide();
                    });
          }
    }

});
