
/*************************************************/
/** Function that returns the name of a         **/
/** character from a film                       **/
/**                                             **/
/*************************************************/
function test(URL){
    
    //alert(URL.slice(-2));
}


/*************************************************/
/** Function to validate the next and prev      **/
/** buttons of the pagination                   **/
/**                                             **/
/*************************************************/
function validatePagination(data){
    
    if (data.previous==null && data.next==null ) {
        // ambos son null
        $('.pagination').hide();
    } 
    else {
        $('.pagination').show();

        if(data.previous==null) {
            //prev es null y next no
            $('.previous').addClass('disabled');

            $('.next').attr('value', data.next);
            $('.next').removeClass('disabled');
        }
        else {
            if(data.next==null) {
                //next es null y prev no
                $('.next').addClass('disabled');

                $('.previous').attr('value',data.previous);
                $('.previous').removeClass('disabled');
            }
            else {
                //ambos NO son null
                $('.previous').attr('value',data.previous);
                $('.previous').removeClass('disabled');

                $('.next').attr('value',data.next);
                $('.next').removeClass('disabled');
            }
        }
    }
}


/*************************************************/
/** Function to load all the films and their    **/
/** main data                                   **/
/**                                             **/
/*************************************************/
function loadFilms(URL,origen){
    
    var films="";
    
    var f=0;
    var c=0;
    
    var finalF = 0;
    var finalC = 0;
    
    test(URL);
    
    $.ajax({
        url: URL,
        dataType: "json",
        success: function (data){
            
            // Valida la paginacion
            validatePagination(data);
            
            // Carga data principal
            finalF = data.results.length;
            
            for (f ; f < finalF ; f++) {
                
                films += 
                      '<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">'
                    + '</br><h3>Episode '   + data.results[f].episode_id
                    + ' - '                 + data.results[f].title
                    + '</h3><ul><li><p>'    + data.results[f].opening_crawl + '</p></li>'
                    + '<li>Release Date: '  + data.results[f].release_date + '</li>'
                    + '<li>Director: '      + data.results[f].director + '</li>'
                    + '<li>Producer: '      + data.results[f].producer + '</li>'
                    + '</ul></br>';
                    
                if(origen==1){
                    
                    // Home web page
                    films += 
                          '<a class="btn btn-default" href="'
                        + 'films.html'
                        + '" role="button">View Details &raquo;</a>'
                        + '</div></br></br>';
                }
                else {
                    
                    // Films web page
                    films += 
                          '<h4>Characters</h4></div>'
                        + '<div class="characterList' + f 
                        + ' col-md-12 col-lg-12 col-sm-12 col-xs-12" style="padding-bottom: 20px;">';
                    
                    finalC = data.results[f].characters.length;
                    
                    for (c=0 ; c < finalC ; c++) {
                        
                        searchCharacterName(data.results[f].characters[c], ".characterList"+f);
                    }
                    films += '</div>';
                }
            }
            $('#films').html(films);
        }
    });
}


/*************************************************/
/** Function that returns the name of a         **/
/** character from a film                       **/
/**                                             **/
/*************************************************/
function searchCharacterName(URL, target){
    
    $.ajax({
        url: URL,
        dataType: "json",
        success: function (data){
            
            $(target).append(
                  '<div class="col-md-3 col-lg-3 col-sm-4 col-xs-6">'
                + '<a href="characters.html">'
                + data.name 
                + '</a></div>');
        }
    });
}


/*************************************************/
/** Function to load all the characters and     **/
/** their main data                             **/
/**                                             **/
/*************************************************/
function loadCharacters(URL){
    
    var characters="";
    
    var c=0;
    var f=0;
    
    var finalc = 0;
    var finalf = 0;
    
    $.ajax({
        url: URL,
        dataType: "json",
        success: function (data){
            
            // Valida la paginacion
            validatePagination(data);
            
            // Carga data principal
            finalc = data.results.length;
            
            for (c ; c < finalc ; c++) {
                
                characters += 
                      '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" style="height: 400px;">'
                    + '<h3>' + data.results[c].name + '</h3>'
                    + 'Species : <div id="species'+ c +'"></div></br>'
                    + 'Planet: <div id="planet'+ c +'"></div></br>'
                    + 'Language: <div id="lang'+ c +'"></div></br>';
                
                // Search for the species and planet of the character
                searchSpecies(data.results[c].species, "#species"+c, "#lang"+c);
                searchPlanet(data.results[c].homeworld, "#planet"+c);
                
                // List of films of the character
                characters +=  '<h4>Appears in:</h4><ul id="films'+c+'">';
                
                finalf = data.results[c].films.length;
            
                for (f ; f < finalf ; f++) {
                    
                    searchFilmName(data.results[c].films[f], "#films"+c);
                }
                
                characters += '</ul></div>';
            }
            $('#characters').html(characters);
        }
    });
}

