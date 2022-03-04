<?php
	/* ARTICLE INITIATIVE DEVELOPMENT WORK*/
	function ai_js_enqueue() {
		global $options;
		global $post;
		global $nectar_get_template_directory_uri;

		//Enqueue the grocerylist .JS file only on the hello-world page
		wp_register_script('ai_grocerylist', $nectar_get_template_directory_uri . '/js/ai_grocerylist.js', 'jquery', '3.2.1', TRUE);
		wp_register_script('ai_getcrockpotdata', $nectar_get_template_directory_uri . '/js/ai_getcrockpotdata.js', 'jquery', '3.2.1', TRUE);
		wp_register_script('ai_dropdown', $nectar_get_template_directory_uri . '/js/ai_dropdown.js', 'jquery', '3.2.1', TRUE);

		$baseofurl = basename(get_permalink());
		if ($baseofurl == 'hello-world') {
			wp_enqueue_script('ai_dropdown');
			wp_enqueue_script('ai_getcrockpotdata');
			wp_enqueue_script('ai_grocerylist');
		}
	}
	add_action('wp_enqueue_scripts', 'ai_js_enqueue'); 
	
	function ai_css_enqueue() {	
		 
		 global $nectar_get_template_directory_uri;

		 // Register 
		 wp_register_style("ai_grocerylist", $nectar_get_template_directory_uri . "/css/ai_grocerylist.css");
		 // Register 
		 wp_register_style("bootstrap_iso", $nectar_get_template_directory_uri . "/css/bootstrap-iso.css");
		 wp_register_style("ai_bootstrap","https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");

		 global $options;
		 wp_enqueue_style('ai_bootstrap');

		 wp_enqueue_style('ai_grocerylist');
		 
		 wp_enqueue_style('bootstrap_iso');
	}
	add_action('wp_enqueue_scripts','ai_css_enqueue');

	//enable uploading of JSON files
	add_filter( 'upload_mimes', 'my_myme_types', 1, 1 );
	function my_myme_types( $mime_types ) {
		$mime_types['json'] = 'application/json'; // Adding .json extension
		return $mime_types;
	}

	function woocommerce_button_proceed_to_checkout() {
    	$checkout_url = WC()->cart->get_checkout_url();
    	?>
    	<a href="<?php echo $checkout_url; ?>" class="checkout-button button alt wc-forward"><?php _e( 'Head to Checkout', 'woocommerce' ); ?></a>
    	<?php
     }
?>