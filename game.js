// 按出生年份从晚到早：索引 0 = 4（达利）… 索引 9 = 2048（达·芬奇）… 索引 13 = 32768（拉斯科洞穴）
const A = [
  {zh:"达利",short:"Dalí",en:"Salvador Dalí",life:"1904–1989",tag:"西班牙 · 超现实主义",bg:"#f3e9d2",fg:"#5a4630",
   desc:"超现实主义最具标志性的人物之一，擅长把梦境与潜意识画得精确逼真。1931 年《记忆的永恒》中柔软融化的钟表，几乎成了“梦境”的代名词。",
   fact:"除了绘画，他还涉足电影、珠宝与广告设计；那两撇上翘的胡子本身就是他精心经营的“作品”。"},
  {zh:"毕加索",short:"Picasso",en:"Pablo Picasso",life:"1881–1973",tag:"西班牙 · 立体主义",bg:"#e9d3a6",fg:"#4a3517",
   desc:"二十世纪最具影响力的艺术家之一，与布拉克共同开创立体主义，把物体拆解成多个视角同时呈现。1937 年的《格尔尼卡》以黑白灰控诉西班牙内战中对平民的轰炸。",
   fact:"他一生极其多产，作品横跨绘画、雕塑、版画与陶艺，数量以万计。"},
  {zh:"梵高",short:"Van Gogh",en:"Vincent van Gogh",life:"1853–1890",tag:"荷兰 · 后印象派",bg:"#f2c14e",fg:"#3b2a05",
   desc:"以浓烈的色彩和翻涌的笔触表达内心情感。《星月夜》作于 1889 年，画的是他在圣雷米疗养院窗外的夜空，旋转的星云成为最广为人知的画面之一。",
   fact:"他的创作生涯只有大约十年，却留下两千多件作品；生前几乎卖不出画，身后才声名大噪。"},
  {zh:"莫奈",short:"Monet",en:"Claude Monet",life:"1840–1926",tag:"法国 · 印象派",bg:"#8fbf9a",fg:"#173225",
   desc:"印象派的开创者，执着于捕捉光线与色彩在不同时刻的变化。晚年在吉维尼的花园里反复描绘睡莲池，《睡莲》系列多达约 250 幅。",
   fact:"“印象派”一词正来自他的《日出·印象》——批评家原本是借这个画名来嘲讽这群画家的。"},
  {zh:"维米尔",short:"Vermeer",en:"Johannes Vermeer",life:"1632–1675",tag:"荷兰 · 黄金时代",bg:"#3f64a0",fg:"#ffffff",
   desc:"擅长描绘静谧的室内场景，以柔和的窗光与细腻的质感著称。《戴珍珠耳环的少女》常被称为“北方的蒙娜丽莎”。",
   fact:"他存世的作品只有三十余幅，而且偏爱用昂贵的群青颜料——由青金石研磨而成。"},
  {zh:"伦勃朗",short:"Rembrandt",en:"Rembrandt van Rijn",life:"1606–1669",tag:"荷兰 · 黄金时代",bg:"#8a5a2b",fg:"#ffffff",
   desc:"荷兰黄金时代最伟大的画家，善用强烈的明暗营造戏剧张力与人物内心。《夜巡》打破了群像整齐排列的传统，让整支民兵队像正要出发一样生动。",
   fact:"他一生留下大量自画像，从意气风发到年老落魄，几乎是一部用画笔写成的自传。"},
  {zh:"卡拉瓦乔",short:"Caravaggio",en:"Caravaggio",life:"1571–1610",tag:"意大利 · 巴洛克",bg:"#2f231c",fg:"#f4d9a0",
   desc:"巴洛克绘画的革新者，用“暗色调主义”让人物从漆黑背景中被一束强光照亮。《圣马太蒙召》中那道斜射的光线，仿佛把神迹带进了罗马的小酒馆。",
   fact:"他性格暴烈、屡惹官司，1606 年因斗殴致人死亡而被迫流亡，38 岁便去世。"},
  {zh:"拉斐尔",short:"Raphael",en:"Raffaello Sanzio (Raphael)",life:"1483–1520",tag:"意大利 · 盛期文艺复兴",bg:"#b9473f",fg:"#ffffff",
   desc:"与达·芬奇、米开朗基罗并称“文艺复兴三杰”，画风和谐典雅。梵蒂冈壁画《雅典学院》把柏拉图、亚里士多德等古希腊哲人汇聚一堂。",
   fact:"他只活了 37 岁；传统说法认为他恰好在自己生日那天去世。"},
  {zh:"米开朗基罗",short:"Michelangelo",en:"Michelangelo Buonarroti",life:"1475–1564",tag:"意大利 · 盛期文艺复兴",bg:"#5b3a7a",fg:"#ffffff",
   desc:"雕塑、绘画、建筑三栖的巨匠。26 岁开始雕刻高逾五米的《大卫》；后来又花了约四年时间完成西斯廷礼拜堂天顶画。",
   fact:"他始终自认是雕塑家而不是画家，接下天顶画的委托时相当不情愿。"},
  {zh:"达·芬奇",short:"Leonardo",en:"Leonardo da Vinci",life:"1452–1519",tag:"意大利 · 文艺复兴",bg:"linear-gradient(135deg,#f6d365,#d4a017)",fg:"#3a2600",gold:true,
   desc:"文艺复兴“全才”的代名词：画家、工程师、解剖学家、发明家。《蒙娜丽莎》的神秘微笑与《最后的晚餐》的戏剧瞬间，都是西方艺术史上最著名的画面。",
   fact:"他留下了数千页笔记，其中许多是用左手从右向左书写的“镜像文字”。"},
  {zh:"波提切利",short:"Botticelli",en:"Sandro Botticelli",life:"约1445–1510",lifeEn:"c. 1445–1510",born:"1445",tag:"意大利 · 早期文艺复兴",bg:"#efc3bb",fg:"#4a1f1f",
   desc:"佛罗伦萨早期文艺复兴的代表画家，深受美第奇家族赞助。《维纳斯的诞生》与《春》以飘逸的线条和优雅的人物，把古希腊罗马神话重新带回绘画。",
   fact:"“波提切利”其实是个绰号，意思是“小酒桶”，最早是他哥哥的外号。"},
  {zh:"凡·艾克",short:"Van Eyck",en:"Jan van Eyck",life:"约1390–1441",lifeEn:"c. 1390–1441",born:"1390",tag:"尼德兰 · 早期尼德兰画派",bg:"#2f5d4c",fg:"#ffffff",
   desc:"早期尼德兰绘画的巨匠，把油画技法推向前所未有的精细。《阿尔诺芬尼夫妇像》里，连墙上凸面镜中的倒影都清晰可辨；《根特祭坛画》被誉为欧洲艺术的里程碑。",
   fact:"他在《阿尔诺芬尼夫妇像》的镜子上方写了一行拉丁文：“扬·凡·艾克曾在此，1434。”"},
  {zh:"乔托",short:"Giotto",en:"Giotto di Bondone",life:"约1267–1337",lifeEn:"c. 1267–1337",born:"1267",tag:"意大利 · 原文艺复兴",bg:"#2b4c8c",fg:"#f3d27a",
   desc:"常被称为“欧洲绘画之父”。他让中世纪平板的圣像有了重量、空间与真实的情感。帕多瓦斯克罗威尼礼拜堂的壁画，为两百年后的文艺复兴铺好了路。",
   fact:"他在《三王朝拜》里把伯利恒之星画成了一颗彗星；1986 年飞去探测哈雷彗星的欧洲探测器，就以他的名字命名。"},
  {zh:"拉斯科",zhFull:"拉斯科洞穴",zhSub:"这里，曾经有过一群画家",short:"Lascaux",en:"Lascaux Cave",enSub:"Artists once painted here",
   life:"约1.7万年前",lifeEn:"c. 17,000 years ago",tileEn:"",born:"冰河时代",bornEn:"Ice Age",tag:"法国 · 旧石器时代洞穴壁画",
   img:"img/lascaux.jpg",bg:"url(img/lascaux.jpg) 58% 42% / cover no-repeat #c9a27a",fg:"#fffaf0",gold:true,
   desc:"约一万七千年前，冰河时代的人们走进法国多尔多涅的拉斯科洞穴，用赭石、木炭和锰矿粉在岩壁上画下近六百只动物：奔马、野牛、雄鹿，还有上千幅刻痕。他们没有留下名字，却被称为“史前的西斯廷礼拜堂”。",
   fact:"1940 年，几个少年追着一只狗发现了这个洞穴。开放参观后，游客呼出的气息让壁画开始发霉，1963 年洞穴永久关闭，如今人们参观的是一比一的复制洞穴。"}
];
// 英文版的画家资料（顺序与 A 相同）
const EN = [
  {tag:"Spain · Surrealism",
   desc:"One of Surrealism's defining figures, he painted dreams and the subconscious with photographic precision. The soft, melting clocks of The Persistence of Memory (1931) have become shorthand for the dream world itself.",
   fact:"Beyond painting he worked in film, jewelry and advertising — and his upturned moustache was a carefully cultivated work of art in its own right."},
  {tag:"Spain · Cubism",
   desc:"Among the most influential artists of the 20th century, he co-founded Cubism with Georges Braque, breaking objects into several viewpoints at once. Guernica (1937), painted in black, white and grey, protests the bombing of civilians in the Spanish Civil War.",
   fact:"He was astonishingly prolific: paintings, sculptures, prints and ceramics numbering in the tens of thousands."},
  {tag:"Netherlands · Post-Impressionism",
   desc:"He poured emotion into vivid colour and surging brushstrokes. The Starry Night (1889) shows the sky outside his window at the asylum in Saint-Rémy; its swirling stars are now among the most recognised images in art.",
   fact:"His career lasted only about ten years yet produced over 2,000 works. He sold almost nothing in his lifetime and became famous only after his death."},
  {tag:"France · Impressionism",
   desc:"The founding figure of Impressionism, obsessed with how light and colour shift from moment to moment. In later life he painted the lily pond in his garden at Giverny again and again — the Water Lilies series runs to about 250 canvases.",
   fact:"The word “Impressionism” comes from his painting Impression, Sunrise — a critic borrowed the title to mock the whole group."},
  {tag:"Netherlands · Dutch Golden Age",
   desc:"A master of quiet domestic interiors, known for soft window light and exquisite textures. Girl with a Pearl Earring is often called the “Mona Lisa of the North”.",
   fact:"Only about three dozen of his paintings survive, and he favoured costly ultramarine pigment ground from lapis lazuli."},
  {tag:"Netherlands · Dutch Golden Age",
   desc:"The greatest painter of the Dutch Golden Age, using bold light and shadow to reveal drama and inner life. The Night Watch broke with stiff, lined-up group portraits, showing a militia company as if caught in motion.",
   fact:"He painted dozens of self-portraits, from confident youth to weathered old age — an autobiography written in paint."},
  {tag:"Italy · Baroque",
   desc:"A Baroque revolutionary whose tenebrism lit figures with a single hard beam against deep darkness. In The Calling of Saint Matthew, a slanting shaft of light seems to carry the divine into an ordinary Roman tavern.",
   fact:"Hot-tempered and often in trouble with the law, he killed a man in a brawl in 1606, fled Rome, and died at just 38."},
  {tag:"Italy · High Renaissance",
   desc:"With Leonardo and Michelangelo, one of the three giants of the High Renaissance, celebrated for harmony and grace. His Vatican fresco The School of Athens gathers Plato, Aristotle and other Greek thinkers in one grand hall.",
   fact:"He lived only 37 years — and tradition holds that he died on his own birthday."},
  {tag:"Italy · High Renaissance",
   desc:"Sculptor, painter and architect. At 26 he began carving David, more than five metres tall; later he spent about four years painting the Sistine Chapel ceiling.",
   fact:"He always considered himself a sculptor first, and accepted the ceiling commission reluctantly."},
  {tag:"Italy · Renaissance",
   desc:"The very model of the “Renaissance man”: painter, engineer, anatomist, inventor. The enigmatic smile of the Mona Lisa and the drama of The Last Supper are among the most famous images in Western art.",
   fact:"He filled thousands of notebook pages, much of it in left-handed mirror writing running from right to left."},
  {tag:"Italy · Early Renaissance",
   desc:"A leading painter of early Renaissance Florence and a favourite of the Medici. The Birth of Venus and Primavera use flowing line and graceful figures to bring classical myth back into painting.",
   fact:"“Botticelli” was a nickname meaning “little barrel” — it first belonged to his older brother."},
  {tag:"Low Countries · Early Netherlandish",
   desc:"The great master of Early Netherlandish painting, who took oil technique to unprecedented detail. In the Arnolfini Portrait even the reflection in the convex mirror is legible, and the Ghent Altarpiece is a landmark of European art.",
   fact:"Above the mirror in the Arnolfini Portrait he wrote in Latin: “Jan van Eyck was here, 1434.”"},
  {tag:"Italy · Proto-Renaissance",
   desc:"Often called the father of European painting. He gave flat medieval icons weight, space and real emotion; his frescoes in the Scrovegni Chapel in Padua prepared the ground for the Renaissance two centuries later.",
   fact:"In his Adoration of the Magi he painted the Star of Bethlehem as a comet — so the European probe sent to Halley's Comet in 1986 was named Giotto."},
  {tag:"France · Palaeolithic cave art",
   desc:"Some 17,000 years ago, Ice Age people made their way deep into Lascaux Cave in the Dordogne. With ochre, charcoal and manganese they painted nearly 600 animals — galloping horses, bison, stags — and carved some 1,500 more. They left no names, yet their work is called “the Sistine Chapel of prehistory”.",
   fact:"Four teenagers found the cave in 1940, following a dog. After it opened to visitors, their breath began to damage the paintings, so it was sealed in 1963 — today's visitors walk through a full-size replica."}
];
A.forEach((a, i) => { a.tagEn = EN[i].tag; a.descEn = EN[i].desc; a.factEn = EN[i].fact; });

