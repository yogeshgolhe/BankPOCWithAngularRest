var angular = angular.module('my-app', [ 'ngRoute' ]);
angular.controller('loginCntrl', loginCntrl);

function loginCntrl($scope, $http, $window) {

	this.loginFn = function() {
		var config = {
			headers : {
				'Accept' : 'text/plain'
			}
		};
		var url = "http://localhost:9001/loginUser";

		var data = {
			userName : this.user.userName,
			password : this.user.password

		};

		$http.post(url, data, config).then(
				function(response) {
					$scope.postResultMessage = response.data;
					console.log(" " + response.data);
					if (response.data == "success") {
						var landingUrl = "gohome.html";
						$window.location.href = landingUrl;
					} else {
						$scope.postResultMessage = "Invalid Credentials";
					}

				},
				function error(response) {
					$scope.postResultMessage = "Error with status: "
							+ response.statusText;
				});

		console.log(" user logged in " + this.user.userName + " "
				+ this.user.password);
	}
};

