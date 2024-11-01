<?php
/**
 * Class for Settings Page
 */
class WPMapMakerSettingsPage
{
	
	function __construct()
	{
		add_action('admin_menu', [$this, 'admin_menu'], 10, 2);
		add_action( 'admin_init', array($this, 'register_setting') ); 
	}

	public function admin_menu(){
		 add_menu_page(
            __( 'WP Map Maker', 'wpdocs-webnail-modules' ),
            __( 'WP Map Maker', 'wpdocs-webnail-modules' ),
            'manage_options',
            'pdme_wp_map_maker',
            array( $this, 'menuPage' ),
            'dashicons-admin-generic',
            6
        );
	}

	public function menuPage(){
			$api_key = get_option('pdme_wpmapmaker_api_key') ? get_option('pdme_wpmapmaker_api_key') : '';
		?>
			<div class="wrap">
			<h1><?php esc_html_e('Settings'); ?></h1>
			<form method="post" action="options.php">
		 		<?php settings_fields( 'pdme_wpmapmaker_settings' ); // settings group name ?>
				<table class="form-table">
					<tr>
						<th scope="row"><label for="blogname"><?php esc_html_e('API Key'); ?></label></th>
						<td>
							<input name="pdme_wpmapmaker_api_key" type="text" id="pdme_wpmapmaker_api_key" value="<?php echo esc_attr($api_key); ?>" class="regular-text">
						</td>
					</tr>
				</table>
				<?php submit_button(); ?>
		 
			</form></div>
		<?php
	}

	public function register_setting(){
		register_setting( 'pdme_wpmapmaker_settings', 'pdme_wpmapmaker_api_key' );
	}
}

new WPMapMakerSettingsPage();