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

export function validarEntidad(v1, v2, v3, v4, v5, v6, v7, tipo) {
    const errores = [];

    // v1 es Nombre
    if (!validarCadena(v1, 20)) errores.push("Nombre");

    // v2 es Apellido
    if (!validarCadena(v2, 20)) errores.push("Apellido");

    // v3 es Edad
    if (!validarNumero(v3, 18, 200)) errores.push("Edad");

    if(tipo === "Empleados") {
        // v4 es Ventas
        if (!validarNumero(v4, 0, 9999999)) errores.push("Ventas");

        // v5 es Sueldo
        if (!validarNumero(v5, 1, 9999999)) errores.push("Sueldo");
    } else {
        // v6 es Compras
        if (!validarNumero(v6, 0, 99999)) errores.push("Compras");

        // v7 es Telefono
        if (!validarNumero(v7, 1000000, 9999999999)) errores.push("Telefono");
    }

    if (errores.length > 0) {
        const mensajeError = `Datos inválidos en: ${errores.join(', ')}`;
        throw new Error(mensajeError);
    }

    return true;
};















