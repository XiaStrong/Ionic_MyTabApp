angular.module('starter.controllers', [])

  .controller('TabsController',function($location,$scope){

    $scope.$on('$ionicView.enter', function () {

      var url = $location.url();
      if (url == '/tab/dash' ||
        url == '/tab/chats' ||
        url == '/tab/account') {
        $scope.tabsStyle = '';
      } else {
        $scope.tabsStyle = 'tabs-item-hide';
      }

    });
  })

  .controller('DashCtrl', function ($scope) {

    $scope.show=function(){
      console.log("123");
    }


  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AppDetailCtrl', function ($scope, $stateParams, Account) {

    console.log($stateParams.name);
    $scope.app = Account.get($stateParams.name);

  })

  .controller('AccountCtrl', function ($scope, Account) {

    $scope.params = {};
    $scope.params = Account.getParams();

    //此界面这个方法可以省略
    //$scope.$on('$ionicView.enter',function(){
    //  Account.getInfo().then(function(success){
    //    console.log("1")
    //
    //    $scope.params.applications = success.applications;
    //
    //    console.log($scope.params.applications.length);
    //
    //
    //  },function(error){
    //    console.log("2")
    //
    //  });
    //})

    var page = 0;
    //进行上拉刷新
    $scope.doRefresh = function () {

      var param = {
        "page": "1",
        "currency": "rmb"
      }

      Account.getInfo(param).then(function (success) {
        $scope.params.applications = success.applications;
        console.log($scope.params.applications.length);

      }, function (error) {
        console.log("2")

      }).finally(function () {
        $scope.$broadcast('scroll.refreshComplete');
      });
    }

    //进行加载更多
    $scope.doLoadMore = function () {
      page = page + 1;

      param = {
        "page": page,
        "currency": "rmb"
      }
      Account.getInfo(param).then(function (success) {

        $scope.params.applications = $scope.params.applications.concat(success.applications);
        console.log($scope.params.applications.length);

      }, function (error) {

      }).finally(function () {
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });

      $scope.jumpToAppDetail = function (app) {
        console.log("234")
      }

    }

    //删除某一行的数据
    $scope.remove = function (app) {
      Account.remove(app);
    }

  });