/*************************************************/
/** Function that searches the name of a film   **/
/**                                             **/
/**                                             **/
/*************************************************/
function searchFilmName(URL, target){
    
    $.ajax({
        url: URL,
        dataType: "json",
        success: function (data){
            
            $(target).append('<li><a href="films.html">Episode ' + data.episode_id + ': ' + data.title + '</a></li>');
        }
    });
}

/*************************************************/
/** Function that searches the name and         **/
/** classification of an species                **/
/**                                             **/
/*************************************************/
function searchSpecies(URL, target1, target2){
    
    $.ajax({
        url: URL,
        dataType: "json",
        success: function (data){
            
            $(target1).append(data.name + " - " + data.classification);
            $(target2).append(data.language);
        }
    });
}

/*************************************************/
/** Function that returns the name of a planet  **/
/**                                             **/
/**                                             **/
/*************************************************/
function searchPlanet(URL, target){
    
    $.ajax({
        url: URL,
        dataType: "json",
        success: function (data){
            
            $(target).append('<a href="planets.html">'+ data.name + '</a>');
        }
    });
}

/*************************************************/
/** Function to load all the planets and their  **/
/** main data                                   **/
/**                                             **/
/*************************************************/
function loadPlanets(URL){
    
    var planets="";
    
    var p = 0;
    var finalp = 0;
    
    $.ajax({
        url: URL,
        dataType: "json",
        success: function (data){
            
            // Valida la paginacion
            validatePagination(data);
            
            // Carga data principal
            finalp = data.results.length;
            
            for (p ; p < finalp ; p++) {
                
                planets += 
                      '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" style="height: 200px;">'
                    + '<h3>'                + data.results[p].name + '</h3><ul>'
                    + '<li>Diameter :'      + data.results[p].diameter + '</li>'
                    + '<li>Climate: '       + data.results[p].climate + '</li>'
                    + '<li>Terrain: '       + data.results[p].terrain + '</li>'
                    + '<li>Surface Water: ' + data.results[p].surface_water + '</li>'
                    + '<li>Population: '    + data.results[p].population + '</li>'
                    + '</ul></div>';
            }
            
            $('#planets').html(planets);
        }
    });
}


/*************************************************/
/** Function to load all the vehicles and their **/
/** main data                                   **/
/**                                             **/
/*************************************************/
function loadVehicles(URL){
    
    var vehicles="";
    
    var v = 0;
    var finalv = 0;
    
    $.ajax({
        url: URL,
        dataType: "json",
        success: function (data){
            
            // Valida la paginacion
            validatePagination(data);
            
            // Carga data principal
            finalv = data.results.length;
            
            for (v ; v < finalv ; v++) {
                
                vehicles += 
                      '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" style="height: 280px;">'
                    + '<h3>'                + data.results[v].name + '</h3><ul>'
                    + '<li>Model :'         + data.results[v].model + '</li>'
                    + '<li>Length: '        + data.results[v].length + '</li>'
                    + '<li>Crew: '          + data.results[v].crew + '</li>'
                    + '<li>Passengers: '    + data.results[v].passengers + '</li>'
                    + '<li>Class: '         + data.results[v].vehicle_class + '</li>'
                    + '</ul></div>';
            }
            $('#vehicles').html(vehicles);
        }
    });
}



/*************************************************/
/** Function to load all the starships and      **/
/** their main data                             **/
/**                                             **/
/*************************************************/
function loadStarships(URL){
    
    var starships="";
    
    var s = 0;
    var finals = 0;
    
    $.ajax({
        url: URL,
        dataType: "json",
        success: function (data){
            
            // Valida la paginacion
            validatePagination(data);
            
            // Carga data principal
            finals = data.results.length;
            
            for (s ; v < finals ; s++) {
                
                starships += 
                      '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" style="height: 280px;">'
                    + '<h3>'                + data.results[s].name + '</h3><ul>'
                    + '<li>Model :'         + data.results[s].model + '</li>'
                    + '<li>Manufacturer: '  + data.results[s].manufacturer + '</li>'
                    + '<li>Crew: '          + data.results[s].crew + '</li>'
                    + '<li>Passengers: '    + data.results[s].passengers + '</li>'
                    + '</ul></div>';
            }
            $('#starships').html(starships);
        }
    });
}

