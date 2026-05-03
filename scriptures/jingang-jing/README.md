# 金刚经 / Diamond Sutra · Open-source corpus

`Vajracchedikā Prajñāpāramitā Sūtra` — The Diamond That Cuts Through Illusion.

This directory holds every Diamond Sutra translation bundled with the **如是
Rushi** iOS app, released here as a research- and reuse-friendly corpus.
Every file is a Markdown document with a YAML front-matter declaring its
translator, source edition, copyright basis, and editorial notes.

## Files

| File | Lang | Translator / Edition | Source basis |
|------|------|----------------------|---------------|
| `zh-Hans_kumarajiva.md` | 简体 | 鸠摩罗什 (344–413) | 大正藏 T0235 · zh.wikisource |
| `zh-Hant_kumarajiva.md` | 繁體 | 鳩摩羅什 (344–413) | 大正藏 T0235 · zh.wikisource |
| `zh-Hans_xuanzang.md`   | 简体 | 玄奘 (602–664)      | 大般若经第九会 · 大正藏 T0220 |
| `zh-Hant_xuanzang.md`   | 繁體 | 玄奘 (602–664)      | 大般若經第九會 · 大正藏 T0220 |
| `en.md`  | English | Dwight Goddard 1932 (after Wm. Gemmell 1912) | A Buddhist Bible (PD: 1909-era no-renewal) |
| `de.md`  | Deutsch | Max Walleser 1914 | "Prajñāpāramitā: die Vollkommenheit der Erkenntnis", Vandenhoeck & Ruprecht, Göttingen |
| `fr.md`  | Français | Public-domain liturgical rendering | — |
| `ja.md`  | 日本語  | 国民文庫刊行会 編 1935 | 国訳大蔵経 経部 第3巻 · NDL pid 1207201 |
| `ko.md`  | 한국어  | 백용성 (Baek Yongseong) 1922 | 신역대장경 金剛摩訶般若波羅蜜經 · KABC |
| `vi.md`  | Tiếng Việt | Anonymous Sino-Vietnamese liturgical transliteration | Hán-Việt traditional recitation form |
| `bo.md`  | བོད་ཡིག    | 9-c. Tibetan translation team | Toh 16, Derge Kangyur · Esukhia/UVA-SOAS eKangyur |
| `sa.md`     | Sanskrit (Latin) | (anonymous transliteration) | short recension |
| `sa-Deva.md`| संस्कृत (Devanagari) | (anonymous) | short recension |

## Front-matter schema

```yaml
---
sutra: "jingang-jing"
language: "..."
variant: "..."                  # optional: kumarajiva | xuanzang | goddard-1932-buddhist-bible …
title_native: "..."
translator: "..."
translator_dates: "..."
source_name: "..."
source_url: "..."
source_secondary: "..."         # optional alternate digitisation URL
source_pages: "..."             # optional NDL/IIIF pid range
copyright: "public-domain"      # always — no copyrighted text is bundled
copyright_reason: |
  Detailed evidence for the public-domain status: translator dates, edition
  publication year, jurisdiction-by-jurisdiction reasoning (US 95-yr cutoff,
  EU pma-70, etc.), URAA review where applicable.
sourced_date: "YYYY-MM-DD"
sourced_by: "..."
status: "final" | "verified" | "ai-cross-reviewed"
practice_mode: "recitation" | "study" | "reference"
practice_subcategory: "heritage" | "modern" | "scholarly"
version_notice: "Short prose paragraph describing the edition's character."
notes: "Editorial notes — what was normalised, what was preserved, etc."
---
```

## Notable source decisions

- **Two Chinese variants**. Kumārajīva (5 c.) is the canonical liturgical
  text used in Sino-Mahāyāna recitation; Xuanzang (7 c.) is the more
  literal philological translation from his Mahā-prajñāpāramitā compendium.
  We ship both so the reader can compare.
- **English: Goddard 1932** rather than a contemporary translation. Goddard
  did not file a US copyright renewal for *A Buddhist Bible*, placing it in
  the public domain under 1909–1976 era law (confirmed via Stanford
  Copyright Renewal Database lookup and John Bruno Hare's sacred-texts.com
  attribution). Goddard's edition itself rests on William Gemmell's 1912
  Diamond Sutra translation (also pre-1928 PD). Both layers therefore PD,
  free for commercial as well as research use.
- **German: Walleser 1914** — Max Walleser (1874–1954) is post-1955 PD in
  the EU under 70 years pma; the 1914 publication is also pre-1928 in the
  US.
- **Tibetan: Derge Kangyur** via the Esukhia / UVA-SOAS eKangyur digital
  edition, which explicitly dedicates its mechanical reproduction to the
  public domain.
- **Japanese: Kokuyaku Daizōkyō 1935** (NDL pid 1207201), marked PDM by
  Japan's National Diet Library. There is no daily-recitation Japanese
  liturgical form of the Diamond Sutra (Japanese schools recite the Heart
  Sutra instead), so this is a study text rather than a recitation text.
- **Korean: Baek Yongseong (백용성) 1922** Sino-Korean Sinyeok Daejanggyeong.
  Baek (1864–1940) died in 1940; under Korean copyright (currently 70 years
  pma) the text expired in 2010, and was already PD at the URAA cutoff for
  US purposes. Modern Hangul translations (e.g. the 1992 Jogye standard)
  were intentionally avoided due to active copyright.

The full reasoning for every file is in its YAML front-matter.

## License

All `.md` files in this directory are released under
[**CC0 1.0 Universal — Public Domain Dedication**](https://creativecommons.org/publicdomain/zero/1.0/).

## Contributions

If you spot an error, have a better source edition, or want to contribute a
new language version backed by a verifiable PD source, please open a PR or
issue at <https://github.com/hooosberg/Rushi/issues>.
