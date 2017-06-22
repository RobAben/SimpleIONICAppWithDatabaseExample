import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Artist } from '../../models/artist';
import { ArtistProviderInterface } from '../../providers/interfaces/artist-provider-interface';
import { ArtistProvider } from '../../providers/sqlite/artist-provider';

@IonicPage()
@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage {
  public artist: Artist;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private artistProvider: ArtistProvider) {
    this.clearForm();
  }

  ionViewDidLoad() {
    // Retrieve the object from navParams if present
    if ( this.navParams.get('artist') != null){
      this.artist = this.navParams.get('artist');
    }
  }

  public saveArtist() {
    this.artist.id === null ? this.addArtist(this.artist) : this.updateArtist(this.artist);
  }

  private clearForm(){
    this.artist = new Artist(null, '');
  }

  private addArtist(artist: Artist) {
    this.artistProvider.addArtist(artist).then((artist: Artist) => {
      // Empty the inputs and send update
      this.artistProvider.artistUpdated.next(artist);
      this.clearForm();
    }).catch((error) => {
      console.log('Error occured adding artist: ' + JSON.stringify(error));
    });
  }

  private updateArtist(artist: Artist) {
    this.artistProvider.updateArtist(artist).then((artist: Artist) => {
      // Empty the inputs and send update
      this.artistProvider.artistUpdated.next(artist);
      this.clearForm();
    }).catch((error) => {
      console.log('Error occured updating artist: ' + JSON.stringify(error));
    });
  }
}
