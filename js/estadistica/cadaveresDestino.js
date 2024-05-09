export function GraficoDestinoFinal(querySnapshot) {
    const destinos = {};
    let total = 0;

    // Contar la cantidad de cada destino final
    querySnapshot.forEach((doc) => {
        const destino = doc.data().destino_final || "No entregado";
        destinos[destino] = (destinos[destino] || 0) + 1;
        total++;
    });

    // Definir los colores para cada destino final
    const backgroundColors = []; // Colores por defecto

    // Asignar colores basados en los diferentes destinos finales
    Object.keys(destinos).forEach(destino => {
        if (destino === "cremacion") {
            backgroundColors.push('#FF9AA2'); // Naranja
        } else if (destino === "inhumacion") {
            backgroundColors.push('#E2F0CB'); // Verde
        } else {
            backgroundColors.push('#baaea6'); // Gris claro para otros destinos
        }
    });

    // Obtener las etiquetas (destinos) y los datos (cantidad por destino)
    const labels = Object.keys(destinos).map(destino => `${destino} (${Math.round((destinos[destino] / total) * 100)}%)`);

    const data = Object.values(destinos);

    // Crear el gráfico
    const ctxDestinoFinal = document.getElementById("destinoFinal").getContext("2d");
    if (window.myPieChart) {
        window.myPieChart.destroy(); // Destruir instancia anterior si ya existe
    }
    window.myPieChart = new Chart(ctxDestinoFinal, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                label: "Total",
                data: data,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color), // Asegura bordes del mismo color
                borderWidth: 1
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    
                }
            }
        },
    });
}