// 界面文字
const I18N = {
  zh: {docTitle:"2048 · 名画家版", title:"2048 · 名画家", sub:"合并相同的画家，从达利一路回溯到拉斯科洞穴",
       score:"分数", best:"最高", hint:"方向键 / WASD / 手指滑动", newGame:"新游戏",
       over:"没有可以移动的方块了", retry:"再来一局",
       ladderTitle:"画家阶梯（越早出生越高阶，点击画家查看介绍）",
       footer:"两个相同的画家合并，会变成更早出生的那一位。", cont:"继续",
       newArtist:"新画家登场 · ", tier:(v, n) => `${v} · 第 ${n} 阶`,
       win:"🎉 你合成出了 2048！可以继续玩下去。", final:"🏆 你一路追溯到了绘画的源头！", fact:"小知识：", unknown:"？", langBtn:"EN",
       peekTag:"提前查看 · ", lockedQ:v => `「${v}」还没有合成解锁。要放弃合成，直接查看这位画家的介绍吗？`, peekYes:"直接查看", peekNo:"继续挑战"},
  en: {docTitle:"2048 · Old Masters", title:"2048 · Old Masters", sub:"Merge matching artists and travel back in time from Dalí to Lascaux Cave",
       score:"SCORE", best:"BEST", hint:"Arrow keys / WASD / swipe", newGame:"New Game",
       over:"No moves left", retry:"Try again",
       ladderTitle:"The ladder (born earlier = ranks higher; tap an artist to read more)",
       footer:"Two identical artists merge into the one born earlier.", cont:"Continue",
       newArtist:"New artist · ", tier:(v, n) => `${v} · Rank ${n}`,
       win:"🎉 You made 2048! Keep playing if you like.", final:"🏆 You've traced art all the way back to its beginnings!", fact:"Fun fact: ", unknown:"?", langBtn:"中文",
       peekTag:"Sneak peek · ", lockedQ:v => `${v} hasn't been unlocked yet. Skip the challenge and read about this artist now?`, peekYes:"Show me", peekNo:"Keep playing"}
};
let lang = (function(){
  try { const s = JSON.parse(localStorage.getItem("art2048_lang")); if (s === "zh" || s === "en") return s; } catch(e) {}
  return (navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en";
})();
const T = () => I18N[lang];

const N = 4, MAX = A.length - 1;
const val = lv => 4 * 2 ** lv;
const POS = i => (2.5 + i * 24.375) + "%";

const board = document.getElementById("board");
const overEl = document.getElementById("over");
const modal = document.getElementById("modal");
let grid, score = 0, best = 0, busy = false, nextId = 1, modalQueue = [], modalOpen = false;
let met = new Set([0]);      // 图鉴：曾经解锁过的画家（跨局保留）
let gameMet = new Set();     // 本局已经弹过介绍的画家
let peeked = new Set(load("art2048_peek") || []);  // 没解锁但选择了提前查看的画家
const els = new Map();

function store(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function load(k){ try{ const s = localStorage.getItem(k); return s ? JSON.parse(s) : null; }catch(e){ return null; } }

// 背景格子
for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
  const d = document.createElement("div");
  d.className = "cell"; d.style.left = POS(c); d.style.top = POS(r);
  board.appendChild(d);
}

function tileHTML(a){
  if (a.img) return `<span class="cap">${lang === "en" ? a.short : a.zh}</span>`;
  if (lang === "en")
    return `<span class="zh" style="font-size:${Math.min(5.2, 20 / (a.short.length * 0.6))}cqw">${a.short}</span><span class="en">${a.tileEn || a.lifeEn || a.life}</span>`;
  return `<span class="zh" style="font-size:${Math.min(6, 18 / a.zh.length)}cqw">${a.zh}</span><span class="en">${a.short}</span>`;
}

function place(el, r, c){ el.style.left = POS(c); el.style.top = POS(r); }

function makeTile(r, c, lv, cls){
  const t = {id: nextId++, r, c, lv};
  grid[r][c] = t;
  const a = A[lv], el = document.createElement("div");
  el.className = "tile " + (cls || "") + (a.gold ? " gold" : "") + (a.img ? " art" : "");
  el.style.background = a.bg; el.style.color = a.fg;
  el.dataset.lv = lv;
  el.innerHTML = tileHTML(a);
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

function spawn(){
  const e = emptyCells(); if (!e.length) return;
  const [r, c] = e[Math.floor(Math.random() * e.length)];
  makeTile(r, c, Math.random() < 0.9 ? 0 : 1, "new");
}

function clearBoard(){
  els.forEach(el => el.remove()); els.clear();
  grid = Array.from({length: N}, () => Array(N).fill(null));
}

function newGame(){
  clearBoard(); score = 0; gameMet = new Set(); overEl.classList.remove("show");
  spawn(); spawn();
  updateScores(); save();
}

function updateScores(){
  if (score > best){ best = score; store("art2048_best", best); }
  document.getElementById("score").textContent = score;
  document.getElementById("best").textContent = best;
}

function save(){
  store("art2048_state", {cells: grid.flat().map(t => t ? t.lv : -1), score, seen: [...gameMet]});
  store("art2048_met", [...met]);
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

function move(dir){
  if (busy || modalOpen || overEl.classList.contains("show")) return;
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
        grid[r][c] = null;
        t.r = tr; t.c = tc;
        removals.push(t, o);
        mergedAt.add(tr * N + tc);
        const p = {placeholder: true, r: tr, c: tc, lv: t.lv + 1};
        grid[tr][tc] = p; creations.push(p);
        moved = merged = true;
      }
      break;
    }
    if (!merged && (nr !== r || nc !== c)){
      grid[r][c] = null; grid[nr][nc] = t; t.r = nr; t.c = nc; moved = true;
    }
  }
  if (!moved) return;

  busy = true;
  // 滑动动画
  for (const row of grid) for (const t of row) if (t && !t.placeholder) place(els.get(t.id), t.r, t.c);
  for (const t of removals){ const el = els.get(t.id); if (el){ place(el, t.r, t.c); el.classList.remove("new","merged"); } }

  setTimeout(() => {
    removals.forEach(t => { const el = els.get(t.id); if (el) el.remove(); els.delete(t.id); });
    const fresh = [];
    creations.forEach(p => {
      makeTile(p.r, p.c, p.lv, "merged");
      score += val(p.lv);
      met.add(p.lv);
      // 本局第一次合成出这一阶时弹介绍；更低阶里本局还没介绍过的（比如达利）一并先介绍
      for (let l = 0; l <= p.lv; l++) if (!gameMet.has(l)){ gameMet.add(l); fresh.push(l); }
    });
    spawn();
    updateScores(); renderLadder(); save();
    fresh.sort((a, b) => a - b).forEach(l => modalQueue.push({lv: l, isNew: true}));
    if (fresh.length && !modalOpen) showNext();
    if (!canMove()) overEl.classList.add("show");
    busy = false;
  }, 120);
}

