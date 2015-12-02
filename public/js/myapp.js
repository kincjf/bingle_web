/**
 * Created by yoonsKim on 15. 9. 11..
 */
var app =angular.module("bingle", ['infinite-scroll']);

var api={};
var ajax;
app.controller("root", function ($rootScope, $scope,$http) {

    $rootScope.user_idx=0;
    $rootScope.user_name="";

    $scope.test="시작해봅시다";
    ajax = function(method, url, async) {

        return function(data,params, callback, url_params,optional_params){

            for(var i in url_params){
                url+=url_params[i]+"/";
            }
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
            console.log(req);
            $http(req).success(callback).error(callback);
        };
    };
    api.article ={};
    api.user ={};
    api.article.all = ajax("get","http://113.198.39.114:3000/i/article");
    api.article.one = ajax("get","http://113.198.39.114:3000/i/article/");

    api.user.info = ajax("get","http://113.198.39.114:3000/i/user");



    $scope.click_facebook_login = function () {
        FB.init({
            appId      : '914907761923860',
            status     : true,
            xfbml      : true,
            version    : 'v2.2' // or v2.0, v2.1, v2.2, v2.3
        });
        FB.login(function(response) {
            console.log(response);
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                getUserInfo();


            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'public_profile,email,user_likes,user_friends'});
        function getUserInfo(){
            FB.api(
                "/me",{fields: 'email,name'},
                function (response) {
                    if (response && !response.error) {
                        $scope.fb_email = response.email;
                        console.log($scope.fb_email);
                        $("#fb_form").submit();

                    }
                }
            );
        }

    };

    $scope.logout = function () {
        location.href = '/logout';
    }
});

