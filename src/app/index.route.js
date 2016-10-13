routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/search');
  console.log('routing test');
  $stateProvider
      .state('main-search', {
        url: '/search',
        views: {
          main: {template: '<search-component><search-component>'}
        }
      })
      .state('patients-charts', {
        url: '/charts',
        views: {
          main: {template: '<patients-charts-component><patients-charts-component>'}
        }
      })
      .state('patients-list', {
        url: '/patients?ageRange&department&order&reverse',
        views: {
          main: {template: '<patients-component><patients-component>'}
        },
        params: { patientsList: [], advancedSearchParams: [], displayEmptyTable: false }
      })
      .state('patients-summary', {
        url: '/patients/{patientId:int}/patients-summary?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<patients-summary-component><patients-summary-component>'}
        },
        params: {patientId: null, patientsList: null }
      })
      .state('search-report', {
        url: '/search-report?searchString',
        views: {
          main: {template: '<report-chart-component><report-chart-component>'}
        }
      })
      .state('patients-list-full', {
        url: '/patients-full-details?ageFrom&ageTo&orderType&pageNumber&reportType&searchString&queryType',
        views: {
          main: {template: '<patients-list-full-component><patients-list-full-component>'}
        }
      })
      .state('diagnoses-list', {
        url: '/patients/{patientId:int}/diagnoses?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<diagnoses-list-component></diagnoses-list-component>'}
        },
        params: {patientId: null, reportType: null}
      })
      .state('diagnoses-detail', {
        url: '/patients/{patientId:int}/diagnoses/{diagnosisIndex}?filter&page&reportType&searchString&queryType&source',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<diagnoses-list-component></diagnoses-list-component>'},
          detail: {template: '<diagnoses-detail-component></diagnoses-detail-component>'}
        },
        params: {patientId: null, reportType: null, diagnosisIndex: null}
      })
      .state('allergies', {
        url: '/patients/{patientId:int}/allergies?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<allergies-list-component></allergies-list-component>'}
        },
        params: {patientId: null, reportType: null}
      })
      .state('allergies-detail', {
        url: '/patients/{patientId:int}/allergies/{allergyIndex}?filter&page&reportType&searchString&queryType&source',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<allergies-list-component></allergies-list-component>'},
          detail: {template: '<allergies-detail-component></allergies-detail-component>'}
        },
        params: {patientId: null, reportType: null, allergyIndex: null}
      })
      .state('medications', {
        url: '/patients/{patientId:int}/medications?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<medications-list-component></medications-list-component>'}
        },
        params: {patientId: null, reportType: null}
      })
      .state('medications-detail', {
        url: '/patients/{patientId:int}/medications/{medicationIndex}?filter&page&reportType&searchString&queryType&source',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<medications-list-component></medications-list-component>'},
          detail: {template: '<medications-detail-component></medications-detail-component>'}
        },
        params: {patientId: null, reportType: null, medicationIndex: null}
      })
      .state('contacts', {
        url: '/patients/{patientId:int}/contacts?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<contacts-list-component></contacts-list-component>'}
        }
      })

      .state('contacts-detail', {
        url: '/patients/{patientId:int}/contacts/{contactIndex}?filter&page&reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<contacts-list-component></contacts-list-component>'},
          detail: {template: '<contacts-detail-component></contacts-detail-component>'}
        }
      })

      .state('orders', {
        url: '/patients/{patientId:int}/orders?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<orders-list-component></orders-list-component>'}
        }
      })

      .state('orders-detail', {
        url: '/patients/{patientId:int}/orders/{orderId}?filter&page&reportType&searchString&queryType&source',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<orders-list-component></orders-list-component>'},
          detail: {template: '<orders-detail-component></orders-detail-component>'}
        }
      });
}

export default routeConfig;