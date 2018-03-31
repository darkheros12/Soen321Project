MoneyView = {

  render: function(data) {
    $('#totalDonations').text("Total: " + data.amount);
  }
};

/*$(function() {
  $(window).load(function() {
    MoneyView.init();
  });
});*/

