angular.module('shuffling').service('GuestDataSvc', function(){

    var that = this;
    that.guests = [];
    var sampleGuestData = [
        {
            "name": "Bilbo Baggins",
            "transitionDate": "2015-10-02T04:00:00.000Z",
            "status": "dropoff",
            "pickupLocation": "Shire"
        },
        {
            "name": "Tom Bombadil",
            "transitionDate": "2015-10-02T04:00:00.000Z",
            "status": "pickup",
            "pickupLocation": "Prancing Pony Inn"
        }
    ];
    /**
     * Get guest data from local storage
     * @returns {Array|*}
     */
    this.getGuestData = function(){
        console.log(localStorage.getItem('guests'));
        var jsonGuests = JSON.parse(localStorage.getItem('guests'));

        if(jsonGuests!== null){
            jsonGuests.forEach(function(guest){
                guest.transitionDate = new Date(guest.transitionDate);
                that.guests.push(guest);
            });

        }

        // If no data in local storage use sample data
        if(that.guests.length === 0){
            sampleGuestData.forEach(function(sampleGuest){
                sampleGuest.transitionDate = new Date(sampleGuest.transitionDate);
                that.guests.push(sampleGuest);
            });
        }

        return that.guests;
    };


    /**
     * Save guest data to local storage
     * @param guestData
     */
    this.saveGuestData = function(guestData){
        localStorage.setItem('guests', JSON.stringify(guestData));
    };

});