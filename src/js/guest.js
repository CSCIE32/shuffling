angular.module('shuffling').factory('Guest', function(){
    var Guest = function(name, transitionDate, status, pickupLocation){
        this.name = name;
        this.transitionDate = new Date(transitionDate);
        this.status = status;
        this.pickupLocation = pickupLocation;
    };

    return Guest;

});
