# Simple IONIC App With Database Example
A simple implementation of multiple databases within an IONIC application for a research i did. Your free to look and use parts but i'm by no means a experienced IONIC developer, so there could be flaws. 

The database will have more or less the following structure. It could differ on some database implementations but the idea will be the same.
```javascript
{
	Songs[
		Id: Int,
		Name: String,
		Duration: Float,
		Release: Date,
		Artist: Int
	],
	Artists
	[
		Id: Int
		Name: String
	]
}
```
There will be a tabbed nav bar in the bottom and the possibility to create, update and delete both songs and artists.