/**
 * Created by yoonsKim on 15. 9. 17..
 */
app.controller("index", function ($rootScope, $scope,$http) {

    $scope.test="시작해봅시다";

    $http({
        method: 'GET',
        url: 'http://localhost:3000/i/board'
    }).success(function (data, status, headers, config) {
        $scope.bg_nlp = data.url;
    }).error(function (data, status, headers, config) {
        $scope.bg_nlp = "/assets/img/bg/wood.jpg";
    });
});