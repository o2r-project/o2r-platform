(function(){
	'use strict';

	/*
		Directive for displaying different file types.
		This directive checks the mime type attribute of a publication.content.<element> to handle it differently considering its mime type.
		Directive can only be used as Html-Element and expects an attribute o2r-file.
		o2r-file must be an object with at least following attribute:

		{
		path: String
		}

		Example:
		<o2r-display-files o2r-file="{'path': 'foo/bar'}"></o2r-display-files>

		optional attributes:

		{
			size: Integer,
			type: String
		}

		where size is the filesize in bytes and type is the mime type.
	*/
	angular
		.module('starter.o2rSubstituteCandidate', [])
		.directive('o2rSubstituteCandidate', o2rSubstituteCandidate);

	o2rSubstituteCandidate.$inject= ['$log', 'env', 'icons', '$mdDialog', 'httpRequests'];
	function o2rSubstituteCandidate($log, env, icons, $mdDialog, httpRequests){
		return{
			restrict: 'E',
			templateUrl: 'app/o2rSubstituteCandidate/o2rSubstituteCandidate.template.html',
			scope: {
				o2rBase: '=',
				o2rOverlay: '=',
				o2rBaseTitle: '@',
				o2rOverlayTitle: '@',
				o2rBaseId: '@',
				o2rOverlayId: '@'
			},
			link: link
		};

		function link(scope, iElement, attrs){
			var logger = $log.getInstance('SubstituteCtrl');
			var vm = this;

			scope.icons = icons;
			scope.substitutionRows = [{}];
			scope.baseType = "base";
			scope.overlayType = "overlay";

			attrs.$observe('o2rOverlayTitle', function(val_) {
				if(val_ != '') {

					scope.cancel = cancel;
					scope.startSubstitutionUI = startSubstitutionUI;
					scope.selectSubstitutionFiles = selectSubstitutionFiles;
					scope.delDropdown = delDropdown;
					scope.addDropdown = addDropdown;

					function cancel() {
					    scope.substitutionRows = [{}];
							$mdDialog.cancel();
					};

					// TODO: start substitution UI
		       function startSubstitutionUI() {
		          logger.info("initiateSubstitution");
		          logger.debug("initiateSubstitution");

		          if (!Array.isArray(scope.substitutionRows) || scope.substitutionRows == undefined || scope.substitutionRows.length == 0 || !checkForFiles(scope.substitutionRows)) {
		              logger.info("no substitution files choosen");
		              window.alert("please choose files");
		          } else {
		              $mdDialog.hide();
		              logger.info("init substitution");
		              // start substitution

		              let substitutionMetadata = {};
		              let arrayOfSubstitutionObjects = [];

		              substitutionMetadata.base = scope.o2rBaseId;
		              substitutionMetadata.overlay = scope.o2rOverlayId;
		              substitutionMetadata.substitutionFiles = [];

		              for (let i=0; i<scope.substitutionRows.length; i++) {
		                let object_ = {};
		                object_.base = scope.substitutionRows[i].basefile.filePath;
		                object_.overlay = scope.substitutionRows[i].overlayfile.filePath;
		                substitutionMetadata.substitutionFiles.push(object_);
		              }

									cancel();	// close dialog and delete substitutionRows

									logger.debug("substitution with following metadata: %s", JSON.stringify(substitutionMetadata));

		              httpRequests.substitute(substitutionMetadata)
		                .then(function(res){
		                    logger.info(res);
		                    window.alert("substitution finished");
		                })
		                .catch(function(err){
											logger.info(err);
											window.alert("Error while substitution:\n" + err.data.err);
		                });
		          }
		      };
		      // on change of dropdown list
		       function selectSubstitutionFiles(file, type, row) {
		          let i = row.$index;
		          let o2rBaseLength = scope.o2rBase.length;
		          let o2rOverlayLength = scope.o2rOverlay.length;
		          let oldBaseCandidatePosition; // = scope.substitutionRows[i].basefile.uId;
		          let newBaseCandidatePosition;
		          let oldOverlayCandidatePosition; // = scope.substitutionRows[i].overlayfile.uId;
		          let newOverlayCandidatePosition;

		          // change "selected" to TRUE of new file
		          if (type == "base") {
		              newBaseCandidatePosition = file.uId;
		              // change "selected" to FALSE of exchanged file
		              if (scope.substitutionRows[i].basefile != undefined) {
		                  oldBaseCandidatePosition = scope.substitutionRows[i].basefile.uId;
		                  scope.o2rBase[oldBaseCandidatePosition-1].selected = false;
		              }
		              scope.substitutionRows[i].basefile = file;
		              scope.o2rBase[newBaseCandidatePosition-1].selected = true;
		          }
		          if (type == "overlay") {
		              newOverlayCandidatePosition = file.uId;
		              // change "selected" to FALSE of exchanged file
		              if (scope.substitutionRows[i].overlayfile != undefined) {
		                  oldOverlayCandidatePosition = scope.substitutionRows[i].overlayfile.uId;
		                  scope.o2rOverlay[oldOverlayCandidatePosition-1].selected = false;
		              }
		              scope.substitutionRows[i].overlayfile = file;
		              scope.o2rOverlay[newOverlayCandidatePosition-1].selected = true;
		          }
		      };

		      function checkForFiles(array) {
		        // true = contains files , false = no files
		          if (Array.isArray(array)) {
		              for (let i=0; i<array.length; i++) {
		                  if (typeof(array[i].basefile) != "object" || typeof(array[i].overlayfile) != "object") {
		                      return false;
		                  }
		              }
		              return true;
		          }
		          return false;
		      };

		      function delDropdown(row) {
		          var i = row.$index;
		          if (scope.substitutionRows.length <= 1) {
		              // TODO: button in red to warn
		          } else {
		            scope.substitutionRows.splice(i, 1);
		          }
		      };

		      function addDropdown() {
		        if ((scope.substitutionRows.length == scope.o2rBase.length) || (scope.substitutionRows.length == scope.o2rOverlay.length)) {
		          // TODO: button in red to warn
		        } else {
		          scope.substitutionRows.push({});
		        }
		      };

				}
			});

		}


	}
})(window.angular);
