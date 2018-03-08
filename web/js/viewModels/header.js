define(['knockout', 'ojs/ojcore', 'appController', 'ojs/ojknockout', 'ojs/ojnavigationlist', 'ojs/ojarraytabledatasource'], function (ko, oj, app) {
 	// Media queries for repsonsive layouts
  var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
  self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
  var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
  self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

  // Navigation
  var navData = [{
    name: 'Current Orders', id: 'dashboard',
    iconClass: 'fa fa-home oj-navigationlist-item-icon'
  },{
    name: 'Registrations', id: 'registrations',
    iconClass: 'fa fa-address-book oj-navigationlist-item-icon'
  },{
  	name: 'All Orders', id: 'orders',
  	iconClass: 'fa fa-coffee oj-navigationlist-item-icon'
  }];
  self.dataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});
  self.selectedNavItem = ko.computed(function () {
  	return app.router.currentState().id;
  })


  self.menuChange = function (event, data) {
	  app.router.go(data.value);
	};
  
});