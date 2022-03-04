function getCrockpotData(handleData) {
    jQuery.ajax({
        //url: "../wp-content/themes/salient3/js/ai_crockpotdata.json",
        url: "ai_crockpotdata.json",
        dataType: 'json',
        success: function(data) {
            handleData(data);
        }
    });
}
