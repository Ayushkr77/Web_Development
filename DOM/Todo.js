let c=0;
function callback() {
    const el=document.querySelectorAll("h2")[1];
    el.innerHTML=c;   // or textContent
    c++;
}
setInterval(callback,1000);


// Update done
// Now study deleting, adding,...