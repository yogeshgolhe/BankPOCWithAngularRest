var angular = angular.module('my-app', []);
angular.controller('registrationCntrl', registrationCntrl);

function registrationCntrl($scope, $http, $window, $filter) {

	$scope.countries = {

		'USA' : {
			'Alabama' : [ 'Montgomery', 'Birmingham' ],
			'California' : [ 'Sacramento', 'Fremont' ],
			'Illinois' : [ 'Springfield', 'Chicago' ]
		},
		'India' : {
			'Maharashtra' : [ 'Pune', 'Mumbai', 'Nagpur', 'Akola' ],
			'Madhya Pradesh' : [ 'Indore', 'Bhopal', 'Jabalpur' ],
			'Rajasthan' : [ 'Jaipur', 'Ajmer', 'Jodhpur' ]
		},
		'Australia' : {
			'New South Wales' : [ 'Sydney' ],
			'Victoria' : [ 'Melbourne' ]
		}
	};

	this.master = {};

	this.clearList = function() {
		this.userInfo = [];
	}

	$scope.GetSelectedCountry = function() {
		$scope.strCountry = this.userInfo.country;
	};
	$scope.GetSelectedState = function() {
		$scope.strState = this.userInfo.state;
	};

	this.checkAge = function() {
		var dob = new Date(this.userInfo.dob);
		var today = new Date();
		var age = ((today - dob) / (31557600000));
		var age = Math.floor(age);

		if (age > 60) {
			this.userInfo.citizenship = "Senior Citizen";
		}

		if (age <= 60 && age >= 18) {
			this.userInfo.citizenship = "Citizen";
		}

		this.userInfo.ageLessThanZeroMessage = "";

		if (age < 18) {
			this.userInfo.citizenship = "Minor";
			this.userInfo.ageLessThanZeroMessage = "Age should not be less than 18";
		}

		if (age < 0) {
			this.userInfo.ageLessThanZeroMessage = "DOB Should not be future date";
		}
		console.log(age);
	}

	this.checkInitDeposit = function() {
		var accountType = this.userInfo.accountType;
		if (accountType == "Saving") {
			this.userInfo.initDepositAmount = 5000;
		}
		;
		if (accountType == "Salary") {
			this.userInfo.initDepositAmount = 0000;
		}
	}

	this.checkPassword = function() {
		var password = this.userInfo.password;
		var retypePassword = this.userInfo.retypePassword;
		if (password != retypePassword) {
			this.userInfo.passwordMessage = "Retype and Password Mismatch";
		} else {
			this.userInfo.passwordMessage = "";
		}
	}

	this.registerFn = function() {

		var config = {
			headers : {
				'Accept' : 'text/plain'
			}
		};
		var url = "http://localhost:9001/register";

		var registrationDate = $filter("date")(this.userInfo.registrationDate,
				'yyyy-MM-dd');
		var dob = $filter("date")(this.userInfo.dob, 'yyyy-MM-dd');
		var activationDate = registrationDate + 5;

		var data = {
			name : this.userInfo.name,
			userName : this.userInfo.userName,
			password : this.userInfo.password,
			dob : dob,
			gender : this.userInfo.gender,
			retypePassword : this.userInfo.retypePassword,
			contactNumber : this.userInfo.contactNumber,
			email : this.userInfo.email,
			citizenship : this.userInfo.citizenship,
			accountType : this.userInfo.accountType,
			registrationDate : registrationDate,
			citizenStatus : this.userInfo.citizenStatus,
			branchName : this.userInfo.branchName,
			initDepositAmount : this.userInfo.initDepositAmount,
			panNumber : this.userInfo.panNumber,
			addressLine1 : this.userInfo.addressLine1,
			addressLine2 : this.userInfo.addressLine2,
			city : this.userInfo.city,
			state : this.strState,
			country : this.strCountry,
			pin : this.userInfo.pin
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
		console.log(" User Info " + this.userInfo);
	}
};

