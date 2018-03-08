/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'mbe/mbe', 'moment', 'ojs/ojlistview', 'ojs/ojcollectiontabledatasource', 'ojs/ojmodel', 'ojs/ojbutton', 'ojs/ojradioset'],
 function(oj, ko, $, mbe, moment) {
  
    function OrderViewModel() {
      var self = this;
      self.coffeeCart = ko.observable("1");
      var coffeeCart = self.coffeeCart();
			
			var model = oj.Model.extend({
	      idAttribute: 'id',
        url: 'CoffeeCartAPI/orders',
        sync: mbe.mcsSync
	    });
	    var collectionDef = oj.Collection.extend({
	      url: 'CoffeeCartAPI/orders?coffeeCart=' + coffeeCart,
	      model: model,
	      sync: mbe.mcsSync,
        comparator : 'createdOn',
        sortDirection : -1,
        parse: function (result) {
          return result.orders;
        }
	    });

			self.collection = new collectionDef();
   	 	self.collectionObservable = ko.observable(self.collection);
    	self.dataSource = new oj.CollectionTableDataSource(self.collectionObservable());

      self.completeOrder = function (data) {
        model = self.collection.get(data.id);  
        model.save({
          'status': 'ordered'
        }); 
      }

      self.formatDate = function (date) {
        return moment(date).fromNow();
      }
      
      self.refresh = function () {

        coffeeCart = self.coffeeCart();
        console.log(self.coffeeCart());
        self.collection.url = 'CoffeeCartAPI/orders?coffeeCart=' + coffeeCart;
        self.collection.reset();
       
      }

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new OrderViewModel();
  }
);
