/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    "map": {
        '*': {
			'catalogAddToCart': 'Rokanthemes_RokanBase/js/catalog-add-to-cart',
			'Magento_Catalog/js/catalog-add-to-cart': 'Rokanthemes_RokanBase/js/catalog-add-to-cart'
        },
    },
	"shim": {
		"rokanthemes/owl": ["jquery"],
		"rokanthemes/elevatezoom": ["jquery"],
		"rokanthemes/choose": ["jquery"],
		"rokanthemes/fancybox": ["jquery"],
		"rokanthemes/lazyloadimg": ["jquery"],
        "blueskytechco/photoswipe": ["jquery"],
        "blueskytechco/photoswipe_ui": ["jquery"]
	},
	'paths': {
		'rokanthemes/fancybox': 'Rokanthemes_RokanBase/js/jquery_fancybox',
        "rokanthemes/owl": "Rokanthemes_RokanBase/js/owl_carousel",
		"rokanthemes/elevatezoom": "Rokanthemes_RokanBase/js/jquery.elevatezoom",
		"rokanthemes/choose": "Rokanthemes_RokanBase/js/jquery_choose",
        "rokanthemes/equalheight": "Rokanthemes_RokanBase/js/equalheight",
		'rokanthemes/lazyloadimg': 'Rokanthemes_RokanBase/js/jquery.lazyload.min',
        "blueskytechco/photoswipe": "Rokanthemes_RokanBase/js/photoswipe.min",
        "blueskytechco/photoswipe_ui": "Rokanthemes_RokanBase/js/photoswipe-ui-default.min"
    },
	"deps": ['rokanthemes/theme']
};
