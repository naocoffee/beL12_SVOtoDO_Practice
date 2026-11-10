// =====================================================================
// 編集ゾーン（設定と問題データ）
//   問題を追加・修正するときは、この部分だけを書きかえる。
//   template の {} が空所（1つの {} に1語）。answers は {} と同じ数・同じ順。
// =====================================================================

const APP_TITLE = "Lesson 12 A　SVO＋不定詞（動詞＋人＋to do）";
const LESSON_NAME = "Lesson 12 A 一覧";   // 記録（log）に書くレッスン名
// 記録先：スプレッドシート「Lesson 12 A 一覧 学習記録」
const LOG_URL = "https://script.google.com/macros/s/AKfycbxNpjCNaDGhbFNuQcTOQixS2L9MpXXHsBR0k4d6i0YEngVx84N_YGoq4o4yG6JmpP5Q/exec";
const COUNT_OPTIONS = [10, 20];          // このほかに「全問」が自動で加わる
const INSTRUCTION = "日本語に合うように、（　）に1語ずつ入れなさい。";

const POINT = [
  "〈動詞＋人＋to do〉では、to do の意味上の主語は「人（O）」。",
  "I want you to sing.（歌うのは you）⇔ I want to sing.（歌うのは I）",
  "「～しないように」は to の前に not を置く：〈動詞＋人＋not to do〉",
  "受動態は〈人＋be＋過去分詞＋to do〉：be told to do（～するように言われる）／be allowed to do（～することを許される）"
];

