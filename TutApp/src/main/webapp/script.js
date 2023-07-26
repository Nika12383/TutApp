$(document).ready(function() {
        $("myForm").submit(function(e) {
                e.preventDefault()  ;
        });

        $('#myButton').click(function(event) {
                var flowerType = $('#myForm').serialize();
                $.ajax({
                    url: 'AppController',
                    type: "GET",
                    data: flowerType,
                    dataType: "text",
                    success : function(responseText) {
                        $('#ajaxResponse').text(responseText);
                    }
                });
        });
});