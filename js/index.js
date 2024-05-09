import {
  guardarCadaver,
  onObtenerCadaver,
  tenerCadaver,
  actualizarCadaver,
} from "./firebase.js";

import { Timestamp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

import { borrarCadaver } from "./crud/VerBorrarCadaver.js";

import { editarEntrega, EnvioEntrega } from "./crud/editarEntrega.js";



const cadaverForm = document.getElementById("cadaver-form");
const entregaForm = document.querySelector("#entrega-form");

let editSatus = false;
let editID = "";
let entregaId;

//INICILIZAR DATATABLE//

const dataCadaver = $('#tabla-cadaver').DataTable({
  columnDefs: [
    { className: 'text-center', targets: '_all' }
  ],
  language: {
    processing: "Tratamiento en curso...",
    search: "Buscar&nbsp;:",
    lengthMenu: "Agrupar de _MENU_ cadaveres",
    info: "Mostrando cadaveres del _START_ al _END_ de un total de _TOTAL_ cadaveres",
    infoEmpty: "No existen datos.",
    infoFiltered: "(filtrado de _MAX_ elementos en total)",
    infoPostFix: "",
    zeroRecords: "No se encontraron datos con tu busqueda",
    emptyTable: "Cargando...",
    paginate: {
      first: "Primero",
      previous: "Anterior",
      next: "Siguiente",
      last: "Ultimo"
    }
  }
});

function capturarIDEntrega(id) {
  entregaId = id;
  /*console.log(entregaId);*/
}

$(document).ready(async () => {

  onObtenerCadaver((querySnapshot) => {
    let html = "";

    dataCadaver.clear();

    querySnapshot.forEach((doc) => {
      const info = doc.data();

      const dni = info.dni;
      const fechaHoraTimestamp = info.fecha_hora_ingreso;

      const fechaHoraDate = fechaHoraTimestamp.toDate();

      // Formatear la fecha como una cadena legible
      const fechaHoraIngFormateada = fechaHoraDate.toLocaleDateString();

      const estadoEntrega = info.estado_entrega;
      let iconoEstado;

      if (estadoEntrega) {
        // Si estado de entrega es true (entregado), PONE el ícono de tilde
        iconoEstado = '<i class="bi bi-check text-success icono-tabla"></i>'; 
      } else {
        // Si el estado de entrega es false (no entregado), pone el ícono de cruz
        iconoEstado = '<i class="bi bi-x text-danger icono-tabla"></i>'; 
      }

      let botonVer = `<button type="button" class="btn btn-primary btn-ver" data-id="${doc.id}"><i class="bi bi-eye-fill"></i></button>`;
      let botonObservaciones = ""; // almacena las observaciones
      let botonEntrega = !info.estado_entrega ? `<button type="button" class="btn btn-success btn-entrega" data-id="${doc.id}"><i class="bi bi-arrow-up-circle-fill"></i></button>` : "";
      
      let botones = `${botonVer} ${botonEntrega}`;

      // Verifica si hay observaciones
      if (info.observaciones) {
        botonObservaciones = `<button type="button" class="btn botonAbrirModal" data-id="${doc.id}">
                                    <i class="bi bi-chat-square-dots-fill"></i>
                                </button>`;
      } else {
        botonObservaciones = '<td class="text-center">---</td>'; 
      }

      dataCadaver.row.add([
        info.legajo,
        info.expediente,
        info.oficina_Fiscal,
        `${info.apellido} ${info.nombre}`,
        info.edad,
        dni,
        info.causa_muerte,
        fechaHoraIngFormateada,
        iconoEstado,
        info.perito,
        botonObservaciones,
        botones,
        !info.estado_entrega ? `<button type="button" class="btn btn-success btn-entrega"  title="Entregar" data-id="${doc.id}"><i class="bi bi-arrow-up-circle-fill"></i></button>` : ""
      ]);
    });//QUERTYSNAPSHOT
    dataCadaver.draw();



    //////////////////////////////////////////////////////////  VER DATOS CADAVER  //////////////////////////////////////////////////////////




    $(document).on("click", '.btn-ver', async function () {

      const id = $(this).data("id");
      //console.log(id);
      const doc = await tenerCadaver(id);
      //console.log(doc);
      const datosCadaver = doc.data();
      
      const modalTitle = document.querySelector("#verModal .modal-title");
      modalTitle.textContent = "Legajo: " + datosCadaver.legajo;

      const fechaHora_in_Timestamp = datosCadaver.fecha_hora_ingreso;
      const fechaHora_in_Date = fechaHora_in_Timestamp.toDate();
      const fecha_in_Formateada = fechaHora_in_Date.toLocaleDateString();

      // Formatear la fecha como una cadena legible
      const horasIn = fechaHora_in_Date
        .getHours()
        .toString()
        .padStart(2, "0"); // toma la hora de una fecha, la convierte en una cadena de texto, y luego agrega un cero al principio si la hora tiene un solo dígito. Garantiza que la hora tenga siempre dos dígitos
      const minutosIn = fechaHora_in_Date
        .getMinutes()
        .toString()
        .padStart(2, "0"); 
      const hora_in_Formateada = `${horasIn}:${minutosIn}`;

      let entregaHTML = ""; // almacenar el HTML de los detalles de la entrega

      if (datosCadaver.estado_entrega) {
        const fechaHora_en_Timestamp = datosCadaver.fecha_hora_entrega;
        const fechaHora_en_Date = fechaHora_en_Timestamp.toDate();
        const fecha_en_Formateada = fechaHora_en_Date.toLocaleDateString();

        // Formatear la fecha como una cadena legible
        const horas = fechaHora_en_Date
          .getHours()
          .toString()
          .padStart(2, "0"); 
        const minutos = fechaHora_en_Date
          .getMinutes()
          .toString()
          .padStart(2, "0"); 
        const hora_en_Formateada = `${horas}:${minutos}`;

        // Si el estado de entrega es true, muestra los detalles de la entrega
        entregaHTML = `
            <h3>Detalles de la entrega <button type="button" class="btn btn-success btn-editEntrega" title="Editar" data-id="${doc.id}"><i class="bi bi-pen-fill"></i></h3>
            <p>Fecha y Hora de entrega: ${fecha_en_Formateada} a las ${hora_en_Formateada}</p>
            <p>Cochería: ${datosCadaver.nombre_cocheria}</p>
            <p>Destino: ${datosCadaver.destino_final}</p>
            <p>Ayudante Médico: ${datosCadaver.ayte_med_entrega}</p>            
              `;
      } else {
        
        entregaHTML = `<h3>Detalles de la entrega</h3><p>El cadáver aún no se entregó.</p>`;
      }

      const modalBody = document.querySelector("#verModal .modal-body");
      //console.log(modalBody)
      modalBody.innerHTML = `
            <h3> Detalles del cadaver <button type="button" class="btn btn-success btn-edit" title="Editar" data-id="${doc.id}"><i class="bi bi-pen-fill"></i></button></h3> 
            <p>Legajo: ${datosCadaver.legajo}</p>
            <p>Expediente: ${datosCadaver.expediente}</p>
            <p>Oficina Fiscal: ${datosCadaver.oficina_Fiscal}</p>
            <p>Apellido y Nombre: ${datosCadaver.apellido} ${datosCadaver.nombre}</p>
            <p>Edad: ${datosCadaver.edad}</p>
            <p>Dni: ${datosCadaver.dni}</p>
            <p>Sexo: ${datosCadaver.sexo}</p>
            <p>Causa de Muerte: ${datosCadaver.causa_muerte}</p>
            <p>Fecha y hora de Ingreso: ${fecha_in_Formateada} a las ${hora_in_Formateada}</p>            
            <p>Perito: ${datosCadaver.perito}</p>
            <p>Localidad: ${datosCadaver.localidad}</p>  
            <p>Observaciones: ${datosCadaver.observaciones}</p>                       
            
            ${entregaHTML}
            <button type="button" class="btn btn-danger btn-delete" data-id="${doc.id}" title="Eliminar"><i class="bi bi-trash3-fill"></i></button> `


      $("#verModal").modal("show");




    });/*btn-ver*/
  });

  //////////////////////////////////////////////////////////  ELIMINAR REGISTRO CADAVER   //////////////////////////////////////////////////////////     


  $(document).on("click", ".btn-delete", function () {
    const id = $(this).data("id");
    borrarCadaver(id, dataCadaver)
    $("#verModal").modal("show");
  })


  //////////////////////////////////////////////////////////   ENTREGA CADAVER  //////////////////////////////////////////////////////////  


  // ABRIR MODAL ENTREGA CADAVER

  $(document).on("click", '.btn-entrega', function () {

    const entregaId = $(this).data('id')
    entregaForm.dataset.id = entregaId
    capturarIDEntrega(entregaId)
    entregaForm.reset();

    $("#entregaModal").modal("show");
  });


  //MOSTRAR DATOS ENTREGA DE CADAVER
  $(document).on("click", '.btn-editEntrega', async function () {

    const entregaId = $(this).data('id')
    /*console.log("entredaId");*/
    entregaForm.dataset.id = entregaId;
    capturarIDEntrega(entregaId)

    await editarEntrega(entregaId, entregaForm);
  });


  //GUARDAR/EDIT ENTREGA CADAVER
  EnvioEntrega(entregaForm);




  //////////////////////////////////////////////////////////  EDITAR REGISTRO CADAVER  //////////////////////////////////////////////////////////




  $(document).on('click', '.btn-edit', async function () {
    const idEdit = $(this).data('id')
    // Restablecer el estado de edición
    cadaverForm.reset();

    const doc = await tenerCadaver(idEdit);
    const datosCadaver = doc.data();

    // Extraer la fecha y la hora del objeto Timestamp
    const fechaHoraIngreso = datosCadaver.fecha_hora_ingreso.toDate(); // Convertir Timestamp a Date
    const fechaIngreso = fechaHoraIngreso.toISOString().split("T")[0]; // de esta forma se obtiene la fecha en formato "YYYY-MM-DD"
    const horaIngreso = fechaHoraIngreso
      .toISOString()
      .split("T")[1]
      .slice(0, 5); // Obtener la hora en formato "HH:MM"

    cadaverForm["anio_necropsia"];
    cadaverForm["expediente"].value = datosCadaver.expediente;
    cadaverForm["oficina_fiscal"].value = datosCadaver.oficina_Fiscal;
    cadaverForm["apellido"].value = datosCadaver.apellido;
    cadaverForm["nombre"].value = datosCadaver.nombre;
    cadaverForm["edad"].value = datosCadaver.edad;
    cadaverForm["fecha_ingreso"].value = fechaIngreso;
    cadaverForm["hora_ingreso"].value = horaIngreso;
    cadaverForm["perito"].value = datosCadaver.perito;
    cadaverForm["causa"].value = datosCadaver.causa_muerte;
    cadaverForm["localidad"].value = datosCadaver.localidad;
    cadaverForm["observaciones"].value = datosCadaver.observaciones;
    cadaverForm["legajo"].value = datosCadaver.legajo;
    cadaverForm["dni"].value = datosCadaver.dni;
    cadaverForm["sexo"].value = datosCadaver.sexo;

    editSatus = true;
    editID = doc.id;

    // Abre la modal de edición
    $("#exampleModal").modal("show");
    $("#verModal").modal("hide");

  });

});


///////////////////////////////////////////////////////////  GUARDAR/EDITAR CADAVER  //////////////////////////////////////////////////////////



$(document).on("submit", "#cadaver-form", function (e) {
  e.preventDefault();

  const nombre_cocheria = null;
  const destino_final = null;
  const fecha_hora_entrega = null;
  const ayte_med_entrega = null;
  const estado_entrega = false;

  const anio_necropsia = cadaverForm["anio_necropsia"];
  const expediente = cadaverForm["expediente"];
  const oficina_Fiscal = cadaverForm["oficina_fiscal"];
  const apellido = cadaverForm["apellido"];
  const nombre = cadaverForm["nombre"];
  const edad = cadaverForm["edad"];
  const fechaIngreso = cadaverForm["fecha_ingreso"];
  const horaIngreso = cadaverForm["hora_ingreso"];
  const perito = cadaverForm["perito"];
  const causa_muerte = cadaverForm["causa"];
  const localidad = cadaverForm["localidad"];
  const observaciones = cadaverForm["observaciones"];
  const legajo = cadaverForm["legajo"];
  const sexo = cadaverForm.querySelector('input[name="sexo"]:checked').value;
  const dni = cadaverForm["dni"];

  const fechaIngresoValue = fechaIngreso.value;
  const horaIngresoValue = horaIngreso.value;
  const fec_hor_ing = fechaIngresoValue + "T" + horaIngresoValue;

  const fecha_hora_ingreso = new Date(fec_hor_ing);

  if (!editSatus) {
    guardarCadaver(
      legajo.value,
      expediente.value,
      anio_necropsia.value,
      oficina_Fiscal.value,
      apellido.value.toUpperCase(),// el apellido se pone en mayusculas
      nombre.value,
      edad.value,
      dni.value,
      sexo,
      Timestamp.fromDate(fecha_hora_ingreso),
      perito.value,
      causa_muerte.value,
      localidad.value,
      observaciones.value,
      nombre_cocheria,
      destino_final,
      ayte_med_entrega,
      fecha_hora_entrega,
      estado_entrega,


    );
    toastr.success("Registro guardado con éxito", "Éxito", {
      "positionClass": "toast-top-right", 
      "timeOut": "2000",                   
      "progressBar": true                 
    });

  } else {
    actualizarCadaver(editID, {
      legajo: legajo.value,
      expediente: expediente.value,
      anio_necropsia: anio_necropsia.value,
      oficina_Fiscal: oficina_Fiscal.value,
      apellido: apellido.value.toUpperCase(),
      nombre: nombre.value,
      edad: edad.value,
      dni: dni.value,
      sexo: sexo,
      fecha_hora_ingreso: Timestamp.fromDate(fecha_hora_ingreso),
      perito: perito.value,
      causa_muerte: causa_muerte.value,
      localidad: localidad.value,
      observaciones: observaciones.value,

    });
    toastr.success("Registro actualizado con éxito", "Éxito", {
      "positionClass": "toast-top-right", 
      "timeOut": "2000",                   
      "progressBar": true                 
    });
    editSatus = false;
  }

  $("#exampleModal").modal("hide");

});
$('#exampleModal').on('hidden.bs.modal', function (e) {
  // Restablecer el formulario al cerrar el modal
  cadaverForm.reset();
});





