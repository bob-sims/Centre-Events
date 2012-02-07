// experiment for a CommonJS theme "stylesheet" for central property locations

// define local namespaces for organization

exports.styles = {
	feed: {
		tableRow: {
			color: '#000',
			font: {
				fontWeight: 'bold'	
			},
			hasChild: 'true',
			backgroundImage: 'theme/images/bgltblue.png'
		},
	
	rowTitleLabel: {
			left: 40,
			right: 25,
			color: '#000',
			font: {
				fontWeight: 'bold',
				fontFamily: 'Verdana',
				fontSize: 16
			},	
		},
	
	rowImage: {
			left: 5,
			image: 'theme/images/info.png',
			width: 26,
			height: 27
		},
	},
	
	list: {
	
		tableRow: {
			color: '#000',
			font: {
				fontWeight: 'bold'	
				},
			hasChild: 'true',
			backgroundImage: 'theme/images/bgltblue.png'
			},
	
		rowTitleLabel: {
			left: 40,
			color: '#000',
			font: {
				fontWeight: 'bold',
				fontFamily: 'Verdana',
				fontSize: 16
				},	
			},
	
		itemRow: {
			color: '#000',
			font: {
				fontWeight: 'bold'	
				},
			hasChild: 'true',
			backgroundImage: 'theme/images/bgltblue.png'
			},
	
		rowItemLabel: {
			left: 40,
			color: '#000',
			font: {
				fontWeight: 'bold',
				fontFamily: 'Verdana',
				fontSize: 16
				},	
			},
		},
		
	weather: {
	
		infoTableRow: {
			color: '#000',
			font: {
				fontWeight: 'bold',
				fontColor: '#000',
				},
			layout:'vertical',
			backgroundImage:'theme/images/bgltblue.png',
		
			cityLabel: {
					font: {
						fontWeight: 'bold',
						fontSize: 16,
						},
					color: '#000',
					left: 3,
					right: 'auto',
			//backgroundColor: 'yellow',
					},
			},
	
		currentTableRow: {
			backgroundImage:'theme/images/bgltblue.png',
				leftContainer: {
					layout: 'vertical',
					left: 3,
					top: 0,
					//backgroundColor: 'blue',
					width: '60%',	
					},
				dateLabel:{
					font: {
						fontSize: 14,
						},
					color: '#000',
					//right: 0,
					//backgroundColor: 'red',
					},
				tempLabel: {
					left: 0,
					color: '#000',
					font: {
						fontSize: 16,
						fontWeight: 'bold',
						},
					},
				humidLabel: {
					left: 0,
					color: '#000',
					font: {
						fontSize: 12,
						},
					},
				windLabel: {
					left: 0,
					color: '#000',		
					font: {
						fontSize: 12,
						},
					},	
				rightContainer: {
					layout: 'vertical',
					right: 3,
					top: 0,
					bottom: 0,
					//backgroundColor: 'green',
					width: '40%',	
					},
				iconView: {
					//right: 0,
					//top: 0,
					height: 'auto',
					width: 'auto',
					},
				conditionLabel: {
					//right: 0,
					color: '#000',		
					font: {
						fontSize: 12,
						},		
					},
			},
	
		forecastTableRow: {
			leftContainer: {
				layout: 'vertical',
				left: 3,
				//top: 0,
				//backgroundColor: 'blue',
				width: '60%',	
				},
			dateLabel:{
				font: {
					fontSize: 14,
					},
				color: '#000',
				right: 0,
				//backgroundColor: 'red',
				},
			tempLabel: {
				left: 0,
				color: '#000',
				font: {
					fontSize: 16,
					fontWeight: 'bold',
					},
				},
			humidLabel: {
				left: 0,
				color: '#000',
				font: {
					fontSize: 12,
					},
				},
			windLabel: {
				left: 0,
				color: '#000',		
				font: {
					fontSize: 12,
					},
				},	
			rightContainer: {
				layout: 'vertical',
				right: 3,
				top: 10,
				bottom: 0,
				//backgroundColor: 'green',
				width: '40%',	
				},
			iconView: {
				//right: 0,
				//top: 0,
				height: 'auto',
				width: 'auto',
				},	
			conditionLabel: {
				//right: 0,
				color: '#000',		
				font: {
					fontSize: 12,
				},		
			},	
		}
	},
	map: {
		defaultWindow: {
			backgroundColor: '#6666ff',
			barColor: '#777'
		},
		detailWebView: {
			scalesPageToFit: true,
			width: '90%',
			height: '80%',
			top: '20',
			borderRadius: 10,
			backgroundColor: 'white'			
		},
	},
	about: {
		button: {
			width:'80%',
			//title: 'JFTC Events Website',
			font: {
				fontSize: 14,
				fontWeight: 'bold',
				fontFamily: 'Helvetica'
				},
			borderRadius: 20,
			top:5,
			bottom:5,
			height:40,
			color:'#fff',
			backgroundColor:'#07093D',
		},
		tableRow: {
			borderWidth: 0,
			height: 'auto',
			separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE
			}
	},
	contact: {
		button: {
			width:'80%',
			//title: 'JFTC Events Website',
			font: {
				fontSize: 14,
				fontWeight: 'bold',
				fontFamily: 'Helvetica'
				},
			borderRadius: 20,
			top:5,
			bottom:5,
			height:40,
			color:'#fff',
			backgroundColor:'#07093D',
		},
		tableRow: {
			borderWidth: 0,
			height: 'auto',
			separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
			backgroundColor:'transparent',
			}
		}
	
};
