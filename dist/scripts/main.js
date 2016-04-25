"use strict";!function(){function e(e){$("#composeToList li").remove();var a=_.map(e.jsonData.responseJSON.davemail.users,function(e,a){return $("<li>").text(a).click(function(s){$("#composeTo").val(a),$("#composeTo").removeClass("invalid"),$("#composePublicKey").val(e.publicKey),$("#composeToListWrapper").hide(),$("#composeSendButton").show()}).appendTo("#composeToList"),a}),s=$("#composeTo"),n=$("input#clearfilter");$("#composeToList").listfilter({filter:s,clearlink:n,alternate:!0,alternateclass:"other"}),$("#composeTo").keyup(function(){$("#composeTo").val().length>0?($("#composeToListWrapper").show(),0==$("#composeToList li:visible").length&&$("#composeToListWrapper").hide(),-1==_.indexOf(a,$("#composeTo").val())?($("#composePublicKey").val(""),$("#composeSendButton").hide()):($("#composePublicKey").val(e.jsonData.responseJSON.davemail.users[$("#composeTo").val()].publicKey),$("#composeSendButton").show())):$("#composeToListWrapper").hide()}).focusout(function(){setTimeout(function(){-1==_.indexOf(a,$("#composeTo").val())?$("#composeTo").addClass("invalid"):($("#composeTo").removeClass("invalid"),$("#composeToListWrapper").hide())},10)}),$("#composePublicKeyButton").click(function(){$(this).prop("checked")?$("#composeShowPublicKey").show():$("#composeShowPublicKey").hide()})}function a(e){_.isObject(e)&&e.preventDefault(),$("#importDavemail").show(),$("nav").hide(),$("#signIn").hide(),$("#signUp").hide(),$("#messages").hide(),$("#signUpReplace").hide(),$("#navSignInButton").parent().removeClass("active"),$("#navSignUpButton").parent().removeClass("active"),$("#navMessagesButton").parent().removeClass("active")}function s(e){_.isObject(e)&&e.preventDefault(),$("#signIn").show(),$("#signUp").hide(),$("#messages").hide(),$("#signUpReplace").hide(),$("#navSignInButton").parent().addClass("active"),$("#navSignUpButton").parent().removeClass("active"),$("#navMessagesButton").parent().removeClass("active")}function n(e){_.isObject(e)&&e.preventDefault(),$("#signUp").show(),$("#signIn").hide(),$("#messages").hide(),$("#navSignUpButton").parent().addClass("active"),$("#navSignInButton").parent().removeClass("active"),$("#navMessagesButton").parent().removeClass("active")}function o(e){_.isObject(e)&&e.preventDefault(),$("#messages").show(),$("#compose").hide(),$("#signIn").hide(),$("#signUp").hide(),$("#signUpReplace").hide(),$("#navMessagesButton").show(),$("#navMessagesButton").parent().addClass("active"),$("#navComposeButton").show(),$("#navComposeButton").parent().removeClass("active"),$("#navSignInButton").parent().removeClass("active"),$("#navSignUpButton").parent().removeClass("active"),$("#navSignOutButton").show(),$("#navSignInButton").hide(),$("#navSignUpButton").hide(),$(".jumbotron").hide()}function i(e){_.isObject(e)&&e.preventDefault(),$("#messages").hide(),$("#compose").show(),$("#signIn").hide(),$("#signUp").hide(),$("#signUpReplace").hide(),$("#navMessagesButton").show(),$("#navMessagesButton").parent().removeClass("active"),$("#navComposeButton").show(),$("#navComposeButton").parent().addClass("active"),$("#navSignInButton").parent().removeClass("active"),$("#navSignUpButton").parent().removeClass("active"),$("#navSignOutButton").show(),$("#navSignInButton").hide(),$("#navSignUpButton").hide(),$(".jumbotron").hide()}function t(e){_.isObject(e)&&e.preventDefault(),$("#signIn").show(),$("#signInButton").show(),$("#messages").hide(),$("#compose").hide(),$("#signUp").hide(),$("#signUpReplace").hide(),$("#navComposeButton").hide(),$("#navMessagesButton").hide(),$("#navSignInButton").parent().addClass("active"),$("#navComposeButton").parent().removeClass("active"),$("#navMessagesButton").parent().removeClass("active"),$("#navSignUpButton").parent().removeClass("active"),$("#navSignInButton").show(),$("#navSignUpButton").show(),$("#navSignOutButton").hide(),$("#composeTo").val(""),$("#composeTo").removeClass("invalid"),$("#composePublicKey").val(""),$("#composeShowPublicKey").hide(),$("#composePublicKeyButton").attr("checked",!1),$(".jumbotron").show()}function l(e){return e.messagesTable.destroy(),e.messagesTable=$("#messagesTable").DataTable({data:[],ordering:!1,columns:[{title:"Message"},{title:"Time"}]}),e.username=void 0,e.password=void 0,e.passwordStrength=void 0,e.publicKey=void 0,e.privateKey=void 0,e.messages=void 0,e}function r(e){return e.privateKey=cryptico.generateRSAKey(e.password,1536),e.publicKey=cryptico.publicKeyString(e.privateKey),console.log(e.privateKey),console.log(e.publicKey),e}function d(){var e=cryptico.encrypt($("#composeMessage").val(),$("#composePublicKey").val());return e}function p(e){return e.decryptedMessages=new Array,_.map(e.jsonData.responseJSON.davemail.emails,function(a,s){var n=cryptico.decrypt(a.cipher,e.privateKey);if("success"==n.status){var o=moment(a.time).format("MMM Do YY");return e.decryptedMessages.push([n.plaintext,o]),[n.plaintext,o]}})}function c(e){_.isUndefined(e.decryptedMessages[0])||(e.messagesTable.destroy(),e.messagesTable=$("#messagesTable").DataTable({data:e.decryptedMessages,ordering:!1,columns:[{title:"Message"},{title:"Time"}]}))}window.davemail=new Object,davemail.info="Davemail 1.0.0 by David Apple https://github.com/davidapple/davemail Donate Bitcoin to 13D3A8PP91MLF5VTBQMH5HG76F42RNRF28",a(),$(document).on("change","#importDavemailFile",function(e){var a=new FileReader;$("#importDavemailButton").hide(),$("#importingLoader").show(),a.onload=function(e){console.log("davemail.json loaded confirmation one");var a=JSON.parse(e.target.result);davemail.jsonData=new Object,davemail.jsonData.responseJSON=a,$("nav").show(),$("#signIn").show(),$("#importDavemail").hide()},a.readAsText(e.target.files[0])}),$(document).on("click","#createDavemailButton",function(e){$("#createDavemailButton").hide(),$("#creatingLoader").show(),davemail.jsonData=new Object,davemail.jsonData.responseJSON=new Object,davemail.jsonData.responseJSON={davemail:{users:{},emails:[],servers:[]}},$("nav").show(),$("#signIn").show(),$("#importDavemail").hide()}),$("#navSignInButton").click(function(e){s(e)}),$("#navSignUpButton").click(function(e){n(e)}),$("#navMessagesButton").click(function(e){o(e)}),$("#navComposeButton").click(function(e){i(e)}),$("#navSignOutButton").click(function(e){t(e),davemail=l(davemail)}),$("#signUpButtonOnSignIn").click(function(e){n(e)}),davemail.messagesTable=$("#messagesTable").DataTable({data:[],ordering:!1,columns:[{title:"Message"},{title:"Time"}]}),$("#signInButton").click(function(){$("#signInButton").hide(),$("#signingInLoader").show(),davemail.password=$("#signInPassword").val(),davemail.passwordStrength=zxcvbn(davemail.password),davemail.passwordStrength.score<4?setTimeout(function(){$("#passwordWarningSignIn").show(),$("#signInButton").show(),$("#signingInLoader").hide()},100):setTimeout(function(){davemail=r(davemail),_.map(davemail.jsonData.responseJSON.davemail.users,function(e,a){davemail.publicKey==e.publicKey&&($("#usernameHeading").text(a),davemail.username=a)}),$("#signingInLoader").hide(),$("#signIn").hide(),$("#signInPassword").val(""),o(),davemail.messages=p(davemail),c(davemail),e(davemail)},10)}),$("#signUpButton").click(function(){if($("#signUpUsername").val($("#signUpUsername").val().toLowerCase()),davemail.username=$("#signUpUsername").val(),davemail.password=$("#signUpPassword").val(),davemail.passwordStrength=zxcvbn(davemail.password),$("#usernameTakenWarning").hide(),$("#passwordWarning").hide(),davemail.username.length>0){$("#usernameEmptyWarning").hide();var a=_.map(davemail.jsonData.responseJSON.davemail.users,function(e,a){return davemail.username==a.toLowerCase()});_.contains(a,!0)?($("#usernameTakenWarning").show(),$("#passwordWarning").hide(),a=!0):a=!1;var s=/^[a-z0-9]*$/.test(davemail.username);if(s?$("#usernameIllegalWarning").hide():$("#usernameIllegalWarning").show(),s&&!a&&davemail.passwordStrength.score>3)$("#passwordWarning").hide(),$("#signUpButton").hide(),$("#signingUpLoader").show(),setTimeout(function(){davemail=r(davemail);var a=davemail.jsonData.responseJSON.davemail.users,s=davemail.jsonData.responseJSON.davemail.emails,n=davemail.jsonData.responseJSON.davemail.servers;a[davemail.username]={publicKey:davemail.publicKey},davemail.jsonData.responseJSON={davemail:{users:a,emails:s,servers:n}},$("#signUpJson").text(JSON.stringify(davemail.jsonData.responseJSON,null,4));var o="text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(davemail.jsonData.responseJSON,null,4));$("#signUpUsername").val(""),$("#signUpPassword").val(""),$("#signUp").hide(),$("#signUpReplace").show(),$('<a id="signUpReplaceDownload" class="btn btn-primary tailor-paisley" href="data:'+o+'" download="davemail.json">Download</a>').appendTo("#signUpDownload"),e(davemail)},100);else{davemail.passwordStrength.score<4&&$("#passwordWarning").show(),$("#passwordWarningText").text(davemail.passwordStrength.feedback.warning);var n=$("#passwordSuggestionsText");n.children().remove(),$.each(davemail.passwordStrength.feedback.suggestions,function(e){var a=$("<p/>").appendTo(n).text(davemail.passwordStrength.feedback.suggestions[e]).appendTo(a)})}}else $("#usernameEmptyWarning").show()}),$("#composeSendButton").click(function(){if(davemail.jsonData.responseJSON.davemail.users[$("#composeTo").val()].publicKey==$("#composePublicKey").val()){$(this).hide(),$("#sendingLoader").show();var e=d();console.log(e),"success"==e.status&&setTimeout(function(){$("#composeTo").val(""),$("#composePublicKey").val(""),$("#composeMessage").val(""),$("#sendingLoader").hide(),$("#compose").hide(),$("#signUpReplace").show();var a=new Date,s=davemail.jsonData.responseJSON.davemail.users,n=davemail.jsonData.responseJSON.davemail.emails,o=davemail.jsonData.responseJSON.davemail.servers;n.push({time:a.toISOString(),cipher:e.cipher}),davemail.jsonData.responseJSON={davemail:{users:s,emails:n,servers:o}},$("#signUpJson").text(JSON.stringify(davemail.jsonData.responseJSON,null,4));var i="text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(davemail.jsonData.responseJSON,null,4));$('<a id="signUpReplaceDownload" class="btn btn-primary tailor-paisley" href="data:'+i+'" download="davemail.json">Download</a>').appendTo("#signUpDownload")},100)}else console.log("fail")}),$("#fileReplacedButton").click(function(){$("#fileReplacedButton").hide(),$("#fileReplacedLoader").show(),setTimeout(function(){$("#signUpReplaceDownload").remove(),$("#signUpButton").show(),$("#signingUpLoader").hide(),$("#fileReplacedButton").show(),$("#fileReplacedLoader").hide(),$("#usernameHeading").text(davemail.username),o(),davemail.messages=p(davemail),c(davemail)},500)})}();