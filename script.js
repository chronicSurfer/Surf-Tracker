/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.  
 */
/***********************
 * surfer_array - global array to hold student objects
 * @type {Array}
 * example of surfer_array after input: 
 * surfer_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */

var surfer_array = [];


/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
    addClickHandlersToElements();

}

/***************************************************************************************************
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

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(){
    addStudent();
    renderStudentOnDom(surfer_array[surfer_array.length-1])

}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
    clearAddStudentFormInputs();
    console.log("hi");
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(){
    var student_object = {};
    student_object.name = $('#studentName').val();
    student_object.course = $('#course').val();
    student_object.grade = $('#studentGrade').val();
    surfer_array.push(student_object);
    updateStudentList(surfer_array);
    clearAddStudentFormInputs();
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
    $('#studentName').val("");
    $('#course').val("");
    $('#studentGrade').val("");

}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(currentStudentObject){
    for (var i=0; i<surfer_array.length; i++) {
        var newStudentRow = $('<tr>');
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
    $(newStudentRow).append(newName, newCourse, newGrade, deleteContainer);
    $('tbody').append(newStudentRow);
    $('.btn-danger').on('click', function(){
        $(this).closest("tr").remove();
    });

}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(surfer_array){
    $('tbody').empty();
    for (var studentIndex = 0; studentIndex<surfer_array.length; studentIndex++) {
        var currentStudentObject =  surfer_array[studentIndex];
        renderStudentOnDom(currentStudentObject);
    }
    calculateGradeAverage();
    renderGradeAverage();

}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(studentArray){
    var currentGrade = 0;
    for (var gradeIndex = 0; gradeIndex<surfer_array.length; gradeIndex++) {
        var totalGrade = parseFloat(surfer_array[gradeIndex].grade);
        currentGrade += totalGrade;
    }

    var average = currentGrade/surfer_array.length;
    var fixedAvg = average.toFixed(2);
    renderGradeAverage(fixedAvg+'%');
    return fixedAvg;
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(average){
    $(".avgGrade").text(average);
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