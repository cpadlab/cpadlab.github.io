---
title: 'Capture! ByPass — THM Script'
date: 'Jan 30, 2024'
description: 'Can you bypass the login form?'
category: 'Walkthrough'
cover: 'https://i.postimg.cc/g2z4F8JG/0-ZZo-O8YO7VL4I7i9F.webp'
tags: [ 'Pentesting', 'Ctf', 'Python', 'Bypass', 'Tryhackme',]
---

**Github Repo**: [https://github.com/cpadlab/capture](https://github.com/cpadlab/capture)

**Room Link**: [https://tryhackme.com/room/capture](https://tryhackme.com/room/capture)

---

```
#!/usr/bin/env python3

# -*- coding: utf-8 -*-
# ====================================================================================================
# CTF Bypass Script for TryHackMe (CTF) Room - "Capture!" - https://tryhackme.com/room/capture
# This script automates the process of bypassing login credentials in a CTF environment,
# Specifically designed for the "Capture this!" CTF room on TryHackMe.
# ====================================================================================================
#  Author: CARLOS PADILLA (14wual)
# ====================================================================================================

import functools, argparse, os, importlib, requests
from datetime import datetime
from bs4 import BeautifulSoup
import re, webbrowser, time
from colorama import Fore, Style, init

init()
class ArgsError(Exception):pass

# Proyect Info
PROYECT_TITLE = 'Capture!ByPass'
AUTHOR = 'Carlos Padilla'
AUTHOR_NICKNAME = '14wual'
AUTHOR_URL = 'https://14wual.github.io/'
...

   _____                _                   _ 
  / ____|   /\         | |  ByPass Script  | |
 | |       /  \   _ __ | |_ _ __ _   _  ___| |
 | |      / /\ \ | '_ \| __| '__| | | |/ _ \ |
 | |____ / ____ \| |_) | |_| |  | |_| |  __/_|
  \_____/_/    \_\ .__/ \__|_|   \__,_|\___(_)
                 | |                          
                 |_| (Code by 14Wual)
...
class ByPass(Boot):
    """
    ByPass class extending Boot for automated login bypass attempts.

    Attributes:
    - errors: Counter for tracking the number of errors during requests.
    - username: Discovered username during the process.
    - password: Discovered password during the process.

    Methods:
    - __init__: Initializes the ByPass instance and performs the automated login bypass.
    - sendRequest: Sends a login request to the specified URL with provided credentials and captcha.
    - discoverPass: Attempts to discover the password for a given username.
    - getCaptcha: Extracts and returns the captcha expression from the response HTML.
    - resolveCaptcha: Evaluates the captcha expression and returns the result.
    - EnableCaptcha: Enables captcha by sending requests until it is triggered, returns the captcha expression.
    - discoverUser: Attempts to discover a valid username with a test password and captcha.
    """
...
if __name__ == '__main__':
    ...
    ByPass()
```

```
git clone https://github.com/14wual/capture/
cd capture/ && pip install -r requirements.txt
```

<3 Carlos