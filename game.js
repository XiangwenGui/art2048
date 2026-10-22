// 名画2048 / 2048 · Old Masters
// 17 阶：索引 0 = 2（萨金特，最晚出生）… 索引 10 = 2048（丢勒）… 索引 16 = 131072（拉斯科洞穴）
const A = ARTISTS;
const N = 4, MAX = A.length - 1;
const HIGH = 11;                 // 4096（达·芬奇）及以上为高阶：拼图 2×2，主要靠颜料
const PIECE_COST = 17000;        // 一块高阶拼图需要的颜料（TestFlight 期间再按实际得分调整）
const val = lv => 2 * 2 ** lv;
const total = lv => A[lv].cols * A[lv].rows;
const fmt = n => n.toLocaleString("en-US");

// ---------- 界面文字 ----------
const I18N = {
  zh: {
    docTitle: "名画2048", title: "名画2048", sub: "合并相同的画家，一路回到冰河时代",
    score: "分数", best: "最高", newGame: "新游戏", autoIntro: "每局自动介绍", gallery: "画廊",
    back: "‹ 返回", backGallery: "‹ 画廊", credits: "图片来源", cont: "继续", tapClose: "点任意处关闭",
    newArtist: "新画家登场 · ", peekTag: "提前查看 · ", tier: (v, n) => `${v} · 第 ${n} 阶`,
    win: "🎉 你合成出了 2048！可以继续玩下去。", final: "🏆 你一路回到了冰河时代！",
    factLabel: "小知识", fact: "小知识：", natureLink: "《自然》论文 ↗",
    coachTap: "点一下，认识第一位画家", coachSwipe: "向任意方向滑动，把两位相同的画家合在一起",
    lockedQ: v => `「${v}」这位画家还没有解锁。要继续去玩、合成出来解锁，还是放弃挑战，直接查看？`, peekYes: "直接查看", peekNo: "继续去玩",
    someWork: v => `「${v}」的作品`, unknown: "？",
    pieceGot: "获得作品拼图块 ＋1", pieceDone: "拼图集齐！", appeared: n => `${n}出现了 · 拼图块 ＋1`,
    pieceEvery: n => `每局第一次出现${n}，就能再拿到一块`,
    over: "没有可以移动的方块了", ended: "本局结算", overTitle: "这一局结束了",
    gameScore: "本局得分", gotPaint: "获得颜料", paintEnough: "颜料攒够了！", addedOne: (h, t) => `又拼上一块：${h} / ${t}`,
    toNext: "距离下一块", nextFor: w => `正在拼：${w}`, allHighDone: "所有高阶作品都已拼完",
    piecesThisGame: "本局获得的拼图块", noPieces: "这一局没有新的拼图块", sum: n => `共 ＋${n}`, done: "拼完了！",
    toGallery: "去画廊看看", again: "再来一局",
    galleryDone: (d, t) => `已完成 ${d} / ${t} 幅`, paint: "颜料",
    paintNote: "每局得分都会变成颜料。颜料攒够后，会自动拼到下一幅未完成的高阶作品上。",
    creditsLink: "图片来源与授权 ›", complete: "已完成",
    secIntro: "画家介绍", secWork: "作品拼图", metChip: "已认识 ✓", peekChip: "已提前查看", lockedChip: "🔒 还没合成过",
    unlockHint: v => `在棋盘上合成出「${v}」就会解锁。`, peekBtn: "提前查看介绍",
    peekNote: "会先问一句，确认后才打开。", metNote: "第一次在棋盘上遇到这位画家时解锁，以后随时可以回来看。",
    piecesChip: (h, t) => `${h} / ${t} 块`,
    howGetT: "获取拼图", howGet: n => `每局首次出现${n}方块，即可获得 1 块拼图（合成或随机出现均有效）。`,
    howDoneT: "解锁画作", howDone: k => `再玩至少 ${k} 局，即可集齐拼图，解锁完整画作、作品介绍及博物馆链接。`,
    paintGetT: "获取拼图", paintGet: "高阶作品主要靠颜料：每局得分攒成颜料，够了自动拼一块。如果哪局真的合成出了这位画家，也会额外得一块。",
    paintNow: "正在拼这一幅 · 距离下一块", paintQueue: w => `颜料按阶数从低到高一幅一幅拼，现在先拼${w}。`,
    viewLarge: "查看大图", museum: "去博物馆页面看高清大图和更多介绍 ↗", workDone: "✦ 作品完成 ✦", collect: "收入画廊",
    allPieces: (t) => `${t} / ${t} 块全部拼齐`,
    creditsIntro: "游戏里的作品图片都来自博物馆开放获取图库或维基共享资源，均为公有领域或允许自由使用的授权。点作品名可以打开博物馆页面。",
    creditsUse: "本游戏与以上博物馆没有合作关系，也未获得其认可。",
    langBtn: "EN"
  },
  en: {
    docTitle: "2048 · Old Masters", title: "2048 · Old Masters", sub: "Merge matching artists, all the way back to the Ice Age",
    score: "SCORE", best: "BEST", newGame: "New Game", autoIntro: "Intros every game", gallery: "Gallery",
    back: "‹ Back", backGallery: "‹ Gallery", credits: "Image credits", cont: "Continue", tapClose: "Tap anywhere to close",
    newArtist: "New artist · ", peekTag: "Sneak peek · ", tier: (v, n) => `${v} · Rank ${n}`,
    win: "🎉 You made 2048! Keep playing if you like.", final: "🏆 You've made it all the way back to the Ice Age!",
    factLabel: "Fun fact", fact: "Fun fact: ", natureLink: "Nature paper ↗",
    coachTap: "Tap to meet your first artist", coachSwipe: "Swipe in any direction to merge two matching artists",
    lockedQ: v => `The ${v} artist is still locked. Keep playing to unlock them, or skip the challenge and look now?`, peekYes: "Look now", peekNo: "Keep playing",
    someWork: v => `the ${v} artwork`, unknown: "?",
    pieceGot: "Puzzle piece +1", pieceDone: "Puzzle complete!", appeared: n => `${n} appeared · Puzzle piece +1`,
    pieceEvery: n => `Get another piece the first time ${n} appears in a game`,
    over: "No moves left", ended: "Game summary", overTitle: "Game over",
    gameScore: "Score", gotPaint: "Paint earned", paintEnough: "Enough paint!", addedOne: (h, t) => `One more piece: ${h} / ${t}`,
    toNext: "Next piece", nextFor: w => `Now painting: ${w}`, allHighDone: "Every high-rank artwork is complete",
    piecesThisGame: "Pieces earned this game", noPieces: "No new pieces this game", sum: n => `+${n} total`, done: "Complete!",
    toGallery: "Open gallery", again: "Play again",
    galleryDone: (d, t) => `${d} / ${t} artworks complete`, paint: "Paint",
    paintNote: "Every point you score becomes paint. When you have enough, it fills in the next unfinished high-rank artwork.",
    creditsLink: "Image credits ›", complete: "Complete",
    secIntro: "About the artist", secWork: "Artwork puzzle", metChip: "Met ✓", peekChip: "Peeked", lockedChip: "🔒 Not yet met",
    unlockHint: v => `Make ${v} on the board to unlock.`, peekBtn: "Read it now",
    peekNote: "You'll be asked to confirm first.", metNote: "Unlocked the first time you met this artist on the board. Come back any time.",
    piecesChip: (h, t) => `${h} / ${t} pieces`,
    howGetT: "Getting pieces", howGet: n => `Get 1 piece the first time a ${n} tile appears in each game (merged or spawned).`,
    howDoneT: "Unlocking the artwork", howDone: k => `Play at least ${k} more game${k > 1 ? "s" : ""} to complete the puzzle and unlock the full artwork, its story and a museum link.`,
    paintGetT: "Getting pieces", paintGet: "High-rank artworks are filled in mostly with paint: your scores add up, and each time you have enough a piece is added. Actually making this artist in a game earns a bonus piece too.",
    paintNow: "Now painting this one · next piece", paintQueue: w => `Paint fills high-rank artworks in order, from lowest to highest. ${w} comes first.`,
    viewLarge: "View large", museum: "See it in high resolution on the museum's site ↗", workDone: "✦ Artwork complete ✦", collect: "Add to gallery",
    allPieces: (t) => `All ${t} pieces collected`,
    creditsIntro: "All artwork images come from museum open-access collections or Wikimedia Commons, and are in the public domain or freely licensed. Tap a title to open the museum page.",
    creditsUse: "This game is not affiliated with or endorsed by any of these museums.",
    langBtn: "中文"
  }
};
function store(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function load(k){ try{ const s = localStorage.getItem(k); return s ? JSON.parse(s) : null; }catch(e){ return null; } }
let lang = (function(){
  const s = load("oma_lang"); if (s === "zh" || s === "en") return s;
  return (navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en";
})();
const T = () => I18N[lang];
const en = () => lang === "en";
const nm = lv => en() ? A[lv].short : A[lv].tile;            // 短名
const fullName = lv => en() ? A[lv].nameEn : A[lv].name;
const workName = lv => en() ? A[lv].workEn : A[lv].work;
const known = lv => met.has(lv) || peeked.has(lv);              // 合成过或提前查看过，才显示名字
const workLabel = lv => known(lv) ? workName(lv) : T().someWork(fmt(val(lv)));
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

// ---------- 存档 ----------
let best = load("oma_best") || 0;
let met = new Set(load("oma_met") || []);           // 曾经认识过的画家（跨局）
let peeked = new Set(load("oma_peek") || []);       // 没合成过但提前查看过
let pieces = (load("oma_pieces") || []).map(a => new Set(a)); // 每幅作品已获得的拼图块编号
while (pieces.length < A.length) pieces.push(new Set());
let paint = load("oma_paint") || 0;                  // 颜料（朝下一块的进度）
let introEvery = load("oma_every") !== false;
let tut = load("oma_tut") || "tap";                 // tap → swipe → done
function savePieces(){ store("oma_pieces", pieces.map(s => [...s])); }
const isDone = lv => pieces[lv].size >= total(lv);
const doneCount = () => A.filter((a, i) => isDone(i)).length;

// ---------- 棋盘 ----------
const POS = i => (2.5 + i * 24.375) + "%";
const board = document.getElementById("board");
let grid, score = 0, busy = false, nextId = 1;
let gameSeen = new Set();     // 本局已经出现过的画家（拼图块按“每局第一次出现”发）
let gameGot = [];             // 本局获得的拼图块 [{lv, idx}]
let ended = false;            // 本局已结算
let pendingTutPiece = null;   // 新手第一局：萨金特的拼图块等介绍关掉后再提示
const els = new Map();
for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
  const d = document.createElement("div");
  d.className = "cell"; d.style.left = POS(c); d.style.top = POS(r);
  board.appendChild(d);
}
function tileHTML(lv){
  const a = A[lv];
  if (lv === MAX) return `<span class="cap">${esc(nm(lv))}</span>`;
  if (en()) return `<span class="zh" style="font-size:${Math.min(5.2, 19 / (a.short.length * 0.6))}cqw">${esc(a.short)}</span><span class="en">${val(lv) >= 1000 ? fmt(val(lv)) : val(lv)}</span>`;
  return `<span class="zh" style="font-size:${Math.min(6, 17 / a.tile.length)}cqw">${esc(a.tile)}</span><span class="en">${esc(a.short)}</span>`;
}
function place(el, r, c){ el.style.left = POS(c); el.style.top = POS(r); }
function makeTile(r, c, lv, cls){
  const t = {id: nextId++, r, c, lv};
  grid[r][c] = t;
  const a = A[lv], el = document.createElement("div");
  el.className = "tile " + (cls || "") + (lv >= HIGH ? " gold" : "") + (lv === MAX ? " art" : "");
  el.style.background = lv === MAX ? `url(${a.thumb}) 60% 40% / cover no-repeat ${a.bg}` : a.bg;
  el.style.color = a.fg;
  el.dataset.lv = lv;
  el.innerHTML = tileHTML(lv);
  place(el, r, c);
  board.appendChild(el);
  els.set(t.id, el);
  return t;
}
function emptyCells(){
  const out = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (!grid[r][c]) out.push([r, c]);
  return out;
}
function spawn(forceLow){
  const e = emptyCells(); if (!e.length) return null;
  const [r, c] = e[Math.floor(Math.random() * e.length)];
  return makeTile(r, c, forceLow || Math.random() < 0.9 ? 0 : 1, "new");
}
function clearBoard(){
  els.forEach(el => el.remove()); els.clear();
  grid = Array.from({length: N}, () => Array(N).fill(null));
}
function updateScores(){
  if (score > best){ best = score; store("oma_best", best); }
  document.getElementById("score").textContent = fmt(score);
  document.getElementById("best").textContent = fmt(best);
}
function save(){
  store("oma_state", {cells: grid.flat().map(t => t ? t.lv : -1), score, seen: [...gameSeen], got: gameGot, ended});
}
function canMove(){
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    const t = grid[r][c]; if (!t) return true;
    if (t.lv >= MAX) continue;
    if (c + 1 < N && grid[r][c+1] && grid[r][c+1].lv === t.lv) return true;
    if (r + 1 < N && grid[r+1][c] && grid[r+1][c].lv === t.lv) return true;
  }
  return false;
}

