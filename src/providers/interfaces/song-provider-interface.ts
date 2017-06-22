import { Song } from '../../models/song';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export interface SongProviderInterface {
  songUpdated: Subject<Song>;
  getSong(id: number): Observable<Song>;
  getAllSongs(): Observable<Song[]>;
  updateSong(song: Song): Observable<Song>;
  removeSong(id: number): Observable<boolean>;
  addSong(song: Song): Observable<Song>;
}
