import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SongProviderInterface } from '../../providers/interfaces/song-provider-interface';
import { Song } from '../../models/song';
import { Artist } from '../../models/artist';

/**
 * Generated class for the SongPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-song',
  templateUrl: 'song.html',
})
export class SongPage {
  // To communicate with our songs provider
  private songProvider: SongProviderInterface;

  // The current song should start empty
  public song: Song = new Song(null, '', new Date().toISOString(), 0, new Artist(null,''));

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    // Retrieve the object from navParams if present
    if ( this.navParams.get('song') != null){
      this.song = this.navParams.get('song');
    }
  }

  public saveSong() {
      this.song.id === null ? this.addSong(this.song) : this.updateSong(this.song);
  }

  private addSong(song: Song) {
    this.songProvider.addSong(song).subscribe((song: Song) => {
      // Empty the inputs and send update
      this.songProvider.songUpdated.next(this.song);
      this.song = null;
    }, (error) => {
      // on error
      console.log('Error occured adding song: ' + error);
    }, () => {
      console.log('request finished');
    });
  }

  private updateSong(song: Song) {
    this.songProvider.updateSong(song).subscribe((song: Song) => {
      // Empty the inputs and send update
      this.songProvider.songUpdated.next(this.song);
      this.song = null;
    }, (error) => {
      // on error
      console.log('Error occured updating song: ' + error);
    }, () => {
      console.log('request finished');
    });
  }

}