// ---------- 拼图块 ----------
// 随机给一块还没有的；返回 {lv, idx, have, total, done}，作品已拼完返回 null
function awardPiece(lv){
  if (isDone(lv)) return null;
  const missing = [];
  for (let i = 0; i < total(lv); i++) if (!pieces[lv].has(i)) missing.push(i);
  const idx = missing[Math.floor(Math.random() * missing.length)];
  pieces[lv].add(idx); savePieces();
  return {lv, idx, have: pieces[lv].size, total: total(lv), done: isDone(lv)};
}
const nextPaintTarget = () => { for (let l = HIGH; l <= MAX; l++) if (!isDone(l)) return l; return -1; };

// 拼图（用同一张图的不同区域，不切图）
function puzzleHTML(lv, opts = {}){
  const a = A[lv], src = opts.thumb ? a.thumb : a.img, have = opts.have || pieces[lv];
  const full = opts.full || isDone(lv);
  const shape = a.w >= a.h ? "land" : "port";
  const size = opts.vh ? `width:${(opts.vh * Math.min(1, a.w / a.h)).toFixed(1)}vh;max-width:100%;margin:0 auto;` : "";
  if (full) return `<div class="pz full ${shape}" style="${size}aspect-ratio:${a.w}/${a.h};background-image:url(${src})"></div>`;
  let cells = "";
  for (let r = 0; r < a.rows; r++) for (let c = 0; c < a.cols; c++) {
    const i = r * a.cols + c;
    if (have.has(i)){
      const px = a.cols > 1 ? c / (a.cols - 1) * 100 : 0, py = a.rows > 1 ? r / (a.rows - 1) * 100 : 0;
      cells += `<div class="pc${opts.newIdx === i ? " fresh" : ""}" style="background-image:url(${src});background-size:${a.cols * 100}% ${a.rows * 100}%;background-position:${px}% ${py}%"></div>`;
    } else cells += `<div class="pc empty">${opts.q ? "?" : ""}</div>`;
  }
  return `<div class="pz ${shape}" style="${size}aspect-ratio:${a.w}/${a.h};grid-template-columns:repeat(${a.cols},1fr);grid-template-rows:repeat(${a.rows},1fr)">${cells}</div>`;
}

