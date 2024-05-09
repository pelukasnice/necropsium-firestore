export function GraficoCadaveresPerito(querySnapshot) {
    const peritos = {};
    querySnapshot.forEach((doc) => {
        const perito = doc.data().perito;
        peritos[perito] = (peritos[perito] || 0) + 1;
    });

    const labels = Object.keys(peritos);
    const data = Object.values(peritos);

// GRAFICO DE BARRA

    const ctxCadaveresPorPerito = document.getElementById("cadaveresPerito").getContext("2d");
    new Chart(ctxCadaveresPorPerito, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Cantidad de cadáveres por perito",
                    data: data,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}