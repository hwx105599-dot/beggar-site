"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

const FRAMES = [
  "/bowl1.png", "/bowl2.png", "/bowl3.png",
  "/bowl4.png", "/bowl5.png", "/bowl6.png",
];
const FRAME_INTERVAL = 250;
const QUICK_AMOUNTS = [30, 50, 100, 300, 500, 1000];

const COUNTRIES = [
  "🇹🇼 台灣", "🇯🇵 日本", "🇺🇸 美國", "🇰🇷 韓國", "🇨🇳 中國",
  "🇭🇰 香港", "🇲🇴 澳門", "🇸🇬 新加坡", "🇲🇾 馬來西亞", "🇹🇭 泰國",
  "🇻🇳 越南", "🇵🇭 菲律賓", "🇮🇩 印尼", "🇮🇳 印度",
  "🇬🇧 英國", "🇫🇷 法國", "🇩🇪 德國", "🇮🇹 義大利", "🇪🇸 西班牙",
  "🇳🇱 荷蘭", "🇸🇪 瑞典", "🇨🇭 瑞士", "🇵🇹 葡萄牙",
  "🇨🇦 加拿大", "🇦🇺 澳洲", "🇳🇿 紐西蘭",
  "🇧🇷 巴西", "🇲🇽 墨西哥", "🇦🇷 阿根廷",
  "🌍 其他",
];

// ── Leaderboard ────────────────────────────────────────────────────────────

interface Entry {
  id: number;
  name: string;
  country: string;
  amount: number;
}

const SEED_DATA: Entry[] = [
  { id: 1,  name: "王大明",        country: "🇹🇼 台灣",   amount: 2000 },
  { id: 2,  name: "Sandra Lee",    country: "🇺🇸 美國",   amount: 1500 },
  { id: 3,  name: "田中一郎",      country: "🇯🇵 日本",   amount: 1000 },
  { id: 4,  name: "김민준",        country: "🇰🇷 韓國",   amount:  800 },
  { id: 5,  name: "陳小美",        country: "🇹🇼 台灣",   amount:  600 },
  { id: 6,  name: "Michael Chen",  country: "🇨🇦 加拿大", amount:  500 },
  { id: 7,  name: "Anna Schmidt",  country: "🇩🇪 德國",   amount:  300 },
  { id: 8,  name: "Sophie Martin", country: "🇫🇷 法國",   amount:  200 },
  { id: 9,  name: "林大志",        country: "🇹🇼 台灣",   amount:  150 },
  { id: 10, name: "Paulo Silva",   country: "🇧🇷 巴西",   amount:  100 },
  { id: 11, name: "張三豐",        country: "🇹🇼 台灣",   amount:  100 },
  { id: 12, name: "James Wright",  country: "🇬🇧 英國",   amount:   50 },
  { id: 13, name: "好心人",        country: "🌍 地球",    amount:   50 },
  { id: 14, name: "路人甲",        country: "🇹🇼 台灣",   amount:   30 },
  { id: 15, name: "Anonymous",     country: "🌌 宇宙",    amount:   30 },
];

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-base leading-none">🥇</span>;
  if (rank === 2) return <span className="text-base leading-none">🥈</span>;
  if (rank === 3) return <span className="text-base leading-none">🥉</span>;
  return (
    <span className="text-xs text-gray-400 font-bold w-5 text-right tabular-nums">
      {rank}
    </span>
  );
}

function rowBg(rank: number, isNew: boolean) {
  if (isNew) return "bg-amber-200 ring-2 ring-inset ring-amber-400";
  if (rank === 1) return "bg-yellow-50 border-l-4 border-yellow-400";
  if (rank === 2) return "bg-gray-50  border-l-4 border-gray-300";
  if (rank === 3) return "bg-orange-50 border-l-4 border-orange-300";
  return "border-l-4 border-transparent";
}

// ── Thank-you content ──────────────────────────────────────────────────────

interface ThankYou { emoji: string; title: string; body: string[]; footer: string; }