// ---------- 画家第一次出现 ----------
// 每局第一次出现（合成或随机出现都算）：发一块拼图；从第 2 阶起按开关弹介绍，否则顶部小提示
function handleAppear(lvs){
  const fresh = [...new Set(lvs)].filter(l => !gameSeen.has(l)).sort((a, b) => a - b);
  for (const lv of fresh){
    gameSeen.add(lv);
    const wasMet = met.has(lv);
    const piece = awardPiece(lv);
    if (piece) gameGot.push({lv, idx: piece.idx});
    if (lv === 0){
      met.add(0);
      if (tut === "tap"){ pendingTutPiece = piece; continue; }  // 等新手引导的介绍关掉后再提示
      if (piece) toast(piece);
    } else if (introEvery || !wasMet){
      met.add(lv);
      queue.push({k: "intro", lv, isNew: true, piece});
    } else {
      met.add(lv);
      if (piece) toast(piece);
    }
    if (piece && piece.done) queue.push({k: "complete", lv});
  }
  store("oma_met", [...met]);
  renderCount();
  if (queue.length && !modalOpen) showNext();
}

// ---------- 移动 ----------
function blocked(){ return busy || modalOpen || openPages.length || ended; }
function move(dir){
  if (blocked()) return;
  if (tut === "tap"){ nudgeCoach(); return; }
  const v = {up:[-1,0], down:[1,0], left:[0,-1], right:[0,1]}[dir];
  const rows = [0,1,2,3], cols = [0,1,2,3];
  if (v[0] === 1) rows.reverse();
  if (v[1] === 1) cols.reverse();
  let moved = false;
  const mergedAt = new Set(), removals = [], creations = [];
  for (const r of rows) for (const c of cols) {
    const t = grid[r][c];
    if (!t || t.placeholder) continue;
    let nr = r, nc = c, merged = false;
    while (true){
      const tr = nr + v[0], tc = nc + v[1];
      if (tr < 0 || tr >= N || tc < 0 || tc >= N) break;
      const o = grid[tr][tc];
      if (!o){ nr = tr; nc = tc; continue; }
      if (!o.placeholder && o.lv === t.lv && t.lv < MAX && !mergedAt.has(tr * N + tc)){
        grid[r][c] = null; t.r = tr; t.c = tc;
        removals.push(t, o); mergedAt.add(tr * N + tc);
        const p = {placeholder: true, r: tr, c: tc, lv: t.lv + 1};
        grid[tr][tc] = p; creations.push(p);
        moved = merged = true;
      }
      break;
    }
    if (!merged && (nr !== r || nc !== c)){ grid[r][c] = null; grid[nr][nc] = t; t.r = nr; t.c = nc; moved = true; }
  }
  if (!moved) return;
  busy = true;
  if (tut === "swipe") finishTutorial();
  for (const row of grid) for (const t of row) if (t && !t.placeholder) place(els.get(t.id), t.r, t.c);
  for (const t of removals){ const el = els.get(t.id); if (el){ place(el, t.r, t.c); el.classList.remove("new", "merged"); } }
  setTimeout(() => {
    removals.forEach(t => { const el = els.get(t.id); if (el) el.remove(); els.delete(t.id); });
    const appeared = [];
    creations.forEach(p => { makeTile(p.r, p.c, p.lv, "merged"); score += val(p.lv); appeared.push(p.lv); });
    const s = spawn(); if (s) appeared.push(s.lv);
    updateScores();
    handleAppear(appeared);
    save();
    busy = false;
    if (!canMove()) gameOver();
  }, 120);
}

