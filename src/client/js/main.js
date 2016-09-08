(function () {

  console.log('sanity check!');

  $(document).on('click', '.delete-btn', function() {
    const answer = confirm('Are you sure?');
    if (answer) {
      const $this = $(this);
      const wrestlerID = $this.attr('data-id');
      $.ajax({
        type: 'DELETE',
        url: `/wrestlers/delete/${wrestlerID}`
      })
      .done((data) => {
        location.reload();
        console.log(data);
      })
      .fail((err) => {
        console.log(err);
      });
    }
  });

  $(document).on('click', '.update-btn', function() {
    const $this = $(this);
    const wrestlerID = $this.attr('data-id');
    const wrestlerName = $this.attr('data-name');
    const wrestlerFinisher = $this.attr('data-finisher');
    const wrestlerCatchPhrase = $this.attr('data-catchPhrase');
    $('#input-name').val(wrestlerName);
    $('#input-finisher').val(wrestlerFinisher);
    $('#input-catchPhrase').val(wrestlerCatchPhrase);
    $('#input-id').val(wrestlerID);
  });

  $(document).on('submit', '#modal-form', function(e) {
    e.preventDefault();
    const $updatedWrestlerName = $('#input-name').val();
    const $updatedWrestlerFinisher = $('#input-finisher').val();
    const $updatedWrestlerCatchPhrase = $('#input-catchPhrase').val();
    const $wrestlerID = $('#input-id').val();
    const payload = {
      name: $updatedWrestlerName,
      finishing_move: $updatedWrestlerFinisher,
      catch_phrase: $updatedWrestlerCatchPhrase
    };
    $.ajax({
      type: 'PUT',
      url: `/wrestlers/update/${$wrestlerID}`,
      data: payload
    })
    .done((data) => {
      $('#myModal').modal('toggle');
      location.reload();
      console.log(data);
    })
    .fail((err) => {
      console.log(err);
    });
  });

})();
