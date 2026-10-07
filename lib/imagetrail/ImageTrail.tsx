'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ImageTrail.css';

/* -------------------------------------------------------
   HELPERS
------------------------------------------------------- */

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

function getLocalPointerPos(
  e: MouseEvent | TouchEvent,
  rect: DOMRect
) {
  let clientX = 0;
  let clientY = 0;
  if ('touches' in e && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if ('clientX' in e) {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  return { x: clientX - rect.left, y: clientY - rect.top };
}

function getMouseDistance(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

/* -------------------------------------------------------
   IMAGE ITEM
------------------------------------------------------- */

class ImageItem {
  DOM: { el: HTMLDivElement; inner: HTMLDivElement | null };
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
  rect: DOMRect | null = null;
  private resize: () => void;

  constructor(DOM_el: HTMLDivElement) {
    this.DOM = {
      el: DOM_el,
      inner: DOM_el.querySelector<HTMLDivElement>('.content__img-inner'),
    };
    this.getRect();
    this.resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle);
      this.getRect();
    };
    window.addEventListener('resize', this.resize);
  }

  getRect() {
    this.rect = this.DOM.el.getBoundingClientRect();
  }

  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}

/* -------------------------------------------------------
   VARIANT BASE HELPERS
------------------------------------------------------- */

function makeVariantBase(container: HTMLDivElement) {
  return {
    rafId: null as number | null,
    destroyed: false,
    images: [...container.querySelectorAll<HTMLDivElement>('.content__img')].map(
      (el) => new ImageItem(el)
    ),
    get imagesTotal() {
      return this.images.length;
    },
    imgPosition: 0,
    zIndexVal: 1,
    activeImagesCount: 0,
    isIdle: true,
    threshold: 80,
    mousePos: { x: 0, y: 0 },
    lastMousePos: { x: 0, y: 0 },
    cacheMousePos: { x: 0, y: 0 },
  };
}

/* -------------------------------------------------------
   VARIANT 1
------------------------------------------------------- */

class ImageTrailVariant1 {
  container: HTMLDivElement;
  rafId: number | null = null;
  destroyed = false;
  images: ImageItem[];
  imagesTotal: number;
  imgPosition = 0;
  zIndexVal = 1;
  activeImagesCount = 0;
  isIdle = true;
  threshold = 80;
  mousePos = { x: 0, y: 0 };
  lastMousePos = { x: 0, y: 0 };
  cacheMousePos = { x: 0, y: 0 };
  handlePointerMove: (e: MouseEvent | TouchEvent) => void;
  initRender: (e: MouseEvent | TouchEvent) => void;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.images = [...container.querySelectorAll<HTMLDivElement>('.content__img')].map(
      (el) => new ImageItem(el)
    );
    this.imagesTotal = this.images.length;

    this.handlePointerMove = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener('mousemove', this.handlePointerMove);
    container.addEventListener('touchmove', this.handlePointerMove);

    this.initRender = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.rafId = requestAnimationFrame(() => this.render());
      container.removeEventListener('mousemove', this.initRender);
      container.removeEventListener('touchmove', this.initRender);
    };
    container.addEventListener('mousemove', this.initRender);
    container.addEventListener('touchmove', this.initRender);
  }

  render() {
    if (this.destroyed) return;
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    this.rafId = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition =
      this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1, scale: 1, zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2,
        },
        {
          duration: 0.4, ease: 'power1',
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2,
        },
        0
      )
      .to(img.DOM.el, { duration: 0.4, ease: 'power3', opacity: 0, scale: 0.2 }, 0.4);
  }

  onImageActivated() { this.activeImagesCount++; this.isIdle = false; }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }

  destroy() {
    this.destroyed = true;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.container.removeEventListener('mousemove', this.handlePointerMove);
    this.container.removeEventListener('touchmove', this.handlePointerMove);
    this.container.removeEventListener('mousemove', this.initRender);
    this.container.removeEventListener('touchmove', this.initRender);
    this.images.forEach((img) => { gsap.killTweensOf(img.DOM.el); img.destroy(); });
  }
}

