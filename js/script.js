'use strict';

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';


import tabs from './modules/tabs';
import modal, { openMod } from './modules/modal';
import cards from './modules/cards';
import timer from './modules/timer';
import calc from './modules/calc';
import slider from './modules/slider';
import forms from './modules/forms';


window.addEventListener('DOMContentLoaded', () => {
  const timerModalId = setTimeout(() => openMod('.modal', timerModalId), 5000);


  tabs('.tabheader__item', '.tabcontent', '.tabheader__items','tabheader__item_active');
  modal('[data-modal]', '.modal', timerModalId);
  timer();
  cards();
  calc();
  forms('form', timerModalId);
  slider({
    conteiner: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
    slide: '.offer__slide'

  });
        

  //tabs

  

  //timer

  

  //modalWindow

  



  //menuCard rendering with classes   

  // Forms

 


  //slider


  // Calc

  
                

});
