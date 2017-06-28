import { Artist } from '../../models/artist';
import { Subject } from 'rxjs/Subject';

export interface ArtistProviderInterface {
    artistUpdated: Subject<Artist>;
    getArtist(id: number);
    getAllArtists();
    updateArtist(key: string, artist: Artist);
    removeArtist(key: string);
    addArtist(artist: Artist);
}
