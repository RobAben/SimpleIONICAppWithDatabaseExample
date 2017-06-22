import { Artist } from '../../models/artist';
import { Subject } from 'rxjs/Subject';

export interface ArtistProviderInterface {
    artistUpdated: Subject<Artist>;
    getArtist(id: number);
    getAllArtists();
    updateArtist(artist: Artist);
    removeArtist(id: number);
    addArtist(artist: Artist);
}
