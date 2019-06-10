'use strict';

angular.module('webApp.addPost', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addPost', {
		templateUrl: 'addPost/addPost.html',
		controller: 'AddPostCtrl'
	});
}])

.controller('AddPostCtrl', ['$scope', '$firebaseArray', '$location','$firebaseAuth', 'CommonProp', function($scope, $firebaseArray, $location,$firebaseAuth,CommonProp){

	$scope.username = CommonProp.getUser();
	
	if(!$scope.username){
		$location.path('/home');
	}
	var ref = firebase.database().ref('Articles');
	$scope.articles = $firebaseArray(ref);
	$scope.createPost = function(){
		var title = $scope.article.titleTxt;
		var post = $scope.article.postTxt;
		console.log(CommonProp.getUser());
		$scope.articles.$add({
			title: title,
			post: post
		}).then(function(ref){
			console.log(ref);
			$scope.success = true;
			window.setTimeout(function() {
				$scope.$apply(function(){
					$scope.success = false;
				});
			}, 2000);
		}, function(error){
			console.log(error);
		});
	};

}]);
