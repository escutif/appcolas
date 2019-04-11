const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0; //el ultimo ticket que se genera
        this.hoy = new Date().getDate();
        this.tickets = []; //contiene todos los tickets pendientes por atender
        this.ultimos4 = []; //ultimos 4 ticket en atencion

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets pendientes'
        }
        let numeroTicket = this.tickets[0].numero;
        //se elimina la primera posicion del arreglo
        this.tickets.shift(); //Se elimina el primer elemento de los tickets

        //Se crea un nuevo ticket
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //Se crea el ticket al inicio del arreglo
        // this.ultimos4.unshift(atenderTicket); //unshift: Agrega al inicio del arreglo
        this.ultimos4.unshift(atenderTicket);


        //Se verifica que solo existan 4 ticket en el arreglo
        if (this.ultimos4.length > 4) {
            //Se borra el ticket mas antiguo
            this.ultimos4.splice(-1, 1); //borra el ultimo elemento de la lista
        }

        console.log('Ultimos 4 elementos:', this.ultimos4);

        this.grabarArchivo();

        //Se regresa cual es el ticket que se quiere atender
        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
        console.log('Se ha inicializado el sistema de ticket');
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}