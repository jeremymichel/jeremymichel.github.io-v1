$(document).ready ->
  $('.button-collapse').sideNav()
  $('.collapsible').collapsible(
    accordion: false
  )
  routie ':tag?', (tag)->
    console.log tag
    if tag == undefined
      $('article').show()
    else
      $('article').hide()
      $('article.' + tag).show()
