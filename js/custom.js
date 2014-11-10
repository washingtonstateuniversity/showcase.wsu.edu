/**
 * Wordcount scripting forked from LGPL licensed TinyMCE and modified to serve a narrower purpose.
 * https://github.com/tinymce/tinymce/blob/master/js/tinymce/plugins/wordcount/plugin.js
 */
(function($){
	/**
	 * The maximum number of words to allow.
	 *
	 * @type {number}
	 */
	var max_count = 0;

	/**
	 * The container in which to count words.
	 *
	 * @type {string}
	 */
	var textarea = '';

	/**
	 * Process the contents of a container to retrieve an accurate
	 * word count.
	 *
	 * @param container
	 */
	var get_word_count = function( container ) {
		var data = $( container ).val();
		var count = 0;
		if ( data ) {
			data = data.replace(/\.\.\./g, ' '); // convert ellipses to spaces
			data = data.replace(/<.[^<>]*?>/g, ' ').replace(/&nbsp;|&#160;/gi, ' '); // remove html tags and space chars

			// deal with html entities
			data = data.replace(/(\w+)(&#?[a-z0-9]+;)+(\w+)/i, "$1$3").replace(/&.+?;/g, ' ');
			data = data.replace(/[0-9.(),;:!?%#$?\x27\x22_+=\\\/\-]*/g, ''); // remove numbers and punctuation

			var wordArray = data.match(/[\w\u2019\x27\-\u00C0-\u1FFF]+/g);
			if (wordArray) {
				count = wordArray.length;
			}
		}

		return count;
	};

	/**
	 * Update the counter text below the textarea currently being word count restricted.
	 *
	 * @param element
	 */
	var update_word_count = function( element ) {
		$('#wsu-word-counter').html( get_word_count(element));
	};

	$(document ).ready( function() {
		var textarea_container;

		var classes = $('[class*=max-words]');

		var gform_button = $('.gform_button');

		// If no elements with a max-words class exist, bail.
		if ( 0 === classes.length ) {
			return;
		}

		// Parse the captured classes for the actual count class.
		classes = classes.attr('class').split(/\s+/);
		for ( var i = 0; i < classes.length; i++ ) {
			if ( classes[i].indexOf('wsu-max-words-') == 0 ) {
				textarea_container = classes[i];
			}
		}

		// Our max count is hidden in the class.
		max_count = parseInt( textarea_container.split('-' ).pop() );

		textarea = $( '.' + textarea_container ).find('textarea');
		textarea.parent().append('<div id="wsu-word-count"><span id="wsu-word-counter">0</span>/' + max_count + ' words</div>');

		// Update the text count whenever space or enter is hit.
		textarea.on('keyup', function(e) {
			if (e.keyCode == 32 || e.keyCode == 13) {
				update_word_count(this);
			}
		});

		// Remove the default onclick action added by Gravity Forms
		gform_button.removeAttr('onclick');

		// Setup a click event to check the word count and stop if it is greater than max.
		gform_button.on('click', function(e) {
			var current_count = get_word_count( textarea );
			if ( current_count > max_count ) {
				alert( 'Up to ' + max_count + ' words are allowed on this form. Your current count is ' + current_count + '.' );
				return false;
			}
		});
	});
}(jQuery));