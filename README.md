# sendx-frontend-IIT2020101
# Link to video : 


This project is in response to the job application of sendX


HOW TO RUN :-
clone the repository in your local system
'Go Live' with the index.html file
NOTE :- make sure you are currently in present folder as paths defined throughout project are absolute



This is a supposedely pixel perfect (to my best) replica of the front-end pages provided in the report as images
I tried to incorpporate all the small details to my best

The project consist of 2 major components HTML ans JAVASCRIPT.
CSS I will ignore for now as nothing intresting going on there


High level Design :-
To my understanding it was a really fancy HTML form with multiple steps
When user clicks on next button the current page is replaces by next page
NOTE :- this is one single html page and not multiple

each page has its own specific functionality

the questions feilds mainly consist of MCQ questions
that I call 'action'...

So made a class in JS to specificcally deal with and manage those which I call 'Groups'
A group consist of option to choose from which I call 'OptionWarpper'

all these are classes specifically deal with corresponding elements in html as to make the code maintainable

Also they contain mostly the same CSS styling for all the 'action' so code dublication is avoided



Another immportant functionality is the updation of progress bar
when user press next button he goes one step fordward
andwhen he presses back the goes one step begind
A lot goes in the backend in doing so and other small things to take care about



The next big thing is server POST request when user submits the form
First all the user inputs are verified if blank spaces then a warning is displayed and
if correct then all the user inputs are extracted dynamically and packed into a JSON object which is sent



The other thing that I want to talk about is Behaviour dropdown...
initially behaviour sectooin is hidden but if user press the down key it expands
again pressing the up key will close the dropdown


And another thing is the dynamic HTML content from API
I try to do it and pretty much did it too but not quite
I wasnt able to display it in the design section as imported HTML was not quite compatible with my design
so I displayed it in  in the 'Content' scetion as a default one
