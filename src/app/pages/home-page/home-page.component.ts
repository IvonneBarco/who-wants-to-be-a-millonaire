import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetalertService } from 'src/app/services/sweetalert/sweetalert.service';
import { environment } from '../../../environments/environment';
declare var $: any;


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public gameName = environment.gameName;
  constructor(private _sweetalert: SweetalertService, private _route: Router) { }

  ngOnInit() {}

  goToPlay(){
    this._route.navigate(['/play']);
  }

  goToInstructions(){
    this._route.navigate(['/instructions']);
  }

  goToAbout(){
    this._route.navigate(['/about']);
  }

}
