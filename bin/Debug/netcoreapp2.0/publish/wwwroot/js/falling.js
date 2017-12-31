const skills = [{
  text: 'ASP.NET Core',
  size: 100,
}, {
  text: 'React',
  size: 100,
}, {
  text: 'Redux',
  size: 100,
},  {
  text: 'ASP.NET',
  size: 80,
}, {
  text: 'C#',
  size: 80,
}, {
  text: 'Node.js',
  size: 50,
}, {
  text: 'JavaScript',
  size: 100,
}, {
  text: 'SQL Server',
  size: 90,
}, {
  text: 'Axios',
  size: 70,
}, {
  text: 'React-Router',
  size: 80,
}, {
  text: 'React-Saga',
  size: 80,
}, {
  text: 'MobX',
  size: 80,
}, {
  text: 'Flux',
  size: 70,
}, {
  text: 'Web API',
  size: 70,
}, {
  text: 'JQuery',
  size: 90,
}, {
  text: 'CSS3',
  size: 60,
}, {
  text: 'Styled Components',
  size: 80,
}, {
  text: 'Sass/Less/SCSS',
  size: 80,
}, {
  text: 'HTML5',
  size: 70,
}, {
  text: 'Bootstrap',
  size: 80,
},  {
  text: 'MVC',
  size: 60,
}, {
  text: 'Entity Framework',
  size: 60,
}, {
  text: 'Oracle',
  size: 50,
}, {
  text: 'MySQL',
  size: 70,
}, {
  text: 'Mongo',
  size: 50,
}, {
  text: 'Postgres',
  size: 50,
}, {
  text: 'Angular',
  size: 50,
}, {
  text: 'Vue',
  size: 80,
}, {
  text: 'Riot.js',
  size: 50,
}, {
  text: 'PHP',
  size: 50,
}, {
  text: 'Web Apps',
  size: 80,
}, {
  text: 'Web Services',
  size: 70,
}, {
  text: 'Dashboards',
  size: 100,
}, {
  text: 'Cloud',
  size: 50,
}, {
  text: 'IoT',
  size: 70,
}, {
  text: 'Linux',
  size: 50,
}, {
  text: 'Windows',
  size: 50,
}, {
  text: 'Micro Services',
  size: 50,
}, {
  text: 'CompTIA Security+',
  size: 50,
}, {
  text: 'TSQL',
  size: 75,
}, {
  text: 'Webpack',
  size: 60,
}, {
  text: 'JSON',
  size: 80,
}, {
  text: 'Telerik',
  size: 60,
}, {
  text: 'XML',
  size: 70,
}, {
  text: 'HVAC',
  size: 60,
}, {
  text: 'EDI',
  size: 70,
}, {
  text: 'MASM',
  size: 50,
}, {
  text: 'MFC',
  size: 50,
}, {
  text: 'Sockets',
  size: 70,
}, {
  text: 'IIS',
  size: 60,
}, {
  text: 'Nginx',
  size: 70,
}, {
  text: 'DB2',
  size: 50,
}, {
  text: 'Sybase',
  size: 50,
}, {
  text: 'MVC',
  size: 50,
}, {
  text: 'Docker',
  size: 50,
}, {
  text: 'VBA',
  size: 50,
}, {
  text: 'C',
  size: 90,
}, {
  text: 'C++',
  size: 50,
}, {
  text: 'D3',
  size: 85,
}, {
  text: 'CompTIA Security+',
  size: 50,
}, {
  text: 'MCPD - Enterprise',
  size: 70,
}, {
  text: 'MCTS - Distributed',
  size: 50,
}, {
  text: 'MCTS - Web',
  size: 50,
}, {
  text: 'MCTS - Windows',
  size: 50,
}, {
  text: '... this list could go on and on',
  size: 70,
},
];

