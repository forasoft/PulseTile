let templatePatients = require('./patients-list.html');

class PatientsController {
    constructor($state, ServiceRequest) {
        
        let self = this;
        this.patients = [];
        this.pages = 0;

        this.loadPatients = function () {
            ServiceRequest.getData().then(function (response) {
                self.patients = response.data;
                self.pages = self.patients.length / 10;
            },function (error) {
                console.log('error', error );
            });
        };
        this.loadPatients();
    }
}

const PatientsComponent = {
    template: templatePatients,

    controller: PatientsController
};

PatientsController.$inject = ['$state', 'serviceRequest'];
export default PatientsComponent;