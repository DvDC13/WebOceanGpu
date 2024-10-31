import * as BABYLON from "@babylonjs/core";
import vertShader from "./shaders/vert.glsl";
import fragShader from "./shaders/frag.glsl";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Scene Setup
const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, 0, 0), scene);
camera.attachControl(canvas, true);

const light = new BABYLON.PointLight("light", new BABYLON.Vector3(5, 5, 5), scene);

const box = BABYLON.MeshBuilder.CreateBox("box", { width: 1, height: 1, depth: 1 }, scene);

BABYLON.Effect.ShadersStore["customVertexShader"] = vertShader;
BABYLON.Effect.ShadersStore["customFragmentShader"] = fragShader;

const shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
  vertex: "custom",
  fragment: "custom",
},
{
  attributes: ["position"],
  uniforms: ["worldViewProjection"],
});

const mainTexture = new BABYLON.Texture("./assets/tex_test.jpeg", scene);
shaderMaterial.setTexture("textureSampler", mainTexture);
box.material = shaderMaterial;

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});