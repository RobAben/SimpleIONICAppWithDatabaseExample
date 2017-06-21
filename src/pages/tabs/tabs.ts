import { Component } from '@angular/core';
import { SongsPage } from '../songs/songs';
import { ArtistsPage } from '../artists/artists';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SongsPage;
  tab2Root = ArtistsPage;

  constructor() {

  }
}
