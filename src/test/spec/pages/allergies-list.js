'use strict';

describe('Allergies Module', function() {

  describe('Allergies List Component', function() {
    var element;
    var scope;
    var controller;

    beforeEach(inject(function($rootScope, $compile){
      scope = $rootScope.$new();
      element = angular.element('<allergies-list-component></allergies-list-component>');
      element = $compile(element)(scope);
      controller = element.controller('allergiesListComponent');
      scope.$apply();
    }));

    it('Find component', function() {
      expect(element).toBeDefined();
    });

    it('Component container', function() {
      var container = element.find('.rwd-table');
        expect(container).toBeDefined();
    });
  });

});