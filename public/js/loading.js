(function($){
	function injector(t, splitter, klass, after) {
		var text = t.text()
		, a = text.split(splitter)
		, inject = '';
		if (a.length) {
			$(a).each(function(i, item) {
				inject += '<span class="'+klass+(i+1)+'" aria-hidden="true">'+item+'</span>'+after;
			});
			t.attr('aria-label',text)
			.empty()
			.append(inject)

		}
	}


	var methods = {
		init : function() {

			return this.each(function() {
				injector($(this), '', 'char', '');
			});

		},

		words : function() {

			return this.each(function() {
				injector($(this), ' ', 'word', ' ');
			});

		},

		lines : function() {

			return this.each(function() {
				var r = "eefec303079ad17405c889e092e105b0";
				// Because it's hard to split a <br/> tag consistently across browsers,
				// (*ahem* IE *ahem*), we replace all <br/> instances with an md5 hash
				// (of the word "split").  If you're trying to use this plugin on that
				// md5 hash string, it will fail because you're being ridiculous.
				injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
			});

		}
	};

	$.fn.lettering = function( method ) {
		// Method calling logic
		if ( method && methods[method] ) {
			return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
		} else if ( method === 'letters' || ! method ) {
			return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
		}
		$.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
		return this;
	};

})(jQuery);
function Ticker( elem ) {
    elem.lettering();
    this.done = false;
    this.cycleCount = 5;
    this.cycleCurrent = 0;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;\':"<>?,./`~'.split('');
    this.charsCount = this.chars.length;
    this.letters = elem.find( 'span' );
    this.letterCount = this.letters.length;
    this.letterCurrent = 0;
  
    this.letters.each( function() {
      var $this = $( this );
      $this.attr( 'data-orig', $this.text() );
      $this.text( '-' );
    });
  }
  
  Ticker.prototype.getChar = function() {
    return this.chars[ Math.floor( Math.random() * this.charsCount ) ];
  };
  
  Ticker.prototype.reset = function() {
    this.done = false;
    this.cycleCurrent = 0;
    this.letterCurrent = 0;
    this.letters.each( function() {
      var $this = $( this );
      $this.text( $this.attr( 'data-orig' ) );
      $this.removeClass( 'done' );
    });
    this.loop();
  };
  
  Ticker.prototype.loop = function() {
    var self = this;
  
    this.letters.each( function( index, elem ) {
      var $elem = $( elem );
      if( index >= self.letterCurrent ) {
        if( $elem.text() !== ' ' ) {
          $elem.text( self.getChar() );
          $elem.css( 'opacity', Math.random() );
        }
      }
    });
  
    if( this.cycleCurrent < this.cycleCount ) {
      this.cycleCurrent++;
    } else if( this.letterCurrent < this.letterCount ) {
      var currLetter = this.letters.eq( this.letterCurrent );
      this.cycleCurrent = 0;
      currLetter.text( currLetter.attr( 'data-orig' ) ).css( 'opacity', 1 ).addClass( 'done' );
      this.letterCurrent++;
    } else {
      this.done = true;
    }
  
    if( !this.done ) {
      requestAnimationFrame( function() {
        self.loop();
      });
    } else {
      setTimeout( function() {
        self.reset();
      }, 750 );
    }
  };
  
  $words = $( '.word' );
  
  $words.each( function() {
    var $this = $( this ),
      ticker = new Ticker( $this ).reset();
    $this.data( 'ticker', ticker  );
  });