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
    'has card objects in its cards array': function (topic) {
        
    },
    'has a nextCard function': {
      'that calls back with the next card': function (topic) {
        topic.nextCard(function(card) { 
          assert.deepEqual(card, topic.getCards()[1]); 
          assert.deepEqual(card, topic.getCurrentCard());
        });
      },
      'that returns false when there are no cards left': function (topic) {
        for (var x=0; x<topic.getSize()-3; x++) {
          (function(y) {
            topic.nextCard(function(card) {
              if (y===topic.getSize()) {
                assert.isUndefined(card);
                assert.equal(topic.getCurrentCard(), topic.getCards()[0]);
              }
            });
          })(x);
        }
      }
    }
  }
}).run(); // Run it