/* -------------------------------------------------------
   VARIANT 5
------------------------------------------------------- */

class ImageTrailVariant5 {
  container: HTMLDivElement;
  rafId: number | null = null;
  destroyed = false;
  images: ImageItem[];
  imagesTotal: number;
  imgPosition = 0;
  zIndexVal = 1;
  activeImagesCount = 0;
  isIdle = true;
  threshold = 80;
  mousePos = { x: 0, y: 0 };
  lastMousePos = { x: 0, y: 0 };
  cacheMousePos = { x: 0, y: 0 };
  lastAngle = 0;
  handlePointerMove: (e: MouseEvent | TouchEvent) => void;
  initRender: (e: MouseEvent | TouchEvent) => void;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.images = [...container.querySelectorAll<HTMLDivElement>('.content__img')].map(
      (el) => new ImageItem(el)
    );
    this.imagesTotal = this.images.length;

    this.handlePointerMove = (ev) => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener('mousemove', this.handlePointerMove);
    container.addEventListener('touchmove', this.handlePointerMove);

    this.initRender = (ev) => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.rafId = requestAnimationFrame(() => this.render());
      container.removeEventListener('mousemove', this.initRender);
      container.removeEventListener('touchmove', this.initRender);
    };
    container.addEventListener('mousemove', this.initRender);
    container.addEventListener('touchmove', this.initRender);
  }

  render() {
    if (this.destroyed) return;
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    this.rafId = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    let dx = this.mousePos.x - this.cacheMousePos.x;
    let dy = this.mousePos.y - this.cacheMousePos.y;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    if (angle > 90 && angle <= 270) angle += 180;
    const isMovingClockwise = angle >= this.lastAngle;
    this.lastAngle = angle;
    const startAngle = isMovingClockwise ? angle - 10 : angle + 10;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance !== 0) { dx /= distance; dy /= distance; }
    dx *= distance / 150;
    dy *= distance / 150;

    ++this.zIndexVal;
    this.imgPosition =
      this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);

    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1, filter: 'brightness(80%)', scale: 0.1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2,
          rotation: startAngle,
        },
        {
          duration: 1, ease: 'power2',
          scale: 1, filter: 'brightness(100%)',
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2 + dx * 70,
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2 + dy * 70,
          rotation: this.lastAngle,
        },
        0
      )
      .to(img.DOM.el, { duration: 0.4, ease: 'expo', opacity: 0 }, 0.5)
      .to(img.DOM.el, { duration: 1.5, ease: 'power4', x: `+=${dx * 120}`, y: `+=${dy * 120}` }, 0.05);
  }

  onImageActivated() { this.activeImagesCount++; this.isIdle = false; }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }

  destroy() {
    this.destroyed = true;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.container.removeEventListener('mousemove', this.handlePointerMove);
    this.container.removeEventListener('touchmove', this.handlePointerMove);
    this.container.removeEventListener('mousemove', this.initRender);
    this.container.removeEventListener('touchmove', this.initRender);
    this.images.forEach((img) => { gsap.killTweensOf(img.DOM.el); img.destroy(); });
  }
}

/* -------------------------------------------------------
   VARIANT MAP
------------------------------------------------------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const variantMap: Record<number, new (container: HTMLDivElement) => any> = {
  1: ImageTrailVariant1,
  5: ImageTrailVariant5,
};

/* -------------------------------------------------------
   REACT COMPONENT
------------------------------------------------------- */

type ImageTrailProps = {
  items?: string[];
  variant?: number;
};

export default function ImageTrail({ items = [], variant = 5 }: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const Cls = variantMap[variant] ?? ImageTrailVariant5;
    const instance = new Cls(containerRef.current);
    return () => instance.destroy();
  }, [variant, items]);

  return (
    <div
      className="w-full h-full relative z-[100] bg-transparent overflow-visible"
      ref={containerRef}
    >
      {items.map((url, i) => (
        <div
          key={i}
          className="content__img"
        >
          <div
            className="content__img-inner"
            style={{ backgroundImage: `url(${url})` }}
          />
        </div>
      ))}
    </div>
  );
}