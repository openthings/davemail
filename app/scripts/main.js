'use strict';

(function(){

    window.zxcvbn = zxcvbn;
    window.davemail = new Object();
    davemail.info = 'Davemail 0.0.1 by David Apple https://github.com/davidapple/davemail Donate Bitcoin to 13D3A8PP91MLF5VTBQMH5HG76F42RNRF28';

    davemail.jsonData = $.getJSON('davemail.json', function() {
        console.log('davemail.json loaded confirmation one');
    })
        .done(function() {
            console.log('davemail.json loaded confirmation two');
        })
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log('davemail.json failed to load: ' + err );
        });

    $('#navSignInButton').click(function(event){
        signInPage(event);
    });
    $('#navSignUpButton').click(function(event){
        signUpPage(event);
    });
    $('#navMessagesButton').click(function(event){
        messagesPage(event);
    });
    $('#navSignOutButton').click(function(event){
        signOutPage(event);
        davemail = signOut(davemail);
    });

    davemail.messagesTable = $('#messagesTable').DataTable({
        data: [],
        columns: [
            {title: "Time"},
            {title: "Message"}
        ]
    });

    $('#signInButton').click(function(){

        $('#signInButton').hide();
        $('#signingInLoader').show();

        davemail.password = $('#signInPassword').val();
        davemail.passwordStrength = zxcvbn(davemail.password);

        console.log('Generating RSA key pair...');

        setTimeout(function (){
            davemail.privateKey = cryptico.generateRSAKey(davemail.password, 1536);
            davemail.publicKey = cryptico.publicKeyString(davemail.privateKey);
            console.log(davemail.privateKey);
            console.log(davemail.publicKey);

            _.map(davemail.jsonData.responseJSON.davemail.users, function(num, key){
                if(davemail.publicKey == num.publicKey){
                    $('#usernameHeading').text(key);
                    davemail.username = key;
                }
            });

            $('#signingInLoader').hide();
            $('#signIn').hide();
            $('#signInPassword').val('');

            messagesPage();

            davemail.messages = _.map(davemail.jsonData.responseJSON.davemail.emails, function(num, key){
                var message = cryptico.decrypt(num.cipher, davemail.privateKey);
                if (message.status == 'success'){
                    console.log(message);
                    return [ num.time, message.plaintext ];
                }
            });

            if (!_.isUndefined(davemail.messages[0])){
                davemail.messagesTable.destroy();
                davemail.messagesTable = $('#messagesTable').DataTable({
                    data: davemail.messages,
                    columns: [
                        {title: "Time"},
                        {title: "Message"}
                    ]
                });
            }

        }, 100);

    });

    $('#signUpButton').click(function(){

        davemail.password = $('#signUpPassword').val();
        davemail.passwordStrength = zxcvbn(davemail.password);

        if(davemail.passwordStrength.score > 3){
            $('#passwordWarning').hide();
            console.log('SUCCESS');
        }else{
            $('#passwordWarning').show();
            $('#passwordWarningText').text(davemail.passwordStrength.feedback.warning);
            var passwordSuggestions = $('#passwordSuggestionsText');
            passwordSuggestions.children().remove();
            $.each(davemail.passwordStrength.feedback.suggestions, function(i){
                var p = $('<p/>')
                    .appendTo(passwordSuggestions)
                    .text(davemail.passwordStrength.feedback.suggestions[i])
                    .appendTo(p);
            });
        }
    });

})();
