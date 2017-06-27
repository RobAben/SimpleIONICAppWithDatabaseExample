import { ArtistProviderInterface } from '../interfaces/artist-provider-interface';
import { Subject } from 'rxjs/Subject';
import { Firebase } from '@ionic-native/firebase';
import { Artist } from "../../models/artist";
import { firebaseConfig } from './firebase-conf';

export class ArtistProvider implements ArtistProviderInterface {
  private artistsSubscription: any;
  private artists;

  constructor(private firebase: Firebase) {
    firebase.setConfigSettings(firebaseConfig);
 
    this.artistsSubscription = firebase.subscribe('artist').then((updatedData) => {
        this.artists = updatedData;
    })
  }

  artistUpdated: Subject<Artist>;

  getArtist(id: number) {
    throw new Error("Method not implemented.");
  }

  getAllArtists() {
    throw new Error("Method not implemented.");
  }

  updateArtist(artist: Artist) {
    throw new Error("Method not implemented.");
  }

  removeArtist(id: number) {
    throw new Error("Method not implemented.");
  }

  addArtist(artist: Artist) {
    throw new Error("Method not implemented.");
  }

}