const QUESTIONS = [
  { no: 1, form: "want＋人＋to do", meaning: "人に～してほしい",
    template: "I {} {} {} {} that song.", answers: ["want", "you", "to", "sing"],
    ja: "私はあなたにあの歌を歌ってほしい。", src: "例文❶",
    note: "〈want＋人＋to do〉で「人に～してほしい」。歌うのは I ではなく you（O）です。\nI want to sing that song. なら「私が歌いたい」。want のあとに「人」が入るかどうかで、だれがするのかが変わります。" },
  { no: 2, form: "want＋人＋to do", meaning: "人に～してほしい",
    template: "What do you {} {} {} {}?", answers: ["want", "me", "to", "do"],
    ja: "あなたは私に何をしてほしいのですか。", src: "Ex.1⑵",
    note: "〈want＋人＋to do〉の疑問文。「人」に代名詞が入るときは目的格（me / him / her / them）にします。\n疑問文で do you を使っているので、want は原形のまま。I ではなく me を入れることに注意。" },
  { no: 3, form: "want＋人＋to do（否定）", meaning: "人に～してほしくない",
    template: "My parents don't {} {} {} {} online videos.", answers: ["want", "me", "to", "watch"],
    ja: "両親は私がネットの動画を見てほしくない。", src: "Ex.1⑷",
    note: "「～してほしくない」は don't want＋人＋to do。否定の not は want の前（don't）に置きます。\nwant me not to watch とすると「見ないでほしい」という別の言い方になります。ここでは don't がすでにあるので、want me to watch。" },
  { no: 4, form: "want＋人＋to do", meaning: "人に～してほしい",
    template: "My sister {} {} {} {} her with her homework.", answers: ["wanted", "me", "to", "help"],
    ja: "妹は私に宿題を手伝ってほしがった。", src: "Ex.3⑴",
    note: "過去の文なので want を過去形 wanted にします。to のあとはいつも動詞の原形（help）。\nhelp＋人＋with ～ で「人の～を手伝う」。手伝うのは me（私）です。" },
  { no: 5, form: "would like＋人＋to do", meaning: "人に～してほしい（want よりていねい）",
    template: "Would you {} {} {} {} you the way to the station?", answers: ["like", "me", "to", "show"],
    ja: "駅への行き方をご案内しましょうか。", src: "Ex.3⑷",
    note: "〈would like＋人＋to do〉は want＋人＋to do のていねいな言い方。Would you like me to ～? で「（私が）～しましょうか」と申し出る表現になります。\nshow＋人＋the way で「人に道を教える（案内する）」。" },
  { no: 6, form: "tell＋人＋to do", meaning: "人に～するように言う",
    template: "My mother {} {} {} {} my best.", answers: ["told", "me", "to", "do"],
    ja: "母は私に最善を尽くすように言った。", src: "解説",
    note: "〈tell＋人＋to do〉で「人に～するように言う」。tell の過去形は told（不規則変化）。\ndo one's best で「最善を尽くす」。say は〈say＋人＋to do〉の形をとらないので、ここでは使えません。" },
  { no: 7, form: "tell＋人＋not to do", meaning: "人に～しないように言う",
    template: "I {} {} {} {} {} late again.", answers: ["told", "him", "not", "to", "be"],
    ja: "私は彼に再び遅刻しないように言った。", src: "解説",
    note: "「～しないように」は not を to の直前に置き、〈tell＋人＋not to do〉にします。to not ではなく not to の順。\nbe late で「遅れる・遅刻する」。to のあとは原形なので be を入れます。" },
  { no: 8, form: "tell＋人＋to do", meaning: "人に～するように言う",
    template: "The teacher {} {} {} {} down.", answers: ["told", "everyone", "to", "calm"],
    ja: "先生はみんなに落ち着くように言った。", src: "Ex.1⑴",
    note: "〈tell＋人＋to do〉。「みんなに」は everyone で、これが「人（O）」にあたります。\ncalm down で「落ち着く」。to のあとなので calm は原形のまま。" },
  { no: 9, form: "be told＋to do（受動態）", meaning: "～するように言われる",
    template: "The boy {} {} {} {} the dishes every day for a month.", answers: ["was", "told", "to", "wash"],
    ja: "その男の子は、1か月の間毎日、皿洗いをするように言われた。", src: "Ex.3⑶",
    note: "tell＋人＋to do の「人」を主語にした受動態が〈be told＋to do〉「～するように言われる」。過去の文で主語が The boy（単数）なので was told。\nwash the dishes で「皿を洗う」。" },
  { no: 10, form: "ask＋人＋to do", meaning: "人に～するように頼む",
    template: "I {} {} {} {} with me.", answers: ["asked", "Emi", "to", "come"],
    ja: "私はエミに一緒に来てくれるように頼んだ。", src: "解説",
    note: "〈ask＋人＋to do〉で「人に～するように頼む」。来るのは Emi です。\nask には「たずねる」の意味もありますが、〈ask＋人＋to do〉の形では「頼む」の意味になります。" },
  { no: 11, form: "ask＋人＋not to do", meaning: "人に～しないように頼む",
    template: "I {} {} {} {} {} so much noise.", answers: ["asked", "them", "not", "to", "make"],
    ja: "私は彼らにあまり騒がないように頼んだ。", src: "解説",
    note: "〈ask＋人＋not to do〉で「人に～しないように頼む」。「彼らに」は目的格 them。\nmake noise で「騒ぐ・音を立てる」。make を do にしないように注意。" },
  { no: 12, form: "ask＋人＋not to do", meaning: "人に～しないように頼む",
    template: "I {} {} {} {} {} the door.", answers: ["asked", "him", "not", "to", "open"],
    ja: "私は彼に、そのドアを開けないように頼んだ。", src: "Ex.1⑶",
    note: "〈ask＋人＋not to do〉。not は to の直前に置きます。\ndidn't ask him to open とすると「開けるように頼まなかった」という別の意味になります。" },
  { no: 13, form: "advise＋人＋to do", meaning: "人に～するように助言する",
    template: "He {} {} {} {} a rest.", answers: ["advised", "me", "to", "take"],
    ja: "彼は私に休むように助言した。", src: "解説",
    note: "〈advise＋人＋to do〉で「人に～するように忠告する・助言する」。動詞は advise（つづりは s）、名詞の「助言」は advice（つづりは c）です。\ntake a rest で「休む・休憩する」。" },
  { no: 14, form: "advise＋人＋not to do", meaning: "人に～しないように助言する",
    template: "The doctor {} {} {} {} {} too much.", answers: ["advised", "him", "not", "to", "eat"],
    ja: "医者は彼に、食べ過ぎないようにアドバイスした。", src: "Ex.3⑵",
    note: "〈advise＋人＋not to do〉で「人に～しないように助言する」。not は to の直前。\neat too much で「食べ過ぎる」。advise の過去形は advised（-d をつけるだけ）。" },
  { no: 15, form: "allow＋人＋to do", meaning: "人に～することを許す",
    template: "The teacher {} {} {} {} school early.", answers: ["allowed", "John", "to", "leave"],
    ja: "先生はジョンに学校を早退することを許した。", src: "解説",
    note: "〈allow＋人＋to do〉で「人に～することを許す」。早退するのは John です。\nleave school early で「学校を早退する」。allow の発音は［アラウ］。" },
  { no: 16, form: "be allowed＋to do（受動態）", meaning: "～することを許される",
    template: "John {} {} {} {} school early.", answers: ["was", "allowed", "to", "leave"],
    ja: "ジョンは学校を早退することを許された。", src: "例文❷",
    note: "allow＋人＋to do の「人」を主語にした受動態が〈be allowed＋to do〉「～することを許される」。過去の文で主語が John なので was allowed。\n15番の文（The teacher allowed John to ～）と同じ内容を、ジョンを主語にして言いかえた文です。" },
  { no: 17, form: "be not allowed＋to do", meaning: "～することは許されていない",
    template: "You are {} {} {} {} ball in this park.", answers: ["not", "allowed", "to", "play"],
    ja: "この公園でボール遊びすることは許されていない。", src: "Ex.2⑴",
    note: "受動態の否定は be動詞のあとに not を置き、〈be not allowed＋to do〉「～することは許されていない」にします。\nplay ball で「ボール遊びをする」。掲示などでよく見る「禁止」の表現です。" },
  { no: 18, form: "allow＋人＋to do", meaning: "人に～することを許す",
    template: "Who {} {} {} {} in? Get out!", answers: ["allowed", "you", "to", "come"],
    ja: "だれが入っていいと許可したんだ？ 出ていけ！", src: "Ex.3⑸",
    note: "Who が主語の疑問文なので、そのあとにすぐ動詞（allowed）を続けます。did は使いません。\ncome in で「入る」。直訳は「だれがあなたに入ることを許したのか」。" },
  { no: 19, form: "permit＋人＋to do", meaning: "人に～することを許す",
    template: "Please {} {} {} {} this to you.", answers: ["permit", "me", "to", "explain"],
    ja: "このことをあなたに説明させてください。", src: "解説",
    note: "〈permit＋人＋to do〉は allow とほぼ同じ意味の、かたい言い方。Please で始まる命令文なので permit は原形。\n直訳は「私があなたにこれを説明することを許してください」。explain A to B で「A を B に説明する」。" },
  { no: 20, form: "be permitted＋to do（受動態）", meaning: "～することを許可されている",
    template: "Visitors are {} {} {} {} photos here.", answers: ["not", "permitted", "to", "take"],
    ja: "見学者はここで写真を撮ることは許可されていない。", src: "解説",
    note: "〈be permitted＋to do〉の否定で「～することは許可されていない」。not は be動詞（are）のあと。\npermit の過去分詞は t を重ねて permitted。take photos で「写真を撮る」。" },
  { no: 21, form: "be permitted＋to do（受動態）", meaning: "～することを許可されている",
    template: "No one {} {} {} {} during the examination.", answers: ["is", "permitted", "to", "speak"],
    ja: "試験中にしゃべることはだれも許されていない。", src: "Ex.2⑵",
    note: "No one は単数あつかいなので be動詞は is。No one 自体に「だれも～ない」の意味があるので、not は入れません。\nduring the examination で「試験中に」。" },
  { no: 22, form: "enable＋人＋to do", meaning: "人が～することを可能にする",
    template: "The internet {} {} {} {} instantly.", answers: ["enables", "people", "to", "communicate"],
    ja: "インターネットは、人々が瞬時にコミュニケーションを取ることを可能にする。", src: "解説",
    note: "〈enable＋人＋to do〉で「人が～することを可能にする」。主語には「物・事」がくることが多い表現です。\n現在の一般的な事実で、主語 The internet は3人称単数なので enables と -s をつけます。" },
  { no: 23, form: "enable＋人＋to do", meaning: "人が～することを可能にする",
    template: "Hard work {} {} {} {} her dream university.", answers: ["enabled", "her", "to", "enter"],
    ja: "一生懸命努力したおかげで、彼女は夢の大学に入学することができた。", src: "Ex.2⑶",
    note: "直訳は「一生懸命な努力が、彼女が夢の大学に入ることを可能にした」。物・事が主語の文は「～のおかげで…できた」と訳すと自然です。\nenter は「～に入る」で、すぐあとに場所を続けます（enter into とはしません）。" },
  { no: 24, form: "get＋人＋to do", meaning: "人に～してもらう",
    template: "I {} {} {} {} {} sandwiches.", answers: ["got", "my", "mother", "to", "make"],
    ja: "私は母にサンドイッチを作ってもらった。", src: "解説",
    note: "〈get＋人＋to do〉で「（頼んだりして）人に～してもらう・させる」。get の過去形は got。\n「人」の部分が my mother の2語になっていることに注意。make（原形）の前には to が必要です。" },
  { no: 25, form: "get＋人＋to do", meaning: "人に～してもらう",
    template: "I {} {} {} {} my English essay.", answers: ["got", "Tom", "to", "check"],
    ja: "トムに私の英作文を確認してもらった。", src: "Ex.2⑷",
    note: "〈get＋人＋to do〉。同じ「～してもらう」でも、make / have / let（使役動詞）は to を使わず原形を続けますが、get は to が必要です。\ncheck で「確認する・点検する」。" }
];

