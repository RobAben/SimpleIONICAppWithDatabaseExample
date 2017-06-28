import { Song } from '../../models/song';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export interface SongProviderInterface {
  getSong(id: number);
  getAllSongs();
  updateSong(key: string, song: Song);
  removeSong(key: string);
  addSong(song: Song);
}
