function cambiarPagina(page) {

    $.mobile.changePage("#" + page, {
        transition: "none"
    });

}

$(document).ready(function() {
    // Se inicializan las variables
    var marcadores = [];
    var marcadorRegistro;
    var Hoteles = [];
    var mapaRegistro;
    var latlngInicial = new google.maps.LatLng(-34.6083, -58.3712); 
    var latitudPunto=-34.6083;
    var longitudPunto=-58.3712;


    $(".btnVolver").click(function() {
        cambiarPagina("paginaInicio");
    });
//-----------------------------------------------------

    $("#btnVerMapa").click(function() {
        cambiarPagina("paginaMapa");
        mostrarMapa();
    });
//-----------------------------------------------------
    $("#btnListaHoteles").click(function() {
        cambiarPagina("listaHoteles");
        mostrarListado();
    });
//-----------------------------------------------------
    $(".btnVolverLista").click(function() {
        cambiarPagina("listaHoteles");
        mostrarListado();
    });
//-----------------------------------------------------
    $("#btnRegistroHotel").click(function() {
        cambiarPagina("paginaRegistrarHotel");
        mostrarMapaRegistro();
    });
//-----------------------------------------------------

    $("#btnGuardarPunto").click(function() {
        var nombre= $("#nombre").val();
        var ciudad= $("#ciudad").val();
        var telefono= $("#tel").val();
        var estrellas= $("#estrellas").val();
        if(nombre!="" && ciudad!="" && telefono!="" && estrellas!="") {  
        var hotel = {            
            nombre: nombre,
            ciudad: ciudad,
            telefono: telefono,
            estrellas: estrellas,
            latitud: latitudPunto,
            longitud: longitudPunto        
        };

        localStorage.setItem($("#nombre").val(), JSON.stringify(hotel));
        alert("Hotel Registrado");

        $("#nombre").val("")
        $("#ciudad").val("")
        $("#tel").val("")
        $("#estrellas").val("")
        marcadorRegistro.setPosition(latlngInicial);
        mapaRegistro.setCenter(latlngInicial);
    }else{
        alert("Llene todos los campos para agregar la informacion del Hotel")
    }
    });
//-----------------------------------------------------
    function mostrarListado(){
        var element_html="";

        for (var i = 0; i < localStorage.length; i++) {
            var clave = localStorage.key(i);
            var hotel = $.parseJSON(localStorage.getItem(clave));
            element_html+="<a  class=\"btninfoHotel ui-link ui-btn ui-shadow ui-corner-all\" data-role=\"button\" onclick=\"mostrarInfoHotel("+i+")\">"+hotel.nombre+"</a>";
        }

        $("#listadoHotel").html(element_html);
    }
//-----------------------------------------------------
    function mostrarMapaRegistro() {

        var opciones = {            
            zoom: 15,
            center: latlngInicial,
            mapTypeId: google.maps.MapTypeId.ROADMAP        
        };

         mapaRegistro = new google.maps.Map(document.getElementById("divMapaRegistro"), opciones);   

         marcadorRegistro = new google.maps.Marker({            
            position: latlngInicial,
            map: mapaRegistro,
            draggable: true,
            title: "Mi hotel!!"        
        });

        google.maps.event.addListener(marcadorRegistro, 'dragend', function(event) {
            latitudPunto = event.latLng.lat();
            longitudPunto = event.latLng.lng();
        });                
    }
});
//-----------------------------------------------------
function borrar(){
    for (var i = 0; i <= localStorage.length; i++) {
        var clave = localStorage.key(i);
        localStorage.removeItem(clave);
    }
}
//-----------------------------------------------------
function mostrarInfoHotel(id_elem){
    id=id_elem;
    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        var hotel = $.parseJSON(localStorage.getItem(clave));
        if(id_elem==i){
            $("#nombre_texto").html(hotel.nombre);
            $("#ciudad_texto").html(hotel.ciudad);
            $("#tel_texto").html(hotel.telefono);
            $("#estrellas_texto").html(hotel.estrellas);
            cambiarPagina("paginaMapa");
            $(function(){
                var opciones = {            
                    zoom: 15,
                    center: new google.maps.LatLng(hotel.latitud, hotel.longitud),
                    mapTypeId: google.maps.MapTypeId.ROADMAP        
                };

                var mapa = new google.maps.Map(document.getElementById("divMapaHotel"), opciones);    
                var latlngnN = new google.maps.LatLng(hotel.latitud, hotel.longitud);
                var marcador = new google.maps.Marker({            
                    position: latlngnN,
                    map: mapa,
                    title: hotel.nombre        
                }); 
            });
        }
    }
}
//-----------------------------------------------------
borrar();
