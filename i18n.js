// Rushi (如是) — site i18n + poster locale routing
// Self-contained, no framework. Each visible text node has data-i18n="key"
// (or data-i18n-html when HTML is allowed). The applyLang() function swaps
// every node + the carousel's poster set when the user picks a language.

(function () {
  const SUPPORTED = ['zh-Hans', 'zh-Hant', 'en', 'ja', 'ko', 'vi', 'de', 'fr', 'th'];
  const POSTER_LANGS = SUPPORTED;
  const STORAGE_KEY = 'rushi.lang';

  const slides = [
    '01-read-diamond-sutra',
    '02-mindful-beads',
    '03-copy-practice',
    '04-meditation-sounds',
    '05-bead-library',
  ];

  // ------------------------------------------------------------------
  // Translations
  // Each language carries a flat object of keys. Missing keys fall back
  // to English, then zh-Hans, so partial coverage is fine.
  // ------------------------------------------------------------------
  const dict = {
    'zh-Hans': {
      htmlLang: 'zh-Hans',
      'page.title': '如是 Rushi — 一念一珠，安住当下 · 金刚经 / 心经多语种诵读',
      'nav.features': '功能',
      'nav.screenshots': '截图',
      'nav.sutras': '开源经文',
      'nav.privacy': '隐私',
      'nav.github': 'GitHub',
      'hero.title.l1': '一念一珠，',
      'hero.title.l2': '安住当下',
      'hero.lede': '清净排版的金刚经与心经诵读，配合念珠、抄经与冥想音景。所有内容保存在你的设备里——无账号，无追踪，无广告。',
      'hero.subtitle': '如是我闻 · As I have heard',
      'hero.cta.store': 'App Store · 即将上架',
      'hero.cta.github': '在 GitHub 上查看源经文',
      'hero.meta.iphone': 'iPhone & iPad',
      'hero.meta.ios': 'iOS 17 +',
      'hero.meta.free': '免费',
      'hero.meta.noads': '无广告',
      'hero.meta.local': '本地存储',
      'carousel.prev': '上一张',
      'carousel.next': '下一张',
      'stat.langs': '界面语言',
      'stat.translations': '经文翻译版本',
      'stat.beads': '念珠 · 完整轮回',
      'stat.tracking': '追踪 · 数据上传',
      'feat.eyebrow': '功能',
      'feat.title': '一卷经，一颗珠，一张纸',
      'feat.lede': '所有功能围绕"一次完整的修持"而设计。没有打卡、没有徽章、没有干扰。',
      'feat.1.title': '读经', 'feat.1.body': '金刚经（鸠摩罗什 / 玄奘两译）与心经，呈现于书法衬线排版。每段都标注出处、译者、底本年代和版权来源；可切换 17 种界面语言与 9 种经文译本。',
      'feat.2.title': '念珠', 'feat.2.body': '真实质感的木珠 / 玉珠 / 菩提子 / 银饰组合，可自由穿珠搭配挂饰。点击计数，108 颗一回向。背景同步显示当前所读经文段落。',
      'feat.3.title': '抄经', 'feat.3.body': '一字一格的清净抄经面板，支持手写笔与触屏。原文以淡字为底，依次描红，完成后可保存成纸张为念。',
      'feat.4.title': '冥想音景', 'feat.4.body': '木鱼、磬、钟、铃铛、雨、竹林——每段音景循环自然衔接，可叠加。无网络要求，离线即可静坐。',
      'feat.5.title': '回向 · 历史', 'feat.5.body': '每完成一回念珠，可写下当下的回向意图，保存在设备本地。历史记录按时间和经文分类，私密只见于你。',
      'feat.6.title': '纯本地，无账号', 'feat.6.body': '没有注册、没有云端、没有分析。所有偏好、进度、回向、抄经字迹都只存在于你的 iPhone / iPad，由 iCloud 私有数据库托管（如你开启）。',
      'shots.eyebrow': '界面',
      'shots.title': '每一屏都像一张安静的纸',
      'shots.lede': '配色与字体都从经书印刷的纸面与刻本汲取，去除一切多余装饰。',
      'shots.cap.1': '读《金刚经》', 'shots.cap.2': '一念一珠', 'shots.cap.3': '抄经静心', 'shots.cap.4': '冥想音景', 'shots.cap.5': '定制念珠',
      'lang.label': '支持的语言',
      'sutras.eyebrow': '开源',
      'sutras.title': '经文亦是公共财',
      'sutras.lede': 'app 内每一段经文都来自公认的公有领域底本，并经人工与 AI 交叉校阅。我们把整理后的版本以 Markdown 公开在 GitHub，自由复用与改进。',
      'sutras.heart.title': '心经 · Heart Sutra', 'sutras.heart.subtitle': 'Prajñāpāramitā Hṛdaya',
      'sutras.heart.body': '11 个语言版本已开源：中文（简/繁）· 英 · 日 · 韩 · 越 · 藏 · 梵（拉丁/天城）· 德 · 法',
      'sutras.heart.link': '查看 →',
      'sutras.diamond.title': '金刚经 · Diamond Sutra', 'sutras.diamond.subtitle': 'Vajracchedikā Prajñāpāramitā',
      'sutras.diamond.body': '13 个版本已开源：鸠摩罗什 / 玄奘汉译 + 1932 Goddard 英译、1914 Walleser 德译、9 世纪藏译等 PD 底本。',
      'sutras.diamond.link': '查看 →',
      'sutras.source.title': '底本 · Source Editions', 'sutras.source.subtitle': 'All Public Domain',
      'sutras.source.body': '每篇 Markdown 头部都标注：译者、年代、出处、版权状态、入选理由。可作研究 / 教学 / 二次开发底本。',
      'sutras.source.license': '许可：CC0 1.0 (Public Domain)',
      'priv.eyebrow': '隐私',
      'priv.title': '我们不知道你在读什么',
      'priv.body': '如是 不收集任何个人信息。没有账号、没有分析 SDK、没有第三方追踪。所有进度、念珠回数、回向文字、抄经字迹都只保存在你的设备上。可选 iCloud 同步使用你私人 iCloud 账户的私有数据库，由 Apple 端到端加密，开发者也无法读取。',
      'priv.links': '完整版本：',
      'priv.link.privacy': '隐私政策',
      'priv.link.terms': '服务条款',
      'cta.title': '开始一段清净的修持',
      'cta.body': 'app 即将在 App Store 上架，敬请关注。源经文已在 GitHub 公开，可先行查阅。',
      'foot.app': '应用',
      'foot.legal': '法律',
      'foot.links': '链接',
      'foot.repo': 'GitHub',
      'foot.feedback': '反馈与建议',
      'foot.tagline': '一念一珠，安住当下',
      'foot.copyright': '© 2026 Rushi · 所有经文出自公有领域底本',
      'foot.fontnote': '使用 Noto Serif SC（SIL OFL 1.1）排版',
    },

    'zh-Hant': {
      htmlLang: 'zh-Hant',
      'page.title': '如是 Rushi — 一念一珠，安住當下 · 金剛經 / 心經多語種誦讀',
      'nav.features': '功能', 'nav.screenshots': '截圖', 'nav.sutras': '開源經文', 'nav.privacy': '隱私', 'nav.github': 'GitHub',
      'hero.title.l1': '一念一珠，', 'hero.title.l2': '安住當下',
      'hero.lede': '清淨排版的金剛經與心經誦讀，配合念珠、抄經與冥想音景。所有內容保存在你的裝置裡——無帳號，無追蹤，無廣告。',
      'hero.subtitle': '如是我聞 · As I have heard',
      'hero.cta.store': 'App Store · 即將上架', 'hero.cta.github': '在 GitHub 上查看源經文',
      'hero.meta.iphone': 'iPhone & iPad', 'hero.meta.ios': 'iOS 17 +', 'hero.meta.free': '免費', 'hero.meta.noads': '無廣告', 'hero.meta.local': '本地儲存',
      'carousel.prev': '上一張', 'carousel.next': '下一張',
      'stat.langs': '介面語言', 'stat.translations': '經文翻譯版本', 'stat.beads': '念珠 · 完整輪迴', 'stat.tracking': '追蹤 · 資料上傳',
      'feat.eyebrow': '功能', 'feat.title': '一卷經，一顆珠，一張紙',
      'feat.lede': '所有功能圍繞「一次完整的修持」而設計。沒有打卡、沒有徽章、沒有干擾。',
      'feat.1.title': '讀經', 'feat.1.body': '金剛經（鳩摩羅什 / 玄奘兩譯）與心經，呈現於書法襯線排版。每段都標註出處、譯者、底本年代與版權來源；可切換 17 種介面語言與 9 種經文譯本。',
      'feat.2.title': '念珠', 'feat.2.body': '真實質感的木珠 / 玉珠 / 菩提子 / 銀飾組合，可自由穿珠搭配掛飾。點擊計數，108 顆一回向。背景同步顯示當前所讀經文段落。',
      'feat.3.title': '抄經', 'feat.3.body': '一字一格的清淨抄經面板，支援手寫筆與觸控。原文以淡字為底，依次描紅，完成後可保存成紙張為念。',
      'feat.4.title': '冥想音景', 'feat.4.body': '木魚、磬、鐘、鈴鐺、雨、竹林——每段音景循環自然銜接，可疊加。無需網路，離線即可靜坐。',
      'feat.5.title': '回向 · 歷史', 'feat.5.body': '每完成一回念珠，可寫下當下的回向意圖，保存在裝置本地。歷史記錄按時間與經文分類，私密只見於你。',
      'feat.6.title': '純本地，無帳號', 'feat.6.body': '沒有註冊、沒有雲端、沒有分析。所有偏好、進度、回向、抄經字跡都只存在於你的 iPhone / iPad。',
      'shots.eyebrow': '介面', 'shots.title': '每一屏都像一張安靜的紙',
      'shots.lede': '配色與字體都從經書印刷的紙面與刻本汲取，去除一切多餘裝飾。',
      'shots.cap.1': '讀《金剛經》', 'shots.cap.2': '一念一珠', 'shots.cap.3': '抄經靜心', 'shots.cap.4': '冥想音景', 'shots.cap.5': '客製念珠',
      'lang.label': '支援的語言',
      'sutras.eyebrow': '開源', 'sutras.title': '經文亦是公共財',
      'sutras.lede': 'app 內每一段經文都來自公認的公有領域底本，並經人工與 AI 交叉校閱。我們把整理後的版本以 Markdown 公開在 GitHub，自由複用與改進。',
      'sutras.heart.title': '心經 · Heart Sutra', 'sutras.heart.subtitle': 'Prajñāpāramitā Hṛdaya',
      'sutras.heart.body': '11 個語言版本已開源：中文（簡/繁）· 英 · 日 · 韓 · 越 · 藏 · 梵（拉丁/天城）· 德 · 法',
      'sutras.heart.link': '查看 →',
      'sutras.diamond.title': '金剛經 · Diamond Sutra', 'sutras.diamond.subtitle': 'Vajracchedikā Prajñāpāramitā',
      'sutras.diamond.body': '13 個版本已開源：鳩摩羅什 / 玄奘漢譯 + 1932 Goddard 英譯、1914 Walleser 德譯、9 世紀藏譯等 PD 底本。',
      'sutras.diamond.link': '查看 →',
      'sutras.source.title': '底本 · Source Editions', 'sutras.source.subtitle': 'All Public Domain',
      'sutras.source.body': '每篇 Markdown 頭部都標註：譯者、年代、出處、版權狀態、入選理由。可作研究 / 教學 / 二次開發底本。',
      'sutras.source.license': '授權：CC0 1.0 (Public Domain)',
      'priv.eyebrow': '隱私', 'priv.title': '我們不知道你在讀什麼',
      'priv.body': '如是 不收集任何個人資訊。沒有帳號、沒有分析 SDK、沒有第三方追蹤。所有進度、念珠回數、回向文字、抄經字跡都只保存在你的裝置上。可選 iCloud 同步使用你私人 iCloud 帳戶的私有資料庫，由 Apple 端對端加密，開發者也無法讀取。',
      'priv.links': '完整版本：', 'priv.link.privacy': '隱私政策', 'priv.link.terms': '服務條款',
      'cta.title': '開始一段清淨的修持', 'cta.body': 'app 即將在 App Store 上架，敬請關注。源經文已在 GitHub 公開，可先行查閱。',
      'foot.app': '應用', 'foot.legal': '法律', 'foot.links': '連結', 'foot.repo': 'GitHub', 'foot.feedback': '回饋與建議',
      'foot.tagline': '一念一珠，安住當下',
      'foot.copyright': '© 2026 Rushi · 所有經文出自公有領域底本',
      'foot.fontnote': '使用 Noto Serif TC（SIL OFL 1.1）排版',
    },

    'en': {
      htmlLang: 'en',
      'page.title': 'Rushi — One bead, one breath, one moment · Diamond Sutra & Heart Sutra in 17 languages',
      'nav.features': 'Features', 'nav.screenshots': 'Screens', 'nav.sutras': 'Open source', 'nav.privacy': 'Privacy', 'nav.github': 'GitHub',
      'hero.title.l1': 'One bead.', 'hero.title.l2': 'One breath. One moment.',
      'hero.lede': 'A quiet iPhone & iPad app for reading the Diamond Sutra and Heart Sutra, working a 108-bead mala, copying scripture, and sitting with sounds. Everything stays on your device — no account, no tracking, no ads.',
      'hero.subtitle': 'Thus have I heard · 如是我聞',
      'hero.cta.store': 'App Store · coming soon', 'hero.cta.github': 'See source scriptures on GitHub',
      'hero.meta.iphone': 'iPhone & iPad', 'hero.meta.ios': 'iOS 17 +', 'hero.meta.free': 'Free', 'hero.meta.noads': 'No ads', 'hero.meta.local': 'On-device only',
      'carousel.prev': 'Previous', 'carousel.next': 'Next',
      'stat.langs': 'UI languages', 'stat.translations': 'Sutra translations', 'stat.beads': 'beads · one full round', 'stat.tracking': 'tracking · 0 uploads',
      'feat.eyebrow': 'Features', 'feat.title': 'One scroll. One bead. One sheet.',
      'feat.lede': 'Every feature is shaped around a single complete sitting. No streaks, no badges, no nudges.',
      'feat.1.title': 'Read', 'feat.1.body': 'The Diamond Sutra (Kumārajīva and Xuanzang Chinese translations) and Heart Sutra in calligraphic serif typography. Each passage carries translator, source edition, and copyright provenance. Switch among 17 UI languages and 9 sutra translations.',
      'feat.2.title': 'Mala beads', 'feat.2.body': 'Realistic wood, jade, bodhi, and silver beads you can string and finish with a pendant. Tap to count; 108 beads complete one dedication. The current sutra passage scrolls quietly behind the strand.',
      'feat.3.title': 'Copy practice', 'feat.3.body': 'A clean, grid-based copying canvas with stylus and touch support. The source text fades in as a guide; trace one character at a time, save the finished sheet for keeping.',
      'feat.4.title': 'Meditation sounds', 'feat.4.body': 'Wooden fish, singing bowl, bell, rain, bamboo grove — each loop seamlessly, layer freely. No network required, sit anywhere offline.',
      'feat.5.title': 'Dedication & history', 'feat.5.body': 'After each full mala, write a short dedication of intent. Saved on-device, sorted by date and sutra, visible only to you.',
      'feat.6.title': 'On-device, no account', 'feat.6.body': 'No sign-up, no cloud sync to us, no analytics. Preferences, progress, dedications, and copy sheets live only on your iPhone / iPad — and optionally in your private iCloud database.',
      'shots.eyebrow': 'Screens', 'shots.title': 'Every screen reads like a sheet of paper',
      'shots.lede': 'Colors and typography are drawn from printed sutra editions and woodblock impressions; nothing decorative.',
      'shots.cap.1': 'Read the Diamond Sutra', 'shots.cap.2': 'Mindful beads', 'shots.cap.3': 'Copy practice', 'shots.cap.4': 'Meditation sounds', 'shots.cap.5': 'Bead library',
      'lang.label': 'Available languages',
      'sutras.eyebrow': 'Open source', 'sutras.title': 'Scripture is public heritage',
      'sutras.lede': 'Every sutra passage in the app comes from a verified public-domain source edition, manually checked and AI cross-reviewed. The cleaned-up text is published as plain Markdown on GitHub for anyone to reuse.',
      'sutras.heart.title': 'Heart Sutra · 心经', 'sutras.heart.subtitle': 'Prajñāpāramitā Hṛdaya',
      'sutras.heart.body': 'Open-sourced in 11 languages: Chinese (Simp / Trad), English, Japanese, Korean, Vietnamese, Tibetan, Sanskrit (Latin / Devanāgarī), German, French.',
      'sutras.heart.link': 'Browse →',
      'sutras.diamond.title': 'Diamond Sutra · 金刚经', 'sutras.diamond.subtitle': 'Vajracchedikā Prajñāpāramitā',
      'sutras.diamond.body': '13 versions open-sourced: Kumārajīva and Xuanzang Chinese translations + Goddard 1932 English, Walleser 1914 German, 9-century Tibetan, and more PD source editions.',
      'sutras.diamond.link': 'Browse →',
      'sutras.source.title': 'Source editions', 'sutras.source.subtitle': 'All public domain',
      'sutras.source.body': 'Every Markdown file declares translator, dates, source URL, copyright basis, and editorial notes — usable as a research, teaching, or downstream-app foundation.',
      'sutras.source.license': 'License: CC0 1.0 (Public Domain Dedication)',
      'priv.eyebrow': 'Privacy', 'priv.title': "We don't know what you're reading",
      'priv.body': 'Rushi collects nothing. No account, no analytics SDK, no third-party tracking. All progress, bead counts, dedications, and copy strokes live only on your device. Optional iCloud sync uses Apple\'s private CloudKit database — end-to-end encrypted, unreadable by us.',
      'priv.links': 'Full text:', 'priv.link.privacy': 'Privacy Policy', 'priv.link.terms': 'Terms of Service',
      'cta.title': 'Begin a quiet practice',
      'cta.body': 'The app is coming to the App Store soon. The source scriptures are already public on GitHub.',
      'foot.app': 'App', 'foot.legal': 'Legal', 'foot.links': 'Links', 'foot.repo': 'GitHub', 'foot.feedback': 'Feedback',
      'foot.tagline': 'One bead, one breath, one moment',
      'foot.copyright': '© 2026 Rushi · All scriptures are public-domain editions',
      'foot.fontnote': 'Set in Noto Serif (SIL OFL 1.1)',
    },

    'ja': {
      htmlLang: 'ja',
      'page.title': '如是 Rushi — 一念一珠、いまここに · 金剛経 / 般若心経 多言語読誦',
      'nav.features': '機能', 'nav.screenshots': '画面', 'nav.sutras': 'オープン経典', 'nav.privacy': 'プライバシー', 'nav.github': 'GitHub',
      'hero.title.l1': '一念一珠、', 'hero.title.l2': 'いまここに',
      'hero.lede': '清浄な組版の金剛経・般若心経の読誦に、念珠・写経・瞑想音景を添えた iPhone / iPad アプリ。すべての内容はあなたの端末に保存——アカウント不要、追跡なし、広告なし。',
      'hero.subtitle': '如是我聞 · As I have heard',
      'hero.cta.store': 'App Store · 近日公開', 'hero.cta.github': 'GitHub で原典を見る',
      'hero.meta.iphone': 'iPhone & iPad', 'hero.meta.ios': 'iOS 17 +', 'hero.meta.free': '無料', 'hero.meta.noads': '広告なし', 'hero.meta.local': '端末内保存',
      'carousel.prev': '前へ', 'carousel.next': '次へ',
      'stat.langs': 'UI 言語', 'stat.translations': '経典翻訳版', 'stat.beads': '念珠 · 一周', 'stat.tracking': '追跡 · 0 件',
      'feat.eyebrow': '機能', 'feat.title': '一巻、一珠、一葉',
      'feat.lede': 'すべての機能は「一度の完結した修行」のために設計されています。連続日数も、バッジも、通知の追い立てもありません。',
      'feat.1.title': '読経', 'feat.1.body': '金剛経（鳩摩羅什訳・玄奘訳の二訳）と般若心経を、書道セリフ組版で表示。出典・訳者・底本年代・版権根拠を各段に明記し、17 言語の UI と 9 つの経典訳を切り替え可能。',
      'feat.2.title': '念珠', 'feat.2.body': '本物の質感の木珠 / 翡翠 / 菩提樹 / 銀飾を自由に組み合わせて挂飾を結べます。タップで数え、108 珠で一回向。背景に現在の経文段が静かに流れます。',
      'feat.3.title': '写経', 'feat.3.body': '一字一格の清浄な写経パネル。スタイラスとタッチ操作対応。原文を薄文字でなぞり、完成した一葉を保存できます。',
      'feat.4.title': '瞑想音景', 'feat.4.body': '木魚・磬・鐘・鈴・雨音・竹林——各音景はループしてつなぎ目なく、自由に重ねられます。ネット不要、オフラインで坐禅。',
      'feat.5.title': '回向 · 履歴', 'feat.5.body': '一回の念珠を結えるたび、その時の意図を回向として記せます。端末内に保存され、日付と経典別に整理。あなただけが見られます。',
      'feat.6.title': '完全ローカル、アカウント不要', 'feat.6.body': '登録不要・クラウド送信なし・解析なし。設定、進捗、回向、写経筆跡はすべて iPhone / iPad の中だけに、必要なら iCloud のあなたの私的データベースに保存されます。',
      'shots.eyebrow': '画面', 'shots.title': 'すべての画面が一葉の紙のように',
      'shots.lede': '色と書体は古い経本の刷り紙と版木から取られ、装飾を一切排しました。',
      'shots.cap.1': '金剛経を読む', 'shots.cap.2': '一念一珠', 'shots.cap.3': '写経で静心', 'shots.cap.4': '瞑想音景', 'shots.cap.5': '念珠カスタム',
      'lang.label': '対応言語',
      'sutras.eyebrow': 'オープンソース', 'sutras.title': '経典もまた公共のもの',
      'sutras.lede': 'アプリ内のすべての経文は、確かなパブリックドメイン底本から取り、人手と AI による相互校閲を経ています。整理済みのテキストは GitHub で Markdown として公開しています。',
      'sutras.heart.title': '般若心経 · Heart Sutra', 'sutras.heart.subtitle': 'Prajñāpāramitā Hṛdaya',
      'sutras.heart.body': '11 言語版を公開：中（簡 / 繁）· 英 · 日 · 韓 · ベトナム · チベット · 梵（ラテン / デーヴァナーガリー）· 独 · 仏',
      'sutras.heart.link': '見る →',
      'sutras.diamond.title': '金剛経 · Diamond Sutra', 'sutras.diamond.subtitle': 'Vajracchedikā Prajñāpāramitā',
      'sutras.diamond.body': '13 版を公開：鳩摩羅什訳 / 玄奘訳 + Goddard 1932 英訳、Walleser 1914 独訳、9 世紀チベット訳など PD 底本。',
      'sutras.diamond.link': '見る →',
      'sutras.source.title': '底本', 'sutras.source.subtitle': 'すべてパブリックドメイン',
      'sutras.source.body': '各 Markdown の冒頭に：訳者・年代・出典・版権状態・採用理由を明記。研究・教育・二次開発の基礎として利用可能。',
      'sutras.source.license': 'ライセンス：CC0 1.0 (パブリックドメイン)',
      'priv.eyebrow': 'プライバシー', 'priv.title': 'あなたが何を読んでいるか、私たちは知りません',
      'priv.body': '如是 は個人情報を一切収集しません。アカウントなし、解析 SDK なし、第三者追跡なし。進捗、念珠回数、回向、写経筆跡はすべて端末に保存。任意の iCloud 同期はあなた自身の iCloud 私的データベースを使い、Apple のエンドツーエンド暗号化により開発者からも読めません。',
      'priv.links': '全文：', 'priv.link.privacy': 'プライバシーポリシー', 'priv.link.terms': '利用規約',
      'cta.title': '清らかな修行をはじめる',
      'cta.body': 'アプリは近く App Store で公開予定です。原典は既に GitHub 上で公開されています。',
      'foot.app': 'アプリ', 'foot.legal': '法的', 'foot.links': 'リンク', 'foot.repo': 'GitHub', 'foot.feedback': 'フィードバック',
      'foot.tagline': '一念一珠、いまここに',
      'foot.copyright': '© 2026 Rushi · すべての経典は PD 底本',
      'foot.fontnote': 'Noto Serif JP (SIL OFL 1.1) で組版',
    },

    'ko': {
      htmlLang: 'ko',
      'page.title': '如是 Rushi — 한 염주, 한 호흡, 지금 여기 · 금강경 / 반야심경 다국어 독송',
      'nav.features': '기능', 'nav.screenshots': '화면', 'nav.sutras': '오픈 경전', 'nav.privacy': '개인정보', 'nav.github': 'GitHub',
      'hero.title.l1': '한 염주,', 'hero.title.l2': '지금 여기',
      'hero.lede': '청정한 조판의 금강경과 반야심경 독송에, 염주 · 사경 · 명상 음경을 더한 iPhone / iPad 앱. 모든 내용은 기기 안에만 저장되며, 계정 없음 · 추적 없음 · 광고 없음.',
      'hero.subtitle': '如是我聞 · As I have heard',
      'hero.cta.store': 'App Store · 출시 예정', 'hero.cta.github': 'GitHub 에서 원전 보기',
      'hero.meta.iphone': 'iPhone & iPad', 'hero.meta.ios': 'iOS 17 +', 'hero.meta.free': '무료', 'hero.meta.noads': '광고 없음', 'hero.meta.local': '기기 저장',
      'carousel.prev': '이전', 'carousel.next': '다음',
      'stat.langs': 'UI 언어', 'stat.translations': '경전 번역본', 'stat.beads': '염주 · 한 회', 'stat.tracking': '추적 · 0 건',
      'feat.eyebrow': '기능', 'feat.title': '한 권, 한 알, 한 장',
      'feat.lede': '모든 기능은 「온전한 한 번의 수행」을 위해 설계되었습니다. 연속 기록도, 배지도, 알림 재촉도 없습니다.',
      'feat.1.title': '독경', 'feat.1.body': '금강경 (구마라집·현장 두 한역)과 반야심경을 서예 세리프 조판으로. 각 단락에 출처·역자·저본 연대·저작권 근거를 명기하며 17 개 UI 언어와 9 종 경전 번역을 전환할 수 있습니다.',
      'feat.2.title': '염주', 'feat.2.body': '실제 질감의 목주 / 옥주 / 보리수 / 은장식을 자유롭게 꿰어 매듭과 매달이를 결합. 탭으로 헤아리고, 108 알이 한 회향. 배경에는 현재 읽고 있는 경문 단락이 조용히 흐릅니다.',
      'feat.3.title': '사경', 'feat.3.body': '한 글자씩 나눠진 청정한 사경 패널. 스타일러스와 터치 입력 지원. 원문이 흐린 글씨로 안내되어 한 자씩 따라 쓰고, 완성된 한 장을 저장할 수 있습니다.',
      'feat.4.title': '명상 음경', 'feat.4.body': '목어 · 경 · 종 · 방울 · 비 · 대숲——각 음경은 끊김 없이 순환하고 자유롭게 겹칠 수 있습니다. 인터넷 불필요, 오프라인에서 좌선.',
      'feat.5.title': '회향 · 기록', 'feat.5.body': '한 회 염주를 마칠 때마다 그 순간의 회향 의도를 적을 수 있습니다. 기기 안에 저장되어 날짜와 경전별로 정리되며 오직 본인에게만 보입니다.',
      'feat.6.title': '완전 로컬, 계정 없음', 'feat.6.body': '회원 가입 없음 · 클라우드 전송 없음 · 분석 없음. 설정, 진도, 회향, 사경 필적은 모두 iPhone / iPad 안에만 (선택적으로 iCloud 의 본인 전용 데이터베이스에) 저장됩니다.',
      'shots.eyebrow': '화면', 'shots.title': '모든 화면이 한 장의 종이처럼',
      'shots.lede': '색채와 서체는 옛 경본의 인쇄 종이와 판각에서 취하여, 모든 장식을 덜어냈습니다.',
      'shots.cap.1': '금강경 독송', 'shots.cap.2': '한 염주', 'shots.cap.3': '사경 정심', 'shots.cap.4': '명상 음경', 'shots.cap.5': '염주 커스터마이즈',
      'lang.label': '지원 언어',
      'sutras.eyebrow': '오픈소스', 'sutras.title': '경전 또한 공공의 자산',
      'sutras.lede': '앱의 모든 경문은 검증된 공공 영역 저본에서 가져왔으며, 사람과 AI 의 교차 검토를 거쳤습니다. 정리된 텍스트는 Markdown 으로 GitHub 에 공개되어 누구나 자유롭게 사용할 수 있습니다.',
      'sutras.heart.title': '반야심경 · Heart Sutra', 'sutras.heart.subtitle': 'Prajñāpāramitā Hṛdaya',
      'sutras.heart.body': '11 개 언어 공개: 중국어 (간/번) · 영어 · 일본어 · 한국어 · 베트남어 · 티베트어 · 산스크리트 (라틴/데바나가리) · 독일어 · 프랑스어',
      'sutras.heart.link': '보기 →',
      'sutras.diamond.title': '금강경 · Diamond Sutra', 'sutras.diamond.subtitle': 'Vajracchedikā Prajñāpāramitā',
      'sutras.diamond.body': '13 종 공개: 구마라집 / 현장 한역 + Goddard 1932 영역 · Walleser 1914 독역 · 9 세기 티베트역 등 PD 저본.',
      'sutras.diamond.link': '보기 →',
      'sutras.source.title': '저본', 'sutras.source.subtitle': '모두 공공 영역',
      'sutras.source.body': '각 Markdown 파일 머리에 역자·연대·출처·저작권 상태·채택 이유를 명기. 연구·교육·재가공의 기반으로 사용 가능.',
      'sutras.source.license': '라이선스: CC0 1.0 (공공 영역)',
      'priv.eyebrow': '개인정보', 'priv.title': '우리는 당신이 무엇을 읽는지 알지 못합니다',
      'priv.body': '如是 는 어떠한 개인정보도 수집하지 않습니다. 계정도, 분석 SDK 도, 제삼자 추적도 없습니다. 모든 진도와 염주 횟수, 회향, 사경 필적은 기기 안에만 저장됩니다. 선택적 iCloud 동기화는 본인의 iCloud 비공개 데이터베이스를 사용하며 Apple 의 종단간 암호화로 개발자도 읽을 수 없습니다.',
      'priv.links': '전체 문서:', 'priv.link.privacy': '개인정보 처리방침', 'priv.link.terms': '서비스 약관',
      'cta.title': '청정한 수행을 시작하세요',
      'cta.body': '앱은 곧 App Store 에 출시됩니다. 원전은 이미 GitHub 에 공개되어 미리 열람할 수 있습니다.',
      'foot.app': '앱', 'foot.legal': '법적', 'foot.links': '링크', 'foot.repo': 'GitHub', 'foot.feedback': '피드백',
      'foot.tagline': '한 염주, 한 호흡, 지금 여기',
      'foot.copyright': '© 2026 Rushi · 모든 경전은 PD 저본',
      'foot.fontnote': 'Noto Serif KR (SIL OFL 1.1) 조판',
    },

    'vi': {
      htmlLang: 'vi',
      'page.title': '如是 Rushi — Một hạt, một hơi thở, hiện tiền · Kim Cang & Bát-nhã Tâm Kinh đa ngôn ngữ',
      'nav.features': 'Tính năng', 'nav.screenshots': 'Giao diện', 'nav.sutras': 'Kinh mã nguồn mở', 'nav.privacy': 'Quyền riêng tư', 'nav.github': 'GitHub',
      'hero.title.l1': 'Một hạt,', 'hero.title.l2': 'một hơi thở, hiện tiền',
      'hero.lede': 'Ứng dụng iPhone & iPad cho việc tụng đọc Kinh Kim Cang và Bát-nhã Tâm Kinh, kết hợp tràng hạt, chép kinh và âm thanh thiền. Mọi nội dung lưu trên máy của bạn — không tài khoản, không theo dõi, không quảng cáo.',
      'hero.subtitle': 'Như thị ngã văn · As I have heard',
      'hero.cta.store': 'App Store · sắp ra mắt', 'hero.cta.github': 'Xem kinh nguồn trên GitHub',
      'hero.meta.iphone': 'iPhone & iPad', 'hero.meta.ios': 'iOS 17 +', 'hero.meta.free': 'Miễn phí', 'hero.meta.noads': 'Không quảng cáo', 'hero.meta.local': 'Lưu trên thiết bị',
      'carousel.prev': 'Trước', 'carousel.next': 'Sau',
      'stat.langs': 'Ngôn ngữ', 'stat.translations': 'Bản dịch', 'stat.beads': 'hạt · một vòng', 'stat.tracking': 'theo dõi · 0',
      'feat.eyebrow': 'Tính năng', 'feat.title': 'Một quyển, một hạt, một tờ',
      'feat.lede': 'Mọi tính năng được thiết kế cho một thời tu trọn vẹn. Không chuỗi ngày liên tục, không huy hiệu, không nhắc nhở.',
      'feat.1.title': 'Đọc kinh', 'feat.1.body': 'Kim Cang (hai bản Hán dịch của Cưu-ma-la-thập và Huyền Trang) và Bát-nhã Tâm Kinh trong dàn trang chữ thư pháp. Mỗi đoạn ghi rõ dịch giả, bản nền và nguồn bản quyền; chuyển 17 ngôn ngữ giao diện và 9 bản dịch kinh.',
      'feat.2.title': 'Tràng hạt', 'feat.2.body': 'Hạt gỗ, ngọc, bồ-đề, bạc với chất cảm thật. Tự xâu hạt và kết móc treo. Chạm để đếm, 108 hạt là một vòng hồi hướng. Đoạn kinh hiện đọc trôi nhẹ ở phía sau.',
      'feat.3.title': 'Chép kinh', 'feat.3.body': 'Khung chép kinh ô vuông gọn gàng, hỗ trợ bút và cảm ứng. Nguyên văn hiện mờ làm hướng dẫn; chép từng chữ rồi lưu lại tờ giấy.',
      'feat.4.title': 'Âm cảnh thiền', 'feat.4.body': 'Mộc ngư, khánh, chuông, chuông gió, mưa, rừng tre — mỗi âm cảnh tuần hoàn liền mạch, có thể chồng lớp. Không cần mạng, ngồi tịnh ngoại tuyến.',
      'feat.5.title': 'Hồi hướng · Lịch sử', 'feat.5.body': 'Sau mỗi vòng tràng hạt, ghi lại tâm nguyện hồi hướng. Lưu trên máy, sắp theo ngày và kinh, chỉ mình bạn thấy.',
      'feat.6.title': 'Toàn bộ trên máy, không tài khoản', 'feat.6.body': 'Không đăng ký, không gửi đám mây cho chúng tôi, không phân tích. Tùy chọn, đồng bộ iCloud lưu trong cơ sở dữ liệu riêng của bạn.',
      'shots.eyebrow': 'Giao diện', 'shots.title': 'Mỗi màn hình tĩnh như một tờ giấy',
      'shots.lede': 'Màu sắc và kiểu chữ lấy từ giấy in kinh và bản khắc gỗ; loại bỏ mọi trang trí.',
      'shots.cap.1': 'Đọc Kim Cang', 'shots.cap.2': 'Một hạt một niệm', 'shots.cap.3': 'Chép kinh tịnh tâm', 'shots.cap.4': 'Âm cảnh thiền', 'shots.cap.5': 'Tùy chỉnh tràng hạt',
      'lang.label': 'Ngôn ngữ hỗ trợ',
      'sutras.eyebrow': 'Mã nguồn mở', 'sutras.title': 'Kinh văn cũng là tài sản công',
      'sutras.lede': 'Mỗi đoạn kinh trong app đều từ bản nền thuộc phạm vi công cộng đã xác minh, qua kiểm chứng tay và AI. Bản đã chỉnh được công bố dạng Markdown trên GitHub để ai cũng có thể dùng lại.',
      'sutras.heart.title': 'Bát-nhã Tâm Kinh · Heart Sutra', 'sutras.heart.subtitle': 'Prajñāpāramitā Hṛdaya',
      'sutras.heart.body': '11 ngôn ngữ đã mở: Trung (giản/phồn) · Anh · Nhật · Hàn · Việt · Tạng · Phạn (Latin/Devanagari) · Đức · Pháp',
      'sutras.heart.link': 'Xem →',
      'sutras.diamond.title': 'Kim Cang · Diamond Sutra', 'sutras.diamond.subtitle': 'Vajracchedikā Prajñāpāramitā',
      'sutras.diamond.body': '13 bản đã mở: Cưu-ma-la-thập / Huyền Trang Hán dịch + Goddard 1932 Anh, Walleser 1914 Đức, Tạng dịch thế kỷ 9 và các bản nền PD khác.',
      'sutras.diamond.link': 'Xem →',
      'sutras.source.title': 'Bản nền', 'sutras.source.subtitle': 'Đều thuộc phạm vi công cộng',
      'sutras.source.body': 'Mỗi tệp Markdown đều ghi rõ ở đầu: dịch giả, niên đại, nguồn URL, cơ sở bản quyền, lý do chọn — dùng được cho nghiên cứu, giảng dạy và phát triển tiếp.',
      'sutras.source.license': 'Giấy phép: CC0 1.0 (Phạm vi công cộng)',
      'priv.eyebrow': 'Quyền riêng tư', 'priv.title': 'Chúng tôi không biết bạn đang đọc gì',
      'priv.body': 'Rushi không thu thập thông tin cá nhân. Không tài khoản, không SDK phân tích, không theo dõi bên thứ ba. Mọi tiến độ, đếm tràng, hồi hướng và nét chép đều ở trên thiết bị. Đồng bộ iCloud (tùy chọn) dùng cơ sở dữ liệu riêng của bạn, Apple mã hóa đầu cuối; nhà phát triển cũng không đọc được.',
      'priv.links': 'Văn bản đầy đủ:', 'priv.link.privacy': 'Chính sách quyền riêng tư', 'priv.link.terms': 'Điều khoản dịch vụ',
      'cta.title': 'Bắt đầu một thời tu thanh tịnh',
      'cta.body': 'App sắp lên App Store. Kinh nguồn đã công khai trên GitHub.',
      'foot.app': 'Ứng dụng', 'foot.legal': 'Pháp lý', 'foot.links': 'Liên kết', 'foot.repo': 'GitHub', 'foot.feedback': 'Phản hồi',
      'foot.tagline': 'Một hạt, một hơi thở, hiện tiền',
      'foot.copyright': '© 2026 Rushi · Mọi kinh đều thuộc PD',
      'foot.fontnote': 'Đặt chữ với Inter & Noto Serif (SIL OFL 1.1)',
    },

    'de': {
      htmlLang: 'de',
      'page.title': 'Rushi — Eine Perle, ein Atemzug, jetzt · Diamant- und Herz-Sutra mehrsprachig',
      'nav.features': 'Funktionen', 'nav.screenshots': 'Bilder', 'nav.sutras': 'Open Source', 'nav.privacy': 'Datenschutz', 'nav.github': 'GitHub',
      'hero.title.l1': 'Eine Perle,', 'hero.title.l2': 'ein Atemzug, jetzt',
      'hero.lede': 'Eine ruhige iPhone- und iPad-App zum Lesen des Diamant-Sutra und des Herz-Sutra, mit 108er-Mala, Schreibpraxis und Meditationsklängen. Alles bleibt auf deinem Gerät — kein Konto, kein Tracking, keine Werbung.',
      'hero.subtitle': 'Also habe ich gehört · As I have heard',
      'hero.cta.store': 'App Store · bald', 'hero.cta.github': 'Quelltexte auf GitHub',
      'hero.meta.iphone': 'iPhone & iPad', 'hero.meta.ios': 'iOS 17 +', 'hero.meta.free': 'Kostenlos', 'hero.meta.noads': 'Werbefrei', 'hero.meta.local': 'Nur auf dem Gerät',
      'carousel.prev': 'Zurück', 'carousel.next': 'Weiter',
      'stat.langs': 'Sprachen', 'stat.translations': 'Sutra-Übersetzungen', 'stat.beads': 'Perlen · ein Umgang', 'stat.tracking': 'Tracking · 0 Uploads',
      'feat.eyebrow': 'Funktionen', 'feat.title': 'Eine Rolle. Eine Perle. Ein Blatt.',
      'feat.lede': 'Jede Funktion ist auf eine einzige, vollständige Sitzung ausgelegt. Keine Streaks, keine Abzeichen, keine Erinnerungen.',
      'feat.1.title': 'Lesen', 'feat.1.body': 'Diamant-Sutra (zwei chinesische Übersetzungen, Kumārajīva und Xuanzang) und Herz-Sutra in serifierter Schreibtypografie. Jeder Abschnitt nennt Übersetzer, Quelle und Rechte; 17 UI-Sprachen, 9 Sutra-Übersetzungen.',
      'feat.2.title': 'Mala-Perlen', 'feat.2.body': 'Realistische Holz-, Jade-, Bodhi- und Silberperlen, frei zu einer Mala kombinierbar. Tippen zum Zählen; 108 Perlen ergeben eine Widmung. Im Hintergrund läuft der gerade gelesene Text leise mit.',
      'feat.3.title': 'Schreibpraxis', 'feat.3.body': 'Klare Raster-Schreibfläche mit Stylus- und Touch-Unterstützung. Der Originaltext erscheint blass; pause Zeichen für Zeichen nach und sichere das fertige Blatt.',
      'feat.4.title': 'Meditationsklänge', 'feat.4.body': 'Holzfisch, Klangschale, Glocke, Glöckchen, Regen, Bambushain — jede Schleife nahtlos, frei zu schichten. Ohne Netz, offline überall.',
      'feat.5.title': 'Widmung & Verlauf', 'feat.5.body': 'Nach jeder vollen Mala kannst du eine kurze Widmung schreiben. Lokal gespeichert, nach Datum und Sutra geordnet, nur für dich sichtbar.',
      'feat.6.title': 'Geräteintern, ohne Konto', 'feat.6.body': 'Keine Anmeldung, kein Cloud-Upload zu uns, keine Analytik. Einstellungen, Fortschritt, Widmungen und Schreibstriche bleiben auf deinem iPhone / iPad — und optional in deiner privaten iCloud-Datenbank.',
      'shots.eyebrow': 'Bilder', 'shots.title': 'Jeder Bildschirm wie ein Blatt Papier',
      'shots.lede': 'Farben und Typografie sind aus alten Sutra-Drucken und Holzschnitten geschöpft — nichts Dekoratives.',
      'shots.cap.1': 'Diamant-Sutra lesen', 'shots.cap.2': 'Achtsame Mala', 'shots.cap.3': 'Schreibpraxis', 'shots.cap.4': 'Meditationsklänge', 'shots.cap.5': 'Mala-Bibliothek',
      'lang.label': 'Verfügbare Sprachen',
      'sutras.eyebrow': 'Open Source', 'sutras.title': 'Sutren sind öffentliches Erbe',
      'sutras.lede': 'Jede Textstelle in der App stammt aus einer geprüften gemeinfreien Quellausgabe, manuell und KI-gegengelesen. Der gereinigte Text ist als Markdown auf GitHub für jeden zur Wiederverwendung veröffentlicht.',
      'sutras.heart.title': 'Herz-Sutra · 心经', 'sutras.heart.subtitle': 'Prajñāpāramitā Hṛdaya',
      'sutras.heart.body': '11 Sprachen offen: Chinesisch (vereinf./trad.), Englisch, Japanisch, Koreanisch, Vietnamesisch, Tibetisch, Sanskrit (latein./Devanāgarī), Deutsch, Französisch.',
      'sutras.heart.link': 'Ansehen →',
      'sutras.diamond.title': 'Diamant-Sutra · 金刚经', 'sutras.diamond.subtitle': 'Vajracchedikā Prajñāpāramitā',
      'sutras.diamond.body': '13 Fassungen offen: Kumārajīva und Xuanzang chinesisch + Goddard 1932 englisch, Walleser 1914 deutsch, 9.-Jh. tibetisch und mehr.',
      'sutras.diamond.link': 'Ansehen →',
      'sutras.source.title': 'Quellausgaben', 'sutras.source.subtitle': 'Alle gemeinfrei',
      'sutras.source.body': 'Jede Markdown-Datei nennt im Kopf: Übersetzer, Daten, Quelle, Urheberrechtsbasis und Auswahlbegründung — nutzbar für Forschung, Lehre und Folgeprojekte.',
      'sutras.source.license': 'Lizenz: CC0 1.0 (Public Domain)',
      'priv.eyebrow': 'Datenschutz', 'priv.title': 'Wir wissen nicht, was du liest',
      'priv.body': 'Rushi sammelt keine personenbezogenen Daten. Kein Konto, kein Analytics-SDK, kein Drittanbieter-Tracking. Alle Fortschritte, Perlenzählungen, Widmungen und Schreibstriche bleiben auf deinem Gerät. Optionales iCloud-Sync nutzt deine private CloudKit-Datenbank, Ende-zu-Ende verschlüsselt — auch der Entwickler kann sie nicht lesen.',
      'priv.links': 'Vollständig:', 'priv.link.privacy': 'Datenschutz', 'priv.link.terms': 'Nutzungsbedingungen',
      'cta.title': 'Beginne eine ruhige Praxis',
      'cta.body': 'Die App erscheint bald im App Store. Die Quelltexte sind bereits auf GitHub frei verfügbar.',
      'foot.app': 'App', 'foot.legal': 'Rechtliches', 'foot.links': 'Links', 'foot.repo': 'GitHub', 'foot.feedback': 'Feedback',
      'foot.tagline': 'Eine Perle, ein Atemzug, jetzt',
      'foot.copyright': '© 2026 Rushi · Alle Texte gemeinfrei',
      'foot.fontnote': 'Gesetzt in Noto Serif (SIL OFL 1.1)',
    },

    'fr': {
      htmlLang: 'fr',
      'page.title': 'Rushi — Une perle, un souffle, ici · Sutra du Diamant et du Cœur multilingues',
      'nav.features': 'Fonctions', 'nav.screenshots': 'Écrans', 'nav.sutras': 'Open source', 'nav.privacy': 'Confidentialité', 'nav.github': 'GitHub',
      'hero.title.l1': 'Une perle,', 'hero.title.l2': 'un souffle, ici',
      'hero.lede': "Une appli iPhone et iPad pour lire le Sutra du Diamant et le Sutra du Cœur, avec mâlâ de 108 perles, recopie de sutra et paysages sonores de méditation. Tout reste sur votre appareil — pas de compte, pas de pistage, pas de publicité.",
      'hero.subtitle': "Ainsi ai-je entendu · As I have heard",
      'hero.cta.store': 'App Store · à venir', 'hero.cta.github': 'Voir les sources sur GitHub',
      'hero.meta.iphone': 'iPhone & iPad', 'hero.meta.ios': 'iOS 17 +', 'hero.meta.free': 'Gratuit', 'hero.meta.noads': 'Sans publicité', 'hero.meta.local': 'En local',
      'carousel.prev': 'Précédent', 'carousel.next': 'Suivant',
      'stat.langs': "Langues d’interface", 'stat.translations': 'Traductions', 'stat.beads': 'perles · un tour', 'stat.tracking': 'pistage · 0',
      'feat.eyebrow': 'Fonctions', 'feat.title': 'Un rouleau. Une perle. Une feuille.',
      'feat.lede': "Chaque fonction soutient une seule séance complète. Pas de séries, pas de badges, pas de relances.",
      'feat.1.title': 'Lecture', 'feat.1.body': "Sutra du Diamant (deux traductions chinoises, Kumārajīva et Xuanzang) et Sutra du Cœur, en typographie sérif calligraphique. Chaque passage indique traducteur, édition source et droits ; 17 langues d’interface et 9 traductions de sutras.",
      'feat.2.title': 'Mâlâ', 'feat.2.body': "Perles de bois, jade, bodhi et argent au rendu réaliste, à enfiler librement avec un pendentif. Toucher pour compter ; 108 perles font une dédicace. Le passage en cours défile en arrière-plan.",
      'feat.3.title': 'Recopie', 'feat.3.body': "Une grille de calligraphie épurée avec stylet et tactile. Le texte d’origine apparaît en filigrane ; tracez caractère par caractère, puis enregistrez la feuille terminée.",
      'feat.4.title': 'Sons de méditation', 'feat.4.body': "Poisson de bois, bol chantant, cloche, clochettes, pluie, bambouseraie — chaque boucle s’enchaîne sans rupture, et se superpose à volonté. Sans réseau, hors ligne partout.",
      'feat.5.title': 'Dédicace · historique', 'feat.5.body': "Après chaque mâlâ complet, écrivez une courte intention. Conservé sur l’appareil, classé par date et par sutra, visible par vous seul.",
      'feat.6.title': 'En local, sans compte', 'feat.6.body': "Pas d’inscription, pas de cloud chez nous, pas d’analytique. Préférences, progression, dédicaces et traits restent sur votre iPhone / iPad — et, en option, dans votre base iCloud privée.",
      'shots.eyebrow': 'Écrans', 'shots.title': "Chaque écran se lit comme une feuille de papier",
      'shots.lede': "Les couleurs et la typographie viennent des éditions imprimées et des planches gravées de sutras ; rien de décoratif.",
      'shots.cap.1': 'Lire le Sutra du Diamant', 'shots.cap.2': 'Mâlâ attentif', 'shots.cap.3': 'Recopie', 'shots.cap.4': 'Sons de méditation', 'shots.cap.5': 'Bibliothèque de perles',
      'lang.label': 'Langues disponibles',
      'sutras.eyebrow': 'Open source', 'sutras.title': "Les sutras sont un patrimoine commun",
      'sutras.lede': "Chaque passage de l’app provient d’une édition source vérifiée du domaine public, relue manuellement et par IA. Le texte nettoyé est publié en Markdown sur GitHub, libre de réutilisation.",
      'sutras.heart.title': 'Sutra du Cœur · 心经', 'sutras.heart.subtitle': 'Prajñāpāramitā Hṛdaya',
      'sutras.heart.body': "11 langues ouvertes : chinois (simp/trad), anglais, japonais, coréen, vietnamien, tibétain, sanskrit (latin/devanāgarī), allemand, français.",
      'sutras.heart.link': 'Voir →',
      'sutras.diamond.title': 'Sutra du Diamant · 金刚经', 'sutras.diamond.subtitle': 'Vajracchedikā Prajñāpāramitā',
      'sutras.diamond.body': '13 versions ouvertes : Kumārajīva / Xuanzang en chinois + Goddard 1932 anglais, Walleser 1914 allemand, traduction tibétaine du IXᵉ siècle, etc.',
      'sutras.diamond.link': 'Voir →',
      'sutras.source.title': 'Éditions sources', 'sutras.source.subtitle': 'Toutes du domaine public',
      'sutras.source.body': "Chaque fichier Markdown indique en en-tête : traducteur, dates, URL source, base juridique et raisons du choix — utilisable pour la recherche, l’enseignement et la réutilisation.",
      'sutras.source.license': 'Licence : CC0 1.0 (domaine public)',
      'priv.eyebrow': 'Confidentialité', 'priv.title': "Nous ne savons pas ce que vous lisez",
      'priv.body': "Rushi ne collecte rien. Pas de compte, pas de SDK d’analytique, pas de pistage tiers. Toute progression, comptage de perles, dédicace et trait calligraphié reste sur votre appareil. La synchronisation iCloud (optionnelle) utilise votre base privée CloudKit, chiffrée de bout en bout — illisible par le développeur.",
      'priv.links': 'Texte complet :', 'priv.link.privacy': 'Politique de confidentialité', 'priv.link.terms': "Conditions d’utilisation",
      'cta.title': "Commencez une pratique paisible",
      'cta.body': "L’app arrive bientôt sur l’App Store. Les textes sources sont déjà publics sur GitHub.",
      'foot.app': 'App', 'foot.legal': 'Légal', 'foot.links': 'Liens', 'foot.repo': 'GitHub', 'foot.feedback': 'Retours',
      'foot.tagline': 'Une perle, un souffle, ici',
      'foot.copyright': '© 2026 Rushi · Tous les sutras sont du domaine public',
      'foot.fontnote': 'Composé en Noto Serif (SIL OFL 1.1)',
    },

    'th': {
      htmlLang: 'th',
      'page.title': 'Rushi — หนึ่งเม็ด หนึ่งลมหายใจ ปัจจุบันขณะ · พระสูตรเพชร & พระสูตรหฤทัยหลายภาษา',
      'nav.features': 'คุณสมบัติ', 'nav.screenshots': 'หน้าจอ', 'nav.sutras': 'พระสูตรโอเพนซอร์ส', 'nav.privacy': 'ความเป็นส่วนตัว', 'nav.github': 'GitHub',
      'hero.title.l1': 'หนึ่งเม็ด', 'hero.title.l2': 'หนึ่งลมหายใจ ปัจจุบันขณะ',
      'hero.lede': 'แอป iPhone และ iPad สำหรับการสวดพระสูตรเพชรและพระสูตรหฤทัย พร้อมประคำ 108 เม็ด การคัดพระสูตร และเสียงสมาธิ ทุกอย่างอยู่ในเครื่องของคุณ — ไม่มีบัญชี ไม่ติดตาม ไม่มีโฆษณา',
      'hero.subtitle': 'เอวมฺเม สุตํ · As I have heard',
      'hero.cta.store': 'App Store · เร็ว ๆ นี้', 'hero.cta.github': 'ดูพระสูตรต้นฉบับใน GitHub',
      'hero.meta.iphone': 'iPhone & iPad', 'hero.meta.ios': 'iOS 17 +', 'hero.meta.free': 'ฟรี', 'hero.meta.noads': 'ไม่มีโฆษณา', 'hero.meta.local': 'เก็บในเครื่อง',
      'carousel.prev': 'ก่อนหน้า', 'carousel.next': 'ถัดไป',
      'stat.langs': 'ภาษา UI', 'stat.translations': 'ฉบับแปลพระสูตร', 'stat.beads': 'เม็ด · หนึ่งรอบ', 'stat.tracking': 'ติดตาม · 0',
      'feat.eyebrow': 'คุณสมบัติ', 'feat.title': 'หนึ่งม้วน หนึ่งเม็ด หนึ่งแผ่น',
      'feat.lede': 'ทุกฟังก์ชันออกแบบเพื่อการปฏิบัติที่สมบูรณ์ครั้งเดียว ไม่มีสตรีก ไม่มีตรา ไม่มีการเตือน',
      'feat.1.title': 'อ่านพระสูตร', 'feat.1.body': 'พระสูตรเพชร (สองคำแปลจีนของกุมารชีวะและเสวียนจั้ง) และพระสูตรหฤทัย ในการจัดเรียงแบบเซริฟวิจิตร พร้อมข้อมูลผู้แปล ฉบับต้น และที่มาของลิขสิทธิ์ทุกย่อหน้า',
      'feat.2.title': 'ประคำ', 'feat.2.body': 'เม็ดไม้ หยก โพธิ์ และเงิน เนื้อสัมผัสจริง ร้อยอย่างอิสระแล้วผูกพู่ห้อย แตะเพื่อนับ ครบ 108 เม็ดเป็นหนึ่งการอุทิศ พระสูตรปัจจุบันเลื่อนเงียบ ๆ ที่ฉากหลัง',
      'feat.3.title': 'คัดพระสูตร', 'feat.3.body': 'ตารางช่องสะอาดสำหรับคัดอักษรทีละตัว รองรับสไตลัสและสัมผัส ต้นฉบับจางเป็นแนว ค่อยๆ คัดแล้วบันทึกเป็นแผ่นเก็บไว้',
      'feat.4.title': 'เสียงสมาธิ', 'feat.4.body': 'มู่ยู่ ขัน ระฆัง กระดิ่ง สายฝน ป่าไผ่ — แต่ละลูปต่อเนื่องไร้รอย ซ้อนกันได้อิสระ ไม่ต้องอินเทอร์เน็ต',
      'feat.5.title': 'อุทิศ · ประวัติ', 'feat.5.body': 'จบหนึ่งรอบประคำ บันทึกเจตนาอุทิศได้สั้น ๆ เก็บในเครื่อง จัดตามวันและพระสูตร เห็นได้เฉพาะคุณ',
      'feat.6.title': 'อยู่ในเครื่อง ไม่มีบัญชี', 'feat.6.body': 'ไม่ลงทะเบียน ไม่ส่งเข้าคลาวด์ของเรา ไม่มีการวิเคราะห์ ทุกอย่างอยู่บน iPhone / iPad ของคุณ และอาจซิงก์ผ่านฐานข้อมูล iCloud ส่วนตัวของคุณเอง',
      'shots.eyebrow': 'หน้าจอ', 'shots.title': 'ทุกหน้าจอเหมือนกระดาษเงียบ ๆ หนึ่งแผ่น',
      'shots.lede': 'สีและตัวอักษรมาจากกระดาษพิมพ์พระสูตรและแม่พิมพ์ไม้โบราณ ไม่มีลวดลายตกแต่ง',
      'shots.cap.1': 'อ่านพระสูตรเพชร', 'shots.cap.2': 'ประคำมีสติ', 'shots.cap.3': 'คัดพระสูตรเพื่อความสงบ', 'shots.cap.4': 'เสียงสมาธิ', 'shots.cap.5': 'ห้องสมุดประคำ',
      'lang.label': 'ภาษาที่รองรับ',
      'sutras.eyebrow': 'โอเพนซอร์ส', 'sutras.title': 'พระสูตรเป็นมรดกของส่วนรวม',
      'sutras.lede': 'ทุกข้อความในแอปมาจากฉบับต้นในสาธารณสมบัติที่ตรวจสอบแล้ว ผ่านการตรวจทานโดยมนุษย์และ AI ฉบับที่จัดเรียบร้อยถูกเผยแพร่เป็น Markdown บน GitHub ใช้ซ้ำได้อิสระ',
      'sutras.heart.title': 'พระสูตรหฤทัย · Heart Sutra', 'sutras.heart.subtitle': 'Prajñāpāramitā Hṛdaya',
      'sutras.heart.body': 'เปิดเผย 11 ภาษา: จีน (ตัวย่อ/ตัวเต็ม) อังกฤษ ญี่ปุ่น เกาหลี เวียดนาม ทิเบต สันสกฤต (ลาติน/เทวนาครี) เยอรมัน ฝรั่งเศส',
      'sutras.heart.link': 'ดู →',
      'sutras.diamond.title': 'พระสูตรเพชร · Diamond Sutra', 'sutras.diamond.subtitle': 'Vajracchedikā Prajñāpāramitā',
      'sutras.diamond.body': 'เปิดเผย 13 ฉบับ: คำแปลจีนของกุมารชีวะ/เสวียนจั้ง + Goddard 1932 อังกฤษ Walleser 1914 เยอรมัน คำแปลทิเบตศตวรรษ 9 และฉบับ PD อื่น ๆ',
      'sutras.diamond.link': 'ดู →',
      'sutras.source.title': 'ฉบับต้น', 'sutras.source.subtitle': 'ทั้งหมดในสาธารณสมบัติ',
      'sutras.source.body': 'แต่ละไฟล์ Markdown ระบุที่หัว: ผู้แปล ปี แหล่งที่มา สถานะลิขสิทธิ์ และเหตุผลการเลือก ใช้สำหรับการวิจัย การสอน และการต่อยอด',
      'sutras.source.license': 'สัญญาอนุญาต: CC0 1.0 (สาธารณสมบัติ)',
      'priv.eyebrow': 'ความเป็นส่วนตัว', 'priv.title': 'เราไม่รู้ว่าคุณกำลังอ่านอะไร',
      'priv.body': 'Rushi ไม่เก็บข้อมูลส่วนตัวใด ๆ ไม่มีบัญชี ไม่มี SDK วิเคราะห์ ไม่มีการติดตามจากภายนอก ทุกการก้าวหน้า การนับประคำ การอุทิศ และเส้นคัด อยู่ในเครื่องของคุณเท่านั้น การซิงก์ iCloud (เลือกได้) ใช้ฐานข้อมูลส่วนตัวของคุณเอง เข้ารหัสปลายทางถึงปลายทางโดย Apple',
      'priv.links': 'ฉบับเต็ม:', 'priv.link.privacy': 'นโยบายความเป็นส่วนตัว', 'priv.link.terms': 'ข้อกำหนดการให้บริการ',
      'cta.title': 'เริ่มการปฏิบัติเงียบสงบ',
      'cta.body': 'แอปจะวางจำหน่ายบน App Store เร็ว ๆ นี้ พระสูตรต้นฉบับเปิดเผยบน GitHub แล้ว',
      'foot.app': 'แอป', 'foot.legal': 'กฎหมาย', 'foot.links': 'ลิงก์', 'foot.repo': 'GitHub', 'foot.feedback': 'ข้อเสนอแนะ',
      'foot.tagline': 'หนึ่งเม็ด หนึ่งลมหายใจ ปัจจุบันขณะ',
      'foot.copyright': '© 2026 Rushi · พระสูตรทั้งหมดเป็นสาธารณสมบัติ',
      'foot.fontnote': 'จัดด้วย Noto Serif (SIL OFL 1.1)',
    },
  };

  const langDisplayNames = {
    'zh-Hans': '简体', 'zh-Hant': '繁體', 'en': 'EN',
    'ja': '日本語', 'ko': '한국어', 'vi': 'Tiếng Việt',
    'de': 'Deutsch', 'fr': 'Français', 'th': 'ไทย',
  };

  // ------------------------------------------------------------------
  // Detection: storage > URL hash > navigator.languages > zh-Hans
  // ------------------------------------------------------------------
  function detectLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.includes(stored)) return stored;
    } catch (_) {}

    const hash = (location.hash || '').replace('#lang=', '');
    if (SUPPORTED.includes(hash)) return hash;

    const navList = navigator.languages || [navigator.language || 'en'];
    for (const raw of navList) {
      if (!raw) continue;
      const lower = raw.toLowerCase();
      if (lower.startsWith('zh')) {
        if (lower.includes('hant') || lower.includes('tw') || lower.includes('hk') || lower.includes('mo')) {
          return 'zh-Hant';
        }
        return 'zh-Hans';
      }
      const base = lower.split('-')[0];
      const map = {
        en: 'en', ja: 'ja', ko: 'ko', vi: 'vi',
        de: 'de', fr: 'fr', th: 'th',
      };
      if (map[base]) return map[base];
    }
    return 'zh-Hans';
  }

  function t(lang, key) {
    const node = (dict[lang] && dict[lang][key]) || dict['en'][key] || dict['zh-Hans'][key] || key;
    return node;
  }

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'zh-Hans';
    document.documentElement.lang = dict[lang].htmlLang || lang;
    document.title = t(lang, 'page.title');

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(lang, key);
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      el.innerHTML = t(lang, key);
    });

    // Lang switcher state
    document.querySelectorAll('[data-lang-pill]').forEach((el) => {
      el.classList.toggle('active', el.getAttribute('data-lang-pill') === lang);
    });

    // Carousel posters
    swapCarouselPosters(lang);

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
  }

  function swapCarouselPosters(lang) {
    const folder = POSTER_LANGS.includes(lang) ? lang : 'en';
    document.querySelectorAll('[data-carousel-img]').forEach((img) => {
      const slide = img.getAttribute('data-carousel-img');
      img.src = `./posters/${folder}/${slide}.webp`;
    });
  }

  // ------------------------------------------------------------------
  // Carousel
  // ------------------------------------------------------------------
  function initCarousel() {
    const root = document.querySelector('[data-carousel]');
    if (!root) return;
    const track = root.querySelector('[data-carousel-track]');
    const slidesEls = root.querySelectorAll('[data-carousel-slide]');
    const dotsBox = root.querySelector('[data-carousel-dots]');
    const prev = root.querySelector('[data-carousel-prev]');
    const next = root.querySelector('[data-carousel-next]');

    let idx = 0;
    const total = slidesEls.length;

    // Build dots
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => go(i));
      dotsBox.appendChild(dot);
    }

    function render() {
      track.style.transform = `translateX(${-idx * 100}%)`;
      dotsBox.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === idx);
      });
    }

    function go(i) {
      idx = (i + total) % total;
      render();
    }

    prev.addEventListener('click', () => go(idx - 1));
    next.addEventListener('click', () => go(idx + 1));

    // Touch swipe
    let startX = 0, dx = 0;
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX; dx = 0;
    }, { passive: true });
    track.addEventListener('touchmove', (e) => {
      dx = e.touches[0].clientX - startX;
    }, { passive: true });
    track.addEventListener('touchend', () => {
      if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
    });

    // Keyboard
    root.tabIndex = 0;
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') go(idx - 1);
      if (e.key === 'ArrowRight') go(idx + 1);
    });

    render();
  }

  // ------------------------------------------------------------------
  // Lang switcher rendering (called after DOM ready)
  // ------------------------------------------------------------------
  function buildLangSwitcher() {
    const host = document.querySelector('[data-lang-switcher]');
    if (!host) return;
    SUPPORTED.forEach((lang) => {
      const a = document.createElement('button');
      a.className = 'lang-pill';
      a.setAttribute('data-lang-pill', lang);
      a.textContent = langDisplayNames[lang];
      a.addEventListener('click', () => applyLang(lang));
      host.appendChild(a);
    });
  }

  // ------------------------------------------------------------------
  // Boot
  // ------------------------------------------------------------------
  function boot() {
    buildLangSwitcher();
    initCarousel();
    applyLang(detectLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
