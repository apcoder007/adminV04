
var removeList = {};
var removeitemList={};
var removeTags = {};
removeTags.tags_id = [];
removeList.image_ids = [];
removeitemList.item_ids = [];

var taggingStarted = false;
var imagecontainer;
var tagsuggestions = $('ul.tag-suggestions');
var tagpoint = {x: 0, y: 0};
//var tags = {!!$tags!!}
//var tags1 = {!!$tags1!!}
var current_imageid;
var startTagging = function(evt){
  evt.preventDefault();
  $('.auxilliary-board > .card-content1 > .test4 > .card-content2 > *:not(:first-child)').show();
  $('.auxilliary-board > .card-content1 > .test4 > .card-content2 > *:first-child').hide();
  $(evt.target).parent().prev().find('img').css('cursor', 'cell');
  taggingStarted = true;
}

var removeTagging = function(evt){
  evt.preventDefault();
  $('.auxilliary-board > .card-content1 > .test5 > .card-content3 > *:not(:first-child)').show();
  $('.auxilliary-board > .card-content1 > .test5 > .card-content3 > *:first-child').hide();
}

var endRemoving = function(evt){
  evt.preventDefault();

  $('.auxilliary-board > .card-content1 > .test5 > .card-content3 > *:not(:first-child)').hide();
  $('.auxilliary-board > .card-content1 > .test5 > .card-content3 > *:first-child').show();
}

var endTagging = function(evt){
  evt.preventDefault();

  $.ajax({
    url: '{{$package->id}}/tag_items',
    type: 'POST',
    data: {tags},
    dataType: 'json',
    beforeSend: function(x) {
      if (x && x.overrideMimeType) {
        x.overrideMimeType("application/j-son;charset=UTF-8");
      }
    },
    success: function(response) {
      console.log(response);
    }
  })

  $('.auxilliary-board > .card-content1 > .test4 > .card-content2 > *:not(:first-child)').hide();
  $('.auxilliary-board > .card-content1 > .test4 > .card-content2 > *:first-child').show();
  $(evt.target).parent().prev().find('img').css('cursor', 'initial');
  taggingStarted = false;
  tagsuggestions.hide();
}

var showTagSuggestions = function(evt){
  if(!taggingStarted){ return; }
  image_container = document.getElementById('medium-image-container');
  tagpoint = {x: evt.offsetX / image_container.offsetWidth, y: evt.offsetY / image_container.offsetHeight};
  left = tagpoint.x * imagecontainer.width();
  top1 = tagpoint.y * imagecontainer.height();
  tagsuggestions.css('left', left);
  tagsuggestions.css('top', top1);
  tagsuggestions.show();
}

var tagItem = function(elm){
  tag = {itemid: elm.attr('item-id'), imageid: current_imageid, point: tagpoint}
  tags.push(tag);
  tagsuggestions.hide();
  drawTags(current_imageid);
}

var drawTags = function(imageid){
  imagecontainer.find('.tag').remove();
  tags.forEach(function(tag, index){
    if(tag.imageid == imageid){
      image_container = document.getElementById('medium-image-container');
      image_height = image_container.offsetHeight;
      image_width = image_container.offsetWidth;
      top1 = tag.point.y*image_height;
      left1 = tag.point.x*image_width;
      imagecontainer.append($('<div class="tag" style="top: '+top1+'px; left: '+left1+'px" point1="'+top1+'" point2="'+left1+'"></div>'));
    }
  });
}

removeList.add = function(image_id){
  console.log(image_id);
  removeList.image_ids.push(image_id);
  var new_element = $("<div class='col l6 imagebx' imageid='"+image_id+"'>"+
                          "<div class='text-container'>"+
                            "<i class='material-icons'>undo</i>"+
                          "</div>"+
                          "<img src='/image/"+image_id+"' />"+
                          "<span style='display:inline-block'></span>"+
                      "</div>");

  $('#remove-image-list').append(new_element);
  new_element.fadeIn('fast', function(){
    $('.imageremove').show();
  });
  return true;tags_ids
}

