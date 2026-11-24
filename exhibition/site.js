const chinese = {
  skip: "跳到正文",
  nav: "展览",
  language: "语言",
  navOverview: "展览概念",
  navCatalogue: "展品与参考",
  navFloorPlan: "展厅分布",
  introLabel: "展览",
  conceptHeading: "展览介绍",
  conceptIntro: "Every Copy Takes Place 是一个探索信息如何在实体与数字媒介之间不断转换、复制、重组和重新呈现的展览。展览关注信息在不同媒介中的存在形式，以及媒介、材料和空间如何影响信息的呈现方式与人们的观看体验。",
  conceptLink: "阅读展览介绍",
  conceptContinuation: "展览介绍正文",
  physicalHeading: "实体",
  digitalHeading: "数字",
  hybridHeading: "融合",
  conceptPhysical: "在实体世界中，信息需要依附于具体的物质载体，例如纸张、照片、书籍和印刷品。这些载体具有真实的尺寸、重量、纹理和空间位置。每一次复制都意味着一个新的物理对象被创造出来，并占据新的空间。信息的保存与传播也受到材料、制作方式及物理条件的影响。",
  conceptDigital: "随着数字技术的发展，信息可以被转化为数字编码，成为能够通过计算机进行处理的数据。图像不再只是固定的视觉对象，而是可以被计算、分解、修改、复制和重新组合的数据结构。同一份信息能够以不同的分辨率、格式和视觉形式出现，并通过数字网络在不同的设备与空间中传播。",
  conceptHybrid: "然而，数字化并不意味着信息完全摆脱了物质世界。数字图像仍然依赖屏幕、计算机、存储设备及其他物理媒介才能被呈现和感知。同时，数字信息也可以通过打印、投影或其他技术重新转化为实体形式，再次获得材料、尺寸和具体的空间位置。",
  conceptWorks: "展览通过摄影、印刷作品、数字互动装置和空间化影像，呈现信息在不同媒介之间的转换过程。观众不仅能够观察实体与数字信息的不同存在状态，也能够通过互动、身体移动和观看角度的变化，体验同一份信息如何在不同的呈现条件下产生新的视觉关系。",
  conceptQuestion: "当信息从一种媒介进入另一种媒介时，究竟发生了怎样的变化？而我们对信息的感知与理解，又在多大程度上受到媒介、材料与观看空间的影响？",
  catalogueTitle: "展品与参考",
  floorIntro: "实体与数字作品共处于两层展厅。模型展示了三种信息呈现方式如何改变我们能看到什么，以及在空间中如何观看。",
  physicalLocation: "一楼 · 入口左侧",
  printingAlt: "从印刷展柜旁看装裱的手稿和一排排印出来的书",
  printingCaption: "左墙的印刷展品和书脊",
  floorPhysical: "入口左侧的印刷木版、彩绘手稿与书脊，让信息在展厅里有可见的尺度和位置。展柜、墙面和书架分别呈现雕刻表面、纸页和书册的物质差异。",
  digitalLocation: "一楼 · 右侧",
  digitalGameAlt: "展厅模型里的 Becoming Data 屏幕、操作台和照片印刷品",
  digitalScannerAlt: "展厅模型右墙旁的扫描装置和发光台面",
  floorDigital: "Ruoxi Wu 的 Becoming Data 呈现了在电脑游戏里生成的图像。拉斐尔·洛萨诺-亨默的扫描装置《请清空你的口袋》则让观众把小物件放上传送带。扫描仪记录这些物件，物件被取走后，它们的数字图像仍能在传送带上再次出现。",
  hybridLocation: "中庭 · 跨两层",
  upperAlt: "从二楼走廊隔着中庭看悬挂的肖像碎片",
  upperCaption: "隔着中庭看悬挂的肖像",
  floorHybrid: "半透明面板把印刷的肖像碎片带进中庭。面板之间的间距、高度与叠合都成为画面的一部分。从一楼或二楼栏杆边看，肖像之间的关系，以及它们与展厅的关系，都会发生变化。",
  backTop: "返回顶部",
  detailLabel: "展品与参考",
  close: "关闭",
  detailSource: "来源",
};

const copyNodes = [...document.querySelectorAll("[data-copy]")];
const labelNodes = [...document.querySelectorAll("[data-label]")];
const altNodes = [...document.querySelectorAll("[data-alt]")];
const english = new Map();
for (const node of copyNodes) english.set(node, node.textContent);
for (const node of labelNodes) english.set(node, node.getAttribute("aria-label"));
for (const node of altNodes) english.set(node, node.alt);

