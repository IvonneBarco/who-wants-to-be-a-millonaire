import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  alertGeneral(titulo: string = "Bien!", texto: any, textoBtn: string = "OK", tipo) {
		Swal.fire(
      titulo,
      texto,
      tipo
    )
	}
}
