var app = angular.module('shuffling', []);

app.controller('FormController', ['$scope', 'shufflingSvc', function($scope, shufflingSvc){
    var vm = this;
    vm.submit = function(){
        console.log('in FormControllers submit');
        console.log(vm.name, " - ", vm.transitionDate, " - ",vm.status ," - ",vm.pickupLocation);
        console.log("shufflingSvc - ", shufflingSvc);

        shufflingSvc.addGuest(vm.name, vm.transitionDate, vm.status, vm.pickupLocation);
    };

}]);

app.controller('TabController', ['$scope',function($scope){
    var vm = this;
}]);

app.service('shufflingSvc', ['Guest',function(Guest){

    var guests = [];

    this.getGuestList = function(){
        return guests;
    };

    this.addGuest = function(name, transitionDate, status, pickupLocation){
        console.log("in shufflingSvc.addGuest");
        guests.push(new Guest(name, transitionDate, status, pickupLocation));

        console.log(guests);
    };

    this.deleteGuest = function(index){

    };

    this.editGuest = function(index){

    };

}]);
