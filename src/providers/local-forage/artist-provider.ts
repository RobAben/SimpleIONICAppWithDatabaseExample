import { ArtistProviderInterface } from '../interfaces/artist-provider-interface';
import { Subject } from 'rxjs/Subject';
import { Artist } from '../../models/artist';
declare var require: any;
const localForage: LocalForage = require("localforage");

export class ArtistProvider implements ArtistProviderInterface {
  artistUpdated: Subject<Artist>;

  public getAllArtists() {
    let artists;
    return new Promise((resolve, reject) => {
      localForage.getItem("artist").then((result) => {
        resolve(artists = result ? <Array<Object>> result : []);
      }, (error) => {
        reject(console.log("ERROR: ", error));
      });
    })
  }

  public updateArtist(artist: Artist) {
    return localForage.getItem(artist.id.toString()).then(function ( item ){
      localForage.setItem(artist.id.toString(), item);
    });
  }

  public removeArtist(id: number) {
    return localForage.removeItem(id.toString());
  }

  public addArtist(artist: Artist) {
    return localForage.setItem(artist.id.toString(), artist);
  }

}
