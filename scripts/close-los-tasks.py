"""Одноразовый скрипт: закрыть LOS-793…799 в LOS Personal TASK_REGISTRY. Запуск на сервере LOS."""
import sys

sys.path.insert(0, "/opt/los")

import sheets

SPREADSHEET_ID = "19Sj4YBYORxusWqhxbZy2vZ5QqC6w40BUdp9CO5RIb3o"
IDS = {"LOS-793", "LOS-794", "LOS-795", "LOS-796", "LOS-797", "LOS-798", "LOS-799"}
CLOSED_AT = "07.05.2026 09:00:00"


def main():
    gc = sheets.get_client()
    ws = sheets.get_worksheet(gc, SPREADSHEET_ID, "TASK_REGISTRY")
    allv = ws.get_all_values()
    if not allv:
        print("empty sheet")
        return 1
    headers = allv[0]
    id_col = headers.index("ID")
    updated = []
    for row_idx, row in enumerate(allv[1:], start=2):
        if len(row) <= id_col:
            continue
        tid = row[id_col].strip()
        if tid in IDS:
            sheets.batch_update_row(
                ws,
                row_idx,
                {"STATUS": "DONE", "CLOSED_AT": CLOSED_AT},
                headers,
            )
            updated.append(tid)
    print("updated:", ", ".join(updated))
    missing = IDS - set(updated)
    if missing:
        print("WARNING missing IDs:", missing)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
