=== oik-blocks ===
Contributors: bobbingwide
Donate link: https://www.oik-plugins.com/oik/oik-donate/
Tags: gutenberg, shortcode, blocks, oik
Requires at least: 5.5.1
Tested up to: 6.7.1
Gutenberg compatible: Yes
Stable tag: 1.4.4
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

== Description ==
WordPress blocks, aka Gutenberg blocks, for oik shortcodes.

The blocks in this plugin are a mixture of 
- prototype blocks to replace oik-shortcodes
- and blocks to help document WordPress blocks.
 
oik-blocks provides 6 blocks

- Block icon
- Block info
- Block list
- Fields
- Nivo slider
- Person

v0.6.0 delivered other blocks. Each of these blocks have been implemented in other plugins
so have been deleted from this plugin.

- Address
- Contact form
- Countdown
- CSS
- CSV
- Dash icon
- Dynamic content
- Follow me
- GeSHi
- GitHub Issue
- Google Maps
- Search
- Prototype Generic shortcode block (undocumented on oik-plugins.com )
- UK tides
- WordPress version

For more info on the blocks included in the plugin see:

[blocks readme](https://github.com/bobbingwide/oik-blocks/tree/master/src)



== Installation ==
1. Upload the contents of the oik-blocks plugin to the `/wp-content/plugins/oik-blocks' directory
1. Activate the oik-blocks plugin through the 'Plugins' menu in WordPress

== Frequently Asked Questions ==

Where can I find out more?

[github bobbingwide oik-blocks ]


Yes, it uses a number of other plugins:

- oik 
- oik-fields
- Gutenberg and / or WordPress 5.0 or above
- oik-nivo-slider
- oik-user

== Screenshots ==
1. to be completed

== Upgrade Notice ==
= 1.4.4 =
Now delivers each block individually. No longer delivers the Nivo block ( oik-block/nivo )

== Changelog ==
= 1.4.4 = 
* Changed: Set id=. before calling bw_metadata #67
* Changed: Multiple entry points for blocks. No longer build nivo #66
* Changed: Register blocks from build #66 
* Changed: blocklist/blockinfo - Correct the URL update #66 
* Changed: Use clsx instead of classnames. Deliver multiple entry points. Update to apiversion: 3 #66
* Changed: Update wp-scripts to v30.9.0, add clsx package #66
* Changed: Reconcile bobbfunc shared library
* Tested: With WordPress 6.7.1 and WordPress Multisite
* Tested: With Gutenberg 19.7.0
* Tested: With PHP 8.3

== Further reading ==
If you want to read more about the oik plugins then please visit the
[oik plugin](https://www.oik-plugins.com/oik) 
**"the oik plugin - for often included key-information"**