// ---------- 弹窗队列：介绍卡 / 拼完揭晓 ----------
const modal = document.getElementById("modal"), card = document.getElementById("card");
let queue = [], cur = null, modalOpen = false;
function showNext(){
  cur = queue.shift() || null;
  if (!cur){
    modal.classList.remove("show"); modalOpen = false;
    afterModals();
    return;
  }
  renderCard();
  modal.classList.add("show"); modalOpen = true;
  card.scrollTop = 0;
  const b = card.querySelector(".primary"); if (b) b.focus({preventScroll: true});
}
function afterModals(){
  if (tut === "swipe"){
    if (pendingTutPiece){ const p = pendingTutPiece; pendingTutPiece = null; toast(p, () => showCoach()); }
    else showCoach();
  }
  if (!ended && grid && !canMove()) gameOver();
}
function factHTML(lv){
  const a = A[lv], t = T();
  let txt = esc(en() ? a.factEn : a.fact);
  if (a.factLink){  // 把文中的“《自然》论文 / Nature paper”变成链接
    const k = en() ? "Nature paper" : "《自然》论文";
    txt = txt.replace(k, `<a href="${a.factLink}" target="_blank" rel="noopener">${k} ↗</a>`);
  }
  return `<p class="fact"><b>${t.fact}</b>${txt}</p>`;
}
function renderCard(){
  const it = cur, t = T();
  if (!it) return;
  if (it.k === "complete") return renderComplete(it.lv);
  const lv = it.lv, a = A[lv];
  let title = fullName(lv), sub = en() ? a.name : a.nameEn;
  if (a.popTitle){ const p = (en() ? a.popTitleEn : a.popTitle).split(" · "); title = p[0]; sub = p[1]; }
  const art = lv === MAX;
  const topStyle = art ? `background:linear-gradient(180deg,rgba(30,15,5,.1),rgba(30,15,5,.7)),url(${a.thumb}) center 40%/cover;color:#fffaf0`
                       : `background:${a.bg};color:${a.fg}`;
  let win = "";
  if (it.isNew && lv === MAX) win = t.final; else if (it.isNew && val(lv) === 2048) win = t.win;
  let pieceBox = "";
  if (it.piece){
    const p = it.piece;
    pieceBox = `<div class="piece-box">${puzzleHTML(lv, {newIdx: p.idx, thumb: true})}
      <div><div class="gold-label">${p.done ? t.pieceDone : t.pieceGot}</div>
      <div class="pb-title">${esc(workName(lv))}　${p.have} / ${p.total}</div>
      <div class="muted small">${lv === 0 ? "" : t.pieceEvery(nm(lv))}</div></div></div>`;
  }
  card.innerHTML = `
    <div class="card-top${art ? " art" : ""}" style="${topStyle}">
      <div class="tier">${(it.isNew ? t.newArtist : it.peek ? t.peekTag : "") + t.tier(fmt(val(lv)), lv + 1)}</div>
      <div class="big">${esc(title)}</div>
      <div class="en-full">${esc(sub)}</div>
    </div>
    <div class="card-body">
      <div class="meta">${esc(en() ? a.lifeEn : a.life)}　${esc(en() ? a.tagEn : a.tag)}</div>
      ${win ? `<p class="win">${win}</p>` : ""}
      <p>${esc(en() ? a.introEn : a.intro)}</p>
      ${factHTML(lv)}
      ${pieceBox}
      <button class="primary" data-act="next">${t.cont}</button>
    </div>`;
}
function workBlock(lv){
  const a = A[lv], t = T();
  return `<div class="work-title">${esc(workName(lv))}</div>
    <div class="meta">${esc(en() ? a.workMetaEn : a.workMeta)}</div>
    <p>${esc(en() ? a.workDescEn : a.workDesc)}</p>
    <p class="fact"><b>${t.fact}</b>${esc(en() ? a.workFactEn : a.workFact)}</p>`;
}
function renderComplete(lv){
  const a = A[lv], t = T();
  if (!known(lv)){ peeked.add(lv); store("oma_peek", [...peeked]); }  // 靠颜料拼完的作品，画家也随之揭晓
  card.innerHTML = `<div class="card-body complete">
    <div class="done-label">${t.workDone}</div>
    <div class="muted small center">${t.allPieces(total(lv))}</div>
    <div class="gold-frame" data-act="view" data-lv="${lv}">${puzzleHTML(lv, {full: true, vh: 42})}</div>
    <div class="center by">${esc(fullName(lv))}</div>
    ${workBlock(lv)}
    <a class="btn ghost" href="${a.link}" target="_blank" rel="noopener">${t.museum}</a>
    <button class="primary" data-act="next">${t.collect}</button>
  </div>`;
}
card.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  if (b.dataset.act === "next") showNext();
  if (b.dataset.act === "view") openViewer(+b.dataset.lv);
});
modal.addEventListener("click", e => { if (e.target === modal) showNext(); });
function openIntro(lv, peek){
  queue.push({k: "intro", lv, isNew: false, peek});
  if (!modalOpen) showNext();
}

