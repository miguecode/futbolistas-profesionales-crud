# ⚽ Futbolistas y Profesionales - Página Web con Servidor

Este proyecto es una página web sencilla, fue hecho en 2023 y se trata de un CRUD de futbolistas y profesionales.

## 📘 Descripción

El proyecto es ni más ni menos que una página web creada con HTML, CSS y JS. No está hosteada, así que para acceder a ella la mejor opción es usar Live Server o abrir el index.html. Se trata de un CRUD de futbolistas y profesionales donde el usuario verá una tabla con toda la información de cada elementp y podrá agregar, modificar o eliminar las entradas que quiera. No tiene persistencia de datos y la idea principal del proyecto es trabajar el envío de peticiones a un servidor, que en este caso va a ser Apache.

## 👨‍💻 Menú Principal 

Así se ve la pantalla principal.

<img src="https://github.com/user-attachments/assets/4e2b4a7b-673f-432a-91a8-21d72b095408" width="1100"/>

## ✍ Formulario de creación

Así se ve la pantalla cuando se va a crear un nuevo futbolista o profesional.

<img src="https://github.com/user-attachments/assets/b50dfc03-ec9a-4481-9eb7-a3f4a08f42ba" width="1100"/>


## 🛠️ Funcionalidades

- **Ver datos**: En la tabla podemos ver la información de cada futbolista o profesional.
- **ABM**: Se pueden agregar nuevos futbolistas o profesionales, modificarlos, o eliminarlos.
  La idea para acceder al formulario ABM es hacer clic en 'Agregar' para realizar un Alta. Y para modificar o eliminar, hay que hacer clic en 'Modificar' o 'Eliminar', botones que están incorporados en la tabla, a la derecha de cada entrada.

## 🚀 Cómo Ejecutar el Proyecto

1. **Clonar el repositorio**: Primero que nada hay que clonar el repositorio o en su defecto descargar el ZIP.
2. **Abrir el proyecto**: Abrir la carpeta donde se clonó el proyecto (o la descargada), y abrirla con Visual Studio Code.
3. **Usar Live Server**: La forma recomendada de ejecutar la página web es mediante la extensión **Live Server** de Visual Studio Code.

Otra forma más sencilla es simplemente abrir el archivo **index.html** directamente en algún navegador.

Hasta este punto, ingresar a la página es fácil. Pero como este proyecto se basa en hacer peticiones a un servidor, para poder ver la tabla con las distintas entidades o para agregar nuevas, es necesario estar conectado a ese servidor. De lo contrario se mostrará el error por pantalla.

## 💻 Cómo Conectarse al Servidor Apache
- En primera instancia, al iniciar la aplicación, se realiza una petición al servidor para obtener la lista predeterminada de futbolistas y profesionales. Esta lista es un array hardcodeado en el archivo .php llamado `personasFutbolistasProfesionales.php`, el cual está dentro del proyecto en la carpeta 'php'.

- Este archivo php es quien funciona como receptor de las peticiones que hagamos en la página web. En este caso, el funcionamiento se logra ubicando el archivo php dentro de la carpeta 'htdocs' de la carpeta del XAMPP, con la intención de hacerlo correr gracias al servidor Apache. Esto quiere decir que es necesario tener instalado XAMPP en el sistema, para hacer uso del Servidor Apache.

## 📌 Aclaraciones
- La idea del Servidor en este proyecto es la simulación del envío de petición y la recepción de la respuesta. Realmente no estamos guardando los datos en ninguna base de datos. Al reiniciar la página, todo vuelve a su estado base predeterminado, el cual nace del array que está en el archivo .php.
- Cada vez que hacemos una petición al servidor, ya sea pedirle los datos (al iniciar), hacer un alta, una baja o una modificación, la aplicación muestra un loader durante 3 segundos, el cual es el tiempo establecido en esta línea del archivo .php: `sleep(3);`.
- En este proyecto, el verbo 'POST' se encarga de hacer modificaciones, y el 'PUT' se encarga de hacer altas.
- El elemento con ID '666' no se puede tocar. Al intentar modificarlo o eliminarlo, el Servidor va a devolver un error. Esto está hecho apropósito.
- Fue creado en 2023, mientras cursaba la carrera de Tecnicatura Universitaria en Programación, en la Universidad Tecnológica Nacional.
- No se aceptan contribuciones ni está bajo ninguna licencia específica.

## 🗃️ Otros proyectos similares
- [Héroes y Villanos - ABM](https://github.com/Leumig/heroes-villanos-abm)
