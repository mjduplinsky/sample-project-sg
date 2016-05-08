$(document).ready(function() {


  var input = $('#file-input');
  var dropArea = $('.file-drop-area');

  // highlight drag area 
  input.on('dragenter focus click', function() {
    dropArea.addClass('is-active');
  });

  // back to normal state
  input.on('dragleave blur drop', function() {
    dropArea.removeClass('is-active');
  });

  // change inner text
  input.on('change', function() {
    $(this).parent().addClass('uploaded');
  });


  
  var imageLoader = document.getElementById('file-input');
  imageLoader.addEventListener('change', handleImage, false);
  var canvas = document.getElementById('user-img');
  var ctx = canvas.getContext('2d');


  function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var img = new Image();

      // Initial image output
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      img.onload = function() {
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
      }

      img.src = event.target.result;

      // Detect crop option
      $('.crop-options input').on('click', function() {
        var cropVal = $(this).val();
        var crop = "croped";
        var noCrop = "nocrop"

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw croped image
        if (cropVal === crop) {

        	// ctx.clearRect(0, 0, canvas.width, canvas.height);

          img.onload = drawImageScaled.bind(null, img, ctx);


          function drawImageScaled(img, ctx) {
            var canvas = ctx.canvas;
            var hRatio = canvas.width / img.width;
            var vRatio = canvas.height / img.height;
            var ratio = Math.min(hRatio, vRatio);
            var centerShift_x = (canvas.width - img.width * ratio) / 2;
            var centerShift_y = (canvas.height - img.height * ratio) / 2;
            var horOffset = (img.width - img.height) / 2;
            var vertOffset = (img.height - img.width) / 2;

            // Crop landsape image
            if (img.width > img.height) {

              ctx.clearRect(0, 0, canvas.width, canvas.height);

              ctx.drawImage(img,
                horOffset, 0,
                img.height, img.height,
                0, 0,
                canvas.width, canvas.height);

              // Crop portrait image
            } else {

              ctx.clearRect(0, 0, canvas.width, canvas.height);

              ctx.drawImage(img,
                0, vertOffset,
                img.width, img.width,
                0, 0,
                canvas.width, canvas.height);
            }

          }

          // Draw original image (No croping)
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          img.onload = function() {
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
          }
        }

        // Output final result
        img.src = event.target.result;


      });

    }
    reader.readAsDataURL(e.target.files[0]);
  }


  // Save image
  var button = document.getElementById('btn-save');
  button.addEventListener('click', function(e) {
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
  });



});