// 介绍弹窗
let curItem = null;
function showNext(){
  curItem = modalQueue.shift() || null;
  if (!curItem){ modal.classList.remove("show"); modalOpen = false; return; }
  renderModal();
  modal.classList.add("show"); modalOpen = true;
  document.getElementById("mBtn").focus();
}
function renderModal(){
  const item = curItem; if (!item) return;
  const a = A[item.lv], t = T(), en = lang === "en";
  const top = document.getElementById("mTop");
  top.classList.toggle("art", !!a.img);
  top.style.background = a.img ? `linear-gradient(180deg,rgba(30,15,5,.15),rgba(30,15,5,.7)), url(${a.img}) center 40% / cover` : a.bg;
  document.getElementById("mTop").style.color = a.fg;
  document.getElementById("mTier").textContent = (item.isNew ? t.newArtist : item.peek ? t.peekTag : "") + t.tier(val(item.lv), item.lv + 1);
  document.getElementById("mZh").textContent = en ? a.en : (a.zhFull || a.zh);
  document.getElementById("mEn").textContent = a.img ? (en ? a.enSub : a.zhSub) : (en ? a.zh : a.en);
  document.getElementById("mMeta").textContent = (en ? (a.lifeEn || a.life) : a.life) + "　" + (en ? a.tagEn : a.tag);
  const win = document.getElementById("mWin");
  win.textContent = !item.isNew ? "" : item.lv === MAX ? t.final : val(item.lv) === 2048 ? t.win : "";
  win.style.display = win.textContent ? "block" : "none";
  document.getElementById("mDesc").textContent = en ? a.descEn : a.desc;
  document.getElementById("mFact").textContent = t.fact + (en ? a.factEn : a.fact);
}
document.getElementById("mBtn").addEventListener("click", showNext);
modal.addEventListener("click", e => { if (e.target === modal) showNext(); });

