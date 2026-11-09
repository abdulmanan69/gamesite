import React, { useEffect, useRef, useState } from 'react';

// Full-page background: a grid of dots, plus signs and X marks drawn in a
// fragment shader. A diagonal shimmer sweeps across, single glyphs twinkle,
// and the cursor lights up the glyphs around it.

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uCell;
uniform float uDpr;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// signed coverage for a bar centred in the cell
float bar(vec2 f, vec2 halfSize, float aa) {
  vec2 d = abs(f) - halfSize;
  float dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
  return 1.0 - smoothstep(-aa, aa, dist);
}

float plusShape(vec2 f, float len, float w, float aa) {
  return max(bar(f, vec2(len, w), aa), bar(f, vec2(w, len), aa));
}

void main() {
  vec2 p = gl_FragCoord.xy;
  vec2 g = p / uCell;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;          // -0.5..0.5 inside the cell
  float aa = 0.75 / uCell;          // ~1 device pixel of antialiasing

  float h  = hash(id);
  float h2 = hash(id + 17.0);
  float h3 = hash(id + 91.0);

  // glyph choice: mostly dots, some plus, fewer X
  float shape;
  if (h < 0.70) {
    shape = 1.0 - smoothstep(0.07 - aa, 0.07 + aa, length(f));
  } else if (h < 0.87) {
    shape = plusShape(f, 0.19, 0.032, aa);
  } else {
    float c = 0.70710678;
    vec2 r = vec2(f.x * c - f.y * c, f.x * c + f.y * c);
    shape = plusShape(r, 0.17, 0.032, aa);
  }

  // diagonal shimmer band sweeping across the grid
  float diag = (id.x + id.y) * 0.11;
  float band = sin(diag - uTime * 0.9);
  float shimmer = smoothstep(0.82, 1.0, band);
  // a fainter second wave going the other way
  float band2 = sin((id.x - id.y) * 0.07 + uTime * 0.55);
  shimmer += 0.35 * smoothstep(0.9, 1.0, band2);

  // per-glyph twinkle
  float tw = pow(0.5 + 0.5 * sin(uTime * (0.5 + h2 * 1.6) + h2 * 6.2831), 14.0);

  // cursor glow
  float md = length(p - uMouse) / (220.0 * uDpr);
  float mouse = exp(-md * md * 2.2);

  // fade toward the bottom of the screen so content stays calm
  float vy = mix(0.55, 1.0, p.y / uRes.y);

  float intensity = (0.13 + 0.42 * shimmer + 0.5 * tw + 0.9 * mouse) * vy;

  vec3 base   = vec3(0.95, 0.95, 0.96);
  vec3 accent = vec3(1.0, 0.357, 0.078);   // #ff5b14
  vec3 lime   = vec3(0.64, 1.0, 0.235);    // #a3ff3c
  float heat = clamp(shimmer * 0.9 + mouse, 0.0, 1.0);
  vec3 col = mix(base, accent, heat);
  col = mix(col, lime, step(0.965, h3) * tw);

  float a = clamp(shape * intensity, 0.0, 1.0);
  gl_FragColor = vec4(col * a, a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export const ShaderGrid: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false, alpha: true, preserveDrawingBuffer: true });
    if (!gl) {
      setFallback(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setFallback(true);
      return;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uCell = gl.getUniformLocation(prog, 'uCell');
    const uDpr = gl.getUniformLocation(prog, 'uDpr');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uCell, 24 * dpr);
      gl.uniform1f(uDpr, dpr);
    };

    // mouse eases toward the pointer; parked off-screen until it moves
    const target = { x: -9999, y: -9999 };
    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX * dpr;
      target.y = (window.innerHeight - e.clientY) * dpr;
      if (mouse.x < -9000) {
        mouse.x = target.x;
        mouse.y = target.y;
      }
    };
    const onLeave = () => {
      target.x = -9999;
      target.y = -9999;
    };
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    let raf = 0;
    let running = true;

    const draw = (now: number) => {
      mouse.x += (target.x - mouse.x) * 0.12;
      mouse.y += (target.y - mouse.y) * 0.12;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, reduce ? 4.0 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (running && !reduce) raf = requestAnimationFrame(draw);
    };

    // Resizing a canvas wipes it, so a still frame has to be redrawn after every resize
    const onResize = () => {
      resize();
      if (reduce) requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener('resize', onResize);
    raf = requestAnimationFrame(draw);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  if (fallback) {
    return (
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(242,242,245,0.22) 1.5px, transparent 2px)',
          backgroundSize: '24px 24px',
        }}
      />
    );
  }

  return <canvas ref={ref} aria-hidden className="fixed inset-0 z-0 w-full h-full pointer-events-none" />;
};
