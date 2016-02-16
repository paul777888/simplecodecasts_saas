/*global Stripe*/

$(document).ready(function(){
   Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
   //watch for a form submission:
   $("#form-submit-btn").click(function(event){
       event.preventDefault();//prevent default behavior of clicking a submit button in the form is submit to server
       $('input[type=submit]').prop('disabled',true);//disable the button to prevent ppl to click btn twice, or three times
       var error =false;
       var ccNum = $('#card_number').val();
        var   cvcNum = $('#card_code').val();
        var   expMonth = $('#card_month').val();
        var   expYear = $('#card_year').val();
        
       if (!error){
           //Get the Stipe token:
           Stripe.createToken({
              number:ccNum,
              cvc:cvcNum,
              exp_month:expMonth,
              exp_year:expYear
           },stripeResponseHandler);
       }
       return false;
   }); //form submission
   
   function stripeResponseHandler(status,response){
       //Get a reference to the form:
       var f=$("#new_user");
       
       //Get the token from the response:
       var token = response.id;
       
       //Add the token to the form:
       f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');
       
       //submit the form:
       f.get(0).submit();
   }
});