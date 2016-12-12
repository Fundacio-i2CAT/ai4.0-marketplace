(function() {
	'use strict';

	angular
		.module('marketplace')
		.factory('ChunkUploader', ChunkUploader);

		ChunkUploader.$inject = ['ConnectionFactory', 'SaveImageDataService'];
		function ChunkUploader (ConnectionFactory, SaveImageDataService) {
			function chunk(scope) {
				$(document).ready(function() {
				    var total_steps = 0;
				    var chunk_size = 10000000;
				    var final_filename = "";
				    var spark = new SparkMD5.ArrayBuffer();
				    var backend_url = "";
				    backend_url = "http://dev.anella.i2cat.net:9999/api/services/vmimage";
				    // backend_url = ConnectionFactory.host;


				    var progress_bar = '<div class="progress">';
				    progress_bar += '<div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="100" style="width:100%"></div></div>';

				    function pad(num, size) {
						var s = num+"";
						while (s.length < size) s = "0" + s;
						return s;
				    }

				    function readBlob(file, uuid, step, opt_startByte, opt_stopByte) {
						var start = parseInt(opt_startByte) || 0;
						var stop = parseInt(opt_stopByte) || file.size - 1;
						var reader = new FileReader();
						var file2send;
						reader.onloadend = function(evt) {
						    if (evt.target.readyState == FileReader.DONE) {
							var formData = new FormData();
							file2send = new File([evt.target.result], uuid+'_'+pad(step,6));
							spark.append(evt.target.result);
							formData.append('file', file2send);
							// Subimos el trozo que toque segun step
							$.ajax({
							    url: backend_url+"/chunked",
							    type: "post",
							    data: formData,
							    processData: false,
							    contentType: false,
							    success: function(){	
								step = step+1;
								if ( step < total_steps ) {
								    var start = step*chunk_size;
								    var stop = (step+1)*chunk_size-1;
								    // Subimos el siguiente trozo
								    readBlob(file,uuid,step,start,stop);
								}

								$("#progress").html('Completades: '+step+' / '+total_steps+' parts');
				
								$("#file_upload_result").html('submitted successfully');

								if ( step === total_steps ) {
								    // Si step === total_steps hemos acabado y lanzamos el post final
								    //       con los datos para que el backend recomponga y verifique
								    $("#end").html('Successfully uploaded <strong>'+
										   final_filename+'</strong> with id=<i>'+
										   uuid+'</i> in <strong>'+total_steps+'</strong> steps');
										    var md5sum = spark.end();
										    $('#progressbar').hide();

										    //save to imageData in ImageDataService
										    //SaveImageDataService.saveImageData(file);

										    $("#md5").html('<strong style="color:olive">md5sum</strong>: '+md5sum);
										    $.ajax({
											url: backend_url+"/unchunked",
											timeout: 10*60*1000,
											type: "post",
											contentType: "application/json",
											data: JSON.stringify({ "filename": final_filename,
													       "uuid": uuid,
													       "md5sum": md5sum
													     }),
											dataType: "json",
											success: function() {
											    $.ajax({
												url: backend_url+"/upload",
												type: "post",
												timeout: 10*60*1000,
												contentType: "application/json",
												data: JSON.stringify({ "filename": final_filename }),
												dataType: "json",
												success: function(response) {
												    $("#upload").html('<span class="text text-success"><i class="fa fa-check"></i>Imatge carregada amb èxit.</span>');
												}
											    });
											},
										    	error: function() {
											    $("#upload").html('<span class="text text-danger"><i class="fa fa-close"></i>No s\'ha pogut carregar la imatge.</span>');
											
											}
										    })
										}
							    },
							    error:function(){
								$("#progress").html('There was an error while uploading');
							    }
							});
						    }
						};
						var blob = file.slice(start, stop + 1);
						reader.readAsArrayBuffer(blob);
				    }

				    function guid() {
						function s4() {
						    return Math.floor((1 + Math.random()) * 0x10000)
							.toString(16)
							.substring(1);
						}
					return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
					    s4() + '-' + s4() + s4() + s4();
				    }

				    function onFileSelected(e) {
				        var files = e.target.files;
				        /*var files = $('#file_input')[0].files;*/
				        scope.file = files;
						var i = 0;
						var file, j;
						$("#progress").html('');
						$("#end").html('');
						$("#md5").html('');
						$("#upload").html('');
					
				        file = files[i].name;
						final_filename = file;
						var steps = files[i].size/chunk_size;
						total_steps = Math.floor(steps)+1;
						var uuid = guid();
						j = 0;
						var start = j*chunk_size;
						var stop = (j+1)*chunk_size-1;
						$("#init").html('La imatge es pujarà en '+total_steps+' parts');

						$('#progressbar').html(progress_bar);

						// Llamada para subir la primera parte (el resto sube recursivamente
						//    en el on_success del post de jquery para que vaya secuencial)
						readBlob(files[i], uuid, j, start, stop);
					}

					    var file_input = $('#file_input');
					    file_input.on("change", onFileSelected);
					    file_input.on('click mouseover', function(){
					    	$('#help-text').html('Formats Imatge de Disc: .vdi, .qcow2')
					    });
					    /*var upload_button = $('#upload_button');
					    upload_button.on('click', onFileSelected);*/

				});
			}

			return {
				chunk: chunk
			}

		}
})();