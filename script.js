$(document).ready(function() {
    const allOriginsProxy = 'https://api.allorigins.win/get?url=';
    const apiUrl = 'https://emkc.org/api/v2/piston/runtimes';

    // Fetch supported languages
    $.ajax({
        url: allOriginsProxy + encodeURIComponent(apiUrl),
        type: 'GET',
        success: function(response) {
            const languages = JSON.parse(response.contents);
            languages.forEach(function(language) {
                $('#language').append(new Option(`${language.language} (${language.version})`, `${language.language}@${language.version}`));
            });
        },
        error: function(error) {
            console.error('Error fetching languages:', error);
        }
    });

    $('#run_button').click(function() {
        var source_code = $('#source_code').val();
        var language_version = $('#language').val().split('@');
        var language = language_version[0];
        var version = language_version[1];

        var requestData = {
            language: language,
            version: version,
            files: [
                {
                    name: 'main',
                    content: source_code,
                    encoding: 'utf8'
                }
            ],
            stdin: '',
            args: [],
            compile_timeout: 10000,
            run_timeout: 3000,
            compile_memory_limit: -1,
            run_memory_limit: -1
        };

        $.ajax({
            url: allOriginsProxy + encodeURIComponent('https://emkc.org/api/v2/piston/execute'),
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            success: function(response) {
                const result = JSON.parse(response.contents);
                if (result.run) {
                    $('#output').text(result.run.stdout || result.run.stderr || 'No output');
                } else {
                    $('#output').text('No output or compile step required');
                }
            },
            error: function(error) {
                $('#output').text('Error: ' + error.responseText);
            }
        });
    });
});
