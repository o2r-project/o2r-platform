"use strict";

app.factory('searchResults', function(){
	var list = [
		{
			id: 1,
			title: 'Comparing adaptive and fixed bandwidth-based kernel density estimates in spatial cancer epidemiology',
			author: 'Author 1',
			date: '2016-12-12',
			abstract: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
			content: {
				path: '/home/Jan/Documents/o2r-platform/testCompendium/',
				name: 'root',
				type: 'folder',
				id: 1,
				children: [
					{
						path: '/home/Jan/Documents/o2r-platform/testCompendium/data/',
						name: 'data',
						id: 2,
						children: [
							{
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/',
								name: 'wd',
								id: 3,
								children: [
									{
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/ifgi.jpg',
										name: 'ifgi.jpg',
										type: 'image/jpg',
										id: 4,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.pdf',
										name: 'lab02-solution.pdf',
										type: 'application/pdf',
										id: 5,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.Rmd',
										name: 'lab02-solution.Rmd',
										type: '',
										id: 6,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/meteo.RData',
										name: 'meteo.RData',
										type: '',
										id: 7,
										size: 400,
										children: []
									}
								]
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.R',
								name: 'Bagtainer.R',
								type: '',
								id: 8,
								size: 800,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.yml',
								name: 'Bagtainer.yml',
								type: '',
								id: 9,
								size: 400,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Dockerfile',
								name: 'Dockerfile',
								type: '',
								id: 10,
								size: 400,
								children: []
							}
						]
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bag-info.txt',
						name: 'bag-info.txt',
						type: 'text/plain',
						id: 11,
						children: []
							}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bagit.txt',
						name: 'bagit.txt',
						type: 'text/plain',
						id:12,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/manifest-md5.txt',
						name: 'manifest-md5.txt',
						type: 'text/plain',
						id: 13,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/tagmanifest-md5.txt',
						name: 'tagmanifest-md5.txt',
						type: 'text/plain',
						id: 14,
						size: 953,
						children: []
					}
				]
			}
		}, {
			id: 2,
			title: 'Optimising sampling designs for the maximum coverage problem of plume detection',
			author: 'Author 1',
			date: '2016-12-03',
			abstract: 'Auch gibt es niemanden, der den Schmerz an sich liebt, sucht oder wünscht, nur, weil er Schmerz ist, es sei denn, es kommt zu zufälligen Umständen, in denen Mühen und Schmerz ihm große Freude bereiten können. Um ein triviales Beispiel zu nehmen, wer von uns unterzieht sich je anstrengender körperlicher Betätigung, außer um Vorteile daraus zu ziehen?\n Aber wer hat irgend ein Recht, einen Menschen zu tadeln, der die Entscheidung trifft, eine Freude zu genießen, die keine unangenehmen Folgen hat, oder einen, der Schmerz vermeidet, welcher keine daraus resultierende Freude nach sich zieht? Auch gibt es niemanden, der den Schmerz an sich liebt, sucht oder wünscht, nur, weil er Schmerz ist, es sei denn, es kommt zu zufälligen Umständen, in denen Mühen und Schmerz ihm große Freude bereiten können. Um ein triviales Beispiel zu nehmen, wer von uns unterzieht sich je anstrengender körperlicher Betätigung, außer um Vorteile daraus zu ziehen? ',
			content: {
				path: '/home/Jan/Documents/o2r-platform/testCompendium/',
				name: 'root',
				type: 'folder',
				id: 1,
				children: [
					{
						path: '/home/Jan/Documents/o2r-platform/testCompendium/data/',
						name: 'data',
						id: 2,
						children: [
							{
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/',
								name: 'wd',
								id: 3,
								children: [
									{
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/ifgi.jpg',
										name: 'ifgi.jpg',
										type: 'image/jpg',
										id: 4,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.pdf',
										name: 'lab02-solution.pdf',
										type: 'application/pdf',
										id: 5,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.Rmd',
										name: 'lab02-solution.Rmd',
										type: '',
										id: 6,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/meteo.RData',
										name: 'meteo.RData',
										type: '',
										id: 7,
										size: 400,
										children: []
									}
								]
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.R',
								name: 'Bagtainer.R',
								type: '',
								id: 8,
								size: 800,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.yml',
								name: 'Bagtainer.yml',
								type: '',
								id: 9,
								size: 400,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Dockerfile',
								name: 'Dockerfile',
								type: '',
								id: 10,
								size: 400,
								children: []
							}
						]
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bag-info.txt',
						name: 'bag-info.txt',
						type: 'text/plain',
						id: 11,
						children: []
							}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bagit.txt',
						name: 'bagit.txt',
						type: 'text/plain',
						id:12,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/manifest-md5.txt',
						name: 'manifest-md5.txt',
						type: 'text/plain',
						id: 13,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/tagmanifest-md5.txt',
						name: 'tagmanifest-md5.txt',
						type: 'text/plain',
						id: 14,
						size: 953,
						children: []
					}
				]
			}
		}, {
			id: 3,
			title: 'Spatial and spatio-temporal modeling of meteorological and climatic variables using Open Source software',
			author: 'Author 1',
			date: '2016-05-18',
			abstract: 'Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund! « sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.\nUnd es war ihnen wie eine Bestätigung ihrer neuen Träume und guten Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich erhob und ihren jungen Körper dehnte. »Es ist ein eigentümlicher Apparat«, sagte der Offizier zu dem Forschungsreisenden und überblickte mit einem gewissermaßen bewundernden Blick den ihm doch wohlbekannten Apparat. Sie hätten noch ins Boot springen können, aber der Reisende hob ein schweres, geknotetes Tau vom Boden, drohte ihnen damit und hielt sie dadurch von dem Sprunge ab. In den letzten Jahrzehnten ist das Interesse an Hungerkünstlern sehr zurückgegangen. Aber sie überwanden sich, umdrängten den Käfig ',
			content: {
				path: '/home/Jan/Documents/o2r-platform/testCompendium/',
				name: 'root',
				type: 'folder',
				id: 1,
				children: [
					{
						path: '/home/Jan/Documents/o2r-platform/testCompendium/data/',
						name: 'data',
						id: 2,
						children: [
							{
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/',
								name: 'wd',
								id: 3,
								children: [
									{
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/ifgi.jpg',
										name: 'ifgi.jpg',
										type: 'image/jpg',
										id: 4,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.pdf',
										name: 'lab02-solution.pdf',
										type: 'application/pdf',
										id: 5,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.Rmd',
										name: 'lab02-solution.Rmd',
										type: '',
										id: 6,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/meteo.RData',
										name: 'meteo.RData',
										type: '',
										id: 7,
										size: 400,
										children: []
									}
								]
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.R',
								name: 'Bagtainer.R',
								type: '',
								id: 8,
								size: 800,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.yml',
								name: 'Bagtainer.yml',
								type: '',
								id: 9,
								size: 400,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Dockerfile',
								name: 'Dockerfile',
								type: '',
								id: 10,
								size: 400,
								children: []
							}
						]
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bag-info.txt',
						name: 'bag-info.txt',
						type: 'text/plain',
						id: 11,
						children: []
							}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bagit.txt',
						name: 'bagit.txt',
						type: 'text/plain',
						id:12,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/manifest-md5.txt',
						name: 'manifest-md5.txt',
						type: 'text/plain',
						id: 13,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/tagmanifest-md5.txt',
						name: 'tagmanifest-md5.txt',
						type: 'text/plain',
						id: 14,
						size: 953,
						children: []
					}
				]
			}
		}, {
			id: 4,
			title: 'Spatio-temporal change detection from multidimensional arrays: Detecting deforestation from MODIS time series',
			date: '2015-08-03',
			content: {
				path: '/home/Jan/Documents/o2r-platform/testCompendium/',
				name: 'root',
				type: 'folder',
				id: 1,
				children: [
					{
						path: '/home/Jan/Documents/o2r-platform/testCompendium/data/',
						name: 'data',
						id: 2,
						children: [
							{
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/',
								name: 'wd',
								id: 3,
								children: [
									{
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/ifgi.jpg',
										name: 'ifgi.jpg',
										type: 'image/jpg',
										id: 4,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.pdf',
										name: 'lab02-solution.pdf',
										type: 'application/pdf',
										id: 5,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.Rmd',
										name: 'lab02-solution.Rmd',
										type: '',
										id: 6,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/meteo.RData',
										name: 'meteo.RData',
										type: '',
										id: 7,
										size: 400,
										children: []
									}
								]
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.R',
								name: 'Bagtainer.R',
								type: '',
								id: 8,
								size: 800,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.yml',
								name: 'Bagtainer.yml',
								type: '',
								id: 9,
								size: 400,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Dockerfile',
								name: 'Dockerfile',
								type: '',
								id: 10,
								size: 400,
								children: []
							}
						]
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bag-info.txt',
						name: 'bag-info.txt',
						type: 'text/plain',
						id: 11,
						children: []
							}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bagit.txt',
						name: 'bagit.txt',
						type: 'text/plain',
						id:12,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/manifest-md5.txt',
						name: 'manifest-md5.txt',
						type: 'text/plain',
						id: 13,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/tagmanifest-md5.txt',
						name: 'tagmanifest-md5.txt',
						type: 'text/plain',
						id: 14,
						size: 953,
						children: []
					}
				]
			}
		}, {
			id: 5,
			title: 'Software for Spatial Statistics',
			date: '2014-02-13',
			content: {
				path: '/home/Jan/Documents/o2r-platform/testCompendium/',
				name: 'root',
				type: 'folder',
				id: 1,
				children: [
					{
						path: '/home/Jan/Documents/o2r-platform/testCompendium/data/',
						name: 'data',
						id: 2,
						children: [
							{
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/',
								name: 'wd',
								id: 3,
								children: [
									{
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/ifgi.jpg',
										name: 'ifgi.jpg',
										type: 'image/jpg',
										id: 4,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.pdf',
										name: 'lab02-solution.pdf',
										type: 'application/pdf',
										id: 5,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.Rmd',
										name: 'lab02-solution.Rmd',
										type: '',
										id: 6,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/meteo.RData',
										name: 'meteo.RData',
										type: '',
										id: 7,
										size: 400,
										children: []
									}
								]
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.R',
								name: 'Bagtainer.R',
								type: '',
								id: 8,
								size: 800,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.yml',
								name: 'Bagtainer.yml',
								type: '',
								id: 9,
								size: 400,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Dockerfile',
								name: 'Dockerfile',
								type: '',
								id: 10,
								size: 400,
								children: []
							}
						]
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bag-info.txt',
						name: 'bag-info.txt',
						type: 'text/plain',
						id: 11,
						children: []
							}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bagit.txt',
						name: 'bagit.txt',
						type: 'text/plain',
						id:12,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/manifest-md5.txt',
						name: 'manifest-md5.txt',
						type: 'text/plain',
						id: 13,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/tagmanifest-md5.txt',
						name: 'tagmanifest-md5.txt',
						type: 'text/plain',
						id: 14,
						size: 953,
						children: []
					}
				]
			}
		}, {
			id: 6,
			title: 'plotKML: Scientific Visualization of Spatio-Temporal Data',
			date: '2013-09-23',
			content: {
				path: '/home/Jan/Documents/o2r-platform/testCompendium/',
				name: 'root',
				type: 'folder',
				id: 1,
				children: [
					{
						path: '/home/Jan/Documents/o2r-platform/testCompendium/data/',
						name: 'data',
						id: 2,
						children: [
							{
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/',
								name: 'wd',
								id: 3,
								children: [
									{
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/ifgi.jpg',
										name: 'ifgi.jpg',
										type: 'image/jpg',
										id: 4,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.pdf',
										name: 'lab02-solution.pdf',
										type: 'application/pdf',
										id: 5,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.Rmd',
										name: 'lab02-solution.Rmd',
										type: '',
										id: 6,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/meteo.RData',
										name: 'meteo.RData',
										type: '',
										id: 7,
										size: 400,
										children: []
									}
								]
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.R',
								name: 'Bagtainer.R',
								type: '',
								id: 8,
								size: 800,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.yml',
								name: 'Bagtainer.yml',
								type: '',
								id: 9,
								size: 400,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Dockerfile',
								name: 'Dockerfile',
								type: '',
								id: 10,
								size: 400,
								children: []
							}
						]
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bag-info.txt',
						name: 'bag-info.txt',
						type: 'text/plain',
						id: 11,
						children: []
							}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bagit.txt',
						name: 'bagit.txt',
						type: 'text/plain',
						id:12,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/manifest-md5.txt',
						name: 'manifest-md5.txt',
						type: 'text/plain',
						id: 13,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/tagmanifest-md5.txt',
						name: 'tagmanifest-md5.txt',
						type: 'text/plain',
						id: 14,
						size: 953,
						children: []
					}
				]
			}
		}, {
			id: 7,
			title: 'Small-area spatio-temporal analyses of participation rates in the mammography screening program in the city of Dortmund (NW Germany) Biostatistics and methods',
			date: '2013-08-07',
			content: {
				path: '/home/Jan/Documents/o2r-platform/testCompendium/',
				name: 'root',
				type: 'folder',
				id: 1,
				children: [
					{
						path: '/home/Jan/Documents/o2r-platform/testCompendium/data/',
						name: 'data',
						id: 2,
						children: [
							{
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/',
								name: 'wd',
								id: 3,
								children: [
									{
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/ifgi.jpg',
										name: 'ifgi.jpg',
										type: 'image/jpg',
										id: 4,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.pdf',
										name: 'lab02-solution.pdf',
										type: 'application/pdf',
										id: 5,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.Rmd',
										name: 'lab02-solution.Rmd',
										type: '',
										id: 6,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/meteo.RData',
										name: 'meteo.RData',
										type: '',
										id: 7,
										size: 400,
										children: []
									}
								]
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.R',
								name: 'Bagtainer.R',
								type: '',
								id: 8,
								size: 800,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.yml',
								name: 'Bagtainer.yml',
								type: '',
								id: 9,
								size: 400,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Dockerfile',
								name: 'Dockerfile',
								type: '',
								id: 10,
								size: 400,
								children: []
							}
						]
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bag-info.txt',
						name: 'bag-info.txt',
						type: 'text/plain',
						id: 11,
						children: []
							}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bagit.txt',
						name: 'bagit.txt',
						type: 'text/plain',
						id:12,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/manifest-md5.txt',
						name: 'manifest-md5.txt',
						type: 'text/plain',
						id: 13,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/tagmanifest-md5.txt',
						name: 'tagmanifest-md5.txt',
						type: 'text/plain',
						id: 14,
						size: 953,
						children: []
					}
				]
			}
		}, {
			id: 8,
			title: 'Title 8',
			date: '2012-08-24',
			content: {
				path: '/home/Jan/Documents/o2r-platform/testCompendium/',
				name: 'root',
				type: 'folder',
				id: 1,
				children: [
					{
						path: '/home/Jan/Documents/o2r-platform/testCompendium/data/',
						name: 'data',
						id: 2,
						children: [
							{
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/',
								name: 'wd',
								id: 3,
								children: [
									{
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/ifgi.jpg',
										name: 'ifgi.jpg',
										type: 'image/jpg',
										id: 4,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.pdf',
										name: 'lab02-solution.pdf',
										type: 'application/pdf',
										id: 5,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.Rmd',
										name: 'lab02-solution.Rmd',
										type: '',
										id: 6,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/meteo.RData',
										name: 'meteo.RData',
										type: '',
										id: 7,
										size: 400,
										children: []
									}
								]
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.R',
								name: 'Bagtainer.R',
								type: '',
								id: 8,
								size: 800,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.yml',
								name: 'Bagtainer.yml',
								type: '',
								id: 9,
								size: 400,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Dockerfile',
								name: 'Dockerfile',
								type: '',
								id: 10,
								size: 400,
								children: []
							}
						]
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bag-info.txt',
						name: 'bag-info.txt',
						type: 'text/plain',
						id: 11,
						children: []
							}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bagit.txt',
						name: 'bagit.txt',
						type: 'text/plain',
						id:12,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/manifest-md5.txt',
						name: 'manifest-md5.txt',
						type: 'text/plain',
						id: 13,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/tagmanifest-md5.txt',
						name: 'tagmanifest-md5.txt',
						type: 'text/plain',
						id: 14,
						size: 953,
						children: []
					}
				]
			}
		}, {
			id: 9,
			title: 'Title 9',
			date: '2011-02-02',
			content: {
				path: '/home/Jan/Documents/o2r-platform/testCompendium/',
				name: 'root',
				type: 'folder',
				id: 1,
				children: [
					{
						path: '/home/Jan/Documents/o2r-platform/testCompendium/data/',
						name: 'data',
						id: 2,
						children: [
							{
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/',
								name: 'wd',
								id: 3,
								children: [
									{
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/ifgi.jpg',
										name: 'ifgi.jpg',
										type: 'image/jpg',
										id: 4,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.pdf',
										name: 'lab02-solution.pdf',
										type: 'application/pdf',
										id: 5,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.Rmd',
										name: 'lab02-solution.Rmd',
										type: '',
										id: 6,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/meteo.RData',
										name: 'meteo.RData',
										type: '',
										id: 7,
										size: 400,
										children: []
									}
								]
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.R',
								name: 'Bagtainer.R',
								type: '',
								id: 8,
								size: 800,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.yml',
								name: 'Bagtainer.yml',
								type: '',
								id: 9,
								size: 400,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Dockerfile',
								name: 'Dockerfile',
								type: '',
								id: 10,
								size: 400,
								children: []
							}
						]
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bag-info.txt',
						name: 'bag-info.txt',
						type: 'text/plain',
						id: 11,
						children: []
							}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bagit.txt',
						name: 'bagit.txt',
						type: 'text/plain',
						id:12,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/manifest-md5.txt',
						name: 'manifest-md5.txt',
						type: 'text/plain',
						id: 13,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/tagmanifest-md5.txt',
						name: 'tagmanifest-md5.txt',
						type: 'text/plain',
						id: 14,
						size: 953,
						children: []
					}
				]
			}
		}, {
			id: 10,
			title: 'Title 10',
			date: '2010-06-05',
			content: {
				path: '/home/Jan/Documents/o2r-platform/testCompendium/',
				name: 'root',
				type: 'folder',
				id: 1,
				children: [
					{
						path: '/home/Jan/Documents/o2r-platform/testCompendium/data/',
						name: 'data',
						id: 2,
						children: [
							{
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/',
								name: 'wd',
								id: 3,
								children: [
									{
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/ifgi.jpg',
										name: 'ifgi.jpg',
										type: 'image/jpg',
										id: 4,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.pdf',
										name: 'lab02-solution.pdf',
										type: 'application/pdf',
										id: 5,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.Rmd',
										name: 'lab02-solution.Rmd',
										type: '',
										id: 6,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/meteo.RData',
										name: 'meteo.RData',
										type: '',
										id: 7,
										size: 400,
										children: []
									}
								]
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.R',
								name: 'Bagtainer.R',
								type: '',
								id: 8,
								size: 800,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.yml',
								name: 'Bagtainer.yml',
								type: '',
								id: 9,
								size: 400,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Dockerfile',
								name: 'Dockerfile',
								type: '',
								id: 10,
								size: 400,
								children: []
							}
						]
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bag-info.txt',
						name: 'bag-info.txt',
						type: 'text/plain',
						id: 11,
						children: []
							}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bagit.txt',
						name: 'bagit.txt',
						type: 'text/plain',
						id:12,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/manifest-md5.txt',
						name: 'manifest-md5.txt',
						type: 'text/plain',
						id: 13,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/tagmanifest-md5.txt',
						name: 'tagmanifest-md5.txt',
						type: 'text/plain',
						id: 14,
						size: 953,
						children: []
					}
				]
			}
		}, {
			id: 11,
			title: 'Title 11',
			date: '2010-05-28',
			content: {
				path: '/home/Jan/Documents/o2r-platform/testCompendium/',
				name: 'root',
				type: 'folder',
				id: 1,
				children: [
					{
						path: '/home/Jan/Documents/o2r-platform/testCompendium/data/',
						name: 'data',
						id: 2,
						children: [
							{
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/',
								name: 'wd',
								id: 3,
								children: [
									{
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/ifgi.jpg',
										name: 'ifgi.jpg',
										type: 'image/jpg',
										id: 4,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.pdf',
										name: 'lab02-solution.pdf',
										type: 'application/pdf',
										id: 5,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.Rmd',
										name: 'lab02-solution.Rmd',
										type: '',
										id: 6,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/meteo.RData',
										name: 'meteo.RData',
										type: '',
										id: 7,
										size: 400,
										children: []
									}
								]
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.R',
								name: 'Bagtainer.R',
								type: '',
								id: 8,
								size: 800,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.yml',
								name: 'Bagtainer.yml',
								type: '',
								id: 9,
								size: 400,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Dockerfile',
								name: 'Dockerfile',
								type: '',
								id: 10,
								size: 400,
								children: []
							}
						]
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bag-info.txt',
						name: 'bag-info.txt',
						type: 'text/plain',
						id: 11,
						children: []
							}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bagit.txt',
						name: 'bagit.txt',
						type: 'text/plain',
						id:12,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/manifest-md5.txt',
						name: 'manifest-md5.txt',
						type: 'text/plain',
						id: 13,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/tagmanifest-md5.txt',
						name: 'tagmanifest-md5.txt',
						type: 'text/plain',
						id: 14,
						size: 953,
						children: []
					}
				]
			}
		}, {
			id: 12,
			title: 'Title 12',
			date: '2009-12-23',
			content: {
				path: '/home/Jan/Documents/o2r-platform/testCompendium/',
				name: 'root',
				type: 'folder',
				id: 1,
				children: [
					{
						path: '/home/Jan/Documents/o2r-platform/testCompendium/data/',
						name: 'data',
						id: 2,
						children: [
							{
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/',
								name: 'wd',
								id: 3,
								children: [
									{
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/ifgi.jpg',
										name: 'ifgi.jpg',
										type: 'image/jpg',
										id: 4,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.pdf',
										name: 'lab02-solution.pdf',
										type: 'application/pdf',
										id: 5,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.Rmd',
										name: 'lab02-solution.Rmd',
										type: '',
										id: 6,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/meteo.RData',
										name: 'meteo.RData',
										type: '',
										id: 7,
										size: 400,
										children: []
									}
								]
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.R',
								name: 'Bagtainer.R',
								type: '',
								id: 8,
								size: 800,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.yml',
								name: 'Bagtainer.yml',
								type: '',
								id: 9,
								size: 400,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Dockerfile',
								name: 'Dockerfile',
								type: '',
								id: 10,
								size: 400,
								children: []
							}
						]
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bag-info.txt',
						name: 'bag-info.txt',
						type: 'text/plain',
						id: 11,
						children: []
							}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bagit.txt',
						name: 'bagit.txt',
						type: 'text/plain',
						id:12,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/manifest-md5.txt',
						name: 'manifest-md5.txt',
						type: 'text/plain',
						id: 13,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/tagmanifest-md5.txt',
						name: 'tagmanifest-md5.txt',
						type: 'text/plain',
						id: 14,
						size: 953,
						children: []
					}
				]
			}
		}];

	var getAll = function(){
		return list;
	};

	var getOne = function(id){
		var res;
		for(var index in list){
			if (list[index].id == id) res = list[index];
		}
		return res;
	};

	return {
		getPubMeta: getAll,
		getPubById: getOne
	};
});