// Función para calcular la cantidad de cadáveres entregados y no entregados

export function CadaveresEntregados(querySnapshot) {
    const cadaveresEntregados = {
        Entregados: 0,
        NoEntregados: 0,
    };

    
    querySnapshot.forEach((doc) => {
        // Obtener el estado de entrega del cadáver
        const entregado = doc.data().estado_entrega;
        
        if (entregado) {
            cadaveresEntregados["Entregados"]++;
        } else {
            cadaveresEntregados["NoEntregados"]++;
        }
    });

    
    const totalCadaveres = cadaveresEntregados.Entregados + cadaveresEntregados.NoEntregados;    
    const cardTotalCadaveres = document.getElementById("card-total-cadaveres");
    cardTotalCadaveres.querySelector(".card-text").textContent = totalCadaveres;

    const cardEntregados = document.getElementById("card-entregados");
    cardEntregados.querySelector(".card-text").textContent = cadaveresEntregados["Entregados"];
    
    
    const cardNoEntregados = document.getElementById("card-no-entregados");
    cardNoEntregados.querySelector(".card-text").textContent = cadaveresEntregados["NoEntregados"];
    
    return cadaveresEntregados;
    
}




