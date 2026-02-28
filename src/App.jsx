import { useState } from "react";

const C = {
  navy: "#1a2744",
  navyLight: "#eef1f8",
  gold: "#c8922a",
  bg: "#f7f8fc",
  white: "#ffffff",
  border: "#e2e6f0",
  text: "#1a2744",
  muted: "#7a869a",
  success: "#1e8a5e",
  successBg: "#eaf6f1",
  warning: "#b45309",
  warningBg: "#fef3e2",
  danger: "#c0392b",
};

const MOCK_CONFIG = {
  phase: "post",
  fixedUrls: {
    ndaForm: "https://forms.google.com/nda",
    practicePointForm: "https://forms.google.com/point",
    surveyForm: "https://forms.google.com/survey",
    orientationPdf: "https://drive.google.com/orientation",
    hearingSheet: "#",
    reportFormat: "#",
    aiSlide: "#",
    proposalBot: "#",
    minutesBox: "#",
  },
  rooms: {
    tokyo: { label: "東京会場", password: "tokyo-2026", submissionUrl: "#", masterSheetUrl: "#" },
    local: { label: "地方会場", locationName: "大阪", password: "local-2026", submissionUrl: "#", masterSheetUrl: "#" },
    online: { label: "オンライン", password: "online-2026", submissionUrl: "#", masterSheetUrl: "#" },
  },
};

const VIDEOS = [
  {
    id: "v1", title: "実務従事マインドセット", instructor: "伊勢田",
    chapters: [
      { title: "試験で高得点≒実務で高成果", url: "https://youtu.be/TwQogFMcQpA" },
      { title: "支援先以上の専門家になれるか", url: "https://youtu.be/hGfgO79MJ5I" },
      { title: "良質な提案に繋がるヒアリングができるか", url: "https://youtu.be/Jl46TIqQWto" },
      { title: "「今日から何する」が具体的にわかる提案か", url: "https://youtu.be/JbctnbdxQD8" },
    ],
    materialUrl: null,
  },
  {
    id: "v2", title: "課題解決型ヒアリング", instructor: "吉野",
    chapters: [
      { title: "課題解決できないヒアリング6選", url: "https://youtu.be/apV9uoMr7f4" },
      { title: "不適切な3大思考", url: "https://youtu.be/knpnB593Ygc" },
      { title: "課題解決思考の手順", url: "https://youtu.be/aTz1AmKfSAo" },
      { title: "ヒアリング７つのルール", url: "https://youtu.be/mfWIq1ogxJE" },
    ],
    materialUrl: "https://drive.google.com/file/d/1sPoKlmlE8GFozcaIWS6fuPu-DShiicWh/view?usp=sharing",
  },
  {
    id: "v3", title: "経営支援レポート作成のポイント", instructor: "吉野",
    chapters: [
      { title: "経営支援レポートの役割", url: "https://youtu.be/FCOgbRNM39A" },
      { title: "良くないレポート・良いレポート", url: "https://youtu.be/W8icSYv1en4" },
      { title: "レポートの構成・作成手順", url: "https://youtu.be/W8icSYv1en4" },
      { title: "プレゼンテーション", url: "https://youtu.be/2Izao3ACazw" },
    ],
    materialUrl: "https://drive.google.com/file/d/1Z603kc9P_DjwabgteCzqHobjQNgKY2Pe/view?usp=sharing",
  },
  {
    id: "v4", title: "AI活用の方法とポイント", instructor: "吉野",
    chapters: [
      { title: "AI活用における重要ポイント", url: "https://youtu.be/oKNAqVOjNQs?si=5NDt7pQtwKO-WmzE" },
      { title: "AIリサーチの活用方法", url: "https://youtu.be/crm32lN_0I8" },
      { title: "AI議事録の利用方法", url: "https://youtu.be/ZxzKnmYKNgc" },
      { title: "AIとの壁打ち方法", url: "https://youtu.be/tribSCvL_UI" },
      { title: "AIスライドの活用方法", url: "https://youtu.be/pF6swstIc8Y" },
    ],
    materialUrl: null,
  },
];

const RESOURCES = [
  { label: "ヒアリングシート", desc: "経営課題ヒアリング実践マニュアル", key: "hearingSheet", download: true },
  { label: "レポートフォーマット", desc: "経営支援レポート作成テンプレート", key: "reportFormat", download: true },
  { label: "AIスライド生成", desc: "デザインプロンプト", key: "aiSlide", download: false },
];

const SCHEDULE = [
  { time: "10:00～10:30", title: "集合・オリエンテーション", hybrid: true },
  { time: "10:30～12:00", title: "自己紹介・説明・グループミーティング" },
  { time: "12:00～13:00", title: "ランチ・休憩" },
  { time: "13:00～15:00", title: "事業者ヒアリング" },
  { time: "15:00～17:00", title: "フィードバック＋グループミーティング" },
];

