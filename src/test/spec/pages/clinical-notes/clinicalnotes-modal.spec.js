'use strict';
import ClinicalnotesModal from '../../../../app/rippleui/pages/clinical-notes/clinicalnotes-modal';
import '../../../../app/index';

describe('Clinicalnotes Modal', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, controller, uibModal, clinicalnotesActions, ngRedux, stateParams;

    beforeEach(inject(($injector, $controller, _$uibModal_, _clinicalnotesActions_, _$ngRedux_, _$stateParams_) => {
        controller = $controller;
        scope = $injector.get('ClinicalnotesModal');
        uibModal = _$uibModal_;
        ngRedux = _$ngRedux_;
        stateParams = _$stateParams_;
        clinicalnotesActions = _clinicalnotesActions_;
    }));

    it('Clinicalnotes Modal component exist', function() {
        expect(ClinicalnotesModal).toBeDefined();
    });
});