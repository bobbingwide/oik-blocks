<?php
/**
 * Plugin Name: oik-blocks
 * Plugin URI: https://www.oik-plugins.com/oik-plugins/oik-blocks
 * Description: WordPress blocks, aka Gutenberg blocks, for oik shortcodes.
 * Author: Herb Miller
 * Author URI: https://bobbingwide.com/about-bobbing-wide
 * Version: 1.4.4
 * License: GPL3+
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: oik-blocks
 * Domain Path: /languages/
 *
 * @package oik-blocks
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

function oik_blocks_frontend_styles() {
    /**
     * The following blocks may want to display icons that ( still ) come from dashicons,
     * which is no longer automatically enqueued in the front end.
     *
     * - oik-block/blockicon
     * - oik-block/blockinfo
     * - oik-block/blocklist
     */
    //wp_enqueue_style( 'dashicons');
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
		$attributes['id'] = '.';
		bw_trace2( $attributes, 'attributes', false );
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

	if( $html === null ) {
	    $html = $fields;
    }

	return $html;
}

function oik_blocks_fields_featured_image_not_set() {
	return;
}

/**
 * Server side rendering the Person block
 */
function oik_blocks_dynamic_block_person( $attributes ) {
	$html = oik_blocks_check_server_func( null, "oik-user", "oiku_loaded");
	if ( null === $html ) {
		$html = oik_blocks_check_server_func( "shortcodes/oik-user.php", "oik-user", "oiku_user" );
	}
	if ( null === $html ) {
		$attributes['class'] = bw_array_get( $attributes, 'className', null);
		$html = oiku_user( $attributes, null, null );
		$html = oik_blocks_server_side_wrapper( $attributes, $html );
	}
	return $html;
}

/**
 * Implements wrapper for Server Side Rendered blocks.
 *
 * @param $attributes
 * @param $html
 * @return string
 */
function oik_blocks_server_side_wrapper( $attributes, $html ) {
	$align_class_name=empty( $attributes['textAlign'] ) ? '' : "has-text-align-{$attributes['textAlign']}";
	$extra_attributes  =[ 'class'=>$align_class_name ];
	$wrapper_attributes = get_block_wrapper_attributes( $extra_attributes );

	$html=sprintf(
		'<div %1$s>%2$s</div>',
		$wrapper_attributes,
		$html
	);

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

	if ( !function_exists( 'is_plugin_active') ) {
		require_once ABSPATH . 'wp-admin/includes/admin.php';
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
	add_action('enqueue_block_assets', 'oik_blocks_frontend_styles');
	add_action( "oik_loaded", "oik_blocks_oik_loaded" );
	//add_action( "plugins_loaded", "oik_blocks_plugins_loaded", 100 );
	add_action( "init", "oik_blocks_register_dynamic_blocks" );
	add_action( 'init', 'oik_blocks_register_block_patterns' );
	//add_action( 'init', 'oik_blocks_prevent_nav_link_variations', 19 );
	add_action( "oik_pre_theme_field", "oik_blocks_pre_theme_field" );
	add_filter( 'block_type_metadata_settings', 'oik_blocks_block_type_metadata_settings', 10, 2 );
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
        oik_blocks_plugins_loaded();
    }
    add_filter( 'block_type_metadata', 'oik_blocks_block_type_metadata', 10 );

    $args = [ 'render_callback' => 'oik_blocks_dynamic_block_blockicon'];
	$registered = register_block_type_from_metadata( __DIR__ .'/build/oik-blockicon', $args );
	bw_trace2( $registered, "registered");
	$args = [ 'render_callback' => 'oik_blocks_dynamic_block_blockinfo'];
	$registered = register_block_type_from_metadata( __DIR__ .'/build/oik-blockinfo', $args );
    $args = [ 'render_callback' => 'oik_blocks_dynamic_block_blocklist'];
	$registered = register_block_type_from_metadata( __DIR__ .'/build/oik-blocklist', $args );
	$args = [ 'render_callback' => 'oik_blocks_dynamic_block_fields' ];
	$registered = register_block_type_from_metadata( __DIR__ .'/build/oik-fields', $args );
	//$registered = register_block_type_from_metadata( __DIR__ .'/src/oik-nivo' );
	$args = [ 'render_callback' => 'oik_blocks_dynamic_block_person' ];
	$registered = register_block_type_from_metadata( __DIR__ .'/build/oik-person', $args );

    /**
     * Localise the script by loading the required strings for the build/index.js file
     * from the locale specific .json file in the languages folder.
     */
    $ok = wp_set_script_translations( 'oik-block-blockicon-editor-script', 'oik-blocks' , __DIR__ .'/languages' );
    //bw_trace2( $ok, "OK?");
    add_filter( 'load_script_textdomain_relative_path', 'oik_blocks_load_script_textdomain_relative_path', 10, 2);
}

