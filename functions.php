<?php
//
// Recommended way to include parent theme styles.
//  (Please see http://codex.wordpress.org/Child_Themes#How_to_Create_a_Child_Theme)
//  
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array('parent-style')
    );
}
//
// Your code goes below
//

add_filter( 'woocommerce_checkout_fields' , 'custom_override_checkout_fields' );
 
function custom_override_checkout_fields( $fields ) {
    unset($fields['billing']['billing_company']);
    unset($fields['billing']['billing_address_1']);
    unset($fields['billing']['billing_address_2']);
    unset($fields['billing']['billing_city']);
    unset($fields['billing']['billing_postcode']);
    unset($fields['billing']['billing_country']);
    unset($fields['billing']['billing_state']);
    unset($fields['billing']['billing_phone']);
    unset($fields['order']['order_comments']);
    unset($fields['billing']['billing_address_2']);
    unset($fields['billing']['billing_postcode']);
    unset($fields['billing']['billing_company']);
    unset($fields['billing']['billing_city']);
    return $fields;
}

add_filter( 'woocommerce_product_single_add_to_cart_text', 'woo_custom_cart_button_text' );    // 2.1 +
 
function woo_custom_cart_button_text() {
 
        return __( 'Buy Now', 'woocommerce' );
 
}

add_action( 'after_setup_theme', 'yourtheme_setup' );
 
function yourtheme_setup() {
    add_theme_support( 'wc-product-gallery-zoom' );
    add_theme_support( 'wc-product-gallery-lightbox' );
    add_theme_support( 'wc-product-gallery-slider' );
}


?>
<?php

	/* ARTICLE INITIATIVE DEVELOPMENT WORK*/

	function ai_js_enqueue() {

		//Enqueue the grocerylist .JS file only on the hello-world page
		wp_register_script('ai_grocerylist2', get_template_directory_uri() . '/js/ai_grocerylist2.js', 'jquery', '3.2.1', TRUE);
		wp_register_script('ai_getcrockpotdata', get_template_directory_uri() . '/js/ai_getcrockpotdata.js', 'jquery', '3.2.1', TRUE);
		wp_register_script('ai_dropdown2', get_template_directory_uri() . '/js/ai_dropdown2.js', 'jquery', '3.2.1', TRUE);

		$baseofurl = basename(get_permalink());
		if ($baseofurl == 'hello-world') {
			wp_enqueue_script('ai_dropdown2');
			wp_enqueue_script('ai_getcrockpotdata');
			wp_enqueue_script('ai_grocerylist2');
		}
	}
	add_action('wp_enqueue_scripts', 'ai_js_enqueue'); 
	
	function ai_css_enqueue() {	
		 
		global $nectar_get_template_directory_uri;

		// Register 
		wp_register_style("ai_grocerylist", get_template_directory_uri() . "/css/ai_grocerylist.css");
		// Register 
		wp_register_style("bootstrap_iso", get_template_directory_uri() . "/css/bootstrap-iso.css");
		wp_register_style("ai_bootstrap","https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");

		global $options;

		$baseofurl = basename(get_permalink());
		if ($baseofurl == 'hello-world') {
			wp_enqueue_style('ai_bootstrap');
			wp_enqueue_style('ai_grocerylist');
			wp_enqueue_style('bootstrap_iso');
		}

	}
	add_action('wp_enqueue_scripts','ai_css_enqueue');

	//enable uploading of JSON files
	add_filter( 'upload_mimes', 'my_myme_types', 1, 1 );
	function my_myme_types( $mime_types ) {
		$mime_types['json'] = 'application/json'; // Adding .json extension
		return $mime_types;
	}
	remove_filter( 'the_content', 'wpautop' );
	remove_filter( 'the_excerpt', 'wpautop' );

	add_action('wp_enqueue_scripts','ai_enqueue_for_mail');
	function ai_enqueue_for_mail () {
		wp_enqueue_script('ai_grocerylist2', get_template_directory_uri() . '/js/ai_grocerylist2.js', array('jquery'));
		$title_nonce = wp_create_nonce('email_recipes');
		wp_localize_script('ai_grocerylist2','my_ajax_obj', array(
			'ajax_url' => admin_url('admin-ajax.php'),
			'nonce'    => $title_nonce,
		));
	}

	add_action( 'wp_ajax_ai_sendmail', 'ai_ajax_mail_recipes' );
	add_action( 'wp_ajax_nopriv_ai_sendmail', 'ai_ajax_mail_recipes' );

	//email recipes
	function ai_ajax_mail_recipes() {
		//verify nonce
		check_ajax_referer('email_recipes');

		//remove some bad text and then place in-line styling to ensure good looking email
		$data = $_POST['data'];
		$data = stripslashes($data);

		$dataarray = json_decode($data, true);
		
		$emailaddress = $dataarray["email"];
		$mailcontent =  $dataarray["list"] . "</div><div id='aiResults2'>" . $dataarray["recipes"];

		$email = '<html><head><title>NLW Grocery List</title>';
		$email .= '<style type="text/css"> #aiResults { padding: 20px; font-family: Arial; display: block; margin-top: 20px; border-bottom: 1px solid black; } #aiResults div { font-size: 20px; font-weight: 600; }#aiResults li {font-size: 18px; font-weight: normal;} #aiResults section { page-break-inside: avoid;font-size: 20px; margin-left: 20px; border-bottom: 1px solid black;} #aiResults2 { padding: 20px; font-family: Arial; display: block; margin-top: 20px; border-bottom: 1px solid black; } #aiResults2 div { font-size: 20px; font-weight: 600; }#aiResults2 li {font-size: 18px; font-weight: normal;} #aiResults2 .recipeIngredients { page-break-inside: avoid; padding-left: 10px; padding-right: 10px; margin-bottom: 10px; border-top: 2px solid black; font-size: 20px;} #aiResults2 .recipeInstructions { page-break-inside: avoid; margin-left: 20px; margin-right: 20px; padding: 15px; background-color: #fafafa; border: 1px solid black; margin-bottom: 10px; font-size: 20px;} #aiResults2 .recipeContainer {page-break-inside: avoid;} #aiResults2 p { font-size: 18px; font-weight: normal;}</style>';
		$email .= '</head><body>';
		$email .= '<div style="text-align: center; font-weight: 600; font-size: 30px;">Thank you for choosing...</div><img src="http://www.nlwtestsite1982.biz/wp-content/uploads/2017/03/logo2.png" style="width: 300px; height: 50px; display: block; margin: auto;"/>';
		$email .= '<div id="aiResults">';
		$email .= $mailcontent;
		$email .= '</div></body></html>';

		$subject = "Your Shopping List from New Leaf Wellness";
		$message = $email;
		$headers = array('From: wordpress@nlwtestsite1982.biz'. "\r\n",'Content-Type: text/html; charset=UTF-8','MIME-Version: 1.0');

		$mailsent = wp_mail($emailaddress, $subject, $message, $headers);

    	if($mailsent) {
			$response = "Mail says it's sent... To:" . $emailaddress . $headers[0];
		} else {
			$response = "Mail returned false!";
		}

		if(isset($data)) {
			echo 'Response' . $response . 'Data' . $email;
		} else {
			echo 'Response' . $response . 'NOData' . $email;
		}

    	wp_die(); // All ajax handlers die when finished
	}

?>