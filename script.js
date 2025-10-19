(function() {
    'use strict';
    
    const CONFIG = {
        SCROLL_THRESHOLD: 300,
        DEBOUNCE_DELAY: 100,
        ANIMATION_THRESHOLD: 0.1,
        RESUME_URL: 'https://raw.githubusercontent.com/therealmharc/therealmharc.github.io/refs/heads/master/resume.pdf',
        RESUME_FILENAME: 'Mharc_Duller_Resume.pdf',
        DOWNLOAD_FEEDBACK_DURATION: 2000
    };
    
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    class ThemeManager {
        constructor() {
            this.root = document.documentElement;
            this.toggle = document.getElementById('theme-toggle');
            this.icon = this.toggle?.querySelector('i');
            this.init();
        }
        
        init() {
            const saved = localStorage.getItem('theme');
            
            if (saved) {
                this.setTheme(saved);
            } else {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                this.setTheme(prefersDark ? 'dark' : 'light');
            }
            
            this.toggle?.addEventListener('click', () => this.toggleTheme());
        }
        
        toggleTheme() {
            const current = this.root.classList.contains('dark') ? 'dark' : 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            this.setTheme(next);
            localStorage.setItem('theme', next);
        }
        
        setTheme(theme) {
            if (theme === 'dark') {
                this.root.classList.add('dark');
                if (this.icon) {
                    this.icon.className = 'fas fa-sun';
                }
            } else {
                this.root.classList.remove('dark');
                if (this.icon) {
                    this.icon.className = 'fas fa-moon';
                }
            }
        }
    }
    
    class ScrollManager {
        constructor() {
            this.backToTopBtn = document.getElementById('back-to-top');
            this.progressBar = this.createProgressBar();
            this.init();
        }
        
        createProgressBar() {
            const progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            document.body.prepend(progressBar);
            return progressBar;
        }
        
        updateProgress() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
            this.progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
        }
        
        init() {
            const handleScroll = debounce(() => {
                const shouldShow = window.scrollY > CONFIG.SCROLL_THRESHOLD;
                if (this.backToTopBtn) {
                    this.backToTopBtn.classList.toggle('visible', shouldShow);
                }
                this.updateProgress();
            }, CONFIG.DEBOUNCE_DELAY);
            
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
            
            if (this.backToTopBtn) {
                this.backToTopBtn.addEventListener('click', () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }
        }
    }
    
    class AnimationObserver {
        constructor() {
            this.sections = document.querySelectorAll('section');
            this.init();
        }
        
        init() {
            if (!('IntersectionObserver' in window)) {
                this.sections.forEach(section => {
                    section.style.opacity = '1';
                });
                return;
            }
            
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: CONFIG.ANIMATION_THRESHOLD }
            );
            
            this.sections.forEach(section => {
                section.style.opacity = '0';
                observer.observe(section);
            });
        }
    }
    
    class ResumeDownloader {
        constructor() {
            this.downloadBtn = document.getElementById('resume-download');
            this.init();
        }
        
        init() {
            if (!this.downloadBtn) return;
            this.downloadBtn.addEventListener('click', (e) => this.handleDownload(e));
        }
        
        async handleDownload(e) {
            e.preventDefault();
            
            const originalHTML = this.downloadBtn.innerHTML;
            const originalBg = this.downloadBtn.style.background;
            
            try {
                this.setDownloadingState();
                await this.downloadFile();
                this.setSuccessState();
            } catch (error) {
                console.error('Download failed:', error);
                this.setErrorState();
            } finally {
                setTimeout(() => {
                    this.resetState(originalHTML, originalBg);
                }, CONFIG.DOWNLOAD_FEEDBACK_DURATION);
            }
        }
        
        setDownloadingState() {
            this.downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            this.downloadBtn.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
            this.downloadBtn.disabled = true;
        }
        
        setSuccessState() {
            this.downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            this.downloadBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        }
        
        setErrorState() {
            this.downloadBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
            this.downloadBtn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        }
        
        resetState(html, bg) {
            this.downloadBtn.innerHTML = html;
            this.downloadBtn.style.background = bg;
            this.downloadBtn.disabled = false;
        }
        
        downloadFile() {
            return new Promise((resolve, reject) => {
                try {
                    const link = document.createElement('a');
                    link.href = CONFIG.RESUME_URL;
                    link.download = CONFIG.RESUME_FILENAME;
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
    
    function init() {
        new ThemeManager();
        new ScrollManager();
        new AnimationObserver();
        new ResumeDownloader();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
