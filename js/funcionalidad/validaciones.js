function validarCadena(cadena, longitudMaxima) {
    let validacion = false;

    if (typeof cadena === "string") {
        cadena = cadena.trim();
    
        const regex = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s'.-]+$/;
        
        validacion = cadena.length > 1 && cadena.length <= longitudMaxima && regex.test(cadena);
    }

    return validacion;
}

function validarNumero(valor, valorMinimo, valorMaximo) {
    return typeof valor === "number" && valor >= valorMinimo && valor <= valorMaximo;
}

export function validarEntidad(v1, v2, v3, v4, v5, v6, v7, v8, v9, tipo) {
    const errores = [];

    // v1 es Nombre
    if (!validarCadena(v1, 20)) errores.push("Nombre");

    // v2 es Apellido
    if (!validarCadena(v2, 20)) errores.push("Apellido");

    // v3 es Edad
    if (!validarNumero(v3, 15, 300)) errores.push("Edad");

    if (tipo === "Futbolistas") {
        // v4 es Equipo
        if (!validarCadena(v4, 40)) errores.push("Equipo");

        // v5 es Posicion
        if (!validarCadena(v5, 20)) errores.push("Posicion");

        // v6 es Goles
        if (!validarNumero(v6, 0, 9999999)) errores.push("Goles");
    } else {
        // v7 es Titulo
        if (!validarCadena(v7, 40)) errores.push("Titulo");

        // v8 es Facultad
        if (!validarCadena(v8, 40)) errores.push("Facultad");

        // v9 es Graduacion
        if (!validarNumero(v9, 1950, 30000)) errores.push("Graduacion");
    }

    if (errores.length > 0) {
        const mensajeError = `Datos inválidos en: ${errores.join(', ')}`;
        throw new Error(mensajeError);
    }

    return true;
};