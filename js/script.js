/* =========================================================
   CONTACT FORM SETTINGS (EmailJS)
   1. Create a free account at https://www.emailjs.com
   2. Add an email service  -> copy its Service ID
   3. Create an email template -> copy its Template ID
      Template variables to use: {{name}}, {{email}}, {{phone}}, {{message}}
      (set "Reply To" to {{email}})
   4. Paste the IDs below. Until then, the Submit button
      falls back to WhatsApp so the form never breaks.
   ========================================================= */
const EMAILJS_PUBLIC_KEY  = "e8r3B4W7ySQoB8JVE";
const EMAILJS_SERVICE_ID  = "service_thu5ucn";
const EMAILJS_TEMPLATE_ID = "template_jw6r4ce";
const WHATSAPP_NUMBER     = "919510345505";   // country code + number, no "+"

const emailConfigured =
    typeof emailjs !== "undefined" &&
    !EMAILJS_SERVICE_ID.startsWith("YOUR_") &&
    !EMAILJS_TEMPLATE_ID.startsWith("YOUR_");

if (typeof emailjs !== "undefined") {
    try { emailjs.init(EMAILJS_PUBLIC_KEY); } catch (err) { console.warn("EmailJS init failed", err); }
}

$(document).ready(function(){

    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load',function(){
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if(window.scrollY>60){
            document.querySelector('#scroll-top').classList.add('active');
        }else{
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section[id]').each(function(){
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if(top>offset && top<offset+height){
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling (one handler only, keeps the fixed header in view)
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        var hash = this.hash;
        if (!hash || hash === '#') {
            $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
            return;
        }

        var $target = $(hash);
        if (!$target.length) return;

        var headerHeight = $('header').outerHeight();
        $('html, body').animate({
            scrollTop: $target.offset().top - headerHeight
        }, 600, 'swing');
    });
});

const originalTitle = document.title;
document.addEventListener('visibilitychange',
function(){
    if(document.visibilityState === "visible"){
        document.title = originalTitle;
    }
    else {
        document.title = "Come Back To Portfolio";
    }
});

// <!-- typed js effect starts -->
    var typed = new Typed(".typing-text", {
        strings: ["Full Stack Developer", "React.js Developer", "PHP & MySQL Developer", "SaaS Builder"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
      });
// <!-- typed js effect ends -->

// <!-- tilt js effect starts -->
      VanillaTilt.init(document.querySelectorAll(".more-projects .tilt, .home .tilt, .about .tilt"), {
        max: 15,
      });
// <!-- tilt js effect ends -->

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: false,
    mobile: true
});


/* SCROLL HOME */
srtop.reveal('.home .content h3',{delay: 200});
srtop.reveal('.home .content p',{delay: 200});
srtop.reveal('.home .content .btn',{delay: 200});

srtop.reveal('.home .image',{delay: 400});
srtop.reveal('.home .linkedin',{interval: 200});
srtop.reveal('.home .github',{interval: 200});
srtop.reveal('.home .twitter',{interval: 200});
srtop.reveal('.home .telegram',{interval: 200});
srtop.reveal('.home .instagram',{interval: 200});


/* SCROLL ABOUT */
srtop.reveal('.about .content h3',{delay: 200});
srtop.reveal('.about .content .tag',{delay: 200});
srtop.reveal('.about .content p',{delay: 200});
srtop.reveal('.about .content .box-container',{delay: 200});
srtop.reveal('.about .content .resumebtn',{delay: 200});

/* SCROLL EDUCATION */
srtop.reveal('.skills .bar',{interval: 60, origin: 'bottom', distance: '20px', scale: 0.85, duration: 600});
srtop.reveal('.about .stats',{delay: 200});
srtop.reveal('.education .box',{interval: 150});

/* SCROLL PROJECTS */
srtop.reveal('.work .showcase-card',{interval: 150});
srtop.reveal('.work .more-projects .box',{interval: 100});

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline',{delay: 200});
srtop.reveal('.experience .timeline .container',{interval: 200});

/* SCROLL CONTACT */
srtop.reveal('.contact .container',{delay: 200});
srtop.reveal('.contact .container .form-group',{delay: 200});


/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contact-form');
const sendBtn     = document.getElementById('send-btn');
const waBtn       = document.getElementById('wa-btn');
const formStatus  = document.getElementById('form-status');

function setStatus(text, type){
    formStatus.textContent = text;
    formStatus.className = 'form-status' + (type ? ' ' + type : '');
}

