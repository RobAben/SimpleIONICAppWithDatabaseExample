import { ArtistProviderInterface } from '../interfaces/artist-provider-interface';
import { Subject } from 'rxjs/Subject';
import { Song } from '../../models/song';
import { SongProviderInterface } from '../interfaces/song-provider-interface';
declare var require: any;
const localForage: LocalForage = require("localforage");

export class SongProvider implements SongProviderInterface {
  songUpdated: Subject<Song>;

  public getAllSongs(): Promise<Song[]> {
    let artists;
    return new Promise((resolve, reject) => {
      localForage.getItem("artist").then((result) => {
        resolve(artists = result ? <Array<Object>> result : []);
      }, (error) => {
        reject(console.log("ERROR: ", error));
      });
    })
  }

  public updateSong(song: Song): Promise<any> {
    return localForage.getItem(song.id.toString()).then(function ( item ){
      localForage.setItem(song.id.toString(), item);
    });
  }

  public removeSong(id: number): Promise<any> {
    return localForage.removeItem(id.toString());
  }

  public addSong(song: Song): Promise<Song> {
    return localForage.setItem(song.id.toString(), song);
  }

}
