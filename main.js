$(document).ready(function() {

    $('#search-icon').click(function() {
        var control_research = $('#search-movie').val();
        if (control_research.trim() != '') {
            var research = control_research
            console.log(research);
            $('#search-movie').val('');
            ricerca_api(research);
        }
    });

function ricerca_api(research) {
    $.ajax({
        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        data: {
            api_key: '98ca6c1854d7d040d31087b5ed5527b2',
            query: research
        },
        success: function(response) {
            console.log(response);

        },

        error: function() {
            console.log('errore');
        }
    });

}

});