// ============================================================
// ロゴ
// ============================================================
var LOGO_SRC = "data:image/png;base64,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";
function LogoSvg({ height }) {
  var h = height || 36;
  return <img src={LOGO_SRC} alt="SMRI" style={{ height: h, display: "block" }} />;
}

// ============================================================
// 共通UI
// ============================================================
function Btn({ href, onClick, children, variant, small }) {
  variant = variant || "outline";
  const base = {
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: small ? "6px 12px" : "9px 18px",
    borderRadius: 7, fontSize: small ? 12 : 13, fontWeight: 600,
    textDecoration: "none", cursor: "pointer", border: "none",
    fontFamily: "sans-serif",
  };
  const vs = {
    primary: { background: C.navy, color: C.white },
    white:   { background: C.white, color: C.navy, border: "1px solid " + C.border },
    outline: { background: C.white, color: C.navy, border: "1px solid " + C.border },
    gold:    { background: C.gold, color: C.white },
  };
  const style = Object.assign({}, base, vs[variant]);
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={style}>{children}</a>;
  return <button onClick={onClick} style={style}>{children}</button>;
}

function Arrow() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7M7 1h4m0 0v4m0-4L5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke={C.muted} strokeWidth="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={C.muted} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>
      <path d="M6 9l6 6 6-6" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Toggle({ title, badge, defaultOpen, locked, children, accentLeft }) {
  const [open, setOpen] = useState(defaultOpen || false);
  return (
    <div style={{ background: C.white, borderRadius: 12, border: "1px solid " + C.border, marginBottom: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(26,39,68,0.05)" }}>
      <button
        onClick={function() { if (!locked) setOpen(function(o) { return !o; }); }}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 10,
          padding: "14px 18px", background: "none", border: "none",
          cursor: locked ? "default" : "pointer", textAlign: "left",
          fontFamily: "sans-serif",
          borderLeft: accentLeft ? "4px solid " + C.navy : "4px solid transparent",
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 700, color: locked ? C.muted : C.text, flex: 1 }}>{title}</span>
        {badge && (
          <span style={{ fontSize: 11, fontWeight: 700, background: C.navyLight, color: C.navy, padding: "2px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>{badge}</span>
        )}
        {locked
          ? <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: C.muted }}><LockIcon />初日以降に解放</span>
          : <ChevronIcon open={open} />
        }
      </button>
      {open && !locked && (
        <div style={{ padding: "0 18px 18px", borderTop: "1px solid " + C.border }}>
          <div style={{ paddingTop: 14 }}>{children}</div>
        </div>
      )}
    </div>
  );
}

function Row({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", border: "1px solid " + C.border, borderRadius: 9, gap: 10, marginBottom: 8 }}>
      {children}
    </div>
  );
}

