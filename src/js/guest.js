angular.module('shuffling').factory('Guest', function(){
    var Guest = function(name, transitionDate, pickupLocation){
        this.name = name;
        this.transitionDate = transitionDate;
        this.pickupLocation = pickupLocation;
    };

    return Guest;

});
