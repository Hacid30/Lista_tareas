//seleccionamos elementos del DOM
const formulario = document.getElementById('formulario');
const nuevaTarea = document.getElementById('nuevaTarea');
const total = document.getElementById('total');
const pendientes = document.getElementById('pendientes');
const completadas = document.getElementById('completadas');
const listaTareas = document.getElementById('lista_tareas');

//Creamos una array para guardas las tareas
let tareas = [];

//agregar tareas
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const texto = nuevaTarea.value.trim();
    if(texto != "" ){
        //creamos un objeto llamado tarea
        tarea = {
            id: Date.now(),
            texto,
            completada : false
        };

        //agregamos el objeto al array
        tareas.push(tarea);

        //limpiamos nuevaTarea
        nuevaTarea.value = "";

        mostrarTarea();
        }
});

// Función para mostrar las tareas
function mostrarTarea( filtro = "todas" ){
    listaTareas.innerHTML = "";

    const filtroTareas = tareas.filter( tarea =>{
        if(filtro === "pendientes") return !tarea.completada;
        if(filtro === "completadas") return tarea.completada;
        return true;
    }
    );

    //Crear la lista de tareas (Los items)
    filtroTareas.forEach(tarea => {
        const li = document.createElement('li');
        li.textContent = tarea.texto;
        if(tarea.completada) {
            li.classList.add('completada');
        }

         //Botón para marcar como completada
        const btnCompletar = document.createElement('button');
        btnCompletar.textContent = tarea.completada ? "Desmarcar" : "Completar";
        btnCompletar.addEventListener('click', () => {
            tarea.completada = !tarea.completada;
            guardarTareas();
            mostrarTarea();
        });

        //Botón para eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
            tareas = tareas.filter( t => t.id !== tarea.id );
            guardarTareas();
            mostrarTarea();
        });

        //añadir los elementos a la ista de tareas
        li.appendChild(btnCompletar);
        li.appendChild(btnEliminar);
        listaTareas.appendChild(li);

    });
}

//Funcion para guardas las tareas en el localStorage
function guardarTareas(){
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

//Funcion para cargar tareas desde el localStorage
function cargarTareas(){
    const tareasGuardadas = localStorage.getItem('tareas');
    if(tareasGuardadas){
        tareas = JSON.parse(tareasGuardadas);
    }
}

//Eventos para pasar el parametero del filtro
total.addEventListener('click', () => { mostrarTarea("todas") });
pendientes.addEventListener('click', () => { mostrarTarea("pendientes") });
completadas.addEventListener('click', () => { mostrarTarea("completadas") });

//cargar tareas al iniciar
cargarTareas();
mostrarTarea();
