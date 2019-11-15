import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
declare var $: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public loading: boolean;
  public storeData: any;
  public questionData: any = [];
  public fileUploaded: File;
  public worksheet: any;
  public textArchivo: any;

  public existFile: boolean;
  public numberQuestions: number;
  public questions: any[] = [];
  public count = 0;
  public points = 0;

  public selected = true;
  public titleModal: any;
  public imgModal: any;
  public block50 = false;
  public blockPublic = false;
  public blockCall = false;

  constructor() { }

  ngOnInit() {
    this.textArchivo = 'No se ha seleccionado ningún archivo';
    this.existFile = false;
    // $('#OpcA').hide(3000);
  }

  uploadQuestions(event) {
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

  questionsJson() {
    this.questions = [];
    this.count = 0;
    this.questionData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });
    this.numberQuestions = this.questionData.length;

    this.questions.push(this.questionData[this.count]);
    $('#ModalIniciarJuego').modal('hide');
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

  next() {
    this.questions = [];
    this.selected = true;
    this.count++;
    this.questions.push(this.questionData[this.count]);

  }

  validateAnswer(opc: any) {
    this.selected = false;
    const answerOk = this.questions[0].OK;
    if (answerOk === opc) {
      alert('CORRECTO!');
      if (this.count >= 0 && this.count <= 5) {
        this.points++;
      } else if (this.count >= 6 && this.count <= 8) {
        this.points += 3;
      } else if (this.count >= 9 && this.count <= 14) {
        this.points += 4;
      } else if (this.count >= 15 && this.count <= 16) {
        this.points += 6;
      }

    } else {
      alert('INCORRECTO');
    }
  }

  option50To50() {
    this.block50 = true;
    const R_OK = this.questions[0].OK;
    let N_R = 0;
    let random1 = 0;
    let random2 = 0;

    if (R_OK === 'A') {
      N_R = 1;
      random1 = this.randomGenerate([2, 3, 4]);
      random2 = this.randomGenerate([2, 3, 4]);

      if (random1 !== random2) {
        this.hide(random1, random2);
      } else {
        if (random1 === 2 && random2 === 4) {
          random1++;
          this.hide(random1, random2);
        } else if (random1 === 4 && random2 === 2) {
          random1--;
          this.hide(random1, random2);
        }
      }

    } else if (R_OK === 'B') {
      N_R = 2;
      random1 = this.randomGenerate([1, 3, 4]);
      random2 = this.randomGenerate([1, 3, 4]);

      if (random1 !== random2) {
        this.hide(random1, random2);
      } else {
        if (random1 === 1 && random2 === 4) {
          random1++;
          this.hide(random1, random2);
        } else if (random1 === 4 && random2 === 1) {
          random1--;
          this.hide(random1, random2);
        }
      }

    } else if (R_OK === 'C') {
      N_R = 3;
      random1 = this.randomGenerate([1, 2, 4]);
      random2 = this.randomGenerate([1, 2, 4]);

      if (random1 !== random2) {
        this.hide(random1, random2);
      } else {
        if (random1 === 1 && random2 === 4) {
          random1++;
          this.hide(random1, random2);
        } else if (random1 === 4 && random2 === 1) {
          random1--;
          this.hide(random1, random2);
        }
      }

    } else if (R_OK === 'D') {
      N_R = 4;
      random1 = this.randomGenerate([1, 2, 3]);
      random2 = this.randomGenerate([1, 2, 3]);

      if (random1 !== random2) {
        this.hide(random1, random2);
      } else {
        if (random1 === 1 && random2 === 3) {
          random1++;
          this.hide(random1, random2);
        } else if (random1 === 3 && random2 === 1) {
          random1--;
          this.hide(random1, random2);
        }
      }
    }
  }

  randomGenerate(group) {
    const numRandom = Math.floor(Math.random() * group.length);
    return group[numRandom];
  }

  hide(random1: any, random2: any) {
    switch (random1) {
      case 1:
        $('#OpcA').hide();
        break;
      case 2:
        $('#OpcB').hide();
        break;
      case 3:
        $('#OpcC').hide();
        break;
      case 4:
        $('#OpcD').hide();
        break;
      default:
        break;
    }

    switch (random2) {
      case 1:
        $('#OpcA').hide();
        break;
      case 2:
        $('#OpcB').hide();
        break;
      case 3:
        $('#OpcC').hide();
        break;
      case 4:
        $('#OpcD').hide();
        break;
      default:
        break;
    }
  }

  publicSupport() {
    this.blockPublic = true;
    $('#ModalAyudas').modal('show');
    this.titleModal = 'AYUDA DEL PÚBLCO';
    // this.imgModal = '../../../assets/images/image.png';
    this.imgModal = 'https://image.flaticon.com/icons/svg/126/126341.svg';
  }

  callFriend() {
    this.blockCall = true;
    $('#ModalAyudas').modal('show');
    this.titleModal = 'LLAMADA A UN AMIGO';
    // this.imgModal = '../../../assets/images/image.png';
    this.imgModal = 'https://image.flaticon.com/icons/svg/126/126341.svg';
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
