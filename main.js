const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');

formularioCalculadora.addEventListener('submit', (evento) => {
    evento.preventDefault();

    calcularCalorias();
})

function calcularCalorias() {
    aparecerResultado();

    const tipodocumento = document.querySelector('#tipoDocumento');
    const numeroDocumento = document.querySelector('#numeroDocumento');
    const nombre = document.querySelector('#nombre');
    const edad = document.querySelector('#edad');
    const peso = document.querySelector('#peso');
    const altura = document.querySelector('#altura');
    const genero = document.querySelector('input[name="genero"]:checked');
    const actividad = document.querySelector('#actividad');
    // const totalCalorias = document.querySelector('#total-calorias');
    let sexo = "";
    console.log(genero.id);

    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }

    if ( !(edad.value && peso.value && altura.value) ) {
        mostrarMensajeDeError('Por favor asegúrese de llenar todos los campos');
        return;
    } else if (edad.value < 15 || edad.value > 80) {
        mostrarMensajeDeError('La edad ingresada no es permitida');
        return;
    }else if(numeroDocumento.value.length < 8 || numeroDocumento.value.length > 14 ){
        mostrarMensajeDeError('Numero de documento no permitido');
        return;
    }
    
    let calculoCalorias;
    if (genero.id === 'masculino') {
        //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
        calculoCalorias = actividad.value * ((multiplicadorTMB.peso * peso.value) +
                                             (multiplicadorTMB.altura * altura.value) -
                                             (multiplicadorTMB.edad * edad.value)) + 5;
    } else {
        //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
        calculoCalorias = actividad.value * ((multiplicadorTMB.peso * peso.value) +
                                             (multiplicadorTMB.altura * altura.value) -
                                             (multiplicadorTMB.edad * edad.value)) - 161;
    }
    
    /*"El paciente (nombre del paciente) identificado con (tipo de documento)
        NO.(número de documento), requiere un total de (cantidad calorías) kcal
        para el sostenimiento de su TBM"*/
    
    resultado.innerHTML = `
        <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2">Calorías requeridas</h5>
            <div class="mb-3 w-100">
                <P class="bg-white form-control text-center text-dark fs-2">El paciente ${nombre.value} identificado con ${tipodocumento.value}
                NO.${numeroDocumento.value}, requiere un total de <span class="fs-1"> ${Math.floor(calculoCalorias)} kcal </span>
                para el sostenimiento de su TBM</P>
            </div>
        </div>
    `
     // Volver a limpiar variables
    peso.value = null;
    altura.value = null;
    edad.value = null;
    actividad.value = null;
    sexo = null;
}

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}