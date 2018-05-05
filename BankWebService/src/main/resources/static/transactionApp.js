var angular = angular.module('my-app', []);
angular.controller('transactionCntrl', transactionCntrl);

function transactionCntrl($scope, $http, $window, $filter) {

	this.clearList = function() {
		this.transaction = [];
	}

	this.transactionFn = function() {
		var config = {
			headers : {
				'Accept' : 'text/plain'
			}
		};
		var url = "http://localhost:9001/transaction";

		var transactionDate = $filter("date")(this.transaction.transactionDate,
				'yyyy-MM-dd');

		var data = {

			accountNo : this.transaction.accountNo,
			accountName : this.transaction.accountName,
			accountType : this.transaction.accountType,
			trasactionType : this.transaction.trasactionType,
			amount : this.transaction.amount,
			transactionDate : transactionDate,
			transactionId : this.transaction.transactionId

		};

		$http.post(url, data, config).then(
				function(response) {
					$scope.postResultMessage = response.data;
					if (response.data == "success") {
						alert(" Amount is credited to Account"
								+ this.transaction.amount);
					} else {
						alert(" Amount is credited to Account failed"
								+ this.transaction.amount);
						;
					}
					console.log(" " + response.data);
				},
				function error(response) {
					$scope.postResultMessage = "Error with status: "
							+ response.statusText;
				});

		console.log(" " + this.transaction.accountNo);
	}
};

