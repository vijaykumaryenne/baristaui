define(['jquery', 'mcs'], function ($, mcs) {

  var mcs_config = {
            "logLevel": 2,
            "mobileBackends": {
                "CoffeeCartAPI": {
                "default": true,
                "baseUrl": "https://omcedevcore-gse00013705.uscom-east-1.oraclecloud.com:443",
                "applicationKey": "018c6f7b-ccee-48b6-8e76-db811b82f39c",
                    "authorization": {
                        "basicAuth": {
                        "backendId": "0c591333-6972-4651-af3a-2f2cafbec6d9",
                        "anonymousToken": "RkU3MTZDNzMwNDEyNDhDQTk4RjNBQzBCMDUxRDk0QTZfTW9iaWxlQW5vbnltb3VzX0FQUElEOjhiOWJlZTljLTE5NWUtNDFhZi05OWMwLWYyODhkN2Q5MjBiNQ=="
                        }
                    }
                }
            }
        };

  function MobileBackend() {
    var self = this;
    self.mobileBackend;
    function init() {
      mcs.MobileBackendManager.platform = new mcs.BrowserPlatform();
      mcs.MobileBackendManager.setConfig(mcs_config);
      //MCS backend name for example is JETSample.
      self.mobileBackend = mcs.MobileBackendManager.getMobileBackend('CoffeeCartAPI');
      self.mobileBackend.setAuthenticationType("basicAuth");
    }

    //Handles the success and failure callbacks defined here
    //Not using anonymous login for this example but including here.
    self.authAnonymous = function () {
      console.log("Authenticating anonymously");
      var deferred = $.Deferred();
      self.mobileBackend.Authorization.authenticateAnonymous(
        function (response, data) {
          console.log("Success authenticating against mobile backend");
          deferred.resolve();
        },
        function (statusCode, data) {
          console.log("Failure authenticating against mobile backend");
          deferred.reject();
        }
      );
      return deferred.promise();
    };

    self.mcsSync = function (method, model, options) {

      var httpUrl, httpVerb, httpPayload = null;
      switch (method) {
        case "read":
          httpUrl = (model instanceof oj.Model) ? model.url + "/" + model.id : model.url;
          httpVerb = "GET";
          httpPayload = null;
          break;
        case "create":
          // httpUrl - adding id to URL depends on what's supported by the service
          httpVerb = "POST";
          httpPayload = model.toJSON();
          break;
        case "patch":
        case "update":
        case "delete":
          httpUrl = (model instanceof oj.Model) ? model.url + "/" + model.id : model.url;
          if (method == "patch")       httpVerb = "PATCH";
          else if (method == "update") httpVerb = "PUT";
          else if (method == "delete") httpVerb = "DELETE";
          if (method != "delete")
            httpPayload = model.toJSON();
          break;
      }
      console.log("Executing ", httpUrl, httpVerb, httpPayload);

      self.invokeCustomAPI(httpUrl, httpVerb, httpPayload).then(function(data) {
        options.success(data, null, options);
      }, function(statusCode, data) {
        options.error(data, null, options);
      });

      return [];
    };

    self.getCurrentUser = function() {
      var deferred = $.Deferred();
      self.mobileBackend.Authorization.getCurrentUser(function(statusCode, data) {
        deferred.resolve(data);
      }, function(statusCode, data) {
        deferred.reject(statusCode, data);
      });
      return deferred.promise();
    };

    self.invokeCustomAPI = function(uri,method,payload) {
      var deferred = $.Deferred();
      self.mobileBackend.CustomCode.invokeCustomCodeJSONRequest(uri , method , payload, function(statusCode,data) {
        deferred.resolve(data);
      }, function(statusCode,data) {
        deferred.reject(statusCode, data);
      });
      return deferred.promise();
    };

    //This handles success and failure callbacks using parameters (unlike the authAnonymous example)
    self.authenticate = function (username, password, successCallback, failureCallback) {
      self.mobileBackend.Authorization.authenticate(username, password, successCallback, failureCallback);
    };

    //this handles success and failure callbacks using parameters
    self.logout = function (successCallback, failureCallback) {
      self.mobileBackend.Authorization.logout();
    };

    self.isAuthorized = function () {
      return self.mobileBackend.Authorization.isAuthorized;
    };

    init();
  }

  return new MobileBackend();
});
