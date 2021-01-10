//----typewriter----
var i = 0,
  a = 0,
  isBackspacing = false,
  isParagraph = false;
// Typerwrite text content. Use a pipe to indicate the start of the second line "|".
var textArray = ["محمد رجب توفيق", "مصمم مواقع محترف", "عاشق للبرمجة والتصميم"];
var speedForward = 200, //Typing Speed
  speedWait = 1000, // Wait between typing and backspacing
  speedBetweenLines = 1000, //Wait between first and second lines
  speedBackspace = 25; //Backspace Speed
//Run the loop
typeWriter("typewriter", textArray);
function typeWriter(id, ar) {
  var element = $("#" + id),
    aString = ar[a],
    eHeader = element.children("h1"), //Header element
    eParagraph = element.children("p"); //Subheader element

  // Determine if animation should be typing or backspacing
  if (!isBackspacing) {
    // If full string hasn't yet been typed out, continue typing
    if (i < aString.length) {
      // If character about to be typed is a pipe, switch to second line and continue.
      if (aString.charAt(i) == "|") {
        isParagraph = true;
        eHeader.removeClass("cursor");
        eParagraph.addClass("cursor");
        i++;
        setTimeout(function() {
          typeWriter(id, ar);
        }, speedBetweenLines);

        // If character isn't a pipe, continue typing.
      } else {
        // Type header or subheader depending on whether pipe has been detected
        if (!isParagraph) {
          eHeader.text(eHeader.text() + aString.charAt(i));
        } else {
          eParagraph.text(eParagraph.text() + aString.charAt(i));
        }
        i++;
        setTimeout(function() {
          typeWriter(id, ar);
        }, speedForward);
      }

      // If full string has been typed, switch to backspace mode.
    } else if (i == aString.length) {
      isBackspacing = true;
      setTimeout(function() {
        typeWriter(id, ar);
      }, speedWait);
    }

    // If backspacing is enabled
  } else {
    // If either the header or the paragraph still has text, continue backspacing
    if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
      // If paragraph still has text, continue erasing, otherwise switch to the header.
      if (eParagraph.text().length > 0) {
        eParagraph.text(
          eParagraph.text().substring(0, eParagraph.text().length - 1)
        );
      } else if (eHeader.text().length > 0) {
        eParagraph.removeClass("cursor");
        eHeader.addClass("cursor");
        eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
      }
      setTimeout(function() {
        typeWriter(id, ar);
      }, speedBackspace);

      // If neither head or paragraph still has text, switch to next quote in array and start typing.
    } else {
      isBackspacing = false;
      i = 0;
      isParagraph = false;
      a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
      setTimeout(function() {
        typeWriter(id, ar);
      }, 50);
    }
  }
}

//----smooth scroll----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});


//----slide up----
$(document).ready(function() {
  $(window).scroll(function() {
    $(".slide").each(function() {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      if (bottom_of_window > bottom_of_object) {
        $(this).animate({ "margin-right": 0 }, 500);
      }
    });
    $(".fade").each(function() {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      if (bottom_of_window > bottom_of_object) {
        $(this).animate({ opacity: 1 }, 1000);
      }
    });
  });
});

//----go top----
$(document).ready(function() {
  var scrollTop = $(".go-top");
  $(window).scroll(function() {
    var topPos = $(this).scrollTop();
    if (topPos == 0) {
      $(scrollTop).css('margin-bottom', -200);
      $(scrollTop).css("opacity", "0");
    } else {
      $(scrollTop).animate({'margin-bottom': 0}, 500);
      $(scrollTop).css("opacity", "1");
    }
  });
  $(scrollTop).click(function() {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      2000
    );
    return false;
  });
  $('#homeLink').click(function() {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      1000
    );
    return false;
  });
});

//----form validation----
$("form").submit(function(event) {
  if ($("#formName").val() == "") {
    $(".formName")
      .text("اكتب الاسم")
      .fadeIn();
    event.preventDefault();
  } else if ($("#formEmail").val() == "") {
    $(".formName").text("");
    $(".formEmail")
      .text("اكتب الايميل")
      .fadeIn();
    event.preventDefault();
  } else if ($("#formMessage").val() == "") {
    $(".formEmail").text("");
    $(".formMessage")
      .text("اكتب رسالتك")
      .fadeIn();
    event.preventDefault();
  } else {
    $(".formMessage")
      .text("تم إرسال رسالتك")
      .show()
      .fadeOut(1000);
    event.preventDefault();
    return;
  }
});
