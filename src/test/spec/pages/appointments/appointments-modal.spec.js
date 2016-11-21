'use strict';
import AppointmentsModal from '../../../../app/rippleui/pages/appointments/appointments-modal';
import '../../../../app/index';

describe('Appointments Modal', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, controller, uibModal, appointmentsActions, ngRedux, stateParams;

    beforeEach(inject(($injector, $controller, _$uibModal_, _appointmentsActions_, _$ngRedux_, _$stateParams_) => {
        controller = $controller;
        scope = $injector.get('AppointmentsModal');
        uibModal = _$uibModal_;
        ngRedux = _$ngRedux_;
        stateParams = _$stateParams_;
        appointmentsActions = _appointmentsActions_;
    }));

    it('Appointments Modal component exist', function() {
        expect(AppointmentsModal).toBeDefined();
    });
});