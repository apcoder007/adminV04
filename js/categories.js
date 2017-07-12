// var active = 0;
// var addChip = function(input, id, text){
//   if(!id){
//     return;
//   }
//   var markup = '<div class="chip" cat-id="'+id+'">'+text+'<i class="material-icons">close</i></div>';
//   input.parent().siblings('button').before($(markup));
//   input.val('');
//   input.parent().siblings('button').show();
//   input.parent().siblings('.chip').children('i').show();
//   active = 0;
// }

// var showSuggestions = function(input){
//   query = input.val();
//   suggestions_div = input.next();
//   suggestions_div.html('');
//   if(query.length < 1){
//     return;
//   }
//   current_cat_ids = [];
//   chips = input.parent().siblings('.chip');
//   $.each(chips, function(key, chip){
//     current_cat_ids.push($(chip).attr('cat-id'));
//   });
//   suggested_categories = categories.filter(function(category){
//     if(current_cat_ids.indexOf(category.id) > -1){
//       return false;
//     }
//     if(category.name.toLowerCase().indexOf(query.toLowerCase()) > -1){
//       return true;
//     }
//   });

//   if(suggested_categories.length < 1){
//     markup = '<div>No suggestions</div>';
//     suggestions_div.append($(markup));
//   }

//   $.each(suggested_categories, function(key, category){
//     markup = '<div cat-id="'+category.id+'">' + category.name + '</div>';
//     suggestions_div.append($(markup));
//   });
// }

// var categories = {!! $categories !!};
// $(document).ready(function(){
//   $.ajaxSetup({ headers: { 'X-CSRF-TOKEN' : '{{ csrf_token() }}' } });

//   $('td').on('click', '.chip i', function(){
//     $(this).parent().siblings('button').show();
//   });

//     $('.subsec').click(function(){
//       // alert('hi');
//       $(this).children('i').toggle();
//       // $('.subsec i').show();

//     });


//       $('td').on('click', '.subsec i', function(){

//         subsection_id=$(this).parent().attr('subcat-id');

//         console.log(subsection_id);
//         $.ajax({
//           url: 'categories/subsection/'+subsection_id+'/delete',
//           type: 'POST',
//           success: function(response) {


//           }
//         });

//       });

//       $('.sections').click(function(){
//         $(this).children('i').toggle();
//       })

//       $('.sections i').click( function(){
//         section_id=$(this).parent().attr('sec-id');
//         $.ajax({
//           url: 'categories/section/'+section_id+'/delete',
//           type: 'POST',
//           success: function(response) {
//             location.reload();
//           }
//         });
//       });


//   $('.btn-save-cats').click(function(){
//     $(this).text('Wait');
//     $(this).prop('disabled', true);
//     btn = $(this);
//     chips = btn.siblings('.chip');
//     cat_ids = [];
//     subsection_id = btn.parent().attr('subsection-id');
//     $.each(chips, function(key, chip){
//       cat_ids.push($(chip).attr('cat-id'));
//     });
//     $.post('categories/subsection/'+subsection_id+'/update', {cat_ids}, function(response){
//       btn.hide();
//       btn.text('Save');
//       btn.prop('disabled', false);
//       btn.siblings('.chip').children('i').hide();
//     });
//   });

//   $('.btn-save-coupon').click(function(){
//     $(this).text('Wait');
//     $(this).prop('disabled', true);
//     btn = $(this);
//     chips = btn.siblings('.chip');
//     cat_ids = [];
//     coupon_id = btn.parent().attr('coupon-id');
//     $.each(chips, function(key, chip){
//       cat_ids.push($(chip).attr('cat-id'));
//     });
//     $.post('categories/coupon/'+coupon_id+'/update', {cat_ids}, function(response){
//       btn.hide();
//       btn.text('Save');
//       btn.prop('disabled', false);
//       btn.siblings('.chip').children('i').hide();
//     });
//   });

//   $('.category-input').keydown(function(evt){
//     if(evt.keyCode == 9){
//       evt.preventDefault();
//       addChip($(this), $(kids[active]).attr('cat-id'), $(kids[active]).text());
//     }
//     else if(evt.keyCode == 40){
//       evt.preventDefault();
//       if(active < kids.length-1){
//         active++;
//       }
//     }
//     else if(evt.keyCode == 38){
//       evt.preventDefault();
//       if(active > 0){
//         active--;
//       }
//     }
//     else if(evt.keyCode == 13){
//       evt.preventDefault();
//       $(this).parent().siblings('button').trigger('click');
//     }
//   });

//   $('.category-input').keyup(function(evt){
//     suggestions_div = $(this).next();
//     showSuggestions($(this));
//     kids = suggestions_div.children();
//     kids.removeClass('active');
//     $(kids[active]).addClass('active');
//   });

//   $('.category-input').focus(function(){
//     $(this).parent().addClass('forced-visible');
//     $('.chip').children('i').hide();
//     $(this).parent().siblings('.chip').children('i').show();
//   });
//   $('.category-input').blur(function(){
//     $(this).parent().removeClass('forced-visible');
//     suggestions_div = $(this).next();
//     suggestions_div.html('');
//     active = 0;
//   });
//   setTimeout(function(){ $('#error').fadeOut() }, 1000);

//   $('.new-subsection').click(function(evt){
//     evt.preventDefault();
//     $('form.new-subsection-form').hide();
//     $('form.new-subsection-form').prev().show();
//     $(this).hide();
//     $(this).next().show();
//     $(this).next().children().find('input').focus();
//   });

//   $('.new-subsection').next().children().find('input').keyup(function(evt){
//     if(evt.keyCode == 27){
//       $(this).parent().parent().hide();
//       $(this).parent().parent().prev().show();
//     }
//   })

//   $('.reset').click(function(){
//     $(this).parent().hide();
//     $(this).parent().prev().show();
//   });
// })
