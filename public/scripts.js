const getReservations = () => {
    return $.ajax({
      url: "/api/reservations",
      method: "GET",
    });
  };

  const getAndRenderReservations = () => {
    return getReservations().then(renderReservationList);
  };

const renderReservationList = (reservations) => {
    $("#reservation-list").empty();
    const ReservationArray = [];

    const create$h2 = (text) => {
      const $h2 = $("<h2 class='list-group-item'>");
      const $span = $("<span>").text(text);
      $h2.append($span);
      return $h2;
    };
  
    if (reservations.length === 0) {
        ReservationArray.push(create$h2("There are currently no reservations made."));
    }
  
    reservations.forEach((reservation) => {
      const $li = create$h2(reservation.name)
      ReservationArray.push($li);
    });
  
    $("#reservation-list").append(ReservationArray);
};

$("#add-btn").on("click", function() {
    event.preventDefault();
    var newReservation = {
      name: $("#reservationName").val().trim(),
    };

    $.post("/api/reservations", newReservation)
      .then(function(data) {
        console.log("index.html", data);
        getAndRenderReservations();
      });
});

getAndRenderReservations();