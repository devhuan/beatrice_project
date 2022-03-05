define([
    'jquery',
    'mage/translate',
    'blueskytechco/photoswipe',
    'blueskytechco/photoswipe_ui',
    'slick'
], function ($, $t, PhotoSwipe, PhotoSwipeUI_Default) { 
    'use strict';
    $.widget('mage.customLayout', {
        _create: function () {
            var $this = this;
            $this.productGalleryProduct();
            $this.productImages();
            $this.productTabDetailed();
            $this.productFilter();
        },
        productImages: function () {
            var $self = this;
            $('.show_btn_pr_gallery').on( "click", function() {
                var items = $self.getGalleryItemImages(),index = 0;
                $self.callPhotoSwipe(index, items);
            });
        },
        productGalleryProduct: function () {
            var el = $('.gallery-images'),option_slick = el.attr("data-slick");
            if (!el.length) {
                return false;
            }
            el.not('.slick-initialized').slick(JSON.parse(option_slick));
        },
        callPhotoSwipe: function (index, items) {
            var $pswp = $('.pswp')[0],
            options = {
                history: false,
                focus: false,
                showHideOpacity: true,
                bgOpacity:1,
                index: index,
                shareButtons: [
                    {id: 'facebook', label: $t('Share on Facebook'), url:'https://www.facebook.com/sharer/sharer.php?u={{url}}' },
                    {id: 'twitter', label: $t('Tweet'), url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
                    {id: 'pinterest', label: $t('Pin it'), url:'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}'},
                    {id: 'download', label: $t('Download image'), url:'{{raw_image_url}}', download:true}
                ]
            };
            var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
            gallery.init();
        },
        getGalleryItemImages:function () {
            var items = [],$productGallery = $('.gallery-images'),
                gallery = $productGallery.find('.gallery-img');
                gallery.each(function () {
                if (!$(this).hasClass('gallery-video')) {
                    items.push({
                        src: $(this).attr('data-bgset'),
                        w: $(this).attr('data-width'),
                        h: $(this).attr('data-height')
                    });
                }
            });
            return items;
        },
        productTabDetailed: function () {
            if ($('.product.info.detailed').hasClass('tab-accordions')) {
                $(document).unbind("click").on('click', '.tab-accordions .clicked_accordion .data.title a', function() {
                    if ($(this).closest('.clicked_accordion').hasClass('active')) {
                        $(this).closest('.clicked_accordion').removeClass('active');
                        $(this).closest('.clicked_accordion').find('.data.content').slideUp(300);
                    } else {
                        $(this).closest('.clicked_accordion').addClass('active');
                        $(this).closest('.clicked_accordion').find('.data.content').slideDown(300);
                    }
                });
            }
        },
        productFilter: function () {
            $('.cat_filter').unbind("click").on( "click", function() {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    $('.filter-options').slideUp(300);
                } else {
                    $(this).addClass('active');
                    $('.filter-options').slideDown(300);
                }
            });
        }
    });
    return $.mage.customLayout;
});