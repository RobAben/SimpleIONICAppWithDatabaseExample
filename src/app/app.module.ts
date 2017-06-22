import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { SongsPage } from '../pages/songs/songs';
import { ArtistsPage } from '../pages/artists/artists';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ArtistPage } from "../pages/artist/artist";
import { SongPage } from '../pages/song/song';
import { SQLite } from '@ionic-native/sqlite';
import { Database } from '../providers/sqlite/database-setup';
import { SongProvider } from "../providers/sqlite/song-provider";
import { ArtistProvider } from "../providers/sqlite/artist-provider";

@NgModule({
  declarations: [
    MyApp,
    SongsPage,
    ArtistsPage,
    SongPage,
    ArtistPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SongsPage,
    ArtistsPage,
    SongPage,
    ArtistPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    SongProvider,
    Database,
    ArtistProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
