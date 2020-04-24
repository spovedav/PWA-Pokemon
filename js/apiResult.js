//$(document).ready(function(){
index();
function index() {
    var rutaAPI = "https://pokeapi.co/api/v2/pokemon-species/";
    api(rutaAPI);
}

function botones(e) {
    var rutaAPI = e;
    api(rutaAPI);
}

function botones(e) {
    var rutaAPI = e;
    api(rutaAPI);
}

var pokemon = new Array();
function apiNombre(rutaAPI,i,count) {
    
    $.get(rutaAPI, function (response) {
        if (!$.isEmptyObject(response)) {
            pokemon.push({nombre: response["name"], id: response["id"]},);
        }
    });
   
}

const BuscarNombre = (e) => {
    let div = document.getElementById("busquedaDiv");
    
   if(e.length>3){
     const result = pokemon.filter(word => word.nombre == e.toLowerCase());
        if(result.length!=0)
        {
            div.style.display = "block";
        }
     
        let idPokemonBuscar = result[0].id;
        let nonbrePokemonBuscar = result[0].nombre;
        
        var urlImagen = "https://pokeapi.co/api/v2/pokemon/" + idPokemonBuscar + "/";
     
     document.getElementById("nombrePo").innerHTML = '<a type="button" class="text-info"  href="detalle.html?id='+idPokemonBuscar+'" style="margin-bottom: 0px;" id="tituloBusqueda">'+nonbrePokemonBuscar+'</a>';
     // 
   prueba(urlImagen, idPokemonBuscar,"si");
   }

    if(e.length==0 && e==""){
        div.style.display = "none";
        var img = document.getElementById('imgPokemonBuscar');
        img.src = "";

    }
}

var prueba = function (rutaAPI,id,buscar) {
    
    $.get(rutaAPI, function (response) {
        if (!$.isEmptyObject(response)) {
            
            for (var valor in response) {
                
                for (var item in response["sprites"]) {
                   
                   if (buscar == "si"){
                    var img2 = document.getElementById('imgPokemonBuscar');
                    img2.src = response.sprites.front_default;
                    }else{
                        var img = document.getElementById('imgPokemon' + id);
                        img.src = response.sprites.front_default;
                       // $("#imgPokemon" + id).attr("src", response.sprites.front_default); 
                    }
                }
                
            }
        }
        
    });
    
}


function api(rutaAPI) {
    
    $.get(rutaAPI, function (response) {

        if (!$.isEmptyObject(response)) {
            var template = '';
            if (response.length != 0) {
                for (var valor in response) {
                    $("#h3count").text(response.count+" pokemones");
                    var count = response.count;
                    //alert(); // obtengo el valor de results
                    if (valor == "results") {
                        for (var valor2 in valor) {
                            
                            var nombre = response.results[valor2].name;
                            var idUrl = response.results[valor2].url;
                            var arraKey = Array();
                            arraKey = idUrl.split("/");

                            var idPokemon =  arraKey[6];

                            var urlImagen = "https://pokeapi.co/api/v2/pokemon/" + idPokemon + "/";

                            //                           
                            prueba(urlImagen, idPokemon, null);
                            
                                
                            template += `
                            <input type="hidden" name="id" id="id" value="${idPokemon}">
                            
                            <div class="col-md-4 text-center border mb-3 mt-3 h2 col-sm-6 col-xs-6">
                            <h5 class="text-warning text-uppercase" >${ nombre}</h5>
                            <center><img class="mb-3" src="${ null}" id="imgPokemon${idPokemon}" alt="null" width="250" height="200"></center>
                            <a  href="detalle.html?id=${idPokemon}" class="btn btn-danger btn-block text-white text-center">Ver Detalle</a>
                            </div>
                            `
                        }
                        document.getElementById('contenido').innerHTML = template;
                    }

                    //SIGUIENTE
                    var bandera = false;
                    if (valor == "previous") {
                        if (response[valor] == null) {
                            bandera = true;
                        }
                    } else {
                        bandera = true;
                    }

                    if (valor == "previous") {
                        $("#next").val(response["previous"]);
                        if (!bandera) {
                       
                            template2 += `
                        <button type="button" class="btn btn-primary w-25" id="next" value="`+ response["previous"] + `" onclick="botones(this.value);">Anterior</button>
                        `
                        } else {
                            template2 += `
                        <button type="button" class="btn btn-primary w-25" disabled id="next" value="`+ response["previous"] + `" onclick="botones(this.value);">Anterior</button>
                        `
                        }
                    }

                    if (valor == "next") {
                        var template2 = `
                        <button type="button" class="btn btn-primary w-25 ml-4 mr-2" id="ante" value="`+ response["next"] + `" onclick="botones(this.value);">Siguiente</button>
                        `
                    }

                    $("#links").html(template2);
                }


            } else {
                //document.getElementById('filtro_busqueda').innerHTML = '';
                //document.getElementById('links').innerHTML = ''
                document.getElementById('contenido').innerHTML = '<p class="text-center text-danger w-100">No hay que Mostrar</p>';
            }
            for(var i=1 ;i<=count; i++ ){
                var urlNombre = "https://pokeapi.co/api/v2/pokemon/" + i + "/";
                apiNombre(urlNombre,i,count);
            }
        }
         
    });
}

