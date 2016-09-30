let templateHome = require('./home.html');

class HomeController {
  constructor($scope, $state, $window, patientsActions, $ngRedux) {
          console.log('$window.Morris', $window.Morris);
    var ageChart = function (summaries) {
      $window.Morris.Bar({
        element: 'age-chart',
        resize: true,
        data: summaries.age,
        ykeys: ['value'],
        xkey: 'series',
        labels: ['Patients'],
        barColors: ['#7E28CD'],
        ymin: 0,
        ymax: 46,
        barGap: 4,
        barSizeRatio: 0.55,
        xLabelAngle: 50,
        redraw: true
      });
    };

    var departmentChart = function (summaries) {
      $window.Morris.Bar({
        element: 'department-chart',
        resize: true,
        data: summaries.department,
        ykeys: ['value'],
        xkey: 'series',
        labels: ['Patients'],
        hideHover: true,
        barColors: ['#25A174'],
        ymin: 0,
        ymax: 40,
        barGap: 4,
        barSizeRatio: 0.55,
        xLabelAngle: 50,
        redraw: true
      });
    };

    var self = this;

    var swapArrayElements = function (arr, indexA, indexB) {
      var temp = arr[indexA];
      arr[indexA] = arr[indexB];
      arr[indexB] = temp;
    };

    let _ = require('underscore');

    this.goToPatientsList = function () {
      $state.go('patients');
    };

    this.getPatients = function (patients) {
      var summaries = {};

        summaries.age = _.chain(patients)
          .filter(function (patient) {
            return !!patient.age;
          })
          .countBy(function (patient) {
            return patient.ageRange;
          })
          .map(function (value, key) {
            return {
              series: key,
              value: value
            };
          })

        .reverse()
          .value();

        swapArrayElements(summaries.age, 3, 4);

        summaries.department = _.chain(patients)
          .filter(function (patient) {
            return !!patient.department;
          })
          .countBy(function (patient) {
            return patient.department;
          })
          .map(function (value, key) {
            return {
              series: key,
              value: value
            };
          })
          .sortBy(function (value) {
            return value.department;
          })
          .value();

        // if (this.selectedChart === 'age') {
        //   ageChart(summaries);
        // }
        // else {
        //   departmentChart(summaries);
        // }

        return summaries;
    };

    // Clear previous chart
    this.toggleChart = function () {
      angular.element(document.querySelector('#age-chart')).empty();
      angular.element(document.querySelector('#department-chart')).empty();
      angular.element(document.querySelector('#age-chart')).off('click');
      angular.element(document.querySelector('#department-chart')).off('click');

      let unsubscribe = $ngRedux.connect(state => ({
        setPatients: self.getPatients(state.patients.data)
      }))(this);

      $scope.$on('$destroy', unsubscribe);
      this.loadPatientsList = patientsActions.loadPatients;
      this.loadPatientsList();
    };

    // Selected chart on page load
    this.selectedChart = 'age';
    this.toggleChart();
  }
}

const HomeComponent = {
  template: templateHome,
  controller: HomeController
};

HomeController.$inject = ['$scope', '$state', '$window', 'patientsActions', '$ngRedux'];
export default HomeComponent;