// ---------- 顶部小提示 ----------
const toastEl = document.getElementById("toast");
let toastQ = [], toastBusy = false;
function toast(p, after){ toastQ.push({p, after}); if (!toastBusy) nextToast(); }
function nextToast(){
  const item = toastQ.shift();
  if (!item){ toastBusy = false; return; }
  toastBusy = true;
  const p = item.p, t = T();
  toastEl.innerHTML = `<div class="mini">${puzzleHTML(p.lv, {newIdx: p.idx, thumb: true})}</div>
    <div><div class="gold-label">${p.done ? t.pieceDone : t.appeared(nm(p.lv))}</div><div>${esc(workName(p.lv))}　${p.have} / ${p.total}</div></div>`;
  toastEl.classList.add("show");
  setTimeout(() => {
    toastEl.classList.remove("show");
    setTimeout(() => { if (item.after) item.after(); nextToast(); }, 300);
  }, 2400);
}

// ---------- 结算 ----------
function settle(){
  if (ended) return null;
  ended = true;
  const gained = score, awards = [];
  paint += gained;
  while (paint >= PIECE_COST){
    const l = nextPaintTarget(); if (l < 0) break;
    paint -= PIECE_COST;
    awards.push(awardPiece(l));
  }
  store("oma_paint", paint);
  save();
  return {gained, awards};
}
function gameOver(){
  if (ended || modalOpen) return;
  const res = settle(); if (!res) return;
  showSummary(res, true);
}
function showSummary(res, isOver){
  const t = T(), body = document.getElementById("summaryBody");
  const tgt = nextPaintTarget();
  let paintBox = "";
  if (res.awards.length){
    paintBox = res.awards.map(p => `<div class="sum-award">${puzzleHTML(p.lv, {newIdx: p.idx, thumb: true})}
      <div><div class="pb-title">${esc(workLabel(p.lv))}</div><div>${p.done ? t.done : t.addedOne(p.have, p.total)}</div></div></div>`).join("");
    paintBox = `<div class="gold-label">${t.paintEnough}</div>` + paintBox;
  }
  const bar = tgt < 0 ? `<div class="muted small">${t.allHighDone}</div>` :
    `<div class="bar-row"><span>${t.toNext} · ${esc(workLabel(tgt))}</span><span class="num">${fmt(paint)} / ${fmt(PIECE_COST)}</span></div>
     <div class="bar"><i style="width:${Math.min(100, paint / PIECE_COST * 100)}%"></i></div>`;
  const got = gameGot.map(g => {
    const have = pieces[g.lv].size, tot = total(g.lv), d = have >= tot;
    return `<div class="got-item${d ? " done" : ""}"><div class="got-pz">${puzzleHTML(g.lv, {newIdx: g.idx, thumb: true})}</div>
      <div class="got-text"><div class="got-name">${esc(nm(g.lv))}</div><div class="small ${d ? "gold-text" : "muted"}">${d ? t.done : `+1 · ${have}/${tot}`}</div></div></div>`;
  }).join("");
  body.innerHTML = `
    <div class="sum-head"><div class="muted">${isOver ? t.over : ""}</div><h2>${isOver ? t.overTitle : t.ended}</h2></div>
    <div class="sum-scores"><div class="sbox"><span>${t.gameScore}</span><b>${fmt(res.gained)}</b></div>
      <div class="sbox dark"><span>${t.gotPaint}</span><b>＋${fmt(res.gained)}</b></div></div>
    <div class="panel">${paintBox}${bar}</div>
    <div class="row-between"><span class="muted">${t.piecesThisGame}</span><span class="gold-text small">${gameGot.length ? t.sum(gameGot.length) : ""}</span></div>
    ${got ? `<div class="got-grid">${got}</div>` : `<div class="muted small">${t.noPieces}</div>`}
    <div class="sum-btns"><button class="ghost" id="sumGallery">${t.toGallery}</button><button id="sumAgain">${t.again}</button></div>`;
  openPage("summary");
  document.getElementById("sumGallery").onclick = () => openGallery();
  document.getElementById("sumAgain").onclick = () => { closePage("summary"); newGame(); };
  res.awards.filter(p => p.done).forEach(p => queue.push({k: "complete", lv: p.lv}));
  if (queue.length && !modalOpen) showNext();
}

