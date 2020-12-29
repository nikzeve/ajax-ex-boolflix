$(document).ready(function() {

    var template_html = $('#film').html();
    var template_function = Handlebars.compile(template_html);

    $('#search-icon').click(function() {

        var valore_ricerca = $('#search-movie').val().trim();
        if (valore_ricerca.length > 1) {
            ricerca_api();
        } else {
            console.log('non hai inserito nulla');
        }
    });

    $('#search-movie').keyup(function(event) {

        if (event.which == 13) {

            var valore_ricerca = $('#search-movie').val().trim();
            if (valore_ricerca.length > 1) {
                ricerca_api();
            } else {
                console.log('non hai inserito nulla');
            }
        }
    });

    $('#return-box').click(function() {
        $('#search-movie').val('');
        $('#film-results').empty();
        none_torna_home();
        active_home_page();
        active_search_bar();
    });

    function none_torna_home() {
        $('#return-box').removeClass('active');
        $('#return-box').toggleClass('none');
    }

    function active_torna_home() {
        $('#return-box').removeClass('none');
        $('#return-box').toggleClass('active');
    }

    function none_home_page() {
        $('.home-page').removeClass('active');
        $('.home-page').toggleClass('none');
    }

    function active_home_page() {
        $('.home-page').removeClass('none');
        $('.home-page').toggleClass('active');
    }

    function none_search_bar() {
        $('#search').removeClass('active');
        $('#search').toggleClass('none');
    }

    function active_search_bar() {
        $('#search').removeClass('none');
        $('#search').toggleClass('active');
    }

    function reset_research() {
        $('#search-movie').val('');
        $('.film-results').empty();
    }

    function ricerca_api() {
        active_torna_home();
        none_home_page();
        none_search_bar();
        var research = $('#search-movie').val().trim();

        if (research.length > 1) {

            reset_research();

        }


        $.ajax({
            url: 'https://api.themoviedb.org/3/search/movie',
            method: 'GET',
            data: {
                api_key: '98ca6c1854d7d040d31087b5ed5527b2',
                query: research,
                language: 'it'
            },
            success: function(response) {

                var numero_film = response.results.length;

                if (numero_film == 0) {
                    $('#film-results').append('<div>   Non ci sono film...   </div>')
                }


                for (var i = 0; i < numero_film; i++) {

                    var film_corrente = response.results[i];

                    // var voto_intero = Math.ceil(voto/2);

                    stampa_risultati(film_corrente, 'film');

                }

            },

            error: function() {
                console.log('errore');
            }
        });

        $.ajax({
            url: 'https://api.themoviedb.org/3/search/tv',
            method: 'GET',
            data: {
                api_key: '98ca6c1854d7d040d31087b5ed5527b2',
                query: research,
                language: 'it'
            },
            success: function(response) {

                var numero_serie_tv = response.results.length;

                if (numero_serie_tv == 0) {
                    $('#film-results').append('<div>   Non ci sono serie tv...   </div>')
                }

                for (var i = 0; i < numero_serie_tv; i++) {
                    var serie_tv_corrente = response.results[i]

                    stampa_risultati(serie_tv_corrente, 'serie tv');
                }
            },
            error: function() {
                console.log('errore');
            }
        });
    }


    function stampa_risultati(dati, tipologia) {
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

        if (tipologia == 'film')  {
            var titolo_contenuto = dati.title;
            var titolo_originale_contenuto = dati.original_title;
        } else {
            var titolo_contenuto = dati.name;
            var titolo_originale_contenuto = dati.original_name;
        }

        var singolo_film = {
            titolo: titolo_contenuto,
            titolo_originale: titolo_originale_contenuto,
            voto: (stella + stella_vuota),
            lingua: function() {
                var lingue = ['it', 'en', 'de', 'fr'];
                if (lingue.includes(dati.original_language)) {
                    return '<img src="bandiere/bandiera-'+dati.original_language+'.png">';
                } else {
                    return dati.original_language;
                }
            },
            tipo: tipologia,
            locandina: stampa_locandina(dati.poster_path),
            descrizione: dati.overview

        }

        console.log(singolo_film.locandina);
        var html_finale = template_function(singolo_film);
        $('#film-results').append(html_finale);
    }

    function stampa_locandina(locandina) {

        if (locandina === null) {
            locandina_contenuto = 'bandiere/unnamed-5.jpg';
            return locandina_contenuto
        } locandina_contenuto = 'https://image.tmdb.org/t/p/w342' + locandina;
        return locandina_contenuto;
    }

});
