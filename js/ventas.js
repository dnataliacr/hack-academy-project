


var salesApp = new Vue({
    el: '#sales',
    data: {
        cars                : [], 
        currency            : "USD", 
        exchangeRateUYU     : 0,
        brands              : [], 
        brandSelected       : "",
        models              : [], 
        modelSelected       : "",
        years               : [], 
        yearSelected        : "",
        statusSelected      : "",
        filtering           : false, 
    },
    filters: {
      
        thousands: function (value) {
 
            return parseInt(value).toLocaleString('es-UY');
        }
    }
});



for (var i = 2020; i >= 1900; i--) {
    salesApp.years.push(i);
}


$.ajax({
    url: "https://ha.edu.uy/api/rates",
    success : function (data) {
        salesApp.exchangeRateUYU = data.uyu;
    }
}); 



$.ajax({
    url: "https://ha.edu.uy/api/brands",
    success : function (data) {
        salesApp.brands = data;
    }
});

$("#select-brand").on("change", function() {

    var url = "https://ha.edu.uy/api/models?brand=" + salesApp.brandSelected;

    $.ajax({
        url: url,
        success : function (data) {
            salesApp.models = data;
            salesApp.modelSelected = "";
        }
    });

});


$("#btn-filter").on("click", function() {
    loadCars();
});



$("#btn-currency").on("click", function() {
    if (salesApp.currency == "USD") {
        salesApp.currency = "UYU";
    } else {
        salesApp.currency = "USD";
    }
});


function loadCars() {

    salesApp.filtering = true;
    
    var year = salesApp.yearSelected; 
    var brand = salesApp.brandSelected; 
    var model = salesApp.modelSelected; 
    var status = salesApp.statusSelected; 

    $.ajax({
        url: "https://ha.edu.uy/api/cars?year=" + year + "&brand=" + brand + "&model=" + model + "&status=" + status,
        success: function (data) {
            salesApp.filtering = false;
            salesApp.cars = data;
            $(".alert-warning").removeClass('hidden');
        }
    }); 
}


loadCars(); 
