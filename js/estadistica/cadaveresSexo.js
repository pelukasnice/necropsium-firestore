

export function GraficoCadaveresSexo(querySnapshot) {
    const sexos = {};
    let total = 0; // Obtener el total de cadáveres


    querySnapshot.forEach((doc) => {
        const sexo = doc.data().sexo;
        sexos[sexo] = (sexos[sexo] || 0) + 1;
        total++
        /* Para cada documento, obtiene el valor del campo "sexo" y lo utiliza como clave en un objeto sexos. Si el sexo ya existe en el objeto sexos, se incrementa su contador en 1; de lo contrario, se inicializa en 0 y luego se incrementa a 1.*/
    });

    // Calcular el porcentaje de cada sexo

    const backgroundColors = [];

    Object.keys(sexos).forEach(sexo => {

        // Colores basados en el sexo
        if (sexo === "masculino") {
            backgroundColors.push('#B8DAF3'); // Celeste
        } else if (sexo === "femenino") {
            backgroundColors.push('#FDDDE6'); // Rosado
        } else {
            backgroundColors.push(' #D5BDE5'); // Amarillo 
        }
    });

    // Obtener las etiquetas (destinos) y los datos (cantidad por destino)
    const labels = Object.keys(sexos).map(sexo => `${sexo} (${Math.round((sexos[sexo] / total) * 100)}%)`);

    const data = Object.values(sexos);
    // GRAFICO DE TORTA

    const ctxPorcentajeSexo = document.getElementById("porcentajeSexo").getContext("2d");
    new Chart(ctxPorcentajeSexo, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Total ",
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(color => color),
                },
            ],
        },
        options: {
            responsive:true,

        }
    });
}