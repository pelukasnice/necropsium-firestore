
export function GraficoPorcentajeLocalidad(querySnapshot) {
    const localidadesCadaveres = {};
    const totalCadaveres = querySnapshot.size; 

    
    querySnapshot.forEach((doc) => {
        const localidad = doc.data().localidad;
        localidadesCadaveres[localidad] = (localidadesCadaveres[localidad] || 0) + 1;
    });

    // Calcula el porcentaje de cadáveres para cada localidad
    const labels = [];
    const data = [];
    const backgroundColors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7']; 

    Object.keys(localidadesCadaveres).forEach((localidad, index) => {
        const porcentaje = (localidadesCadaveres[localidad] / totalCadaveres) * 100;
        labels.push(localidad);
        data.push(porcentaje.toFixed(2)); // Redondea el porcentaje a dos decimales
    });

    // GRAFICO DE TORTA

    const ctxLocalidadCadaveres = document.getElementById("porcentajeLocalidad").getContext("2d");
    new Chart(ctxLocalidadCadaveres, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Porcentaje de cadáveres por localidad",
                    data: data,
                    backgroundColor: backgroundColors,
                },
            ],
        },
        options: {
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        const dataset = data.datasets[tooltipItem.datasetIndex];
                        const label = dataset.label || '';
                        const value = dataset.data[tooltipItem.index];
                        return label + ': ' + value + '%';
                    }
                }
            }
        },
    });
}
