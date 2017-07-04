; (function ($) {
	'use strict';

	console.log("Contabiliza horas - hack!");

	$(document).ready(function () {

		var menu = $('ul[class="ui-menu-list ui-helper-reset"]');

		// creating new action link: Contabiliza Horas
		var link = $('<a class="ui-menuitem-link ui-corner-all" href="#"><span class="ui-menuitem-icon ui-icon ui-icon-calculator"></span><span class="ui-menuitem-text">Contabiliza Horas</span></a>');
		link.mouseover(function () {
			$(menu).find('.ui-state-hover').each(function () {
				$(this).removeClass('ui-state-hover');
			});
			$(this).addClass('ui-state-hover');
		});
		link.mouseout(function () {
			$(this).removeClass('ui-state-hover');
		});
		link.on('click', function () {
			// logica
			var hourMap = new Map();

			$('div.ui-datatable table tbody tr').each(function () {
				if ($(this).attr('data-ri')) {
					var colunms = $(this).find('td');
					var date = $.trim($(colunms[1]).find('div').text());
					var start = $.trim($(colunms[2]).find('div').text());
					var end = $.trim($(colunms[3]).find('div').text());

					var d = date.split('/');
					var s = start.split(':');
					var e = end.split(':');

					var first = new Date(d[2], d[1], d[0], s[0], s[1], 0, 0);
					var second = new Date(d[2], d[1], d[0], e[0], e[1], 0, 0);

					var hours = Math.abs(second.getTime() - first.getTime()) / 36e5;

					if (hourMap.get(date)) {
						var sum = hourMap.get(date) + hours;
						hourMap.set(date, sum);
					} else {
						hourMap.set(date, hours);
					}

					//console.log('Date: ' + date + ', start: ' + start + ', end: ' + end + ' => ' + hours);
				}
			});

			var report = '<div style="text-align:center"><h3>TOTAL DE HORAS TRABALHAR POR DIA</h3>';
			report += '<table border="1" style="border-spacing:0px; border-collapse: collapse;margin:auto;text-align:left; width:300px"> <thead>';
			report += '<tr> <th style="padding:2px; margin:0px;text-align:center">Dia</th> <th style="text-align:center; padding:2px; margin:0px">Horas</th> </tr> </thead>';
			report += '<tbody>';

			var grandTotal = 0.0;
			var index = 0;
			for (var key of hourMap.keys()) {
				grandTotal += hourMap.get(key);
				var line = key + ': ' + hourMap.get(key);
				console.log(line);
				
					

				report += '<tr style="background-color:' + (index % 2 == 0? 'white' : '#EFEFEF') + '"> <td style="padding:2px; margin:0px;text-align:center">' + key + '</td> <td style="text-align:center; padding:2px; margin:0px">' + hourMap.get(key) + '</td> </tr>';
				index++;
			}

			report += '<tr> <td style="padding:2px; margin:0px"> TOTAL </td> <td colspan="2" style="text-align:center; padding:2px; margin:0px"> ' + grandTotal + '</td> </tr>';
			report += '</tbody> </table></div>';

			var top = parseInt(Math.max(0, ($(window).height() - 600) / 2 + $(window).scrollTop()));
			var left = parseInt(Math.max(0, ($(window).width() - 800) / 2 + $(window).scrollLeft()));

			var specs = "top=" + top + ",left=" + left + ",width=400,height=640,name='Horas Por Dia'";
			console.log(specs);

			var result = window.open("", "Horas por dia", "_parent", specs, false);
			result.document.write(report);
			result.focus();
		});

		// creating li to hold the action link and appending link to it
		var menuItem = $('<li class="ui-menuitem ui-widget ui-corner-all" role="menuitem"></li>');
		menuItem.mouseover(function () {
			$(this).addClass('ui-menuitem-active');
		});
		menuItem.mouseout(function () {
			$(this).removeClass('ui-menuitem-active');
		});
		menuItem.append(link);

		// finally adding new action link (menuitem) to the current page
		$(menu).append(menuItem);
	});
})(jQuery);
