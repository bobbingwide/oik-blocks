=== oik-blocks ===
Contributors: bobbingwide
Donate link: https://www.oik-plugins.com/oik/oik-donate/
Tags: gutenberg, shortcode, blocks, oik
Requires at least: 5.5.1
Tested up to: 5.7
Gutenberg compatible: Yes
Stable tag: 0.5.0
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

== Description ==
WordPress blocks, aka Gutenberg blocks, for oik shortcodes.

This is mostly prototype code delivering a number of the oik shortcodes
as blocks for the new WordPress content editor.

oik delivers over 80 shortcodes.
Some of these are crying out to be converted into advanced WordPress blocks.

oik-blocks provides 20 blocks

- Address
- Block icon
- Block info
- Block list
- Contact form
- Countdown
- CSS
- CSV
- Dash icon
- Fields
- Follow me
- GeSHi
- GitHub Issue
- Google Maps
- Nivo slider
- Person
- Search
- Prototype Generic shortcode block (undocumented on oik-plugins.com )
- UK tides
- WordPress version


For more info on the blocks included in the plugin see:

[blocks readme](https://github.com/bobbingwide/oik-blocks/tree/master/blocks)


This is just the start. 

This plugin is currently being used for education, demonstration, experimentation and estimation.

The code is being developed to work with latest version of the Gutenberg plugin and/or the latest build of WordPress 5.0.

We'll refer to Gutenberg as the new editor.
And each block will be called a block.


The oik-block plugin, from which this plugin was forked, includes logic to evaluate Gutenberg's compatibility with site contents.
It forms opinions at multiple levels and applies these to decide which editor is the safest to use for the content and context.



== Installation ==
1. Upload the contents of the oik-blocks plugin to the `/wp-content/plugins/oik-blocks' directory
1. Activate the oik-blocks plugin through the 'Plugins' menu in WordPress

== Frequently Asked Questions ==

Where can I find out more?

[github bobbingwide oik-blocks ]


Yes, it uses a number of other plugins:

- oik 
- oik-bob-bing-wide
- gutenberg and / or WordPress 5.0
- oik-nivo-slider
- oik-css
- uk-tides

== Screenshots ==
1. oik-blocks's address block

== Upgrade Notice ==
= 0.5.0 = 
Update for block icon style support.

= 0.4.2 = 
Update for Styles for the block icon block.

= 0.4.1 =
Contains a fix to enqueue dashicons CSS needed for block icon, block info and block list blocks in the front end.

= 0.4.0 =
Upgrade for support of block variations.

= 0.4.0-RC1 =
Upgrade for an improved blockicon and blocklist blocks. Needed for Single Block (SB) plugins.

= 0.4.0-beta-20200209 =
Upgrade for Dynamic content block oik/content-block

= 0.4.0-beta-20200108 = 
Version for bobbingwide.com/problem-solving

= 0.4.0-alpha-20190604 = 
Update for corrections to the Block list block's links 

= 0.4.0-alpha-20190531 =
Update for improvements to the Block list block help with creating / updating block CPTs on blocks.wp-a2z.org 

= 0.4.0-alpha-20190516
Needed for "My Favourite Block - Annotated" on herbmiller.me

= 0.3.0 =
Upgrade for Block list Show batch commands option to help autogenerate block CPTs for a component.

= 0.2.1 =
Upgrade for the Block list block to display all the blocks in a selected namespace. 

= 0.2.0 =
Upgrade for the Block info block to replace the Block icon block in the Block catalogs.

= 0.1.0-alpha-20190115 =
Upgrade for the Block icon and Dash icon blocks; needed for WP-a2z and oik-plugins

= 0.1.0-alpha-20190105 = 
Upgrade for minor improvements to the Fields block and the Address block 

= 0.1.0-alpha-20190102 =
Upgrade for new blocks and a fix for failures when WordPress SEO is active. 

= 0.1.0-alpha-20181213 = 
Upgrade for the new WordPress and GeSHi server side rendered blocks. No longer requires Gutenberg under WordPress 5.0 

= 0.1.0-alpha-20181128 = 
Contains Gutenberg blocks only. Install oik-block for gut feel opinions. 

= 0.0.0-alpha-20181125 =
No longer displays the Preferred editor meta box 

= 0.0.0-alpha-20181120 =
Forked from oik-block which will now only implement opinions.

== Changelog ==
= 0.5.0 = 
* Changed: Set styles for different sizes of dashicons in blockicon and blockinfo,[github bobbingwide oik-blocks issues 42]
* Changed: Update libs to latest versions for PHP 8.0
* Fixed: Check plugin is activated before loading a specific file in oik_blocks_check_server_func,[github bobbingwide oik-blocks issues 43]
* Tested: With WordPress 5.7 and WordPress Multi Site
* Tested: With Gutenberg 10.2.1
* Tested: With PHP 8.0

= 0.4.2 = 
* Added: Added styles for the block icon block ( oik-blocks/blockicon ),[github bobbingwide oik-blocks issues 42]
* Tested: With WordPress 5.6-beta1 and WordPress Multi Site
* Tested: With Gutenberg 9.2.1
* Tested: With PHP 7.4
 
= 0.4.1 = 
* Fixed: Enqueue dashicons CSS in the front end,[github bobbingwide oik-blocks issues 41]

= 0.4.0 =
* Changed: Add support for block variations to blockicon, blockinfo and blocklist,[github bobbingwide oik-blocks issues 39]
* Tested: With WordPress 5.5.1 and WordPress Multi Site
* Tested: With Gutenberg 9.1.0
* Tested: With PHP 7.4

= 0.4.0-RC1 = 
* Changed: Improve the Block info block to display a single block using same format as block list,[github bobbingwide oik-blocks issues 38]
* Changed: Start making use of the SelectTextControlCombo block for formats and orderby attributes,[github bobbingwide oik-blocks issues 37]
* Changed: Support the bw_pages shortcode format= parameter, [github bobbingwide oik-blocks issues 34]
* Changed: Output Select a Display type when shortcode not chosen.,[github bobbingwide oik-blocks issues 36] 
* Changed: Improve advanced parameter override capability -  for bw_pages [github bobbingwide oik-blocks issues 34]
* Changed: Improve Dynamic content block for Attachments, Images and PDF,[github bobbingwide oik-blocks issues 34]
* Changed: Display block count in both style batch lists. Show if block is ' (Not insertable)', [github bobbingwide oik-blocks issues 27]

= 0.4.0-beta-20200209 =
* Added: Add Dynamic content block oik/content-block,[github bobbingwide oik-blocks issues 34]
* Changed: Add transforms for [bw_csv] to oik-block/csv,[github bobbingwide oik-blocks issues 2]
* Changed: Adjust CSS for blockicon svgnn class,[github bobbingwide oik-blocks issues 31]
* Changed: Avoid messages along the lines of Warning: Each child in a list should have a unique key prop,[github bobbingwide oik-blocks issues 24]
* Changed: Avoid messages along the lines of Warning: Each child in a list should have a unique key prop,[github bobbingwide oik-blocks issues 27]
* Changed: No longer need to enqueue block editor stylesheets dependent upon wp-blocks,[github bobbingwide oik-blocks issues 33]
* Changed: Various code tidying changes

= 0.4.0-beta-20200108 = 
Lots of changes I'll write about later. Well... sometime

= 0.4.0-alpha-20190604 = 
* Fixed: Correct Block list block links,[github bobbingwide oik-blocks issue 27]

= 0.4.0-alpha-20190531 =
* Changed: Eliminate unwanted white space in the Block Info's optional divs: title, description, category and keywords [github bobbingwide oik-blocks issue 24]
* Changed: Add logic to create/update a block CPT using an AJAX request to oik-shortcodes [github bobbingwide oik-blocks issue 27] 
* Tested: With WordPress 5.2.1 and WordPress Multi Site
* Tested: With Gutenberg 5.8.0 

= 0.4.0-alpha-20190516 = 
* Changed: Improve CSV block with table heading toggle, [github bobbingwide oik-blocks issue 2]
* Changed: Improve GitHub block. Owner and Repository fields, [github bobbingwide oik-blocks issue 4]
* Changed: Improve Person block. [github bobbingwide oik-blocks issue 6]
* Fixed: Change tidetimes.org.uk URL to have www. prefix, [github bobbingwide oik-blocks issues 19]
* Changed: Improve Blockicon block. Ssupport Additional CSS svg100 and svg150, [github bobbingwide oik-blocks issue 24]
* Fixed: Import ServerSideRender from wp.editor not wp.components
* Changed: Change Follow me defaults and put each TextField in a PanelRow
* Changed: Allow for unregistered blocks in Blockinfo, [github bobbingwide oik-blocks issues 27]

= 0.3.0 =
* Added: Block list Show batch commands toggle,[github bobbingwide oik-blocks issues 27]
* Changed: Add logic to support shortcode expansion in CSV block server side rendering, [github bobbingwide oik-blocks issue 2]
* Changed: Improve logic for selecting format using tool icons and a select list. Add support for Description list - including a hand crafted icon.,[github bobbingwide oik-blocks issue 2]
* Changed: Change CSS block to server side rendered,github bobbingwide oik-blocks issue 13]
* Fixed: Correct robustness checking for CSV block

= 0.2.1 =
* Added: Block list block, [github bobbingwide oik issues 27]
* Changed: Improved robustness of CSS and CSV blocks which depend on other plugins 

= 0.2.0 =
* Changed: No longer an Alpha version even though many blocks need improvements
* Added: Block info block, which displays the Block icon and some more information [github bobbingwide oik-blocks issues 24]
* Added: Screenshots for blocks.
* Tested: With WordPress 5.0.3
* Tested: With Gutenberg 4.9.0
* Tested: With PHP 7.2

= 0.1.0-alpha-20190115 =
* Added: Block icon block. [github bobbingwide oik-blocks issue 24]
* Added: Dash icon block. [github bobbingwide oik-blocks issue 22]
* Tested: With WordPress 5.0.3
* Tested: With Gutenberg 4.8.0

= 0.1.0-alpha-20190105 = 
* Changed: Change Address block to server side rendered., [github bobbingwide oik-blocks issue 5]
* Changed: Fields block - ensure shortcode fields are expanded, [github bobbingwide oik-blocks issue 21]

= 0.1.0-alpha-20190102 =
* Added: Fields block [github bobbingwide oik-blocks issue 21]
* Added: UK tides block [github bobbingwide oik-blocks issue 19]
* Added: Search block [github bobbingwide oik-blocks issue 20]
* Fixed: Don't crash when classic-editor parameter detected during 'enqueue_block_editor_assets' action [github bobbingwide oik-blocks issue 15]
* Tested: With Gutenberg 4.7.1
* Tested: With WordPress 5.0.2
* Tested: With PHP 7.2

= 0.1.0-alpha-20181213 = 
* Added: GeSHi block, [github bobbingwide oik-blocks issue 18]
* Added: WordPress server rendered dynamic block, [github bobbingwide oik-blocks issue 16]
* Fixed: Corrected oik-follow-block for Gutenberg 4.6, [github bobbingwide oik-blocks issue 8]
* Fixed: removed doing_filter( 'editor_replace' ) test, [github bobbingwide oik-blocks issue 15]
* Tested: With Gutenberg 4.7
* Tested: With WordPress 5.0.1 
* Tested: With PHP 7.2

= 0.1.0-alpha-20181128 = 
* Deleted: Logic only required in oik-block [github bobbingwide oik-blocks issues 1]
* Deleted: Opinions folder [github bobbingwide oik-blocks issues 1]
* Deleted: Shortcodes only required in oik-block [github bobbingwide oik-blocks issues 1]
* Tested: With Gutenberg 4.5.1 
* Tested: With WordPress 5.0-RC1
* Tested: With PHP 7.1 and PHP 7.2

= 0.0.0-alpha-20181125 =
* Deleted: Remove preferred editor, opinions and other stuff that'll remain in oik-block [github bobbingwide oik-blocks issues 1]
* Changed: Updated banner and icon assets to oik-blocks

= 0.0.0-alpha-20181120 =
* Added: New plugin for oik-blocks only, cloned from oik-block
* Changed: oik-block to oik-blocks, and other variations
* Deleted: Removed opinion logic
* Tested: With Gutenberg 4.4.0
* Tested: With PHP 7.1 and 7.2
* Tested: With WordPress 4.9.8 and WordPress 5.0-beta5

== Further reading ==
If you want to read more about the oik plugins then please visit the
[oik plugin](https://www.oik-plugins.com/oik) 
**"the oik plugin - for often included key-information"**

