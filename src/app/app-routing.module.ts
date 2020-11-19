import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PlayComponent } from './pages/play/play.component';
import { AboutComponent } from './pages/about/about.component';
import { InstructionsComponent } from './pages/instructions/instructions.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'instructions',
    component: InstructionsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'play',
    component: PlayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
