/**
 * Tests verify whether the controllers invoke appropriate service methods
 */
describe('controllers', function(){

    beforeEach(angular.mock.module('shuffling'));
    beforeEach(function(){
        module(function($provide){
            $provide.service('shufflingSvc', function(){
                var that = this;
                that.guests = [];
                that.getGuestList = function(){
                    //do nothing
                };
                that.addGuest = function (name, transitionDate, status, pickupLocation){
                    //do nothing
                };
                that.deleteGuest = function (index){
                    //do nothing
                };
                that.editGuest = function (index) {
                    //do nothing
                };

            });
        });
    });
    describe('FormController', function(){

        var formController, shufflingSvc;
        var guestsTab;
        beforeEach(angular.mock.inject(function($controller, $rootScope, $injector, $compile){
            scope = $rootScope.$new();
            formController = $controller('FormController', {$scope: scope});
            shufflingSvc = $injector.get('shufflingSvc');

            guestsTab = angular.element('<div id="guestsTab"></div>');
            $compile(guestsTab)($rootScope);
            $rootScope.$digest();

        }));

        it('should invoke shufflingSvc on submit', function(){
            spyOn(shufflingSvc, 'addGuest');

            formController.name="Bilbo Baggins";
            formController.transitionDate = new Date();
            formController.status= "dropoff";
            formController.pickupLocation = "Shire";
            formController.submit();

            expect(shufflingSvc.addGuest).toHaveBeenCalled();

        });

        it('should clean up the form after submit', function(){
            formController.name="Bilbo Baggins";
            formController.transitionDate = new Date();
            formController.status= "dropoff";
            formController.pickupLocation = "Shire";
            formController.submit();

            expect(formController.name).toBe(null);
            expect(formController.transitionDate).toBe(null);
            expect(formController.status).toBe(null);
            expect(formController.pickupLocation).toBe(null);
        });

        //Ignoring as its neither complete nor working !!!
        xit('should switch to guest list page after submit', function () {
            formController.name="Bilbo Baggins";
            formController.transitionDate = new Date();
            formController.status= "dropoff";
            formController.pickupLocation = "Shire";
            formController.submit();

            expect(guestsTab.hasClass("active")).toBeTruthy();

        });


    });

    describe('TabController', function(){

        var tabController, shufflingSvc;

        beforeEach(angular.mock.inject(function($controller, $rootScope, $injector){
            scope = $rootScope.$new();
            tabController = $controller('TabController', {$scope: scope});
            shufflingSvc = $injector.get('shufflingSvc');
            $rootScope.$digest();
        }));

        it('should invoke shufflingSvc.getGuestList on getGuestList ', function(){
            spyOn(shufflingSvc, 'getGuestList');
            tabController.getGuestList();

            expect(shufflingSvc.getGuestList).toHaveBeenCalled();
        });

        it('should invoke shufflingSvc.deleteGuest on deleteGuest ', function(){
            spyOn(shufflingSvc, 'deleteGuest');
            tabController.deleteGuest(1);

            expect(shufflingSvc.deleteGuest).toHaveBeenCalledWith(1);
        });

        it('should invoke shufflingSvc.editGuest on editGuest ', function(){
            spyOn(shufflingSvc, 'editGuest');
            tabController.editGuest(1);

            expect(shufflingSvc.editGuest).toHaveBeenCalledWith(1);
        });

        it('should have option to change status from dropoff to arrived', function(){
            var options = tabController.availableOptions('dropoff');
            expect(options.indexOf('arrived')).toBeGreaterThan(-1);
        });

        it('should have option to change status from pickup to arrived', function(){
            var options = tabController.availableOptions('pickup');
            expect(options.indexOf('arrived')).toBeGreaterThan(-1);
        });

        it('should have option to change status from arrived to pickup', function(){
            var options = tabController.availableOptions('arrived');
            expect(options.indexOf('pickup')).toBeGreaterThan(-1);
        });
    });
});