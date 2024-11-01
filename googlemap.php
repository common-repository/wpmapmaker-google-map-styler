<?php
/**
 Plugin Name: WPMapMaker - Google Map Styler
 Description: WPMapMaker - Google Map Styler
 Author: Plugin Devs
 Author URI: https://plugin-devs.com/
 Version: 0.9.1
 License: GPLv2
 License URI: https://www.gnu.org/licenses/gpl-2.0.html
 Text Domain: wpmapmaker
*/

 // Exit if accessed directly.
 if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Main Class
 */
class WPMapMaker
{
	
	function __construct()
	{
		$this->declare_constants();
		$this->includes();
		add_action('wp_enqueue_scripts', [$this,'front_enqueues'] );
		add_action('wp_footer', [$this,'view_code_popup'] );
		add_shortcode('wpmapmaker', [$this,'shortcode']);
	}

	public function declare_constants(){
		define('WPMAPMAKER_VERSION', '0.9.0');
		define('WPMAPMAKER_URL', plugin_dir_url( __FILE__ ));
		define('WPMAPMAKER_PATH', plugin_dir_path( __FILE__ ));
	}

	public function includes(){
		if( is_admin() ){
			require_once( WPMAPMAKER_PATH . 'admin/settings-page.php' );
		}
	}

	// Enqueue Frontend Scripts and Styles
	public function front_enqueues(){
		$api_key = get_option('pdme_wpmapmaker_api_key') ? get_option('pdme_wpmapmaker_api_key') : '';

		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_style('wpmapmaker-style', WPMAPMAKER_URL . 'assets/css/style.css', array('wp-color-picker'), WPMAPMAKER_VERSION, 'all');

	    wp_enqueue_script(
	        'iris',
	        admin_url( 'js/iris.min.js' ),
	        array( 'jquery', 'jquery-ui-draggable', 'jquery-ui-slider', 'jquery-touch-punch' ),
	        false,
	        1
	    );
	    wp_enqueue_script(
	        'wp-color-picker',
	        admin_url( 'js/color-picker.min.js' ),
	        array( 'iris', 'wp-i18n' ),
	        false,
	        1
	    );

		wp_enqueue_script('wpmapmaker-gmap', 'https://maps.googleapis.com/maps/api/js?key='.$api_key);
		wp_enqueue_script('wpmapmaker-functions', WPMAPMAKER_URL . 'assets/js/functions.js', array('jquery', 'wp-color-picker'), WPMAPMAKER_VERSION);
		wp_enqueue_script('wpmapmaker-styler', WPMAPMAKER_URL . 'assets/js/map-styler.js', array('wpmapmaker-functions'), WPMAPMAKER_VERSION);
		wp_enqueue_script('wpmapmaker-controler', WPMAPMAKER_URL . 'assets/js/map-controller.js', array('wpmapmaker-styler'), WPMAPMAKER_VERSION);
	}

	public function shortcode( $atts ){
			ob_start();
			$atts = shortcode_atts( array(
				            'map-height' => '400px',
				        ),$atts );

			$css = '.pdme-map { min-height: ' . $atts['map-height'] . '; }';

		    wp_register_style( 'wpmapmaker-inline-style', false );
		    wp_enqueue_style( 'wpmapmaker-inline-style' );
		    wp_add_inline_style( 'wpmapmaker-inline-style', $css );
		?>
			<div class="pdme-wrapper">
			  <div class="pdme-style-container">
			  	<div class="pdme-nav-container">
				    <div class="pdme-feature-type-nav-container pdme-type-nav-container">
				      <?php require( WPMAPMAKER_PATH. 'sidebars/feature-types.php' ); ?>
				      <div class="pdme-apply-button-container">
						    <div class="pdme-apply-button">
						      Apply
						    </div>
						    <div class="pdme-view-code-button">
						      View Code
						    </div>
					    </div>
				    </div>
			      	<div class="pdme-element-type-nav-container pdme-type-nav-container pdme-none">
			        	<?php require( WPMAPMAKER_PATH . 'sidebars/element-types.php' ); ?>
			      	</div>
			      	<div class="pdme-style-type-nav-container pdme-type-nav-container pdme-none">
			        	<?php require( WPMAPMAKER_PATH . 'sidebars/stylers.php' ); ?>
			        </div>
			    </div>

			    

			  </div>
			  <div id="pdme-map" class="pdme-map" ></div>
			</div>
		<?php
		return ob_get_clean();
	}

	public function view_code_popup(){
		?>
			<div class="pdme-view-code-popup pdme-none">
				<div class="pdme-view-code-wrap">
					<div class="pdme-view-code">
						<pre></pre>
					</div>
				</div>
			</div>
			<div class="pdme-overlay pdme-none"></div>
		<?php
	}
}

new WPMapMaker();