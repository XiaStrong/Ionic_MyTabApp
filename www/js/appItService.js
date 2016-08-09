/**
 * Created by XQ on 16/8/3.
 */
angular.module('appItf.service', [])

  .service('appItfService', ['$http', '$q', '$ionicLoading', function ($http, $q, $ionicLoading) {
    var getInfo_resp = {};

    var postInfo_resp = {};
    return {

      //进行get请求
      get_getInfo_resp: function () {
        return getInfo_resp;
      },

      //进行post请求
      post_postInfo_resp:function(){
        return postInfo_resp;
      },

      //get
      do_getInfo_resp: function (params) {
        console.log("获取参数:" + angular.toJson(params));
        var deferred = $q.defer();
        var obj = params
        var strUrl = "free/applications/limited";
        getData(strUrl, obj, getInfo_resp, deferred);
        return deferred.promise;
      },

      //post,现在不能用,因为找到的链接不支持post请求
      do_postInfo_resp: function (params) {
        console.log("获取参数:" + angular.toJson(params));
        var deferred = $q.defer();
        var obj = params
        var strUrl = "free/applications/limited";
        postData(strUrl, obj, postInfo_resp, deferred);
        return deferred.promise;
      }
    }

    //数据请求get
    function getData(strUrl, requestObj, responseObj, deferred)
    {
      var strJson = angular.toJson(requestObj);
      console.log(strJson);
      var str ='page'+'='+ requestObj.page+'&'+'currency'+'='+requestObj.currency;
      var myUrl = "http://iappfree.candou.com:8080/"+strUrl+'?'+str;
      console.log("AppItfService--请求链接：" + myUrl);
      $ionicLoading.show({
        //template: '拼命加载中，请耐心等候...'
        template: '<ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'
      });

      var config = {
        timeout: 20000,
        headers: {'Content-Type': 'text/javascript;charset=utf-8'},
        params: requestObj
      }

      $http.get(myUrl, {}, config)
        .success(function (data) {
          $ionicLoading.hide();
          angular.copy(data, responseObj);
          deferred.resolve(data);
          console.log("请求success：" + angular.toJson(data));
        })
        .error(function (data) {
          $ionicLoading.hide();
          deferred.reject(data);
          console.log("请求error：" + angular.toJson(data));
        });
    }

    //数据请求post
    function postData(strUrl, requestObj, responseObj, deferred) {
      var strJson = angular.toJson(requestObj);
      console.log(strJson);
      var myUrl = SERVERURL + strUrl;
      console.log("AppItfService--请求链接：" + myUrl);

      $ionicLoading.show({
        //template: '拼命加载中，请耐心等候...'
        template: '<ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'
      });

      var config = {
        timeout: 20000,
        headers: {'Content-Type': 'text/javascript;charset=utf-8'},
        params: requestObj
      }

      $http.post(myUrl, {}, config)
        .success(function (data) {
          $ionicLoading.hide();
          angular.copy(data, responseObj);
          deferred.resolve(data);
          console.log("请求success：" + angular.toJson(data));
        })
        .error(function (data) {
          $ionicLoading.hide();
          deferred.reject(data);
          console.log("请求error：" + angular.toJson(data));
        });
    }

  }])
