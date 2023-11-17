import { actualizarTabla } from "./tabla.js";
import { Empleado } from "../clases/empleado.js"
import { Cliente } from "../clases/cliente.js"
import { validarEntidad } from "./validaciones.js";

const URL = "http://localhost/PersonasEmpleadosClientes.php";

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
        if ("sueldo" in p) {
            return new Empleado(p["id"], p["nombre"], p["apellido"], p["edad"], p["sueldo"], p["ventas"]);
        } else {
            return new Cliente(p["id"], p["nombre"], p["apellido"], p["edad"], p["compras"], p["telefono"]);
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
                //Convierto los elementos de la listaGlobal en Empleados/Clientes

                actualizarTabla($divTablaContenedor, data);
                //Actualizo la tabla con lo que acabamos de traer
            } else {
                //Si el resultado no es exitoso...
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                //El console.error es como el log pero sale en rojo

                alert(`Error: ${xhr.status} - ${xhr.statusText}`);
            }

            ocultarLoader();
            mostrarSeccionDatos();
            //Sea exitosa o no la respuesta, oculto el loader
        };
    });
};
// GET (Todas las personas) - FETCH ////////////////////////////////////////////////////////////////////////
/*const getPersonas = () =>{
    mostrarLoader();
    //Muestro el loader (la imágen .gif)

    fetch(URL) //Envío la petición (por default GET)
    .then((res) => {  //'res' es Response (respuesta en este caso atrapada por el then)
        return res.ok? res.json() : Promise.reject(res);
        //Este operador ternario resume lo que comentamos abajo
        //Si res.ok es true, ejecutará 'res.json()', y sino, ejecuta 'Promise.reject(res)'
    })
    .then((data) => {
        //Si el resultado es exitoso...

        listaGlobal = data;
        //Guardo lo que recibimos de la API en nuestra listaGlobal

        convertirLista();
        //Convierto los elementos de la listaGlobal en Empleados/Clientes

        actualizarTabla($divTablaContenedor, data);
        //Actualizo la tabla con lo que acabamos de traer
    })
    .catch((err)=>{
        //Si el resultado no es exitoso...
        console.error(`Error: ${err.status} - ${err.statusText}`); 
        //El console.error es como el log pero sale en rojo

        alert(`Error: ${err.status} - ${err.statusText}`);
    })
    .finally(() =>{
        ocultarLoader();
        //Sea exitosa o no la respuesta, oculto el loader
    });
}*/


/////   INICIO - LISTAR TODO   ///////////////////////////////////////////////////////////////////////
getPersonas();
//Cargo la listaGlobal con lo que traemos del Servidor y además cargamos la tabla

const $tituloABM = document.getElementById("tituloABM");

/////   SWITCHEAR FORMULARIOS   ///////////////////////////////////////////////////////////////////////
const $seccionABM = document.getElementById("seccion-ABM");
//$seccionDatos.style.setProperty("display", "flex");
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

            numSueldo.removeAttribute("disabled");
            numVentas.removeAttribute("disabled");
            numCompras.removeAttribute("disabled");
            numTelefono.removeAttribute("disabled");
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
const $inputsEmpleado = document.getElementById("inputEmpleados");
const $inputsCliente = document.getElementById("inputClientes");

$selectTipo.addEventListener("change", () => {
    intercambiarInputs();
});

function intercambiarInputs() {
    if ($selectTipo.value === "Empleados") {
        $inputsCliente.style.setProperty("display", "none");
        $inputsEmpleado.style.setProperty("display", "block");

        document.querySelectorAll("#inputEmpleados input").forEach((input) => {
            input.setAttribute("required", "true");
        });
        document.querySelectorAll("#inputClientes input").forEach((input) => {
            input.removeAttribute("required");
        });
    } else {
        $inputsEmpleado.style.setProperty("display", "none");
        $inputsCliente.style.setProperty("display", "block");

        document.querySelectorAll("#inputClientes input").forEach((input) => {
            input.setAttribute("required", "true");
        });
        document.querySelectorAll("#inputEmpleados input").forEach((input) => {
            input.removeAttribute("required");
        });
    }
}

const { txtId, txtNombre, txtApellido, numEdad,
    numVentas, numSueldo, numCompras, numTelefono} = $formABM;

