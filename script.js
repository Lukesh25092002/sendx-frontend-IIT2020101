// const fs = require('fs');









/*
The progress bar took very long than expected
It involved lots of small small interlinked elements
Fist hastel wass planning...Second was the weird 'Targeting'-'Behaviour' linking
turns out I got too obsessed with linking part and the radio buttons
could have got off with these a bit easy
also very dependent on the prev-next buttons
all in all pretty complicated thing i.e. has a lot of things going on within
---------------------------------------------------------------------------------------------------------------------------------------------------------
if you are at 'Behaviour' i.e. drop down active
then pressing 'continue' will take you to 'Behaviour' step i.e. 1 step fordward
but if you press 'back' then you go on 'Content' i.e. two step backward, what?
and if you are 'Success' step then pressing back will take to 'Targeting' i.e. 2 stap backwards
proper carefully planning
*/
const progress_mapping = ["Type","Design","Content","Targeting","Behaviour","Success","End"];

let current_progress = 0

const progress_display = document.getElementById("current_step_display");
const progress_bar = document.getElementById("progress_bar");

function refreshProgressBar(){
    for(i=0 ; i<progress_bar.children.length ; i++){
        progress_bar.children[i].setAttribute("style","color: black;");
        progress_bar.children[i].setAttribute("style","opacity: 0.65;");
    }
}

function initiliseProgressBar(){
    refreshProgressBar();
    updateProgressBar();
}

function updateProgressBar(){
    refreshProgressBar();
    for(i=0 ; i<progress_bar.children.length ; i++){
        if(i<2*(current_progress))
            progress_bar.children[i].setAttribute("style","color: var(--primary_foreground);");
        else
            break;
    }

    progress_display.innerHTML = progress_mapping[current_progress];
    if(progress_mapping[current_progress]!="End")
        progress_bar.children[2*(current_progress)].setAttribute("style","opacity: 1;");
}

header = document.querySelector("header");




















function enxiBehaviour() {
    behaviour_advanced_dropdown.children[1].classList.remove("fa-flip-verticle");

    behaviour_advanced_dropdown.parentNode.children[1].classList.add("hidden");
    behaviour_advanced_dropdown.parentNode.children[2].classList.add("hidden");

    behaviour_advanced_dropdown_status = false;
    behaviour_advanced_dropdown.parentElement.classList.remove("hide_endbar");

    current_progress--;
}







body = document.querySelector("body");

function enteringContent(){
    header.classList.add("hidden");

    body.setAttribute("style", "height: 100vh;");
    body.setAttribute("style", "overflow: hidden;");
}

function exitingContent() {
    header.classList.remove("hidden");

    body.setAttribute("style", "height: fit-content");
    // body.setAttribute("style", "overflow: hidden;");
}













next_buttons = document.getElementsByClassName("btn_next");
for(i=0 ; i<next_buttons.length ; i++){
    next_buttons[i].addEventListener("click",function(){
        if(progress_mapping[current_progress]=="Design"){
            enteringContent();
        }
        if(progress_mapping[current_progress]=="Content"){
            exitingContent();
        }



        if(progress_mapping[current_progress]=="Behaviour"){
            enxiBehaviour();
        }


        current_stepId = "step_"+progress_mapping[current_progress];
        current_step = document.getElementById(current_stepId);
        current_step.classList.remove("active_step_window");


        if(progress_mapping[current_progress]=="Targeting")
            current_progress += 2
        else
            current_progress++;
        
        current_stepId = "step_"+progress_mapping[current_progress];
        current_step = document.getElementById(current_stepId);
        current_step.classList.add("active_step_window");

        updateProgressBar();
    });
}

prev_buttons = document.getElementsByClassName("btn_prev");
for(i=0 ; i<prev_buttons.length ; i++){
    prev_buttons[i].addEventListener("click",function(){
        if(progress_mapping[current_progress]=="Targeting"){
            enteringContent();
        }
        if(progress_mapping[current_progress]=="Content"){
            exitingContent();
        }

        if(progress_mapping[current_progress]=="Behaviour"){
            enxiBehaviour();
            enteringContent();
        }

        current_stepId = "step_"+progress_mapping[current_progress];
        current_step = document.getElementById(current_stepId);
        current_step.classList.remove("active_step_window");

        if(progress_mapping[current_progress]=="Success")
            current_progress -= 2;
        else
            current_progress--;

        current_stepId = "step_"+progress_mapping[current_progress];
        current_step = document.getElementById(current_stepId);
        current_step.classList.add("active_step_window");
        
        updateProgressBar();
    });
}