const languageButtons = [...document.querySelectorAll("[data-language]")];
const grid = document.querySelector("#catalogue-grid");
const template = document.querySelector("#catalogue-card");
const dialog = document.querySelector(".catalogue-dialog");
const detail = {
  title: document.querySelector("#detail-title"),
  credit: document.querySelector("#detail-credit"),
  description: document.querySelector("#detail-description"),
  source: document.querySelector("#detail-source"),
  visual: dialog.querySelector(".detail-visual"),
};
let copyIndex = 0;
let currentEntry;
let opener;

function makeVisual(entry, isCard = false) {
  const img = document.createElement("img");
  img.src = entry.image || ("exhibition/catalogue/" + entry.id + ".webp");
  img.alt = isCard ? "" : entry.title[copyIndex];
  img.loading = isCard ? "lazy" : "eager";
  img.decoding = "async";
  return img;
}

function makeVideoPoster(entry) {
  const poster = document.createElement("button");
  poster.className = "video-poster";
  poster.type = "button";
  poster.setAttribute("aria-label", (copyIndex ? "播放 " : "Play ") + entry.title[copyIndex]);

  const image = makeVisual(entry);
  image.alt = "";
  const icon = document.createElement("span");
  icon.className = "video-play-mark";
  icon.setAttribute("aria-hidden", "true");
  poster.append(image, icon);

  poster.addEventListener("click", () => {
    const src = new URL(entry.video);
    src.searchParams.set("autoplay", "1");
    const player = document.createElement("iframe");
    player.className = "detail-player";
    player.src = src.href;
    player.title = entry.title[copyIndex];
    player.allow = "autoplay; fullscreen; picture-in-picture";
    player.allowFullscreen = true;
    player.referrerPolicy = "strict-origin-when-cross-origin";
    poster.replaceWith(player);
    player.focus();
  }, { once: true });
  return poster;
}

function fillDialog(entry) {
  detail.title.textContent = entry.title[copyIndex];
  detail.credit.textContent = entry.credit[copyIndex];
  detail.description.textContent = (entry.details || entry.description)[copyIndex];
  detail.source.hidden = !entry.source;
  if (entry.source) detail.source.href = entry.source;
  else detail.source.removeAttribute("href");
  detail.visual.replaceChildren(entry.video ? makeVideoPoster(entry) : makeVisual(entry));
}

function updateCard(card) {
  card.title.textContent = card.entry.title[copyIndex];
  card.credit.textContent = card.entry.credit[copyIndex];
  card.description.textContent = card.entry.description[copyIndex];
  if (card.mediaLabel) card.mediaLabel.textContent = ["Video", "视频"][copyIndex];
}

const cards = catalogue.map((entry) => {
  const article = template.content.firstElementChild.cloneNode(true);
  if (typeof entry.id === "string") article.id = entry.id;
  const button = article.querySelector(".card-button");
  const visual = article.querySelector(".card-visual");
  visual.append(makeVisual(entry, true));
  if (entry.fit === "contain") visual.classList.add("contained");
  if (entry.position) visual.style.setProperty("--image-position", entry.position);
  const card = {
    entry,
    title: article.querySelector(".card-title"),
    credit: article.querySelector(".card-credit"),
    description: article.querySelector(".card-description"),
  };
  if (entry.video) {
    card.mediaLabel = document.createElement("span");
    card.mediaLabel.className = "media-label";
    visual.append(card.mediaLabel);
  }
  updateCard(card);
  button.addEventListener("click", () => {
    currentEntry = entry;
    opener = button;
    fillDialog(entry);
    dialog.showModal();
  });
  grid.append(article);
  return card;
});

dialog.addEventListener("close", () => {
  if (currentEntry?.video) detail.visual.replaceChildren();
  currentEntry = undefined;
  opener?.focus();
});

function setLanguage(language) {
  const translated = language === "zh";
  copyIndex = translated ? 1 : 0;
  document.documentElement.lang = translated ? "zh-Hans" : "en";
  for (const node of copyNodes) node.textContent = translated ? chinese[node.dataset.copy] : english.get(node);
  for (const node of labelNodes) node.setAttribute("aria-label", translated ? chinese[node.dataset.label] : english.get(node));
  for (const node of altNodes) node.alt = translated ? chinese[node.dataset.alt] : english.get(node);
  for (const button of languageButtons) button.setAttribute("aria-pressed", button.dataset.language === language);
  cards.forEach(updateCard);
  if (currentEntry) fillDialog(currentEntry);
}

for (const button of languageButtons) {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
}
