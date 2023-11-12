import { Persona } from "./persona.js";

export class Cliente extends Persona{
    constructor(id, nombre, apellido, edad, compras, telefono){
        super(id, nombre, apellido, edad);
		this.id = id;
		this.compras = compras;
        this.telefono = telefono;
	}

    toString() {
        let cadena = "";

        if (this.compras !== null && this.telefono !== null) {
            cadena = `ID: ${this.id} - NOMBRE: ${this.nombre}
            - APELLIDO: ${this.apellido} - EDAD: ${this.edad}
            - COMPRAS: ${this.compras} - TELEFONO: ${this.telefono}`;
        }

        return cadena;
    }

    toJson() {
        return JSON.stringify(this);
    }
}