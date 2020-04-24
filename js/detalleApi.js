// var idPokemon = getParameterByName('id');
// var idPokemon = params.get('id');
//const url = window.location.href;
let params = new URLSearchParams(location.search);
var id = params.get('id');

detalle(id);
function detalle(idPokemon){
   //e.preventdefault();
     //document.getElementById("nombre").value = "dd";
    var detalle = "https://pokeapi.co/api/v2/pokemon/" + idPokemon + "/";

    $.get(detalle, function (response) {
       
        if (!$.isEmptyObject(response)) {
            console.log(response);
            var habilidades = "";
            var movimientos = "";
            var template = '';
            if (response.length != 0) {
                for (var item in response) {
                    var nombre = response["name"];
                    
                    for (var item2 in response["sprites"]) {
                        var img = document.getElementById('imgPokemon1');
                        img.src = response.sprites.front_default;
                        img.alt = nombre;

                        var img = document.getElementById('imgPokemon2');
                        img.src = response.sprites.back_default;
                        img.alt = nombre;
                       // $("#imgPokemon" + id).attr("src", response.sprites.front_default); 
                    }
    
                }
                for (var habi in response["abilities"]) {
                   habilidades +=  response["abilities"][habi].ability.name+ ",";
                }

                for (var cont in response["moves"]) {
                    
                    movimientos +=  '<li class="li">'+response["moves"][cont].move.name+'</li>';
                 }
                 document.getElementById("movimientos").innerHTML = movimientos;
                document.getElementById("nombre").innerText = nombre;
                /*for (var item in response["sprites"]) {
                    console.log(item);
                    //var img = document.getElementById('imgPokemon' + id);
                    //img.src = response.sprites.front_default;
                   // $("#imgPokemon" + id).attr("src", response.sprites.front_default); 
                }*/
            }
        }
    });

}