$(document).ready(function() {

    var template_html = $('#film').html();
    var template_function = Handlebars.compile(template_html);

    $('#search-icon').click(function() {

        ricerca_api();

    });

    $('#search-movie').keyup(function(event) {

        if (event.which == 13) {
            ricerca_api();
        }

    });

function ricerca_api() {

    var research = $('#search-movie').val().trim();

    if (research.length > 1) {

        reset_research();

    }


    $.ajax({
        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        data: {
            api_key: '98ca6c1854d7d040d31087b5ed5527b2',
            query: research
        },
        success: function(response) {

            var numero_film = response.results.length;


            for (var i = 0; i < numero_film; i++) {

                var film_corrente = response.results[i];

                // var voto_intero = Math.ceil(voto/2);

                stampa_risultati(film_corrente);

            }

        },

        error: function() {
            console.log('errore');
        }
    });
}

    function reset_research() {

        $('#search-movie').val('');
        $('main').empty();

    }

    function stampa_risultati(dati) {
        var voto = dati.vote_average;

        var voto_intero = Math.ceil(voto/2);
        var stella = '';
        var stella_vuota = '';
        for (var i = 0; i < voto_intero; i++) {
            stella = stella + '<i class="fas fa-star"></i>';
        }
        for (var i = 0; i < (5-voto_intero); i++) {
            stella_vuota = stella_vuota + '<i class="far fa-star"></i>';
        }

        var singolo_film = {
            titolo: dati.title,
            titolo_originale: dati.original_title,
            voto: (stella + stella_vuota),
            lingua: function() {
                var lingue = ['it', 'en', 'de', 'fr'];
                if (lingue.includes(dati.original_language)) {
                    return '<img src="bandiere/bandiera-'+dati.original_language+'.png">';
                } else {
                    return dati.original_language;
                }
            }
        }

        console.log(singolo_film);

        var html_finale = template_function(singolo_film);
        $('main').append(html_finale);
    }

});
