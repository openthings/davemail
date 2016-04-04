function signInPage(event){
    if(_.isObject(event)){
        event.preventDefault();
    }
    $('#signIn').show();
    $('#signUp').hide();
    $('#messages').hide();
    $('#navSignInButton').parent().addClass('active');
    $('#navSignUpButton').parent().removeClass('active');
    $('#navMessagesButton').parent().removeClass('active');
}
function signUpPage(event){
    if(_.isObject(event)){
        event.preventDefault();
    }
    $('#signUp').show();
    $('#signIn').hide();
    $('#messages').hide();
    $('#navSignUpButton').parent().addClass('active');
    $('#navSignInButton').parent().removeClass('active');
    $('#navMessagesButton').parent().removeClass('active');
}
function messagesPage(event){
    if(_.isObject(event)){
        event.preventDefault();
    }
    $('#messages').show();
    $('#signIn').hide();
    $('#signUp').hide();
    $('#navMessagesButton').show();
    $('#navMessagesButton').parent().addClass('active');
    $('#navSignInButton').parent().removeClass('active');
    $('#navSignUpButton').parent().removeClass('active');
    $('#navSignOutButton').show();
    $('#navSignInButton').hide();
    $('#navSignUpButton').hide();
}
function signOutPage(event){
    if(_.isObject(event)){
        event.preventDefault();
    }
    $('#signIn').show();
    $('#signInButton').show();
    $('#messages').hide();
    $('#signUp').hide();
    $('#navMessagesButton').hide();
    $('#navSignInButton').parent().addClass('active');
    $('#navMessagesButton').parent().removeClass('active');
    $('#navSignUpButton').parent().removeClass('active');
    $('#navSignInButton').show();
    $('#navSignUpButton').show();
    $('#navSignOutButton').hide();
}
function signOut(davemail){
    davemail.messagesTable.destroy();
    davemail.messagesTable = $('#messagesTable').DataTable({
        data: [],
        columns: [
            {title: "Time"},
            {title: "Message"}
        ]
    });
    davemail.username = undefined;
    davemail.password = undefined;
    davemail.passwordStrength = undefined;
    davemail.publicKey = undefined;
    davemail.privateKey = undefined;
    davemail.messages = undefined;
    return davemail;
}
