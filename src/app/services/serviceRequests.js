class ServiceRequests {

    constructor ($http) {
        this.getData = function() {
            var options = {
                method: 'GET',
                url: '/api/patients',
                dataType: 'json'
            };
            
            
            return $http(options);
        };

    }

}

ServiceRequests.$inject = ['$http'];
export default ServiceRequests;