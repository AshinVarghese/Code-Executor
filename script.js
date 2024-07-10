$(document).ready(function() {
    $('#run_button').click(function() {
        var source_code = $('#source_code').val();
        var language_id = $('#language').val();

        var requestData = {
            source_code: source_code,
            language_id: language_id
        };

        $.ajax({
            
            url: 'https://ce.judge0.com/submissions?base64_encoded=false&wait=true',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            success: function(response) {
                $('#output').text(response.stdout || response.stderr);
            },
            error: function(error) {
                $('#output').text('Error: ' + error.responseText);
            }
        }); 
    });
});
