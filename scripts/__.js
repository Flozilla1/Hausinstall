/**
 * JS Library of Technikum Wien
 * @version 1.0
 */
__ = {
	dn_ : function( s, x1, x2 ) {
		var dnStart = ( typeof x1 == "object" ) ? x1 : document;
		var fn = ( typeof x1 == "function" ) ? x1 : x2;
		var sfn = "querySelectorAll";
		if( /^.[a-zA-Z0-9_-]*$/.test( s ) ) {
			var sfst = s.substr( 0, 1 );
			if( sfst == "#" ) {
				sfn = "getElementById";
				s = s.substr( 1 );
			}
			else if( sfst == "." ) {
				sfn = "getElementsByClassName";
				s = s.substr( 1 );
			}
			else if( /[a-zA-Z]/.test( sfst ) ) {
				sfn = "getElementsByTagName";
			}
		}
		var xdn = dnStart[ sfn ]( s );
		if( xdn ) {
			if( fn ) {
				__.each( xdn, fn );
			}
			var c = xdn.length;
			if ( ! isNaN( c ) ) {
				if( c == 1 ) {
					return xdn[ 0 ];
				}
				else if( c == 0 ) {
					return null;
				}
			}
		}
		return xdn;
	}
	, _dn : function( s, dn, fn ) {
		var dnClosest = dn.closest( s );
		if( fn ) {
			__.each( dnClosest, fn );
		}
		return dnClosest
	}
	, each : function( xdn, fn ) {
		var ldn = ( ! isNaN( xdn.length ) ) ? xdn : [ xdn ];
		var c = ldn.length;
		for( var ix=0; ix<c; ix++ ) {
			fn( ldn[ ix ], ix );
		}
	}
	, dn : {
		  del : function( dn ) {
			dn.parentNode.removeChild( dn );
		}
		, _move : function( dnMove, dnTarget ) {
			dnTarget.parentNode.insertBefore( dnMove, dnTarget );
		  }
		, move : function( dnMove, dnTarget ) {
			dnTarget.appendChild( dnMove );
		  }
		, move_ : function( dnMove, dnTarget ) {
			dnTarget.parentNode.insertBefore( dnMove, dnTarget.nextSibling );
		}
		, add : function( h, x1, x2 ) {
			return __.dn._add_( h, x1, x2, "move" );
		}
		, _add : function( h, x1, x2 ) {
			return __.dn._add_( h, x1, x2, "_move" );
		}
		, add_ : function( h, x1, x2 ) {
			return __.dn._add_( h, x1, x2, "move_" );
		}
		, _add_ : function( h, x1, x2, sfn ) {
			var dnRoot = ( typeof x1 == "object" ) ? x1 : document.body;
			var fn = ( typeof x1 == "function" ) ? x1 : x2;
			var docFrag = document.createRange().createContextualFragment( h );
			var xdn = docFrag.children;
			var cNew = xdn.length;
			if( fn ) {
				__.each( xdn, fn );
			}
			__.dn[ sfn ]( docFrag, dnRoot );
			if( cNew == 1 ) {
				return dnRoot.lastChild;
			}
			var ldnChildren = dnRoot.children;
			var cRoot = ldnChildren.length;
			var ldn = [];
			for( var ix=0; ix<cNew; ix++ ) {
				var ixNew = cRoot - 1 - ix;
				ldn.push( ldnChildren[ ixNew ] );
			}
			return ldn;
		}
		, show : function( dn ) {
			if( dn.style.display != "none" ) {
				return;
			}
			var sDisplay = ( dn.hasAttribute( "__.display" ) )
				? dn.getAttribute( "__.display" )
				: "block";
			dn.style.display = sDisplay;
		}
		, hide : function( dn ) {
			if( dn.style.display == "none" ) {
				return;
			}
			var sDisplay = getComputedStyle( dn ).display;
			dn.setAttribute( "__.display", sDisplay ); 
			dn.style.display = "none";
		}
		, ix : function( dn ) {
			var ix = 0;
			while( ( dn = dn.previousSibling ) != null ) {
				ix++;
			}
			return ix;
		}
		, x : function( dn, n ) {
			if( n ) {
				dn.style.left = parseInt( n ) + "px";
			}
			else {
				return dn.getBoundingClientRect().left;
			}
		}
		, y : function( dn, n ) {
			if( n ) {
				dn.style.top = parseInt( n ) + "px";
			}
			else {
				return dn.getBoundingClientRect().top;
			}
		}
		, dx : function( dn, dx ) {
			if( dx ) {
				dn.style.width = parseInt( dx ) + "px";
			}
			else {
				return dn.getBoundingClientRect().width;
			}
		}
		, dy : function( dn, dy ) {
			if( dy ) {
				dn.style.height = parseInt( dy ) + "px";
			}
			else {
				return dn.getBoundingClientRect().height;
			}
		}
	}
	, s : {
		  o : function( s ) {
			try {
				return JSON.parse( s );
			}
			catch( e ) {
				return null;
			}
		}
		, empty : function( s ) {
			return ( s.trim() == "" );
		}
	}
	, l : {
		  del : function( l, x ) {
			var ix = l.indexOf( x );
			if( ix > -1 ) {
				l.splice( ix, 1 );
			}
			return l;
		}
		, contains : function( ls, s ) {
			return ( ls.indexOf( s ) > -1 );
		}
		, empty : function( l ) {
			var c = l.length;
			return ( ! isNaN( c ) && c > 0 ); 
		}
	}
	, o : {
		  s : function( o ) {
			return JSON.stringify( o );
		}
		, add : function( ocur, onew ) {
			for( var s in onew ) {
				ocur[ s ] = onew[ s ];
			} 
		}
		, kRename : function( o, kold, knew ) {
			Object.defineProperty(
				  o
				, knew
				, Object.getOwnPropertyDescriptor( o, kold )
			);
			delete o[ kold ];
		}
		, copy : function( o ) {
			try {
				return JSON.parse( JSON.stringify( o ) );
			}
			catch( e ) {
				return null;
			}
		}
		, empty : function( x ) {
			for( var k in x ) {
				return false;
			}
			return true;
		}
	}
	, css : function( sStyle ) {
		var dn = document.createElement( 'style' );
		document.body.appendChild( dn );
		dn.innerHTML = sStyle;
	}
	, e : {
		stop : function( e ) {
			e.stopPropagation();
			e.preventDefault();
		}
	}
	, b : {
		  mail : function( s ) {
			return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,4}$/.test( s );
		}
		, url : function( s ) {
			return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test( v );
		}
	}
	, cookie : {
		  get : function( k ) {
			var v = document.cookie.match( '(^|;) ?' + k + '=([^;]*)(;|$)' );
			return v ? v[ 2 ] : null;
		}
		, set : function( k, v, nDays ) {
			var d = new Date;
			d.setTime( d.getTime() + 86400000 * nDays );
			document.cookie = k + "=" + v + ";path=/;expires=" + d.toGMTString();
		}
		, del : function( k ) {
			__.cookie.set( k, '', -1 );
		}
	}
	, url : {
		  oParams : function () {
			var o = {};
			window.location.href.replace(
				/[?&]+([^=&]+)=([^&]*)/gi,
				function( m, k, v ) {
					o[ k ] = v;
				}
			);
			return o;
		}
	}
}

/* *** Polyfills *** */
/* matches */
this.Element && function( oPrototype ) {
	oPrototype.matches = oPrototype.matches ||
	oPrototype.matchesSelector ||
	oPrototype.webkitMatchesSelector ||
	oPrototype.msMatchesSelector ||
	function( sCSS ) {
		var dn = this;
		var ldn = ( dn.parentNode || dn.document ).querySelectorAll( sCSS );
		var ix = -1;
		while( ldn[ ++ix ] && ldn[ ix ] != dn ){
			// just loop until hit the end
		};
		return ( ldn[ ix ] ) ? true : false;
	}
}( Element.prototype );

/* closest */
this.Element && function( oPrototype ) {
	oPrototype.closest = oPrototype.closest || function( sCSS ) {
		var dn = this;
		while( dn.matches && ! dn.matches( sCSS ) ) {
			dn = dn.parentNode;
		}
		return ( dn.matches ) ? dn : null;
	}
}( Element.prototype );

/* classList.toggle */

( function() {
	function ClassList( el ) {
		this.element = el;
	}
	ClassList.prototype = {
		toggle : function( name ) {
			if( this.contains( name ) ) {
				this.remove( name );
				return false;
			}
			else {
				this.add( name );
				return true;
			}
		}
	};
}() );








