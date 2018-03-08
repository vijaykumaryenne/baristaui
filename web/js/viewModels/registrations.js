define(['knockout', 'ojs/ojcore', 'ojs/ojknockout', 'mbe/mbe', 'moment', 'ojs/ojtable', 'ojs/ojcollectiontabledatasource', 'ojs/ojmodel'], function (ko, oj, app, mbe, moment) {
  function RegistrationViewModel() {
    var self = this;
  
    var model = oj.Model.extend({
      idAttribute: 'id'
    });
    var collectionDef = oj.Collection.extend({
      url: 'CoffeeServices/registrations',
      model: model,
      sync: mbe.mcsSync,
      comparator : 'createdOn',
      sortDirection : -1,
      parse: function (result) {
        return result.registrations;
      }
    });
    self.collection = new collectionDef();
    self.collectionObservable = ko.observable(self.collection);
    self.dataSource = new oj.CollectionTableDataSource(self.collectionObservable());

    self.formatDate = function (date) {
      return moment(date.data).format('MMMM Do YYYY, h:mm:ss a');
    }
  }
  return new RegistrationViewModel();

});
