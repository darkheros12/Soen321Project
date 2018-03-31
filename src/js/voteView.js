VoteView = {

  renderOngoingVotes: function(data) {
    /*
    render data
    */
  },

  renderCreateVotes: function(data) {
    var accnts = '';
    for(var x=0; x<data.length; x++) {
      var locAccnt = "<label id=\"accnt"+x+"\" value=\""+data[x]+"\">"+data[x]+"</label><br/>";
      var locReason = "<label>Reason</label><input type=\"text\" id=\"reason"+x+"\"></input><br/>";
      var locBlkUnBlk = "<label>Block=1, else whatever</label><input type=\"number\" id=\"blockUnblock"+x+"\"></input><br/>";
      var locBtn = "<button onclick=\"VoteController.newVoteSubmit("+x+");\">Submit</button><br/><br/>"
      accnts += locAccnt + locReason + locBlkUnBlk + locBtn;
    }

    $('#createVotingFor').html(accnts);
  }
};

