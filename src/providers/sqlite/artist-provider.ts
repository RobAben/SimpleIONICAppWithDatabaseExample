import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Database } from './database-setup';
import { Artist } from '../../models/artist';
import { ArtistProviderInterface } from '../interfaces/artist-provider-interface';

@Injectable()
export class ArtistProvider implements ArtistProviderInterface{
  artistUpdated: Subject<Artist> = new Subject<Artist>();

  constructor(public database: Database) {}

  getArtist(id: number): Promise<Artist> {
    return this.database.db.executeSql(
      'SELECT * FROM Artist WHERE Artist.id = ?',
      [id]
    );
  }

  getAllArtists(): Promise<Artist[]> {
    let artists: Artist[] = [];

    return this.database.db.executeSql(
      'SELECT * FROM Artist', [] ).then((data) => {
      if(data.rows.length > 0) {
        for(let i = 0; i < data.rows.length; i++) {
          artists.push( new Artist(
            parseInt(data.rows.item(i).id),
            data.rows.item(i).name
          ));
        }
        return artists;
      }
    }).catch((error) => {
      console.error('Error occured getting all artists: ' + JSON.stringify(error));
    });
  }

  updateArtist(artist: Artist): Promise<Artist> {
    return this.database.db.executeSql(
      'UPDATE Artist ' +
      'SET name = ? ' +
      'WHERE Artist.id = ?',
      [artist.name, artist.id]
    );  
  }

  removeArtist(id: number): Promise<any>{
    return this.database.db.executeSql(
      'DELETE FROM Artist WHERE id = ?',
      [id]
    );
  }

  addArtist(artist: Artist): Promise<Artist> {
    return this.database.db.executeSql(
      'INSERT INTO Artist (name) ' +
      'VALUES(?)',
      [artist.name]
    );
  }
}
