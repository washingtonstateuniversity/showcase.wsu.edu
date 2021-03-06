<?php

/**
 * Provide a cache breaking script version for the theme.
 *
 * @return string Current script version
 */
function wsu_showcase_script_version() {
	return spine_get_script_version() . '0.0.1';
}

add_action( 'wp_enqueue_scripts', 'wsu_showcase_enqueue_scripts', 11 );
/**
 * Hooking into wp_enqueue_scripts allows you to add custom Javascript to every front
 * end page view. Using available APIs in WordPress, you can restrict this to
 * limited page views as well.
 *
 * As with the action above, change the prefix of this function from spine_child
 */
function wsu_showcase_enqueue_scripts() {
	wp_enqueue_script( 'wsu-showcase', get_stylesheet_directory_uri() . '/js/custom.min.js', array( 'jquery' ), wsu_showcase_script_version(), true );
}


function showcase_create_posttype() {
 
    register_post_type( 'profile',
    // CPT Options
        array(
            'labels' => array(
                'name' => __( 'Profiles' ),
                'singular_name' => __( 'Profile' )
            ),
            'public' => true,
            'has_archive' => true,
			'rewrite' => array('slug' => 'profiles'),
			'supports' => array('title', 'editor', 'custom-fields', 'excerpt', 'thumbnail'),
            'show_in_rest' => true,
 
        )
    );
}


add_action( 'init', 'showcase_create_posttype' );


function showcase_embed_template( $template ) {
	
	if ( isset( $_GET['modal-embed'] ) ) {
		return __DIR__ . '/embed-template.php';
	} 
 
    return $template;
}


add_filter( 'template_include', 'showcase_embed_template' );