// ============================================================
// ログイン画面
// ============================================================
function LoginScreen({ onLogin, onBack }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  var localName = MOCK_CONFIG.rooms.local.locationName;
  var rooms = [
    { key: "tokyo", label: "東京会場" },
    { key: "local", label: localName ? localName + "開催" : "地方開催" },
    { key: "online", label: "オンライン" },
  ];

  function handleLogin() {
    if (pw === MOCK_CONFIG.rooms[selectedRoom].password) {
      onLogin(selectedRoom);
    } else {
      setError("パスワードが正しくありません");
      setPw("");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ background: C.white, borderRadius: "16px 16px 0 0", padding: "28px 32px 20px", border: "1px solid " + C.border, borderBottom: "none" }}>
          <LogoSvg height={38} />
          <div style={{ height: 3, background: C.navy, borderRadius: 2, margin: "16px 0 16px" }} />
          <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>受講生専用ポータル</p>
        </div>
        <div style={{ background: C.white, borderRadius: "0 0 16px 16px", padding: "20px 32px 32px", border: "1px solid " + C.border, borderTop: "none", boxShadow: "0 4px 24px rgba(26,39,68,0.10)" }}>
          {!selectedRoom ? (
            <div>
              <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 12, marginBottom: 12, padding: 0, display: "flex", alignItems: "center", gap: 4, fontFamily: "sans-serif" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                トップに戻る
              </button>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 12 }}>参加する会場を選択してください</p>
              {rooms.map(function(r) {
                return (
                  <button
                    key={r.key}
                    onClick={function() { setSelectedRoom(r.key); }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "13px 16px", borderRadius: 9, border: "1.5px solid " + C.border, background: C.white, cursor: "pointer", fontFamily: "sans-serif", marginBottom: 8 }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{r.label}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                );
              })}
            </div>
          ) : (
            <div>
              <button onClick={function() { setSelectedRoom(null); setPw(""); setError(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 13, marginBottom: 16, padding: 0, display: "flex", alignItems: "center", gap: 4, fontFamily: "sans-serif" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                会場選択に戻る
              </button>
              <p style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 16 }}>
                {rooms.filter(function(r) { return r.key === selectedRoom; })[0].label}
              </p>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>パスワード</label>
              <input
                type="password"
                value={pw}
                onChange={function(e) { setPw(e.target.value); }}
                onKeyDown={function(e) { if (e.key === "Enter") handleLogin(); }}
                placeholder="パスワードを入力"
                autoFocus
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid " + (error ? C.danger : C.border), borderRadius: 8, fontSize: 14, marginBottom: 8, fontFamily: "sans-serif", boxSizing: "border-box" }}
              />
              {error && <p style={{ fontSize: 12, color: C.danger, marginBottom: 8 }}>{error}</p>}
              <button onClick={handleLogin} style={{ width: "100%", padding: "11px", background: C.navy, color: C.white, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 4, fontFamily: "sans-serif" }}>
                入室する
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 動画カード
// ============================================================
function VideoCard({ video, watched, onToggle, config }) {
  var allDone = video.chapters.every(function(_, i) { return watched.indexOf(video.id + "_" + i) >= 0; });
  var doneCount = video.chapters.filter(function(_, i) { return watched.indexOf(video.id + "_" + i) >= 0; }).length;

  return (
    <div style={{ border: "1px solid " + (allDone ? "#a8ddc0" : C.border), borderRadius: 10, overflow: "hidden", background: allDone ? "#f4fbf7" : C.white, marginBottom: 10 }}>
      <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid " + (allDone ? "#c8ecd8" : C.border) }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 700, margin: 0, color: C.text }}>{video.title}</p>
          <p style={{ fontSize: 12, color: C.muted, margin: "2px 0 0" }}>講師：{video.instructor}　{doneCount}/{video.chapters.length} 完了</p>
        </div>
        {allDone && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill={C.success}/><path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )}
      </div>
      <div style={{ padding: "8px 14px 12px" }}>
        {video.chapters.map(function(ch, i) {
          var key = video.id + "_" + i;
          var done = watched.indexOf(key) >= 0;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: i < video.chapters.length - 1 ? "1px solid " + C.border : "none" }}>
              <span style={{ fontSize: 12, color: C.gold, fontWeight: 700, minWidth: 18, textAlign: "right" }}>{i + 1}</span>
              <a
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 13, color: done ? C.muted : C.navy, flex: 1, textDecoration: "none", borderBottom: "1px solid " + (done ? "transparent" : C.navy), paddingBottom: 1, opacity: done ? 0.6 : 1 }}
              >
                {ch.title}
              </a>
              <button
                onClick={function() { onToggle(key); }}
                style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "sans-serif", background: done ? C.successBg : C.navyLight, color: done ? C.success : C.navy, whiteSpace: "nowrap" }}
              >
                {done ? "✓ 視聴済" : "視聴済にする"}
              </button>
            </div>
          );
        })}
        {video.materialUrl && (
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid " + C.border }}>
            <Btn href={video.materialUrl} variant="outline" small>動画の資料 <Arrow /></Btn>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// メインポータル
// ============================================================
function Portal({ roomKey, onLogout }) {
  var [config, setConfig] = useState(MOCK_CONFIG);
  var [configLoaded, setConfigLoaded] = useState(false);

  // 起動時にサーバーから設定を読み込む
  useState(() => {
    fetch("/api/config")
      .then(r => r.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setConfig(prev => ({
            ...prev,
            ...data,
            rooms: { ...prev.rooms, ...(data.rooms || {}) },
            fixedUrls: { ...prev.fixedUrls, ...(data.fixedUrls || {}) },
          }));
        }
        setConfigLoaded(true);
      })
      .catch(() => setConfigLoaded(true));
  }, []);

  var room = config.rooms[roomKey] || MOCK_CONFIG.rooms[roomKey];
  var isPost = config.phase === "post";
  var localName = room.locationName;
  var roomLabel = roomKey === "local" ? (localName ? localName + "開催" : "地方開催") : room.label;

  var [watched, setWatched] = useState([]);
  var [formDone, setFormDone] = useState({ nda: false, point: false });
  function toggleWatch(key) {
    setWatched(function(prev) {
      return prev.indexOf(key) >= 0 ? prev.filter(function(v) { return v !== key; }) : prev.concat([key]);
    });
  }

  var totalChapters = VIDEOS.reduce(function(s, v) { return s + v.chapters.length; }, 0);
  var progress = Math.round((watched.length / totalChapters) * 100);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "sans-serif", color: C.text }}>

      {/* ヘッダー */}
      <div style={{ background: C.white, borderBottom: "3px solid " + C.navy, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(26,39,68,0.08)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <LogoSvg height={30} />
            <div style={{ borderLeft: "1px solid " + C.border, paddingLeft: 16 }}>
              <p style={{ fontSize: 11, color: C.muted, margin: 0, lineHeight: 1 }}>実務従事プログラム</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: C.navy, margin: "3px 0 0", lineHeight: 1 }}>経営支援実務研修</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12, color: C.navy, background: C.navyLight, padding: "4px 12px", borderRadius: 20, fontWeight: 600 }}>{roomLabel}</span>
            <button onClick={onLogout} style={{ background: "none", border: "1px solid " + C.border, color: C.muted, borderRadius: 6, padding: "5px 12px", fontSize: 12, cursor: "pointer", fontFamily: "sans-serif" }}>退室</button>
          </div>
        </div>
      </div>

      {/* 本体 */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 80px" }}>

        {/* フェーズバナー */}
        <div style={{ background: isPost ? C.navy : C.warningBg, borderRadius: 10, padding: "12px 20px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: isPost ? C.white : C.warning }}>
            {isPost ? "初日以降フェーズ — 全コンテンツが利用可能です" : "事前学習期間 — 初日までにeラーニングを完了してください"}
          </span>
          {!isPost && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 100, height: 6, background: "rgba(180,83,9,0.2)", borderRadius: 99 }}>
                <div style={{ width: progress + "%", height: "100%", background: C.warning, borderRadius: 99 }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.warning }}>{progress}%</span>
            </div>
          )}
        </div>

        {/* 2カラム */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, alignItems: "start" }}>

          {/* 左カラム */}
          <div>
            <Toggle title="eラーニング" badge={watched.length + "/" + totalChapters + " 完了"} accentLeft>
              <div style={{ marginBottom: 12, padding: "10px 14px", background: C.bg, borderRadius: 8, fontSize: 12, color: C.muted, lineHeight: 1.8 }}>
                実務従事開始前にご視聴ください。視聴期間：2026年1月〜11月<br/>
                <span style={{ color: C.danger }}>動画および資料の無断転載・無断転用を禁じます。</span>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: C.muted }}>視聴進捗</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: progress === 100 ? C.success : C.navy }}>{progress}%</span>
                </div>
                <div style={{ background: C.border, borderRadius: 99, height: 6, overflow: "hidden" }}>
                  <div style={{ width: progress + "%", height: "100%", background: progress === 100 ? C.success : C.navy, borderRadius: 99, transition: "width 0.4s ease" }} />
                </div>
              </div>
              {VIDEOS.map(function(v) { return <VideoCard key={v.id} video={v} watched={watched} onToggle={toggleWatch} config={config} />; })}
            </Toggle>

            <Toggle title="各種資料" accentLeft>
              {RESOURCES.map(function(r) {
                return (
                  <Row key={r.label}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{r.label}</p>
                      <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{r.desc}</p>
                    </div>
                    <Btn href={config.fixedUrls[r.key] || "#"} variant="outline" small>{r.download ? "ダウンロード" : "開く"} <Arrow /></Btn>
                  </Row>
                );
              })}
            </Toggle>

            <Toggle title="初日スケジュール" accentLeft>
              {SCHEDULE.map(function(s, i) {
                return (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: i < SCHEDULE.length - 1 ? "1px solid " + C.border : "none" }}>
                    <span style={{ fontSize: 12, color: C.gold, fontWeight: 700, minWidth: 110, flexShrink: 0 }}>{s.time}</span>
                    <span style={{ fontSize: 13 }}>
                      {s.hybrid ? "【全国ハイブリッド】 " : ""}{s.title}
                    </span>
                  </div>
                );
              })}
              <p style={{ fontSize: 12, color: C.muted, marginTop: 10 }}>※スケジュールは前後する場合があります</p>
              <p style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>※集合場所はSlackでの案内をご確認ください。</p>
            </Toggle>

            <Toggle title="入力フォーム" badge={((formDone.nda ? 1 : 0) + (formDone.point ? 1 : 0)) + "/2 完了"} accentLeft>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", border: "1px solid " + (formDone.nda ? "#a8ddc0" : C.border), borderRadius: 9, gap: 10, marginBottom: 8, background: formDone.nda ? "#f4fbf7" : C.white }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>NDA登録フォーム</p>
                  <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>初日前に署名してください</p>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <Btn href={config.fixedUrls.ndaForm} variant="white" small>開く <Arrow /></Btn>
                  <button
                    onClick={function() { setFormDone(function(p) { return Object.assign({}, p, { nda: !p.nda }); }); }}
                    style={{ padding: "6px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "sans-serif", background: formDone.nda ? C.successBg : C.navyLight, color: formDone.nda ? C.success : C.navy, whiteSpace: "nowrap" }}
                  >
                    {formDone.nda ? "✓ 完了" : "完了にする"}
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", border: "1px solid " + (formDone.point ? "#a8ddc0" : C.border), borderRadius: 9, gap: 10, background: formDone.point ? "#f4fbf7" : C.white }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>実務ポイント発行フォーム</p>
                  <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>診断助言業務実績証明書の発行申請</p>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <Btn href={config.fixedUrls.practicePointForm} variant="white" small>開く <Arrow /></Btn>
                  <button
                    onClick={function() { setFormDone(function(p) { return Object.assign({}, p, { point: !p.point }); }); }}
                    style={{ padding: "6px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "sans-serif", background: formDone.point ? C.successBg : C.navyLight, color: formDone.point ? C.success : C.navy, whiteSpace: "nowrap" }}
                  >
                    {formDone.point ? "✓ 完了" : "完了にする"}
                  </button>
                </div>
              </div>
            </Toggle>
          </div>

          {/* 右カラム */}
          <div>
            <Toggle title="オリエンテーション・メンバーリスト" locked={!isPost} accentLeft={isPost}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", border: "1px solid " + C.border, borderRadius: 9, gap: 10, marginBottom: 8 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>経営支援実践研修</p>
                  <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>アーカイブ資料</p>
                </div>
                <Btn href={config.fixedUrls.orientationPdf} variant="white" small>ダウンロード <Arrow /></Btn>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", border: "1px solid " + C.border, borderRadius: 9, gap: 10 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>メンバーリスト</p>
                  <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>スプレッドシート</p>
                </div>
                <Btn href={room.masterSheetUrl} variant="white" small>開く <Arrow /></Btn>
              </div>
            </Toggle>

            <Toggle title="ヒアリングBOX" locked={!isPost} accentLeft={isPost}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", border: "1px solid " + C.border, borderRadius: 9, gap: 10, marginBottom: 8 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>ヒアリングリスト</p>
                  <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>スプレッドシート</p>
                </div>
                <Btn href={room.masterSheetUrl} variant="white" small>開く <Arrow /></Btn>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", border: "1px solid " + C.border, borderRadius: 9, gap: 10 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>事業者情報・議事録等</p>
                  <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>情報をみんなで共有しましょう</p>
                </div>
                <Btn href={room.masterSheetUrl} variant="white" small>開く <Arrow /></Btn>
              </div>
            </Toggle>

            <Toggle title="メンターレビュー" locked={!isPost} accentLeft={isPost}>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 12 }}>メンターとの1on1フィードバックのスケジュール表です。</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", border: "1px solid " + C.border, borderRadius: 9, gap: 10, marginBottom: 8 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>タイムテーブル</p>
                  <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>スプレッドシート</p>
                </div>
                <Btn href={room.masterSheetUrl} variant="white" small>開く <Arrow /></Btn>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", border: "1px solid " + C.border, borderRadius: 9, gap: 10, marginBottom: 8 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>初回レビュー時の提案骨子</p>
                  <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>ダウンロード資料</p>
                </div>
                <Btn href="#" variant="white" small>ダウンロード <Arrow /></Btn>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", border: "1px solid " + C.border, borderRadius: 9, gap: 10 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>提案たたき台</p>
                  <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>AIチャットボット（Dify）</p>
                </div>
                <Btn href={config.fixedUrls.proposalBot || "#"} variant="white" small>開く <Arrow /></Btn>
              </div>
            </Toggle>

            <Toggle title="最終レポート投函BOX" locked={!isPost} accentLeft={isPost}>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 12 }}>完成したレポート・スライドを提出してください。ファイル名に氏名を記入してください。（例）001_氏名_テーマ内容</p>
              <Btn href={room.submissionUrl} variant="primary">投函BOXを開く <Arrow /></Btn>
            </Toggle>

            <Toggle title="アンケート" locked={!isPost} accentLeft={isPost}>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 12 }}>プログラム終了後にご協力ねがいます。</p>
              <Btn href={config.fixedUrls.surveyForm} variant="white">アンケートに回答する <Arrow /></Btn>
            </Toggle>
          </div>

        </div>
      </div>
    </div>
  );
}

