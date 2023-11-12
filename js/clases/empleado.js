import { Persona } from "./persona.js";

export class Empleado extends Persona{
    constructor(id, nombre, apellido, edad, sueldo, ventas){
        super(id, nombre, apellido, edad);
        this.id = id;
		this.sueldo = sueldo;
        this.ventas = ventas;
	}

    toString() {
        let cadena = "";

        if (this.sueldo !== null && this.ventas !== null) {
            cadena = `ID: ${this.id} - NOMBRE: ${this.nombre}
            - APELLIDO: ${this.apellido} - EDAD: ${this.edad}
            - SUELDO: ${this.sueldo} - VENTAS: ${this.ventas}`;
        }

        return cadena;
    }

    toJson() {
        return JSON.stringify(this);
    }
}