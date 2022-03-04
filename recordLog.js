jQuery(document).ready( 
    function() {
        jQuery("body").append('<div id="saveRecording" style="background-color: yellow; display: block; width: 150px; padding: 4px; font-weight: 600; cursor: pointer;">Stop and save!</div>');
        var pagedata = [];
        window.setInterval( 
            function() {
                var pagehtml = jQuery("body").html();
                pagedata.push(pagehtml);
                //console.log(pagedata);
                //console.log(pagehtml);
        }, 1000);
    jQuery("#saveRecording").click(function () {
        var pagedatajson = JSON.stringify(pagedata);
        console.log(pagedatajson);
        jQuery.ajax({
            type: "POST",
            dataType : 'json',
            url: 'recordJSON.php',
            data: { data: pagedatajson },
            success: function () {alert("Thanks!"); },
            failure: function() {alert("Error!");}
        });
    })
});