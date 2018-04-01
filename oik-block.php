<?php
/**
 * Plugin Name: oik-block
 * Plugin URI: https://www.oik-plugins.com/oik-plugins/oik-block
 * Description: WordPress blocks for oik shortcodes
 * Author: Herb Miller
 * Author URI: https://herbmiller.me/about/mick
 * Version: 0.0.0
 * License: GPL3+
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 *
 * @package oik-block
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/*
function oik_block_templates( $args, $post_type ) {

  if ( $post_type == 'post' ) {
    $args['template_lock'] = true;
    $args['template'] = [
      [
        'core/image', [
          'align' => 'left',
        ]
      ],
      [
        'core/paragraph', [
          'placeholder' => 'The only thing you can add',
        ]
      ]
    ];
  }

  return $args;

}
//add_filter( 'register_post_type_args', 'oik_block_templates', 20, 2 );
*/

/**
 * Enqueues block editor JavaScript and CSS
 * 
 * 
 * 
 */
function oik_block_editor_scripts() {
	bw_trace2();
	bw_backtrace();
	
	if ( isset( $_GET['classic-editor'] ) ) {
		gob();
	}
	//gob();

    // Make paths variables so we don't write em twice ;)
    $blockPath = 'blocks/build/js/editor.blocks.js';
    //$blockPath = '/blocks/build/js/dummy.blocks.js';
		
    $editorStylePath = 'blocks/build/css/blocks.editor.css';

    // Enqueue the bundled block JS file
		
    wp_enqueue_script(
        'oik_block-blocks-js',
        plugins_url( $blockPath, __FILE__ ),
        [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api' ],
        filemtime( plugin_dir_path(__FILE__) . $blockPath )
    );
		

    // Pass in REST URL
    wp_localize_script(
      'oik_block-blocks-js',
      'oik_block_globals',
      [
        'rest_url' => esc_url( rest_url() )
      ]);


    // Enqueue optional editor only styles
		
    wp_enqueue_style(
        'oik_block-blocks-editor-css',
        plugins_url( $editorStylePath, __FILE__),
        [ 'wp-blocks' ],
        filemtime( plugin_dir_path( __FILE__ ) . $editorStylePath )
    );
		
		

}


/**
 * Enqueue block editor JavaScript and CSS
 * 
 
 * It's not the setting of classic-editor that's the problem
 * it's the fact that enqueueing the scripts when we're not in the editor
 * but are loading TinyMCE that we get the problem.
 * 
 * But which of the scripts is to blame!
 * Try knocking out the dependencies one by one.
 * 
 */
function oik_block_frontend_scripts()
{
    $blockPath = 'blocks/build/js/frontend.blocks.js';
    // Make paths variables so we don't write em twice ;)
		
		 bw_backtrace();
		 bw_trace2( $_GET, "_GET" );

		// Don't do Gutenberg stuff when loading the classic editor
		if ( array_key_exists( 'classic-editor', $_GET ) ) {
			remove_filter( 'wp_editor_settings', 'gutenberg_disable_editor_settings_wpautop' );
			//gob();
			return;
		}
		
		
		
    // Enqueue the bundled block JS file
     wp_enqueue_script(
        'oik_block-blocks-frontend-js',
        plugins_url( $blockPath, __FILE__ ),
        [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api' ],
        filemtime( plugin_dir_path(__FILE__) . $blockPath )
    );
		
		
		


}

function oik_block_frontend_styles() {
    $stylePath = 'blocks/build/css/blocks.style.css';
    // Enqueue frontend and editor block styles
    wp_enqueue_style(
        'oik_block-blocks-css',
        plugins_url($stylePath, __FILE__),
        [ 'wp-blocks' ],
        filemtime(plugin_dir_path(__FILE__) . $stylePath )
    );

}



/**
 * Server rendering contact-form block
 * 
 * @param array $attributes
 * @return string generated HTML
 */
function oik_block_dynamic_block_contact_form( $attributes ) {
	bw_backtrace();
	bw_trace2();
	
	oik_require( "shortcodes/oik-contact-form.php" );
	$html = bw_contact_form( $attributes );
	return $html;

}



/**
 * Server rendering for /blocks/examples/13-dynamic-lat
 */
function oik_block_dynamic_alt_block_render( $attributes ) {

    $posts = wp_get_recent_posts( array(
        'numberposts' => 5,
        'post_status' => 'publish',
    ) );

    if ( count( $posts ) === 0 ) {
        return 'No posts';
    }

    $markup = '<ul>';
    foreach( $posts as $post ) {

      $markup .= sprintf(
          '<li><a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a></li>',
          esc_url( get_permalink( $post['ID'] ) ),
          esc_html( get_the_title( $post['ID'] ) )
      );

    }

    return $markup;

}

/**
 * Implements "gutenberg_can_edit_post_type" for oik-blocks 
 * 
 * Here we'll implement logic to test whether or not we're going to allow Gutenberg to edit the content
 *
 * Decisions to be implemented include:
 * - If there are no blocks then we use the user's or system options.
 * - If the post type supports revisions then we may not want to use Gutenberg
 * - If the post has been marked as "Classic-editor"
 *
 */
function oik_block_gutenberg_can_edit_post_type( $can_edit, $post_type ) {
	bw_trace2();
	$can_edit = post_type_supports( $post_type, "revisions" );
	return $can_edit;
}

/**
 * Implements actions for "oik_loaded"
 *
 * Now we know it's safe to respond to shortcodes
 */
function oik_block_oik_loaded() {
	add_action( "oik_add_shortcodes", "oik_block_oik_add_shortcodes" );
	add_filter( "oik_block_query_inline_shortcodes", "oik_block_query_inline_shortcodes" );
	add_filter( "oik_block_query_incompatible_shortcodes", "oik_block_query_incompatible_shortcodes" );
}

/** 
 * Add our shortcodes
 */
function oik_block_oik_add_shortcodes() {
  bw_add_shortcode( "blocks", "oik_block_blocks", oik_path("shortcodes/oik-blocks.php", "oik-block"), false );
	bw_add_shortcode( "guts", "oik_block_guts", oik_path( "shortcodes/oik-guts.php", "oik-block" ), false );
	bw_add_shortcode( "content", "oik_block_content", oik_path( "shortcodes/oik-content.php", "oik-block" ), false );
}


function oik_block_loaded() {

	// Hook scripts and styles functions into enqueue_block_assets hook
	
	add_action('enqueue_block_assets', 'oik_block_frontend_scripts');
	add_action('enqueue_block_assets', 'oik_block_frontend_styles');
	
	// Hook scripts function into block editor hook
	add_action( 'enqueue_block_editor_assets', 'oik_block_editor_scripts' );
	
	add_filter( 'gutenberg_can_edit_post_type', 'oik_block_gutenberg_can_edit_post_type', 10, 2 );
	
	

	add_action( "oik_loaded", "oik_block_oik_loaded" );
	
	oik_block_register_dynamic_blocks();
	
	
	
  if ( !defined('DOING_AJAX') ) {
    add_action( "save_post", "oik_block_save_post", 10, 3 );
		add_action( 'add_meta_boxes', 'oik_block_add_meta_boxes', 10, 2 );
    //add_action( "edit_attachment", "oik_clone_edit_attachment", 10, 1 );
    //add_action( "add_attachment", "oik_clone_add_attachment", 10, 1 );
  }

}

/**
 * Registers action/filter hooks for oik's dynamic blocks
 */
function oik_block_register_dynamic_blocks() {
	if ( function_exists( "register_block_type" ) ) {
		register_block_type( 'oik-block/contact-form', [  'render_callback' => 'oik_block_dynamic_block_contact_form' ] );
	}
}

/** 
 * Implements "add_meta_boxes" for oik-block 
 *
 * Adds the meta box to enable the user to set the preferred editor for the post
 * 
 */
function oik_block_add_meta_boxes( $post_type, $post ) {

  //$clone = post_type_supports( $post_type, "clone" );
  //if ( $clone ) {
		
    oik_require( "admin/oik-block-meta-box.php", "oik-block" );
		
    add_meta_box( 'oik_block', __( "Editor selection", 'oik-block' ), 'oik_block_meta_box', $post_type, 'normal', 'default' );
		
}

/**
 * Implements save for the oik_block meta box
 *
 * We invoke the logic as a lazy function.
 *
 * @param ID $id - the ID of the post being updated
 * @param post $post - the post object
 * @param bool $update - true more often than not
 */
function oik_block_save_post( $id, $post, $update ) {
  if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		// Ignore autosaves
	} else {
		oik_require( "admin/oik-block-save-post.php", "oik-block" );
		oik_block_lazy_save_post( $id, $post, $update );
	}
}

/**
 * Queries inline shortcodes for oik and related plugins
 * 
 * @TODO Determine if we need to know the component for the shortcode.
 * This may help us decide whether or not to deactivate the plugin
 * See also the schunter plugin.
 * 
 * @param array $inline_shortcodes
 * @return array $inline_shortcodes
 */ 
function oik_block_query_inline_shortcodes( $inline_shortcodes ) {
	oik_require( "converter/class-shortcode-converter.php", "oik-block" );
	$shortcode_converter = new Shortcode_converter();
	$inline_shortcodes = $shortcode_converter->query_inline_shortcodes( $inline_shortcodes );
	return $inline_shortcodes;
}


/**
 * Queries incompatible shortcodes for oik and related plugins
 * 
 * @TODO Determine if we need to know the component for the shortcode.
 * This may help us decide whether or not to deactivate the plugin
 * See also the schunter plugin.
 * 
 * @param array $inline_shortcodes
 * @return array $inline_shortcodes
 */ 
function oik_block_query_incompatible_shortcodes( $incompatible_shortcodes ) {
	oik_require( "converter/class-shortcode-converter.php", "oik-block" );
	$shortcode_converter = new Shortcode_converter();
	$incompatible_shortcodes = $shortcode_converter->query_incompatible_shortcodes( $incompatible_shortcodes );
	return $incompatible_shortcodes;
}

oik_block_loaded();





