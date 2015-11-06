describe('services', function(){

    var mockGuestData = [
        {
            "name": "Frodo Baggins",
            "transitionDate": "2015-10-02T04:00:00.000Z",
            "status": "dropoff",
            "pickupLocation": "Shire"
        }
    ];

    beforeEach(function(){
        module('shuffling');
    });


    /**
     * shufflingSvc tests
     */
    describe('shufflingSvc', function(){
        var shufflingSvc, guestDataSvc;
        beforeEach(function(){

            // Mock GuestDataSvc
            module(function($provide){
                $provide.service('GuestDataSvc', function(){
                    var that = this;
                    that.guests = [];
                    this.getGuestData = function(){
                        that.guests =  mockGuestData;
                        return that.guests;
                    };

                    this.saveGuestData = function(guestData){
                    // do nothing
                    };
                });
            });

            inject(function($injector){
                shufflingSvc = $injector.get('shufflingSvc');
                guestDataSvc = $injector.get('GuestDataSvc');
            });

        });


        it('should invoke GuestDataSvc.getGuestData() to initialize guests array', function(){
            //console.log(shufflingSvc.guests.length, ' --> ',shufflingSvc.guests);
            //console.log(guestDataSvc.guests.length, ' --> ', guestDataSvc.guests);
            expect(shufflingSvc.guests.length).toBe(1);
            expect(shufflingSvc.guests[0].name).toBe(mockGuestData[0].name);

        });

        it('should add new guest to guest array and invoke guestDataSvc.saveGuestData', function(){
            spyOn(guestDataSvc, 'saveGuestData');
            expect(shufflingSvc.guests.length).toBe(1);
            shufflingSvc.addGuest('Peregrin Took', new Date(), 'dropoff', 'Mordor');
            expect(shufflingSvc.guests.length).toBe(2);
            expect(shufflingSvc.guests[1].name).toBe('Peregrin Took');
            expect(guestDataSvc.saveGuestData).toHaveBeenCalled();
        });

        it('should show confirm message on delete', function(){

            spyOn(window, 'confirm');
            shufflingSvc.deleteGuest(0);
            expect(window.confirm).toHaveBeenCalled();

        });

        it('should delete guest from guest array on confirmation', function(){

            // Add a guest
            shufflingSvc.addGuest('Peregrin Took', new Date(), 'dropoff', 'Mordor');
            var initial = shufflingSvc.guests.length;

            spyOn(window, 'confirm').and.callFake(function(){
                return true;
            });
            //delete a guest
            shufflingSvc.deleteGuest(0);

            expect(shufflingSvc.guests.length).toBe(initial-1);

        });

        it('should not delete guest from guest array without confirmation', function(){

            // Add a guest
            shufflingSvc.addGuest('Peregrin Took', new Date(), 'dropoff', 'Mordor');
            var initial = shufflingSvc.guests.length;

            spyOn(window, 'confirm').and.callFake(function(){
                return false;
            });
            //delete a guest
            shufflingSvc.deleteGuest(0);

            expect(shufflingSvc.guests.length).toBe(initial);

        });

        it('should invoke guestDataSvc.saveGuestData on delete ', function(){

            // Add a guest
            shufflingSvc.addGuest('Peregrin Took', new Date(), 'dropoff', 'Mordor');

            spyOn(guestDataSvc, 'saveGuestData');
            spyOn(window, 'confirm').and.callFake(function(){
                return true;
            });

            //delete a guest
            shufflingSvc.deleteGuest(0);

            expect(guestDataSvc.saveGuestData).toHaveBeenCalled();

        });


    });

    /**
     * GuestDataSvc Tests
     */
    describe('GuestDataSvc', function(){

        var GuestDataSvc;
        beforeEach(function(){
            inject(function($injector){
                GuestDataSvc = $injector.get('GuestDataSvc');
            });
        });


        it('should init from local storage', function(){
            spyOn(localStorage, 'getItem').and.callFake(function(){
                return JSON.stringify(mockGuestData);
            });

            GuestDataSvc.getGuestData();
            expect(localStorage.getItem).toHaveBeenCalledWith('guests');
        });

        it('should have sample data if local storage is empty', function(){
            spyOn(localStorage, 'getItem').and.callFake(function(){
                return JSON.stringify([]);
            });

            var response = GuestDataSvc.getGuestData();
            expect(localStorage.getItem).toHaveBeenCalledWith('guests');
            expect(response.length).toBe(2);
        });
    });

});