function waLink(){
    var name  = contactForm.elements['name'].value;
    var email = contactForm.elements['email'].value;
    var phone = contactForm.elements['phone'].value;
    var msg   = contactForm.elements['message'].value;

    var text = "Name : " + name + "\n" +
               "Email : " + email + "\n" +
               "Phone : " + phone + "\n" +
               "Message : " + msg;

    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
}

function gotowhatsapp(){
    return window.open(waLink(), "_blank");
}

contactForm.addEventListener('submit', function(e){
    e.preventDefault();

    // EmailJS not set up yet -> use WhatsApp so the visitor can still reach you
    if(!emailConfigured){
        setStatus('Opening WhatsApp so you can send your message…', 'info');
        gotowhatsapp();
        return;
    }

    sendBtn.disabled = true;
    setStatus('Sending…', 'info');

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm, EMAILJS_PUBLIC_KEY)
        .then(function(){
            setStatus('Thank you! Your message has been sent.', 'success');
            contactForm.reset();
        }, function(err){
            console.warn('EmailJS failed', err);
            var why = err && (err.status ? err.status + ' ' : '') + (err && err.text ? err.text : '');
            // fallback: open WhatsApp with the same message
            var w = gotowhatsapp();
            if(w){
                setStatus('Email could not be sent' + (why ? ' (' + why + ')' : '') + ', so WhatsApp has been opened. Please press Send there.', 'info');
            } else {
                formStatus.className = 'form-status error';
                formStatus.innerHTML = 'Email could not be sent' + (why ? ' (' + why.replace(/</g,'&lt;') + ')' : '') + '. <a href="' + waLink() + '" target="_blank" rel="noopener">Click here to send on WhatsApp</a>.';
            }
        })
        .then(function(){
            sendBtn.disabled = false;
        });
});

waBtn.addEventListener('click', function(){
    if(!contactForm.reportValidity()) return;
    gotowhatsapp();
});


/* ===== PROJECT CAROUSELS ===== */
(function(){
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<button type="button" class="lb-close" aria-label="Close"><i class="fas fa-times"></i></button><img alt="">';
    document.body.appendChild(lightbox);
    var lbImg = lightbox.querySelector('img');
    function closeLb(){ lightbox.classList.remove('open'); }
    lightbox.addEventListener('click', closeLb);
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeLb(); });

    document.querySelectorAll('[data-carousel]').forEach(function(car){
        var track = car.querySelector('.car-track');
        var imgs  = track.querySelectorAll('img');
        var dots  = car.querySelector('.car-dots');
        var count = car.querySelector('.car-count');
        var idx = 0;

        imgs.forEach(function(img, i){
            var d = document.createElement('button');
            d.type = 'button';
            d.setAttribute('aria-label', 'Screenshot ' + (i + 1));
            d.addEventListener('click', function(){ go(i); });
            dots.appendChild(d);
            img.addEventListener('click', function(){
                lbImg.src = img.src; lbImg.alt = img.alt;
                lightbox.classList.add('open');
            });
        });

        function show(i){
            idx = i;
            count.textContent = (i + 1) + ' / ' + imgs.length;
            dots.querySelectorAll('button').forEach(function(d, k){ d.classList.toggle('on', k === i); });
        }
        function go(i){
            i = (i + imgs.length) % imgs.length;
            track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
            show(i);
        }
        track.addEventListener('scroll', function(){
            var i = Math.round(track.scrollLeft / track.clientWidth);
            if(i !== idx) show(i);
        }, { passive: true });
        car.querySelector('.prev').addEventListener('click', function(){ go(idx - 1); });
        car.querySelector('.next').addEventListener('click', function(){ go(idx + 1); });
        show(0);
    });
})();

/* ===== COUNT-UP STATS ===== */
(function(){
    var nums = document.querySelectorAll('[data-count]');
    function run(el){
        var end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = null;
        function step(t){
            if(!t0) t0 = t;
            var p = Math.min((t - t0) / 1200, 1);
            el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
            if(p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
    if(!('IntersectionObserver' in window)){ nums.forEach(function(n){ n.textContent = n.dataset.count + (n.dataset.suffix || ''); }); return; }
    var io = new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting){ run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    nums.forEach(function(n){ io.observe(n); });
})();

/* ===== SCROLL PROGRESS BAR + SKILL POP-IN ===== */
(function(){
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    window.addEventListener('scroll', function(){
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? window.scrollY / h * 100 : 0) + '%';
    }, { passive: true });

})();
