import { Song } from '../../models/song';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export interface SongProviderInterface {
  songUpdated: Subject<Song>;
  getAllSongs(): Promise<Song[]>;
  updateSong(song: Song): Promise<Song>;
  removeSong(id: number): Promise<boolean>;
  addSong(song: Song): Promise<Song>;
}
