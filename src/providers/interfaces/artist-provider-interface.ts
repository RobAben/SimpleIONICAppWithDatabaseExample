import { Artist } from '../../models/artist';
import { Subject } from 'rxjs/Subject';

export interface ArtistProviderInterface {
    artistUpdated: Subject<Artist>;
    getAllArtists();
    updateArtist(artist: Artist);
    removeArtist(artist: Artist);
    addArtist(artist: Artist);
}
