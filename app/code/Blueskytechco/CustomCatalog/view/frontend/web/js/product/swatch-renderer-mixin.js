define([
    'jquery',
    'slick'
], function ($) {
    'use strict';

    return function (widget) {

        $.widget('mage.SwatchRenderer', widget, {
            _OnClick: function ($this, $widget) {
                var $parent = $this.parents('.' + $widget.options.classes.attributeClass),
                    $wrapper = $this.parents('.' + $widget.options.classes.attributeOptionsWrapper),
                    $label = $parent.find('.' + $widget.options.classes.attributeSelectedOptionLabelClass),
                    attributeId = $parent.data('attribute-id'),
                    $input = $parent.find('.' + $widget.options.classes.attributeInput),
                    checkAdditionalData = JSON.parse(this.options.jsonSwatchConfig[attributeId]['additional_data']),
                    $priceBox = $widget.element.parents($widget.options.selectorProduct)
                        .find(this.options.selectorProductPrice);
    
                if ($widget.inProductList) {
                    $input = $widget.productForm.find(
                        '.' + $widget.options.classes.attributeInput + '[name="super_attribute[' + attributeId + ']"]'
                    );
                }
    
                if ($this.hasClass('disabled')) {
                    return;
                }
    
                if ($this.hasClass('selected')) {
                    $parent.removeAttr('data-option-selected').find('.selected').removeClass('selected');
                    $input.val('');
                    $label.text('');
                    $this.attr('aria-checked', false);
                } else {
                    $parent.attr('data-option-selected', $this.data('option-id')).find('.selected').removeClass('selected');
                    $label.text($this.data('option-label'));
                    $input.val($this.data('option-id'));
                    $input.attr('data-attr-name', this._getAttributeCodeById(attributeId));
                    $this.addClass('selected');
                    $widget._toggleCheckedAttributes($this, $wrapper);
                }
    
                $widget._Rebuild();
    
                if ($priceBox.is(':data(mage-priceBox)')) {
                    $widget._UpdatePrice();
                }
    
                $(document).trigger('updateMsrpPriceBlock',
                    [
                        this._getSelectedOptionPriceIndex(),
                        $widget.options.jsonConfig.optionPrices,
                        $priceBox
                    ]);
    
                if (parseInt(checkAdditionalData['update_product_preview_image'], 10) === 1) {
                    $widget._loadMedia();
                        var images = this.options.jsonConfig.images[this.getProduct()];
                        var images_ar = this._sortImages(images);
                        var images_html = '',images_thumb = '',option_id = $this.data('option-id');
                        var images_opstion = option_id+'-'+attributeId;
                        var $productGallery = $('.gallery-images'),
                            gallery = $productGallery.find('.gallery-img'),
                            width = gallery.attr('data-width'),
                            height = gallery.attr('data-height');
                    if (images_ar.length) {
                        images_ar.forEach(function(item) {
                            if (item.img) {
                                images_html += '<div class="product-image '+images_opstion+' '+images_opstion+'-'+item.position+'">'+
                                    '<div class="gallery-img" data-width="'+width+'" data-height="'+height+'"'+
                                        'data-mdid="'+images_opstion+'-'+item.position+'" data-src="'+item.img+'"'+
                                        'data-bgset="'+item.img+'">'+
                                        '<img class="product-image" src="'+item.img+'" alt="">'+
                                    '</div>'+
                                '</div>';
                                images_thumb += '<div class="product-image '+images_opstion+' '+images_opstion+'-'+item.position+'">'+
                                    '<div class="gallery-img" data-width="" data-height="" data-mdid="'+images_opstion+'-'+item.position+'" data-src="'+item.thumb+'">'+
                                        '<img class="product-image" src="'+item.thumb+'" alt="">'+
                                    '</div>'+
                                '</div>';
                            }
                        });
                        if (!$('.product-image').hasClass(images_opstion)) {
                            var el = $('.gallery-images'),option_slick = el.attr("data-slick");
                            if (el.hasClass('slick-initialized')) {
                                el.slick('unslick');    
                            }
                            el.append(images_html);
                            setTimeout(function() {
                                el.slick(JSON.parse(option_slick));
                            }, 10);
                        }
                        setTimeout(function() {
                            if ($('.gallery-images').hasClass('slick-initialized')) {
                                $('.gallery-images').find('.slick-slide').removeClass('is-selected');
                                $('.p-thumb-nav').find('.slick-slide').removeClass('is-selected');
                                var nextSlide = $('.p-thumb-nav').find('.product-image.'+images_opstion+'').closest('.slick-slide').attr('data-slick-index');
                                $('.p-thumb-nav').slick('slickGoTo', nextSlide);
                                $('.gallery-images').slick('slickGoTo', nextSlide);
                                $('.p-thumb-nav').find('.slick-slide[data-slick-index="'+nextSlide+'"]').addClass('is-selected');
                            }
                        }, 500);
                        
                    }
                }
                $input.trigger('change');
            }
        });

        return $.mage.SwatchRenderer;
    }
});