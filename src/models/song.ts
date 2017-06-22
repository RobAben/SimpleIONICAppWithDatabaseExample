import { Artist } from './artist';
export class Song {
  private _id: number;
  private _name: string;
  private _releaseDate: string;
  private _duration: number;
  private _artist: Artist;

  constructor(id: number, name: string, releaseDate: string, duration: number, artist: Artist) {
    this._id = id;
    this._name = name;
    this._releaseDate = releaseDate;
    this._duration = duration;
    this._artist = artist;
  }

  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get releaseDate(): string {
    return this._releaseDate;
  }

  public set releaseDate(value: string) {
    this._releaseDate = value;
  }

  public get duration(): number {
    return this._duration;
  }

  public set duration(value: number) {
    this._duration = value;
  }

  public get artist(): Artist {
    return this._artist;
  }

  public set artist(value: Artist) {
    this._artist = value;
  }
}
