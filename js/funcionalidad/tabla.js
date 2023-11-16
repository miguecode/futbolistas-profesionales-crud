export function crearTabla(listaDeElementos) {
    if (!Array.isArray(listaDeElementos)) return null;

    const tabla = document.createElement("table");
    tabla.setAttribute("id", "tabla");

    let columnas = ["id", "nombre", "apellido", "edad",
    "sueldo", "ventas", "compras", "telefono"];

    tabla.appendChild(crearEncabezado(columnas));

    tabla.appendChild(crearCuerpo(listaDeElementos, columnas));

    return tabla;
}

const crearEncabezado = (columnas) => {
    const thead = document.createElement("thead");
    const trEncabezado = document.createElement("tr");

    for (const columna of columnas) {
        const th = document.createElement("th");
        th.textContent = columna;
        trEncabezado.appendChild(th);
    }

    // Agrego columnas Modificar y Eliminar
    const thModificar = document.createElement("th");
    thModificar.textContent = 'Modificar';

    const thEliminar = document.createElement("th");
    thEliminar.textContent = 'Eliminar';
    
    trEncabezado.appendChild(thModificar);
    trEncabezado.appendChild(thEliminar);

    thead.appendChild(trEncabezado);

    return thead;
};

const crearCuerpo = (listaDeElementos, columnas) => {
    if (!Array.isArray(listaDeElementos)) return null;

    const tbody = document.createElement("tbody");

    listaDeElementos.forEach((elemento, index) => {
        // Si habilito este if, evitaria que la tabla cree una fila con ID '666'
        //if (elemento.id !== 666 && elemento.id !== '666') {  }
        const tr = document.createElement("tr");

        if (index % 2 === 0) {
            tr.classList.add("filaPar"); 
        }

        for (const columna of columnas) {
            const td = document.createElement("td");
            const valor = elemento[columna] || "N/A";

            if (columna === "id") {
                tr.setAttribute("data-id", valor);
                if (valor === '666' || valor === 666) {
                    tr.classList.add('idProhibida'); // Si el ID es 666, pinto de rojo la fila
                }
            }

            td.textContent = valor;
            tr.appendChild(td);
        }

        // Agrego botones Modificar y Eliminar
        const tdModificar = document.createElement("td");
        tdModificar.setAttribute("id", "tdModificar");

        const tdEliminar = document.createElement("td");
        tdEliminar.setAttribute("id", "tdEliminar");

        const btnModificar = document.createElement("button");
        btnModificar.textContent = "Modificar";
        btnModificar.setAttribute("id", "btnModificar");
        btnModificar.setAttribute("data-id", elemento.id);

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.setAttribute("id", "btnEliminar");
        btnEliminar.setAttribute("data-id", elemento.id);

        tdModificar.appendChild(btnModificar);
        tdEliminar.appendChild(btnEliminar);

        tr.appendChild(tdModificar);
        tr.appendChild(tdEliminar);

        tbody.append(tr);
    });

  return tbody;
};

export const actualizarTabla = (contenedor, data) => {
    while(contenedor.hasChildNodes()) {
        contenedor.removeChild(contenedor.firstElementChild);
    }
    if (data !== null) {
      contenedor.appendChild(crearTabla(data));
    }
};