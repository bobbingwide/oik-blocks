=== oik-blocks ===
Contributors: bobbingwide
Donate link: https://www.oik-plugins.com/oik/oik-donate/
Tags: gutenberg, shortcode, blocks, oik
Requires at least: 4.9.8
Tested up to: 5.0.3
Gutenberg compatible: Yes
Stable tag: 0.2.0
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

== Description ==
WordPress 5.0 blocks, aka Gutenberg blocks, for oik shortcodes.

This is mostly prototype code delivering a number of the oik shortcodes
as blocks for the new WordPress content editor.

oik delivers over 80 shortcodes.
Some of these are crying out to be converted into advanced WordPress blocks.

oik-blocks provides 19 blocks

- Address
- Block icon
- Block info
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

