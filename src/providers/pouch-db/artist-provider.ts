import { ArtistProviderInterface } from '../interfaces/artist-provider-interface';
import { Subject } from 'rxjs/Subject';
import { Artist } from '../../models/artist';
import PouchDB from 'pouchdb';

export class ArtistProvider implements ArtistProviderInterface {
  artists: any;
  db: any;
  remote: any;
  artistUpdated: Subject<Artist>;

  constructor() {
    this.db = new PouchDB('ionicExample');
    this.remote = 'http://localhost:5984/ionicExample';

    this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
      if(change.doc.type === 'artist'){
        this.handleChange(change);
      }
    });
  }

  getAllArtists(): Promise<Artist[]> {
    // Do we already have the data?
    if (this.artists) {
      return Promise.resolve(this.artists);
    }

    // No? Get it!
    return new Promise(resolve => {
      this.db.allDocs({
           include_docs: true
         }).then((result) => {
        this.artists = [];
        let docs = result.rows.map((row) => {
          this.artists.push(row.doc);
        });

        resolve(this.artists);
        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {
        console.log(error);
      });
    });
  }

  updateArtist(artist: Artist): Promise<Artist> {
    return this.db.put(artist);
  }

  removeArtist(artist: Artist): Promise<any> {
    return this.db.remove(artist);
  }

  addArtist(artist: Artist): Promise<Artist> {
    return this.db.post(artist);
  }

  handleChange(change) {
    let changedDoc = null;
    let changedIndex = null;

    this.artists.forEach((doc, index) => {

      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if (change.deleted) {
      this.artists.splice(changedIndex, 1);
    } else {
      //A document was updated
      if (changedDoc) {
        this.artists[changedIndex] = change.doc;
      }

      //A document was added
      else {
        this.artists.push(change.doc);
      }

    }
  }
}