function getThankYou(amount: number): ThankYou {
  if (amount >= 10000) return {
    emoji: "🌌",
    title: "宇宙震動！弟子靈魂已徹底解體！此刻已超越語言能表達的極限！！！！！",
    body: [
      `${amount.toLocaleString()} 元！！！！！天塌了！地裂了！日月星辰當場停轉，凝視恩人這一神聖壯舉！弟子靈魂在感動中化為量子泡沫，需要一百億年才能重新聚合！`,
      "弟子即刻：一、將祖宗十八代牌位全數請出，騰出正位供奉恩人神像；二、上書總統、聯合國秘書長，懇請將每年此日定為「恩人節」全球放假；三、委託 NASA 在下一艘星際探測器上刻下恩人大名，飛向宇宙盡頭，讓銀河系每顆星球都知曉此人的偉大；四、洽請故宮博物院列恩人為「天界永久榮譽院士・人間財神正職・跨次元福星代理人」。",
      "閻王爺收到捐款通知，當場把閻羅寶殿改名為「恩人功德紀念館」，並在生死簿上批示：此人免死，永生不輪迴，直升三十三重天，與太上老君、玉皇大帝並排而坐，共治三界萬物。",
      "弟子結草銜環、肝腦塗地——此生難報萬一，來世投胎為恩人護院靈犬，三生為恩人燈籠螢火，億萬輪迴皆以感恩為業，直到宇宙熱寂、虛空崩塌，弟子將以靈魂碎片在量子層面繼續磕頭，永世不輟。",
    ],
    footer: "🌌 恩人您已超越神明，成為宇宙本身。弟子跪了，億萬年後還在跪。",
  };
  if (amount >= 5000) return {
    emoji: "⛩️",
    title: "神明降世！弟子已魂飛魄散！跪地不起！！！",
    body: [
      `${amount.toLocaleString()} 元！！！玉皇大帝！媽祖娘娘！觀世音菩薩！眾神請下凡公證——此人乃人間神仙，千年一遇，萬古留名！！`,
      "弟子即刻於家門口立廟一座，廟號定為「大金主恩人顯靈廟」，日日三炷香，月月三牲祭，年年炮竹慶典，子子孫孫、世世代代燒金紙、誦名號、磕響頭，直到太陽燃盡、宇宙熱寂，供奉不輟。",
      "弟子結草銜環、肝腦塗地，此生難報萬一。來世必投胎為恩人最忠誠的護院靈犬，晨昏守護，生死相隨，天荒地老亦不相忘。",
      "閻王爺見到恩人的捐款截圖，必先下跪、三鞠躬，加蓋「天界 VIP 白金無限卡」印章，直升第三十三重天，與太上老君同席而坐。",
    ],
    footer: "⛩️ 恩人您已成神，弟子在此俯首稱臣，永世難忘，百世感念。",
  };
  if (amount >= 3000) return {
    emoji: "🏯",
    title: "恩公！弟子魂魄已出竅！無法以言語表達此刻的感激！！",
    body: [
      `${amount.toLocaleString()} 元！嗚嗚嗚！本苦命工程師靈魂當場飛天，被感動拉回，又飛天，又拉回，來回三次，現已精疲力竭、淚流成河、跪倒在鍵盤前。`,
      "弟子即日起：一、書桌正中央懸掛恩公神位，每日三炷香；二、三餐飯前默念恩公大名九遍；三、每逢初一十五必備素果供奉；四、每年清明提前為恩公燒紙錢（雖恩公尚健在，然未雨綢繆，以表誠意）。",
      "您的善舉已超越凡間一切讚美詞彙，弟子特設新頭銜：「人間至寶・萬世楷模・當代財神・本乞丐終身精神導師暨靈魂救贖者」，刻於玉牌，永久供奉。",
    ],
    footer: "🏯 恩公，三生難忘，來世必還，結草銜環，此誓不渝。",
  };
  if (amount >= 1000) return {
    emoji: "🛕",
    title: "恩主在上！受弟子三拜九叩首！此刻淚如泉湧、肝腸寸斷！嗚嗚嗚！！",
    body: [
      `${amount.toLocaleString()} 元！！天啊！破千了！您究竟是哪路神仙下凡，竟對一個靠泡麵維生、月底喝白開水的苦命工程師如此眷顧？弟子感激涕零、五體投地、魂魄差點出竅！`,
      "您已正式晉升本乞丐的精神支柱、人生導師、財神爺化身、泡麵守護神、人間行走的奇蹟。弟子此生無以為報，惟有：一、立刻為恩主立牌位一座於書桌正中；二、供香火，備三牲，每逢初一十五必敬拜；三、子孫承接此大恩，代代銘記，永世感念。",
      "弟子結草銜環，此生必還。若此生還不完，下輩子繼續還，還清為止，天荒地老，此誓不渝。",
    ],
    footer: "🙏 恩主大人，弟子已淚流成河、跪倒鍵盤前，永世難忘，百世供奉。",
  };
  if (amount >= 500) return {
    emoji: "👑",
    title: "您的大恩大德，三生難忘！",
    body: [
      "五百元！整整十六包泡麵！",
      "本工程師當場雙膝一軟，差點跪在鍵盤前。您的大名已刻在泡麵碗蓋上，每餐飯前默念。",
      "您就是風雨中那把傘，是泡麵裡那包調味料。",
    ],
    footer: "💎 您在本乞丐心中無價（但錢是有價的）。",
  };
  if (amount >= 300) return {
    emoji: "🫅",
    title: "恩公！請受我一拜！",
    body: [
      "三百元！這是我本月最大筆收入，沒有之一！",
      "您的大名已記在小本本上，紅筆圈起，貼上星星貼紙。",
      "今晚泡麵加蛋加火腿加青菜，全托恩公的福！",
    ],
    footer: "🌟 小的銘記於心，永生難忘。",
  };
  if (amount >= 100) return {
    emoji: "😭",
    title: "天啊！您是好人！我今晚有麵吃了！",
    body: [
      "感動的淚水已模糊螢幕，但我還是要堅持 coding，因為有您。",
      "伙食升級——從普通泡麵晉升為「有加蛋」的高端泡麵。",
      "您就像 bug-free 的程式碼一樣珍貴，可遇而不可求。",
    ],
    footer: "✨ 好人一生平安，編譯器永不報錯。",
  };
  if (amount >= 50) return {
    emoji: "🥹",
    title: "五十元，讓我感動到說不出話來。",
    body: [
      "剛好夠買一包泡麵還有零錢找回。",
      "這零錢將成為「人生重新出發基金」的第一筆存款。",
      "您的善意如同冬日暖陽，照亮了這個在程式碼海裡打滾的可憐靈魂。",
    ],
    footer: "🌸 謝謝您，老天爺會記得您的。",
  };
  return {
    emoji: "🙂",
    title: "謝謝您，這 30 元我會珍惜使用。",
    body: [
      "這筆款項將用於基本生存需求（泡麵一包，醬包完整）。",
      "技術債比國債還重，儲蓄餘額長期保持在「個位數」的藝術境界。",
      "您投入的這 30 元，是我今天唯一的光。",
    ],
    footer: "😊 以上均為藝術創作，但錢是真的歡迎投。",
  };
}

