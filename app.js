(function () {
  'use strict';

  // 所有回忆照片数据：文件名、标题、氛围标签、标签色
  // featured 与 caption 用于“精选瞬间”区域
  const memories = [
    {
      file: '第一次加微信.png',
      title: '第一次加微信',
      tag: '开始',
      tagColor: '#7d6b91',
      featured: true,
      caption: '一切从那句“加个微信吧”开始。屏幕那头的你，后来成了我生活里最亮的光。'
    },
    {
      file: '第一次表白.png',
      title: '第一次表白',
      tag: '心动',
      tagColor: '#c084a8',
      featured: true,
      caption: '紧张又勇敢地敲下喜欢，把心里话都说出来的那一刻，连空气都是甜的。'
    },
    {
      file: '第一次见面等待中.jpg',
      title: '第一次见面等待中',
      tag: '期待',
      tagColor: '#b8d96f'
    },
    {
      file: '第一次见面的路上.jpg',
      title: '第一次见面的路上',
      tag: '奔赴',
      tagColor: '#6bb3a3'
    },
    {
      file: '第一次见面吃饭.jpg',
      title: '第一次见面吃饭',
      tag: '烟火',
      tagColor: '#e07a5f',
      featured: true,
      caption: '第一顿火锅热气腾腾，就像第一次见面时，心里扑通扑通的小火苗。'
    },
    {
      file: '第一次牵手.jpg',
      title: '第一次牵手',
      tag: '触碰',
      tagColor: '#d4a373',
      featured: true,
      caption: '第一次牵起你的手，世界突然变得很安静，只剩下心跳的声音。'
    },
    {
      file: '第一次看电影.jpg',
      title: '第一次看电影',
      tag: '沉浸',
      tagColor: '#9b2335'
    },
    {
      file: '第一次给我点奶茶.jpg',
      title: '第一次给我点奶茶',
      tag: '甜蜜',
      tagColor: '#f2cc8f'
    },
    {
      file: '第一次收到礼物.jpg',
      title: '第一次收到礼物',
      tag: '惊喜',
      tagColor: '#a67c52'
    },
    {
      file: '第一次陪她过生日.jpeg',
      title: '第一次陪宝宝过生日',
      tag: '陪伴',
      tagColor: '#8ecae6'
    },
    {
      file: '第一次陪她过生日2.jpeg',
      title: '第一次陪宝宝过生日(蛋糕)',
      tag: '许愿',
      tagColor: '#e9c46a'
    },
    {
      file: '520礼物.jpg',
      title: '520 礼物',
      tag: '仪式感',
      tagColor: '#ff8fab'
    },
    {
      file: '可爱自拍.png',
      title: '可爱自拍',
      tag: '日常',
      tagColor: '#9ca3af'
    },
    {
      file: '合照.jpg',
      title: '合照',
      tag: '我们',
      tagColor: '#b76e79'
    },
    {
      file: '花.jpg',
      title: '花',
      tag: '浪漫',
      tagColor: '#d4a5a5',
      featured: true,
      caption: '一束花的仪式感永远不会过时；就像我爱你，永远新鲜。'
    },
    {
      file: '见面礼物.jpg',
      title: '见面礼物',
      tag: '惦念',
      tagColor: '#bc6c25'
    },
    {
      file: '车窗起雾表白.jpg',
      title: '车窗起雾表白',
      tag: '表白',
      tagColor: '#e29578'
    }
  ];

  const featuredGrid = document.getElementById('featuredGrid');
  const galleryGrid = document.getElementById('galleryGrid');
  const bgVideo = document.getElementById('bgVideo');
  const scrollHint = document.getElementById('scrollHint');
  const backToTop = document.getElementById('backToTop');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const scrollProgress = document.getElementById('scrollProgress');
  const particleCanvas = document.getElementById('particleCanvas');

  const SUBTITLE_TEXT = '我们的故事，从第一句话开始';
  const TYPE_SPEED = 90;
  const TYPE_PAUSE = 1600;

  function imageUrl(fileName) {
    return 'images/' + encodeURIComponent(fileName);
  }

  // 打字机效果
  function initTypewriter() {
    if (!heroSubtitle) return;

    let index = 0;
    let isDeleting = false;

    function tick() {
      const fullText = SUBTITLE_TEXT;
      const current = isDeleting
        ? fullText.substring(0, index - 1)
        : fullText.substring(0, index + 1);

      heroSubtitle.textContent = current;

      if (!isDeleting && current === fullText) {
        isDeleting = true;
        setTimeout(tick, TYPE_PAUSE);
        return;
      }

      if (isDeleting && current === '') {
        isDeleting = false;
        setTimeout(tick, TYPE_PAUSE / 2);
        return;
      }

      index = isDeleting ? index - 1 : index + 1;
      setTimeout(tick, isDeleting ? TYPE_SPEED / 2 : TYPE_SPEED);
    }

    setTimeout(tick, 1200);
  }

  // 渲染精选瞬间
  function renderFeatured() {
    const featured = memories.filter(function (m) { return m.featured; });
    featuredGrid.innerHTML = featured.map(function (m, index) {
      return (
        '<article class="featured-card reveal tilt-card" style="transition-delay: ' + (index * 100) + 'ms" data-tilt>' +
          '<div class="shine" aria-hidden="true"></div>' +
          '<div class="image-wrapper">' +
            '<img src="' + imageUrl(m.file) + '" alt="' + m.title + '" loading="lazy">' +
          '</div>' +
          '<div class="content">' +
            '<h3>' + m.title + '</h3>' +
            '<p>' + m.caption + '</p>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  // 渲染回忆卡片墙
  function renderGallery() {
    galleryGrid.innerHTML = memories.map(function (m, index) {
      return (
        '<article class="memory-card reveal tilt-card" style="transition-delay: ' + ((index % 3) * 80) + 'ms" data-tilt>' +
          '<div class="image-wrapper">' +
            '<img src="' + imageUrl(m.file) + '" alt="' + m.title + '" loading="lazy">' +
          '</div>' +
          '<div class="content">' +
            '<h3>' + m.title + '</h3>' +
            '<span class="tag" style="background-color: ' + m.tagColor + '">' + m.tag + '</span>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  // 滚动揭示
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  // 加载 ACG 动态视频背景
  function loadBackground() {
    if (!bgVideo) return;

    const apiUrl = 'https://t.alcy.cc/acg?_=' + Date.now();
    const fallbackUrl = imageUrl('花.jpg');
    let hasInteracted = false;

    bgVideo.poster = fallbackUrl;
    bgVideo.src = apiUrl;
    bgVideo.load();

    bgVideo.addEventListener('canplay', function onCanPlay() {
      bgVideo.classList.add('is-loaded');
      bgVideo.play().catch(function (err) {
        // 浏览器自动播放策略可能阻止带声音播放，先静音播放
        if (bgVideo.muted === false) {
          bgVideo.muted = true;
          bgVideo.play().catch(function () {});
        }
      });
      bgVideo.removeEventListener('canplay', onCanPlay);
    });

    bgVideo.addEventListener('error', function onError() {
      bgVideo.classList.add('is-loaded');
      bgVideo.removeEventListener('error', onError);
    });

    // 用户首次交互后尝试恢复声音
    function unmuteOnInteraction() {
      if (hasInteracted) return;
      hasInteracted = true;
      if (bgVideo.muted && bgVideo.paused === false) {
        bgVideo.muted = false;
        bgVideo.play().catch(function () {});
      }
      document.removeEventListener('click', unmuteOnInteraction);
      document.removeEventListener('touchstart', unmuteOnInteraction);
    }

    document.addEventListener('click', unmuteOnInteraction);
    document.addEventListener('touchstart', unmuteOnInteraction);
  }

  // 灯箱查看大图
  function initLightbox() {
    function open(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    galleryGrid.addEventListener('click', function (e) {
      const card = e.target.closest('.memory-card');
      if (!card) return;
      const img = card.querySelector('img');
      open(img.src, img.alt);
    });

    lightboxClose.addEventListener('click', close);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
        close();
      }
    });
  }

  // 回到顶部
  function initBackToTop() {
    function toggle() {
      if (window.scrollY > 400) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }

    window.addEventListener('scroll', toggle, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    toggle();
  }

  // 向下滚动提示
  function initScrollHint() {
    scrollHint.addEventListener('click', function () {
      document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 滚动进度条
  function initScrollProgress() {
    if (!scrollProgress) return;

    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = progress + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // 3D 倾斜卡片效果
  function initTiltCards() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    function onMouseMove(e) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px) scale(1.01)';
    }

    function onMouseLeave(e) {
      e.currentTarget.style.transform = '';
    }

    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      card.addEventListener('mousemove', onMouseMove, { passive: true });
      card.addEventListener('mouseleave', onMouseLeave, { passive: true });
    });
  }

  // 爱心粒子背景
  function initParticles() {
    if (!particleCanvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = particleCanvas.getContext('2d');
    if (!ctx) return;

    let width, height;
    let particles = [];
    const PARTICLE_COUNT = 34;
    const COLORS = ['rgba(255, 214, 224, ', 'rgba(212, 165, 165, ', 'rgba(183, 110, 121, ', 'rgba(125, 107, 145, '];

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      particleCanvas.width = width;
      particleCanvas.height = height;
    }

    function createParticle() {
      return {
        x: Math.random() * width,
        y: height + Math.random() * 100,
        size: Math.random() * 10 + 6,
        speedY: Math.random() * 0.8 + 0.25,
        speedX: (Math.random() - 0.5) * 0.6,
        opacity: Math.random() * 0.4 + 0.25,
        colorBase: COLORS[Math.floor(Math.random() * COLORS.length)],
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01
      };
    }

    function init() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = createParticle();
        p.y = Math.random() * height;
        particles.push(p);
      }
    }

    function drawHeart(x, y, size, opacity, colorBase) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = colorBase + opacity + ')';
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, size * 0.7, 0, size, 0, size);
      ctx.bezierCurveTo(0, size, size / 2, size * 0.7, size / 2, topCurveHeight);
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    let animationId;
    let lastTime = 0;

    function animate(timestamp) {
      if (timestamp - lastTime < 33) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastTime = timestamp;

      ctx.clearRect(0, 0, width, height);

      particles.forEach(function (p) {
        p.y -= p.speedY;
        p.sway += p.swaySpeed;
        p.x += Math.sin(p.sway) * 0.4 + p.speedX;

        if (p.y + p.size < -20) {
          Object.assign(p, createParticle());
        }

        drawHeart(p.x, p.y, p.size, p.opacity, p.colorBase);
      });

      animationId = requestAnimationFrame(animate);
    }

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(animate);
      }
    }

    resize();
    init();
    animationId = requestAnimationFrame(animate);

    window.addEventListener('resize', function () {
      resize();
      init();
    }, { passive: true });

    document.addEventListener('visibilitychange', handleVisibility);
  }

  function init() {
    renderFeatured();
    renderGallery();
    loadBackground();
    initReveal();
    initLightbox();
    initBackToTop();
    initScrollHint();
    initScrollProgress();
    initTypewriter();
    initParticles();
    initTiltCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
