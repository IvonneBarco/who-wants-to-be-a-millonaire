import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public loading: boolean;
  public storeData: any;
  public jsonData: any = [];
  public fileUploaded: File;
  public worksheet: any;
  public textArchivo: any;

  public existFile: boolean;

  constructor() { }

  ngOnInit() {
    this.textArchivo = 'No se ha seleccionado ningún archivo';
    this.existFile = false;
  }

  cargarPreguntas(event) {
    this.fileUploaded = event.target.files[0];

    this.readExcel();

    if (event.isTrusted) {
      this.textArchivo = this.fileUploaded.name;
      this.existFile = true;
      this.alertInfo(
        'success',
        '¡Tu archivo se ha cargado correctamente!',
        'top',
        '3000'
      );
    }
  }

  listarPreguntasJson() {
    const userId = localStorage.getItem('key');

    if (this.fileUploaded === undefined) {
      this.alertInfo(
        'warning',
        'Por favor, cargue un archivo xls o xlsx con las preguntas',
        'top',
        '3000'
      );
    } else {
      this.jsonData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });

      console.log(this.jsonData);
    }
  }

  readExcel() {
    const readFile = new FileReader();
    this.loading = true;

    readFile.onload = e => {
      this.storeData = readFile.result;
      const data = new Uint8Array(this.storeData);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[firstSheetName];

      this.loading = false;
    };
    readFile.readAsArrayBuffer(this.fileUploaded);
  }

  alertInfo(textType: any, textTitle: any, position: any, timer: any) {
    const Toast = Swal.mixin({
      toast: true,
      position,
      showConfirmButton: false,
      timer
    });

    Toast.fire({
      type: textType,
      title: textTitle
    });
  }

}
