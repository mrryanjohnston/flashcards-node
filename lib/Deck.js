var Deck = exports.Deck = function(newSize, newUpper, newLower, type) {
  this.size = newSize || 10;
  this.cards = [];
  this.cardIterator = 0;
  this.upperBound = newUpper || 10;
  this.lowerBound = newLower || 1;
  this.type = type || 'add';
  this._generateCards();
}

Deck.prototype.getSize = function() {
  return this.size;
}

Deck.prototype.getUpperBound = function() {
  return this.upperBound;
}

Deck.prototype.getLowerBound = function() {
  return this.lowerBound;
}

Deck.prototype.getCards = function() {
  return this.cards;
}

Deck.prototype.getType = function() {
  return this.type;
}

Deck.prototype.getCurrentCard = function() {
  return this.cards[this.cardIterator];
}

Deck.prototype._generateCards = function() {
  for (var x=0; x<this.getSize(); x++) {
    var term1 = Math.floor(Math.random() * (this.getUpperBound() - this.getLowerBound() + 1)) + this.getLowerBound();
    var term2 = Math.floor(Math.random() * (this.getUpperBound() - this.getLowerBound() + 1)) + this.getLowerBound();
    this.cards.push({terms:[term1,term2], operation: this.getType()});
  }
}

Deck.prototype.nextCard = function(callback) {
  if (++this.cardIterator==(this.cards.length)) {
    this.cardIterator = 0;
    callback(undefined);
  } else {
    callback(this.cards[this.cardIterator]);
  }
}