const falling = () => {
  const screen = {
    elem: document.getElementById('falling'),
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    resize() {
      // get the div controlling the size, if needed
      let o = screen.elem.parentElement;
      screen.width = o.offsetWidth;
      screen.height = o.offsetHeight;
      for (screen.left = 0, screen.top = 0; o != null; o = o.offsetParent) {
        screen.left += o.offsetLeft;
        screen.top += o.offsetTop;
      }
      screen.elem.width = screen.width;
      screen.elem.height = screen.height;
      if (PHY2D) {
        PHY2D.deleteStatic();
        PHY2D.rectangle(screen.width / 2, screen.height + 50, screen.width, 100, 0, 0);
        PHY2D.rectangle(screen.width / 2, -screen.height * 2, screen.width, 100, 0, 0);
        PHY2D.rectangle(-50, 0, 100, screen.height * 4, 0, 0);
        PHY2D.rectangle(screen.width + 50, 0, 100, screen.height * 4, 0, 0);
      }
    },
  };

  screen.elem.onselectstart = () => false;
  screen.elem.ondrag = () => false;
  const ctx = screen
    .elem
    .getContext('2d');

  let timeout;
  // debounce listener and give React time
  window.addEventListener('resize', () => {
    clearTimeout(timeout);
    timeout = setTimeout(screen.resize, 1000);
  }, false);
  setTimeout(screen.resize, 5000);
  /* ==== pointer setup ==== */

  const pointer = {
    pos: {
      x: 0,
      y: 0,
    },
    active: false,
    down(e, touch) {
      e.preventDefault();
      const p = touch ?
        e.touches[0] :
        e;
      (!touch && document.setCapture) && document.setCapture();
      this.pos.x = p.clientX - screen.left;
      this.pos.y = p.clientY - screen.top;
      this.active = true;
    },
    up(e, touch) {
      e.preventDefault();
      (!touch && document.releaseCapture) && document.releaseCapture();
      this.active = false;
    },
    move(e, touch) {
      e.preventDefault();
      const p = touch ?
        e.touches[0] :
        e;
      if (this.active) {
        this.pos.x = p.clientX - screen.left;
        this.pos.y = p.clientY - screen.top;
      }
    },
  };

  if ('ontouchstart' in window) {
    screen.elem.ontouchstart = e => {
      pointer.down(e, true);
    };
    screen.elem.ontouchmove = e => {
      pointer.move(e, true);
    };
    screen.elem.ontouchend = e => {
      pointer.up(e, true);
    };
    screen.elem.ontouchcancel = e => {
      pointer.up(e, true);
    };
  }
  document.addEventListener("mousedown", e => {
    pointer.down(e, false);
  }, true);
  document.addEventListener("mousemove", e => {
    pointer.move(e, false);
  }, true);
  document.addEventListener("mouseup", e => {
    pointer.up(e, false);
  }, true);

  /* ==== vector 2D library ==== */

  class Vector {
    constructor(x, y) {
      this.x = x || 0.0;
      this.y = y || 0.0;
    }

    set(x, y) {
      this.x = x;
      this.y = y;
      return this;
    }

    dot(v) {
      return this.x * v.x + this.y * v.y;
    }

    lenSqr() {
      return this.x * this.x + this.y * this.y;
    }

    transform(v, m) {
      this.x = m.cos * v.x - m.sin * v.y + m.pos.x;
      this.y = m.sin * v.x + m.cos * v.y + m.pos.y;
      return this;
    }

    rotate(v, m) {
      this.x = m.cos * v.x - m.sin * v.y;
      this.y = m.sin * v.x + m.cos * v.y;
      return this;
    }

    normal(a, b) {
      const x = a.x - b.x;
      const y = a.y - b.y;
      const len = Math.sqrt(x * x + y * y);
      this.x = -y / len;
      this.y = x / len;
      return this;
    }

    project(a, b, n) {
      const x = a.x - b.x;
      const y = a.y - b.y;
      const len = Math.sqrt(x * x + y * y);
      return (-y / len) * n.x + (x / len) * n.y;
    }

    addScale(v1, v2, s) {
      this.x = v1.x + (v2.x * s);
      this.y = v1.y + (v2.y * s);
      return this;
    }

    subScale(v1, v2, s) {
      this.x = v1.x - (v2.x * s);
      this.y = v1.y - (v2.y * s);
      return this;
    }

    add(v1, v2) {
      this.x = v1.x + v2.x;
      this.y = v1.y + v2.y;
      return this;
    }

    sub(v1, v2) {
      this.x = v1.x - v2.x;
      this.y = v1.y - v2.y;
      return this;
    }

    scale(v1, s) {
      this.x = v1.x * s;
      this.y = v1.y * s;
      return this;
    }

    perp() {
      const x = this.x;
      this.x = -this.y;
      this.y = x;
      return this;
    }

    inv(v1) {
      this.x = -v1.x;
      this.y = -v1.y;
      return this;
    }

    clamp(v, min, max) {
      if (v > max)
        v = max;
      else if (v < min)
        v = min;
      return v;
    }

    rotateIntoSpaceOf(a, m) {
      const dx = -a.x;
      const dy = -a.y;
      this.x = dx * m.cos + dy * m.sin;
      this.y = dx * -m.sin + dy * m.cos;
      return this;
    }

    // SIMD Array vectors

    array(n, values) {
      const array = new Array(n);
      array.min = new Vector();
      array.max = new Vector();
      for (let i = 0; i < n; i++) {
        array[i] = new Vector(values ?
          values[i * 2 + 0] :
          0.0, values ?
          values[i * 2 + 1] :
          0.0);
      }
      array.transform = function (v, m) {
        for (let i = 0, len = this.length; i < len; i++) {
          const vi = v[i];
          const elem = this[i];
          const x = m.cos * vi.x - m.sin * vi.y + m.pos.x;
          const y = m.sin * vi.x + m.cos * vi.y + m.pos.y;
          if (x < this.min.x)
            this.min.x = x;
          if (y < this.min.y)
            this.min.y = y;
          if (x > this.max.x)
            this.max.x = x;
          if (y > this.max.y)
            this.max.y = y;
          elem.x = x;
          elem.y = y;
        }
        return this;
      };
      array.rotate = function (v, m) {
        for (let i = 0, len = this.length; i < len; i++) {
          const vi = v[i];
          const elem = this[i];
          elem.x = m.cos * vi.x - m.sin * vi.y;
          elem.y = m.sin * vi.x + m.cos * vi.y;
        }
        return this;
      };
      array.resetMinmax = function () {
        this.min.x = 100000.0;
        this.min.y = 100000.0;
        this.max.x = -100000.0;
        this.max.y = -100000.0;
      };
      array.normal = function (points) {
        for (let i = 0; i < this.length; i++) {
          this[i].normal(points[(i + 1) % this.length], points[i]);
        }
        return this;
      };
      return array;
    }
  }

  /* ==== Matrix container ==== */

  class Matrix {
    constructor() {
      this.cos = 0.0;
      this.sin = 0.0;
      this.pos = new Vector();
      this.ang = 0.0;
    }

    set(a, x, y, w, h) {
      this.cos = Math.cos(a);
      this.sin = Math.sin(a);
      this.ang = a;
      this.pos.x = x;
      this.pos.y = y;
      this.w = w;
      this.h = h;
      return this;
    }

    copy(matrix) {
      this.cos = matrix.cos;
      this.sin = matrix.sin;
      this.ang = matrix.ang;
      this.pos.x = matrix.pos.x;
      this.pos.y = matrix.pos.y;
      return this;
    }

    integrate(va, vx, vy, kTimeStep) {
      this.pos.x += vx * kTimeStep;
      this.pos.y += vy * kTimeStep;
      this.ang += va * kTimeStep;
      this.cos = Math.cos(this.ang);
      this.sin = Math.sin(this.ang);
      return this;
    }
  }

  /* ==== PHY2D continuous collision engine ==== */

  const PHY2D = (() => {
    const kGravity = 5;
    const kTimeStep = 1 / 60;
    const kFriction = 0.5;
    const objects = [];
    let drag = false;
    const v0 = new Vector();
    const v1 = new Vector();
    const v2 = new Vector();
    const v3 = new Vector();
    const v5 = new Vector();

    // contacts list

    const contacts = [];
    contacts.index = 0;
    contacts.create = function (A, B, pa, pb, nx, ny) {
      if (!this[this.index])
        this[this.index] = new Contact();
      this[this.index++].set(A, B, pa, pb, nx, ny);
    };

    // AABB container

    function AABB() {
      this.x = 0.0;
      this.y = 0.0;
      this.w = 0.0;
      this.h = 0.0;
    }

    // Polygon constructor

    class Polygon {
      constructor(x, y, w, h, vertices, invMass, angle, img) {
        this.img = img;
        this.vel = new Vector();
        this.angularVel = 0.0;
        this.invMass = invMass;
        this.matrix = new Matrix().set(angle, x, y, w, h);
        this.aabb = new AABB();
        this.drag = false;
        this.static = false;
        this.length = (vertices.length / 2) | 0;
        this.localSpacePoints = new Vector().array(this.length, vertices);
        this.localSpaceNormals = new Vector()
          .array(this.length)
          .normal(this.localSpacePoints);
        this.worldSpaceNormals = new Vector().array(this.length);
        this.worldSpacePoints = new Vector().array(this.length);
        this.invI = (invMass > 0) ?
          1 / ((1 / invMass) * (w * w + h * h) / 3) :
          0
        this.c1 = new Vector();
        this.c0 = new Vector();
        this.ready = (invMass === 0);
        objects.push(this);
      }

      // calculate aabb & transform world space points

      motionAABB() {
        this
          .worldSpacePoints
          .resetMinmax();
        this
          .worldSpacePoints
          .transform(this.localSpacePoints, this.matrix);
        this
          .worldSpaceNormals
          .rotate(this.localSpaceNormals, this.matrix);
        const min = this.worldSpacePoints.min;
        const max = this.worldSpacePoints.max;
        this.aabb.x = (min.x + max.x) * 0.5;
        this.aabb.y = (min.y + max.y) * 0.5;
        this.aabb.w = (max.x - min.x) * 0.5;
        this.aabb.h = (max.y - min.y) * 0.5;
      }

      // Poly vs poly collision detection (Minkowski Difference)

      contact(that) {
        let face;
        let vertex;
        let vertexRect;
        let faceRect;
        let fp;
        let nx;
        let ny;
        let wsN;
        let wdV0;
        let wdV1;
        let wsV0;
        let wsV1;
        mostSeparated.set(100000, -1, -1, 0, 100000);
        mostPenetrating.set(-100000, -1, -1, 0, 100000);
        this.featurePairJudgement(that, 2);
        that.featurePairJudgement(this, 1);

        if (mostSeparated.dist > 0 && mostSeparated.fpc !== 0) {
          face = mostSeparated.edge;
          vertex = mostSeparated.closestI;
          fp = mostSeparated.fpc;
        } else if (mostPenetrating.dist <= 0) {
          face = mostPenetrating.edge;
          vertex = mostPenetrating.closestI;
          fp = mostPenetrating.fpc;
        }

        if (fp === 1)
          vertexRect = this,
          faceRect = that;
        else
          vertexRect = that,
          faceRect = this;

        wsN = faceRect.worldSpaceNormals[face];
        const va = vertexRect.worldSpacePoints[(vertex - 1 + vertexRect.length) % vertexRect.length];
        const vb = vertexRect.worldSpacePoints[vertex];
        const vc = vertexRect.worldSpacePoints[(vertex + 1) % vertexRect.length];
        if (!va || !vb || !vc) return;
        if (v0.project(vb, va, wsN) < v1.project(vc, vb, wsN)) {
          wdV0 = va;
          wdV1 = vb;
        } else {
          wdV0 = vb;
          wdV1 = vc;
        }
        wsV0 = faceRect.worldSpacePoints[face];
        wsV1 = faceRect.worldSpacePoints[(face + 1) % faceRect.length];
        if (fp === 1) {
          this.projectPointOntoEdge(wsV0, wsV1, wdV0, wdV1);
          that.projectPointOntoEdge(wdV1, wdV0, wsV0, wsV1);
          nx = -wsN.x;
          ny = -wsN.y;
        } else {
          this.projectPointOntoEdge(wdV1, wdV0, wsV0, wsV1);
          that.projectPointOntoEdge(wsV0, wsV1, wdV0, wdV1);
          nx = wsN.x;
          ny = wsN.y;
        }
        contacts.create(this, that, this.c0, that.c0, nx, ny);
        contacts.create(this, that, this.c1, that.c1, nx, ny);
      }

      featurePairJudgement(that, fpc) {
        let wsN;
        let closestI;
        let closest;
        let dist;
        for (let edge = 0; edge < this.length; edge++) {
          wsN = this.worldSpaceNormals[edge];
          v5.rotateIntoSpaceOf(wsN, that.matrix);
          closestI = -1;
          let closestD = -100000;

          for (let i = 0; i < that.length; i++) {
            const d = v5.dot(that.localSpacePoints[i]);
            if (d > closestD) {
              closestD = d;
              closestI = i;
            }
          }

          closest = that.worldSpacePoints[closestI];
          v0.sub(closest, this.worldSpacePoints[edge]);
          dist = v0.dot(wsN);

          if (dist > 0) {
            v1.sub(closest, this.worldSpacePoints[(edge + 1) % this.length]);
            dist = this
              .projectPointOntoEdgeZero(v0, v1)
              .lenSqr();

            if (dist < mostSeparated.dist) {
              mostSeparated.set(dist, closestI, edge, fpc);
            }
          } else {
            if (dist > mostPenetrating.dist) {
              mostPenetrating.set(dist, closestI, edge, fpc);
            }
          }
        }
      }

      projectPointOntoEdge(p0, p1, e0, e1) {
        const l = v2
          .sub(e1, e0)
          .lenSqr() + 0.0000001;
        this
          .c0
          .addScale(e0, v2, v3.clamp(v3.sub(p0, e0).dot(v2) / l, 0, 1));
        this
          .c1
          .addScale(e0, v2, v3.clamp(v3.sub(p1, e0).dot(v2) / l, 0, 1));
      }

      projectPointOntoEdgeZero(e0, e1) {
        const l = v2
          .sub(e1, e0)
          .lenSqr() + 0.0000001;
        return this
          .c0
          .addScale(e0, v2, v3.clamp(v3.inv(e0).dot(v2) / l, 0, 1));
      }

      // integrate

      integrate() {
        if (this.drag) {
          this.vel.x += (pointer.pos.x - this.matrix.pos.x);
          this.vel.y += (pointer.pos.y - this.matrix.pos.y);
        } else {
          if (this.invMass > 0)
            this.vel.y += kGravity;
        }

        this
          .matrix
          .integrate(this.angularVel, this.vel.x, this.vel.y, kTimeStep);

        if (!this.static)
          this.motionAABB();
        else {
          if (this.invMass === 0) {
            this.static = true;
            this.motionAABB();
          }
        }
      }

      // draw image
      draw() {
        if (this.img) {
          const m = this.matrix;
          ctx.save();
          ctx.translate(m.pos.x, m.pos.y);
          ctx.rotate(m.ang);
          ctx.drawImage(this.img, -m.w * 0.5, -m.h * 0.5, m.w, m.h);
          ctx.restore();

          if (pointer.active) {
            if (!drag && this.invMass) {
              ctx.beginPath();
              for (let j = 0; j < this.length; j++) {
                const a = this.worldSpacePoints[j];
                ctx.lineTo(a.x, a.y);
              }
              ctx.closePath();
              if (ctx.isPointInPath(pointer.pos.x, pointer.pos.y)) {
                this.drag = true;
                drag = true;
              }
            }
          } else {
            if (drag) {
              for (let i = 0; i < objects.length; i++)
                objects[i].drag = false;
              drag = false;
            }
          }
        }
      }
    }

    // Feature pair container

    class FeaturePair {
      constructor() {
        this.dist = 0;
        this.closestI = 0;
        this.edge = 0;
        this.fpc = 0;
      }

      set(dist, closestI, edge, fpc) {
        this.dist = dist;
        this.closestI = closestI;
        this.edge = edge;
        this.fpc = fpc;
      }
    }

    const mostSeparated = new FeaturePair();
    const mostPenetrating = new FeaturePair();

    // Contacts Constructor

    class Contact {
      constructor() {
        this.a = null;
        this.b = null;
        this.normal = new Vector();
        this.normalPerp = new Vector();
        this.ra = new Vector();
        this.rb = new Vector();
        this.dist = 0;
        this.impulseN = 0;
        this.impulseT = 0;
        this.invDenom = 0;
        this.invDenomTan = 0;
      }

      // set new contact

      set(A, B, pa, pb, nx, ny) {
        let ran;
        let rbn;
        this.a = A;
        this.b = B;
        this
          .normal
          .set(nx, ny);
        this
          .normalPerp
          .set(-ny, nx);
        this.dist = v1
          .sub(pb, pa)
          .dot(this.normal);
        this.impulseN = 0;
        this.impulseT = 0;
        this
          .ra
          .sub(pa, A.matrix.pos)
          .perp();
        this
          .rb
          .sub(pb, B.matrix.pos)
          .perp();
        ran = this
          .ra
          .dot(this.normal);
        rbn = this
          .rb
          .dot(this.normal);
        this.invDenom = 1 / (A.invMass + B.invMass + (ran * ran * A.invI) + (rbn * rbn * B.invI));
        ran = this
          .ra
          .dot(this.normalPerp);
        rbn = this
          .rb
          .dot(this.normalPerp);
        this.invDenomTan = 1 / (A.invMass + B.invMass + (ran * ran * A.invI) + (rbn * rbn * B.invI));
      }

      applyImpulse(imp) {
        // linear
        this
          .a
          .vel
          .addScale(this.a.vel, imp, this.a.invMass);
        this
          .b
          .vel
          .subScale(this.b.vel, imp, this.b.invMass);

        // angular
        this.a.angularVel += imp.dot(this.ra) * this.a.invI;
        this.b.angularVel -= imp.dot(this.rb) * this.b.invI;
      }

      // solve contacts

      solve() {
        let newImpulse;
        let absMag;
        const dv = v1;

        // relative velocities
        dv.sub(v2.addScale(this.b.vel, this.rb, this.b.angularVel), v3.addScale(this.a.vel, this.ra, this.a.angularVel));

        // new impulse
        newImpulse = (dv.dot(this.normal) + this.dist / kTimeStep) * this.invDenom + this.impulseN;
        if (newImpulse > 0)
          newImpulse = 0;
        this.applyImpulse(v2.scale(this.normal, newImpulse - this.impulseN));
        this.impulseN = newImpulse;

        // friction impulse
        absMag = Math.abs(this.impulseN) * kFriction;
        newImpulse = v2.clamp(dv.dot(this.normalPerp) * this.invDenomTan + this.impulseT, -absMag, absMag);
        this.applyImpulse(v3.scale(this.normalPerp, newImpulse - this.impulseT));
        this.impulseT = newImpulse;
      }
    }

    function render() {
      // aabb broadphase
      contacts.index = 0;
      for (let i = 0, len = objects.length; i < len - 1; i++) {
        if (objects[i].ready) {
          const A = objects[i];
          for (let j = i + 1; j < len; j++) {
            if (objects[j].ready) {
              const B = objects[j];
              if (A.invMass || B.invMass) {
                const a = A.aabb;
                const b = B.aabb;
                if (Math.abs(b.x - a.x) - (a.w + b.w) < 0 && Math.abs(b.y - a.y) - (a.h + b.h) < 0)
                  A.contact(B);
              }
            }
          }
        }
      }

      // solver
      for (let j = 0; j < 5; j++) {
        for (let i = 0; i < contacts.index; i++) {
          contacts[i].solve();
        }
      }

      // integration
      objects.forEach((i) => {
        if (i.ready) { i.integrate(); }
      });

      // draw polygons
      objects.forEach((i) => {
        if (i.ready) { i.draw(); }
      });
    }
    // end render
    // public interface

    return {

      render,

      // create new rectangle
      rectangle(x, y, w, h, mass, angle, img) {
        const vertices = [
          w / 2, -h / 2, -w / 2, -h / 2, -w / 2,
          h / 2,
          w / 2,
          h / 2,
        ];
        const invMass = mass ?
          1 / mass :
          0;
        return new Polygon(x, y, w, h, vertices, invMass, angle, img);
      },

      // delete static objects

      deleteStatic() {
        let k = objects.length;
        while (k--) {
          const p = objects[k];
          if (!p.invMass) {
            objects.splice(k, 1);
          }
        }
      },

      getObjLength() {
        return objects.length;
      },

      setObjReady(index) {
        objects[index].ready = true;
      },

      // draw strings
      string(size, text) {
        size = size * (screen.width / 3000);
        const img = document.createElement("canvas");
        const ictx = img.getContext("2d");
        ictx.font = `bold ${size}px arial`;
        const w = ictx
          .measureText(text)
          .width;
        let h = ictx
          .measureText('M')
          .width;
        h += h / 3;
        img.width = w;
        img.height = h;
        ictx.font = `bold ${size}px arial`;
        ictx.textBaseline = 'top';
        ictx.fillStyle = hsl;
        ictx.fillText(text, 0, 0);
        return img;
      },
      // delete objects

      delete(object) {
        for (let i = 0, len = objects.length; i < len; i++) {
          if (objects[i] === object) {
            objects.splice(i, 1);
            return;
          }
        }
      },
    };
  })(ctx, pointer, Vector, Matrix);

  /* ==== clock logic ==== */

  screen.resize();

  // function n() {
  //   return n > 9 ?
  //     `${n}` :
  //     `0${n}`;
  // }

  let hsl = '';
  let hue = 0;
  const xp = 0;


  function addString(w, x, t, m, a) {
    const img = PHY2D.string(t.size, t.text);
    return PHY2D.rectangle(x, -img.height, img.width, img.height, m, a, img);
  }

  function createSkillObj(skill) {
    hue = (Math.random() * 360) | 0;
    hsl = `hsl(${hue}, 70%, 80%)`;
    hsl = `hsl(${hue},70%,${(20 + Math.random() * 80) | 0}%)`;
    const w = (screen.width / 15) | 0;
    const newobj = addString(w, w + (xp * w) % (screen.width - (w * 2)), skill, 0.1, Math.random() * 2 * Math.PI);
    newobj.ready = false;
  }

  function initSkills() {
    if (skills) {
      for (let i = 0; i < skills.length; i++) {
        createSkillObj(skills[i]);
      }
    }
  }

  const recycler = setInterval(recycle, 1000);
  let recycling = 4;

  function recycle() {
    if (recycling < PHY2D.getObjLength()) {
      PHY2D.setObjReady(recycling);
    } else {
      clearInterval(recycler);
    }
    recycling++;
  }
  /* ==== main loop ==== */

  function run() {
    requestAnimationFrame(run);
    ctx.clearRect(0, 0, screen.width, screen.height);
    PHY2D.render();
  }

  initSkills();
  run();
};
