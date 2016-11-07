let templatePatientsCharts = require('./patients-charts.html');

class PatientsChartsController {
  constructor($scope, $state, $window, patientsActions, $ngRedux, $uibModal, serviceRequests, $timeout, Patient) {
    serviceRequests.publisher('headerTitle', {title: 'Patient Dashboard'});
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-charts'});
    // Selected chart on page load
    this.selectedChart = 'age';
    var prevChartName = '';

    var openModal = function (row, chartType) {
      $uibModal.open({
        template: require('app/rippleui/confirmation.html'),
        size: 'md',
        controller: function ($scope) {
          $scope.cancel = function () {
            $scope.$close(true);
          };

          $scope.ok = function () {
            $scope.$close(true);

            switch (chartType) {
              case 'all':
                $state.go('patients-list');
                break;
              case 'age':
                $state.go('patients-list', { ageRange: row.series });
                break;
              case 'summary':
                if (row.series === 'All') {
                  row.series = null;
                }
                $state.go('patients-list', { department: row.series });
                break;
              default:
                $state.go('patients-list');
                break;
            }
          };
        }
      });
    };

    this.openModal = function (row, chartType) {
      openModal(row, chartType);
    };

    var ageChart = function (summaries) {
      $timeout(function () {
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
        }).on('click', function (i, row) {
          openModal(row, 'age');
        });
      }, 200);
    };

    var departmentChart = function (summaries) {
      $timeout(function () {
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
        }).on('click', function (i, row) {
          openModal(row, 'summary');
        });
      }, 200);
    };

    var self = this;

    var swapArrayElements = function (arr, indexA, indexB) {
      var temp = arr[indexA];
      arr[indexA] = arr[indexB];
      arr[indexB] = temp;
    };

    let _ = require('underscore');

    this.goToPatientsList = function () {
      $state.go('patients-list');
    };

    this.goToLookUp = function () {
      $state.go('patients-lookup');
    };

    this.getPatients = function (patients) {
      if (this.selectedChart !== prevChartName && patients) {
        prevChartName = this.selectedChart;
        var summaries = {};
        var changedPatients = [];

        angular.forEach(patients, function (patient) {
          var curPatient = new Patient.patient(patient);
          changedPatients.push(curPatient);
        });

        summaries.age = _.chain(changedPatients)
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

        summaries.department = _.chain(changedPatients)
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

        if (this.selectedChart === 'age') {
          ageChart(summaries);
        } else {
          departmentChart(summaries);
        }

        return summaries;
      } else {
        return true;
      }
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

    this.toggleChart();
  }
}

const PatientsChartsComponent = {
  template: templatePatientsCharts,
  controller: PatientsChartsController
};

PatientsChartsController.$inject = ['$scope', '$state', '$window', 'patientsActions', '$ngRedux', '$uibModal', 'serviceRequests', '$timeout', 'Patient'];
export default PatientsChartsComponent;
