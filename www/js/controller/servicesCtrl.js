starter.controller('serviceCtrl', function($scope, $ionicSwipeCardDelegate, $rootScope, $state, $ionicLoading,$timeout,$ionicViewService, defaultService) {

if($rootScope.loadServices){
                $ionicLoading.show({
                    template: '<ion-spinner icon="ios"></ion-spinner>loading...'
                });

                $scope.Data = {};
                $scope.Data.method = "getCompanyServices";
                $scope.Data.C_ID = $rootScope.company.C_ID;
                defaultService.data($scope.Data)
                    .then(function(data){

                        switch (data.data.success) {
                            case true:
                                $scope.services = data.data.user;

                                for(i=0; i< $scope.services.length; i++){
                                    $scope.services[i].number = i+1;
                                }
                                window.localStorage['SERVICES'] = JSON.stringify($scope.services);
                                $ionicLoading.hide();
                                break;
                            case false:
                                $ionicLoading.hide();
                                ionicToast.show(data.data.message, 'bottom', false, 2500);
                                break;
                            default:
                        }
                    }, function(error){
                        $ionicLoading.hide();
                        switch(error.status){
                        		case -1:
                        				// ionicToast.show(message, position, stick, time);
                                ionicToast.show('Connection failed, Please check Internet Connection', 'bottom', false, 2500);
                        				break;
                        		case 400:
                        				// ionicToast.show(message, position, stick, time);
                                ionicToast.show(error.data.message, 'bottom', false, 2500);
                        				break;
                        		default:
                        				$scope.error = "";
                        				break;
                        }
                    });
        }else{
              $scope.services = JSON.parse(window.localStorage['SERVICES']);
        }

        $scope.serviceClicked = function(service){
          $rootScope.loadServices = false;
          $rootScope.service = service;
          $state.go("serviceDetails");
        }

});
