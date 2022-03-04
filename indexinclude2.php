<!--"../wp-content/uploads/ai_images/-->
<div class="bootstrap-iso">
    <div class="container" id="aiAppContainer">
        <div class="row aiListGenerator">
            <div class="aiCategories col-lg-8 col-xs-12">
                <div class="aiElement20">
                    <div class="aiElementTitle" id="chooseCategory">Choose a category: </div>
                    <div class="dropdown">
                        <div id="dropdownBox" class="dropdownText" onclick="openOptions()"><img src="../wp-content/uploads/ai_images/downarrow.png" onclick="openOptions()">Protein type?</div>
                        <div class="dropdownOptions" id="dropdownOptions">
                            <div name="dropdownChoice">All</div>
                            <div name="dropdownChoice">Beef</div>
                            <div name="dropdownChoice">Chicken</div>
                            <div name="dropdownChoice">Pork</div>
                            <div name="dropdownChoice">Turkey</div>
                            <div name="dropdownChoice">Vegetarian</div>
                            <div name="dropdownChoice">Desserts</div>
                        </div>
                    </div>
                </div>
                <div class="aiElement80">
                    <div class="checkboxes row" id="nlwCheckboxContainer">
                        <div id="checkboxOverlay">
                            <p>Meals which are available in your category appear here...</p>
                        </div>
                        <div id="checkboxInfo">
                        </div>
                        <div id="checkboxGrid"> 
                        </div>
                    </div>
                    <div class="buttons">
                        <div id="checkedToQuery">Add to List</div>
                        <a href="#selectedMeals" class="scrollArrow">
                            <div>Your Selections</div>
                            <img src="../wp-content/uploads/ai_images/scroll.png"/>
                        </a>
                    </div>
                    
                </div>
            </div>
            <div class="aiSelections col-lg-4 col-lg-offset-0 col-xs-12">
                <div class="aiElement80">
                    <div id="queryBox" class="row">
                        <div class="col-xs-12" id="selectedMeals">Selected Meals:</div>
                    </div>
                </div>
                <div class="aiElement20">
                    <div class="buttons">
                        <div id="queryToList">Create Shopping List</div>
                        <a href="#chooseCategory" class="scrollArrow">
                            <img src="../wp-content/uploads/ai_images/scroll2.png"/>
                            <div>Select More</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="aiListContainer">
            <div class="row">
                <div class="col-xs-12 resultsTitle">
                    Your Shopping List:
                </div>
                <div class="col-xs-12 emailContainer">
                    <input type="text" name="email" id="emailForm"></input>
                    <div class="buttons" style="display: inline-block;">
                        <button id="emailFormButton">Email</button>
                    </div>
                </div>
                <div class="col-xs-12 col-lg-8 col-lg-offset-2 buttons aiResultsButton">
                    <div onclick="viewResults(event)">View Shopping List</div>
                    <div onclick="viewResults(event)">View Selected Recipes</div>
                    <div value="Print" onclick="PrintElem('#aiResults','#aiResults2'); ">Print!</div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-lg-8 col-lg-offset-2" id="aiResults">
                    <div class="recipeHeader">Shopping List:</div>
                </div>
                <div class="col-xs-12 col-lg-8 col-lg-offset-2" id ="aiResults2">
                </div>
            </div>
        </div>
    </div>
</div>