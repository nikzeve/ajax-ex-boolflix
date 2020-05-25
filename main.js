$(document).ready(function() {

    var template_html = $('#film').html();
    var template_function = Handlebars.compile(template_html);

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

            var numero_film = response.results.length;


            for (var i = 0; i < numero_film; i++) {
                var titolo = response.results[i].title;
                // console.log(titolo);
                var titolo_originale = response.results[i].original_title;
                // console.log(titolo_originale);
                var lingua = response.results[i].original_language;
                // console.log(lingua);
                var voto = response.results[i].vote_average;
                // console.log(voto);

                var voto_intero = Math.ceil(voto/2);


                var singolo_film = {
                    titolo: titolo,
                    titolo_originale: titolo_originale,
                    lingua: lingua,
                    voto: voto_intero
                }

                console.log(singolo_film);

                var html_finale = template_function(singolo_film);
                $('main').append(html_finale);
            }

        },

        error: function() {
            console.log('errore');
        }
    });
}

});