window.addEventListener("click", (e) => {
    if (e.target.matches("#btnModificar")) {
        const id = e.target.getAttribute("data-id");
        console.log(`Modificar ${id}`);

        const personaSeleccionada = listaGlobal.find((p) => p.id == id);
        console.log(personaSeleccionada);

        if (id !== 666 && id !== '666') {
            intercambiarFormularios();
            cargarFormABM(personaSeleccionada, true);
    
            $inputSubmit.value = "Aceptar";
            $tituloABM.textContent = "Modificación";
            $tituloABM.style.backgroundColor = "rgb(209, 151, 43)";
        } else {
            alert('No se puede modificar un elemento con ID 666');
        }
    } else if (e.target.matches("#btnEliminar")) {
        const id = e.target.getAttribute("data-id");
        console.log(`Eliminar ${id}`);

        const personaSeleccionada = listaGlobal.find((p) => p.id == id);
        console.log(personaSeleccionada);

        if (id !== 666 && id !== '666') {
            intercambiarFormularios();
            cargarFormABM(personaSeleccionada, false);
    
            $inputSubmit.value = "Aceptar";
            $tituloABM.textContent = "Eliminación";
            $tituloABM.style.backgroundColor = "rgb(185, 71, 43)";
        } else {
            alert('No se puede eliminar un elemento con ID 666');
        }
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

    if ("sueldo" in persona) {
        numSueldo.value = persona.sueldo;
        numVentas.value = persona.ventas;
        $selectTipo.value = "Empleados"; //Pongo el filtro en 'Empleados'

        $inputsCliente.style.setProperty("display", "none"); //Oculto las input 'Cliente'
        $inputsEmpleado.style.setProperty("display", "block"); //Muestro las input 'Empleado'
    } else {
        numCompras.value = persona.compras;
        numTelefono.value = persona.telefono;
        $selectTipo.value = "Clientes"; //Pongo el filtro en 'Clientes'

        $inputsEmpleado.style.setProperty("display", "none"); //Oculto las input 'Empleado'
        $inputsCliente.style.setProperty("display", "block"); //Muestro las input 'Cliente'
    }

    if (!esModificacion) { //Si es un menú de Baja, no se puede modificar ningun campo
        txtNombre.setAttribute("disabled", "true");
        txtApellido.setAttribute("disabled", "true");
        numEdad.setAttribute("disabled", "true");

        numSueldo.setAttribute("disabled", "true");
        numVentas.setAttribute("disabled", "true");
        numCompras.setAttribute("disabled", "true");
        numTelefono.setAttribute("disabled", "true");
    }
}


/////   BOTÓN SUBMIT (ALTA O MODIFICACIÓN)   ///////////////////////////////////////////////////////////
$formABM.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Enviando...");

/////   VALIDACIÓN (TRY-CATCH)   ///////////////////////////////////////////////////////////////////////
    try {
        validarEntidad(txtNombre.value, txtApellido.value, parseInt(numEdad.value), 
            parseInt(numVentas.value), parseInt(numSueldo.value), parseInt(numCompras.value), 
            parseInt(numTelefono.value), $selectTipo.value)

        if (txtId.value === "") { //Si no hay valor de ID, es una persona nueva (ALTA)
            console.log("persona nueva");

            if ($selectTipo.value === "Empleados") {
                const empleadoNuevo = new Empleado(
                    'N/A', //Primero le hardcodeamos un 'N/A' al ID, ya que de eso se encarga el Servidor
                    txtNombre.value,
                    txtApellido.value,
                    parseInt(numEdad.value),
                    parseInt(numSueldo.value),
                    parseInt(numVentas.value)
                )
    
                createPersona(empleadoNuevo);
            } else {
                const clienteNuevo = new Cliente(
                    'N/A',
                    txtNombre.value,
                    txtApellido.value,
                    parseInt(numEdad.value),
                    parseInt(numCompras.value),
                    parseInt(numTelefono.value)
                )

                createPersona(clienteNuevo);
            }
        }  else if ($tituloABM.textContent === "Modificación") { //Si hay valor de ID, es una modificación
            console.log("Persona existente");
    
            if ($selectTipo.value === "Empleados") {
                const empleadoNuevo = new Empleado(
                    txtId.value,
                    txtNombre.value,
                    txtApellido.value,
                    parseInt(numEdad.value),
                    parseInt(numSueldo.value),
                    parseInt(numVentas.value)
                )
    
                let index = listaGlobal.findIndex((p) => p.id == empleadoNuevo.id);
                listaGlobal.splice(index, 1, empleadoNuevo);

                updatePersona(empleadoNuevo);
            } else {
                const clienteNuevo = new Cliente(
                    txtId.value,
                    txtNombre.value,
                    txtApellido.value,
                    parseInt(numEdad.value),
                    parseInt(numCompras.value),
                    parseInt(numTelefono.value)
                )

                let index = listaGlobal.findIndex((p) => p.id == clienteNuevo.id);
                listaGlobal.splice(index, 1, clienteNuevo);

                updatePersona(clienteNuevo);
            }
        } else { //Si no es Alta ni Modificación, es Baja
            deletePersona(txtId.value);
            let index = listaGlobal.findIndex((p) => p.id == txtId.value);
            listaGlobal.splice(index, 1);
        }

        intercambiarFormularios(true);
    } catch (error) {
        alert(error.message);
    }
});



