var canvas = document.getElementById('logo');
      canvas.width = 1000;
	  canvas.height = 750;
	  canvas.style.width = "500px";
	  canvas.style.height = "375px";
      var context = canvas.getContext('2d');
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = 240;
	  
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = '#2b48d3';
      context.fill();
      context.lineWidth = 5;
