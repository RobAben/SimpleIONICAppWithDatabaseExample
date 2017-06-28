import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Song } from '../../models/song';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Artist } from '../../models/artist';

@IonicPage()
@Component({
             selector: 'page-song',
             templateUrl: 'song.html',
           })
export class SongPage {
  public song;
  public songs: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public db: AngularFireDatabase) {
    this.clearForm();
  }

  ionViewDidLoad() {
    let songId;
    // Retrieve the object from navParams if present
    if ( this.navParams.get('song') != null){
      songId = this.navParams.get('song').id;
      this.songs = this.db.list('/songs');
      this.song = this.songs.$ref.orderByChild('id').equalTo(songId);
    }
  }

  public saveSong(key: string) {
    this.song.id === null ? this.addSong(this.song) : this.updateSong(key, this.song);
  }

  private clearForm(){
    this.song = new Song(null, '', new Date().toISOString(), 0, new Artist(null,''));
  }

  addSong(song: Song) {
    return this.songs.push(song);
  }

  updateSong(key: string, song: Song) {
    return this.songs.update(key, song);
  }
}
