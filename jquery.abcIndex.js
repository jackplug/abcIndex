/*
 * abcIndex v1.0 - creates an alphabetical index of items from a list
 * 
 * requirements:
 *
 *
 * settings:
 *  lettersets: number of sets of letters (number set is additional). For example, lettersets:5 provides an index like
 *    [0 - 9] [A - D] [E - I] [J - N] [O - S] [Š - Y]
 * 
 * usage:
 *
 *
 * v1 - 20130619
 *
 * Author: Stuart Homfray, 
 * https://github.com/jackplug/shopio/tree/shopio-1-3-mockup
 * Email: stuart.homfray@w3w.cz
 * Twitter: @5tuarth
 */

;(function($){

  $.fn.abcIndex = function( options ) {  

    var settings = $.extend( {
      'lettersets'     : 5
    }, options);

    
    return this.each(function() {
        var $itemsList = $(this);

        if ($itemsList.length > 0) {
            var ignore = ['the'],
                letters = {},
                $items = $itemsList.children();

            $items.hide();

            $items.each(function(){
                var item = $.trim($(this).text()).toLowerCase(), firstChar = '', 
                    words;

                if (item !== '') { // was !=
                    words = item.split(' ');

                    if ((words.length > 1) && ($.inArray(words[0], ignore) > -1 )) {
                        firstChar = words[1].charAt(0);
                    }

                    firstChar = words[0].charAt(0);

                    if (isNaN(letters[firstChar])) {
                        letters[firstChar] = 1;
                    } else {
                        letters[firstChar]++;
                    }
                }

                if (!isNaN(firstChar)) {
                    $(this).addClass('num-' + firstChar);
                } else {
                    $(this).addClass('letter-' + firstChar);
                }
            });


            // setup letters
            var numbers = false;
            $items
                .filter(function(i) {
                    return $(this).attr('class').match(/num-/);
                })
                .each(function() {
                    $(this).addClass('nums');
                    numbers = true;
                });


            var totalletters = 0;
            $.each(letters, function(k, v){
                if (isNaN(parseInt(k))) {
                    totalletters += 1;
                }
            });

            var lettersetLen = parseInt(totalletters / (settings.lettersets - 1)),
                lettersetSet = {},
                lettersetSetVals = [],
                i = 1,
                s = 1,
                x = 1; // i,s,x are simple counters

            $.each(letters, function(k, v){
                if (!isNaN(parseInt(k))) {
                    return; 
                }
            
                $items
                    .closest('.letter-' + k)
                    .addClass('set_' + s);
            
                if (i == lettersetLen) {
                    lettersetSetVals.push(k);
                    lettersetSet[s] = lettersetSetVals;
                    lettersetSetVals = [];
                    i = 1;
                    s++;
                } else {
                    lettersetSetVals.push(k);
                    i++;
                }
            
                if ((x == totalletters) && (lettersetSetVals.length > 0)) {
                    lettersetSet[s] = lettersetSetVals;
                }
                
                x++;
            });

            var $labels = $('<p class="listing-index box"/>');
            
            $.each(lettersetSet, function(k, v){
                var first = lettersetSet[k][0].toUpperCase(),
                    last  = lettersetSet[k][lettersetSet[k].length - 1].toUpperCase(),
                    label = '<a href="#" rel="set_' + k + '">' + first;

                if (first == last) {
                    label += '</a>';
                } else {
                    label += ' - ' + last + '</a>';
                }

                $labels.append($(label));
            });


            if (numbers) {
                $labels.prepend('<a href="#" rel="nums">0 - 9</a>');
            }
            
            $labels.prepend('<span>Abecední index:</span>');

            var $firstActive = $labels.find('a:first').addClass('active');
            
            $itemsList
                .find('.' + $firstActive.attr('rel'))
                .show()
                .addClass('active');

            $labels
                .click(function(el) {
                    el.preventDefault();

                    var $this = $(el.target).closest('a');
                    
                    $labels
                        .find('.active')
                        .removeClass('active');
                    
                    $this.addClass('active');
                    
                    if (!$itemsList.find('.active').hasClass($this.attr('rel'))) {
                        $itemsList
                            .find('.active')
                            .removeClass('active')
                            .hide();
                    
                        $itemsList
                            .find('.' + $this.attr('rel'))
                            .show()
                            .addClass('active');
                    }
                });

            $labels.insertBefore($itemsList);

        }
    });
  };
})( jQuery );
