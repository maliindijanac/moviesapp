var app = angular.module('movies',  ['ui.bootstrap']);
app.controller('appctrl', function($scope, $rootScope,$http,$uibModal) {

    loadMovies();
    loadCategories(); 

    function loadMovies() {
        $http.get("/rest/movies").then(function(response) {    
         $scope.movies = response.data;
        });
    };

    function loadCategories() {
        $http.get("/rest/categories").then(function(response) {    
         $scope.categories = response.data;
        });

    };

    $scope.deleteMovie = function (id) {
        console.log(id);
        $http.delete("/rest/movies/"+ id).then(function(response) {    
        loadMovies();
        });
    };


    $scope.saveMovie = function (data) {
        vdata = {id :data.id, 
                 name: data.name,
                 year: data.year,
                 category_id: data.category_id,
                 amount_earned: data.amount_earned};
        $http.post("/rest/movies",JSON.stringify(vdata)).then(function(response) {
	
           loadMovies();
        });
    };

    $scope.updateMovie = function (id,data) {
      vdata = {id :data.id, 
               name: data.name,
               year: data.year,
               category_id: data.category_id,
               amount_earned: data.amount_earned};
      
               $http.put("/rest/movies/"+id,JSON.stringify(vdata)).then(function(response) {

         loadMovies();
      });
   };

    $scope.confirmdelete = function (id) {
        console.log('confirmdelete modal');
        modalInstance = $uibModal.open({
            controller: 'ConfirmInstanceCtrl',
            controllerAs: 'pc',
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'confirmModal.html', 
            backdrop : 'static',
            resolve: {
            }     
        });
    
        modalInstance.result.then(function () {
            console.log ("Confirm"+ id);
              $scope.deleteMovie(id);

    
        }, function () {
            console.log('onfirmModal dismissed');
        });
        
        $rootScope.modalInstance = modalInstance;
      };
      $scope.editMovie = function (id) {
        console.log('edit modal');

        modalInstance = $uibModal.open({
            controller: 'editInstanceCtrl',
            controllerAs: '$ctrl',
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'editModal.html', 
            backdrop : 'static',
            resolve: {
              movieid : function () { return id}
            }     
        });
    
        modalInstance.result.then(function (data) {
            if (data.old_id) {
              $scope.updateMovie(data.old_id,data);
            } else {
              $scope.saveMovie(data);
            }

    
        }, function () {
            console.log('ConfirmModal dismissed');
        });
        
        $rootScope.modalInstance = modalInstance;
      };

}).controller('ConfirmInstanceCtrl', function ($uibModalInstance) {

    this.ok = function () {
      $uibModalInstance.close('ok');
    };
  
    this.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }).controller('editInstanceCtrl', function ($uibModalInstance,$http, movieid) {
    var $ctrl=this;
    
    if (movieid) {
      $http.get("/rest/movies/"+movieid).then(function(response) {    
         $ctrl.id= response.data.id;
         $ctrl.name= response.data.name;
         $ctrl.year= response.data.year;
         $ctrl.category_id= response.data.category_id;
         $ctrl.amount_earned= response.data.amount_earned;
       });
    }
    
    $http.get("/rest/categories").then(function(response) {    
        $ctrl.categories = response.data;
    });

    this.ok = function () {
      $uibModalInstance.close({
          id:$ctrl.id,
          name:$ctrl.name,
          year:$ctrl.year,
          category_id:$ctrl.category_id,
          amount_earned:$ctrl.amount_earned,
          old_id : movieid
      });
    };
  
    this.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
  ;