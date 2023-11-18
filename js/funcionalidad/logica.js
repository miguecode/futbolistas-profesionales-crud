import { actualizarTabla } from "./tabla.js";
import { Futbolista } from "../clases/futbolista.js"
import { Profesional } from "../clases/profesional.js"
import { validarEntidad } from "./validaciones.js";

const URL = "http://localhost/personasFutbolitasProfesionales.php";

const $seccionDatos = document.getElementById("seccion-datos");
const $loader = document.getElementById("loader");

const $divTablaContenedor = document.getElementById("tabla-contenedor");

function mostrarLoader() {
    $loader.classList.remove("oculto");
    $seccionDatos.classList.add("oculto");
}
function ocultarLoader() {
    $loader.classList.add("oculto");
    $seccionDatos.classList.remove("oculto");
}
function mostrarSeccionDatos() {
    $seccionDatos.style.setProperty("display", "flex");
}

let listaGlobal = [];
//Esta es nuestra lista en memoria. Con este array vamos a trabajar

function convertirLista() {
    listaGlobal = listaGlobal.map(p => {
        if ("equipo" in p) {
            return new Futbolista(p["id"], p["nombre"], p["apellido"], p["edad"], p["equipo"], p["posicion"], p["cantidadGoles"]);
        } else {
            return new Profesional(p["id"], p["nombre"], p["apellido"], p["edad"], p["titulo"], p["facultad"], p["añoGraduacion"]);
        }
    });

    console.log(listaGlobal);
}

// GET (Todas las personas) - AJAX ////////////////////////////////////////////////////////////////////////
const getPersonas = () => {
    mostrarLoader();
    //Muestro el loader (la imágen .gif)

    const xhr = new XMLHttpRequest();
    //Creo un objeto de tipo petición el cual se va a llamar 'xhr'

    xhr.open("GET", URL);
    //Abrimos la petición, indicandole el verbo con el que la vamos a realizar, y su destino (la URL que hardcodeamos al principio)

    xhr.send();
    //Enviamos la petición. Recordemos que 'xhr' es el objeto petición

    let ocurrioError = false;

    xhr.addEventListener("readystatechange", () =>{   //A la petición le agrego un evento 'readystatechange'
        console.log("Acaba de cambiar el estado de la petición");

        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status <= 299) {
                //Si el resultado es exitoso...
                const data = JSON.parse(xhr.responseText);
                //Si me manda la respuesta en tipo JSON, tengo que usar 'responseText'.

                console.log(data);

                listaGlobal = data;
                //Guardo lo que recibimos de la API en nuestra listaGlobal

                convertirLista();
                //Convierto los elementos de la listaGlobal en Futbolistas/Profesionales

                actualizarTabla($divTablaContenedor, data);
                //Actualizo la tabla con lo que acabamos de traer
            } else {
                //Si el resultado no es exitoso...
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                //El console.error es como el log pero sale en rojo

                alert(`Ocurrio un error con la conexion al Servidor`);
                ocurrioError = true;
            }

            ocultarLoader();
            if (!ocurrioError) mostrarSeccionDatos();
            //Sea exitosa o no la respuesta, oculto el loader
        };
    });
};

/////   INICIO - LISTAR TODO   ///////////////////////////////////////////////////////////////////////
getPersonas();
//Cargo la listaGlobal con lo que traemos del Servidor y además cargamos la tabla

const $tituloABM = document.getElementById("tituloABM");

/////   SWITCHEAR FORMULARIOS   ///////////////////////////////////////////////////////////////////////
const $seccionABM = document.getElementById("seccion-ABM");
$seccionABM.style.setProperty("display", "none");

const $formABM = document.getElementById("form-ABM");
const $botonABM = document.getElementById("botonABM");
const $botonCancelar = document.getElementById("botonCancelar");

const $selectTipo = document.getElementById("tipo");
$selectTipo.setAttribute("disabled", "false");

const $inputId = document.getElementById("id");
const $labelId = document.getElementById("idLabel");