initiliseProgressBar();





























/*
This is prior to what I came up with before 'Group' and 'OptionWrapper' classes
The options of 'Type' step were a bit different from the ones in other steps
so a adjusting this case into the same class won't work
*/
const type_templates = document.getElementsByClassName("type_template");
let type_selection = -1;

for(let i=0 ; i<type_templates.length ; i++){
    type_templates[i].addEventListener("click",function(){
        selectTemplate(i);
        type_selection = i;
    });
}

function unselectTemplate(type_selection){
    type_templates[type_selection].children[0].classList.remove("checkbox_active");
    type_templates[type_selection].classList.remove("template_active");
}

function selectTemplate(templateNumber){
    if(type_selection!=-1)
        unselectTemplate(type_selection);

    type_templates[templateNumber].classList.add("template_active");
    type_templates[templateNumber].children[0].classList.add("checkbox_active");
}







/*
Design selection
I tried very much to integrate the email buildder API
I extracted the html into a file via a dummy project but there were a lot of errors in the process so at the end I couldnt
instead I loaded my made as a created design template in the content phase and loaded it dynamically
*/

// let raw_html = `<div class="u-popup-container">  <div class="u-popup-overlay"></div>        <style type="text/css">    .u-popup-container .u-row {  display: flex;  flex-wrap: nowrap;  margin-left: 0;  margin-right: 0;}.u-popup-container .u-row .u-col {  position: relative;  width: 100%;  padding-right: 0;  padding-left: 0;}.u-popup-container .u-row .u-col.u-col-100 {  flex: 0 0 100%;  max-width: 100%;}@media (max-width: 767px) {  .u-popup-container .u-row:not(.no-stack) {    flex-wrap: wrap;  }  .u-popup-container .u-row:not(.no-stack) .u-col {    flex: 0 0 100% !important;    max-width: 100% !important;  }}.u-popup-container .layout-mobile .u-row:not(.no-stack) {  flex-wrap: wrap;}.u-popup-container .layout-mobile .u-row:not(.no-stack) .u-col {  flex: 0 0 100% !important;  max-width: 100% !important;}.u-popup-container p{margin:0}.u-popup-container .error-field{-webkit-animation-name:shake;animation-name:shake;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.u-popup-container .error-field input,.u-popup-container .error-field textarea{border-color:#a94442!important;color:#a94442!important}.u-popup-container .field-error{padding:5px 10px;font-size:14px;font-weight:700;position:absolute;top:-20px;right:10px}.u-popup-container .field-error:after{top:100%;left:50%;border:solid transparent;content:" ";height:0;width:0;position:absolute;pointer-events:none;border-color:rgba(136,183,213,0);border-top-color:#ebcccc;border-width:5px;margin-left:-5px}.u-popup-container .spinner{margin:0 auto;width:70px;text-align:center}.u-popup-container .spinner>div{width:12px;height:12px;background-color:hsla(0,0%,100%,.5);margin:0 2px;border-radius:100%;display:inline-block;-webkit-animation:sk-bouncedelay 1.4s infinite ease-in-out both;animation:sk-bouncedelay 1.4s infinite ease-in-out both}.u-popup-container .spinner .bounce1{-webkit-animation-delay:-.32s;animation-delay:-.32s}.u-popup-container .spinner .bounce2{-webkit-animation-delay:-.16s;animation-delay:-.16s}@-webkit-keyframes sk-bouncedelay{0%,80%,to{-webkit-transform:scale(0)}40%{-webkit-transform:scale(1)}}@keyframes sk-bouncedelay{0%,80%,to{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes shake{0%,to{-webkit-transform:translateZ(0);transform:translateZ(0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}}@keyframes shake{0%,to{-webkit-transform:translateZ(0);transform:translateZ(0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}}@media (max-width:480px){.u-popup-container .hide-mobile{display:none!important}.u-popup-container .container{max-width:100%!important}}@media (min-width:481px) and (max-width:768px){.u-popup-container .hide-tablet{display:none!important}}@media (min-width:481px){.u-popup-container .hide-desktop{display:none!important}}.u-popup-container .container{width:100%;padding-right:0;padding-left:0;margin-right:auto;margin-left:auto}@media (min-width:576px){.u-popup-container .container{max-width:540px}}@media (min-width:768px){.u-popup-container .container{max-width:720px}}@media (min-width:992px){.u-popup-container .container{max-width:960px}}@media (min-width:1200px){.u-popup-container .container{max-width:1140px}}.u-popup-container a[onclick] {  cursor: pointer;}.u-popup-container a { color: #0000ee; text-decoration: underline; } .u-popup-container { position: absolute; left: 0; right: 0; bottom: 0; top: 0; display: flex; flex-direction: column; } .u-popup-container .u-popup-overlay { position: fixed; left: 0; right: 0; bottom: 0; top: 0; background-color: rgba(0, 0, 0, 0.1); z-index: -1; } .u-popup-container .u-popup-main { width: 100%; max-width: 600px; height: auto; margin: auto; } .u-popup-container .u-popup-header, .u-popup-container .u-popup-footer { position: relative; width: 100%; max-width: 600px; margin: auto; } .u-popup-container .u-popup-content { height: 100%; overflow-y: inherit; } .u-popup-container .u-close-button { position: absolute; top: 0px; right: 0px; display: flex; flex-flow: column nowrap; justify-content: center; align-items: center; margin: 0px; padding: 0px; width: 40px; height: 40px; background-color: #DDDDDD; border: 0; border-radius: 0px; cursor: pointer; z-index: 99; } .u-popup-container .u-close-button .icon-cross { margin: 0; padding: 0; border: 0; background: none; position: relative; width: 20px; height: 20px; } .u-popup-container .u-close-button .icon-cross:before, .u-popup-container .u-close-button .icon-cross:after { content: ""; position: absolute; top: 8px; left: 0; right: 0; height: 3px; background-color: #000000; border-radius: 6px; } .u-popup-container .u-close-button .icon-cross:before { transform: rotate(45deg); } .u-popup-container .u-close-button .icon-cross:after { transform: rotate(-45deg); } #u_content_form_1 button:hover { color: #FFF !important; background-color: #3AAEE0 !important; } #u_content_form_1 input::placeholder { color: #000; opacity: 0.5; }  </style>      <div class="u-popup-main">      <div class="u-popup-header">        <a href="#" onClick="document.querySelector('.u-popup-container').style.display = 'none';" class="u-close-button">    <span class="icon-cross"></span>  </a>    </div>    <div class="u-popup-content">    <div      style="display: flex; flex-direction: column; justify-content: center;color: #ffffff;background-color: #000000;font-family: arial,helvetica,sans-serif; border-radius: 10px;">        <div style="padding: 0px;">    <div class="container" style="max-width: 500px;margin: 0 auto;">      <div class="u-row">        <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">  <div style="width: 100%;padding:0px;">      <div style="overflow-wrap: break-word;padding: 50px 10px 10px;">      <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: arial black,AvenirNext-Heavy,avant garde,arial; font-size: 39px; font-weight: 700;">CAN YOU KEEP A<br />SECRET?</h1>  </div>  </div></div>      </div>    </div>  </div>  <div style="padding: 0px;">    <div class="container" style="max-width: 500px;margin: 0 auto;">      <div class="u-row">        <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">  <div style="width: 100%;padding:0px;">      <div style="overflow-wrap: break-word;padding: 39px 10px 10px;">      <div style="font-size: 16px; line-height: 140%; text-align: center; word-wrap: break-word;">    <p style="line-height: 140%;">Secret sales are only announced</p><p style="line-height: 140%;">to our email suscribers  : )</p>  </div>  </div>  </div></div>      </div>    </div>  </div>  <div style="padding: 0px;">    <div class="container" style="max-width: 500px;margin: 0 auto;">      <div class="u-row">        <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">  <div style="width: 100%;padding:0px;">      <div id="u_content_form_1" style="overflow-wrap: break-word;padding: 10px 10px 80px;">    <div style="text-align:center"><form action="" method="GET" style="display:inline-block;width:100%;box-sizing:border-box" target="_self"><div color="#000" class="sc-jEACwC wZTDr"><div style="padding-bottom:10px"><div style="text-align:left;color:#0f0000;font-size:14px;padding:0px 0px 3px"><label>Email *</label></div><div style="position:relative"><input type="email" required="" name="email" placeholder="Your Email" style="border-top-width:1px;border-top-style:solid;border-top-color:#CCC;border-left-width:1px;border-left-style:solid;border-left-color:#CCC;border-right-width:1px;border-right-style:solid;border-right-color:#CCC;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#CCC;border-radius:0px;padding:10px;color:#000;background-color:#FFF;font-size:12px;width:100%"/></div></div></div><div style="text-align:center"><button type="submit" style="border:none;border-radius:4px;display:inline-block;text-align:center;overflow:hidden;cursor:pointer;text-decoration:none;padding:10px;margin:5px 0px 0px;font-size:14px;width:100%;color:#ffffff;background-color:#fe2b2a">Sign Me Up</button></div></form></div>  </div>  </div></div>      </div>    </div>  </div>    </div>  </div>  </div></div>`;
// structured_html = JSON.parse(raw_html);
// let anamoly_degign = document.getElementById("anamoly_degign");
// anamoly_degign.innerHTML = raw_html;