// ---------- 新游戏 ----------
function newGame(){
  clearBoard(); score = 0; gameSeen = new Set(); gameGot = []; ended = false;
  const first = [spawn(tut === "tap"), spawn(tut === "tap")].filter(Boolean).map(t => t.lv);
  updateScores(); save();
  if (tut === "tap") requestAnimationFrame(showCoach);
  handleAppear(first);
  save();
}
document.getElementById("newBtn").addEventListener("click", () => {
  if (blocked() && !ended) return;
  if (ended || score === 0){ if (!ended) settle(); newGame(); return; }
  const res = settle();
  if (res) showSummary(res, false);
});

// ---------- 页面（画廊 / 画家卡片 / 图片来源 / 结算） ----------
let openPages = [];
function openPage(id){
  const el = document.getElementById(id);
  if (!openPages.includes(id)) openPages.push(id);
  el.style.zIndex = 20 + openPages.length;
  el.classList.add("show"); el.setAttribute("aria-hidden", "false");
  el.querySelector(".page-body").scrollTop = 0;
}
function closePage(id){
  const el = document.getElementById(id);
  el.classList.remove("show"); el.setAttribute("aria-hidden", "true");
  openPages = openPages.filter(p => p !== id);
}
function renderCount(){ document.getElementById("galleryCount").textContent = `${doneCount()}/${A.length}`; }

function openGallery(){ renderGallery(); openPage("gallery"); }
function renderGallery(){
  const t = T(), tgt = nextPaintTarget();
  const items = A.map((a, lv) => {
    const d = isDone(lv), h = pieces[lv].size, k = known(lv);
    return `<button class="g-item${k ? "" : " locked"}" data-lv="${lv}">
      <div class="g-frame${d ? " done" : ""}">${puzzleHTML(lv, {thumb: true})}</div>
      <div class="g-name">${k ? esc(nm(lv)) : t.unknown}</div>
      <div class="g-sub">${fmt(val(lv))} · ${d ? t.complete : `${h} / ${total(lv)}`}</div></button>`;
  }).join("");
  document.getElementById("galleryBody").innerHTML = `
    <div class="panel">
      <div class="bar-row"><span>${t.galleryDone(doneCount(), A.length)}</span>
        <span class="muted">${t.paint} <span class="num">${fmt(paint)} / ${fmt(PIECE_COST)}</span></span></div>
      <div class="bar"><i style="width:${tgt < 0 ? 100 : Math.min(100, paint / PIECE_COST * 100)}%"></i></div>
      <div class="muted small">${t.paintNote}${tgt >= 0 ? " " + t.nextFor(esc(workLabel(tgt))) : ""}</div>
    </div>
    <div class="g-grid">${items}</div>
    <button class="linkish" id="creditsBtn">${t.creditsLink}</button>`;
  document.getElementById("creditsBtn").onclick = () => { renderCredits(); openPage("credits"); };
}
document.getElementById("galleryBody").addEventListener("click", e => {
  const b = e.target.closest(".g-item"); if (!b) return;
  const lv = +b.dataset.lv;
  if (known(lv)) openArtist(lv); else askPeek(lv);   // 没解锁：先问是继续去玩，还是直接查看
});

