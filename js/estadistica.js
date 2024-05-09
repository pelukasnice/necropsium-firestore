
import { GraficoCausaMuerte } from "./estadistica/causaMuerte.js";
import { GraficoCadaveresPorDia } from "./estadistica/cadaveresDia.js";
import { CadaveresEntregados } from "./estadistica/entrega.js";
/*import { GraficoPorcentajeCausa} from "./estadistica/porcentajeCausa.js";*/
import { GraficoCadaveresPerito } from "./estadistica/peritos.js";
import { onObtenerCadaver } from "./firebase.js";
import { GraficoPorcentajeLocalidad } from "./estadistica/porcentajeLocalidad.js";
import { GraficoCadaveresSexo } from "./estadistica/cadaveresSexo.js";
import{GraficoDestinoFinal} from "./estadistica/cadaveresDestino.js";



document.addEventListener("DOMContentLoaded", async () => {    
    
    await onObtenerCadaver(GraficoCausaMuerte) 
        
    await onObtenerCadaver(GraficoCadaveresPorDia)
    
    await onObtenerCadaver(CadaveresEntregados)    

    await onObtenerCadaver(GraficoCadaveresPerito)

    await onObtenerCadaver(GraficoPorcentajeLocalidad)

    await onObtenerCadaver(GraficoCadaveresSexo)

    await onObtenerCadaver(GraficoDestinoFinal)

})
