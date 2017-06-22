import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArtistsPage } from './artists';

@NgModule({
  declarations: [
    ArtistsPage,
  ],
  imports: [
    IonicPageModule.forChild(ArtistsPage),
  ],
  exports: [
    ArtistsPage
  ]
})
export class ArtistsPageModule {}
