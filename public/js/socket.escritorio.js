//Comando para establecer la conexion
var socket = io();
// var label = $('#lblNuevoTicket');

// socket.on('connect', function() {
//     console.log('Conectado al servidor');
// });

// //ON son para escuchar
// socket.on('disconnect', function() {
//     console.log('Perdimos conección con el servidor');
// });

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets pendientes') {
            label.text(resp);
            alert(resp)
            return;
        }
        // label.text(resp.numero);
        label.text('Ticket ' + resp.numero);
        console.log(resp);
    });


});