removeTags.add = function(item, src){
  removeTags.tags_id.push(item);
  var new_element = $("<div class='col l6 tagbx' imageid='"+item+"'>"+
                          "<div class='text-container'>"+
                            "<i class='material-icons'>undo</i>"+
                          "</div>"+
                          "<img src='"+src+"' />"+
                          "<span style='display:inline-block'></span>"+
                      "</div>");

  $('#remove-tags-list').append(new_element);
  new_element.fadeIn('fast', function(){
    $('.tagremove').show();
  });
  return true;
}

function removeItm() {
  $('.deleteconfirm').show();
  }

removeitemList.add=function(item,src){
  removeitemList.item_ids.push(item);
  var new_element = $("<div class='col l6 itembx' itemid='"+item+"'>"+
                          "<div class='text-container'>"+
                            "<i class='material-icons'>undo</i>"+
                          "</div>"+
                          "<img src='"+src+"' />"+
                          "<span style='display:inline-block'></span>"+
                      "</div>");

  $('#remove-items-list').append(new_element);
  new_element.fadeIn('fast', function(){
    $('.itemremove').show();
  });
  return true;

}

var search = {};
search.categoryids = [];
search.vendorids = [];
var packageitemsid = [];


searchItems = function(){
  $.get('/item/search', {'params': search}, function(response){
    $('#search-results').html('');
    response.forEach(function(item){
        var markup = '<div class="collection-item" packageitemid="' + item.id +'"><span>' + item.name + '</span></div>';
        $('#search-results').append($(markup));
    });

  });
}

function addItem(item){
   packageitemsid.push(item.id);
  var markup = '<div class="col l2">'
                  + '<div class="card foter">'
                  +'<div class="  btnn"><a class="remove-btn1" itemid="'+item.id+'" href="#"><i class="tiny material-icons grey-text text-darken-4">highlight_off</i></a></div>'
                    + '<div class="card-image"><image src="/image/' +item.image.id+'" /></div>'
                    + '<div class="card-content">'
                      + '<p>' + item.name + '</p>'
                    + '</div>'
                  + '</div>'
                + '</div>';
  $('#package-item-list').append($(markup));
}

