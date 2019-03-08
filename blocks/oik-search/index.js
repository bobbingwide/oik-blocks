/**
 * Implements Search as a server rendered block
 *
 * Originally intended to uses [bw_search] shortcode from oik-bob-bing-wide plugin
 * but it's much easier to use get_search_form... that's all that [bw_search] does.
 *
 * @copyright (C) Copyright Bobbing Wide 2018
 * @author Herb Miller @bobbingwide
 */
//import './style.scss';
//import './editor.scss';

// Get just the __() localization function from wp.i18n
const { __ } = wp.i18n;
// Get registerBlockType from wp.blocks
const {
    registerBlockType,
} = wp.blocks;
const {
    InspectorControls,
    ServerSideRender
} = wp.editor;

const {
    Toolbar,
    PanelBody,
    PanelRow,
    FormToggle,
    TextControl,

} = wp.components;
const Fragment = wp.element.Fragment;

/**
 * Register the WordPress block
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
    'oik-block/search',
    {
        // Localize title using wp.i18n.__()
        title: __( 'Search' ),

        description: 'Displays a search form',

        // Category Options: common, formatting, layout, widgets, embed
        category: 'widgets',

        // Dashicons Options - https://goo.gl/aTM1DQ
        icon: 'search',

        // Limit to 3 Keywords / Phrases
        keywords: [
            __( 'search' ),
            __( 'oik' ),
            __( 'find'),
        ],

        // Set for each piece of dynamic data used in your block
        attributes: {


        },
        supports: {
            customClassName: false,
            className: false,
            html: false,
        },

        edit: props => {



            return (
                <Fragment>
                <InspectorControls >
                    <PanelBody>
                        <PanelRow>

                        </PanelRow>
                        <PanelRow>

                        </PanelRow>
                        <PanelRow>

                        </PanelRow>
                    </PanelBody>

                </InspectorControls>

                <ServerSideRender
                    block="oik-block/search" attributes={ props.attributes }
                />
            </Fragment>

            );
        },


        save() {
            return null;
        },
    },
);
