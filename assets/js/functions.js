var PDMA_Functions = {
	pdma_reset_element_nav : function(){
		jQuery('.pdme-style-type-nav-container').addClass('pdme-none');
		jQuery('.pdme-element-type-nav li').removeClass('pdma-active');

		jQuery('.pdme-element-type-nav li').removeClass('pdma-marked');
	},
	pdma_set_element_nav : function(){
		var element_geometry_object = {};
		var element_labels_object = {};
		if( jQuery('.pdme-feature-type-nav .pdma-active').attr('data-geometry_object') ){
			var element_geometry_object = JSON.parse(jQuery('.pdme-feature-type-nav .pdma-active').attr('data-geometry_object'));
		}
		if( jQuery('.pdme-feature-type-nav  .pdma-active').attr('data-labels_object') ){
			var element_labels_object = JSON.parse(jQuery('.pdme-feature-type-nav  .pdma-active').attr('data-labels_object'));
		}

		if( element_geometry_object.hasOwnProperty('elementType') && element_geometry_object.elementType === 'geometry' ){
			if( element_geometry_object.hasOwnProperty('stylers') ){
				if( element_geometry_object.stylers.length > 0 ){
					jQuery('.pdme-element-type-nav li a[data-element-type="geometry"]').parent().addClass('pdma-marked');
				}
			}
		}

		if( element_labels_object.hasOwnProperty('elementType') && element_labels_object.elementType === 'labels' ){
			if( element_labels_object.hasOwnProperty('stylers') ){
				if( element_labels_object.stylers.length > 0 ){
					jQuery('.pdme-element-type-nav li a[data-element-type="labels"]').parent().addClass('pdma-marked');
				}
			}
		}
	},
	pdma_reset_style_nav : function(){
		jQuery('.pdma-styler-nav-visibility li').removeClass('pdma-active');
		jQuery('.pdme-use-color').prop('checked', false);
		jQuery('.pdme-color-picker').iris('color', '#ffffff');
	},
	pdma_set_style_nav : function( element_type ){
		var element_object = {};
		if( element_type == 'geometry' && jQuery('.pdme-feature-type-nav .pdma-active').attr('data-geometry_object') ){
			var element_object = JSON.parse(jQuery('.pdme-feature-type-nav .pdma-active').attr('data-geometry_object'));
		}else if( element_type == 'labels' && jQuery('.pdme-feature-type-nav  .pdma-active').attr('data-labels_object') ){
			var element_object = JSON.parse(jQuery('.pdme-feature-type-nav  .pdma-active').attr('data-labels_object'));
		}
		if( element_object != 'undefined' && element_object != '' ){
			if( element_object.hasOwnProperty('stylers') ){
				if( element_object.stylers.length > 0 ){	
					for( var i=0; i < element_object.stylers.length; i++ ){

						if( element_object.stylers[i].hasOwnProperty('visibility') ){
							if( element_object.stylers[i].visibility != '' ){
								switch( element_object.stylers[i].visibility ){
									case 'off':
										jQuery('.pdma-styler-nav-visibility').find('li a[data-visibility="off"]').parent().addClass('pdma-active');
									break;
									case 'simplified':
										jQuery('.pdma-styler-nav-visibility').find('li a[data-visibility="simplified"]').parent().addClass('pdma-active');
									break;
									case 'on':
										jQuery('.pdma-styler-nav-visibility').find('li a[data-visibility="on"]').parent().addClass('pdma-active');
									break;
									default:
										jQuery('.pdma-styler-nav-visibility').find('li:first-child').addClass('pdma-active');
									break;
								}
							}
						}

						if( element_object.stylers[i].hasOwnProperty('color') && element_object.stylers[i].color != '' ){
							jQuery('.pdme-use-color').prop('checked', true);
							jQuery('.pdme-color-picker').iris('color', element_object.stylers[i].color );
						}
					}
				}
			}
		}
	},
	pdma_attach_dom_obj : function(visibility){
		var selected_element = jQuery('.pdme-element-type-nav .pdma-active a').data('element-type');
		var selected_feature = jQuery('.pdme-feature-type-nav .pdma-active a').data('feature-type');
		var use_color = jQuery('.pdme-use-color');
		var selected_color = jQuery('.pdme-color-picker').iris('color');
	
		if( jQuery.inArray( selected_element, [ 'geometry', 'labels' ] )  > -1  ){

			var element_object = {};
	        element_object.stylers = [];
	        var object_type = selected_element;
	        element_object.elementType = selected_element;

	        var feature_type = jQuery('.pdme-feature-type-nav .pdma-active a').data('feature-type');
	        if( feature_type != 'all' ){
	        	element_object.featureType = feature_type;
	        }

	        if( typeof visibility != 'undefined' && visibility != '' ){
	        	element_object.stylers.push({"visibility": visibility});
	        }

	        if( use_color.is(':checked') && selected_color != '' ){
	        	element_object.stylers.push({"color": selected_color});
	        }
	        
			jQuery('.pdme-feature-type-nav .pdma-active').attr('data-'+selected_element+'_object', JSON.stringify(element_object));
		}
	},
	set_map_style: function(){
		var styledJSON = [];
		jQuery('.pdme-feature-type-nav li').each(function(){
			if( jQuery(this).attr('data-geometry_object') ){
				var element_geometry_object = JSON.parse(jQuery(this).attr('data-geometry_object'));
				styledJSON.push(element_geometry_object);
			}
			if( jQuery(this).attr('data-labels_object') ){
				var element_labels_object = JSON.parse(jQuery(this).attr('data-labels_object'));
				styledJSON.push(element_labels_object);
			}
		});
		// jQuery('.pdme-view-code-popup pre').html(styledJSON);
		PDMEinitMap(styledJSON);
	},
	view_code_popup: function(){
		var styledJSON = [];
		jQuery('.pdme-feature-type-nav li').each(function(){
			if( jQuery(this).attr('data-geometry_object') ){
				var element_geometry_object = JSON.parse(jQuery(this).attr('data-geometry_object'));
				styledJSON.push(element_geometry_object);
			}
			if( jQuery(this).attr('data-labels_object') ){
				var element_labels_object = JSON.parse(jQuery(this).attr('data-labels_object'));
				styledJSON.push(element_labels_object);
			}
		});
		jQuery('.pdme-view-code-wrap pre').html(JSON.stringify(styledJSON, null, 2));
		jQuery('.pdme-overlay').removeClass('pdme-none');
		jQuery('.pdme-view-code-popup').show().animate({
			top: '10px'
		}, 200, 'swing');
		// jQuery(window).resize(function(){
		// 	jQuery('.pdme-view-code-popup').css('top', (window.innerHeight / 2 - 50) + "px");
		// })
	}
}
