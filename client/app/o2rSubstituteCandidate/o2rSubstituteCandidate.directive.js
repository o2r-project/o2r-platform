(function(){
	'use strict';

	/*
		Directive for candidate view.
		This directive checks the mime type attribute of a publication.content.<element> to handle it differently considering its mime type.
		Directive can only be used as Html-Element and expects attributes o2r-base, o2r-overlay, o2r-base-title, o2r-overlay-title, o2r-base-id, o2r-overlay-id.
		o2r-base-title, o2r-overlay-title, o2r-base-id, o2r-overlay-id must be a String.
		o2r-base and o2r-overlay must be an array with at least one object with following attribute:

		[
			{
				fileName: String
				filePath: String
				uId: Number
			}
		]

		Example:
		<o2r-substitute-candidate o2r-base="[{fileName: 'foo', filePath: 'bar', uId: '1'}]" o2r-overlay="[{fileName: 'foo', filePath: 'bar', uId: '1'}]" o2r-base-title="{{'foobar'}}" o2r-overlay-title="{{'barfoo'}}" o2r-base-id="{{'foo'}}" o2r-overlay-id="{{'bar'}}"></o2r-substitute-candidate>
	*/
	angular
		.module('starter.o2rSubstituteCandidate', [])
		.directive('o2rSubstituteCandidate', o2rSubstituteCandidate);

	o2rSubstituteCandidate.$inject= ['$log', 'env', 'icons', '$mdDialog', 'httpRequests', '$location', '$window'];
	function o2rSubstituteCandidate($log, env, icons, $mdDialog, httpRequests, $location, $window){
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
			scope.substituted = {};
			scope.finishedSubstitution = false;

			attrs.$observe('o2rOverlayTitle', function(val_) {
				if(val_ != '') {

					scope.cancel = cancel;
					scope.startSubstitutionUI = startSubstitutionUI;
					scope.showSubstitutedERC = showSubstitutedERC;
					scope.selectSubstitutionFiles = selectSubstitutionFiles;
					scope.delDropdown = delDropdown;
					scope.addDropdown = addDropdown;
					scope.magnifyFiles = magnifyFiles;
					scope.metadata = {};
					scope.metadata.selected = 'keepBase';
					scope.metadata.data = [
							{label: 'keep metadata of base ERC', value: 'keepBase'},
							{label: 'extract metadata of new ERC', value: 'extract', isDisabled: true},
							{label: 'extract and merge metadata for new ERC', value: 'extractAndMerge', isDisabled: true}
					];

					function cancel() {
					    scope.substitutionRows = [{}];
							$mdDialog.cancel();
					};

		       function startSubstitutionUI() {

		          if (!Array.isArray(scope.substitutionRows) || scope.substitutionRows == undefined || scope.substitutionRows.length == 0 || !checkForFiles(scope.substitutionRows)) {
		              logger.info("no substitution files choosen");
		              window.alert("please choose files");
		          } else {
		 		          logger.info("initiateSubstitution");
		 		          logger.debug("initiateSubstitution");

		              let substitutionMetadata = {};
		              let arrayOfSubstitutionObjects = [];

		              substitutionMetadata.metadataHandling = scope.metadata.selected;
		              substitutionMetadata.base = scope.o2rBaseId;
		              substitutionMetadata.overlay = scope.o2rOverlayId;
		              substitutionMetadata.substitutionFiles = [];

		              for (let i=0; i<scope.substitutionRows.length; i++) {
		                let object_ = {};
		                object_.base = scope.substitutionRows[i].basefile.filePath;
		                object_.overlay = scope.substitutionRows[i].overlayfile.filePath;
		                substitutionMetadata.substitutionFiles.push(object_);
		              }
									logger.debug("substitution with following metadata: %s", JSON.stringify(substitutionMetadata));
									// start substitution
		              httpRequests.substitute(substitutionMetadata)
		                .then(function(res){
												scope.substituted.id = res.data.id;	// substituted ERC ID
												scope.substituted.data = res.config.data;	// data that was used to create substitution
												logger.info("Finished substitution to new ERC with id [%s]", scope.substituted.id);
												logger.debug("Finished substitution to new ERC with id [%s]", scope.substituted.id);
												scope.substituted.url = "#!/erc/" + scope.substituted.id;
												scope.finishedSubstitution = true;
		                })
		                .catch(function(err){
											logger.info("Error while substitution: %s", err);
											logger.debug("Error while substitution: %s", err);
											window.alert("Error while substitution:\n" + err.data.error);
		                });
		          }
		      };

					function showSubstitutedERC() {
							$window.open(scope.substituted.url);
					};

					function magnifyFiles(ev, data){
							$mdDialog.show({
									template: '<md-dialog class="substitute_magnifier"><o2r-substitute-magnify o2r-base-file="'+data.fileSelectBase.filePath+'" o2r-overlay-file="'+data.fileSelectOverlay.filePath+'" o2r-overlay-id="'+scope.o2rOverlayId+'"></o2r-substitute-magnify></md-dialog>',
									parent: angular.element(document.body),
									targetEvent: ev,
									fullscreen: true,
									clickOutsideToClose: false,
									multiple: true
							});
					}

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
									logger.info("Not possible to delete a row - you can not make a substitution without files.");
		          } else {
			            scope.substitutionRows.splice(i, 1);
		          }
		      };

		      function addDropdown() {
		        if ((scope.substitutionRows.length == scope.o2rBase.length) || (scope.substitutionRows.length == scope.o2rOverlay.length)) {
			          // TODO: button in red to warn
								logger.info("Not possible to add a row - there are not enough substitution files.");
		        } else {
		          	scope.substitutionRows.push({});
		        }
		      };

				}
			});

		}


	}
})(window.angular);
