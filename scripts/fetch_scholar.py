"""Fetch citation stats from Google Scholar and write src/data/scholar.json.

Runs in CI before `vite build`. Tolerant by design: any failure keeps the
previously committed scholar.json values, so a Scholar CAPTCHA or network
error never breaks deployment.
"""

import json
import re
import sys
import urllib.request
from datetime import date
from pathlib import Path

SCHOLAR_URL = "https://scholar.google.com/citations?user=Fjo72tUAAAAJ&hl=en"
OUT = Path(__file__).resolve().parent.parent / "src" / "data" / "scholar.json"


def main() -> int:
    req = urllib.request.Request(
        SCHOLAR_URL,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                "(KHTML, like Gecko) Chrome/126.0 Safari/537.36"
            )
        },
    )
    try:
        html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")
    except Exception as e:  # noqa: BLE001
        print(f"[fetch_scholar] request failed, keeping old values: {e}")
        return 0

    # Stats table cells: [citations_all, citations_recent, h_all, h_recent, i10_all, i10_recent]
    values = re.findall(r'<td class="gsc_rsb_std">(\d+)</td>', html)
    if len(values) < 5:
        print("[fetch_scholar] stats table not found (possible CAPTCHA), keeping old values")
        return 0

    data = {
        "citations": int(values[0]),
        "hIndex": int(values[2]),
        "i10Index": int(values[4]),
        "updatedAt": date.today().isoformat(),
    }
    OUT.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    print(f"[fetch_scholar] updated: {data}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
