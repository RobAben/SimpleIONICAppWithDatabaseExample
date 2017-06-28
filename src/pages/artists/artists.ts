import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Artist } from "../../models/artist";
import { ArtistPage } from '../artist/artist';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-artists',
  templateUrl: 'artists.html',
})
export class ArtistsPage{

  // This array will hold our current songs
  public artistsPageLink = ArtistPage;
  public artists: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,
              public db: AngularFireDatabase) {
    this.artists = db.list('/artists');
  }

  public goToAddArtistPage(){
    this.navCtrl.push(ArtistPage);
  }

  public goToUpdateArtistPage(artist: Artist){
    this.navCtrl.push(ArtistPage, {artist: artist});
  }

  getAllArtists() {
    return this.artists;
  }

  updateArtist(key: string, artist: Artist) {
    return this.artists.update(key, artist);
  }

  removeArtist(key: string) {
    return this.artists.remove(key);
  }

  addArtist(artist: Artist) {
    return this.artists.push(artist);
  }
}
