angular.module('shuffling').service('GuestDataSvc', function(){

    /**
     * Get guest data from local storage
     * @returns {Array|*}
     */
    this.getGuestData = function(){
        var guests = [];
        var jsonGuests = JSON.parse(localStorage.getItem('guests'));

        if(jsonGuests!= null){
            jsonGuests.forEach(function(guest){
                guest.transitionDate = new Date(guest.transitionDate);
                guests.push(guest);
            });

        }
        return guests;
    };


    /**
     * Save guest data to local storage
     * @param guestData
     */
    this.saveGuestData = function(guestData){
        localStorage.setItem('guests', JSON.stringify(guestData));
    };

});