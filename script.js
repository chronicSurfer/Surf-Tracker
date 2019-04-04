/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/*
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.  
 */
/*
 * surfer_array - global array to hold student objects
 * @type {Array}
 * example of surfer_array after input: 
 * surfer_array = [
 *  { location: 'HB', height: 6, direction: 'ssw', period: 15,  }
 * ];
 */

var surfer_array = [];


/*
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
    addClickHandlersToElements();

}

/*
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){
    $('#addButton').on("click", handleAddClicked);
    $('#cancelButton').on("click", handleCancelClick);
    $('#fetchButton').on("click", fetchData);
}

/*
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(){
    addSession();
    renderSessionOnDom(surfer_array[surfer_array.length-1]);
}
/*
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddSession
 */
function handleCancelClick(){
    clearAddSession();
    console.log("hi");
}
/*addSession - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddSession, updateStudentList
 */
function addSession(){
    var session_object = {};
    session_object.location = $('#location').val();
    session_object.size = $('#size').val();
    session_object.direction = $('#swell-direction').val();
    session_object.period =$('#swell-period').val();
    session_object.tide = $('#tide').val();
    session_object.wind = $('#wind').val();
    session_object.rating = $('#rating').val();
    surfer_array.push(session_object);
    updateStudentList(surfer_array);
    clearAddSession();
}
// clearAddSession - clears out the form values based on inputIds variable

function clearAddSession(){
    $('#location').val("");
    $('#size').val("");
    $('#swell-direction').val("");
    $('#swell-period').val("");
    $('#tide').val("");
    $('#wind').val("");
    $('#rating').val("");
    console.log("Cleared");
}
/*
 * renderSessionOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderSessionOnDom(currentSessionObject){
    for (var i=0; i<surfer_array.length; i++) {
        var newSessionRow = $('<tr>');
        var newName = $('<td>').text(surfer_array[i].name);
        var newCourse = $('<td>').text(surfer_array[i].course);
        var newGrade = $('<td>').text(surfer_array[i].grade);
        var deleteContainer = $('<td>');
        var  deleteButton = $('<button>', {
            class: "btn btn-danger btn-md",
            text: "Delete"
        });
        deleteContainer.append(deleteButton);
    }
    $(newSessionRow).append(newName, newCourse, newGrade, deleteContainer);
    $('tbody').append(newSessionRow);
    $('.btn-danger').on('click', function(){
        $(this).closest("tr").remove();
    });

}

/*
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderSessionOnDom, calculateSessionAverage, renderSessionAverage
 */
function updateStudentList(surfer_array){
    $('tbody').empty();
    for (var studentIndex = 0; studentIndex<surfer_array.length; studentIndex++) {
        var currentSessionObject =  surfer_array[studentIndex];
        renderSessionOnDom(currentSessionObject);
    }
    calculateSessionAverage();
    renderSessionAverage();

}
/*
 * calculateSessionAverage - loop through the global surfer array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateSessionAverage(surfer_array){
    var currentGrade = 0;
    for (var gradeIndex = 0; gradeIndex<surfer_array.length; gradeIndex++) {
        var totalGrade = parseFloat(surfer_array[gradeIndex].grade);
        currentGrade += totalGrade;
    }

    var average = currentGrade/surfer_array.length;
    var fixedAvg = average.toFixed(2);
    renderSessionAverage(fixedAvg+'%');
    return fixedAvg;
}
/*
 * renderSessionAverage - updates the on-page grade average
 * @param: {number} average    the session average
 * @returns {undefined} none
 */
function renderSessionAverage(average){
    $(".avgSession").text(average);
}

function fetchData ()
{
    var form = new FormData();
    form.append("api_key", "iGhi4xQLRT");

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://s-apis.learningfuze.com/sgt/get",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function (response) {
        var parseData = JSON.parse(response);
        surfer_array.push(parseData.data);
    });
}