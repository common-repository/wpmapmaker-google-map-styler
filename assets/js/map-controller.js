jQuery(document).ready(function(){
	jQuery('.pdme-color-picker').iris({
		hide: true,
    	palettes: false,
    	change: function(event, ui) {
    		if( event.originalEvent.type == 'square' || event.originalEvent.type == 'strip' ){			
		        var visibility = jQuery('.pdma-styler-nav-visibility li.pdma-active a').data('visibility');
				PDMA_Functions.pdma_attach_dom_obj(visibility);
    		}
	    }
	});

	jQuery('.pdme-feature-type-nav li a').on('click', function(e){
		e.preventDefault();
		jQuery(this).parent('li').addClass('pdma-active');
		jQuery(this).parent('li').siblings().removeClass('pdma-active');
		jQuery(this).parents('.pdme-feature-type-nav-container').next('.pdme-element-type-nav-container').removeClass('pdme-none');

		// Reinitialize Element Nav
		PDMA_Functions.pdma_reset_element_nav();
		PDMA_Functions.pdma_set_element_nav();

		// Reinitialize Styling Nav
		PDMA_Functions.pdma_reset_style_nav();

	});

	jQuery('.pdme-element-type-nav li a').on('click', function(e){
		e.preventDefault();
		var element_type = jQuery(this).data('element-type');
		jQuery(this).parent('li').addClass('pdma-active');
		jQuery(this).parent('li').siblings().removeClass('pdma-active');
		jQuery(this).parents('.pdme-element-type-nav-container').next('.pdme-style-type-nav-container').removeClass('pdme-none');

		// Reinitialize Styling nav
		PDMA_Functions.pdma_reset_style_nav();

		PDMA_Functions.pdma_set_style_nav( element_type );
	});

	jQuery('.pdma-styler-nav-visibility li a').on('click', function(e){
		e.preventDefault();
		var visibility = jQuery(this).data('visibility');
		jQuery(this).parent('li').addClass('pdma-active');
		jQuery(this).parent('li').siblings().removeClass('pdma-active');

		PDMA_Functions.pdma_attach_dom_obj(visibility);
	});

	jQuery('.pdme-use-color').on('change', function(){
		var visibility = jQuery('.pdma-styler-nav-visibility li.pdma-active a').data('visibility');
		PDMA_Functions.pdma_attach_dom_obj(visibility);
	});


	jQuery('.pdme-apply-button').on('click', function(e){
		e.preventDefault();
		PDMA_Functions.set_map_style();
	});
	jQuery('.pdme-view-code-button').on('click', function(e){
		e.preventDefault();
		PDMA_Functions.view_code_popup();
	});

	jQuery('.pdme-overlay').on('click',function(){
		var _this = jQuery(this);
		jQuery('.pdme-view-code-popup').animate({
			top: "100%"
		}, 200, 'swing', function(){
			_this.addClass('pdme-none');
		});
	});
	jQuery('.pdme-view-code-wrap').on('click',function(){
		var _this = jQuery('.pdme-overlay');
		jQuery('.pdme-view-code-popup').animate({
			top: "100%"
		}, 200, 'swing', function(){
			_this.addClass('pdme-none');
		});
	});
	jQuery('.pdme-view-code').on('click', function(e){
		e.stopPropagation();
	});
	
});