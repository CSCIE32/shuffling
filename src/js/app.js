var app = angular.module('shuffling', []);

app.controller('FormController', ['$scope', 'shufflingSvc', function ($scope, shufflingSvc) {
    var vm = this;

    /**
     * On form submit
     */
    vm.submit = function () {
        console.log('FormController.submit()');
        shufflingSvc.addGuest(vm.name, vm.transitionDate, vm.status, vm.pickupLocation);

        //Clean up the form
        vm.name=null;
        vm.transitionDate=null;
        vm.pickupLocation = null;
        vm.status = null;

        // Switch to guests tab
        angular.element('#guests').addClass("active");
        angular.element('#guestsTab').addClass("active");
        angular.element('#form').removeClass("active");
        angular.element('#formTab').removeClass("active");
    };

}]);

app.controller('TabController', ['$scope', 'shufflingSvc', function ($scope, shufflingSvc) {
    var vm = this;

    /**
     * Get guest list
     */
    vm.getGuestList = function () {
        console.log('TabController.getGuestList()');
        return shufflingSvc.getGuestList();
    };

    /**
     * Delete Guest
     * @param index
     */
    vm.deleteGuest = function(index){
        console.log('TabController.deleteGuest()');
        shufflingSvc.deleteGuest(index);
    };

    /**
     * Edit guest
     * @param index
     */
    vm.editGuest = function(index){
        shufflingSvc.editGuest(index);
    };

    /**
     * Compute available options based on current status
     * @param status
     * @returns {Array}
     */
    vm.availableOptions = function(status){
        var options = [];
        options.push(status);
        if('dropoff' === status || 'pickup' === status){
            options.push('arrived');
        }
        if('arrived' === status ){
            options.push('picked');
        }
        return options;
    };

}]);

app.service('shufflingSvc', ['Guest', 'GuestDataSvc', function (Guest,GuestDataSvc) {
    var that = this;

    /**
     * All guest data
     */
    var guests = GuestDataSvc.getGuestData();

    /**
     * Return all guest data
     */
    this.getGuestList = function () {
        return guests ;
    };

    /**
     * Add a new guest
     * @param name
     * @param transitionDate
     * @param status
     * @param pickupLocation
     */
    this.addGuest = function (name, transitionDate, status, pickupLocation) {
        console.log('shufflingSvc.addGuest()');
        guests.push(new Guest(name, transitionDate, status, pickupLocation));
        GuestDataSvc.saveGuestData(guests);
    };

    /**
     * delete a guest
     * @param index
     */
    this.deleteGuest = function (index) {
        console.log('shufflingSvc.deleteGuest()');
        var proceed = confirm("Do you want to delete guest: "+ guests[index].name+ "?");
        if(proceed) {
            guests.splice(index, 1);
            GuestDataSvc.saveGuestData(guests);
        }
    };

    /**
     * edit a guest
     * @param index
     */
    this.editGuest = function (index) {
        if(undefined == guests[index].checked){
            guests[index].checked =  true;
        } else{
            guests[index].checked = !guests[index].checked;
        }
        GuestDataSvc.saveGuestData(guests);
    };

}]);
