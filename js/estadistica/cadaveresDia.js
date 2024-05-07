

export function GraficoCadaveresPorDia(querySnapshot) {
    const cadaveresPorDia = {
        Domingo: 0,
        Lunes: 0,
        Martes: 0,
        Miércoles: 0,
        Jueves: 0,
        Viernes: 0,
        Sábado: 0,
    };

    querySnapshot.forEach((doc) => {
        const fechaEntrada = doc.data().fecha_hora_ingreso.toDate();
        const diaSemana = fechaEntrada.getDay();

        switch (diaSemana) {
            case 0:
                cadaveresPorDia["Domingo"]++;
                break;
            case 1:
                cadaveresPorDia["Lunes"]++;
                break;
            case 2:
                cadaveresPorDia["Martes"]++;
                break;
            case 3:
                cadaveresPorDia["Miércoles"]++;
                break;
            case 4:
                cadaveresPorDia["Jueves"]++;
                break;
            case 5:
                cadaveresPorDia["Viernes"]++;
                break;
            case 6:
                cadaveresPorDia["Sábado"]++;
                break;
        }
    });

    const dia = Object.keys(cadaveresPorDia);
    const cantidad = Object.values(cadaveresPorDia);

    const ctxDia = document.getElementById("diaSemana").getContext("2d");
    new Chart(ctxDia, {
        type: "bar",
        data: {
            labels: dia,
            datasets: [
                {
                    label: "Cadáveres por día de la semana",
                    data: cantidad,
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
