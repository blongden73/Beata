console.log('MyJson = ', myjson);

function randomNum(min, max){
	return Math.floor((Math.random() * max) + min);;
}

console.log('Random = ', myjson.adm.artists[randomNum(0, myjson.adm.artists.length)].artist)
console.log('Random = ', myjson.cosdata.artists[randomNum(0, myjson.cosdata.artists.length)].artist)
console.log('Random = ', myjson.dataspotify.artists[randomNum(0, myjson.dataspotify.artists.length)].artist)