function renderLadder(){
  const lad = document.getElementById("ladder");
  lad.innerHTML = "";
  A.forEach((a, i) => {
    const d = document.createElement("div");
    const isMet = met.has(i), isPeek = !isMet && peeked.has(i), shown = isMet || isPeek;
    d.className = "chip" + (isMet ? " met" : isPeek ? " peek" : " locked");
    d.style.background = a.bg; d.style.color = a.fg;
    if (a.img){ d.classList.add("art"); d.style.background = `linear-gradient(rgba(40,20,5,.5),rgba(40,20,5,.5)), url(${a.img}) 58% 42% / cover`; }
    const born = lang === "en" ? (a.bornEn || a.born || a.life.slice(0,4)) : (a.born || a.life.slice(0,4));
    d.innerHTML = `<b>${val(i)}</b><span class="nm">${shown ? (lang === "en" ? a.short : a.zh) : T().unknown}</span>${born}`;
    d.addEventListener("click", () => {
      if (shown) openIntro(i, !isMet);
      else askPeek(i);
    });
    lad.appendChild(d);
  });
}
function openIntro(lv, peek){
  modalQueue.push({lv, isNew: false, peek});
  if (!modalOpen) showNext();
}

// 未解锁画家：先确认是否放弃合成直接查看
const confirmEl = document.getElementById("confirm");
let confirmLv = null;
function askPeek(lv){
  if (modalOpen) return;
  confirmLv = lv;
  document.getElementById("cText").textContent = T().lockedQ(val(lv));
  confirmEl.classList.add("show"); modalOpen = true;
  document.getElementById("cNo").focus();
}
function closeConfirm(yes){
  confirmEl.classList.remove("show"); modalOpen = false;
  const lv = confirmLv; confirmLv = null;
  if (yes && lv !== null){
    peeked.add(lv); store("art2048_peek", [...peeked]);
    renderLadder(); openIntro(lv, true);
  }
}
document.getElementById("cYes").addEventListener("click", () => closeConfirm(true));
document.getElementById("cNo").addEventListener("click", () => closeConfirm(false));
confirmEl.addEventListener("click", e => { if (e.target === confirmEl) closeConfirm(false); });

