define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout'], function(oj, ko) {
	function ControllerViewModel() {
		var self = this;
    // Media queries for repsonsive layouts
    var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
    self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
    var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
    self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

     // Router setup
     self.router = oj.Router.rootInstance;
     self.router.configure({
       'dashboard': {label: 'Dashboard', isDefault: true},
       'registrations': {label: 'Registrations'},
       'orders': {label: 'All Orders'}
 		 });
    oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

	}

	return new ControllerViewModel();
});