let artistLv = null;
function openArtist(lv){ artistLv = lv; renderArtist(); openPage("artist"); }
function renderArtist(){
  const lv = artistLv; if (lv === null) return;
  const a = A[lv], t = T(), isMet = met.has(lv), isPeek = !isMet && peeked.has(lv), shown = isMet || isPeek;
  const h = pieces[lv].size, tot = total(lv), d = isDone(lv);
  document.getElementById("artistTier").textContent = t.tier(fmt(val(lv)), lv + 1);
  const intro = shown ? `
      <p>${esc(en() ? a.introEn : a.intro)}</p>
      <details class="fold"><summary>${t.factLabel}</summary>${factHTML(lv)}</details>
      ${isMet ? `<div class="muted small">${t.metNote}</div>` : ""}` : `
      <div class="lines"><i style="width:100%"></i><i style="width:92%"></i><i style="width:97%"></i><i style="width:60%"></i></div>
      <p class="small">${t.unlockHint(fmt(val(lv)))}</p>
      <button class="ghost" id="peekBtn">${t.peekBtn}</button>
      <div class="muted small">${t.peekNote}</div>`;
  let work;
  if (d){
    work = `<div class="gold-frame" data-view="${lv}">${puzzleHTML(lv, {full: true, vh: 50})}</div>
      <button class="linkish" data-view="${lv}">${t.viewLarge}</button>
      ${workBlock(lv)}
      <a class="btn ghost" href="${a.link}" target="_blank" rel="noopener">${t.museum}</a>`;
  } else {
    const how = lv < HIGH
      ? `<p class="small"><b>${t.howGetT}</b><br>${t.howGet(nm(lv))}</p>
         <p class="small"><b>${t.howDoneT}</b><br>${t.howDone(tot - h)}</p>`
      : (() => {
          const tgt = nextPaintTarget();
          const prog = tgt === lv ? `<div class="bar-row"><span>${t.paintNow}</span><span class="num">${fmt(paint)} / ${fmt(PIECE_COST)}</span></div>
            <div class="bar"><i style="width:${Math.min(100, paint / PIECE_COST * 100)}%"></i></div>`
            : `<p class="muted small">${t.paintQueue(esc(workLabel(tgt)))}</p>`;
          return `<p class="small"><b>${t.paintGetT}</b><br>${t.paintGet}</p>${prog}`;
        })();
    work = `<div class="work-pz">${puzzleHTML(lv, {q: true, vh: 42})}</div>
      <div class="work-title">${esc(workName(lv))}</div>${how}`;
  }
  document.getElementById("artistBody").innerHTML = `
    <div class="a-head"><div class="a-name">${esc(fullName(lv))}</div>
      <div class="a-en">${esc(en() ? a.name : a.nameEn)}</div>
      <div class="muted small">${esc(en() ? a.lifeEn : a.life)} · ${esc(en() ? a.tagEn : a.tag)}</div></div>
    <section class="panel">
      <div class="row-between"><b>① ${t.secIntro}</b><span class="chip ${isMet ? "ok" : ""}">${isMet ? t.metChip : isPeek ? t.peekChip : t.lockedChip}</span></div>
      ${intro}
    </section>
    <section class="panel">
      <div class="row-between"><b>② ${t.secWork}</b><span class="chip gold">${d ? t.complete : t.piecesChip(h, tot)}</span></div>
      ${work}
    </section>`;
  const pb = document.getElementById("peekBtn"); if (pb) pb.onclick = () => askPeek(lv);
}
document.getElementById("artistBody").addEventListener("click", e => {
  const v = e.target.closest("[data-view]"); if (v) openViewer(+v.dataset.view);
});

function renderCredits(){
  const t = T();
  document.getElementById("creditsBody").innerHTML = `<p class="small">${t.creditsIntro}</p>` +
    A.map((a, lv) => known(lv) ? `<div class="credit"><a href="${a.link}" target="_blank" rel="noopener">${esc(fullName(lv))} · ${esc(workName(lv))}</a>` :
      `<div class="credit"><span class="muted">${t.unknown} · ${esc(workLabel(lv))}</span>
      <div class="muted small">${esc(a.credit)}</div></div>`).join("") +
    `<p class="muted small">${t.creditsUse}</p>`;
}

// 提前查看
const confirmEl = document.getElementById("confirm");
let confirmLv = null;
function askPeek(lv){
  confirmLv = lv;
  document.getElementById("cText").textContent = T().lockedQ(fmt(val(lv)));
  confirmEl.classList.add("show");
}
function closeConfirm(yes){
  confirmEl.classList.remove("show");
  const lv = confirmLv; confirmLv = null;
  if (lv === null) return;
  if (yes){
    peeked.add(lv); store("oma_peek", [...peeked]);
    if (openPages.includes("gallery")) renderGallery();
    if (openPages.includes("artist") && artistLv === lv) renderArtist(); else openArtist(lv);
  } else {
    // 继续去玩：回到棋盘（如果这局已经结束，就回到结算页）
    ["credits", "artist", "gallery"].forEach(p => { if (openPages.includes(p)) closePage(p); });
  }
}
document.getElementById("cYes").addEventListener("click", () => closeConfirm(true));
document.getElementById("cNo").addEventListener("click", () => closeConfirm(false));
confirmEl.addEventListener("click", e => { if (e.target === confirmEl) closeConfirm(false); });

