
export function GraficoPorcentajeLocalidad(querySnapshot) {
    const localidadesCadaveres = {};
    const totalCadaveres = querySnapshot.size;


    querySnapshot.forEach((doc) => {
        const localidad = doc.data().localidad;
        localidadesCadaveres[localidad] = (localidadesCadaveres[localidad] || 0) + 1;
    });

    

    const backgroundColors = [
        '#FAD2E1', // Rosa pastel


        '#CAFFBF', // Verde pastel
        '#9BF6FF', // Azul pastel
        '#FFD6A5', // Naranja pastel
        '#A0C4FF', // Azul cielo pastel
        '#FDFFB6', // Amarillo pastel
        '#BDB2FF'  // Lila pastel
    ];

    // Obtener las etiquetas (localidades) y los datos (porcentaje de cadáveres)
    const labels = Object.keys(localidadesCadaveres).map(localidad => `${localidad} (${Math.round((localidadesCadaveres[localidad] / totalCadaveres) * 100)}%)`);
    const data = Object.values(localidadesCadaveres).map(porcentaje => porcentaje.toFixed(2)); // Redondea el porcentaje a dos decimales



    // GRAFICO DE TORTA

    const ctxLocalidadCadaveres = document.getElementById("porcentajeLocalidad").getContext("2d");
    new Chart(ctxLocalidadCadaveres, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Total",
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(color => color),
                },
            ],
        },
        options: {
            tooltips: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        const value = context.parsed || 0;
                        label += value.toFixed(2) + '%';
                        return label;
                    }
                }
            }
        },
    });
}
