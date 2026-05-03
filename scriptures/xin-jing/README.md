# 心经 / Heart Sutra · Open-source corpus

`Prajñāpāramitā Hṛdaya Sūtra` — The Heart of Perfect Wisdom.

This directory holds the complete set of Heart Sutra translations bundled
with the **如是 Rushi** iOS app, released here as a research- and reuse-friendly
corpus. Every file is a single Markdown document with a YAML front-matter
declaring its translator, source edition, copyright basis and editorial notes.

## Files

| File | Language | Translator / Source |
|------|----------|---------------------|
| `zh-Hans.md` | 简体中文 | 玄奘 (7 c. CE) — 大正藏 T0251 |
| `zh-Hant.md` | 繁體中文 | 玄奘 (7 c. CE) — 大正藏 T0251 |
| `en.md`      | English  | Public-domain English rendering |
| `ja.md`      | 日本語    | 玄奘漢訳 + 漢音読み |
| `ko.md`      | 한국어    | 한국 공유 영역 번역 |
| `vi.md`      | Tiếng Việt | Bản dịch phổ truyền |
| `bo.md`      | བོད་ཡིག    | Toh 21, Derge Kangyur (84000.co) |
| `sa.md`      | Sanskrit  | Latin transliteration of the short recension |
| `sa-Deva.md` | संस्कृत    | Devanagari, short recension |
| `de.md`      | Deutsch   | Public-domain German rendering |
| `fr.md`      | Français  | Public-domain French rendering |

## Front-matter schema

Every file begins with a YAML block that records:

```yaml
---
sutra: "xin-jing"
language: "..."
title_native: "..."
translator: "..."
translator_dates: "..."
source_name: "..."
source_url: "..."
copyright: "public-domain"
copyright_reason: "..."
sourced_date: "YYYY-MM-DD"
status: "final" | "verified" | "ai-cross-reviewed"
practice_mode: "recitation" | "study" | "reference"
notes: "..."
---
```

Use the front matter to verify provenance before redistributing or quoting.

## License

These Markdown files are released under
[**CC0 1.0 Universal — Public Domain Dedication**](https://creativecommons.org/publicdomain/zero/1.0/).

This is consistent with the underlying source editions:

- The Heart Sutra itself is over a millennium old; its translators (Xuanzang
  and earlier) died over thirteen centuries ago, putting the text well beyond
  any copyright term in any jurisdiction.
- The non-Chinese translations bundled here are either anonymous traditional
  liturgical transliterations, or translations from authors / editions whose
  protection terms have likewise expired, or AI-assisted translations whose
  output layer the project does not claim copyright over.

In short: do whatever you want with these files. Redistribute, modify, study,
quote, fork, integrate into other apps. Attribution is appreciated but not
required.

## Why open?

Sutra text *is* public heritage. Locking digitised, proof-read versions
behind app-store walls runs against the spirit of the corpus. Releasing the
exact strings the app ships with means:

- **Verifiability** — anyone can audit what我们 actually display.
- **Reproducibility** — researchers can quote the same paragraph IDs.
- **Reuse** — other apps, study sites, or print projects can adopt without
  re-typing.

If you spot an error or have a better source edition, please open a PR or an
issue at <https://github.com/hooosberg/Rushi/issues>.
