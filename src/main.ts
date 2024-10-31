import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Scene Setup
const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, 0, 0), scene);
camera.attachControl(canvas, true);

const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});