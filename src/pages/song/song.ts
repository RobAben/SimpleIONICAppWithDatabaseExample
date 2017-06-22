import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SongProviderInterface } from '../../providers/interfaces/song-provider-interface';
import { Song } from '../../models/song';
import { Artist } from '../../models/artist';
import { SongProvider } from '../../providers/sqlite/song-provider';

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
  // The current song should start empty
  public song;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private songProvider: SongProvider) {
    this.clearForm();
  }

  ionViewDidLoad() {
    // Retrieve the object from navParams if present
    if ( this.navParams.get('song') != null){
      this.song = this.navParams.get('song');
    }
  }

  public saveSong() {
      this.song.id === null ? this.addSong(this.song) : this.updateSong(this.song);
  }

  private clearForm(){
    this.song = new Song(null, '', new Date().toISOString(), 0, new Artist(null,''));
  }

  private addSong(song: Song) {
    this.songProvider.addSong(song).then((song: Song) => {
      // Empty the inputs and send update
      this.songProvider.songUpdated.next(this.song);
      this.clearForm();
    }).catch((e) => {
        console.log(JSON.stringify(e))
    })
  }

  private updateSong(song: Song) {
    this.songProvider.updateSong(song).then((song: Song) => {
      // Empty the inputs and send update
      this.songProvider.songUpdated.next(this.song);
      this.clearForm();
    }).catch((e) => {
      console.log(JSON.stringify(e))
    })
  }

}
