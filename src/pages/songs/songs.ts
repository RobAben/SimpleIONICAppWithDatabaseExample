import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Song } from '../../models/song';
import { Artist } from '../../models/artist';
import { SongProviderInterface } from '../../providers/interfaces/song-provider-interface';
import { SongPage } from '../song/song';
import { Subject } from 'rxjs/Subject';
import { Database } from "../../providers/sqlite/database-setup";
import { SongProvider } from "../../providers/sqlite/song-provider";

@Component({
             selector: 'page-songs', templateUrl: 'songs.html'
           })
export class SongsPage {
  // This array will hold our current songs
  public songs: Song[] = [];
  public songPageLink = SongPage;

  // To communicate with our songs provider
  private songUpdated;

  constructor(public navCtrl: NavController,
              private database: Database,
              private platform: Platform,
              private songProvider: SongProvider) {
    if (this.platform.is('cordova')) {
      this.database.startDb().then((result) => {
        // get all songs when the db is ready
        this.getAllSongs();
      });
    }
    else {
      console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
    }

    // Be sure we are always up to date
    // TODO: When we do our first implementation we should call this method here:
    this.songUpdated = this.songProvider.songUpdated.subscribe( (updatedSong: Song) => {
      // The list of songs has changed
       this.songs = this.songs.filter((value) => { return value.id !== updatedSong.id});
       this.songs.push(updatedSong);
    });
  }

  public goToAddSongPage(){
    this.navCtrl.push(SongPage);
  }

  public goToUpdateSongPage(song: Song){
    this.navCtrl.push(SongPage, {song: song});
  }

  public getAllSongs(){
    this.songProvider.getAllSongs().then((songs) => this.songs = songs);
  }

  public removeSong(id: number) {
    console.log('called' + id);
    this.songProvider.removeSong(id).then(() => {
      // Remove the song from the array when successful
      this.songs = this.songs.filter((value) => { return value.id !== id });
    }).catch((error) => {
      console.error('Error occured removing song: ' + JSON.stringify(error));
    })
  }
}
