"""Validate the static NeXa RoVe visual tour."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    "index.html",
    "site/styles.css",
    "site/app.js",
]


def split_join(*parts: str) -> str:
    return "".join(parts)


FORBIDDEN = [
    split_join("Ap", "ple"),
    split_join("Ap", "ple", "-inspired"),
    split_join("ap", "ple", "-inspired"),
    split_join("Ap", "ple", " style"),
    split_join("ap", "ple", " style"),
]

BANNED_HYPE = [
    split_join("revol", "utionary"),
    split_join("game", "-changing"),
    split_join("cutting", "-edge"),
    split_join("next", "-generation"),
    split_join("world", "-changing"),
    split_join("break", "through"),
    split_join("future", " of ", "AI"),
    split_join("industry", "-leading"),
]

SCAN_FILES = [
    "index.html",
    "README.md",
    "site/styles.css",
    "site/app.js",
    "site/README.md",
]


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def local_targets_from_html(html: str) -> set[str]:
    patterns = [
        r'<img\s+[^>]*src="([^"]+)"',
        r'<source\s+[^>]*src="([^"]+)"',
        r'<video\s+[^>]*poster="([^"]+)"',
        r'<link\s+[^>]*href="([^"]+)"',
        r'<script\s+[^>]*src="([^"]+)"',
        r'<a\s+[^>]*href="([^"]+)"',
    ]
    targets: set[str] = set()
    for pattern in patterns:
        targets.update(re.findall(pattern, html))
    return targets


def should_check_target(target: str) -> bool:
    if target.startswith(("#", "http://", "https://", "mailto:", "tel:")):
        return False
    if target.startswith("javascript:"):
        return False
    return True


def check_required() -> list[str]:
    errors: list[str] = []
    for item in REQUIRED:
        if not (ROOT / item).is_file():
            errors.append(f"Missing required file: {item}")
    return errors


def check_local_paths() -> list[str]:
    errors: list[str] = []
    html_path = ROOT / "index.html"
    if not html_path.exists():
        return ["index.html is missing; cannot check local paths"]
    html = read(html_path)
    for target in sorted(local_targets_from_html(html)):
        if not should_check_target(target):
            continue
        clean_target = target.split("#", 1)[0]
        if clean_target and not (ROOT / clean_target).exists():
            errors.append(f"Missing local target from index.html: {target}")
    return errors


def check_terms(terms: list[str], label: str) -> list[str]:
    errors: list[str] = []
    for item in SCAN_FILES:
        path = ROOT / item
        if not path.exists():
            continue
        text = read(path)
        for term in terms:
            if term in text:
                errors.append(f"{label} term found in {item}: {term}")
    return errors


def main() -> int:
    checks = {
        "required files": check_required(),
        "local paths": check_local_paths(),
        "forbidden wording": check_terms(FORBIDDEN, "Forbidden"),
        "banned hype": check_terms(BANNED_HYPE, "Banned hype"),
    }

    failed = False
    print("NeXa RoVe static site check")
    for name, errors in checks.items():
        if errors:
            failed = True
            print(f"FAIL: {name}")
            for error in errors:
                print(f"  - {error}")
        else:
            print(f"PASS: {name}")

    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