design_selection = -1;
design_templates = document.querySelectorAll("#step_Design .cell .design_template");
for(let i=0 ; i<design_templates.length ; i++){
    design_templates[i].addEventListener("click",function(){
        design_selection = i;
    });
}
















/*
Configuring the default name of unlayer editor file...
As per the reference image of UI, the files default name was supposed to "New dd mm yyyy time"
But Date.now() returns the month in numerical format so had to convert into s name format
This is the default value and ther can change it later
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
This is just for decoration purpose
the backend functionality of saving is not implemented yet but no need for the current scope of project
*/
const monthname_mapping = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
const date = new Date();

default_filename = `New ${date.getDate()} ${monthname_mapping[date.getMonth()]} ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
const unlayer_filename_display = document.getElementById("unlayer_file_name");
unlayer_filename_display.value = default_filename;





// unlayer.init({
//     id: 'editor',
//     displayMode: 'popup',
//     projectId: 192177
// });


/*
This was a totally new experience to integrate a completely isolated project into out html project
Took a bit time to go though the documentation and all that but got used it finally
*/
let unlayer_mode = "popup";
let unlayer_data;
let unlayer_filename;

const unlayer_editor = unlayer.createEditor({
    id: 'editor',
    projectId: 192177,
    displayMode: unlayer_mode
});




prev_design =
{"counters":{"u_column":3,"u_row":3,"u_content_form":2,"u_content_heading":1,"u_content_text":1},"body":{"id":"XvPy3j57T7","rows":[{"id":"VNgWoeCt8m","cells":[1],"columns":[{"id":"Ao24-XMGox","contents":[{"id":"8pdHqmVdXi","type":"heading","values":{"containerPadding":"35px 10px 10px","anchor":"","headingType":"h1","fontFamily":{"label":"Arial Black","value":"arial black,AvenirNext-Heavy,avant garde,arial","url":"","defaultFont":true,"weights":null},"fontWeight":700,"fontSize":"32px","color":"#fcfcfc","textAlign":"center","lineHeight":"140%","linkStyle":{"inherit":true,"linkColor":"#0000ee","linkHoverColor":"#0000ee","linkUnderline":true,"linkHoverUnderline":true},"displayCondition":null,"_meta":{"htmlID":"u_content_heading_1","htmlClassNames":"u_content_heading"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true,"text":"CAN YOU KEEP A<br />SECRET ?"}}],"values":{"backgroundColor":"","padding":"0px","border":{},"_meta":{"htmlID":"u_column_1","htmlClassNames":"u_column"}}}],"values":{"displayCondition":null,"columns":false,"backgroundColor":"","columnsBackgroundColor":"","backgroundImage":{"url":"","fullWidth":true,"repeat":"no-repeat","size":"custom","position":"center"},"padding":"0px","anchor":"","hideDesktop":false,"_meta":{"htmlID":"u_row_1","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true}},{"id":"iKsqihA4HF","cells":[1],"columns":[{"id":"PLdLirN1c-","contents":[{"id":"rOsJgbQTRD","type":"text","values":{"containerPadding":"30px","anchor":"","fontSize":"16px","color":"#ffffff","textAlign":"center","lineHeight":"140%","linkStyle":{"inherit":true,"linkColor":"#0000ee","linkHoverColor":"#0000ee","linkUnderline":true,"linkHoverUnderline":true},"displayCondition":null,"_meta":{"htmlID":"u_content_text_1","htmlClassNames":"u_content_text"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true,"text":"<p style=\"line-height: 140%;\">Secret sales are only annonced</p>\n<p style=\"line-height: 140%;\">to our email suscribers  : )</p>"}}],"values":{"backgroundColor":"","padding":"0px","border":{},"_meta":{"htmlID":"u_column_3","htmlClassNames":"u_column"}}}],"values":{"displayCondition":null,"columns":false,"backgroundColor":"","columnsBackgroundColor":"","backgroundImage":{"url":"","fullWidth":true,"repeat":"no-repeat","size":"custom","position":"center"},"padding":"0px","hideDesktop":false,"_meta":{"htmlID":"u_row_3","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true}},{"id":"hrUGVj0lJb","cells":[1],"columns":[{"id":"vC0ov3qncO","contents":[{"id":"_bvSuaWDDy","type":"form","values":{"containerPadding":"10px 10px 70px","anchor":"","action":{"method":"GET","target":"_self","url":""},"fields":[{"name":"email","type":"email","label":"Email","placeholder_text":"Enter email here","show_label":true,"required":true}],"fieldBorder":{"borderTopWidth":"1px","borderTopStyle":"solid","borderTopColor":"#CCC","borderLeftWidth":"1px","borderLeftStyle":"solid","borderLeftColor":"#CCC","borderRightWidth":"1px","borderRightStyle":"solid","borderRightColor":"#CCC","borderBottomWidth":"1px","borderBottomStyle":"solid","borderBottomColor":"#CCC"},"fieldBorderRadius":"0px","fieldPadding":"10px","fieldBackgroundColor":"#FFF","fieldColor":"#000","fieldFontSize":"12px","formWidth":{"autoWidth":false,"width":"95%"},"formAlign":"center","fieldDistance":"10px","labelFontSize":"14px","labelColor":"#070000","labelAlign":"left","labelPadding":"0px 0px 3px","buttonText":"Submit","buttonColors":{"color":"#FFF","backgroundColor":"#e03a3a","hoverColor":"#FFF","hoverBackgroundColor":"#3AAEE0"},"buttonAlign":"center","buttonWidth":{"autoWidth":false,"width":"83%"},"buttonFontSize":"14px","buttonBorder":{},"buttonBorderRadius":"4px","buttonPadding":"10px","buttonMargin":"5px 0px 0px","displayCondition":null,"_meta":{"htmlID":"u_content_form_2","htmlClassNames":"u_content_form"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true,"fieldWidth":"100%"}}],"values":{"backgroundColor":"","padding":"0px","border":{},"_meta":{"htmlID":"u_column_2","htmlClassNames":"u_column"}}}],"values":{"displayCondition":null,"columns":false,"backgroundColor":"","columnsBackgroundColor":"","backgroundImage":{"url":"","fullWidth":true,"repeat":"no-repeat","size":"custom","position":"center"},"padding":"0px","hideDesktop":false,"_meta":{"htmlID":"u_row_2","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true}}],"headers":[],"footers":[],"values":{"popupPosition":"center","popupWidth":"600px","popupHeight":"auto","borderRadius":"10px","contentAlign":"center","contentVerticalAlign":"center","contentWidth":"500px","fontFamily":{"label":"Arial","value":"arial,helvetica,sans-serif"},"textColor":"#030000","popupBackgroundColor":"#080000","popupBackgroundImage":{"url":"","fullWidth":true,"repeat":"no-repeat","size":"cover","position":"center"},"popupOverlay_backgroundColor":"rgba(0, 0, 0, 0.1)","popupCloseButton_position":"top-right","popupCloseButton_backgroundColor":"#DDDDDD","popupCloseButton_iconColor":"#000000","popupCloseButton_borderRadius":"0px","popupCloseButton_margin":"0px","popupCloseButton_action":{"name":"close_popup","attrs":{"onClick":"document.querySelector('.u-popup-container').style.display = 'none';"}},"backgroundColor":"#ffffff","backgroundImage":{"url":"","fullWidth":true,"repeat":"no-repeat","size":"custom","position":"center"},"preheaderText":"","linkStyle":{"body":true,"linkColor":"#0000ee","linkHoverColor":"#0000ee","linkUnderline":true,"linkHoverUnderline":true},"_meta":{"htmlID":"u_body","htmlClassNames":"u_body"}}},"schemaVersion":16},
{
counters: {
u_column: 3,
u_row: 3,
u_content_form: 2,
u_content_heading: 1,
u_content_text: 1
},
body: {
id: 'XvPy3j57T7',
rows: [ [Object], [Object], [Object] ],
headers: [],
footers: [],
values: {
popupPosition: 'center',
popupWidth: '600px',
popupHeight: 'auto',
borderRadius: '10px',
contentAlign: 'center',
contentVerticalAlign: 'center',
contentWidth: '500px',
fontFamily: [Object],
textColor: '#030000',
popupBackgroundColor: '#080000',
popupBackgroundImage: [Object],
popupOverlay_backgroundColor: 'rgba(0, 0, 0, 0.1)',
popupCloseButton_position: 'top-right',
popupCloseButton_backgroundColor: '#DDDDDD',
popupCloseButton_iconColor: '#000000',
popupCloseButton_borderRadius: '0px',
popupCloseButton_margin: '0px',
popupCloseButton_action: [Object],
backgroundColor: '#ffffff',
backgroundImage: [Object],
preheaderText: '',
linkStyle: [Object],
_meta: [Object]
}
},
schemaVersion: 16
};

// console.log(prev_design);
unlayer_editor.loadDesign(prev_design);





const btn_unlayer_save = document.querySelector("#step_Content").querySelector(".btn_next");
btn_unlayer_save.addEventListener("click",function(){
    unlayer_filename = unlayer_filename_display.value;
    unlayer_editor.exportHtml(function(data) {
        // data.design , data.html
        unlayer_data = data;

        // save();
    });
});

function save() {
    unlayer_editor.saveDesign(async function(design){
        [handler] = await window.showOpenFilePicker();

        let stream = await handler.createWritable();
        await stream.write(JSON.stringify(design));
        stream.close();
    });
}














/*
This was unnecerrially complicated and created a lot of problems
The 'Targeting' and Behaviou steps were so complicatedely linked together
The 'Behaviour' step was actually the advanges setting drop down
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
The way I simplified was...
If user was as 'Behaviour' step i.e. dropdown was open
ans he pressed any button I will take him to 'Targeting' step first regardless and then process the prev-next by inserting if loops
For the user it would be instantaneous and will be no different from any other step change
a bit of hardcoding I did but there seems no other way but to deal with if we want that functionality so bad
*/
let behaviour_advanced_dropdown_status = false;
const behaviour_advanced_dropdown = document.getElementById("behaviour_advanced_dropdown");
behaviour_advanced_dropdown.addEventListener("click",function(){
    if(behaviour_advanced_dropdown_status==false){
        // we have to open it
        behaviour_advanced_dropdown.children[1].classList.remove("fa-angle-down");
        behaviour_advanced_dropdown.children[1].classList.add("fa-angle-up");

        behaviour_advanced_dropdown.parentNode.children[1].classList.remove("hidden");
        behaviour_advanced_dropdown.parentNode.children[2].classList.remove("hidden");

        behaviour_advanced_dropdown_status = true;

        behaviour_advanced_dropdown.parentElement.classList.add("hide_endbar");
        
        current_progress++;
        updateProgressBar();
    }
    else{
        // close it
        behaviour_advanced_dropdown.children[1].classList.remove("fa-angle-up");
        behaviour_advanced_dropdown.children[1].classList.add("fa-angle-down");

        behaviour_advanced_dropdown.parentNode.children[1].classList.add("hidden");
        behaviour_advanced_dropdown.parentNode.children[2].classList.add("hidden");

        behaviour_advanced_dropdown_status = false;
        // apply the class hidden
        behaviour_advanced_dropdown.parentElement.classList.remove("hide_endbar");

        current_progress--;
        updateProgressBar();
    }
});








/*
This is the implementation of Option Wrapper and Group class
I actually hardcoded a bit for template class
thought I could get away with it but soon it was frustrating so I learnt a bit of OOP in javascript and gave it a try
And will say it was totally worth it! , had I not choosen this approach it would have been impossible to get this far withour quitting
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Each option is structured carefully...
1. disk icon : the disk design at the very left option highlighted when option is selected (mainly decoration)
2. text feilds : the content of the option i.e. what the option is
3. input feilds : some options have input numerical feilds which user has to fill along with selection of that option
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
The optionWrapper class represent the intotal abstract representation of the option_wrapper div element in the HTML
I thought instead of DOM parsing everytime to access it in javascript
why not create a class ---> one time process
will be helpful to create a small class and then just call oneliners
*/
class OptionWrapper {
    wrapper;
    has_feild;
    input_feild;
    checkbox;

    constructor(wrapper){
        this.wrapper = wrapper;
        this.checkbox = wrapper.getElementsByTagName("i")[0];
        this.has_feild = false;
        this.input_feild = undefined;

        let feilds = wrapper.getElementsByTagName("input");
        if(feilds.length>0){
            this.has_feild = true;
            this.input_feild = feilds[0];
        }
    }

    getWrapper() {
        return this.wrapper;
    }

    isSelected() {
        if(this.checkbox.classList.contains("checkbox_active"))
            return true;
        else
            return false;
    }

    select() {
        this.checkbox.classList.add("checkbox_active");
    }

    unselect() {
        this.checkbox.classList.remove("checkbox_active");
    }

    getValue() {
        return this.input_feild.value;
    }

    static parseOption(option_wrapper){
        let result = "";

        let wrapper_contents = option_wrapper.children;
        for(let i=1 ; i<wrapper_contents.length ; i++){    // 0th element is the icon
            let element = wrapper_contents[i];
            let tagname = element.tagName;

            if(tagname=="P")
                result = result + element.innerHTML;
            else if(tagname=="INPUT")
                result = result + element.value;

            if(i!=wrapper_contents.length-1)
                result = result + " ";
        }

        if(result[result.length-1]==' ')
            result.pop();
        return result;
    }
}



/*
The OptionWrapper class was solely created for Group class to use
This class manages the groups i.e. unput production
all the realted custom radio buttons will be grouped together and manages inside this class
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
This class used to contain a few function but I got frustated as a lot of errors came
I only worked OOM in java I was not used syntax of Javascript specifically Object Oriented ones so a lot of errors came
So I just avoided all that and soved each and everything into the constructor itself
...Later I thought why bother to make a class? -> a single function would be enough
But i left it as it was i.e. no energy left
Thankfully it came handy at the time of input extraction
*/
class Group {
    wrapper_collection;   // list of OptionWrapper
    selected_wrapper;          // integer representing the index of selected wrapper

    constructor(option_wrappers) {
        this.selected_wrapper = -1;
        this.wrapper_collection = [];

        for(i=0 ; i<option_wrappers.length ; i++){
            let option_wrapper = new OptionWrapper(option_wrappers[i]);
            this.wrapper_collection.push(option_wrapper);
        }
        
        for(let _i=0 ; _i<this.wrapper_collection.length ; _i++){
            let i = _i;
            
            let option_wrapper = this.wrapper_collection[i];
            this.wrapper_collection[i].wrapper.addEventListener("click",()=>{
                if(this.selected_wrapper!=-1)
                    this.wrapper_collection[this.selected_wrapper].unselect();    // unselect the previous wrapper
                
                // select the new wrapper
                option_wrapper.select();
                this.selected_wrapper = i;
            });
        }
    }

    getSelectionIdx() {
        return this.selected_wrapper;
    }

    getFinalSelection() {
        return this.wrapper_collection[this.selected_wrapper];
    }

    validateSelection() {
        if(this.selected_wrapper==-1)
            return false;
        else if(this.wrapper_collection[this.selected_wrapper].has_feild && this.wrapper_collection[this.selected_wrapper].getValue()=='')
            return false;
        else
            return true;
    }
};






/*
Grouping all the option wrappers so that they act as radio buttons
1. The approach was to extract at step level first i.e. extract each section for each phase
2. then extract all actions from that step i.e. div with class=action , action reprents each question asked to user in the form
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Each action is structured carefully...
1. action_title : The main question that the action is tackling (highlighted)
2. action_description : The elaborate description of the question for better understanding (fainted)
3. option_wrapper : Consists of custom implemented radio (option selection)
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
3. then extract all the option wrapper from that action i.e.
As discussed earlier the 'OptionWrapper' class will be handling option wrapper elements in greate detail
*/

// Groups of 'Targeting' step
temp = document.querySelector("#step_Targeting").querySelectorAll(".action")[0].querySelectorAll(".option_wrapper");
TargetingGroup = new Group(temp);



// Groups of 'Behaviour' step , this stepp has two actions so two groups
temp = document.querySelector("#step_Behaviour").querySelectorAll(".action")[0].querySelectorAll(".option_wrapper");
BehaviourGroup1 = new Group(temp);

temp = document.querySelector("#step_Behaviour").querySelectorAll(".action")[1].querySelectorAll(".option_wrapper");
BehaviourGroup2 = new Group(temp);



// Groups of 'Success' step
temp = document.querySelector("#step_Success").querySelectorAll(".action")[0].querySelectorAll(".option_wrapper");
SuccessGroup = new Group(temp);










/*
This section involved client-server communication
i.e. sending the user responses to the server
we cannot simply send the response to the server we need to verify then first as user can enter garbage invalid ones too
sure server can verify too iff it wants to but it will be nice if we implement verification in client side itself
*/





// This is client side verification of user selected options
function verifyUserOptions() {
    // verify if the options entered by user are good or not
    if(type_selection==-1 || design_selection==-1 || !TargetingGroup.validateSelection() || !BehaviourGroup1.validateSelection() || !BehaviourGroup2.validateSelection() || !SuccessGroup.validateSelection())
        return undefined;

    send_obj = {
        type_selection: document.getElementsByClassName("type_template")[type_selection].querySelector(".template_name").innerHTML,
        design_selection: document.querySelectorAll("#step_Design .cell .design_template")[design_selection].parentElement.querySelector(".template_name").innerHTML,
        unlayer_selection: {
            unlayer_filename: unlayer_filename,
            unlayer_data: {
                html: unlayer_data.html,
                design: unlayer_data.design
            }
        },
        targeting_selection: OptionWrapper.parseOption(TargetingGroup.getFinalSelection().getWrapper()),
        behaviour_selection: {
            optn1: OptionWrapper.parseOption(BehaviourGroup1.getFinalSelection().getWrapper()),
            optn2: OptionWrapper.parseOption(BehaviourGroup2.getFinalSelection().getWrapper()),
        },
        success_selection: OptionWrapper.parseOption(SuccessGroup.getFinalSelection().getWrapper())
    };

    return send_obj;
}


// This function will inform the user if entered invalid options
const warning_dislpay = document.getElementById("invalid_selection");
function invalidUserOptions() {
    let warning_msg = "* Please make sure all the options are selected properly";
    warning_dislpay.innerHTML = warning_msg;
}






// This function will send all the user options via a POST request
btn_finish = document.getElementById("btn_finish");
btn_finish.addEventListener("click",function(){
    send_obj = verifyUserOptions();
    if(send_obj==undefined){
        invalidUserOptions();
        return ;
    }

    current_stepId = "step_"+progress_mapping[current_progress];
    current_step = document.getElementById(current_stepId);
    current_step.classList.remove("active_step_window");

    current_progress++;
    
    current_stepId = "step_"+progress_mapping[current_progress];
    current_step = document.getElementById(current_stepId);
    current_step.classList.add("active_step_window");

    updateProgressBar();

    SERVER_ENDPOINT_URL = "http://localhost/funnel_endpoint";
    fetch(SERVER_ENDPOINT_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(send_obj)
    })
    .then(function(res){
        current_stepId = "step_"+progress_mapping[current_progress];
        current_step = document.getElementById(current_stepId);
        current_step.classList.remove("active_step_window");

        current_progress++;
        
        current_stepId = "step_"+progress_mapping[current_progress];
        current_step = document.getElementById(current_stepId);
        current_step.classList.add("active_step_window");

        updateProgressBar();
    })
    .catch(function(err){
        console.log(err);
        invalidUserOptions();
    });
});