const $inputBaja = document.getElementById("inputBaja");
const $inputSubmit = document.getElementById("inputSubmit");

$botonABM.addEventListener("click", () => {
    intercambiarFormularios(); //Cuando abro el form ABM, oculto el de datos

    $formABM.reset(); //Vacío todas las inputs (incluye al select)
    intercambiarInputs(); //Pongo las inputs que corresponden en base al select

    $inputSubmit.value = "Agregar"; //El input submit se llama Agregar
    $inputBaja.setAttribute("type", "hidden"); //Oculto el boton de baja

    $inputId.style.setProperty("display", "none"); //Oculto el input ID
    $labelId.style.setProperty("display", "none"); //Oculto el label ID

    $selectTipo.removeAttribute("disabled"); //Hago que el select se pueda usar

    $tituloABM.textContent = "Alta";
    $tituloABM.style.backgroundColor = "rgb(39, 158, 28)";
});

$botonCancelar.addEventListener("click", () => {
    intercambiarFormularios(); //Si cancelo, vuelvo al otro formulario
});

function intercambiarFormularios(loaderActivo = false) {
    if (!loaderActivo) {
        if ($seccionABM.style.getPropertyValue("display") === "none") {
            $seccionABM.style.setProperty("display", "flex");
            $seccionDatos.style.setProperty("display", "none");

            //Vuelvo a habilitar todo lo que necesite habilitar
            txtNombre.removeAttribute("disabled");
            txtApellido.removeAttribute("disabled");
            numEdad.removeAttribute("disabled");

            txtEquipo.removeAttribute("disabled");
            txtPosicion.removeAttribute("disabled");
            numCantidadGoles.removeAttribute("disabled");
            txtTitulo.removeAttribute("disabled");
            txtFacultad.removeAttribute("disabled");
            numAñoGraduacion.removeAttribute("disabled");
        } else {
            $seccionABM.style.setProperty("display", "none");
            $seccionDatos.style.setProperty("display", "flex");
        }
    } else {
        if ($seccionABM.style.getPropertyValue("display") === "none") {
            $seccionDatos.style.setProperty("display", "none");
        } else {
            $seccionABM.style.setProperty("display", "none");
        }
    }
}

/////   SWITCHEAR INPUTS EN ABM   //////////////////////////////////////////////////////////////////
const $inputsFutbolista = document.getElementById("inputFutbolistas");
const $inputsProfesional = document.getElementById("inputProfesionales");

$selectTipo.addEventListener("change", () => {
    intercambiarInputs();
});

function intercambiarInputs() {
    if ($selectTipo.value === "Futbolistas") {
        $inputsProfesional.style.setProperty("display", "none");
        $inputsFutbolista.style.setProperty("display", "block");

        document.querySelectorAll("#inputFutbolistas input").forEach((input) => {
            input.setAttribute("required", "true");
        });
        document.querySelectorAll("#inputProfesionales input").forEach((input) => {
            input.removeAttribute("required");
        });
    } else {
        $inputsFutbolista.style.setProperty("display", "none");
        $inputsProfesional.style.setProperty("display", "block");

        document.querySelectorAll("#inputProfesionales input").forEach((input) => {
            input.setAttribute("required", "true");
        });
        document.querySelectorAll("#inputFutbolistas input").forEach((input) => {
            input.removeAttribute("required");
        });
    }
}

const { txtId, txtNombre, txtApellido, numEdad,
    txtEquipo, txtPosicion, numCantidadGoles, txtTitulo, txtFacultad, numAñoGraduacion} = $formABM;