// PUT (Alta persona) - AJAX ///////////////////////////////////////////////////////////
/*const createPersona = (persona) =>{
    mostrarLoader();
    
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", URL);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    //El verbo va a ser PUT en vez de GET
    //El 'setRequestHeader' significa que vamos a setear las cabezeras. Le decimos al server de qué tipo va a ser lo que le estamos mandando.

    xhr.send(JSON.stringify(persona));
    //Al enviar, tenemos que especificar qué estamos enviando. Por eso, le pasamos un string JSON de la data. Y la data obviamente es lo que hardcodeamos antes (la persona Juan Perez)

    xhr.addEventListener("readystatechange", () =>{
        if(xhr.readyState == 4){
            if (xhr.status >= 200 && xhr.status <= 299){
                const data = JSON.parse(xhr.responseText); //La data recibida va a ser un objeto {id: random}
                persona.id = data.id; //A la persona creada, le asignamos el id que nos devolvió el Servidor

                listaGlobal.push(persona); //Agregamos a la persona a la lista en memoria

                actualizarTabla($divTablaContenedor, listaGlobal);

                console.log("Funcionó el alta de la persona");
            }else{
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                alert(`Error: ${xhr.status} - ${xhr.statusText}`);
            }

            ocultarLoader();
            mostrarSeccionDatos();
        };
    });
};*/

// PUT (Alta persona) - FETCH ///////////////////////////////////////////////////////////
const createPersona = (persona) =>{
    mostrarLoader();

    fetch(URL, {
        method: "Put",
        headers: { "Content-Type": "application/json;charset=utf-8" }, //headers es ese objeto
        body: JSON.stringify(persona)
    }) //Envío la petición (Le paso un destino y un objeto Options)
    .then((res) => {  
        return res.ok? res.json() : Promise.reject(res);
    })
    .then((data) => {
        persona.id = data.id; //A la persona creada, le asignamos el id que nos devolvió el Servidor

        listaGlobal.push(persona); //Agregamos a la persona a la lista en memoria

        actualizarTabla($divTablaContenedor, listaGlobal);

        console.log("Funcionó el alta de la persona");
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`); 
        alert(`Error: ${err.status} - ${err.statusText}`); 
    })
    .finally(() =>{
        ocultarLoader();
        mostrarSeccionDatos();
    });
}

// UPDATE (Modificar persona) - AJAX ///////////////////////////////////////////////////////////
/*const updatePersona = (persona) =>{
    mostrarLoader();

    const xhr = new XMLHttpRequest();

    xhr.open("POST", URL + "/" + persona.id); //Le pasamos como ID, el ID de la persona
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");

    xhr.send(JSON.stringify(persona));

    xhr.addEventListener("readystatechange", () =>{
        if(xhr.readyState == 4){
            if (xhr.status >= 200 && xhr.status <= 299){
                console.log("La modificación se realizó correctamente");
                actualizarTabla($divTablaContenedor, listaGlobal);
            }else{
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                alert(`Error: ${xhr.status} - ${xhr.statusText}`);
            }

            ocultarLoader();
            mostrarSeccionDatos();
        };
    });
};*/

// UPDATE (Modificar persona) - FETCH ///////////////////////////////////////////////////////////
/*const updatePersona = (persona) =>{
    mostrarLoader();

    fetch(URL + "/" + persona.id, {
        method: "Post",
        headers: { "Content-Type": "application/json;charset=utf-8" }, //headers es ese objeto
        body: JSON.stringify(persona)
    }) //Envío la petición (Le paso un destino y un objeto Options)
    .then((res) => {  
        return res.ok? res : Promise.reject(res); //El 'res' lo dejó así, en vez de 'res.json()'
    })
    .then(() => {
        console.log("La modificación se realizó correctamente");
        actualizarTabla($divTablaContenedor, listaGlobal);
    })
    .catch((err) => {
        console.error(err);
        console.error(`Error: ${err.status} - ${err.statusText}`); 
        alert(`Error: ${err.status} - ${err.statusText}`); 
    })
    .finally(() =>{
        ocultarLoader();
        mostrarSeccionDatos();
    });
}*/

// UPDATE (Modificar persona) - FETCH ASYNC ///////////////////////////////////////////////////////////
const updatePersona = async (persona) =>{
    try {
        mostrarLoader();

        await fetch(URL + "/" + persona.id, {
            method: "Put",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(persona)
        });

        console.log("La modificación se realizó correctamente");
        actualizarTabla($divTablaContenedor, listaGlobal);
    } catch (err) {
        console.log(err);
        console.error(`Error: ${err.status} - ${err.statusText}`);
        alert(`Error: ${err.status} - ${err.statusText}`);
    } finally {
        ocultarLoader();
        mostrarSeccionDatos();
    }
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
                actualizarTabla($divTablaContenedor, listaGlobal);
            }else{
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                alert(`Error: ${xhr.status} - ${xhr.statusText}`);
            }

            ocultarLoader();
            mostrarSeccionDatos();
        };
    });
};