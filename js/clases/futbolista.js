import { Persona } from "./persona.js";

export class Futbolista extends Persona{
    constructor(id, nombre, apellido, edad, equipo, posicion, cantidadGoles){
        super(id, nombre, apellido, edad);
        this.id = id;
		this.equipo = equipo;
        this.posicion = posicion;
        this.cantidadGoles = cantidadGoles;
	}

    toString() {
        let cadena = "";

        if (this.sueldo !== null && this.posicion !== null && this.cantidadGoles !== null) {
            cadena = `ID: ${this.id} - NOMBRE: ${this.nombre}
            - APELLIDO: ${this.apellido} - EDAD: ${this.edad}
            - EQUIPO: ${this.equipo} - POSICION: ${this.posicion} - GOLES: ${this.cantidadGoles}`;
        }

        return cadena;
    }

    toJson() {
        return JSON.stringify(this);
    }
}