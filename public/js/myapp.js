/**
 * Created by yoonsKim on 15. 9. 11..
 */
var app =angular.module("bingle", ['infinite-scroll']);

var api={};

app.controller("root", function ($rootScope, $scope,$http) {

    $scope.test="시작해봅시다";
    var ajax = function(method, url, async) {
        return function(data,params, callback, optional_params){

            var options = {
                method: method,
                async: async,
                dataType: "json"
            };

            //options.url = api_prefix + url + "?" + $.param(params);
            //$.ajax(options).always(callback);
            var req = {
                method: method,
                url: url,
                data: data,
                params:params
            };
            $http(req).success(callback).error(callback);
        };
    };
    api.article ={};
    api.article.all = ajax("get","http://localhost:3000/i/article");

});

