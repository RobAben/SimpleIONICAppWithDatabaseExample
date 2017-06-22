import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Artist } from "../../models/artist";
import { ArtistProviderInterface } from "../../providers/interfaces/artist-provider-interface";
import { ArtistPage } from '../artist/artist';

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
  private artistProvider: ArtistProviderInterface;
  private artistUpdated;

  constructor(public navCtrl: NavController) {
    this.artists.push(new Artist(0, 'Jack Parrow'));
    this.artists.push(new Artist(1, 'De Huilende Rappers'));
    this.artists.push(new Artist(2, 'Noisia'));
    // Be sure we are always up to date
    // TODO: When we do our first implementation we should call this method here:
    // this.artistUpdated = this.artistProvider.artistUpdated.subscribe( (updatedArtist: Artist) => {
    //   // The list of artists has changed
    //    this.artists.filter((value) => { return value.id === updatedArtist.id});
    //    this.artists.push(updatedArtist);
    // })

    /**
     * TODO: When we do our first implementation we should call this method here:
     * this.getAllArtists();
     */

  }

  public goToAddArtistPage(){
    this.navCtrl.push(ArtistPage);
  }

  public goToUpdateArtistPage(artist: Artist){
    this.navCtrl.push(ArtistPage, {artist: artist});
  }

  public getAllArtists() {
    this.artistProvider.getAllArtists().subscribe((artists: Artist[]) => {
      // on succes
      this.artists = artists;
    }, (error) => {
      // on error
      console.log('Error occured getting artists: ' + error);
    }, () => {
      console.log('request finished');
    });
  }

  public removeArtist(id: number) {
    this.artistProvider.removeArtist(id).subscribe((success: boolean) => {
      // Remove the song from the array when successful
      this.artists.filter((value) => { return value.id === id});
      console.log('Removed the artist!');
    }, (error) => {
      // on error
      console.log('Error occured removing artist: ' + error);
    }, () => {
      console.log('request finished');
    });
  }
}
