import { SongProviderInterface } from '../interfaces/song-provider-interface';
import { Subject } from 'rxjs/Subject';
import { Song } from '../../models/song';
import { Observable } from 'rxjs/Observable';

export class SongProvider implements SongProviderInterface {
  songUpdated: Subject<Song>;
  songs: any;
  db: any;
  remote: any;

  constructor() {
    this.db = new PouchDB('ionicExample');
    this.remote = 'http://localhost:5984/ionicExample';

    this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
      if(change.doc.type === 'song'){
        this.handleChange(change);
      }
    });
  }

  getSong(id: number): Promise<Song> {
    throw new Error("Method not implemented.");
  }

  getAllSongs(): Promise<Song[]> {
    // Do we already have the data?
    if (this.songs) {
      return Promise.resolve(this.songs);
    }

    // No? Get it!
    return new Promise(resolve => {
      this.db.allDocs({
                        include_docs: true
                      }).then((result) => {
        this.songs = [];
        let docs = result.rows.map((row) => {
          this.songs.push(row.doc);
        });

        resolve(this.songs);
        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {
        console.log(error);
      });
    });
  }

  updateSong(song: Song): Promise<Song> {
    return this.db.put(song);
  }

  removeSong(song: Song): Promise<boolean> {
    return this.db.remove(song);
  }

  addSong(song: Song): Promise<Song> {
    return this.db.post(song);
  }

  handleChange(change) {
    let changedDoc = null;
    let changedIndex = null;

    this.songs.forEach((doc, index) => {

      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if (change.deleted) {
      this.songs.splice(changedIndex, 1);
    } else {
      //A document was updated
      if (changedDoc) {
        this.songs[changedIndex] = change.doc;
      }

      //A document was added
      else {
        this.songs.push(change.doc);
      }

    }
}
