import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Artist } from '../../models/artist';
import { ArtistProviderInterface } from '../../providers/interfaces/artist-provider-interface';

@IonicPage()
@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage {
  public artist: Artist = new Artist(null, '');
  private artistProvider: ArtistProviderInterface;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    // Retrieve the object from navParams if present
    if ( this.navParams.get('artist') != null){
      this.artist = this.navParams.get('artist');
    }
  }

  public saveArtist() {
    this.artist.id === null ? this.addArtist(this.artist) : this.updateArtist(this.artist);
  }

  private addArtist(artist: Artist) {
    this.artistProvider.addArtist(artist).subscribe((artist: Artist) => {
      // Empty the inputs and send update
      this.artistProvider.artistUpdated.next(artist);
      this.artist = null;
    }, (error) => {
      // on error
      console.log('Error occured adding artist: ' + error);
    }, () => {
      console.log('request finished');
    });
  }

  private updateArtist(artist: Artist) {
    this.artistProvider.updateArtist(artist).subscribe((artist: Artist) => {
      // Empty the inputs and send update
      this.artistProvider.artistUpdated.next(artist);
      this.artist = null;
    }, (error) => {
      // on error
      console.log('Error occured updating artist: ' + error);
    }, () => {
      console.log('request finished');
    });
  }

}
