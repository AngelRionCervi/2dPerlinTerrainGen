let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let tiles = [];

const tileSize = 4;

const seaColor = "#0c35ed";
const sandColor = '#f5dd42';
const reefColor = '#3C5DF0';
const riverColor = '#3C5DF0';
const coldForestColor = "#00801e";
const normalForestColor = "#00c42e";
const normalMountainColor = "#D6C3DE";
const hotMountainColor = "#A5682A";

const waveColorsPeak = ['#163EF1', '#1A42F2', '#1F46F4', '#1A42F2', '#163EF1'];
const waveColorsStartEnd = [seaColor, '#163EF1', '#1A42F2', '#163EF1', seaColor];
const waveColorsEnd = [seaColor, seaColor, '#163EF1', seaColor, seaColor];


