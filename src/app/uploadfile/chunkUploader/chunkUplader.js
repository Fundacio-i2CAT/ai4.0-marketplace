(function() {
	'use strict';

	angular
		.module('marketplace')
		.factory('ChunkUploader', ChunkUploader);

		ChunkUploader.$inject = ['ConnectionFactory', 'SaveImageDataService', '$translate'];
		function ChunkUploader (ConnectionFactory, SaveImageDataService, $translate) {
			function chunk(scope) {
				angular.element(document).ready(function() {
					var total_steps = 0,
						chunk_size = 10000000,
						final_filename = "",
						spark = new SparkMD5.ArrayBuffer(),
						backend_url = ConnectionFactory.host+ 'api/services/vmimage',
						chunk_texts;

					if ($translate.use() == 'CAT') {
						chunk_texts = {
							complete: 'Completades ',
							parts: ' parts',
							success: 'Imatge carregada amb èxit.',
							error: 'No s\'ha pogut carregar la imatge.',
							image_parts: 'La imatge es pujarà en ',
							no_close: 'Sisplau, no tanquis la finestra mentre es puja la imatge.'
						};
					}

					if ($translate.use() == 'CAST') {
						chunk_texts = {
							complete: 'Completadas ',
							parts: ' partes',
							success: 'Imagen cargada con éxito.',
							error: 'No se ha podido cargar la imagen.',
							image_parts: 'La imagen se subirá en ',
							no_close: 'Porfavor, no cierres la ventana mientras se sube la imagen.'
						};
					}



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

								angular.element("#progress").html(chunk_texts.complete + step+' / ' + total_steps + chunk_texts.parts);

								angular.element("#file_upload_result").html('submitted successfully');

								if ( step === total_steps ) {
									// Si step === total_steps hemos acabado y lanzamos el post final
									// con los datos para que el backend recomponga y verifique
									angular.element("#end").html('Successfully uploaded <strong>'+
										final_filename+'</strong> with id=<i>'+
										uuid+'</i> in <strong>'+total_steps+'</strong> steps');
										var md5sum = spark.end();
										angular.element('#progressbar').hide();

										angular.element("#md5").html('<strong style="color:olive">md5sum</strong>: '+md5sum);
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
														//save to imageData in ImageDataService
														SaveImageDataService.saveImageData(response);
														// $("#upload").html('<span class="text text-success"><i class="fa fa-check"></i>Imatge carregada amb èxit.</span>');
														angular.element("#upload").html('<p class="bg-success"><i class="fa fa-check"></i>&nbsp;' + chunk_texts.success + '</p>').css('padding', '.5em');
														angular.element('#advice').html('').css('padding', 0);
														angular.element("#init").html('');
														angular.element("#progress").html('');
													}
												});
											},
												error: function() {
													angular.element("#upload-error").html('<i class="fa fa-close"></i>&nbsp;' + chunk_texts.error).css('padding', '.5em');
												}
											})
										}
								},
								error:function(){
									angular.element("#progress").html('There was an error while uploading');
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
						angular.element("#progress").html('');
						angular.element("#end").html('');
						angular.element("#md5").html('');
						angular.element("#upload").html('');

						file = files[i].name;
						final_filename = file;
						var steps = files[i].size/chunk_size;
						total_steps = Math.floor(steps)+1;
						var uuid = guid();
						j = 0;
						var start = j*chunk_size;
						var stop = (j+1)*chunk_size-1;
						angular.element("#init").html(chunk_texts.image_parts+total_steps+chunk_texts.parts);
						angular.element('#advice').html(chunk_texts.no_close).css('padding', '.5em');
						angular.element('#progressbar').html(progress_bar);

						// Llamada para subir la primera parte (el resto sube recursivamente
						//    en el on_success del post de jquery para que vaya secuencial)
						readBlob(files[i], uuid, j, start, stop);
					}

						var file_input = angular.element('#file_input');
						file_input.on("change", onFileSelected);
						// file_input.on('click mouseover', function(){
						// 	$('#help-text').html("Ext:  .vdi, .qcow2");
						// });
						/*var upload_button = $('#upload_button');
						upload_button.on('click', onFileSelected);*/
				});
			}

			return {
				chunk: chunk
			}

		}
})();
