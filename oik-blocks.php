<?php
/**
 * Plugin Name: oik-blocks
 * Plugin URI: https://www.oik-plugins.com/oik-plugins/oik-blocks
 * Description: WordPress blocks, aka Gutenberg blocks, for oik shortcodes.
 * Author: Herb Miller
 * Author URI: https://oik-plugins.com/author/bobbingwide
 * Version: 0.5.0
 * License: GPL3+
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: oik-blocks
 * Domain Path: /languages/
 *
 * @package oik-blocks
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Enqueues block editor JavaScript and CSS
 * 
 * Notes:
 * - This routine shouldn't be invoked when using the classic-editor
 * - But we can no longer perform tests on the classic-editor parameter alone
 * - It should only enqueue scripts for the Gutenberg editor
 * - Not in other admin areas 
 * 
 * @TODO Check purpose of the wp_localize_script !
 */
function oik_blocks_editor_scripts() {
	bw_trace2();
	bw_backtrace();

	
	if ( isset( $_GET['classic-editor'] ) ) {
		//gob();
	}

	//if ( doing_filter( "replace_editor" ) ) {
		oik_blocks_register_editor_scripts();
		wp_enqueue_script( 'oik_blocks-blocks-js' );
		// Pass in REST URL
		wp_localize_script(
			'oik_blocks-blocks-js',
			'oik_blocks_globals',
			[
				'rest_url' => esc_url( rest_url() )
			]);
	//}
	// Enqueue optional editor only styles
	$editorStylePath = 'blocks/build/css/blocks.editor.css';
		
	wp_enqueue_style(
		'oik_blocks-blocks-editor-css',
		plugins_url( $editorStylePath, __FILE__),
		[ ],
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
function oik_blocks_frontend_scripts()
{
	gob();
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
		
		if ( is_admin() ) {
			return;
		}
		
		
    // Enqueue the bundled block JS file
     wp_enqueue_script(
        'oik_blocks-blocks-frontend-js',
        plugins_url( $blockPath, __FILE__ ),
        //[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api' ],
				
					[ ],
        filemtime( plugin_dir_path(__FILE__) . $blockPath )
    );
		
		
		


}

function oik_blocks_frontend_styles() {
    $stylePath = 'blocks/build/css/blocks.style.css';
    // Enqueue frontend and editor block styles
    wp_enqueue_style(
        'oik_blocks-blocks-css',
        plugins_url($stylePath, __FILE__),
        [ ],
        filemtime(plugin_dir_path(__FILE__) . $stylePath )
    );
    /**
     * The following blocks may want to display icons that ( still ) come from dashicons,
     * which is no longer automatically enqueued in the front end.
     *
     * - oik-block/blockicon
     * - oik-block/blockinfo
     * - oik-block/blocklist
     */
    wp_enqueue_style( 'dashicons');
}



/**
 * Server rendering contact-form block
 * 
 * @param array $attributes
 * @return string generated HTML
 */
function oik_blocks_dynamic_block_contact_form( $attributes ) {
	bw_backtrace();
	bw_trace2();
	
	if ( did_action( "oik_loaded" ) ) {
		oik_require( "shortcodes/oik-contact-form.php" );
		$html = bw_contact_form( $attributes );
	} else {
		$html = "The Contact form block requires the oik plugin";
	}
	return $html;

}

/**
 * Server rendering dynamic CSS block with content
 * 
 * Assumes that the oik-css plugin is installed.
 * The plugin doesn't need to be activated.
 * 
 * @param array $attributes
 * @return string generated HTML
 */
function oik_blocks_dynamic_block_css( $attributes ) {
	//bw_backtrace();
	$html = oik_blocks_check_server_func( "shortcodes/oik-css.php", "oik-css", "oik_css");
	if ( !$html ) {
		$content = bw_array_get( $attributes, "css", null );
		bw_trace2( $content, "Content" );
		//$content = oik_blocks_fetch_dynamic_content( "wp:oik-blocks/css" );
		$html = oik_css( $attributes, $content );
	}
	return $html;
}


/**
 * Server rendering dynamic CSV block
 * 
 * Checks that the oik-bob-bing-wide plugin is installed.
 * The plugin doesn't need to be activated.
 * 
 * @param array $attributes
 * @return string generated HTML
 */
function oik_blocks_dynamic_block_csv( $attributes ) {
	//bw_backtrace();
	$html = oik_blocks_check_server_func( "shortcodes/oik-csv.php", "oik-bob-bing-wide", "bw_csv");
	if ( !$html ) {
		if ( function_exists( "oik_is_block_renderer") ) {
			oik_is_block_renderer( true );
		}
		do_action( "oik_add_shortcodes");
		$content = bw_array_get( $attributes, "content", null );
		bw_trace2( $content, "Content" );
		//oik_require( "shortcodes/oik-csv.php", "oik-bob-bing-wide" );
		$html = bw_csv( $attributes, $content );
		bw_trace2( $html, "html", false );
	}
	return $html;
}

/**
 * Server rendering dynamic shortcode block
 *
 * @TODO Find out how to invoke the selected shortcode
 *
 * @param array $attributes
 * @return string generated HTML
 */
function oik_blocks_dynamic_block_shortcode( $attributes ) {
	oik_require( "shortcodes/oik-shortcode.php", "oik-blocks" );
	$html = oik_blocks_shortcode_block( $attributes );
	return $html;
	
}

/**
 * Server rendering dynamic content block
 *
 *
 * @param array $attributes
 * @return string generated HTML
 */
function oik_blocks_dynamic_block_content_block( $attributes ) {
	$html = \oik\oik_blocks\oik_blocks_check_server_func( 'shortcodes/oik-content.php', 'oik-blocks', 'oik_content_block' );
	if ( ! $html ) {
		$html = oik_content_block( $attributes );
	}
	//oik_require( "shortcodes/oik-shortcode.php", "oik-blocks" );
	return $html;
}

/**
 * Renders the WordPress block
 *
 * @param array $attributes v, m, p
 */
function oik_blocks_dynamic_block_wp( $attributes ) {
	oik_require( "shortcodes/oik-bob-bing-wide.php", "oik");
	$html = bw_wp( $attributes );
	return $html;
}

/**
* Renders the GeSHi block
                        *
 * @param array $attributes lang, type, content
 */
function oik_blocks_dynamic_block_geshi( $attributes ) {
	oik_require( "shortcodes/oik-geshi.php", "oik-css");
	$content = bw_array_get( $attributes, "content", null);
	$html = oik_geshi( $attributes, $content );
	if ( !$html ) {
		$html = "empty";
	}
	return $html;
}

/**
 * Renders the Search block
 *
 * @param array $attributes
 */
function oik_blocks_dynamic_block_search( $attributes ) {
	$html = get_search_form( false );
	return $html;
}

/**
 * Renders the UK tides block
 *
 * @param array $attributes
 */
function oik_blocks_dynamic_block_uk_tides( $attributes ) {
	$html = oik_blocks_check_server_func( "shortcodes/uk-tides.php", "uk-tides", "bw_tides");
	if ( null === $html ) {
		$attributes = oik_blocks_uk_tides_attributes( $attributes );
		$html = bw_tides( $attributes, null, null );
	}
	return $html;
}

/**
 * Sets parameters for bw_tides from the blocks attributes
 * * domain | format
 * ------ | -----------------------------------
 * tidetimes.org.uk | domain/port-tide-times.rss
 * tidetimes.co.uk  | domain/rss/port-tide-times
 *
 * @param $attributes site, port
 * @return array with tideurl and store set from site and port
 */
function oik_blocks_uk_tides_attributes( $attributes ) {
	bw_trace2( $attributes );
	$site = bw_array_get( $attributes, "site", null );
	$port = bw_array_get( $attributes, "port", null );
	switch ( $site ) {
		case "couk":
			$tideurl = "https://tidetimes.co.uk/rss/$port-tide-times";
			break;
		default:
			$tideurl = "https://www.tidetimes.org.uk/$port-tide-times.rss";
	}
	$attributes[ 'tideurl'] = $tideurl;
	$attributes[ 'store'] = $tideurl;

	return $attributes;
}

/**
 * Renders the Fields block
 *
 * @param array $attributes fields, labels
 * @return string generated HTML
 */
function oik_blocks_dynamic_block_fields( $attributes ) {
	$html = oik_blocks_check_server_func( "shortcodes/oik-fields.php", "oik-fields", "bw_metadata");
	if ( null === $html ) {
		if ( function_exists( "oik_is_block_renderer") ) {
			oik_is_block_renderer( true );
		}
		$attributes = oik_blocks_fields_attributes( $attributes );
		$html = bw_metadata( $attributes, null, null );
		$html = oik_blocks_fields_results( $html, $attributes );
	}
	return $html;
}

/**
 * 'Filters' the Fields block's attributes
 *
 * @param array $attributes
 * @return array $attributes
 */
function oik_blocks_fields_attributes( $attributes ) {
	$fields = bw_array_get( $attributes, "fields", "none" );
	if ( "none" === $fields ) {
		unset( $attributes[ 'fields' ] );
	}
	return $attributes;
}

/**
 * 'filters' the Fields block's results
 *
 * @param string $html
 * @param array $attributes
 * @return string HTML
 */
function oik_blocks_fields_results( $html, $attributes ) {
	//bw_trace2();
	$fields = bw_array_get( $attributes, "fields", "none" );
	if ( $fields === 'featured' && ! has_post_thumbnail() ) {
		$html .= "Please set featured image";
	}

	return $html;
}

function oik_blocks_fields_featured_image_not_set() {
	return;
}

function oik_blocks_dynamic_block_address( $attributes ) {
	$html = oik_blocks_check_server_func( "shortcodes/oik-address.php", "oik", "bw_address" );
	if ( null === $html ) {
		$attributes['tag'] = bw_array_get( $attributes, 'tag', 'div');
		$html = bw_address( $attributes, null, null );
	}
	return $html;
}

/**
 * Server side rendering the the Person block
 */
function oik_blocks_dynamic_block_person( $attributes ) {
	$html = oik_blocks_check_server_func( null, "oik-user", "oiku_loaded");
	if ( null === $html ) {
		$html = oik_blocks_check_server_func( "shortcodes/oik-user.php", "oik-user", "oiku_user" );
	}
	if ( null === $html ) {
		$attributes['class'] = bw_array_get( $attributes, 'className', null);
		$html = oiku_user( $attributes, null, null );
	}
	return $html;
}

/**
 * Checks if the server function is available.
 *
 * Returns null if everything is OK, HTML if there's a problem.
 *
 * @param $filename - relative path for the file to load
 * @param $plugin - plugin slug
 * @param $funcname - required function name
 * @return string| null
 */
function oik_blocks_check_server_func( $filename, $plugin, $funcname ) {
	$html = null;
	if ( is_callable( $funcname )) {
		return $html;
	}

	/**
	 * We assume the plugin's main file is the same as the plugin name.
	 * This is true for oik plugins.
	 */
	if ( $plugin ) {
		$activated = is_plugin_active( "$plugin/$plugin.php" );
		if ( !$activated) {
			$html = "Plugin $plugin is not activated.";
			return $html;
		}
	}

	if ( $filename && $plugin ) {
		$path = oik_path( $filename, $plugin );
		if ( file_exists( $path ) ) {
			require_once $path;
		}
	}
	if ( !is_callable( $funcname )) {
		$html = "Server function $funcname not available. <br />Check $plugin is installed and activated.";
	}
	return $html;
}
/**
 * Returns the content of the dynamic block
 * 
 * This is a quick and dirty hack while we're waiting on a fix for Gutenberg issue #5760
 *
 * Assumptions:
 * - The block doesn't contain nested blocks of the same name
 * - The block has an end block marker ( e.g. <!-- /wp:oik-blocks/css --> )
 * 
 * Supports:
 * - Multiple blocks of the same name
 * - Should support attributes... 
 * 
 * 
 * @param string $blockname - of the form wp:prefix/block e.g. wp:oik-blocks/css
 * @return string the dynamic content for the block
 */ 
function oik_blocks_fetch_dynamic_content( $blockname ) {
	static $content = null;
	if ( null === $content ) {
		$content = null;
		$post = get_post();
		if ( $post ) {
			$content = $post->post_content;
		}
	}
	if ( $content ) {
		$start = strpos( $content, "<!-- " . $blockname );
		$content = substr( $content, $start + strlen( $blockname ) + 4 );
		$end_comment = strpos( $content, " -->" );
		$content = substr( $content, $end_comment + 4 );
		$end = strpos( $content, "<!-- /" . $blockname );
		$block_content = substr( $content, 0, $end );
		$content = substr( $content, $end + strlen( $blockname ) + 11 );
		bw_trace2( $content, "content" );
	}
	return $block_content;
}


/**
 * Server rendering for /blocks/examples/13-dynamic-lat
 */
function oik_blocks_dynamic_alt_block_render( $attributes ) {

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
 * Implements actions for "oik_loaded"
 *
 * Now we know it's safe to respond to shortcodes
 */
function oik_blocks_oik_loaded() {
	//add_action( "oik_add_shortcodes", "oik_blocks_oik_add_shortcodes" );
}

/** 
 * Adds our shortcodes.
 * 
 * oik-blocks doesn't have any. see oik-block instead
 */
function oik_blocks_oik_add_shortcodes() {
}

/**
 * Registers oik-blocks processing when plugin loaded
 */
function oik_blocks_loaded() {

	// Hook scripts and styles functions into enqueue_block_assets hook
	
	//add_action('enqueue_block_assets', 'oik_blocks_frontend_scripts');
	add_action('enqueue_block_assets', 'oik_blocks_frontend_styles');
	
	// Hook scripts function into block editor hook
	add_action( 'enqueue_block_editor_assets', 'oik_blocks_editor_scripts' );

	add_action( "oik_loaded", "oik_blocks_oik_loaded" );
	add_action( "plugins_loaded", "oik_blocks_plugins_loaded", 100 );
	
	add_action( "init", "oik_blocks_register_dynamic_blocks" );
	add_action( 'init', 'oik_blocks_register_block_patterns' );
	// herbs_hack was an action added to Gutenberg's client-assets.php when expirementing with pattern registration
	//add_action( 'herbs_hack', 'oik_blocks_register_block_patterns' );
	add_action( "oik_pre_theme_field", "oik_blocks_pre_theme_field" );
	
	
  if ( !defined('DOING_AJAX') ) {
  }

}

/**
 * Implements oik_pre_theme_field
 *
 * This allows the Fields block to ensure shortcodes are loaded during server side rendering.
 */
function oik_blocks_pre_theme_field() {
	do_action( "oik_add_shortcodes" );
}

/**
 * Registers action/filter hooks for oik's dynamic blocks
 *
 * We have to do this during init, which comes after _enqueue_ stuff
 *
 script, style, editor_script, and editor_style
 */
function oik_blocks_register_dynamic_blocks() {
	if ( function_exists( "register_block_type" ) ) {
		//oik_blocks_register_editor_scripts();
		oik_blocks_boot_libs();
		oik_blocks_maybe_register_block_type( 'oik-block/contact-form',
												[ 'render_callback' => 'oik_blocks_dynamic_block_contact_form' 
												,	'editor_script' => 'oik_blocks-blocks-js'
												, 'editor_style' => null
												, 'script' => null
												, 'style' => null
												] );
		oik_blocks_maybe_register_block_type( 'oik-block/css',
			[ 'render_callback' => 'oik_blocks_dynamic_block_css',
				'attributes' => [
					'css' => [ 'type' => 'string'],
					'text' => ['type' => 'string']
				]
			] );
		oik_blocks_maybe_register_block_type( 'oik-block/csv',
			[ 'render_callback' => 'oik_blocks_dynamic_block_csv',
			  'attributes' => [
				  'content' => [ 'type' => 'string'],
				  'uo' => ['type' => 'string'],
				  'th' => ['type' => 'boolean']
			  ]

			] );
		oik_blocks_maybe_register_block_type( 'oik-block/dummy',
												[ 'render_callback' => 'oik_blocks_dummy' 
												,	'editor_script' => 'oik_blocks-dummy-js'
												, 'script' => 'oik_blocks-dummy-js'
												]
											 );
		oik_blocks_maybe_register_block_type( 'oik-block/shortcode-block', [ 'render_callback' => 'oik_blocks_dynamic_block_shortcode' ] );
		oik_blocks_maybe_register_block_type( 'oik-block/wp',
			[ 'render_callback' => 'oik_blocks_dynamic_block_wp',
			  'attributes' => [ 'v' =>  [ 'type' => 'string', ]
				               , 'p' => ['type' => 'string' ]
			                    , 'm' => ['type' => 'string']
				  ]
			]
		);
		oik_blocks_maybe_register_block_type( 'oik-block/geshi',
			[ 'render_callback' => 'oik_blocks_dynamic_block_geshi',
			  'attributes' => [ 'lang' =>  [ 'type' => 'string', ]
				  , 'text' => ['type' => 'string' ]
				  , 'content' => ['type' => 'string']
			  ]
			]
		);
		oik_blocks_maybe_register_block_type( "oik-block/search",
		[ 'render_callback' => 'oik_blocks_dynamic_block_search' ]
			);

		oik_blocks_maybe_register_block_type( "oik-block/uk-tides",
			[ 'render_callback' => 'oik_blocks_dynamic_block_uk_tides',
			  'attributes' => [
			  	    'site' => [ 'type' => 'string' ]
				  , 'port' => [ 'type' => 'string' ]
			  ]
			]

		);
		oik_blocks_maybe_register_block_type( "oik-block/fields",
			[ 'render_callback' => 'oik_blocks_dynamic_block_fields',
			  'attributes' => [
				  'fields' => [ 'type' => 'string' ],
				  'labels' => [ 'type' => 'string' ],

			  ]
			]

		);
		oik_blocks_maybe_register_block_type( "oik-block/address",
			[ 'render_callback' => 'oik_blocks_dynamic_block_address',
			  'attributes' => [
			  	'tag' => [ 'type' => 'string']
			  ]
			]

		);
		oik_blocks_maybe_register_block_type( "oik-block/person",
			[ 'render_callback' => 'oik_blocks_dynamic_block_person',
			  'attributes' => [
				  'user' => [ 'type' => 'string'],
				  'fields' => ['type' => 'string', 'default' => 'gravatar/about,bio,follow_me'],
				  'className' => [ 'type' => 'string'],
				  'theme' => ['type' => 'string']
			  ]
			]

		);

		oik_blocks_maybe_register_block_type( 'oik/content-block',
				[
					'render_callback' => 'oik_blocks_dynamic_block_content_block'
					//, 'editor_script' =>'oik-blocks-js'
					//, 'editor_style'  =>'oik-blocks-css'
					//, 'style'         =>'oik-blocks-css'
					//, 'script'        => null
					, 'attributes'    =>
						[ 'shortcode' => [ 'type'=>'string' ]
						, 'content' => [ 'type' => 'string ']
						, 'parameters' => [ 'type' => 'string']
						, 'post_type' => ['type' => 'string']
						, 'post_parent' => ['type' => 'string']
						, 'numberposts' => ['type' => 'integer']
						, 'orderby' => [ 'type' => 'string' ]
						, 'order' => [ 'type' => 'string' ]
						, 'align' => [ 'type' => 'string']
						, 'format' => ['type' => 'string']
						]
				] );

	}
}

function oik_blocks_maybe_register_block_type( $name, $args ) {
	if ( ! WP_Block_Type_Registry::get_instance()->is_registered( $name ) ) {
		register_block_type( $name, $args );
	}
}

function oik_blocks_register_block_patterns() {
	if ( false ) {
		oik_require( 'patterns/index.php', 'oik-blocks' );
		oik_blocks_lazy_register_block_patterns();
	}
}


/**
 * Registers the scripts we'll need	 for the editor
 * 
 * Not sure why we'll need Gutenberg scripts for the front-end.
 * But we might need Javascript stuff for some things, so these can be registered here.
 *
 * Dependencies were initially 
 * `[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api' ]`
 *
 * why do we need the dependencies?
 */
function oik_blocks_register_editor_scripts() {
	bw_trace2();
	bw_backtrace();
	
	$scripts = array( 'oik_blocks-blocks-js' => 'blocks/build/js/editor.blocks.js' 
									, 'oik_blocks-dummy-js' => '/blocks/build/js/dummy.blocks.js'
									);
	foreach ( $scripts as $name => $blockPath ) {
		wp_register_script( $name,
			plugins_url( $blockPath, __FILE__ ),
			// [],
			[ 'wp-blocks', 'wp-element', 'wp-components', 'wp-editor', 'wp-i18n', 'wp-data' ],
			filemtime( plugin_dir_path(__FILE__) . $blockPath )
		);
        wp_set_script_translations( $name, 'oik-block' );
	}
	
}

/**
 * Implements 'plugins_loaded' action for oik-blocks
 * 
 * Prepares use of shared libraries if this has not already been done.
 */
function oik_blocks_plugins_loaded() {
	oik_blocks_boot_libs();
	oik_require_lib( "bwtrace" );
}

/**
 * Boot up process for shared libraries
 * 
 * ... if not already performed
 */
function oik_blocks_boot_libs() {
	if ( !function_exists( "oik_require" ) ) {
		$oik_boot_file = __DIR__ . "/libs/oik_boot.php";
		$loaded = include_once( $oik_boot_file );
	}
	oik_lib_fallback( __DIR__ . "/libs" );
}

oik_blocks_loaded();





