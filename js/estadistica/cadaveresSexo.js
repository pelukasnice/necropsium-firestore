

export function GraficoCadaveresSexo(querySnapshot) {
    const sexos = {};
    const totalCadaveres = querySnapshot.size; // Obtener el total de cadáveres

    
    querySnapshot.forEach((doc) => {
        const sexo = doc.data().sexo;
        sexos[sexo] = (sexos[sexo] || 0) + 1;
        /* Para cada documento, obtiene el valor del campo "sexo" y lo utiliza como clave en un objeto sexos. Si el sexo ya existe en el objeto sexos, se incrementa su contador en 1; de lo contrario, se inicializa en 0 y luego se incrementa a 1.*/
    });

    // Calcular el porcentaje de cada sexo
    const labels = [];
    const data = [];
    const backgroundColors = []; 

    Object.keys(sexos).forEach((sexo, index) => {
        const porcentaje = (sexos[sexo] / totalCadaveres) * 100;
        labels.push(sexo);
        data.push(Math.round(porcentaje)); // Redondear el porcentaje. 

        // Colores basados en el sexo
        if (sexo === "masculino") {
            backgroundColors.push('#6FC3DF'); // Celeste
        } else if (sexo === "femenino") {
            backgroundColors.push('#FF98B5'); // Rosado
        } else {
            backgroundColors.push('#FFE066'); // Amarillo 
        }
    });

    // GRAFICO DE TORTA

    const ctxPorcentajeSexo = document.getElementById("porcentajeSexo").getContext("2d");
    new Chart(ctxPorcentajeSexo, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "sexo % ",
                    data: data,
                    backgroundColor: backgroundColors,
                },
            ],
        },
        options: {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        const dataset = data.datasets[tooltipItem.datasetIndex];
                        const label = dataset.label || '';
                        const value = dataset.data[tooltipItem.index];
                        return `${label}: ${value.toLocaleString(undefined, { style: 'percent' })}`;
                    }
                }
            }
        }
    });
}