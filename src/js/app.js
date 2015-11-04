var app = angular.module('shuffling', []);

app.controller('FormController', ['$scope', 'shufflingSvc', function ($scope, shufflingSvc) {
    var vm = this;
    vm.submit = function () {
        console.log('in FormControllers submit');
        console.log(vm.name, " - ", vm.transitionDate, " - ", vm.status, " - ", vm.pickupLocation);
        shufflingSvc.addGuest(vm.name, vm.transitionDate, vm.status, vm.pickupLocation);
    };

}]);

app.controller('TabController', ['$scope', 'shufflingSvc', function ($scope, shufflingSvc) {
    var vm = this;
    vm.getGuestList = function () {
        console.log("TabController.getGuestList");
        return shufflingSvc.getGuestList();
    };

    vm.deleteGuest = function(index){
        console.log('deleteGuest - ', index);
        shufflingSvc.deleteGuest(index);
    };

    vm.editGuest = function(index){
        console.log('editGuest - ', index);
        shufflingSvc.editGuest(index);
    };

    vm.availableOptions = function(status){
        var options = [];
        options.push(status);
        if('dropoff' == status || 'pickup' == status){
            options.push('arrived');
        }
        if('arrived' == status ){
            options.push('picked');
        }
        return options;

    };

}]);

app.service('shufflingSvc', ['Guest', 'sampleDataSvc', function (Guest,sampleDataSvc) {
    var that = this;
    var guests = JSON.parse(localStorage.getItem('guests')) || [];

    this.getGuestList = function () {
        console.log("shufflingSvc.getGuestList() - ", guests);
        return guests ;
    };

    this.addGuest = function (name, transitionDate, status, pickupLocation) {
        guests.push(new Guest(name, transitionDate, status, pickupLocation));
        updateLocalStorage();
    };

    this.deleteGuest = function (index) {
        var proceed = confirm("Do you want to delete guest: "+ guests[index].name+ "?");
        if(proceed) {
            guests.splice(index, 1);
            updateLocalStorage();
        }
    };

    this.editGuest = function (index) {
        if(undefined == guests[index].checked){
            guests[index].checked =  true;
        } else{
            guests[index].checked = !guests[index].checked;
        }
        updateLocalStorage();
    };

    updateLocalStorage = function () {
        localStorage.setItem('guests', JSON.stringify(that.getGuestList()));
    };

}]);

app.service('sampleDataSvc', ['$http', function ($http) {
    this.guests = [];
    var that = this;
    $http.get('guests.json')
        .success(function (data) {
            console.log('json data -',data);
            //that.guests = JSON.parse(data);
            that.guests = data;
        })
        .error(function (data) {
            alert('Error reading guests.json');
        });



}]);