// =====================================================================
// ここから下はロジック（ふつうは変更しない）
// =====================================================================

const app = document.getElementById("app");
const SID_KEY = "l12_student_id";
let state = null;

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function toHalf(s) {
  return String(s)
    .replace(/[！-～]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
    .replace(/　/g, " ");
}

function norm(s) {
  return toHalf(s).replace(/[‘’`]/g, "'").replace(/[.,!?]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
}

function shuffle(a) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function loadSid() { try { return localStorage.getItem(SID_KEY) || ""; } catch (e) { return ""; } }
function saveSid(v) { try { localStorage.setItem(SID_KEY, v); } catch (e) {} }

function send(data) {
  if (!LOG_URL) return;
  try {
    fetch(LOG_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(data) }).catch(() => {});
  } catch (e) {}
}

function fullSentence(q, mark) {
  let i = 0;
  return esc(q.template).replace(/\{\}/g, () => {
    const w = esc(q.answers[i++]);
    return mark ? "<b>" + w + "</b>" : w;
  });
}

// ---------- 最初の画面 ----------
function renderStart(msg) {
  const total = QUESTIONS.length;
  const counts = COUNT_OPTIONS.filter(n => n < total);
  let h = "<h1>" + esc(APP_TITLE) + "</h1>";
  h += '<div class="box">' + POINT.map(esc).join("<br>") + "</div>";
  h += '<label for="sid">学籍番号（数字4桁）</label>';
  h += '<input type="text" class="sid" id="sid" inputmode="numeric" maxlength="4" autocomplete="off" value="' + esc(loadSid()) + '">';
  h += '<label>問題数</label><div class="counts">';
  counts.forEach(n => { h += '<button data-n="' + n + '">' + n + "問</button>"; });
  h += '<button data-n="' + total + '">全問（' + total + "問）</button></div>";
  if (msg) h += '<p class="error">' + esc(msg) + "</p>";
  app.innerHTML = h;
  app.querySelectorAll("button[data-n]").forEach(b => {
    b.onclick = () => {
      const sid = toHalf(document.getElementById("sid").value).trim();
      if (!/^\d{4}$/.test(sid)) { renderStart("学籍番号を数字4桁で入力してください。"); return; }
      saveSid(sid);
      const n = Number(b.dataset.n);
      const label = n >= total ? "全問" + total + "問" : n + "問";
      startQuiz(sid, shuffle(QUESTIONS).slice(0, n), label);
    };
  });
}

function startQuiz(sid, list, countLabel) {
  state = {
    sid: sid,
    list: list,
    countLabel: countLabel,
    pos: 0,
    rec: list.map(q => ({ inputs: q.answers.map(() => ""), status: null }))
  };
  send({ type: "session", student: sid, lesson: LESSON_NAME, count: countLabel });
  renderQuestion();
}

// ---------- 問題画面 ----------
function renderQuestion() {
  const q = state.list[state.pos];
  const r = state.rec[state.pos];
  const done = r.status !== null;
  let bi = 0;
  const sent = esc(q.template).replace(/\{\}/g, () => {
    const i = bi++;
    let cls = "blank";
    let fix = "";
    if (done) {
      const ok = norm(r.inputs[i]) === norm(q.answers[i]);
      cls += ok ? " ok" : " ng";
      if (!ok) fix = '<span class="fix">' + esc(q.answers[i]) + "</span>";
    }
    return '<input type="text" class="' + cls + '" data-i="' + i + '" value="' + esc(r.inputs[i]) + '"' +
      (done ? " disabled" : "") + ' autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">' + fix;
  });

  let h = '<div class="head"><span>' + (state.pos + 1) + " / " + state.list.length + "</span>";
  h += "<span>No." + q.no + "　出典：" + esc(q.src) + "</span></div>";
  h += '<p class="small">' + esc(INSTRUCTION) + "</p>";
  h += '<p class="form">' + esc(q.form) + '</p><p class="meaning">' + esc(q.meaning) + "</p>";
  h += '<p class="ja">' + esc(q.ja) + "</p>";
  h += '<p class="sentence">' + sent + "</p>";
  h += '<div class="buttons">';
  h += '<button id="back"' + (state.pos === 0 ? " disabled" : "") + ">もどる</button>";
  if (!done) {
    h += '<button id="skip">とばす</button>';
    h += '<button id="check" class="primary">答え合わせ</button>';
  } else {
    h += '<button id="next" class="primary">' + (state.pos === state.list.length - 1 ? "結果を見る" : "次へ") + "</button>";
  }
  h += "</div>";
  if (done) {
    const v = { ok: ["ok", "正解！"], ng: ["ng", "不正解"], skip: ["ng", "とばした問題"] }[r.status];
    h += '<div class="feedback"><p class="verdict ' + v[0] + '">' + v[1] + "</p>";
    h += '<p class="answer">' + fullSentence(q, true) + "</p>";
    h += "<p>" + esc(q.ja) + "</p>";
    h += '<p class="note">' + esc(q.note) + "</p></div>";
  }
  app.innerHTML = h;

  const inputs = Array.from(app.querySelectorAll("input.blank"));
  inputs.forEach((inp, k) => {
    inp.oninput = () => { r.inputs[k] = inp.value; };
    inp.onkeydown = e => {
      if (e.key !== "Enter" || e.isComposing) return;
      e.preventDefault();
      if (k < inputs.length - 1) inputs[k + 1].focus(); else check();
    };
  });
  document.getElementById("back").onclick = () => { if (state.pos > 0) { state.pos--; renderQuestion(); } };
  if (!done) {
    document.getElementById("skip").onclick = () => finish("skip");
    document.getElementById("check").onclick = check;
    if (inputs[0] && window.matchMedia && window.matchMedia("(hover: hover)").matches) inputs[0].focus();
  } else {
    const nx = document.getElementById("next");
    nx.onclick = next;
    nx.focus();
  }
}

function check() {
  const q = state.list[state.pos];
  const r = state.rec[state.pos];
  const ok = q.answers.every((a, i) => norm(r.inputs[i]) === norm(a));
  finish(ok ? "ok" : "ng");
}

function finish(status) {
  const q = state.list[state.pos];
  const r = state.rec[state.pos];
  r.status = status;
  send({
    student: state.sid,
    lesson: LESSON_NAME,
    question: "No." + q.no + "（" + q.src + "）",
    result: { ok: "正解", ng: "不正解", skip: "とばした" }[status],
    choice: status === "skip" ? "" : r.inputs.map(s => toHalf(s).trim() || "（空欄）").join(" / "),
    count: state.countLabel
  });
  renderQuestion();
}

function next() {
  if (state.pos < state.list.length - 1) { state.pos++; renderQuestion(); }
  else renderResult();
}

// ---------- 結果画面 ----------
function renderResult() {
  const n = state.list.length;
  const ok = state.rec.filter(r => r.status === "ok").length;
  const skip = state.rec.filter(r => r.status === "skip").length;
  const miss = state.list.filter((q, i) => state.rec[i].status !== "ok");
  let h = "<h1>結果</h1>";
  h += "<p>正答数：" + ok + " / " + n + "</p>";
  h += "<p>とばした数：" + skip + "</p>";
  if (miss.length) {
    h += '<p class="small">間違えた・とばした問題</p><ul class="review">';
    miss.forEach(q => { h += "<li>No." + q.no + "　" + fullSentence(q, true) + "</li>"; });
    h += "</ul>";
  }
  h += '<div class="buttons">';
  if (miss.length) h += '<button id="review" class="primary">間違えた・とばした問題で復習</button>';
  h += '<button id="home">最初の画面にもどる</button></div>';
  app.innerHTML = h;
  if (miss.length) document.getElementById("review").onclick = () => startQuiz(state.sid, shuffle(miss), "復習" + miss.length + "問");
  document.getElementById("home").onclick = () => renderStart();
  window.scrollTo(0, 0);
}

renderStart();
