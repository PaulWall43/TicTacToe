// var p1 = {name: 'Paul Wallace', bio: 'He is the greatest', img: 'Paul drinking soda'};
// var p2 = {name: 'Jong Won Chung', bio: 'He is like pretty good', img: 'Jong drinking water'};

var players = [
  {
    'name'  : 'Miles Davis',
    'image' : 'http://vignette1.wikia.nocookie.net/marvelcinematicuniverse/images/e/e8/Miles_Davis.jpeg/revision/latest?cb=20161003223700',
    'bio'   : 'Miles Dewey Davis III was an American jazz trumpeter, bandleader, and composer. He is among the most influential and acclaimed figures in the history of jazz and 20th century music.'
  },
  {
    'name': 'Willie Nelson',
    'image' : 'http://images.musictimes.com/data/images/full/1337/willie-nelson-studies-deeply-before-picking-tour-openers.jpg',
    'bio'   : 'Willie Hugh Nelson is an American musician, singer, songwriter, author, poet, actor, and activist. The critical success of the album Shotgun Willie, combined with the critical and commercial success of Red Headed Stranger and Stardust, made Nelson one of the most recognized artists in country music.'
  },
  {
    'name': 'Prince',
    'image' : 'https://i.ytimg.com/vi/7NN3gsSf-Ys/maxresdefault.jpg',
    'bio'   : 'Prince Rogers Nelson was an American singer-songwriter, actor, multi-instrumentalist, philanthropist, dancer and record producer. He was a musical innovator who was known for his eclectic work, flamboyant stage presence, extravagant dress and makeup, and wide vocal range.'
  }
];





function Player(name, img, bio, isPlayerOne){
  return {
    name: name, 
    img: img, 
    bio: bio,
    wins: 0,
    isPlayerOne: isPlayerOne, 
    greeting: function (){
      console.log(this.name + 'says hi');
    },
    setName: function(name){
      this.name = name;
      var domUpdateEvent = new CustomEvent('setName', {});
      document.dispatchEvent(domUpdateEvent);
    },
    domUpdateName: function(){
      if(this.isPlayerOne){
        document.getElementById('P1tab').innerHTML = this.name + ' Wins: ' + this.wins; 
      } else {
        document.getElementById('P2tab').innerHTML = this.name + ' Wins: ' + this.wins; 
      }
    },
    setUp: function() {
      that = this;
      document.addEventListener('setName', function(e){
        that.domUpdateName();
      })
      this.domUpdateName()
      // var myInput = document.createElement('input');
      // myInput.addEventListener('change', function(e){
      //   console.log(e);
      //   that.setName(e.target.value); 
      // })
    }
  };
}







