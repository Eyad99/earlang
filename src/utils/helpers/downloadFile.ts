// const downloadFile = (fileUrl:string) => {
//  	const link = document.createElement("a");
// 	link.href = fileUrl;

// 	link.setAttribute("download", "");

// 	link.style.display = "none";

// 	document.body.appendChild(link);

// 	link.click();

// 	document.body.removeChild(link);
//  };
// export default downloadFile;


const downloadFile = (fileUrl: string) => {
	const img = new Image();
	img.crossOrigin = "anonymous"; // Handle CORS if necessary
	img.src = fileUrl;
  
	// Wait for the image to load
	img.onload = () => {
	  const canvas = document.createElement("canvas");
	  const ctx = canvas.getContext("2d");
  
	  if (!ctx) return;
  
	  // Set canvas size to match the image size
	  canvas.width = img.width;
	  canvas.height = img.height;
  
	  // Fill the canvas background with white
	  ctx.fillStyle = "white";
	  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
	  // Draw the image on top of the white background
	  ctx.drawImage(img, 0, 0);
  
	  // Convert the canvas to a PNG image URL
	  const dataUrl = canvas.toDataURL("image/png");
  
	  // Create an anchor element for download
	  const link = document.createElement("a");
	  link.href = dataUrl;
	  link.setAttribute("download", "image_with_background.png"); // Set download filename
	  link.style.display = "none";
  
	  // Append the link to the document and trigger the download
	  document.body.appendChild(link);
	  link.click();
  
	  // Clean up
	  document.body.removeChild(link);
	};
  
	// Handle errors if the image fails to load
	img.onerror = () => {
	  console.error("Failed to load the image.");
	};
  };
  
  export default downloadFile;
  

//   const downloadFileWithWatermark = (fileUrl: string, watermarkText: string) => {
// 	const img = new Image();
// 	img.crossOrigin = "anonymous"; // Handle CORS if necessary
// 	img.src = fileUrl;
  
// 	// Wait for the image to load
// 	img.onload = () => {
// 	  const canvas = document.createElement("canvas");
// 	  const ctx = canvas.getContext("2d");
  
// 	  if (!ctx) return;
  
// 	  // Set canvas size to match the image size
// 	  canvas.width = img.width;
// 	  canvas.height = img.height;
  
// 	  // Fill the canvas background with white
// 	  ctx.fillStyle = "white";
// 	  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
// 	  // Draw the image on top of the white background
// 	  ctx.drawImage(img, 0, 0);
  
// 	  // Add watermark text
// 	  ctx.font = "bold 48px Arial"; // Set the font style for the watermark
// 	  ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // White with 50% opacity
// 	  ctx.textAlign = "center"; // Center align
// 	  ctx.textBaseline = "middle"; // Middle align
  
// 	  // Position the watermark in the center of the image
// 	  ctx.fillText(watermarkText, canvas.width / 2, canvas.height / 2);
  
// 	  // Convert the canvas to a PNG image URL
// 	  const dataUrl = canvas.toDataURL("image/png");
  
// 	  // Create an anchor element for download
// 	  const link = document.createElement("a");
// 	  link.href = dataUrl;
// 	  link.setAttribute("download", "image_with_watermark.png"); // Set download filename
// 	  link.style.display = "none";
  
// 	  // Append the link to the document and trigger the download
// 	  document.body.appendChild(link);
// 	  link.click();
  
// 	  // Clean up
// 	  document.body.removeChild(link);
// 	};
  
// 	// Handle errors if the image fails to load
// 	img.onerror = () => {
// 	  console.error("Failed to load the image.");
// 	};
//   };
  
//   export default downloadFileWithWatermark;
  