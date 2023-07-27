$(document).ready(function() {
        $("myForm").submit(function(e) {
                e.preventDefault()  ;
        });

        $('#myButton').click(function(event) {
                var formInput = $('#myForm').serialize();
                $.ajax({
                    url: 'AppController',
                    type: "GET",
                    data: formInput,
                    dataType: "text",
                    success : function(responseText) {
                        $('#ajaxResponse').text(responseText);
                    }
                });
        });
});