var vows   = require('vows'),
    assert = require('assert'),
    Deck   = require('../lib/Deck.js').Deck;

vows.describe('Generate deck of flash cards').addBatch({
  'A deck of cards': {
    topic: function() { return Deck; },
    'should have a function to generate cards': function(topic) {
      assert.isFunction(topic.prototype._generateCards);
    },
  },
  'When creating a default deck of cards': {
    topic: function() { return new Deck(); },
    'it will have upper and lower bounds of 1 and 10': function(topic) {
      assert.equal(topic.getLowerBound(), 1);
      assert.equal(topic.getUpperBound(), 10);
    },
    'will have 10 cards in an array': function(topic) {
      assert.isFunction(topic.getCards);
      assert.typeOf(topic.getCards(), 'array');
      assert.equal(topic.getCards().length, 10);
    },
    'will have an iterator for the deck that starts at 0':  function(topic) {
      assert.equal(topic.getCurrentCard(), topic.getCards()[0])
    },
    'will be of type addition': function (topic) {
      assert.isFunction(topic.getType);
      assert.equal(topic.getType(), 'add');
    },
    'has a nextCard function': function (topic) {
      assert.isFunction(topic.nextCard);
    },
    'has card objects in its cards array': function (topic) {
        topic.getCards().forEach(function() {
          topic.nextCard(function(card) {
            if (card) {
              assert.isObject(card);
              assert.include(card, 'terms');
              assert.typeOf(card.terms, 'array');
              assert.include(card, 'operation');
              assert.typeOf(card.operation, 'string');
              assert.equal(card.operation, 'add');
              assert.equal(topic.getCurrentCard(), card);
            } else {
              assert.equal(card, undefined);
              assert.equal(topic.getCurrentCard(), topic.getCards()[0]);
            };
        });
      });//Assert that when we're at the end, nextCard returns 'false' and currentCard is 0
    }
  }
}).run(); // Run it