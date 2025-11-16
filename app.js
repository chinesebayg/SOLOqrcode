const genText=document.getElementById("gen-text")
const genSize=document.getElementById("gen-size")
const genEcl=document.getElementById("gen-ecl")
const genMargin=document.getElementById("gen-margin")
const genBtn=document.getElementById("gen-btn")
const genCanvas=document.getElementById("gen-canvas")
const genDownload=document.getElementById("gen-download")
const camStart=document.getElementById("cam-start")
const camStop=document.getElementById("cam-stop")
const camFreeze=document.getElementById("cam-freeze")
const camVideo=document.getElementById("cam-video")
const readResult=document.getElementById("read-result")
const fileInput=document.getElementById("file-input")
const camFacing=document.getElementById("cam-facing")
const copyBtn=document.getElementById("copy-btn")
let stream=null
let decoding=false
let stopRequested=false
let freeze=false
function updateCopyState(){const has=!!(readResult.textContent&&readResult.textContent.trim());copyBtn.setAttribute("aria-disabled",has?"false":"true")}
function generate(){const text=genText.value.trim();if(!text){return}const size=parseInt(genSize.value,10);const ecl=genEcl.value;const margin=parseInt(genMargin.value,10);QRCode.toCanvas(genCanvas,text,{width:size,margin,errorCorrectionLevel:ecl},function(err){if(err){return}genDownload.setAttribute("aria-disabled","false");genDownload.href=genCanvas.toDataURL("image/png")})}
genBtn.addEventListener("click",generate)
genText.addEventListener("input",function(){genDownload.setAttribute("aria-disabled","true")})
async function startCamera(){stopRequested=false;freeze=false;camFreeze.textContent="定格 / Freeze";readResult.textContent="";updateCopyState();const facing=camFacing?camFacing.value:"environment";const media=await navigator.mediaDevices.getUserMedia({video:{facingMode:facing}});stream=media;camVideo.srcObject=stream;await camVideo.play();if(!decoding){decoding=true;decodeLoop()}}
function stopCamera(){stopRequested=true;decoding=false;freeze=false;camFreeze.textContent="定格 / Freeze";readResult.textContent="";updateCopyState();if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}camVideo.pause();camVideo.srcObject=null}
camStart.addEventListener("click",startCamera)
camStop.addEventListener("click",stopCamera)
camFreeze.addEventListener("click",function(){freeze=!freeze;camFreeze.textContent=freeze?"取消定格 / Unfreeze":"定格 / Freeze"})
async function decodeOnceFromImage(img){readResult.textContent="";if("BarcodeDetector" in window){const detector=new BarcodeDetector({formats:["qr_code"]});const codes=await detector.detect(img);if(codes&&codes.length){readResult.textContent=codes[0].rawValue;updateCopyState();return}}const canvas=document.createElement("canvas");const ctx=canvas.getContext("2d");canvas.width=img.naturalWidth||img.width;canvas.height=img.naturalHeight||img.height;ctx.drawImage(img,0,0,canvas.width,canvas.height);const data=ctx.getImageData(0,0,canvas.width,canvas.height);const code=window.jsQR?window.jsQR(data.data,canvas.width,canvas.height):null;readResult.textContent=code?code.data:"未识别到QR码";updateCopyState()}
function decodeLoop(){if(stopRequested){return}const next=()=>requestAnimationFrame(decodeLoop);if("BarcodeDetector" in window){const detector=new BarcodeDetector({formats:["qr_code"]});detector.detect(camVideo).then(codes=>{if(stopRequested){return}if(codes&&codes.length){if(!freeze){readResult.textContent=codes[0].rawValue;updateCopyState()}next()}else{next()}}).catch(()=>{next()});return}const w=Math.min(640,camVideo.videoWidth||640);const h=Math.floor(w*(camVideo.videoHeight||480)/(camVideo.videoWidth||640));const canvas=document.createElement("canvas");canvas.width=w;canvas.height=h;const ctx=canvas.getContext("2d");try{ctx.drawImage(camVideo,0,0,w,h);const img=ctx.getImageData(0,0,w,h);const code=window.jsQR?window.jsQR(img.data,w,h):null;if(!freeze){readResult.textContent=code?code.data:"";updateCopyState()}}catch(e){}requestAnimationFrame(decodeLoop)}
fileInput.addEventListener("change",function(){const file=fileInput.files&&fileInput.files[0];if(!file){return}const reader=new FileReader();reader.onload=function(){const img=new Image();img.onload=function(){decodeOnceFromImage(img)};img.src=reader.result};reader.readAsDataURL(file)})
copyBtn.addEventListener("click",function(){const text=(readResult.textContent||"").trim();if(!text){return}navigator.clipboard&&navigator.clipboard.writeText(text)})