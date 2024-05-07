export function GraficoPorcentajeCausa(querySnapshot) {
    const causasMuerte = {};
    const totalCadaveres = querySnapshot.size; // Obtiene el total de cadáveres
    
    querySnapshot.forEach((doc) => {
        const causaMuerte = doc.data().causa_muerte;
        causasMuerte[causaMuerte] = (causasMuerte[causaMuerte] || 0) + 1;
    });

    // Calcular el porcentaje de cada causa de muerte
    const labels = [];
    const data = [];
    const backgroundColors = [
        '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', 
        '#C7CEEA', '#9ED2F6', '#A0E7E5', '#CBF0F8', '#FF9AA2', 
        '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'
    ]; 

    Object.keys(causasMuerte).forEach((causa, index) => {
        const porcentaje = (causasMuerte[causa] / totalCadaveres) * 100;
        labels.push(causa);
        data.push(porcentaje.toFixed(2)); // Redondea el porcentaje a dos decimales
    });

    // GRAFICO DE TORTA
    
    const ctxCausaMuerte = document.getElementById("porcentajeCausa").getContext("2d");
    new Chart(ctxCausaMuerte, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Porcentaje de cadáveres por causa de muerte",
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
