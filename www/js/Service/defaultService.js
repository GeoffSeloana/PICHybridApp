starter.factory('defaultService', function ($http, $q) {
   return {
       data: function(data) {
           // the $http API is based on the deferred/promise APIs exposed by the $q service
           // so it returns a promise for us by default
           return $http({
                            url: 'https://pic-backend-geoffie.c9users.io/', /*work*/
                            method: "POST",
                            data: $.param(data),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

                       })
                        .then(function(response) {
                           if (typeof response.data === 'object') {
                                return response;
                           } else {
                               // invalid response
                               console.log("invalid response (response not an object)")
                                return $q.reject(response);
                       }

                   }, function(response) {
                       // something went wrong
                       return $q.reject(response);
           });
       }
   };
});
