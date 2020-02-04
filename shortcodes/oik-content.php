<?php

/**
 * Implements generic dynamic content block for oik shortcodes
 *
 * @param array $attributes including shortcode ( mandatory ) and content ( optional )
 *
 * @return generated HTML
 */
function oik_content_block( $attributes ) {
	bw_trace2();

	$shortcode=bw_array_get( $attributes, "shortcode", null );
	$content  =bw_array_get( $attributes, "content", null );

	$parameters=bw_array_get( $attributes, 'parameters', null );

	unset( $attributes['shortcode'] );
	unset( $attributes['content'] );
	unset( $attributes['parameters'] );

    /**
     * We need to set defaults to the same values as in the browser.
     */
    $attributes = oik_content_block_attributes( $attributes );
	$attributes['post_parent'] = bw_array_get( $attributes, 'post_parent', '0');
	$attributes['orderby'] = bw_array_get( $attributes, 'orderby', 'date');
	$attributes['order'] = bw_array_get( $attributes, 'order', 'desc');


	switch ( $shortcode ) {
	    case 'bw_attachments':
	        if ( $attributes['post_parent'] !== '0') {
                $attributes['post_parent'] = bw_current_post_id();
            }
	    	unset( $attributes['post_type']);
	    	//unset( $attributes['post_parent']);
	    	break;


    }

	$parameters = trim( $parameters );
	if ( $parameters ) {
		$extra_atts=shortcode_parse_atts( $parameters );
		$attributes+=$extra_atts;
	}
	bw_trace2( $attributes, "atts", false );


	//BW_::p( $shortcode );
	///BW_::p( $content );
	///
	do_action( "oik_add_shortcodes" );

	$result=bw_shortcode_event( $attributes, $content, $shortcode );
	if ( null === $result ) {
		$result="<!-- No result for shortcode $shortcode -->";
	}

	return $result;


}

function oik_content_block_attributes( $attributes ) {
	$attributes = \oik\oik_blocks\oik_blocks_attribute_unset_or_trim( $attributes, 'post_parent' );
	return $attributes;
}
