import $ from 'jquery';
import './style.scss';

let num = 0;

$('#main').css({
  'font-size': '1.5rem',
});

$('#main').animate({
  marginLeft: '65%',
}, 7000).animate({
  marginLeft: '0',
}, 7000);

setInterval(() => {
  $('#main').animate({
    marginLeft: '65%',
  }, 7000).animate({
    marginLeft: '0',
  }, 7000);
}, 14000);

setInterval(() => {
  num += 1;
  $('#main').html(`You've been on this page for ${num} seconds.`);
}, 1000);
