angular.module('starter.controllers', [])

.controller('TableCtrl', function($scope, $ionicPopup, OrdersFactory) {

	$scope.setTable = function (table){
		$scope.data = {};
		var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.table">',
    title: 'Enter your table',
    subTitle: 'Please confirm your table number',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.table) {
            e.preventDefault();
          } else {
						OrdersFactory.table = $scope.data.table;
            return $scope.data.table;
          }//else
        }//onTap
      }
    ]//buttons
	});//.show

};// setTable
}) //DashCtrl

.controller('MenusCtrl', function($scope, MenusFactory) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
	var menus = MenusFactory.all();
	menus.then (function (data){
			$scope.menus = data;
	}, function(err){
		console.error(err);
	});

})

.controller('MenuDetailCtrl',	function($scope, $stateParams, MenusFactory, OrdersFactory, $ionicPopup) {
	var menu = MenusFactory.get($stateParams.menuId);
	menu.then(function(data){
		$scope.menu = data;
	});
	$scope.table = OrdersFactory.table;
	$scope.order = order;

	function order (menu, table){
		$scope.data = {};
		var myPopup = $ionicPopup.show({
		template: '<input type="text" ng-model="data.qty">',
		title: 'Enter the quantity',
		subTitle: 'How many of these?',
		scope: $scope,
		buttons: [
			{ text: 'Cancel' },
			{
				text: '<b>Ok</b>',
				type: 'button-positive',
				onTap: function(e) {
					if (!$scope.data.qty) {
						e.preventDefault();
					} else {
						processOrder(menu, table, $scope.data.qty);
						return $scope.data.qty;
					}//else
				}//onTap
			}
		]//buttons
	});//.show
	}

	function processOrder(menu, table, qty){
		var newOrder = {
	    qty: $scope.data.qty,
	    table: table,
	    item: menu
  	};
		OrdersFactory.order(newOrder).then(function(data){
		}, function(err){
			console.error(err);
		});
	}
}) //MenuDetailCtrl

.controller('BillAndWaiterCtrl', function($scope, CallsFactory, OrdersFactory, BillFactory) {
	$scope.callTheWaiter = callTheWaiter;
	$scope.askTheBill = askTheBill;
	$scope.bill = {};
	askTheBill();

	function callTheWaiter(){
		var table = OrdersFactory.table;
		var call = CallsFactory.callTheWaiter(table);
		call.then(function (data){
			//console.log(JSON.stringify(data));
		}, function (err){
			console.error(err);
		});
	}

	function askTheBill(){
		var table = OrdersFactory.table;
		var bill = BillFactory.askTheBill(table);
		if (table === undefined || table === null || table.length === 0) {
			console.log('table está vazia. saindo...' + table);
			return;
		}else {
			console.log('chamando pra table' + table );
		}
		bill.then(function(data){
			$scope.total = data[0].total;
			$scope.bill = data[1].bill;
		}, function(err){
			console.error(err);
		});
	}
});
