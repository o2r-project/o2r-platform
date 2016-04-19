app.factory("pdf_files", function(){
	var options = {
		pdfOpenParams: {
			navpanes: 0,
			toolbar: 0,
			statusbar: 0,
			view: "FitV",
			pagemode: "thumbs",
			page: 2
		}
	};
	
	var show = function(url){
		PDFObject.embed(url, "#pdf", options);	
	};	
	
	return {
		showPDF: show
	};
});