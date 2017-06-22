import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Artist } from "../../models/artist";
import { ArtistProviderInterface } from "../../providers/interfaces/artist-provider-interface";
import { ArtistPage } from '../artist/artist';
import { Database } from '../../providers/sqlite/database-setup';
import { ArtistProvider } from '../../providers/sqlite/artist-provider';

@IonicPage()
@Component({
  selector: 'page-artists',
  templateUrl: 'artists.html',
})
export class ArtistsPage{

  // This array will hold our current songs
  public artists: Artist[] = [];
  public artistsPageLink = ArtistPage;

  // To communicate with our songs provider
  private artistUpdated;

  constructor(public navCtrl: NavController,
              private database: Database,
              private platform: Platform,
              private artistProvider: ArtistProvider) {
    if (this.platform.is('cordova')) {
      this.database.startDb().then((result) => {
        // get all artists when the db is ready
        this.getAllArtists();
      });
    }
    this.artistUpdated = this.artistProvider.artistUpdated.subscribe( (updatedArtist: Artist) => {
      // The list of artists has changed
       this.artists = this.artists.filter((value) => { return value.id !== updatedArtist.id});
       this.artists.push(updatedArtist);
    });
  }

  public goToAddArtistPage(){
    this.navCtrl.push(ArtistPage);
  }

  public goToUpdateArtistPage(artist: Artist){
    this.navCtrl.push(ArtistPage, {artist: artist});
  }

  public getAllArtists() {
    this.artistProvider.getAllArtists()
        .then((artists: Artist[]) => this.artists = artists);
  }

  public removeArtist(id: number) {
    this.artistProvider.removeArtist(id)
        .then(() => {
          // Remove the song from the array when successful
          this.artists = this.artists.filter((value) => {
            return value.id !== id
          })
        })
        .catch((error) => console.log('Error occured removing artist: ' + JSON.stringify(error)))
  }
}