$(document).ready(function(){
  imagecontainer = $('#medium-image-container');
  taglist = $('#taglist');
//tagLists();

  searchItems();
  $('#add-item').submit(function(){
    $('#items_ids').val(packageitemsid);
  })
  $('#search-items').keyup(function(){
    search.query  = $(this).val();
    if(search.query.length < 3){
      search.query = null;
    }
    searchItems();
  });
  $('.categor').on('click', '.collection-item', function(){
    //$(this).css('background-color', 'red');
    $(this).toggleClass('active');
    if($(this).hasClass('active')){
      if($(this).attr('categoryid')){
        search.categoryids.push($(this).attr('categoryid'));
        searchItems();
      }
      if($(this).attr('vendorid')){
        search.vendorids.push($(this).attr('vendorid'));
        searchItems();
      }

      if($(this).attr('packageitemid')){
         $.get('/item/'+$(this).attr('packageitemid'), function(item){
           addItem(item);
          });
      }
    }
    else{
      if($(this).attr('categoryid')){
        search.categoryids.splice(search.categoryids.indexOf($(this).attr('categoryid')), 1);
        searchItems();

      }
      if($(this).attr('vendorid')){
        search.vendorids.splice(search.vendorids.indexOf($(this).attr('vendorid')), 1);
        searchItems();
      }
      if($(this).attr('packageitemid')){
        id = $(this).attr('packageitemid');
        removeItem(id);
      }
    }

  })

  $('.modal-trigger').leanModal();


  $('.auxilliary-board i').click(function(){
     imagecontainer.parent().removeClass('appear');
  });

  $('.auxilliary-board > .card-content1 > .test4 > .card-content2 > a:first').click(function(evt){
    startTagging(evt);
    $('.auxilliary-board > .card-content1 > .test4 > .card-content2 > a:last').click(endTagging);
    $('.auxilliary-board > .card-image > img').click(function(evt){
      showTagSuggestions(evt);
      $('ul.tag-suggestions li').click(function(){
        tagItem($(this));
      });

    });
  });

  $('.auxilliary-board > .card-content1 > .test5 > .card-content3 > a:first').click(function(evt){
    removeTagging(evt);
    $('.auxilliary-board > .card-content1 > .test5 > .card-content3 > a:last').click(endRemoving);
  });

  $('.image-box').click(function(){
    imagecontainer.parent().addClass('appear');
    var imgsrc = $(this).find('img').attr('src');
    current_imageid = $(this).attr('imageid');
    console.log(current_imageid);
    imagecontainer.children('img').attr('src', imgsrc);
    drawTags(current_imageid);
    $(window).resize(function(){
      drawTags(current_imageid);
    });
  });

  $('#remove-images-form').submit(function(){
    $('input[name=image_ids]').val(removeList.image_ids);
  });

  $('#remove-tags-form').submit(function(){
    $('input[name=tags_id]').val(removeTags.tags_id);
  });

 $('#remove-items-form').submit(function(){
   $('input[name=item_ids]').val(removeitemList.item_ids);
 })



  $('.btnn').hide();
  $('.image-box').hover(
    function(){
      $(this).children('.btnn').show();
    },
    function(){
      $(this).children('.btnn').hide();
    }
  )



  $('.remove-btn').click(function(){
    var imageBox = $(this).parent().parent();
    var iboximg=$(this).parent();

    removeList.add(imageBox.attr('imageid'));
    imageBox.fadeOut('fast');
    return false;
  });

  $('.remove-btn2').click(function(){
    var tagBox = $(this).parent().parent();
    var tbox=$(this).parent();

    removeTags.add(tbox.attr('itemid'),tbox.siblings('img').attr('src'));
    tagBox.fadeOut('fast');
    return false;
  });


  $('.remove-btn1').click(function(){
    var itembox = $(this).parent().parent();
    var ibox=$(this).parent();

    removeitemList.add(ibox.attr('itemid'),ibox.siblings('img').attr('src'));
    itembox.fadeOut('fast');
    return false;
  });

  function removeItem(id){
    $('.remove-btn1[itemid='+id+']').parent().parent().fadeOut('fast');
    var index=packageitemsid.indexOf(id);
    packageitemsid.splice(index,1);
  }

  $('#package-item-list').on('click','.remove-btn1',function(e){
    var id = $(this).attr('itemid');
    $('.collection-item[packageitemid='+id+']').toggleClass('active');
    removeItem(id);
    return false;
  });



  $('#remove-image-list').on('click', '.imagebx', function(e){
    var imageid = $(this).attr('imageid');
    console.log(imageid);
    var toShow = $('.image-box[imageid='+imageid+']');
    var index = removeList.image_ids.indexOf(imageid);
    if(index > -1){
      removeList.image_ids.splice(index, 1);

    }
    toShow.fadeIn('fast');
    $(this).fadeOut('fast',function(){
      if(removeList.image_ids.length < 1){
        $('.imageremove').hide();
      }
      $(this).remove();
    })
  })

  $('#remove-tags-list').on('click', '.tagbx', function(e){
    var imageid = $(this).attr('imageid');
    var toShow = $('.btnn2[itemid='+itemid+']').parent();
    var index = removeTags.image_ids.indexOf(imageid);
    if(index > -1){
      removeTags.image_ids.splice(index, 1);

    }
    toShow.fadeIn('fast');
    $(this).fadeOut('fast',function(){
      if(removeTags.image_ids.length < 1){
        $('.imageremove').hide();
      }
      $(this).remove();
    })
  })

  $('#remove-items-list').on('click', '.itembx', function(e){
    var itemid = $(this).attr('itemid');
    var toShow = $('.btnn1[itemid='+itemid+']').parent();
    var index = removeitemList.item_ids.indexOf(itemid);
    if(index > -1){
      removeitemList.item_ids.splice(index, 1);
    }
    toShow.fadeIn('fast');
    console.log(removeitemList.item_ids);
    $(this).fadeOut('fast',function(){
      if(removeitemList.item_ids.length < 1){
        $('.itemremove').hide();
      }
      $(this).remove();
    })

  });
})

 
