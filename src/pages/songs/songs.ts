import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Song } from "../../models/song";
import { SongPage } from '../song/song';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@IonicPage()
@Component({
             selector: 'page-songs',
             templateUrl: 'songs.html',
           })
export class SongsPage{

  // This array will hold our current songs
  public songsPageLink = SongPage;
  public songs: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,
              public db: AngularFireDatabase) {
    this.songs = db.list('/songs');
  }

  public goToAddSongPage(){
    this.navCtrl.push(SongPage);
  }

  public goToUpdateSongPage(song: Song){
    this.navCtrl.push(SongPage, {song: song});
  }

  getAllSongs() {
    return this.songs;
  }

  updateSong(key: string, song: Song) {
    return this.songs.update(key,song);
  }

  removeSong(key: string) {
    return this.songs.remove(key);
  }

  addSong(song: Song) {
    return this.songs.push(song);
  }
}
