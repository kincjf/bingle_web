/**
 * Created by yoonsKim on 15. 9. 21..
 */

app.controller("article-view", function ($rootScope, $scope,$http) {


    setTimeout(function () {

        api.article.one(null,null, function (data) {
            data=data[0];
            $scope.photo_url = data.PHOTO_NAME;
            $scope.comment = data.COMMENT;
            console.log(data);
            embedpano({swf:$scope.photo_url+".swf", xml:$scope.photo_url+".xml", target:"pano", html5:"prefer", passQueryParameters:true});

        },[$scope.pid]);

    },10);


});