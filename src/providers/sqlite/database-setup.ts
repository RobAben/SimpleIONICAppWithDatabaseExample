import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

@Injectable()
export class Database {
  public db;

  constructor(private sqlite: SQLite) { }

  public startDb(){
    return this.sqlite.create({
                         name: 'data.db',
                         location: 'default'
                       })
        .then((db: SQLiteObject) => {
          this.db = db;
          db.executeSql('CREATE TABLE Artist(' +
                        'id INTEGER PRIMARY KEY, ' +
                        'name VARCHAR' +
                        ')', {})
            .then(() => console.log('Executed SQL create table Artist'))
            .catch(e => console.error('Error creating table Artist: ' + JSON.stringify(e)));

          db.executeSql('CREATE TABLE Song(' +
                        'id INTEGER PRIMARY KEY, ' +
                        'name VARCHAR, ' +
                        'releaseDate DATETIME, ' +
                        'duration VARCHAR, ' +
                        'artist INTEGER, ' +
                        'FOREIGN KEY(artist) REFERENCES Artist(id)' +
                        '  )', {})
            .then(() => console.log('Executed SQL create table Song'))
            .catch(e => console.error('Error creating table Song: ' + JSON.stringify(e)));
        })
        .catch(e => console.error('Error creating database: ' + JSON.stringify(e)));
  }

  public insertMockData(){
      this.db.executeSql('INSERT INTO Artist (id,name) VALUES(?,?)', [0,"Jack Parrow"])
          .then(() => console.log('Executed Insert Artist'))
          .catch(e => console.error('Error insert artists' + JSON.stringify(e)));
      this.db.executeSql('INSERT INTO Song (name, duration, releaseDate, artist) VALUES(?,?,?,?)', ["Cooler as Ekke", 4.31, "2013-04-12", 0])
          .then(() => console.log('Executed Insert'))
          .catch(e => console.error(JSON.stringify(e)));
      this.db.executeSql('INSERT INTO Song (name, duration, releaseDate, artist) VALUES(?,?,?,?)', ["Cooler as Ekke", 4.31, "2013-04-12", 0])
          .then(() => console.log('Executed Insert'))
          .catch(e => console.error(JSON.stringify(e)));
      this.db.executeSql('INSERT INTO Song (name, duration, releaseDate, artist) VALUES(?,?,?,?)', ["Cooler as Ekke", 4.31, "2013-04-12", 0])
          .then(() => console.log('Executed Insert'))
          .catch(e => console.error(JSON.stringify(e)));
  }
}