const ADMIN_PW = "admin-smri-2026";

const initialConfig = {
  phase: "pre",
  fixedUrls: {
    ndaForm: "",
    practicePointForm: "",
    surveyForm: "",
    orientationPdf: "",
    hearingSheet: "",
    reportFormat: "",
    aiSlide: "",
    proposalBot: "",
    minutesBox: "",
  },
  rooms: {
    tokyo: {
      label: "東京会場",
      password: "",
      submissionUrl: "",
      masterSheetUrl: "",
    },
    local: {
      label: "地方会場",
      locationName: "",
      password: "",
      submissionUrl: "",
      masterSheetUrl: "",
    },
    online: {
      label: "オンライン",
      password: "",
      submissionUrl: "",
      masterSheetUrl: "",
    },
  },
};

// ============================================================
// 共通パーツ
// ============================================================
function Label({ children }) {
  return <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block", letterSpacing: "0.04em" }}>{children}</label>;
}

function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: "100%", padding: "9px 12px", border: "1px solid " + C.border, borderRadius: 8, fontSize: 14, fontFamily: "sans-serif", color: C.text, boxSizing: "border-box" }}
    />
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background: C.white, borderRadius: 12, border: "1px solid " + C.border, marginBottom: 16, overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

function CardHeader({ icon, title }) {
  return (
    <div style={{ padding: "16px 20px", borderBottom: "1px solid " + C.border, display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{title}</span>
    </div>
  );
}

function SaveButton({ saved, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ background: saved ? C.success : C.navy, color: C.white, border: "none", borderRadius: 8, padding: "9px 24px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
    >
      {saved ? "✓ 保存しました" : "保存"}
    </button>
  );
}

function FieldRow({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>{children}</div>;
}

function Field({ label, children }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function PhaseCard({ phase, onToggle }) {
  const isPre = phase === "pre";
  return (
    <Card>
      <CardHeader title="コンテンツフェーズ" />
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 20, background: isPre ? C.warningBg : C.successBg, marginBottom: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: isPre ? C.warning : C.success, display: "inline-block" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: isPre ? C.warning : C.success }}>
                {isPre ? "事前期間" : "初日以降"}
              </span>
            </div>
            <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>
              {isPre ? "eラーニング・各種資料・フォーム類のみ表示中" : "全コンテンツ表示中（投函BOX等含む）"}
            </p>
          </div>
          <button
            onClick={onToggle}
            style={{ background: isPre ? C.navy : C.dangerBg, color: isPre ? C.white : C.danger, border: isPre ? "none" : "1px solid " + C.danger, borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
          >
            {isPre ? "→ 初日以降に切り替え" : "← 事前期間に戻す"}
          </button>
        </div>

        {/* フェーズ表 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, background: C.bg, borderRadius: 8, padding: 14 }}>
          {[
            {
              label: "事前期間（常時表示）",
              active: true,
              items: ["eラーニング（動画4本）", "各種資料", "初日スケジュール", "NDA登録フォーム", "実務ポイント発行フォーム"],
            },
            {
              label: "初日以降（追加解放）",
              active: !isPre,
              items: ["オリエンテーション・メンバーリスト", "ヒアリングBOX", "メンターレビュー", "最終レポート投函BOX", "アンケート"],
            },
          ].map(({ label, active, items }) => (
            <div key={label} style={{ background: active ? C.white : "transparent", borderRadius: 6, padding: "10px 12px", border: active ? "1px solid " + C.border : "1px dashed " + C.border, opacity: active ? 1 : 0.5 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 8, letterSpacing: "0.04em" }}>{label}</p>
              {items.map(i => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: active ? C.navy : C.muted, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: active ? C.text : C.muted }}>{i}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ============================================================
// 固定URLカード（NDA・実務ポイント・アンケート）
// ============================================================
function FixedUrlCard({ data, onSave }) {
  const [d, setD] = useState({ ...data });
  const [saved, setSaved] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const set = (key, val) => setD(prev => ({ ...prev, [key]: val }));

  function handleSave() {
    onSave(d);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function Section({ id, title, children }) {
    const open = openSection === id;
    return (
      <div style={{ borderBottom: "1px solid " + C.border }}>
        <button
          onClick={function() { setOpenSection(open ? null : id); }}
          style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", background: "none", border: "none", cursor: "pointer", fontFamily: "sans-serif" }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{title}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>
            <path d="M6 9l6 6 6-6" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {open && <div style={{ paddingBottom: 16 }}>{children}</div>}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader title="固定フォーム・リンク（全ルーム共通）" />
      <div style={{ padding: "0 20px 4px" }}>

        <Section id="forms" title="入力フォーム">
          <FieldRow>
            <Field label="NDA登録フォーム URL">
              <Input value={d.ndaForm} onChange={e => set("ndaForm", e.target.value)} placeholder="https://forms.google.com/..." />
            </Field>
            <Field label="実務ポイント発行フォーム URL">
              <Input value={d.practicePointForm} onChange={e => set("practicePointForm", e.target.value)} placeholder="https://forms.google.com/..." />
            </Field>
          </FieldRow>
          <FieldRow>
            <Field label="アンケートフォーム URL">
              <Input value={d.surveyForm} onChange={e => set("surveyForm", e.target.value)} placeholder="https://forms.google.com/..." />
            </Field>
            <Field label="オリエンテーション資料 URL（Drive）">
              <Input value={d.orientationPdf} onChange={e => set("orientationPdf", e.target.value)} placeholder="https://drive.google.com/..." />
            </Field>
          </FieldRow>
        </Section>

        <Section id="tools" title="資料・ツールリンク">
          <FieldRow>
            <Field label="ヒアリングシート URL">
              <Input value={d.hearingSheet || ""} onChange={e => set("hearingSheet", e.target.value)} placeholder="https://drive.google.com/..." />
            </Field>
            <Field label="レポートフォーマット URL">
              <Input value={d.reportFormat || ""} onChange={e => set("reportFormat", e.target.value)} placeholder="https://drive.google.com/..." />
            </Field>
          </FieldRow>
          <FieldRow>
            <Field label="AIスライド生成（Notion）URL">
              <Input value={d.aiSlide || ""} onChange={e => set("aiSlide", e.target.value)} placeholder="https://notion.so/..." />
            </Field>
            <Field label="提案たたき台（Dify）URL">
              <Input value={d.proposalBot || ""} onChange={e => set("proposalBot", e.target.value)} placeholder="https://..." />
            </Field>
          </FieldRow>
          <Field label="事業者情報・議事録等 URL（Drive）">
            <Input value={d.minutesBox || ""} onChange={e => set("minutesBox", e.target.value)} placeholder="https://drive.google.com/..." />
          </Field>
        </Section>

      </div>
      <div style={{ padding: "16px 20px", display: "flex", justifyContent: "flex-end" }}>
        <SaveButton saved={saved} onClick={handleSave} />
      </div>
    </Card>
  );
}


// ============================================================
function RoomCard({ roomKey, room, onSave }) {
  const [d, setD] = useState({ ...room });
  const [saved, setSaved] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const set = (key, val) => setD(prev => ({ ...prev, [key]: val }));

  function handleSave() {
    onSave(roomKey, d);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const icon = null;
  const isLocal = roomKey === "local";
  const cardTitle = isLocal ? (d.locationName ? d.locationName + "開催" : "地方開催") : room.label;

  return (
    <Card>
      <CardHeader title={cardTitle} />
      <div style={{ padding: 20 }}>

        {isLocal && (
          <div style={{ marginBottom: 16, maxWidth: 240 }}>
            <Label>開催地域名</Label>
            <Input value={d.locationName || ""} onChange={e => set("locationName", e.target.value)} placeholder="例：大阪、静岡" />
          </div>
        )}

        {/* パスワード */}
        <div style={{ marginBottom: 16 }}>
          <Label>ルームパスワード</Label>
          <div style={{ position: "relative", maxWidth: 320 }}>
            <input
              type={showPw ? "text" : "password"}
              value={d.password}
              onChange={e => set("password", e.target.value)}
              placeholder="パスワードを入力"
              style={{ width: "100%", padding: "9px 52px 9px 12px", border: "1px solid " + C.border, borderRadius: 8, fontSize: 14, fontFamily: "sans-serif", boxSizing: "border-box" }}
            />
            <button
              onClick={() => setShowPw(v => !v)}
              style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 12 }}
            >
              {showPw ? "隠す" : "表示"}
            </button>
          </div>
        </div>

        {/* 初日以降コンテンツURL */}
        <div style={{ background: C.bg, borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            初日以降に解放されるリンク
          </p>
          <Field label="マスタースプレッドシート URL">
            <Input value={d.masterSheetUrl || ""} onChange={e => set("masterSheetUrl", e.target.value)} placeholder="https://docs.google.com/spreadsheets/..." />
          </Field>
          <Field label="最終レポート投函BOX URL">
            <Input value={d.submissionUrl} onChange={e => set("submissionUrl", e.target.value)} placeholder="https://drive.google.com/..." />
          </Field>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <SaveButton saved={saved} onClick={handleSave} />
        </div>
      </div>
    </Card>
  );
}

// ============================================================
// トースト
// ============================================================
function Toast({ message, visible }) {
  return (
    <div style={{
      position: "fixed", bottom: 32, left: "50%",
      transform: "translateX(-50%) translateY(" + visible ? 0 : 80 + "px)",
      transition: "transform 0.3s ease",
      background: C.navy, color: C.white,
      padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600,
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)", zIndex: 9999,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ color: C.gold }}>✓</span> {message}
    </div>
  );
}

// ============================================================
// 管理パネル
// ============================================================

function AdminPanel({ onLogout }) {
  const [config, setConfig] = useState(initialConfig);
  const [toast, setToast] = useState({ visible: false, message: "" });

  function showToast(msg) {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: "" }), 2500);
  }

  function handlePhaseToggle() {
    const newPhase = config.phase === "pre" ? "post" : "pre";
    setConfig(c => ({ ...c, phase: newPhase }));
    showToast(newPhase === "post" ? "「初日以降」フェーズに切り替えました" : "「事前期間」フェーズに戻しました");
  }

  function handleFixedSave(data) {
    setConfig(c => ({ ...c, fixedUrls: data }));
    showToast("固定フォームのURLを保存しました");
  }

  function handleRoomSave(roomKey, data) {
    setConfig(c => ({ ...c, rooms: { ...c.rooms, [roomKey]: data } }));
    showToast(data.label + "の設定を保存しました");
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "sans-serif", color: C.text }}>
      {/* ヘッダー */}
      <div style={{ background: C.navy, padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: C.white }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill={C.gold} />
          </svg>
          <span style={{ fontSize: 15, fontWeight: 600 }}>実務従事プログラムサイト</span>
          <span style={{ background: C.gold, color: C.navy, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, letterSpacing: "0.04em" }}>管理画面</span>
        </div>
        <button onClick={onLogout} style={{ background: "none", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.7)", borderRadius: 6, padding: "6px 14px", fontSize: 12, cursor: "pointer" }}>
          ログアウト
        </button>
      </div>

      {/* コンテンツ */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 80px" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: C.navy }}>コントロールパネル</h1>
          <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>フェーズ切り替え・ルーム設定・URL管理</p>
        </div>

        {/* フェーズ */}
        <SectionLabel>フェーズ管理</SectionLabel>
        <PhaseCard phase={config.phase} onToggle={handlePhaseToggle} />

        {/* 固定URL */}
        <SectionLabel>🔗 固定フォーム設定</SectionLabel>
        <FixedUrlCard data={config.fixedUrls} onSave={handleFixedSave} />

        {/* ルーム */}
        <SectionLabel>🔑 ルーム設定（毎月更新）</SectionLabel>
        {Object.entries(config.rooms).map(([key, room]) => (
          <RoomCard key={key} roomKey={key} room={room} onSave={handleRoomSave} />
        ))}

        <div style={{ marginTop: 32, padding: "14px 16px", background: C.warningBg, borderRadius: 8, border: "1px solid rgba(180,83,9,0.2)", fontSize: 12, color: C.warning, lineHeight: 1.8 }}>
          ⚠️ <strong>本番環境について：</strong>保存内容はGitHubのJSONファイルに反映され、1〜2分後にVercelへ自動デプロイされます。受講生への案内はSlackで別途行ってください。
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}

function SectionLabel({ children }) {
  return <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12, marginTop: 28 }}>{children}</p>;
}

// ============================================================

// ============================================================
// ランディング画面（受講生 / 管理者 選択）
// ============================================================
function LandingScreen({ onStudent, onAdmin }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ background: C.white, borderRadius: 16, padding: "32px 32px 28px", border: "1px solid " + C.border, boxShadow: "0 4px 24px rgba(26,39,68,0.10)", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <LogoSvg height={40} />
          </div>
          <div style={{ height: 3, background: C.navy, borderRadius: 2, marginBottom: 20 }} />
          <h1 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: "0 0 6px" }}>実務従事プログラム</h1>
          <p style={{ fontSize: 13, color: C.muted, margin: "0 0 28px" }}>受講生専用ポータル</p>
          <button
            onClick={onStudent}
            style={{ display: "block", width: "100%", padding: "14px", background: C.navy, color: C.white, border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 10, fontFamily: "sans-serif" }}
          >
            受講生としてログイン
          </button>
          <div style={{ marginTop: 20 }}>
            <button
              onClick={onAdmin}
              style={{ background: "none", border: "none", color: C.border, fontSize: 11, cursor: "pointer", fontFamily: "sans-serif", textDecoration: "underline" }}
            >
              管理者ログイン
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 管理者ログイン画面
function AdminLoginScreen({ onLogin, onBack }) {
  var [pw, setPw] = useState("");
  var [error, setError] = useState("");
  function handleLogin() {
    if (pw === ADMIN_PW) {
      onLogin();
    } else {
      setError("パスワードが正しくありません");
      setPw("");
    }
  }
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ background: C.white, borderRadius: 16, padding: "32px", border: "1px solid " + C.border, boxShadow: "0 4px 24px rgba(26,39,68,0.10)" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 13, marginBottom: 20, padding: 0, display: "flex", alignItems: "center", gap: 4, fontFamily: "sans-serif" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            戻る
          </button>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <LogoSvg height={32} />
          </div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text, textAlign: "center", marginBottom: 20 }}>管理者ログイン</h2>
          <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>パスワード</label>
          <input
            type="password"
            value={pw}
            onChange={function(e) { setPw(e.target.value); }}
            onKeyDown={function(e) { if (e.key === "Enter") handleLogin(); }}
            placeholder="管理者パスワードを入力"
            autoFocus
            style={{ width: "100%", padding: "10px 12px", border: "1.5px solid " + (error ? C.danger : C.border), borderRadius: 8, fontSize: 14, marginBottom: 8, fontFamily: "sans-serif", boxSizing: "border-box" }}
          />
          {error && <p style={{ fontSize: 12, color: C.danger, marginBottom: 8 }}>{error}</p>}
          <button onClick={handleLogin} style={{ width: "100%", padding: "11px", background: C.navy, color: C.white, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 4, fontFamily: "sans-serif" }}>
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ルート（統合版）
// ============================================================
export default function App() {
  var [mode, setMode] = useState(null); // null | "student" | "admin"
  var [room, setRoom] = useState(null);

  // モード未選択 → ランディング画面
  if (!mode) {
    return <LandingScreen onStudent={() => setMode("student")} onAdmin={() => setMode("admin")} />;
  }
  // 管理者
  if (mode === "admin") {
    return <AdminRoot onBack={() => setMode(null)} />;
  }
  // 受講生
  if (!room) {
    return <LoginScreen onLogin={setRoom} onBack={() => setMode(null)} />;
  }
  return <Portal roomKey={room} onLogout={() => setRoom(null)} />;
}

function AdminRoot({ onBack }) {
  var [loggedIn, setLoggedIn] = useState(false);
  if (!loggedIn) return <AdminLoginScreen onLogin={() => setLoggedIn(true)} onBack={onBack} />;
  return <AdminPanel onLogout={() => setLoggedIn(false)} />;
}