/**
 * Implements block_type_metadata filter to set the textdomain if not set.
 *
 * Note: $metadata['name'] will be set for each block.
 *
 * @param $metadata
 * @return mixed
 */
function oik_blocks_block_type_metadata( $metadata ) {
    if ( !isset( $metadata['textdomain']) ) {
        $name = $metadata['name'];
        $name_parts = explode( '/', $name );
        $textdomain = $name_parts[0];
        if ( 'oik-block' === $textdomain ) {
            $textdomain = 'oik-blocks';
            $metadata['textdomain'] = $textdomain;
        }

    }
    return $metadata;
}

function oik_blocks_block_type_metadata_settings( $settings, $metadata ) {
	if ( 'core/navigation-link' === $metadata['name'] ) {
		//print_r( $settings );
		//print_r( $metadata);
		bw_trace2();
	}
	return $settings;
}

/**
 * Filters $relative so that md5's match what's expected.
 *
 * Depending on how it was built the `build/index.js` may be preceded by `./` or `src/block-name/../../`.
 * In either of these situations we want the $relative value to be returned as `build/index.js`.
 * This then produces the correct md5 value and the .json file is found.
 *
 * @param $relative
 * @param $src
 *
 * @return mixed
 */
function oik_blocks_load_script_textdomain_relative_path( $relative, $src ) {
    if ( false !== strrpos( $relative, './build/index.js' )) {
        $relative = 'build/index.js';
    }
    //bw_trace2( $relative, "relative");
    return $relative;
}

/**
 * Server rendering dynamic blockicon block
 *
 * Attempts to find the SVG equivalent of any dashicon.
 * - Find which block's icon is needed
 * - Checks the block's registration
 * - If it's registered then get the dashicon name
 * - And get the dashicon SVG to replace the dashicon HTML.
 *
 * Enqueues dashicons if it's necessary.
 *  * ```
 * <div class="wp-block-oik-block-blockicon"><div><span class="dashicon dashicons dashicons-building"></span></div></div>
 * ```
 *
 * @param array $attributes
 * @return string generated HTML
 */
function oik_blocks_dynamic_block_blockicon( $attributes, $content, $block ) {
	//bw_trace2();
	if ( strpos( $content, 'dashicons-' ) ) {
		$blockicon = $attributes['blockicon'];
		//echo $blockicon;
		$registration = WP_Block_Type_Registry::get_instance()->get_registered( $blockicon );
		if ( $registration ) {
			$icon=$registration->icon;
			$html=\oik\oik_blocks\oik_blocks_check_server_func( "shortcodes/oik-dash.php", "oik-bob-bing-wide", "bw_dash" );
			if ( ! $html ) {
				$attributes=[ 'icon'=>$icon ];
				$html      =bw_dash( $attributes, null, null );
				$html      =oik_bob_bing_wide_server_side_wrapper( $attributes, $html );
				$content   =$html;
				return $content;
			}
		}
		wp_enqueue_style( 'dashicons' );
	}

    return $content;
}

/**
 * Server rendering for oik-block/blockinfo.
 *
 * If there's a dashicon we need to enqueue dashicons.
 *
 * @param $attributes
 * @param $content
 * @param $block
 *
 * @return mixed
 */
function oik_blocks_dynamic_block_blockinfo( $attributes, $content, $block ) {
    if ( strpos( $content, 'dashicons-' ) ) {
        wp_enqueue_style( 'dashicons' );
    }
    return $content;
}

/**
 * Server rendering for oik-block/blocklist.
 *
 * If there's a dashicon we need to enqueue dashicons.
 *
 * I was going to use this function to render extra content when determineUpdates is true.
 * This logic is actually implemented in oik-shortcodes; it hooks into `render_block_oik-block/blocklist`
 *
 * @param $attributes
 * @param $content
 * @param $block
 *
 * @return mixed
 */
function oik_blocks_dynamic_block_blocklist( $attributes, $content, $block ) {
	if ( strpos( $content, 'dashicons-' ) ) {
		wp_enqueue_style( 'dashicons' );
	}
	return $content;
}





function oik_blocks_register_block_patterns() {
	if ( false ) {
		oik_require( 'patterns/index.php', 'oik-patterns' );
		oik_blocks_lazy_register_block_patterns();
	}
}

/**
 * Disables the creation of core/navigation-link variations.
 *
 * We hook into init at priority 19 in order to remove action hook that will register the
 * navigation link variations. This is a bit draconian, but an easy first fix to showing too many Link blocks.
 */
function oik_blocks_prevent_nav_link_variations() {
	$removed = remove_action( 'init', 'gutenberg_register_block_core_navigation_link', 20 );
	if ( !$removed ) {
		// That's interesting.
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
	oik_require_lib( "bobbfunc");
	bw_load_plugin_textdomain( "oik-blocks");
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