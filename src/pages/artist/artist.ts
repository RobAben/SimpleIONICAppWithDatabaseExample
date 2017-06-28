import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Artist } from '../../models/artist';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage {
  public artist;
  public artists: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public db: AngularFireDatabase) {
    this.clearForm();
  }

  ionViewDidLoad() {
    let artistId;
    // Retrieve the object from navParams if present
    if ( this.navParams.get('artist') != null){
      artistId = this.navParams.get('artist').id;
      this.artists = this.db.list('/artists');
      this.artist = this.artists.$ref.orderByChild('id').equalTo(artistId);
    }
  }

  public saveArtist(key: string) {
    this.artist.id === null ? this.addArtist(this.artist) : this.updateArtist(key, this.artist);
  }

  private clearForm(){
    this.artist = new Artist(null, '');
  }

  addArtist(artist: Artist) {
    return this.artists.push(artist);
  }

  updateArtist(key: string, artist: Artist) {
    return this.artists.update(key,artist);
  }
}
