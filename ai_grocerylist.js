//images/
function aiResultsClear() {
    jQuery("#aiResults").empty();
}
//once results have been generated, swap between results pages
function viewResults() {
    var returnedbutton = jQuery(event.target).text();
    if(returnedbutton == "View Shopping List") {
        jQuery("#aiResults").css("display","block");
        jQuery("#aiResults2").css("display","none");
    }
    else if (returnedbutton == "View Selected Recipes") {
        jQuery("#aiResults2").css("display","block");
        jQuery("#aiResults").css("display","none");
    }
}
//remove a selection from the queue
function removeSelection() {
    var clickedrecipe = jQuery(event.target).parent().parent().parent();
    clickedrecipe.remove();
}
jQuery(document).ready(
    function() {
        //add a function to move the selected recipes to the query box and enable the generation box
        jQuery(document).on("click","#checkedToQuery", function(event) {
            event.stopPropagation();
            var checkedboxes = jQuery(':checked');

            if (checkedboxes.length === 0) {
                alert("No Selected Recipes");
            }
            else {
                //initialize variables
                var checkedrecipes = [];
                var addtoquerybox = "";
                //remove elements that have been selected from the list
                checkedboxes.parent().css("z-index","-1");
                checkedboxes.parent().css("position","absolute");
                checkedboxes.parent().animate({
                    bottom: "0px",
                    opacity: 0
                }, 1000, function() {
                    //animation complete
                    checkedboxes.prop('checked',false);
                });


                //loop througgh the selected recipes and add them to a list
                var recipes = document.getElementsByName('recipe');
                for(i = 0; i < recipes.length; i++) {
                    if(recipes[i].checked) {
                        var recipename = recipes[i].value;
                        checkedrecipes.push(recipename);
                    }
                }
                
                //find the querybox on page and get the contents of it
                var querybox = jQuery('#queryBox');
                var queryboxcontents = querybox.find('p');

                //loop through the checked recipes array
                for(i = 0; i < checkedrecipes.length; i++) {
                    var selectedrecipe = checkedrecipes[i];
                    if(queryboxcontents.length > 0) {
                        //loop through the contents of the query box
                        for(j = 0; j < queryboxcontents.length; j++) {
                            var selectedcontent = queryboxcontents[j].innerHTML;
                            //if the selected query box content is equal to the selected recipe
                            if(selectedcontent == selectedrecipe) {
                                //quit the script
                                alert('You selected a recipe which is already in the queue');
                                break;
                            //then do something else if we've ensured no duplicates..
                            } else {
                                //if the current compared element is not equal to the selected recipe...
                                if(j == (queryboxcontents.length - 1)) {
                                    //add the element to the query box
                                    addtoquerybox += '<div class="col-xs-12 queryBoxSelectionContainer"><div class="row"><div class="col-xs-1 queryBoxSelection"><img class="rightArrow" src="images/rightarrow.png"/></div><div class="col-xs-10 queryBoxMeal"><p>' + selectedrecipe + '</p></div><div class="col-xs-1 queryBoxRemove"><img id="removeRecipe" src="images/remove.png" onclick="removeSelection()"/></div></div></div>';
                                }
                            }
                        }
                    } else {
                        addtoquerybox += '<div class="col-xs-12 queryBoxSelectionContainer"><div class="row"><div class="col-xs-1 queryBoxSelection"><img class="rightArrow" src="images/rightarrow.png"/></div><div class="col-xs-10 queryBoxMeal"><p>' + selectedrecipe + '</p></div><div class="col-xs-1 queryBoxRemove"><img id="removeRecipe" src="images/remove.png" onclick="removeSelection()"/></div></div></div>';
                    }                
                }
                querybox.append(addtoquerybox);
            }
        }
        );
        //add a function to move elements in query box to grocery list
        jQuery('#queryToList').click( function() {
            //initialize variables
            var selectedrecipes = [];
            var neededingredients = [];
            var allingredients = [];
            var recingred = [];
            var recsteps = [];

            var recipeslisted = jQuery("#queryBox div").length - 1;

            if(recipeslisted == 0) {
                alert("No meals have been selected yet!");
            } else {
                var topcontainer = jQuery('.aiListGenerator');
                var botcontainer = jQuery('.aiListContainer');
                topcontainer.css("display","none");
                botcontainer.css("display","block");

                var querybox = jQuery('#queryBox');
                var queryboxcontents = querybox.find('p');
                for(i = 0; i < queryboxcontents.length; i++) {
                    var selectedcontent = queryboxcontents[i].innerHTML;
                    selectedrecipes.push(selectedcontent);
                }
                getCrockpotData( function(data) {
                    //get the recipes only
                    var recipes = data.Recipes;
                    var ingredients = data.Ingredients;

                    //loop through the recipes in the JSON file, adding the ingredients in the recipes to the neededingredients list if they are the same recipe as selected in the app
                    for(i = 0; i < recipes.length; i++ ) {
                        var recipename = recipes[i].General["Name"];
                        for(j = 0; j < selectedrecipes.length; j++) {
                            var selectedrecipe = selectedrecipes[j];
                            if(recipename == selectedrecipe) {
                                recipeingredients = recipes[i].Ingredients;
                                recipesteps = recipes[i].Recipe;
                                for(var ingredient in recipeingredients) {
                                    neededingredients.push([ingredient,recipeingredients[ingredient]]);
                                    recingred.push([ingredient,recipeingredients[ingredient],recipename])
                                }
                                for(var step in recipesteps) {
                                    recsteps.push([step,recipesteps[step],recipename]);
                                }  
                            }
                        }
                    }
                    for(i = 0; i < ingredients.length; i++) {
                        var ingredientname = ingredients[i].Name;
                        var ingredientquantity = ingredients[i].Quantity;
                        var ingredientunit = ingredients[i].Unit;
                        var ingredienttype = ingredients[i].Type;
                        allingredients.push([ingredientname,ingredientquantity,ingredientunit,ingredienttype]);
                    }
                    
                });
                //once the AJAX request is over, display the data
                jQuery(document).ajaxComplete( function(event,xhr,settings) {
                    var currentdata = jQuery('#queryBox').html();
                    if(currentdata != '') {
                        //initialize variables
                        var ingredientnames = [];
                        var updatedingredients = [];
                        var uniqueingredients = [];
                        var finalingredients = [];


                        //add ingredient quantities, set up units/type for the ingredients
                        for(i = 0; i < neededingredients.length; i++) {
                            var ingredientname = neededingredients[i][0];
                            for(j = 0; j < allingredients.length; j++) {
                                selectedingredient = allingredients[j][0];
                                if (selectedingredient == ingredientname) {
                                    allingredients[j][1] += neededingredients[i][1];
                                    for(k = 0; k < updatedingredients.length; k++) {
                                        if(selectedingredient == updatedingredients[k][0]) {
                                            updatedingredients.splice(k,1);
                                        }
                                    }
                                    updatedingredients.push([selectedingredient,allingredients[j][1],allingredients[j][2],allingredients[j][3]]);
                                    ingredientnames.push(selectedingredient);
                                }
                            }
                        }


                        //Work with our ingredient names array to delete duplicates and set up for input
                            for(i = 0; i < ingredientnames.length; i++) {
                                var ingredient = ingredientnames[i];
                                if (jQuery.inArray(ingredient,uniqueingredients) === -1) {
                                    uniqueingredients.push(ingredient);
                                }
                            }
                            for(i = 0; i < uniqueingredients.length; i++) {
                                var ingredient = uniqueingredients[i];
                                finalingredients.push([ingredient,0,"",""]);
                            }
                        //input the data into the final ingredients array
                        for(i = 0; i < updatedingredients.length; i++) {
                            var selectedname = updatedingredients[i][0];
                            for(j = 0; j < finalingredients.length; j++) {
                                var uniquename = finalingredients[j][0];
                                if(uniquename == selectedname) {
                                    selectedquant = updatedingredients[i][1];
                                    selectedunit = updatedingredients[i][2];
                                    selectedtype = updatedingredients[i][3];
                                    uniquequant = finalingredients[j][1];
                                    uniqueunit = finalingredients[j][2];
                                    uniquetype = finalingredients[j][3];

                                    uniquequant += selectedquant;
                                    finalingredients[j][1] = uniquequant;
                                    if(uniqueunit == "") {
                                        uniqueunit += selectedunit;
                                        finalingredients[j][2] = uniqueunit; 
                                    }
                                    if(uniquetype == "") {
                                        uniquetype += selectedtype;
                                        finalingredients[j][3] = uniquetype;
                                    }
                                    
                                }
                            }
                        }

                        //get all unique categories to display on page
                        var uniquecategories = [];
                        for(i = 0; i < finalingredients.length; i++) {
                            var selectedcategory = finalingredients[i][3];
                            if (jQuery.inArray(selectedcategory,uniquecategories) === -1) {
                                uniquecategories.push(selectedcategory);
                            }             
                        }

                        //display all unique categories on the page
                        for(i = 0; i < uniquecategories.length; i++) {
                            var categoryid = uniquecategories[i].replace(/\s|\//g, '');
                            var categoryname = '<section id="'+ categoryid + '">' + uniquecategories[i] + '</section>';
                            jQuery("#aiResults").append(categoryname);
                        }

                        //display all ingredients in their respective categories
                        var currentcategories = jQuery("#aiResults").find('section');

                        for(i = 0; i < currentcategories.length; i++) {
                            var selectedcategory = currentcategories[i].innerHTML;
                            var selectedcategory = selectedcategory.replace(/\s|\//g, '');
                            for(j = 0; j < finalingredients.length; j++) {
                                var ingredientcategory = finalingredients[j][3];
                                var ingredientcategory = ingredientcategory.replace(/\s|\//g, '');
                                if(ingredientcategory == selectedcategory) {
                                    var ingredientname = finalingredients[j][0];
                                    var ingredientquantity = finalingredients[j][1];
                                    var ingredientunit = finalingredients[j][2];
                                    var ingredienthtml = '<li>'+ ingredientname + ' x ' + ingredientquantity + ' ' + ingredientunit + '</li>';
                                    jQuery("#aiResults").find('#' + ingredientcategory).append(ingredienthtml).one();
                                }
                            }
                        }
                        //add the selected recipes to the page
                        for(i = 0; i < selectedrecipes.length; i++) {
                            var recipehtml = "<div class='recipeContainer'>";
                            if (i == 0) {
                                recipehtml += '<div class="recipeHeader">Your Selected Meals:</div>';
                            }
                            recipehtml += ('<div>' + (i+1) + ": " +selectedrecipes[i] + '</div>');
                            recipehtml += ("<section class='recipeIngredients'>Ingredients:");
                            for(j = 0; j < recingred.length; j++) {
                                if(selectedrecipes[i] == recingred[j][2]) {
                                    for(k = 0; k < finalingredients.length; k++) {
                                        if(recingred[j][0] == finalingredients[k][0]) {
                                            recipehtml += ("<li>" + recingred[j][1] + " x " + finalingredients[k][2] + " " + recingred[j][0] + "</li>");
                                            break;
                                        }
                                    } 
                                }
                            }
                            recipehtml += "</section>";
                            recipehtml += "<section class='recipeInstructions'>Cooking Instructions:";
                            for(k = 0; k < recsteps.length; k++) {
                                if (recsteps[k][2] == selectedrecipes[i]) {
                                    recipehtml += ("<p>" + recsteps[k][0] + ": " + recsteps[k][1] + " " + "</p>")
                                }
                            }
                            recipehtml += "</section></div>";
                            jQuery("#aiResults2").append(recipehtml);
                        }
                        
                        jQuery("#queryBox").empty();

                    } else {
                        console.log('nothing in the query');
                    }

                });

            }
        });
    }
);
//Printelem an popup to print specific page content
function PrintElem(elem,elem2)
    {
        Popup(jQuery(elem).html(),jQuery(elem2).html());
    }

function Popup(data,data2)
    {
        //Open up a new window and print the document contents of the new window
        var mywindow = window.open('', 'new div', 'height=400,width=600');
        mywindow.document.write('<html><head><title>NLW Grocery List</title>');
        mywindow.document.write('<style> #aiResults { min-height: 900px; padding: 20px; font-family: Arial; display: block; margin-top: 20px; border-bottom: 1px solid black; } #aiResults div { font-size: 20px; font-weight: 600; }#aiResults li {font-size: 18px; font-weight: normal;} #aiResults section { page-break-inside: avoid;font-size: 20px; margin-left: 20px; border-bottom: 1px solid black;} #aiResults2 { padding: 20px; font-family: Arial; display: block; margin-top: 20px; border-bottom: 1px solid black; } #aiResults2 div { font-size: 20px; font-weight: 600; }#aiResults2 li {font-size: 18px; font-weight: normal;} #aiResults2 .recipeIngredients { page-break-inside: avoid; padding-left: 10px; padding-right: 10px; margin-bottom: 10px; border-top: 2px solid black; font-size: 20px;} #aiResults2 .recipeInstructions { page-break-inside: avoid; margin-left: 20px; margin-right: 20px; padding: 15px; background-color: #fafafa; border: 1px solid black; margin-bottom: 10px; font-size: 20px;} #aiResults2 .recipeContainer {page-break-inside: avoid;} #aiResults2 p { font-size: 18px; font-weight: normal;}</style>');
        mywindow.document.write('</head><body>');
        mywindow.document.write('<div style="text-align: center; font-weight: 600; font-size: 30px;">Thank you for choosing...</div><img src="http://www.nlwtestsite1982.biz/wp-content/uploads/2017/03/logo2.png" style="width: 300px; height: 50px; display: block; margin: auto;"/>');
        mywindow.document.write('<div id="aiResults">');
        mywindow.document.write(data);
        mywindow.document.write('</div>');
        mywindow.document.write('<div id="aiResults2">');
        mywindow.document.write(data2);
        mywindow.document.write('</div>');
        mywindow.document.write('</body></html>');

        //Wait 250ms to print, so that the images can load.
        setTimeout(function() {
            mywindow.print();
            mywindow.close();
        }, 1500);

        return true;
    }

var emailed = [];

//Clicking the email form, perform an ajax request to our PHP file to send email of page content
jQuery("#emailFormButton").click( function(event) {

    var airesults = jQuery("#aiResults").html();
    var airesults2 = jQuery("#aiResults2").html();
    var aiaddress = jQuery("#emailForm").val();

    //put the page content in an object and stringify with JSON.stringify
    var sendtophp = JSON.stringify({"email": aiaddress, "list": airesults, "recipes": airesults2});

    if(aiaddress.includes('@')) {
        if(emailed.length > 0) {
            for(var i = 0; i < emailed.length; i++) {
                if(emailed[i] == aiaddress) {
                    alert("You've recently sent an email to this address already.");
                    break;
                } else if(i == (emailed.length - 1)) {
                    alert("Address has not been used already, sending mail...");
                    /*
                    //POST to wordpress document with a nonce, post to wp-admin/wp-ajax.php
                    jQuery.post(my_ajax_obj.ajax_url,{
                        _ajax_nonce: my_ajax_obj.nonce,
                        action: "ai_sendmail",
                        data: sendtophp,
                    }, function(data) {
                        console.log(data);
                    }).fail( function() {
                        alert("Error");
                    }).done( function() {
                        alert("You've connected with the email service.");
                    });
                    */
                    jQuery("#emailForm").val('');
                    emailed.push(aiaddress);
                    break;
                }
            }
        } else {
            /*
            //POST to wordpress document with a nonce, post to wp-admin/wp-ajax.php
            jQuery.post(my_ajax_obj.ajax_url,{
                _ajax_nonce: my_ajax_obj.nonce,
                action: "ai_sendmail",
                data: sendtophp,
            }, function(data) {
                console.log(data);
            }).fail( function() {
                alert("Error");
            }).done( function() {
                alert("You've connected with the email service.");
            });
            */
            jQuery("#emailForm").val('');
            emailed.push(aiaddress);
        }
    } else {
        alert("Sorry, you've entered an invalid email address!");
    }

});