// 输入
document.addEventListener("keydown", e => {
  if (confirmLv !== null){
    if (e.key === "Escape"){ e.preventDefault(); closeConfirm(false); }
    return;
  }
  if (modalOpen){
    if (["Enter","Escape"," "].includes(e.key)){ e.preventDefault(); showNext(); }
    return;
  }
  const map = {ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right",w:"up",s:"down",a:"left",d:"right",W:"up",S:"down",A:"left",D:"right"};
  if (map[e.key]){ e.preventDefault(); move(map[e.key]); }
});
let sx = 0, sy = 0;
board.addEventListener("touchstart", e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, {passive: true});
board.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 30) return;
  move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
});
document.getElementById("newBtn").addEventListener("click", newGame);
document.getElementById("retryBtn").addEventListener("click", newGame);

// 语言切换
function applyLang(){
  const t = T();
  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
  document.title = t.docTitle;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t[el.dataset.i18n]; });
  document.getElementById("langBtn").textContent = t.langBtn;
  els.forEach(el => { el.innerHTML = tileHTML(A[+el.dataset.lv]); });
  renderLadder();
  if (modalOpen) renderModal();
}
document.getElementById("langBtn").addEventListener("click", () => {
  lang = lang === "en" ? "zh" : "en";
  store("art2048_lang", lang);
  applyLang();
});

// 启动：恢复存档
best = load("art2048_best") || 0;
const m = load("art2048_met"); if (Array.isArray(m)) met = new Set([0, ...m]);
const st = load("art2048_state");
if (st && Array.isArray(st.cells) && st.cells.length === 16 && st.cells.some(x => x >= 0)){
  clearBoard();
  st.cells.forEach((lv, i) => { if (lv >= 0 && lv <= MAX) makeTile(Math.floor(i / N), i % N, lv); });
  score = st.score || 0;
  gameMet = new Set(Array.isArray(st.seen) ? st.seen : []);
  updateScores();
  if (!canMove()) overEl.classList.add("show");
} else newGame();
applyLang();


// 离线缓存（PWA）
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
