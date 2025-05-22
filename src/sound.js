import React from 'react';
import sound from './assets/sound.mp3';
import dragsound from './assets/drag.mp3';
import gamesound from './assets/gameSound.mp3';

export function click() {
    const audio = new Audio(sound);
    audio.volume = 0.2; 
    audio.currentTime = 0.05; 
    audio.play();
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, 500); 
}

export function dragSound() {
    const audio = new Audio(dragsound);
    audio.volume = 0.1;
    audio.play();
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, 500); 
}

export function gameSound() {
    const audio = new Audio(gamesound);
    audio.volume = 0.7;
    audio.currentTime = 0.5;
    audio.play()
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, 1000); 
}