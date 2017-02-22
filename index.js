function (id) {
				var table = $(id);
				var rows = table.find('tr');
				var titleText = $('#'+id.match(/\d+/)[0] + ' h2').text();
				var rowLength = $(rows).length;
				var data = new Array(rowLength);
				var rDummyStr = '';
				var cDummyStr = '';
				var mDummyStr = '';
				var rtn = [];
				var title = [];
				
				var cols = $($(rows)[0]).find('th');
				var colsLength = 0;
				for(var i =0 ; i< $(cols).length; i++ ) {
					var cntCols = $(cols[i]).attr('colspan');
					if(cntCols > 1) {
						colsLength = parseInt(colsLength, 10) + parseInt(cntCols,10);
					} else {
						colsLength++;
					}
				}
				
				for(var i =0; i< data.length; i++) {
					data[i] =  new Array(colsLength);
				}
				
				for(var i=0; i < rowLength; i++) {
					
					var currRow = rows[i];
					var colOffset = 0;
					var currRowCells = $(currRow).find('th,td'); 
					var dataArrayRowLength = data[i].length;
					
					for(var j=0; j< currRowCells.length; j++ ) {
						var incCol = 0;
						while(((j+incCol) < dataArrayRowLength) && (data[i][j+colOffset] == rDummyStr || data[i][j+colOffset] == cDummyStr || data[i][j+colOffset] == mDummyStr) ) {
							colOffset++;
							incCol++;
						}
						currCell = $(currRowCells)[j];
						data[i][j+colOffset] = $(currCell).text();
						
						var rSpanCnt = $(currCell).attr('rowspan');
						var cSpanCnt = $(currCell).attr('colspan');
						
						if(rSpanCnt) {
							for(var step = 1; step < rSpanCnt; step++ ) {
								data[i+step][j+colOffset] = rDummyStr;
							}
						} 
								
						if(cSpanCnt) {
							for(var step = 1; step < cSpanCnt; step++ ) {
								colOffset++;
								data[i][j+colOffset] = cDummyStr;
							}
						}
						
						if(rSpanCnt && cSpanCnt) {
							for(var rstep = 1; rstep < rSpanCnt; rstep++) {
								for(var cstep = 1; cstep < cSpanCnt; cstep++ ) {
									data[i+rstep][j+cstep] = mDummyStr;
								}
								
							}
						}
						
					}

				}
			
			if(data.length) {
				var i = 0;
				var thRows = table.find('thead').find('tr').length;
				var thCols = table.find('tbody').find('tr').last().find('th').first('th').attr('colspan');
				Object.keys(data).forEach(function (key) {
					rtn[i] = [];
					var j = 0;
					Object.keys(data[key]).forEach(function (k) {
						if(!data[key][k] || data[key][k] == '') { data[key][k] = ''; }
						var header = (i <= thRows-1 ) ? true: (j <= thCols-1) ? true : false; 
						rtn[i].push({value: data[key][k], header: header});
						j++;
					});
					i++;
				});
			}
			
			for(var i=0; i < rtn[0].length; i++) {
				if(i == 0) {
					title.push(titleText);
				} else {
					title.push('');
				}
			}
			rtn.unshift(title);
			return {'htmlTable2JavascriptArray': rtn};
		}
