(function ()
{
	'use strict';
	var baseUrl = baseUrlRepository['oms-events'];
	var apiURL = baseUrl + 'api/';


	angular
		.module('app.events', [])
		.config(config)
		.controller('ListingController', ListingController)
		.controller('SingleController', SingleController)

	/** @ngInject */
	function config($stateProvider)
	{
		// State
		 $stateProvider
			.state('app.events', {
				url: '/events',
				data: {'pageTitle': 'All Events'},
				views   : {
					'pageContent@app': {
						templateUrl: baseUrl + 'frontend/all/listing.html',
						controller: 'ListingController as vm'
					}
				}
			})
			.state('app.events.single', {
				url: '/single/:id',
				views: {
					'pageContent@app': {
						templateUrl: baseUrl + 'frontend/all/single.html',
						controller: 'SingleController as vm'
					}
				}
			});
	}

	function ListingController($scope, $http, $timeout) {        
	
		// Fetch events from backend
		$http.get(apiURL).success(function(response) {
			$scope.events = response; 
		});


		// Display a nice ticking clock for the now timeline entry
		var tickInterval = 60000 //ms

		var tick = function() {
			$scope.currentTime = Date.now() // get the current time
			$timeout(tick, tickInterval); // reset the timer
		}
		tick();

		// Start the timer
		$timeout(tick, tickInterval);
		

		$scope.search = function (row) {
			return (angular.lowercase(row.name).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
					angular.lowercase(row.description).indexOf(angular.lowercase($scope.query) || '') !== -1);
		};
	}

	function SingleController($scope, $http, $stateParams) {
		$scope.baseUrl = baseUrl;

		$http.get(apiURL + 'single/' + $stateParams.id).success( function(response) {
			$scope.event = response; 
		});
	}

})();

