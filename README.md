# 如是 Rushi

> 一念一珠，安住当下 · One bead, one breath, one moment

[**官网**](https://hooosberg.github.io/Rushi/) · [**隐私政策**](https://hooosberg.github.io/Rushi/privacy.html) · [**服务条款**](https://hooosberg.github.io/Rushi/terms.html)

**如是 (Rushi)** 是一款 iPhone / iPad 上的清净修持应用：金刚经 / 心经多语种诵读、108 颗念珠、抄经面板、冥想音景。所有数据保存在设备本地，不联系任何外部服务器。

> 「如是我闻。一时，佛在舍卫国祇树给孤独园…」 —— 金刚经

## 这个仓库放什么？

这个仓库**不是**整个 iOS 应用的源代码。它包含的是：

- **`/`（根目录）** — 应用官网（GitHub Pages 自动构建），含隐私政策、服务条款、宣传材料。
- **[`scriptures/`](./scriptures/)** — 应用内显示的所有经文文本，作为开源公共财释出。每个文件带 YAML front-matter 记录译者、底本、版权来源和编辑说明。

iOS 应用本身的 Swift 源码暂未公开，未来视情况开放。

## 已开源的经文

| 经文 | 状态 | 译本数 | 链接 |
|------|------|--------|------|
| 心经 Heart Sutra | ✅ 完整开源 | 11 种语言 | [`scriptures/xin-jing/`](./scriptures/xin-jing/) |
| 金刚经 Diamond Sutra | ✅ 完整开源 | 13 个版本（含鸠摩罗什 / 玄奘双汉译） | [`scriptures/jingang-jing/`](./scriptures/jingang-jing/) |

## 许可

- **`scriptures/`** 下所有 Markdown 文件：[CC0 1.0 Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/) — 自由使用，无需署名。底层经文出自公有领域（古译者圆寂超过千年，现代外文译本均超过版权期）。
- **网站文件**（HTML / CSS / 图片）：保留所有权利 © 2026 Rushi。如要复用样式或文字，请通过 issue 联系。
- **app icon 和宣传海报**：保留所有权利。

## 应用介绍

### 功能

- **读经** — 金刚经（鸠摩罗什 / 玄奘两种汉译）+ 心经，呈现于书法衬线排版。可切换 17 种界面语言、9 种经文译本，每段标注完整出处。
- **念珠** — 真实质感的木珠 / 玉珠 / 菩提子 / 银饰；自由组合搭配挂饰；点击计数，108 颗一回向；背景同步显示当前所读经文段落。
- **抄经** — 一字一格清净抄经面板，支持手写笔与触屏；原文淡字底+依次描红。
- **冥想音景** — 木鱼、磬、钟、铃铛、雨、竹林；离线即可静坐。
- **回向** — 每完成一回念珠，写下当下意图，私密保存于设备。

### 隐私

- 不收集任何个人信息（Apple App Store 隐私标签：**Data Not Collected**）。
- 不联系任何外部服务器；无网络请求、无分析 SDK、无第三方追踪、无广告。
- 所有数据仅保存在 app sandbox。可选 iCloud 同步使用 Apple 私人数据库（端到端加密）。

完整：[隐私政策](https://hooosberg.github.io/Rushi/privacy.html)

### 字体

应用捆绑 [Noto Serif CJK SC / TC](https://github.com/notofonts/noto-cjk) 字体子集，[SIL Open Font License 1.1](https://scripts.sil.org/OFL)。

## 反馈

- **GitHub Issues**：[hooosberg/Rushi/issues](https://github.com/hooosberg/Rushi/issues)
- **Email**：rushi.app@protonmail.com

如经文有任何错字、版权疑问或更佳底本，请直接开 issue 或 PR。
