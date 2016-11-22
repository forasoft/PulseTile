let _ = require('lodash');

class ServiceRequests {

    constructor ($http) {
        this.evCache = {};
        this.cbCache = {};
        this.debug = false;
    
        this.publisher = function(eventName, data) {
            if (this.debug) { console.log('PUBLISH', eventName, data); }
    
            this.evCache[eventName] = this.evCache[eventName] || {
                  cache: undefined,
                  uids: []
              };
    
            _.forEach(this.evCache[eventName].uids, function (uid) {
                this.cbCache[uid].fn(data, this.evCache[eventName].cache)
            }.bind(this));
    
            this.evCache[eventName].cache = data;
    
        };
    
        this.subscriber = function(eventName, callback) {
            if (this.debug) { console.log('SUBSCRIBE', eventName, callback); }
    
            if (!(eventName && callback)) {
                throw new Error();
            }
    
            var uid = _.uniqueId(eventName);
    
            this.evCache[eventName] = this.evCache[eventName] || {
                  cache: undefined,
                  uids: []
              };
            this.evCache[eventName].uids.push(uid);
            this.cbCache[uid] = {fn: callback, eventName: eventName};
    
            return uid;
    
        };

        this.initialise = function() {
            var options = {
                method: 'GET',
                url: '/api/initialise',
                dataType: 'json'
            };
            return $http(options);
        };
    }
}

ServiceRequests.$inject = ['$http'];
export default ServiceRequests;