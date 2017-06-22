import { Artist } from '../../models/artist';
import { Subject } from 'rxjs/Subject';

export interface ArtistProviderInterface {
    artistUpdated: Subject<Artist>;
    getArtist(id: number): Promise<Artist>;
    getAllArtists(): Promise<Artist[]>;
    updateArtist(artist: Artist): Promise<Artist>;
    removeArtist(id: number): Promise<any>;
    addArtist(artist: Artist): Promise<Artist>;
}
