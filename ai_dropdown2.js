//../wp-content/uploads/ai_images/
//enable smooth scrolling between on-page links
jQuery(function() {
  jQuery('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = jQuery(this.hash);
      target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        jQuery('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
function viewNutritionData(event) {
    var selectedrecipe = jQuery(event.target).parent().text();
    selectedrecipe = selectedrecipe.replace("?","");

    var nutritiondata = [];
    var ingredientdata = [];
    var ingredientunits = [];
    var instructiondata = [];

    getCrockpotData( function(data) {
        //get the recipes only
        recipes = data.Recipes;
        ingredients2 = data.Ingredients;

        //loop through JSON objects and store data into arrays which we can operate on
        if(nutritiondata.length == 0) {
            for(i = 0; i < recipes.length; i++ ) {
                var recipename = recipes[i].General["Name"];
                if(selectedrecipe == recipename) {
                    var nutrition = recipes[i].Nutrition;
                    var ingredients = recipes[i].Ingredients;
                    var instructions = recipes[i].Recipe;
                    for(var nutrient in nutrition) {
                        nutritiondata.push([nutrient,nutrition[nutrient]])
                    }
                    for(var ingredient in ingredients) {
                        ingredientdata.push([ingredient,ingredients[ingredient]]);
                    }
                    for(var instruction in instructions) {
                        instructiondata.push([instruction,instructions[instruction]]);
                    }
                }
            }
            for(i = 0; i < ingredients2.length; i++) {
                var ingredientname = ingredients2[i].Name;
                var ingredientunit = ingredients2[i].Unit;
                ingredientunits.push([ingredientname,ingredientunit]);
            }
        } else {
            nutritiondata = [];
            ingredientdata = [];
            ingredientunits = [];
            instructiondata = [];

            for(i = 0; i < recipes.length; i++ ) {
                var recipename = recipes[i].General["Name"];
                if(selectedrecipe == recipename) {
                    var nutrition = recipes[i].Nutrition;
                    var ingredients = recipes[i].Ingredients;
                    for(var nutrient in nutrition) {
                        nutritiondata.push([nutrient,nutrition[nutrient]])
                    }
                    for(var ingredient in ingredients) {
                        ingredientdata.push([ingredient,ingredients[ingredient]]);
                    }
                    for(var instruction in instructions) {
                        instructiondata.push([instruction,instructions[instruction]]);
                    }
                }
            }
            for(i = 0; i < ingredients.length; i++) {
                var ingredientname = ingredients[i].Name;
                var ingredientunit = ingredients[i].Unit;
                ingredientunits.push([ingredientname,ingredientunit]);
            }
        }
    });


    
    //once the AJAX request is over, display the data
    jQuery(document).ajaxComplete( function() {
            var grid = jQuery("#checkboxGrid");
            grid.css("display","none");
            var info =jQuery("#checkboxInfo");
            info.css("display","block");
            info.append('<img src="../wp-content/uploads/ai_images/remove.png" id="closegrid" onclick="closeGrid(event)">');
            info.append('<div class="col-xs-12" id="checkboxInfoTitle">'+ selectedrecipe + '</div>');
            info.append('<div class="col-xs-12 col-lg-6 infoContainer"><div class="infoStyle" id="checkboxInfoIngredients"><p>Ingredients:</p></div></div>');
            info.append('<div class="col-xs-12 col-lg-6 infoContainer"><div class="infoStyle" id="checkboxInfoNutrition"><p>Nutrition Data:</p></div></div>');
            info.append('<div class="col-xs-12 infoContainer"><div class="infoStyle" id="checkboxInfoInstructions"><p>Cooking Instructions:</p></div></div>');

            var ingredients = jQuery("#checkboxInfoIngredients");
            var nutrition = jQuery("#checkboxInfoNutrition");
            var instructions = jQuery('#checkboxInfoInstructions');

            for(i = 0; i < nutritiondata.length; i++) {
                var addedunit;
                if((nutritiondata[i][0] == "Servings") || (nutritiondata[i][0] == "Serving Size") || (nutritiondata[i][0] == "Calories")) {
                    addedunit = "";
                } else if ((nutritiondata[i][0] == "Cholesterol") || (nutritiondata[i][0] =="Sodium")) {
                    addedunit = "mg";
                } else if ((nutritiondata[i][0] == "Vitamin A") || (nutritiondata[i][0] =="Vitamin C") || (nutritiondata[i][0] =="Calcium") || (nutritiondata[i][0] == "Iron")) {
                    addedunit = "%";
                } else {
                    addedunit = "g";
                }
                var addedhtml = "<li>" + nutritiondata[i][0] + ": " + nutritiondata[i][1] + addedunit + "</li>";
                nutrition.append(addedhtml);
            }
            for(i = 0; i < ingredientdata.length; i++) {
               var ingredientunit;
                for(j = 0; j < ingredientunits.length; j++) {
                    if (ingredientunits[j][0] == ingredientdata[i][0]) {
                        ingredientunit = ingredientunits[j][1];
                        var addedhtml = "<li>" + ingredientdata[i][0] + ": " + ingredientdata[i][1] + " " + ingredientunit + "</li>";
                        ingredients.append(addedhtml);
                    }
                }
            }
            for(i = 0; i < instructiondata.length; i++) {
                var addedhtml = "<div>" + instructiondata[i][0] + ": " + instructiondata[i][1] + "</div>";
                instructions.append(addedhtml);
            }
            jQuery(document).off("ajaxComplete");
        }
    );

}
//create two functions to control the display of the dropdown menu
function openOptions() {
        var options = jQuery("#dropdownOptions");
        if(options.css("display") == "block") {
            options.css("display","none");
        } else {
            options.css("display", "block");
        }
}
function closeGrid(event) {
    var info = jQuery(event.target).parent();
    info.html("");
    info.css("display","none");
    var grid = jQuery("#checkboxGrid");
    grid.css("display","block");

}

jQuery(document).ready(
    function() {

        jQuery(window).click(
            function(event) {
                var options = jQuery("#dropdownOptions");
                if(event.target.className !== ("dropdownText" || "dropdownOptions")) {
                    options.css("display","none");
                }
            }
        );        

        //run a function when a dropdown menu choice is clicked which displays information according to which selection is clicked
        jQuery("[name='dropdownChoice']").click(
            function() {
                //get document data - name of clicked choice, dropdown box, options container
                var choicetext = jQuery(this).html();
                var dropdownbox = jQuery("#dropdownBox");
                var options = jQuery("#dropdownOptions");

                //Change dropdownbox text to the choice and close the options container
                dropdownbox.html('<img src="../wp-content/uploads/ai_images/downarrow.png" onclick="openOptions(event)">' + choicetext);
                options.css("display","none");
                
                //initialize the recipe name array
                jsrecipes = [];

                //call the AJAX request, compares the category chosen in dropdown to the category in the list of recipes
                getCrockpotData( function(data) {
                    //get the recipes only
                    recipes = data.Recipes;

                    //loop through the recipes, adding the names of the recipes to jsrecipes if they are in the selected category
                    for(i = 0; i < recipes.length; i++ ) {
                        var recipecategory = recipes[i].General["Category"];
                        if(recipecategory == choicetext) {
                            var recipename = recipes[i].General["Name"];
                            jsrecipes.push(recipename);
                        }
                        else if (choicetext == "All") {
                            var recipename = recipes[i].General["Name"];
                            jsrecipes.push(recipename);
                        }
                    }
                });

                //once the AJAX request is over, display the recipes within the category
                jQuery(document).ajaxComplete( function() {

                        //select the area where we are going to put recipes and clear it off
                        var checkboxarea = jQuery("#checkboxGrid");
                        var checkoverlay = jQuery("#checkboxOverlay");
                        var checkinfo = jQuery("#checkboxInfo");
                        checkoverlay.css("display","none");
                        checkboxarea.css("display","block");
                        if(checkinfo.css("display") == 'block') {
                            checkinfo.css("display","none");
                            checkinfo.html("");
                        }
                        checkboxarea.html("");

                        //Sort the jsrecipes list alphabetically
                        jsrecipes = jsrecipes.sort();

                        //Loop through jsrecipes, first checking if there is any recipe in the query "selected meals", if there isn't then add the recipes with their checkboxes and buttons
                        for(i = 0; i < jsrecipes.length; i++) {
                            var resultsinquery = jQuery(".queryBoxSelectionContainer");
                            if(resultsinquery.length > 1) {
                                for(j = 0; j < resultsinquery.length; j++) {
                                    var recipeinquery = resultsinquery[j].getElementsByTagName('p')[0].innerHTML;
                                    console.log(recipeinquery);
                                    if(recipeinquery == jsrecipes[i]) {
                                        break;
                                    }
                                    else {
                                        if (j === (resultsinquery.length-1)) {
                                            var newcheckbox = 
                                            '<label class="col-xs-12" name="check"><input type="checkbox" name="recipe" value="' + jsrecipes[i] + '">' + jsrecipes[i] + '</input><img src="../wp-content/uploads/ai_images/information.png" onclick="viewNutritionData(event)"/></label>';
                                            checkboxarea.append(newcheckbox);
                                            break;
                                        }
                                    }
                                }
                            } else {
                                var newcheckbox = 
                                '<label class="col-xs-12" name="check"><input type="checkbox" name="recipe" value="' + jsrecipes[i] + '">' + jsrecipes[i] + '</input><img src="../wp-content/uploads/ai_images/information.png" onclick="viewNutritionData(event)"/></label>';
                                checkboxarea.append(newcheckbox);
                            }
                        }
                        jQuery(document).off("ajaxComplete");
                    }
                );

            }
        );
    }
);