import '../styles/index.scss';
var $ = require('jquery');


$(document).ready(function(){

    function msg(s){
        $('form p').html(s);   
    }

    $('form input').change(function () {
        
        var files = this.files;

        if(files[0].type != "application/vnd.ms-excel"){
            msg('<pre>Kindly upload only the .CSV file</pre>');
            return;
        }

        var formData = new FormData($('#upload-csv')[0]);
        formData.append('csv_file', $('input[type=file]')[0].files[0]);
        $.ajax({
            type: "POST",
            url: "/upload.php",
            data: formData,
            contentType: "application/vnd.ms-excel",
            processData: false,
            cache: false,
            beforeSend: function() {
                msg('<img class="loading" src="assets/loading.gif"/> Uploading...');
            },
            success: function(msg) {
                //msg("<pre>"+files[0].name + ' uploaded...</pre>');
                msg(msg);
                $('#send-sms').fadeIn();
            },
            error: function() {
                msg("<pre>Sorry! Couldn't process your request.</pre>");
            }
        });        

    });
    $('form').submit(function () {
        
    });
});
