import { Persona } from "./persona.js";

export class Profesional extends Persona{
    constructor(id, nombre, apellido, edad, titulo, facultad, añoGraduacion){
        super(id, nombre, apellido, edad);
		this.id = id;
		this.titulo = titulo;
        this.facultad = facultad;
        this.añoGraduacion = añoGraduacion;
	}

    toString() {
        let cadena = "";

        if (this.titulo !== null && this.facultad !== null && this.añoGraduacion !== null) {
            cadena = `ID: ${this.id} - NOMBRE: ${this.nombre}
            - APELLIDO: ${this.apellido} - EDAD: ${this.edad}
            - TITULO: ${this.titulo} - FACULTAD: ${this.facultad}  - GRADUACION: ${this.añoGraduacion}`;
        }

        return cadena;
    }

    toJson() {
        return JSON.stringify(this);
    }
}