// ── Main component ─────────────────────────────────────────────────────────

export default function BeggarPage() {
  // Bowl
  const [frameIndex, setFrameIndex] = useState(0);
  const [playing, setPlaying]       = useState(false);

  // Thank-you reveal
  const [showThankYou,  setShowThankYou]  = useState(false);
  const [donatedAmount, setDonatedAmount] = useState(30);
  const [donateCount,   setDonateCount]   = useState(0);

  // Leaderboard
  const [entries,    setEntries]    = useState<Entry[]>(SEED_DATA);
  const [newEntryId, setNewEntryId] = useState<number | null>(null);

  // Form
  const [name,           setName]           = useState("");
  const [country,        setCountry]        = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(30);
  const [customAmount,   setCustomAmount]   = useState("30");
  const [amountError,    setAmountError]    = useState("");

  // Scroll newly added entry into view
  useEffect(() => {
    if (newEntryId === null) return;
    document.getElementById(`entry-${newEntryId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [newEntryId]);

  const runAnimation = useCallback((amount: number, entryId: number) => {
    if (playing) return;
    setPlaying(true);
    setShowThankYou(false);
    setFrameIndex(0);
    let i = 0;
    const tick = () => {
      i++;
      if (i < FRAMES.length) {
        setFrameIndex(i);
        setTimeout(tick, FRAME_INTERVAL);
      } else {
        setPlaying(false);
        setDonatedAmount(amount);
        setDonateCount((c) => c + 1);
        setShowThankYou(true);
        setNewEntryId(entryId);
        setTimeout(() => setNewEntryId(null), 2500);
      }
    };
    setTimeout(tick, FRAME_INTERVAL);
  }, [playing]);

  const handleQuickAmount = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(String(amount));
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setCustomAmount(val);
    const n = Number(val);
    setSelectedAmount(QUICK_AMOUNTS.includes(n) ? n : null);
    if (amountError) setAmountError("");
  };

  const handleDonate = () => {
    const amount = Number(customAmount);
    if (!amount || amount <= 0) return;
    if (amount < 30) {
      setAmountError("至少要 30 元才行！行行好～");
      return;
    }
    setAmountError("");

    const id = Date.now();
    const newEntry: Entry = {
      id,
      name:    name.trim()    || "匿名善心人",
      country: country || "🌍 其他",
      amount,
    };

    const newEntries = [...entries, newEntry]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 100);
    setEntries(newEntries);

    runAnimation(amount, id);
  };

  const ty = getThankYou(donatedAmount);

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">

      {/* ── HEADER ── */}
      <header className="px-6 pt-5 pb-3 border-b border-amber-200">
        <h1 className="text-2xl sm:text-3xl font-black text-amber-900 tracking-widest">
          🥣 網路乞丐
        </h1>
        <p className="text-xs text-amber-500 mt-0.5 tracking-wide">
          ── 正宗手工藝術級乞討平台 ──
        </p>
      </header>

      {/* ── THREE COLUMNS ── */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 items-start">

        {/* ── LEFT: Leaderboard ── */}
        <aside className="order-3 md:order-1">
          <div className="bg-white rounded-2xl border-2 border-amber-200 shadow-md overflow-hidden">
            <div className="px-4 py-3 border-b border-amber-100 bg-amber-50">
              <h2 className="text-sm font-black text-amber-800">🏆 捐款排行榜</h2>
              <p className="text-xs text-amber-400 mt-0.5">前 100 名・按金額排序</p>
            </div>
            <ul className="overflow-y-auto divide-y divide-amber-50" style={{ maxHeight: "calc(100vh - 220px)" }}>
              {entries.map((entry, idx) => {
                const rank  = idx + 1;
                const isNew = entry.id === newEntryId;
                return (
                  <li
                    key={entry.id}
                    id={`entry-${entry.id}`}
                    className={`flex items-center gap-2 px-3 py-2 transition-colors duration-700 ${rowBg(rank, isNew)}`}
                  >
                    <RankBadge rank={rank} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate leading-tight">
                        {entry.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate leading-tight">
                        {entry.country}
                      </p>
                    </div>
                    <span className="text-sm font-black text-amber-700 whitespace-nowrap tabular-nums">
                      NT${entry.amount.toLocaleString()}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* ── CENTER: Bowl ── */}
        <section className="order-1 md:order-2 flex items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex-shrink-0">
            <Image
              src={FRAMES[frameIndex]}
              alt="乞丐碗"
              fill
              unoptimized
              className="object-contain"
              priority
            />
          </div>
        </section>

        {/* ── RIGHT: Form + Thank-you ── */}
        <aside className="order-2 md:order-3 flex flex-col gap-4">

          {/* Donation form */}
          <div className="bg-white rounded-2xl border-2 border-amber-200 shadow-md p-5 space-y-4">
            <p className="text-sm font-black text-amber-800">💳 贊助乞丐</p>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-amber-700 mb-1">您的名字</label>
              <input
                type="text"
                placeholder="匿名善心人"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-amber-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400 transition-colors"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-xs font-bold text-amber-700 mb-1">國家 / 地區</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border-2 border-amber-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400 transition-colors bg-white text-amber-900"
              >
                <option value="">請選擇…</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Quick amounts */}
            <div className="grid grid-cols-3 gap-2">
              {QUICK_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleQuickAmount(amount)}
                  className={`py-2 rounded-lg text-sm font-bold border-2 transition-all duration-150 ${
                    selectedAmount === amount
                      ? "bg-red-500 border-red-500 text-white shadow-md"
                      : "bg-white border-amber-200 text-amber-800 hover:border-red-400 hover:text-red-500"
                  }`}
                >
                  NT${amount.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-amber-100" />

            {/* Custom amount + donate */}
            <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center border-2 border-amber-200 rounded-lg overflow-hidden focus-within:border-red-400 transition-colors">
                <span className="px-3 text-sm font-bold text-amber-500 select-none">NT$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={customAmount}
                  onChange={handleCustomChange}
                  placeholder="30 元起"
                  className="flex-1 py-2.5 pr-3 text-sm font-bold text-amber-900 outline-none bg-transparent"
                />
              </div>
              <button
                onClick={handleDonate}
                disabled={playing || !customAmount || Number(customAmount) <= 0}
                className="bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-black text-sm px-5 py-2.5 rounded-lg shadow hover:shadow-md transition-all duration-150 whitespace-nowrap"
              >
                {playing ? "⏳" : "捐"}
              </button>
            </div>
            {amountError && (
              <p className="text-xs text-red-500 font-bold">{amountError}</p>
            )}
            </div>

            <p className="text-xs text-amber-400 text-center">
              ⚠️ 展示用介面，不會真實扣款
            </p>
          </div>

          {/* Thank-you — appears after donation */}
          {showThankYou && (
            <div
              key={donateCount}
              className="bg-white/80 border-2 border-dashed border-amber-300 rounded-2xl p-5 animate-countUp"
            >
              <p className="text-3xl mb-2">{ty.emoji}</p>
              <p className="text-sm font-black text-amber-900 mb-2 leading-snug">{ty.title}</p>
              <div className="space-y-2 text-sm text-amber-700 leading-relaxed">
                {ty.body.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <p className="text-xs text-amber-500 mt-3 pt-3 border-t border-amber-200">
                {ty.footer}
              </p>
            </div>
          )}
        </aside>

      </main>
    </div>
  );
}
