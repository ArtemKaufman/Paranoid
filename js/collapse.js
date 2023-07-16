const HandyCollapse = (function () {
  'use strict';
  var g = Object.defineProperty;
  var f = (l, n, t) =>
    n in l
      ? g(l, n, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (l[n] = t);
  var h = (l, n, t) => (f(l, typeof n != 'symbol' ? n + '' : n, t), t);
  class l {
    constructor(t = {}) {
      h(this, 'toggleContentEls');
      h(this, 'toggleButtonEls');
      h(this, 'itemsState', {});
      h(this, 'options');
      const s = typeof t == 'object' && 'nameSpace' in t ? t.nameSpace : 'hc',
        i = {
          nameSpace: 'hc',
          toggleButtonAttr: `data-${s}-control`,
          toggleContentAttr: `data-${s}-content`,
          activeClass: 'is-active',
          isAnimation: !0,
          closeOthers: !0,
          animationSpeed: 400,
          cssEasing: 'ease-in-out',
          onSlideStart: () => {},
          onSlideEnd: () => {},
        };
      (this.options = { ...i, ...t }),
        (this.toggleContentEls = [].slice.call(
          document.querySelectorAll(`[${this.options.toggleContentAttr}]`)
        )),
        (this.toggleButtonEls = [].slice.call(
          document.querySelectorAll(`[${this.options.toggleButtonAttr}]`)
        )),
        this.toggleContentEls.length !== 0 &&
          this.initContentsState(this.toggleContentEls),
        this.toggleButtonEls.length !== 0 &&
          this.handleButtonsEvent(this.toggleButtonEls);
    }
    initContentsState(t) {
      (this.itemsState = {}),
        t.forEach((s) => {
          (s.style.overflow = 'hidden'), (s.style.maxHeight = 'none');
          const i = s.classList.contains(this.options.activeClass),
            e = s.getAttribute(this.options.toggleContentAttr);
          !e ||
            (this.setItemState(e, i),
            i ? this.open(e, !1, !1) : this.close(e, !1, !1));
        });
    }
    handleButtonsEvent(t) {
      t.forEach((s) => {
        const i = s.getAttribute(this.options.toggleButtonAttr);
        i &&
          s.addEventListener(
            'click',
            (e) => {
              e.preventDefault(), this.toggleSlide(i, !0);
            },
            !1
          );
      });
    }
    setItemState(t, s) {
      this.itemsState[t] = { isOpen: s, isAnimating: !1 };
    }
    toggleSlide(t, s = !0) {
      var i, e;
      ((i = this.itemsState[t]) != null && i.isAnimating) ||
        (((e = this.itemsState[t]) == null ? void 0 : e.isOpen) === !1
          ? this.open(t, s, this.options.isAnimation)
          : this.close(t, s, this.options.isAnimation));
    }
    open(t, s = !0, i = !0) {
      if (!t) return;
      Object.prototype.hasOwnProperty.call(this.itemsState, t) ||
        this.setItemState(t, !1);
      const e = document.querySelector(
        `[${this.options.toggleContentAttr}='${t}']`
      );
      if (!e) return;
      (this.itemsState[t].isAnimating = !0),
        this.options.closeOthers &&
          [].slice.call(this.toggleContentEls).forEach((a) => {
            const c = a.getAttribute(this.options.toggleContentAttr);
            c && c !== t && this.close(c, !1, i);
          }),
        s !== !1 && this.options.onSlideStart(!0, t);
      const r = this.getTargetHeight(e);
      (e.style.visibility = 'visible'),
        e.classList.add(this.options.activeClass);
      const o = document.querySelectorAll(
        `[${this.options.toggleButtonAttr}='${t}']`
      );
      o.length > 0 &&
        [].slice.call(o).forEach((a) => {
          a.classList.add(this.options.activeClass),
            a.hasAttribute('aria-expanded') &&
              a.setAttribute('aria-expanded', 'true');
        }),
        i
          ? ((e.style.overflow = 'hidden'),
            (e.style.transition = `${this.options.animationSpeed}ms ${this.options.cssEasing}`),
            (e.style.maxHeight = (r || '1000') + 'px'),
            setTimeout(() => {
              s !== !1 && this.options.onSlideEnd(!0, t),
                (e.style.maxHeight = 'none'),
                (e.style.transition = ''),
                (e.style.overflow = ''),
                (this.itemsState[t].isAnimating = !1);
            }, this.options.animationSpeed))
          : ((e.style.maxHeight = 'none'),
            (e.style.overflow = ''),
            (this.itemsState[t].isAnimating = !1)),
        (this.itemsState[t].isOpen = !0),
        e.hasAttribute('aria-hidden') && e.setAttribute('aria-hidden', 'false');
    }
    close(t, s = !0, i = !0) {
      if (!t) return;
      Object.prototype.hasOwnProperty.call(this.itemsState, t) ||
        this.setItemState(t, !1),
        (this.itemsState[t].isAnimating = !0),
        s !== !1 && this.options.onSlideStart(!1, t);
      const e = document.querySelector(
        `[${this.options.toggleContentAttr}='${t}']`
      );
      (e.style.overflow = 'hidden'),
        e.classList.remove(this.options.activeClass),
        (e.style.maxHeight = e.clientHeight + 'px'),
        setTimeout(() => {
          e.style.maxHeight = '0px';
        }, 5);
      const r = document.querySelectorAll(
        `[${this.options.toggleButtonAttr}='${t}']`
      );
      r.length > 0 &&
        [].slice.call(r).forEach((o) => {
          o.classList.remove(this.options.activeClass),
            o.hasAttribute('aria-expanded') &&
              o.setAttribute('aria-expanded', 'false');
        }),
        i
          ? ((e.style.transition = `${this.options.animationSpeed}ms ${this.options.cssEasing}`),
            setTimeout(() => {
              s !== !1 && this.options.onSlideEnd(!1, t),
                (e.style.transition = ''),
                (this.itemsState[t].isAnimating = !1),
                (e.style.visibility = 'hidden');
            }, this.options.animationSpeed))
          : (this.options.onSlideEnd(!1, t),
            (this.itemsState[t].isAnimating = !1),
            (e.style.visibility = 'hidden')),
        Object.prototype.hasOwnProperty.call(this.itemsState, t) &&
          (this.itemsState[t].isOpen = !1),
        e.hasAttribute('aria-hidden') && e.setAttribute('aria-hidden', 'true');
    }
    getTargetHeight(t) {
      if (!t) return;
      const s = t.cloneNode(!0),
        i = t.parentNode;
      if (!i) return;
      const e = [].slice.call(s.querySelectorAll('input[name]'));
      if (e.length !== 0) {
        const o = '-' + new Date().getTime();
        e.forEach((a) => {
          a.name += o;
        });
      }
      (s.style.maxHeight = 'none'), (s.style.opacity = '0'), i.appendChild(s);
      const r = s.clientHeight;
      return i.removeChild(s), r;
    }
  }
  return l;
})();

new HandyCollapse();
