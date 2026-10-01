let stopLightning = false;
let isUnlocked = false; // Защита от двойного клика

function triggerLightningEffect() {
    const canvas = document.getElementById("lightningCanvas");
    if (!canvas || stopLightning) return;
    const ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let flashes = Math.floor(Math.random() * 3) + 2;

    function drawLightningChain(x1, y1, x2, y2, displace) {
        if (displace < 1.8) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        } else {
            let mid_x = (x1 + x2) / 2;
            let mid_y = (y1 + y2) / 2;
            mid_x += (Math.random() - 0.5) * displace;
            mid_y += (Math.random() - 0.5) * displace;
            drawLightningChain(x1, y1, mid_x, mid_y, displace / 2);
            drawLightningChain(mid_x, mid_y, x2, y2, displace / 2);
        }
    }

    function launchFlash() {
        if (stopLightning) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }
        if (flashes <= 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setTimeout(triggerLightningEffect, Math.random() * 1000 + 400); 
            return;
        }
        flashes--;
        ctx.fillStyle = `rgba(180, 245, 255, ${Math.random() * 0.2 + 0.15})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "rgba(225, 250, 255, 1)";
        ctx.lineWidth = Math.random() * 3 + 2;
        ctx.shadowBlur = 30;
        ctx.shadowColor = "#00e5ff";
        let startX = Math.random() * canvas.width;
        drawLightningChain(startX, 0, startX + (Math.random() - 0.5) * 300, canvas.height, 120);
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setTimeout(launchFlash, Math.random() * 100 + 50);
        }, 70);
    }
    launchFlash();
}

function createEffects() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    container.innerHTML = ""; 
    for (let i = 0; i < 40; i++) {
        let particle = document.createElement('div');
        particle.className = 'particle';
        let size = Math.random() * 5 + 2; 
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * -20) + 's';
        container.appendChild(particle);
    }
}

function changeText(title, text) {
    const h1 = document.getElementById("mainTitle");
    const p = document.getElementById("mainText");
    if (h1) h1.classList.add("fade-out");
    if (p) p.classList.add("fade-out");
    setTimeout(function() {
        if (h1) h1.innerText = title;
        if (p) p.innerText = text;
        if (h1) h1.classList.remove("fade-out");
        if (p) p.classList.remove("fade-out");
    }, 600);
}

function showSingleScreenshot(imgName, duration) {
    const imgElement = document.getElementById("screenshotDisplay");
    if (!imgElement) return;
    imgElement.classList.remove("zoom-active");
    imgElement.src = imgName;
    setTimeout(() => { 
        imgElement.classList.add("zoom-active"); 
    }, 100);
    setTimeout(() => { 
        imgElement.classList.remove("zoom-active"); 
    }, duration - 1200);
}

function playVoice() {
    document.getElementById("startBtn").style.display = "none";
    stopLightning = false;
    triggerLightningEffect();

    const voice = document.getElementById("voice");
    const music = document.getElementById("kamin");
    const finalVoice = document.getElementById("finalVoice");
    const saga = document.getElementById("sagaMusic");

    try { finalVoice.volume = 0; finalVoice.play().then(() => finalVoice.pause()); } catch(e){}
    try { saga.volume = 0; saga.play().then(() => saga.pause()); } catch(e){}

    createEffects();
    if (voice) {
        voice.play().catch(() => startKaminSequence());
        voice.onended = function() { startKaminSequence(); };
    } else {
        startKaminSequence();
    }
}

function startKaminSequence() {
    const music = document.getElementById("kamin");
    if (music) { music.volume = 0.15; music.play().catch(e => console.log(e)); }

    changeText("Иногда самые важные люди появляются случайно", "А потом становятся частью самых тёплых воспоминаний.");
    setTimeout(function() { changeText("Полгода", "Кажется, совсем немного времени."); }, 5000);
    setTimeout(function() { changeText("Но", "Иногда нескольких месяцев достаточно, чтобы человек стал особенным."); }, 10000);
    setTimeout(function() { changeText("Спасибо", "За разговоры. За улыбки. За моменты, которые были только нашими."); }, 15000);

    setTimeout(function() {
        const h1 = document.getElementById("mainTitle");
        const p = document.getElementById("mainText");
        if (h1) h1.style.opacity = "0";
        if (p) p.style.opacity = "0";

        const game = document.getElementById("gameScreen");
        if (game) {
            game.style.display = "flex";
            setTimeout(() => { game.style.opacity = "1"; }, 100);
        }
    }, 20000);
}

// ИСПРАВЛЕНО: Полная и безошибочная активация функции разблокировки воспоминаний
function unlockMemories() {
    if (isUnlocked) return; 
    isUnlocked = true; 

    const game = document.getElementById("gameScreen");
    if (game) {
        game.style.opacity = "0";
        setTimeout(() => { game.style.display = "none"; }, 1000);
    }

    const doorSound = document.getElementById("doorSound");
    if (doorSound) doorSound.play().catch(e => console.log(e));

    triggerLightningEffect();

    const overlay = document.getElementById("bgOverlay");
    if (overlay) overlay.style.background = "rgba(0,0,0,0.88)";

    showSingleScreenshot("screen1.png", 5000);
    
    setTimeout(() => { showSingleScreenshot("screen2.png", 5000); }, 5000);
    setTimeout(() => { showSingleScreenshot("screen3.png", 5000); }, 10000);
    setTimeout(() => { showSingleScreenshot("screen4.png", 5000); }, 15000);
    setTimeout(() => { showSingleScreenshot("screen5.png", 5000); }, 20000);
    setTimeout(() => { showSingleScreenshot("screen6.png", 5000); }, 25000);
    setTimeout(() => { showSingleScreenshot("screen7.png", 5000); }, 30000);
    setTimeout(() => { showSingleScreenshot("screen8.png", 5000); }, 35000);
    setTimeout(() => { showSingleScreenshot("screen9.png", 5000); }, 40000);
    setTimeout(() => { showSingleScreenshot("screen10.png", 5000); }, 45000);

    setTimeout(() => { startFinalSequence(); }, 50000);
}
function startFinalSequence() {
    const music = document.getElementById("kamin");
    const finalVoice = document.getElementById("finalVoice");
    const contentBlock = document.querySelector(".content");
    const h1 = document.getElementById("mainTitle");
    const p = document.getElementById("mainText");
    const pSub = document.getElementById("finalSubText");

    if (music) {
        let fadeKamin = setInterval(function() {
            if (music.volume > 0.02) { music.volume -= 0.02; } 
            else { music.pause(); clearInterval(fadeKamin); }
        }, 100);
    }

    document.getElementById("bgImage").style.display = "none";
    document.getElementById("bgOverlay").style.display = "none";
    document.getElementById("particles-container").style.display = "none";
    stopLightning = true; 

    if (contentBlock) {
        contentBlock.style.justifyContent = "center";
        contentBlock.style.paddingTop = "20px";
    }
    if (h1) { h1.style.transition = "none"; h1.style.opacity = "1"; h1.innerText = ""; }
    if (p) { p.style.transition = "none"; p.style.opacity = "1"; p.innerText = "Спасибо за эти моменты."; }
    if (pSub) pSub.style.transition = "none";

    setTimeout(() => { if (p) p.innerText = "Ирина..."; }, 3000);
    
    setTimeout(() => { 
        if (h1) { h1.className = "huge-text"; h1.innerText = "Я ЛЮБЛЮ ТЕБЯ"; }
        if (p) p.innerText = ""; 
    }, 5000);
    
    setTimeout(() => {
        if (h1) { h1.innerText = ""; h1.className = ""; }
        if (finalVoice) {
            finalVoice.volume = 1;
            finalVoice.play().catch(() => runFinalScreenFive());
            finalVoice.onended = function() { runFinalScreenFive(); };
        } else {
            runFinalScreenFive();
        }
    }, 11000);
}

function runFinalScreenFive() {
    const h1 = document.getElementById("mainTitle");
    const pSub = document.getElementById("finalSubText");
    const saga = document.getElementById("sagaMusic");
    const finalBtns = document.getElementById("finalButtons");

    if (saga) {
        saga.volume = 0.3;
        saga.play().catch(e => console.log("Ошибка саги:", e));
    }
    if (h1) { h1.style.opacity = "1"; h1.innerText = "Ирина ❤️ Эльнар"; }
    if (pSub) { pSub.innerText = "Спасибо за эти полгода."; pSub.style.opacity = "1"; }

    setTimeout(() => {
        if (h1) h1.style.transition = "opacity 2.5s ease";
        if (pSub) pSub.style.transition = "opacity 2.5s ease";
        if (h1) h1.classList.add("fade-out");
        if (pSub) pSub.classList.add("fade-out");
    }, 7000);

    setTimeout(() => {
        if (pSub) pSub.innerText = "";
        if (h1) {
            h1.classList.remove("fade-out");
            h1.style.transition = "opacity 1.5s ease";
            h1.innerText = "Конец?";
        }
    }, 9500);

    setTimeout(() => { if (h1) h1.classList.add("fade-out"); }, 13000);

    setTimeout(() => {
        if (h1) {
            h1.classList.remove("fade-out");
            h1.style.transition = "opacity 1.5s ease";
            h1.innerText = "Может быть, только начало.";
        }
    }, 15000);

    setTimeout(() => {
        if (finalBtns) {
            finalBtns.style.opacity = "1";
            finalBtns.style.pointerEvents = "auto";
        }
    }, 20000);
}

function actionDelete() { window.location.href = "delete.html"; }
function actionSave() { window.location.href = "save.html"; }
