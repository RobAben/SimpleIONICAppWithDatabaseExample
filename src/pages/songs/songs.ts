import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Song } from '../../models/song';
import { Artist } from '../../models/artist';
import { SongProviderInterface } from '../../providers/interfaces/song-provider-interface';
import { SongPage } from '../song/song';
import { Subject } from 'rxjs/Subject';

@Component({
             selector: 'page-songs', templateUrl: 'songs.html'
           })
export class SongsPage {
  // This array will hold our current songs
  public songs: Song[] = [];
  public songPageLink = SongPage;

  // To communicate with our songs provider
  private songProvider: SongProviderInterface;
  private songUpdated;

  constructor(public navCtrl: NavController) {
    this.songs.push(new Song(0, 'Cooler as Ekke', new Date('12-01-2015').toISOString(), 5.23, new Artist(0, 'Jack Parrow')));
    this.songs.push(new Song(0, 'Cooler as Ekke', new Date('12-01-2015').toISOString(), 5.23, new Artist(0, 'Jack Parrow')));
    this.songs.push(new Song(0, 'Cooler as Ekke', new Date('12-01-2015').toISOString(), 5.23, new Artist(0, 'Jack Parrow')));

    // Be sure we are always up to date
    // TODO: When we do our first implementation we should call this method here:
    // this.songUpdated = this.songProvider.songUpdated.subscribe( (updatedSong: Song) => {
    //   // The list of songs has changed
    //    this.songs.filter((value) => { return value.id === updatedSong.id});
    //    this.songs.push(updatedSong);
    // })

    /**
     * TODO: When we do our first implementation we should call this method here:
     * this.getAllSongs();
     */
  }

  public goToAddSongPage(){
    this.navCtrl.push(SongPage);
  }

  public goToUpdateSongPage(song: Song){
    this.navCtrl.push(SongPage, {song: song});
  }

  public getAllSongs() {
    this.songProvider.getAllSongs().subscribe((songs: Song[]) => {
      // on succes
      this.songs = songs;
    }, (error) => {
      // on error
      console.log('Error occured getting songs: ' + error);
    }, () => {
      console.log('request finished');
    });
  }

  public removeSong(id: number) {
    this.songProvider.removeSong(id).subscribe((success: boolean) => {
      // Remove the song from the array when successful
      this.songs.filter((value) => { return value.id === id});
      // TODO: When we do our first implementation we should call this method here:
      console.log('Removed the song!');
    }, (error) => {
      // on error
      console.log('Error occured removing song: ' + error);
    }, () => {
      console.log('request finished');
    });
  }
}
