<?php

add_action( 'wp_enqueue_scripts', 'spine_child_enqueue_scripts', 11 );
/**
 * Hooking into wp_enqueue_scripts allows you to add custom Javascript to every front
 * end page view. Using available APIs in WordPress, you can restrict this to
 * limited page views as well.
 *
 * As with the action above, change the prefix of this function from spine_child
 */
function spine_child_enqueue_scripts() {
	wp_enqueue_script( 'wsu-showcase', get_stylesheet_directory_uri() . '/js/custom.min.js', array( 'jquery' ), spine_get_script_version(), true );
}