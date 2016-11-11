let templateHomeSidebar= require('./home-sidebar.html');

class HomeSidebarController {
    constructor($scope, $state, LookupModal, serviceRequests) {
        serviceRequests.publisher('headerTitle', {title: 'Patients Lookup'});
        LookupModal.openModal();
    }
}

const HomeSidebarComponent = {
    template: templateHomeSidebar,
    controller: HomeSidebarController
};

HomeSidebarController.$inject = ['$scope', '$state', 'LookupModal', 'serviceRequests'];
export default HomeSidebarComponent;