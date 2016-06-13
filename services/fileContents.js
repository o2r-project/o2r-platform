"use strict";

app.factory('fileContents', function(){
	var files = [{
		path: '/home/Jan/Documents/o2r-platform/testCompendium/bag-info.txt',
		content: 'Bag-Software-Agent: bagit.py <http://github.com/libraryofcongress/bagit-python> \n Bagging-Date: 2016-04-06 \n Payload-Oxum: 1635314.7'
	}, {
		path: '/home/Jan/Documents/o2r-platform/testCompendium/bagit.txt',
		content: 'BagIt-Version: 0.97 \nTag-File-Character-Encoding: UTF-8'
	}, {
		path: '/home/Jan/Documents/o2r-platform/testCompendium/manifest-md5.txt',
		content: 'c565ba304cf174329bd89929fa30bf1a  data/Bagtainer.R \n'
					+'8fd2a745779241f3c83da989ed2d69cc  data/Bagtainer.yml \n'
					+'2d79106943a96b7a15e1b6395cce612d  data/Dockerfile \n'
					+'08795330427ac40c648fa93d3260d949  data/wd/ifgi.jpg \n'
					+'7b409639a376c56a0ede78d72dc27f5d  data/wd/lab02-solution.Rmd \n'
					+'330a82258abe7f2e53af337aa16c6e0e  data/wd/lab02-solution.pdf \n'
					+'725b21a81d14b6feb557e294761a8ed9  data/wd/meteo.RData '
	}, {
		path: '/home/Jan/Documents/o2r-platform/testCompendium/tagmanifest-md5.txt',
		content: '9e5ad981e0d29adc278f6a294b8c2aca bagit.txt \n'
					+'5f61763266117c83d4d1c9f3f15dea65 bag-info.txt \n'
					+'aed88d4511cbe9ac3bbc1c08618742a4 manifest-md5.txt \n'
	}, {
		path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.R',
		content: '# helper functions\n' + 
				'o2r_loadConfig <- function(directory = NA, filename = Sys.getenv("O2R_CONFIG_FILE", unset = "Bagtainer.yml")) {\n' + 
				 ' .file <- NA\n' + 
				  'if(is.na(directory)) {\n' + 
				  '  .file <- normalizePath(filename)\n' + 
				  '} else {\n' + 
				   ' .file <- normalizePath(file.path(directory, filename))\n' + 
				  '}\n' + 
				  'cat("[o2r] Loading configuration file", .file, "\n")\n' + 
				  '.bagtainer <- yaml::yaml.load_file(.file)\n' + 
				  'return(.bagtainer)\n' + 
				'}'
	}];

	var getCon = function(path){
		var con;
		for(var i=0; i < files.length; i++){
			if(files[i].path == path){
				con = files[i].content;
			}
		}
		return con;
	};

	return {
		getContent: getCon
	};
});