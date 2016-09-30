angular.module('starter.services', [])

.factory('MenusFactory', function($resource, $q) {

	var baseURL = "http://localhost:3000/api";

  return {
    all: function() {
			var menusResource = $resource(baseURL + '/menus');
			var menus = $q.defer();
			menusResource.query({}, function (data){
				menus.resolve(data);
			});
			return menus.promise;
    },
    get: function(menuId) {
			var itemResource = $resource(baseURL + '/menus/:itemId');
			var item = $q.defer();
			itemResource.get({itemId:menuId}, function(data){
				item.resolve(data);
			});

      return item.promise;
    }
  };
})


.factory('OrdersFactory', function($resource, $q) {
	var table = '';
	var baseURL = "http://localhost:3000/api";
  return {
		table: table,
    order: function(newOrder) {
			var orderResource = $resource(baseURL + '/order2s');
			var _order = $q.defer();
			orderResource.save(newOrder, function(data){
				_order.resolve(data);
			}, function(err){
				console.error(err);
			});

      return _order.promise;
    }
  };
})

.factory('CallsFactory', function($resource, $q) {
	var baseURL = "http://localhost:3000/api";

	function callTheWaiter(table){
		var callResource = $resource(baseURL + '/calls');
		var call = $q.defer();
		callResource.save({table:table}, function(data){
			console.log('received: ' + data);
			call.resolve(data);
		}, function(err){
			console.error(err);
		});
		return call.promise;
	}

  return {
    callTheWaiter: callTheWaiter
  };
})

.factory('BillFactory', function($resource, $q) {

	var baseURL = "http://localhost:3000";

	function getBill(table) {
		var itemResource = $resource(baseURL + '/checkbill/:table');
		var bill = $q.defer();
		itemResource.query({table:table}, function(data){
			bill.resolve(data);
		});

		return bill.promise;
	}

  return {
		askTheBill: getBill
  };
});
