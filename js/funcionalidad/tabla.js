export function crearTabla(listaDeElementos) {
    if (!Array.isArray(listaDeElementos)) return null;

    const tabla = document.createElement("table");
    tabla.setAttribute("id", "tabla");

    let columnas = ["id", "nombre", "apellido", "edad",
    "equipo", "posicion", "cantidadGoles", "titulo", "facultad", "añoGraduacion"];

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
        const tr = document.createElement("tr");

        if (index % 2 === 0) {
            tr.classList.add("filaPar"); 
        }

        for (const columna of columnas) {
            const td = document.createElement("td");
            let valor = elemento[columna] || "N/A";

            if (elemento[columna] == '0') {
                valor = 0;
            }

            if (columna === "id") {
                tr.setAttribute("data-id", valor);
                if (valor === '666' || valor === 666) {
                    td.classList.add('idProhibida');
                }
            }

            td.textContent = valor;
            tr.appendChild(td);
        }

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