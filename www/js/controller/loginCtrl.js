starter.controller('loginCtrl', function($scope, $ionicSwipeCardDelegate, $rootScope, $state,$ionicLoading,$timeout,ionicToast,$ionicViewService,$ionicViewService, defaultService) {

     $ionicViewService.clearHistory();
    if (localStorage.getItem("USER") === null) {}else{ $state.go("main")};

    console.log("--------------dave--------------------------");

    $scope.regPage = function(){
      $state.go("register");
    }

    $scope.login = function(loginData){
            $ionicLoading.show({
                template: '<ion-spinner icon="ios"></ion-spinner>loading...'
            });

            var count = 0;
            for(var value in loginData){
                if(loginData[value] !=""){
                    ++count;
                }
            }
           if(!loginData || count< 2){
                $scope.error = "Fill in the entire form";
                $timeout(function(){ $scope.error = ""; }, 2500);
                $ionicLoading.hide();
            }else{

                    loginData.method = "getUser";
                    defaultService.data(loginData)
                    .then(function(data){
                        switch (data.data.success) {
                            case true:
                                window.localStorage['USER'] = JSON.stringify(data.data.user);
                                ionicToast.show('Login successful', 'top', false, 2500);
                                $ionicLoading.hide();
                                $state.go("main");
                                break;
                            case false:
                                $scope.error = data.data.message;
                                $timeout(function(){ $scope.error = ""; }, 2500);
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
