# CRUD Futbolistas - Profesionales
## Página Web - HTML, CSS y JavaScript (Con Servidor Apache)

Este repositorio contiene un proyecto que corresponde al Segundo Parcial de la materia Laboratorio III, perteneciente a la carrera Tecnicatura Universitaria en Programación.
Utilizo HTML, CSS, JavaScript y un servidor Apache para hacer peticiones. Todo hecho en el IDE Visual Studio Code.

### Detalles de la aplicación
La página web tiene una tabla con todos los datos de las personas, y un formulario para hacer las Altas, Bajas o Modificaciones. En este proyecto no hay persistencia de datos, al reiniciar la página se carga una lista de vehículos predeterminada.

### Conexión con el Servidor
En primera instancia, al iniciar la aplicación, se realiza una petición al servidor para obtener la lista predeterminada de personas. Esta lista es un array hardcodeado en el archivo .php llamado 'personasFutbolistasProfesionales.php'. 

Este archivo php es quien funciona como receptor de las peticiones que hagamos con la aplicación web (las cuales se realizan mediante los archivos JS). En este caso, el funcionamiento se logra ubicando el archivo php dentro de la carpeta 'htdocs' de la carpeta del XAMPP, con la intención de hacerlo correr gracias al servidor Apache. 

> [!IMPORTANT]
> En este caso, el verbo 'POST' se encarga de hacer modificaciones, y el 'PUT' se encarga de hacer altas.

> [!IMPORTANT]
> La idea del Servidor en esta aplicación es la simulación del envío de petición y la recepción de la respuesta. Realmente, no estamos guardando los datos en ninguna base de datos. Al reiniciar la página web, todo vuelve a su estado base predeterminado.

Cada vez que hacemos una petición al servidor, ya sea pedirle los datos (al iniciar), hacer un alta, una baja o una modificación, la aplicación muestra un loader durante 3 segundos, el cual es el tiempo establecido en una línea del archivo .php.

### Funcionamiento
La página web tiene primeramente una tabla con todos los datos de las personas, las cuales pueden ser futbolistas o profesionales. Cada fila tiene dos columnas extra con los botones de 'Modificar' y 'Eliminar'. Al hacer clic en alguno, se despliega un formulario con los datos correspondientes a la fila seleccionada.

El botón de 'Agregar Elemento' abre el formulario del Alta, donde el usuario puede crear una nueva persona (futbolista o profesional) con los datos que quiera.

> [!NOTE]
> Universidad Tecnológica Nacional, 2023.
