/* Local perceptual similarity, no uploads or external services. */
window.SilivriVision={
 describe(image){const canvas=document.createElement('canvas');canvas.width=64;canvas.height=64;const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.fillStyle='#fff';ctx.fillRect(0,0,64,64);ctx.drawImage(image,0,0,64,64);let data=ctx.getImageData(0,0,64,64).data;
 const corners=[0,63,4032,4095],bg=[0,1,2].map(c=>corners.reduce((s,i)=>s+data[i*4+c],0)/4);let x0=63,y0=63,x1=0,y1=0;for(let y=0;y<64;y++)for(let x=0;x<64;x++){const i=(y*64+x)*4;if(Math.hypot(data[i]-bg[0],data[i+1]-bg[1],data[i+2]-bg[2])>65){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}}
 if(x1-x0>5&&y1-y0>5){const crop=document.createElement('canvas');crop.width=64;crop.height=64;crop.getContext('2d').drawImage(canvas,x0,y0,x1-x0+1,y1-y0+1,0,0,64,64);ctx.clearRect(0,0,64,64);ctx.drawImage(crop,0,0);}
 const small=document.createElement('canvas');small.width=8;small.height=8;const sc=small.getContext('2d',{willReadFrequently:true});sc.drawImage(canvas,0,0,8,8);data=sc.getImageData(0,0,8,8).data;const gray=[],hist=Array(24).fill(0);for(let i=0;i<64;i++){gray.push((data[i*4]*.299+data[i*4+1]*.587+data[i*4+2]*.114)/255);for(let c=0;c<3;c++)hist[c*8+Math.min(7,Math.floor(data[i*4+c]/32))]+=1/64;}
 const avg=gray.reduce((a,b)=>a+b,0)/64,dev=Math.sqrt(gray.reduce((s,v)=>s+(v-avg)**2,0)/64)||1;return [...gray.map(v=>(v-avg)/dev),...hist].map(v=>Math.round(v*1000)/1000);},
 distance(a,b){if(!a||!b||a.length!==88||b.length!==88)return Infinity;let shape=0,color=0;for(let i=0;i<64;i++)shape+=(a[i]-b[i])**2;for(let i=64;i<88;i++)color+=Math.abs(a[i]-b[i]);return .8*shape/64+.2*color/6;}
};
