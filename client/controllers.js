angular.module('app', ['angularFileUpload'])

  // The example of the full functionality
  .controller('TestController',function ($scope, $http, FileUploader) {
    'use strict';
    // create a uploader with options

    var uploader = $scope.uploader = new FileUploader({
      scope: $scope,                          // to automatically update the html. Default: $rootScope
      url: '/api/photos/upload',
      formData: [
        { key: 'value' }
      ]
    });

    // ADDING FILTERS
    uploader.filters.push({
        name: 'filterName',
        fn: function (item, options) { // second user filter
            console.info('filter2');
            return true;
        }
    });

    // REGISTER HANDLERS
    // --------------------
    uploader.onAfterAddingFile = function(item) {
      console.info('After adding a file', item);
    };
    // --------------------
    uploader.onAfterAddingAll = function(items) {
      console.info('After adding all files', items);
    };
    // --------------------
    uploader.onWhenAddingFileFailed = function(item, filter, options) {
      console.info('When adding a file failed', item);
    };
    // --------------------
    uploader.onBeforeUploadItem = function(item) {
      console.info('Before upload', item);
    };
    // --------------------
    uploader.onProgressItem = function(item, progress) {
      console.info('Progress: ' + progress, item);
    };
    // --------------------
    uploader.onProgressAll = function(progress) {
      console.info('Total progress: ' + progress);
    };
    // --------------------
    uploader.onSuccessItem = function(item, response, status, headers) {
      console.info('Success', response, status, headers);
      $scope.$broadcast('uploadCompleted', item);
    };
    // --------------------
    uploader.onErrorItem = function(item, response, status, headers) {
      console.info('Error', response, status, headers);
    };
    // --------------------
    uploader.onCancelItem = function(item, response, status, headers) {
      console.info('Cancel', response, status);
    };
    // --------------------
    uploader.onCompleteItem = function(item, response, status, headers) {
      console.info('Complete', response, status, headers);
    };
    // --------------------
    uploader.onCompleteAll = function() {
      console.info('Complete all');
    };
    // --------------------


      $scope.userToken = $scope.userToken || '';
      $scope.userID = $scope.userID || '';
      $scope.userAlbumId = $scope.userAlbumId || '';
      $scope.login_email = 'dio@gmail.com';
      $scope.login_password = '1234';
      $scope.loginSubmit = function() {
          var formData = {
          'email'              : $scope.login_email,
          'password'    : $scope.login_password
          };

          $http.post('/api/Accounts/login', formData)
          .then(function successCallback(resData) {
              console.log(resData);

              $scope.userToken = resData.data.id || '';
              $scope.userId = resData.data.userId || '';
              var user_url = '/api/Accounts/' + resData.data.userId +'/?access_token=' + resData.data.id;
              return $http.get(user_url);

          }, function errorCallback(resError) {
            alert(resError); 
          })
          .then(function successCallback(resData) {
              console.log(resData);
              $scope.userAlbumId = resData.data.album_id || '';
              
              $scope.login_password = '';

              //TODO(Dio), re-init contorller, not sure solution
              $scope.$broadcast('uploadCompleted', null);
              $scope.uploader.url = '/api/photos/upload?access_token='+$scope.userToken;

              alert('User (' + $scope.login_email + ') success login');

          }, function errorCallback(resError) {
            alert(resError); 
          });
         
      }; // login submit function

      $scope.logout = function() {
        if($scope.userToken && $scope.userToken != ''){
          $http.post('/api/Accounts/logout?access_token=' + $scope.userToken)
          .then(function successCallback(resData) {
                $scope.userToken = '';
                $scope.userId = '';
                $scope.userAlbumId = '';
                $scope.$broadcast('uploadCompleted', null);
                alert('User logout');
            }, function errorCallback(resError) {
              alert(resError); 
            });
        }
      }; // logout f
      $scope.signup = function() {
        console.log('signup');
      }; // signup f


  }
).controller('FilesController', function ($scope, $http) {

    $scope.load = function () {
      var userPhotosUrl = '/api/Accounts/'+ $scope.userId + '/photos/?access_token=' + $scope.userToken; 
      $http.get(userPhotosUrl)
      .then(function success(resData) {
        console.log(resData.data);
        $scope.files = resData.data;
      }, function error(resData) {
        console.log(resData);
        $scope.files = [];
      })
    };

    $scope.delete = function (index, id) {
      return;
      // $http.delete('/api/containers/container1/files/' + encodeURIComponent(id)).success(function (data, status, headers) {
      //   $scope.files.splice(index, 1);
      // });
    };

    $scope.$on('uploadCompleted', function(event) {
      console.log('uploadCompleted event received');
      $scope.load();
    });

  }).controller('LoginController', function($scope, $http) {

    });
