$(document).ready(function() {

    $.ajax({
        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        data: {
            api_key: '98ca6c1854d7d040d31087b5ed5527b2',
            query: 'ritorno al futuro'
        },
        success: function(response) {
            console.log(response);

        },

        error: function() {
            console.log('errore');
        }
    });


    $('#search-icon').click(function() {
        alert('funziona');
    });





});
