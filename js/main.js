
jQuery(function(){
	jQuery('#faq').on('click', '.qa dt',(function(){
		jQuery(this).toggleClass('active');
		jQuery(this).next('dd').slideToggle();
	}));
});

jQuery(function(){
	var float = jQuery('#float');

	float.hide();
	jQuery(window).scroll(function () {
		if (jQuery(this).scrollTop() > 300) {
			float.fadeIn(500);
		} else {
			float.fadeOut();
		}
	const scrollHeight = jQuery(document).height(); /*ページ全体の高さ*/
	const scrollPosition = jQuery(window).height() + jQuery(window).scrollTop();/*ページの一番上からスクロールされた距離*/
	const cta2Height = jQuery("#cta_last").height();/*コンタクトの高さ*/
	const footHeight = jQuery("#footer").height();/*フッターの高さ*/
		if ( scrollHeight - scrollPosition  <= footHeight + cta2Height ) {
            jQuery('#float').css({
                "position":"absolute",
                "bottom": '100px',
            });
        } else {
            jQuery('#float').css({
                "position":"fixed",
                "bottom": "0px",
            });
        }
        
	});
});	