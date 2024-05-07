import { tenerCadaver, actualizarCadaver } from "../firebase.js";
import { Timestamp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// MUESTRA LOS DATOS AL EDITAR LA ENTREGA

export async function editarEntrega(entregaId, entregaForm) {

    const doc = await tenerCadaver(entregaId, entregaForm);
    const datosCadaver = doc.data();
    const editID = doc.id;

    entregaForm["fechaEntrega"].value = datosCadaver.fecha_hora_entrega
        .toDate()      
        .toISOString() /*toma la fecha y hora de entrega del formulario, la convierte a un objeto de tipo Date, luego la convierte a una cadena de texto en formato ISO (en el formato "YYYY-MM-DDTHH:MM:SS"), despues divide esta cadena en dos partes usando "T" como separador,toma la primera parte, que es la fecha.*/
        .split("T")[0];
    entregaForm["horaEntrega"].value = datosCadaver.fecha_hora_entrega
        .toDate()
        .toISOString()
        .split("T")[1]
        .slice(0, 5);/*toma la segunda parte, que es la hora, y utilizando slice(0, 5) selecciona los primeros cinco caracteres, que representan la hora en formato "HH:MM".*/
    entregaForm["nombreCocheria"].value = datosCadaver.nombre_cocheria;
    entregaForm["destino"].value = datosCadaver.destino_final;
    entregaForm["ayteEntrega"].value = datosCadaver.ayte_med_entrega;
    estado_entrega: true;

    
    $("#verModal").modal("hide");
    $("#entregaModal").modal("show");
}


//ENVIO DE LOS DATOS DE LA ENTREGA

export function EnvioEntrega(entregaForm) {
    $(document).on("submit", "#entrega-form", function (e) {
        e.preventDefault();

        const entregaId = entregaForm.dataset.id;

        actualizarCadaver(entregaId, {
            nombre_cocheria: entregaForm["nombreCocheria"].value,
            destino_final: entregaForm["destino"].value,
            ayte_med_entrega: entregaForm["ayteEntrega"].value,
            fecha_hora_entrega: Timestamp.fromDate(
                new Date(
                    entregaForm["fechaEntrega"].value + "T" + entregaForm["horaEntrega"].value
                )
            ),
            estado_entrega: true, // Establecer el estado de entrega como true
        });
        toastr.success("Registro agregado con éxito.", "Éxito", {
            "positionClass": "toast-top-right", 
            "timeOut": "2000",                   
            "progressBar": true,                
            
        });
        // Restablece el formulario
        entregaForm.reset();

        // Oculta los modales de entrega
        $("#verModal").modal("hide");
        $("#entregaModal").modal("hide");
    });
}





