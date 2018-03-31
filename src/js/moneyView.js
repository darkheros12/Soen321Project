MoneyView = {

  render: function(data) {
    $('#totalDonations').text("Total: " + data.amount);
  }
};

$("#donateButton").click(function(){
  $("#amountToDonate").val('');
});

$("#spendButton").click(function(){
  $("#amountToSpend").val('');
});


/*$(function() {
  $(window).load(function() {
    MoneyView.init();
  });
});*/

