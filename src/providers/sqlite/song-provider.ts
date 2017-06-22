import { Injectable } from '@angular/core';
import { SongProviderInterface } from '../interfaces/song-provider-interface';
import { Subject } from 'rxjs/Subject';
import { Song } from '../../models/song';
import { Observable } from "rxjs/Observable";
import { Database } from './database-setup';
import { SQLite } from '@ionic-native/sqlite';
import { Artist } from '../../models/artist';

@Injectable()
export class SongProvider implements SongProviderInterface{
  songUpdated: Subject<Song> = new Subject<Song>();

  constructor(public database: Database) {}

  getSong(id: number): Promise<Song> {
      return this.database.db.executeSql(
        'SELECT * FROM Song ' +
        'INNER JOIN Artist ON Song.artist = Artist.id ' +
        'WHERE Song.id = ?',
        [id]
      );
  }

  getAllSongs(): Promise<Song[]> {
    let songs: Song[] = [];

    return this.database.db.executeSql(
      'SELECT Song.id, Artist.id AS artistId, Song.name, Song.duration, Song.releaseDate, Artist.name AS artistName ' +
      'FROM Song ' +
      'INNER JOIN Artist ' +
      'ON Song.artist = Artist.id',
      [] ).then((data) => {
      // on succes
      if(data.rows.length > 0) {
        for(let i = 0; i < data.rows.length; i++) {
          songs.push( new Song(
            parseInt(data.rows.item(i).id),
            data.rows.item(i).name,
            data.rows.item(i).releaseDate.toString(),
            parseInt(data.rows.item(i).duration),
            new Artist( parseInt(data.rows.item(i).artistId), data.rows.item(i).artistName)
          ));
        }
        return songs;
      }
    }).catch((error) => {
      console.error('Error occured getting all songs: ' + JSON.stringify(error));
    });
  }

  updateSong(song: Song): Promise<Song> {
    return this.database.db.executeSql(
      'UPDATE Song ' +
      'SET name = ?, ' +
      'duration = ?, ' +
      'releaseDate = ?, ' +
      'artist = ?, ' +
      'WHERE Song.id = ?',
      [song.name, song.duration, song.releaseDate, song.artist.id, song.id]
    );
  }

  removeSong(id: number): Promise<any>{
    return this.database.db.executeSql(
      'DELETE FROM Song WHERE id = ?',
      [id]
    );
  }

  addSong(song: Song): Promise<Song> {
    return this.database.db.executeSql(
      'INSERT INTO Song (name, duration, releaseDate, artist) ' +
      'VALUES(?,?,?,?)',
      [song.name, song.duration, song.releaseDate, song.artist.id]
    );
  }
}
