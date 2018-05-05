var angular = angular.module('my-app', []);
angular.controller('statementGenCntrl', statementGenCntrl);

function statementGenCntrl($scope, $http, $window, $filter) {

	this.viewStatement = function() {
		var config = {
			headers : {
				'Accept' : 'application/json'
			}
		};
		var url = "http://localhost:9001/statement";
		var from = $filter("date")(this.statement.from, 'yyyy-MM-dd');
		var to = $filter("date")(this.statement.to, 'yyyy-MM-dd');

		var data = {
			from : from,
			to : to,
			transactionType : this.statement.transactionType,
			transactionNo : this.statement.transactionNo,
			policyName : this.statement.policyName,
			transactionId : this.statement.transactionId
		};

		$http.post(url, data, config).then(
				function(response) {
					$scope.stmtCntrl.transactionList = response.data;
					console.log(" " + response.data);

				},
				function error(response) {
					$scope.postResultMessage = "Error with status: "
							+ response.statusText;
				});

	}

	this.downloadCsv = function() {

		function exportTableToCSV029($table, filename) {

			var $rows = $table.find('tr:has(td)'),

			// Temporary delimiter characters unlikely to be typed by keyboard
			// This is to avoid accidentally splitting the actual contents
			tmpColDelim = String.fromCharCode(11), // vertical tab character
			tmpRowDelim = String.fromCharCode(0), // null character

			// actual delimiter characters for CSV format
			colDelim = '","', rowDelim = '"\r\n"',

			csv = '"'
					+ $rows.map(function(i, row) {
						var $row = $(row), $cols = $row.find('td');

						return $cols.map(function(j, col) {
							var $col = $(col), text = $col.text();

							return text.replace(/"/g, '""'); // escape double quotes

						}).get().join(tmpColDelim);

					}).get().join(tmpRowDelim).split(tmpRowDelim)
							.join(rowDelim).split(tmpColDelim).join(colDelim)
					+ '"';

			// Deliberate 'false', see comment below
			if (false && window.navigator.msSaveBlob) {

				var blob = new Blob([ decodeURIComponent(csv) ], {
					type : 'text/csv;charset=utf8'
				});

				// Crashes in IE 10, IE 11 and Microsoft Edge
				// See MS Edge Issue #10396033
				// Hence, the deliberate 'false'
				// This is here just for completeness
				// Remove the 'false' at your own risk
				window.navigator.msSaveBlob(blob, filename);

			} else if (window.Blob && window.URL) {

				// HTML5 Blob
				var blob = new Blob([ csv ], {
					type : 'text/csv;charset=utf-8'
				});
				var csvUrl = URL.createObjectURL(blob);

				//this trick will generate a temp <a /> tag
				var link = document.createElement("a");
				link.href = csvUrl;

				//set the visibility hidden so it will not effect on your web-layout
				link.style = "visibility:hidden";
				link.download = filename; //fileName + ".csv";

				//this part will append the anchor tag and remove it after automatic click
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);

			} else {

				// Data URI
				var csvData = 'data:application/csv;charset=utf-8,'
						+ encodeURIComponent(csv);

				//this trick will generate a temp <a /> tag
				var link = document.createElement("a");
				link.href = csvData;

				//set the visibility hidden so it will not effect on your web-layout
				link.style = "visibility:hidden";
				link.download = filename; //fileName + ".csv";

				//this part will append the anchor tag and remove it after automatic click
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);

			}

		}

		//use a default name to export - change as necessary
		//if the table name in the div id= changes - you MUST change the name here also
		//default is dvData
		var args = [ $('#dvData>table'), 'export.csv' ];
		exportTableToCSV029.apply(this, args);

	}

};