window.addEventListener("click", (e) => {
    if (e.target.matches("#btnModificar")) {
        const id = e.target.getAttribute("data-id");
        console.log(`Modificar ${id}`);

        const personaSeleccionada = listaGlobal.find((p) => p.id == id);
        console.log(personaSeleccionada);

        intercambiarFormularios();
        cargarFormABM(personaSeleccionada, true);

        $inputSubmit.value = "Aceptar";
        $tituloABM.textContent = "Modificación";
        $tituloABM.style.backgroundColor = "rgb(209, 151, 43)";
    } else if (e.target.matches("#btnEliminar")) {
        const id = e.target.getAttribute("data-id");
        console.log(`Eliminar ${id}`);

        const personaSeleccionada = listaGlobal.find((p) => p.id == id);
        console.log(personaSeleccionada);

        intercambiarFormularios();
        cargarFormABM(personaSeleccionada, false);

        $inputSubmit.value = "Aceptar";
        $tituloABM.textContent = "Eliminación";
        $tituloABM.style.backgroundColor = "rgb(185, 71, 43)";
    }
});

function cargarFormABM(persona, esModificacion) {
    console.log(persona);

    //Cargo todos los valores con la entidad recibida
    txtId.value = persona.id;
    txtNombre.value = persona.nombre;
    txtApellido.value = persona.apellido;
    numEdad.value = persona.edad;

    $selectTipo.setAttribute("disabled", "true"); //Que no se pueda cambiar tipo

    $labelId.style.setProperty("display", "block"); //Que se muestre el ID
    $inputId.style.setProperty("display", "block"); //Que el ID no se pueda modificar

    if ("equipo" in persona) {
        txtEquipo.value = persona.equipo;
        txtPosicion.value = persona.posicion;
        numCantidadGoles.value = persona.cantidadGoles;
        $selectTipo.value = "Futbolistas"; //Pongo el filtro en 'Futbolistas'

        $inputsProfesional.style.setProperty("display", "none"); //Oculto las input 'Profesional'
        $inputsFutbolista.style.setProperty("display", "block"); //Muestro las input 'Futbolista'
    } else {
        txtTitulo.value = persona.titulo;
        txtFacultad.value = persona.facultad;
        numAñoGraduacion.value = persona.añoGraduacion;
        $selectTipo.value = "Profesionales"; //Pongo el filtro en 'Profesionales'

        $inputsFutbolista.style.setProperty("display", "none"); //Oculto las input 'Futbolista'
        $inputsProfesional.style.setProperty("display", "block"); //Muestro las input 'Profesional'
    }

    if (!esModificacion) { //Si es un menú de Baja, no se puede modificar ningun campo
        txtNombre.setAttribute("disabled", "true");
        txtApellido.setAttribute("disabled", "true");
        numEdad.setAttribute("disabled", "true");

        txtEquipo.setAttribute("disabled", "true");
        txtPosicion.setAttribute("disabled", "true");
        numCantidadGoles.setAttribute("disabled", "true");
        
        txtTitulo.setAttribute("disabled", "true");
        txtFacultad.setAttribute("disabled", "true");
        numAñoGraduacion.setAttribute("disabled", "true");
    }
}

/////   BOTÓN SUBMIT (ALTA O MODIFICACIÓN)   ///////////////////////////////////////////////////////////
$formABM.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Enviando...");

