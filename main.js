// Definir constantes
const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const agregarTareaBtn = document.querySelector('#agregar-tarea');
const check = 'bi-record-circle';
const tachado = 'tachado';
const uncheck = 'bi-circle';
let LIST = [];
let id = 0;

const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
});

// agrega una tarea
function agregarTarea(tarea, id, hecho, eliminar) {
    if (eliminar) {
        return;
    }

    const realizado = hecho ? check : uncheck;
    const line = hecho ? tachado : '';

    const elemento = `<li>
                        <i id="${id}" data="hecho" class="bi ${realizado}"></i>
                        <p class="tarea-lista text ${line}">${tarea}</p>
                        <i id="${id}" data="eliminar" class="bi bi-x"></i>
                    </li>`;
    
    lista.insertAdjacentHTML("beforeend", elemento);
}

// marca la tarea como completada
function completarTarea(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.tarea-lista').classList.toggle(tachado);

    LIST[element.id].hecho = LIST[element.id].hecho ? false : true;
}

// elimina la tarea
function eliminarTarea(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminar = true;
}

// agrega una tarea con el botón
agregarTareaBtn.addEventListener('click', () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre: tarea,
            id: id,
            hecho: false,
            eliminar: false
        });
        id++;
        input.value = '';
    }
});

// agrega una tarea con la tecla Enter por si compu
document.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea, id, false, false);
            LIST.push({
                nombre: tarea,
                id: id,
                hecho: false,
                eliminar: false
            });
            id++;
            input.value = '';
        }
    }
});

//marca como completada o eliminar
lista.addEventListener('click', function (event) {
    const element = event.target;
    const elementData = element.attributes.data.value;

    if (elementData === 'hecho') {
        completarTarea(element);
    } else if (elementData === 'eliminar') {
        eliminarTarea(element);
    }
});
