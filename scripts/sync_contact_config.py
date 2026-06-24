import re
import subprocess
import sys

SSH_KEY = "C:/Users/Pavel/.ssh/id_ed25519"

env_raw = subprocess.check_output(
    [
        "ssh",
        "-i",
        SSH_KEY,
        "-o",
        "BatchMode=yes",
        "root@178.62.230.241",
        "grep -E ^TELEGRAM /opt/los/.env",
    ],
    text=True,
)


def get(key: str) -> str:
    for line in env_raw.splitlines():
        if line.startswith(key + "="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    return ""


tok = get("TELEGRAM_BOT_TOKEN")
chat = get("TELEGRAM_CHAT_ID")
if not tok or not chat:
    sys.exit("missing telegram vars")

php = f"""<?php
$TO_EMAIL = 'wwwfrolof@yandex.ru';
$SITE_NAME = 'pavelfrolof.ru';
$TELEGRAM_BOT_TOKEN = '{tok}';
$TELEGRAM_CHAT_ID = '{chat}';
"""

subprocess.run(
    [
        "ssh",
        "-i",
        SSH_KEY,
        "-o",
        "BatchMode=yes",
        "frolof@novoe.online",
        "cat > ~/pavelfrolof.ru/contact_config.php && chmod 600 ~/pavelfrolof.ru/contact_config.php",
    ],
    input=php,
    text=True,
    check=True,
)
print("contact_config.php updated on Timeweb")
