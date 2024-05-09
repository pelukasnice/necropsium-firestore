import { eliminarCadaver, tenerCadaver } from "../firebase.js";



//////////////////////////////////////////////////////////  ELIMINAR REGISTRO CADAVER   //////////////////////////////////////////////////////////     



export function borrarCadaver(id, dataCadaver) {
    eliminarCadaver(id)
        .then(() => {
            // Busca la fila que corresponde  al registro eliminado
            const filaEliminada = dataCadaver.row($(`#tabla-cadaver tr[data-id="${id}"]`));

            // Elimina la fila de la tabla
            filaEliminada.remove().draw();    

            $("#verModal").modal("hide");
            toastr.error("Registro eliminado con éxito", "Atencion", {
                "positionClass": "toast-top-right", 
                "timeOut": "2000",                  
                "progressBar": true                 
            });

            $("#verModal").modal("hide");
        })
        .catch((error) => {
            console.error("Error al eliminar el registro:", error);
        });
    
}



////////////////////////////////////////////////////////// OBSERVACIONES CADAVER  ////////////////////////////////////////////////////////// 


$(document).on("click", ".botonAbrirModal", async function () {
    const id = $(this).data("id");
    verCadaver(id);
});


export async function verCadaver(id) {

    const doc = await tenerCadaver(id);
    const datosCadaver = doc.data();

    // Agrega el legajo al modal 
    const tituloModal = $("#obsModal .modal-title");
    tituloModal.text("Legajo: " + datosCadaver.legajo);

    // Muestra las observaciones en el modal ver
    const cuerpoModal = $("#obsModal .modal-body");
    cuerpoModal.text(datosCadaver.observaciones);
    $("#obsModal").modal("show");

}