// 大图
const viewer = document.getElementById("viewer");
function openViewer(lv){ document.getElementById("viewerImg").src = A[lv].img; viewer.classList.add("show"); }
viewer.addEventListener("click", () => viewer.classList.remove("show"));

document.getElementById("galleryBtn").addEventListener("click", () => { if (!modalOpen) openGallery(); });
document.getElementById("galleryClose").addEventListener("click", () => closePage("gallery"));
document.getElementById("artistClose").addEventListener("click", () => { closePage("artist"); if (openPages.includes("gallery")) renderGallery(); });
document.getElementById("creditsClose").addEventListener("click", () => closePage("credits"));

// ---------- 输入 ----------
document.addEventListener("keydown", e => {
  if (viewer.classList.contains("show")){ if (e.key === "Escape") viewer.classList.remove("show"); return; }
  if (confirmLv !== null){ if (e.key === "Escape") closeConfirm(false); return; }
  if (modalOpen){ if (["Enter", "Escape", " "].includes(e.key)){ e.preventDefault(); showNext(); } return; }
  if (openPages.length){ if (e.key === "Escape"){ const top = openPages[openPages.length - 1]; if (top !== "summary") closePage(top); } return; }
  const map = {ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right"};
  if (map[e.key]){ e.preventDefault(); move(map[e.key]); }
});
let sx = 0, sy = 0, lastTouch = 0;
board.addEventListener("touchstart", e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, {passive: true});
board.addEventListener("touchmove", e => e.preventDefault(), {passive: false});
board.addEventListener("touchend", e => {
  lastTouch = Date.now();
  const p = e.changedTouches[0], dx = p.clientX - sx, dy = p.clientY - sy;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 12){ e.preventDefault(); tapAt(p.clientX, p.clientY); return; }
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 30) return;
  move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
});
board.addEventListener("click", e => { if (Date.now() - lastTouch > 600) tapAt(e.clientX, e.clientY); });
// 点一下棋盘上的方块 = 看这位画家的介绍
function tapAt(x, y){
  if (blocked()) return;
  const el = document.elementFromPoint(x, y), tile = el && el.closest(".tile");
  if (!tile) return;
  const lv = +tile.dataset.lv;
  if (tut === "tap"){
    if (lv !== 0){ nudgeCoach(); return; }
    tut = "swipe"; store("oma_tut", tut); hideCoach();
    queue.push({k: "intro", lv: 0, isNew: true}); showNext();
    return;
  }
  openIntro(lv, false);
}

// ---------- 新手引导 ----------
const coachEl = document.createElement("div");
coachEl.className = "coach-tip";
board.appendChild(coachEl);
function showCoach(){
  board.querySelectorAll(".tile.coach").forEach(t => t.classList.remove("coach"));
  if (tut === "tap"){
    const t = [...board.querySelectorAll(".tile")].find(t => +t.dataset.lv === 0); if (!t) return;
    t.classList.add("coach");
    coachEl.textContent = T().coachTap;
    const top = parseFloat(t.style.top);
    coachEl.style.top = top < 50 ? `calc(${top}% + 23%)` : "";
    coachEl.style.bottom = top < 50 ? "" : `calc(${100 - top}% + 1.5%)`;
  } else if (tut === "swipe"){
    coachEl.textContent = T().coachSwipe;
    coachEl.style.top = "3%"; coachEl.style.bottom = "";
  } else { hideCoach(); return; }
  coachEl.classList.add("show");
}
function hideCoach(){ coachEl.classList.remove("show"); board.querySelectorAll(".tile.coach").forEach(t => t.classList.remove("coach")); }
function nudgeCoach(){ coachEl.classList.remove("nudge"); void coachEl.offsetWidth; coachEl.classList.add("nudge"); }
function finishTutorial(){ tut = "done"; store("oma_tut", tut); hideCoach(); }

// ---------- 语言 ----------
function applyLang(){
  const t = T();
  document.documentElement.lang = en() ? "en" : "zh-CN";
  document.title = t.docTitle;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t[el.dataset.i18n]; });
  document.getElementById("langBtn").textContent = t.langBtn;
  els.forEach(el => { el.innerHTML = tileHTML(+el.dataset.lv); });
  if (modalOpen) renderCard();
  if (openPages.includes("gallery")) renderGallery();
  if (openPages.includes("artist")) renderArtist();
  if (openPages.includes("credits")) renderCredits();
  if (coachEl.classList.contains("show")) showCoach();
}
document.getElementById("langBtn").addEventListener("click", () => {
  lang = en() ? "zh" : "en"; store("oma_lang", lang); applyLang();
});
const introCb = document.getElementById("introEvery");
introCb.checked = introEvery;
introCb.addEventListener("change", () => { introEvery = introCb.checked; store("oma_every", introEvery); });

// ---------- 启动 ----------
const st = load("oma_state");
if (st && Array.isArray(st.cells) && st.cells.length === 16 && st.cells.some(x => x >= 0) && !st.ended){
  clearBoard();
  st.cells.forEach((lv, i) => { if (lv >= 0 && lv <= MAX) makeTile(Math.floor(i / N), i % N, lv); });
  score = st.score || 0; gameSeen = new Set(st.seen || []); gameGot = st.got || [];
  updateScores();
} else newGame();
applyLang(); renderCount();
if (tut === "tap") showCoach();
if (!ended && !canMove()) gameOver();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
