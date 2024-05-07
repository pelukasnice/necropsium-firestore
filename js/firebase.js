import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB75N2M1tKKKSGc6kCQ6V_68FDG8oXR2IE",
  authDomain: "gfgfg-e1a7b.firebaseapp.com",
  projectId: "gfgfg-e1a7b",
  storageBucket: "gfgfg-e1a7b.appspot.com",
  messagingSenderId: "602559243046",
  appId: "1:602559243046:web:3b340e7963187f6ddf97e7"
};

// Inicializar Firestorm
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const guardarCadaver = (
  legajo,
  expediente,
  anio_necropsia,
  oficina_Fiscal,
  apellido,
  nombre,
  edad,
  dni,
  sexo,
  fecha_hora_ingreso,
  perito,
  causa_muerte,
  localidad,
  observaciones,
  nombre_cocheria,
  destino_final,
  ayte_med_entrega,
  fecha_hora_entrega,
  estado_entrega
) => {


  addDoc(collection(db, 'cadaveres'), {
    legajo,
    expediente,
    anio_necropsia,
    oficina_Fiscal,
    apellido,
    nombre,
    edad,
    dni,
    sexo,
    fecha_hora_ingreso,
    perito,
    causa_muerte,
    localidad,
    observaciones,
    nombre_cocheria,
    destino_final,
    ayte_med_entrega,
    fecha_hora_entrega,
    estado_entrega
  })
}
export const obtenerCadaver = () => getDocs(collection(db, 'cadaveres'))

export const onObtenerCadaver = (callback) => onSnapshot(collection(db, 'cadaveres'), callback) /* ONSNAPSHOT => actualizaciones en tiempo real de una colección o documento en Firestore. Permite recibir notificaciones automáticas cuando cambian los datos en la base de datos,*/

export const eliminarCadaver = id => deleteDoc(doc(db, 'cadaveres', id));

export const tenerCadaver = id => getDoc(doc(db, 'cadaveres', id));

export const actualizarCadaver = (id, newFields) => updateDoc(doc(db, 'cadaveres', id), newFields)


