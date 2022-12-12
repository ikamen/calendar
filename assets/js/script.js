// Set the day at the top of the page
var currentDay = moment().format('dddd, Do MMMM');
var dayField = $('#currentDay');
dayField.text(currentDay);

//Check if tasks object already exist in local storage, if not then create it
var tasksStorage = localStorage.getItem('tasks');
if (tasksStorage == null) {
  //create storage
  localStorage.setItem('tasks', JSON.stringify([
    {hour:9, task: ''}, 
    {hour: 10, task: ''}, 
    {hour: 11, task: ''},
    {hour: 12, task: ''},
    {hour: 13, task: ''},
    {hour: 14, task: ''},
    {hour: 15, task: ''},
    {hour: 16, task: ''},
    {hour: 17, task: ''}
    ]));
}

//Get reference to the hours container and add a listener for the Save buttons
var tasksContainer = $('.container');
tasksContainer.on('click', '.saveBtn', function(){
    saveTask($(this));
});

//Read the saved tasks in local storage
var tasksArr = JSON.parse(localStorage.getItem('tasks'));

//Get a reference to the text areas
var hours = $('textarea');

//Iterate through the hours and populate the text and assign colour
hours.each(function(index, value){
    setHourColor($(this));
    setHourText($(this));   
});

//Set colour for each hour
function setHourColor(obj) {
    //Get current hour
    currentHour = moment().hour();
    
    if ($(obj).attr('id') < currentHour) {
        obj.addClass('past');
    } else if ($(obj).attr('id') > currentHour) {
        obj.addClass('future');
    } else {
        obj.addClass('present');
    }
    
}

// Set textarea for each hour with the saved values in local storage
function setHourText(obj) {
    for (var h of tasksArr) {
        if ($(obj).attr('id') == h.hour){
            $(obj).text(h.task);
        };
    }
}

// Save task in local storage
function saveTask(obj) {
    var clickedBtn = $(obj);
    var clickedTextArea = clickedBtn.prev();
    for (var h of tasksArr) {
        if ($(clickedTextArea).attr('id') == h.hour){
            h.task = $(clickedTextArea).val();
            localStorage.setItem('tasks', JSON.stringify(tasksArr));
        };
    }
}
