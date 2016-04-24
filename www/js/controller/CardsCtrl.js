starter.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate, $rootScope, $ionicLoading, $state, ionicToast,$ionicViewService, defaultService) {




$scope.logout=function(){
  window.localStorage.removeItem("USER");
  window.localStorage.removeItem("SERVICES");
  $state.go("login");
}


 $ionicViewService.clearHistory();
 if (localStorage.getItem("USER") === null) {$state.go("login")}else{ };

$ionicLoading.show({
    template: '<ion-spinner icon="ios"></ion-spinner>'
});

                $scope.Data = {};
                $scope.Data.method = "getCompanies";
                defaultService.data($scope.Data)
                    .then(function(data){

                        switch (data.data.success) {
                            case true:
                                var cardTypes = data.data.user;
                                $ionicLoading.hide();
                                $rootScope.accepted = 0;
                                $rootScope.rejected = 0;
                                $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);
                                $scope.cardSwiped = function(index) {
                                  $scope.addCard();
                                };
                                $scope.cardDestroyed = function(index) {
                                  if (this.swipeCard.positive === true) {
                                    $scope.$root.accepted++;
                                  } else {
                                    $scope.$root.rejected++;
                                  }
                                  $scope.cards.splice(index, 1);
                                };
                                $scope.addCard = function() {
                                  var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
                                  newCard.id = Math.random();
                                  $scope.cards.push(angular.extend({}, newCard));
                                }
                                $scope.cardClicked  =function(data){

                                  $rootScope.company = data;

                                  $rootScope.loadServices = true;
                                  $state.go("services");
                                }
                                break;
                            case false:
                                  $ionicLoading.hide();
                                  // ionicToast.show(message, position, stick, time);
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


                    })



});
