# 🔐 Security Policy – Mediaagni Password Checker

This document outlines the security practices, principles, and reporting process for vulnerabilities found in Mediaagni Password Checker.

---

## 📌 Scope

This security policy applies to all components of **MediaAgni Password Checker**, including:

- Source code - Mediaagni Password Checker
- Web deployment at [mediaagni.com](https://www.mediaagni.com)
- Password strength scoring logic
- Breach checking using HIBP API

---

## 🔒 Security Principles

We are committed to user safety and privacy. This tool is designed with the following principles:

- ✅ **Client-Side Only**: All logic runs fully in the user's browser (no backend processing).
- ❌ **No Data Storage**: Passwords are never stored, logged, or transmitted in full.
- ✅ **k-Anonymity Protection**: Breach checks are implemented using the k-anonymity model via [Have I Been Pwned](https://haveibeenpwned.com/API/v3#PwnedPasswords), sending only the first 5 characters of the SHA-1 hash.
- 🔍 **Transparent & Open Source**: The full source code is publicly available for review.
- 📦 **No External Analytics**: No tracking or fingerprinting is performed on users.

---

## 📣 Reporting a Vulnerability

If you discover a security vulnerability or privacy concern, please report it responsibly:

- 📧 Email: [mediaagni20@gmail.com](mailto:mediaagni@gmail.com)
- 📬 Alternatively: [Contact Form](https://www.mediaagni.com/p/blog-page_10.html)

We encourage responsible disclosure and request that vulnerabilities are not publicly disclosed without giving us adequate time to resolve the issue.

---

## ⏱️ Response Timeline

- **Initial response**: Within **3–5 business days**
- **Patch timeline**: Based on severity, patches will be prioritized and released accordingly

---

## ✅ Internal Audit

The latest version (v2.3.1) has been internally reviewed and tested against:

- Unintended data leaks
- Excessive API calls (rate-limiting)
- Unsafe `innerHTML` usage
- Clipboard and localStorage abuse
- Insecure third-party dependencies (none used)

---

## 🧾 Public Commitment

We aim to create a safe, respectful, and private experience for all users.  
If you have concerns, questions, or suggestions, we welcome your feedback and collaboration.

_Last reviewed: April 2025_  
_Maintainer: [Ferizco](https://github.com/ferizco)_

