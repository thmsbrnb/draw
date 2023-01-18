$(document).ready(function () {
    var device, deviceInner, btnLock, plug, clock, battery;

    device = $(".device");
    deviceInner = device.children(".dvc-inner");
    btnLock = device.children("#btn_lock");
    plug = $(".dvc-plug");
    clock = $(".dvc-time-indicator");
    battery = $(".dvc-battery-indicator");

    // DEVICE
    // -------------------------
    // Lock button :
    btnLock.on("click", function () {
        deviceInner.toggleClass("locked");
    });

    // Time indicator : display and update hour time
    setInterval(function () {
        time = new Date();

        clock.html(
            time.getHours() +
                ":" +
                (time.getMinutes() < 10 ? "0" : "") +
                time.getMinutes()
        );
    }, 2500);

    // Battery animation : handle cable and battery indicator behaviour
    plug.on("click", function () {
        $(this).toggleClass("active");
        battery.toggleClass("active");
    });

    // GAME
    // -------------------------
    var toPlayer, toField, reset, play, backToPlayer;

    toPlayer = $("#to_player");
    toField = $("#to_field");
    reset = $("#reset");
    play = $("#play");
    backToPlayer = $("#back_to_player");

    // Start behaviour
    $(".view-player").hide();
    $(".view-field").hide();

    // Enter
    toPlayer.on("click", function (e) {
        $(".view-home").hide();
        $(".view-player").show();
    });

    // Go to player
    toField.on("click", function (e) {
        $(".view-player").hide();
        $(".view-field").show();

        $(".u-name-1").text($("input:eq(0)").val());
        $(".u-name-2").text($("input:eq(1)").val());

        if ($("input:eq(0)").val() == 0) {
            $(".u-name-1").text("Player #1");
            $(".u-name-2").text("Player #2");
        }
    });

    // Change players
    backToPlayer.on("click", function (e) {
        $(".view-field").hide();
        $(".view-player").show();

        $("input:eq(0)").val("");
        $("input:eq(1)").val("");

        $(".u-name-1").css("color", "rgba(255,255,255,0.95)");
        $(".u-name-2").css("color", "rgba(255,255,255,0.95)");

        countOne = 1;
        $(".u-score-1").text(`Score: 0`);
        countTwo = 1;
        $(".u-score-2").text(`Score: 0`);
        countRound = 2;
        play.text(`Play`);
    });

    // Play
    const diceOne = document.querySelectorAll("img")[0];
    const diceTwo = document.querySelectorAll("img")[1];

    let countOne = 1;
    let countTwo = 1;
    let countRound = 2;

    play.on("click", function (e) {
        const randomOne = Math.floor(Math.random() * 6) + 1;
        const randomTwo = Math.floor(Math.random() * 6) + 1;

        const faceOne = `media/dice_${randomOne}.svg`;
        const faceTwo = `media/dice_${randomTwo}.svg`;

        diceOne.setAttribute("src", faceOne);
        diceTwo.setAttribute("src", faceTwo);

        let countPlays = countRound++;
        play.text(`Round ${countPlays}`);

        $("img:first").fadeOut(50);
        $("img:last").fadeOut(50);
        $("img:first").fadeIn(100);
        $("img:last").fadeIn(100);

        $(".u-name-1").css("color", "rgba(255,255,255,1)");
        $(".u-name-2").css("color", "rgba(255,255,255,1)");

        if (faceOne === faceTwo) {
            $(".u-name-1").fadeOut();
            $(".u-name-1").fadeIn(75);
            $(".u-name-2").fadeOut();
            $(".u-name-2").fadeIn(75);
        } else if (faceOne > faceTwo) {
            $(".u-name-1").css("color", "#d4af37");
            $(".u-name-1").fadeOut();
            $(".u-name-1").fadeIn(75);
            let scoreOne = countOne++;
            $(".u-score-1").text(`Score: ${scoreOne}`);
        } else {
            $(".u-name-2").css("color", "#d4af37");
            $(".u-name-2").fadeOut();
            $(".u-name-2").fadeIn(75);
            let scoreTwo = countTwo++;
            $(".u-score-2").text(`Score: ${scoreTwo}`);
        }
    });

    // Reset
    reset.on("click", function (e) {
        $(".u-name-1").css("color", "rgba(255,255,255,1)");
        $(".u-name-2").css("color", "rgba(255,255,255,1)");

        countOne = 1;
        $(".u-score-1").text(`Score: 0`);
        countTwo = 1;
        $(".u-score-2").text(`Score: 0`);
        countRound = 2;
        play.text(`Play`);
    });
});