/////   VALIDACIÓN (TRY-CATCH)   ///////////////////////////////////////////////////////////////////////
    try {
         validarEntidad(txtNombre.value, txtApellido.value, parseInt(numEdad.value), 
            txtEquipo.value, txtPosicion.value, parseInt(numCantidadGoles.value), 
            txtTitulo.value, txtFacultad.value, parseInt(numAñoGraduacion.value), $selectTipo.value)

        if (txtId.value === "") { //Si no hay valor de ID, es una persona nueva (ALTA)
            console.log("persona nueva");
            if ($selectTipo.value === "Futbolistas") {
                const futbolistaNuevo = new Futbolista(
                    'N/A', //Primero le hardcodeamos un 'N/A' al ID, ya que de eso se encarga el Servidor
                    txtNombre.value,
                    txtApellido.value,
                    parseInt(numEdad.value),
                    txtEquipo.value,
                    txtPosicion.value,
                    parseInt(numCantidadGoles.value)
                )
    
                createPersona(futbolistaNuevo);
            } else {
                const profesionalNuevo = new Profesional(
                    'N/A',
                    txtNombre.value,
                    txtApellido.value,
                    parseInt(numEdad.value),
                    txtTitulo.value,
                    txtFacultad.value,
                    parseInt(numAñoGraduacion.value)
                )

                createPersona(profesionalNuevo);
            }
        }  else if ($tituloABM.textContent === "Modificación") { //Si hay valor de ID, es una modificación
            console.log("Persona existente");
    
            if ($selectTipo.value === "Futbolistas") {
                const futbolistaNuevo = new Futbolista(
                    txtId.value,
                    txtNombre.value,
                    txtApellido.value,
                    parseInt(numEdad.value),
                    txtEquipo.value,
                    txtPosicion.value,
                    parseInt(numCantidadGoles.value)
                )

                updatePersona(futbolistaNuevo);
            } else {
                const profesionalNuevo = new Profesional(
                    txtId.value,
                    txtNombre.value,
                    txtApellido.value,
                    parseInt(numEdad.value),
                    txtTitulo.value,
                    txtFacultad.value,
                    parseInt(numAñoGraduacion.value)
                )

                updatePersona(profesionalNuevo);
            }
        } else { //Si no es Alta ni Modificación, es Baja
            deletePersona(txtId.value);
        }

        intercambiarFormularios(true);
    } catch (error) {
        alert(error.message);
    }
});

// PUT (Alta persona) - FETCH ASYNC ///////////////////////////////////////////////////////////
const createPersona = async (persona) => {
    try {
        mostrarLoader();

        const data = await fetch(URL, {
            method: "PUT",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(persona)
        });

        const dataRecibida = await data.json();

        persona.id = dataRecibida.id;
        listaGlobal.push(persona);
        actualizarTabla($divTablaContenedor, listaGlobal);
        console.log("Funcionó el alta de la persona");
    } catch (err) {
        console.log(err);
        console.error(`Error: ${err.status} - ${err.statusText}`);
        alert(`Error: ${err.status} - ${err.statusText}`);
    } finally {
        ocultarLoader();
        mostrarSeccionDatos();
    }
}

// UPDATE (Modificar persona) - FETCH ///////////////////////////////////////////////////////////
const updatePersona = (persona) =>{
    mostrarLoader();

    fetch(URL + "/" + persona.id, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" }, 
        body: JSON.stringify(persona)
    })
    .then((res) => {  
        if (!res.ok) {
            return res.text().then((text) => Promise.reject({ status: res.status, statusText: text }));
        }
    })
    .then(() => {
        let index = listaGlobal.findIndex((p) => p.id == persona.id);
        listaGlobal.splice(index, 1, persona);

        console.log("La modificación se realizó correctamente");
        actualizarTabla($divTablaContenedor, listaGlobal);
    })
    .catch((err) => {
        if (persona.id == 666) {
            const error = err.statusText;
            alert(error);
        } else {
            alert(`Error: ${err.status} - ${err.statusText}`);
        }
    })
    .finally(() =>{
        ocultarLoader();
        mostrarSeccionDatos();
    });
}

// DELETE (Baja persona) - AJAX ///////////////////////////////////////////////////////////
const deletePersona = (id) =>{
    mostrarLoader();

    console.log(`Se va a eliminar el elemento de id: ${id}`);

    const xhr = new XMLHttpRequest();

    xhr.open("DELETE", URL);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify({id: id})); //Enviamos el id por el cuerpo y no por la URL

    xhr.addEventListener("readystatechange", () =>{
        if(xhr.readyState == 4){
            if (xhr.status >= 200 && xhr.status <= 299){
                console.log("La eliminación se realizó correctamente");

                let index = listaGlobal.findIndex((p) => p.id == id);
                listaGlobal.splice(index, 1);

                actualizarTabla($divTablaContenedor, listaGlobal);
            } else {
                if (id == 666) {
                    const error = xhr.responseText;
                    alert(error);
                } else {
                    alert(`Error: ${xhr.status} - ${xhr.statusText}`);
                }
            }

            ocultarLoader();
            mostrarSeccionDatos();
        };
    });
};