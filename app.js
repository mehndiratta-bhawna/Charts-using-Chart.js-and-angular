angular.module('chartmodule',[]).controller('chartcontroller',function($scope)
{
$scope.data = [
    {
        value: 300.50,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Boxing"
    },
    {
        value: 50.90,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Shooting"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Wrestling"
    },
	{
        value: 100,
        color: "#0000FF",
        highlight: "#6495ED",
        label: "Chess"
    },
	{
        value: 100,
        color: "#000000",
        highlight: "#191970",
        label: "Cricket"
    },
	{
        value: 100,
        color: "#FF8C00",
        highlight: "#FF7F50",
        label: "Hockey"
    }	
];
$scope.totalvalue = getTotal($scope.data);

$scope.options = { 
//Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,
	animation: false,
    maintainAspectRatio: true,  
    segmentStrokeColor : "#fff",   
    segmentStrokeWidth :2,
    percentageInnerCutout : 70,
	labelAlign :'center'	,
	tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%=(value* 100/" + $scope.totalvalue + ").toFixed(2)%>"
	};	

});
function getTotal(data)
{ var total= 0;
 for(var i=0;i<data.length;i++)
 {
 total = total + data[i].value;
 }
 return total;
};
angular.module('chartmodule').directive('popOverChooser', function ($compile) {
var template1 = '<div><canvas id ="mychart" width="230px" height="225px">' + 
                '</canvas>' +                
                '<button id="clsbtn">Close</button></div>';			

    return {
        restrict: 'A',
        transclude: true,
        template: '<span ng-transclude></span>',
        link: function (scope, element, attrs) {
            var chooserContent = $compile(template1)(scope);			
            var options = {
                content: chooserContent,
                placement: 'right',
                html: true ,
                title : 'PieChart showing section occupied by each colour in percentage.'				
            };		
			$(element).popover(options).hover(function(e) { 			
			$(this).popover('show'); 
			    var ctx = $('#mychart').get(0).getContext("2d");				
				if(ctx != null) { scope.ctx = ctx; }            			
				var myDoughnutChart = new Chart(scope.ctx).Doughnut(scope.data,scope.options);					
				 $('#clsbtn').click(function (e) {
                    $(element).popover('hide');
                });
                e.preventDefault();
			
			});            
        }		
    }
    });

