var app = angular.module('myApp', ['ngGrid']);
app.controller('MyCtrl', function($scope) {
 $scope.myData = [{FullName: "Test1", age: 32, Address: "Address details 1"},
 {FullName: "Test2", age: 33, Address: "Address details 29"},
 {FullName: "Test3", age: 34, Address: "Address details 31"},
 {FullName: "Test4", age: 36, Address: "Address details 33"},
 {FullName: "Test5", age: 31, Address: "Address details 37"},
 {FullName: "Test6", age: 38, Address: "Address details 14"},
 {FullName: "Test7", age: 44, Address: "Address details 19"},
 {FullName: "Test8", age: 56, Address: "Address details 41"},
 {FullName: "Test9", age: 13, Address: "Address details 51"},
 {FullName: "Test10", age: 78, Address: "Address details 15"},
 {FullName: "Test11", age: 35, Address: "Address details 71"},
 {FullName: "Test12", age: 29, Address: "Address details 12"},];
 $scope.gridOptions = { data: 'myData' };
});
