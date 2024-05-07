
export function GraficoCausaMuerte(querySnapshot) {
    const causasMuerte = {};
    querySnapshot.forEach((doc) => {
        const causaMuerte = doc.data().causa_muerte;
        causasMuerte[causaMuerte] = (causasMuerte[causaMuerte] || 0) + 1;
    });

    const labels = Object.keys(causasMuerte);
    const data = Object.values(causasMuerte);

    const ctxCausaMuerte = document.getElementById("causaMuerte").getContext("2d");
    new Chart(ctxCausaMuerte, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Cadáveres por causa de muerte",
                    data: data,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)",
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
