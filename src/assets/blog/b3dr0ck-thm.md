---
title: 'b3dr0ck — THM WriteUp'
date: 'May 20, 2024'
description: 'Server trouble in Bedrock.'
category: 'Walkthrough'
cover: 'https://i.postimg.cc/13c2t1VF/0-u5Jv-SYNCk91la-Zi-X.webp'
tags: [ 'Thm', 'B3dr0ck', 'Writeup', 'Pentesting', 'Walkthrough' ]
---

## Fred Flintstone & Barney Rubble!

Barney is setting up the ABC webserver, and trying to use TLS certs to secure connections, but he’s having trouble. Here’s what we know…

- He was able to establish nginx on port 80, redirecting to a custom TLS webserver on port 4040
- There is a TCP socket listening with a simple service to help retrieve TLS credential files (client key & certificate)
- There is another TCP (TLS) helper service listening for authorized connections using files obtained from the above service
- Can you find all the Easter eggs?

---

## What is the barney.txt flag?

I start the machine by performing a port scan with nmap:

```
└─$ sudo nmap -p- -sCV -vvv -T4 10.10.66.42 -oN nmap.txt
```

This is the result:

```
PORT      STATE SERVICE      REASON         VERSION
22/tcp    open  ssh          syn-ack ttl 63 OpenSSH 8.2p1 Ubuntu 4ubuntu0.4 (Ubuntu Linux; protocol 2.0)
80/tcp    open  http         syn-ack ttl 63 nginx 1.18.0 (Ubuntu)
4040/tcp  open  ssl/yo-main? syn-ack ttl 63
9009/tcp  open  pichat?      syn-ack ttl 63
54321/tcp open  ssl/unknown  syn-ack ttl 63
```

If we try to enter the web server on port 80, it will redirect us to an https server on port 4040 where we find:

![](https://i.postimg.cc/Wpk9zcQ4/1-7Ef8-7hfn1l-VWezw-BCNTj-Q.webp)

When we connect through port 9009 via nc:

```
└─$ nc 10.10.66.42 9009
```

![](https://i.postimg.cc/kgnwT6DZ/1-6Cy-I11Ve-Ernox-Uqz-LEb-Mlw.webp)

If we read well, it tells us that this service returns the certificate and a private key:

```
You use this service to recover your client certificate and private key
```

If we write `key` or `certificate`, will return:

```
-----BEGIN CERTIFICATE-----
MIICoTCCAYkCAgTSMA0GCSqGSIb3DQEBCwUAMBQxEjAQBgNVBAMMCWxvY2FsaG9z
dDAeFw0yNDA1MjAxMDQxMTFaFw0yNTA1MjAxMDQxMTFaMBgxFjAUBgNVBAMMDUJh
cm5leSBSdWJibGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDAcM82
bISiWho9HI0qhsCaAAd/z2owDPVo7InuIDGHFDQ0oLrG0VPWJAqr4ueVq8mtHqjz
OjtTf8j3lMPGZuTA9Q90OglSFwL/M9EOAlRuQyzvdvDFWXbqgCfDU3RO3ySzuWda
t7npLeVWRB7ung7ZyXnN822hMfCwosW9kcCvWBfubgsz9pZ5ZdEApu5eK4A/ZOXZ
Vm5njnTvVfgcPAnxyuBN175D5Qw3r3JjXwbJBCE4ukImZ1WKObJ6RQQ76ns+Veah
/uIcqeeDq2+w9vgZbrBWkmLmUA7/AMyFZjgX2g+F0sSiEWHBPz9p2HtqbnQT+qyQ
huRfU02b4nztcjJXAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAB6lvdtc67Ii6TIR
BilcApxdh7PX/cis3gPDe1Gt3lSTBwLNLURH4rv9VfnU/ppM4EBBs13orGYdljtZ
GwnJEqXxRm7O4RqbeIbsR2U1r9mHnqwF/7kW2fPtc6k28M8avihex/r80xTTshff
buJCV5rvNQ9s1K/vxicETC/e5nJREeUAW7eZ2NQjUznGlZvYxEDlUce7vD3mWy0k
IWoP6xzhdfa1MpAEedQOyk/FC4+G43/SNkpFYbTJQE2JOjAuLq1FIhNdTB9xszsQ
pcoyZx524eCSCplwqzOMKWc0l7yjT+/kIBDtYpfkOUFF7xurwr6XeeV0uNkAjwoB
rVbkFZE=
-----END CERTIFICATE-----
```

```
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAwHDPNmyEoloaPRyNKobAmgAHf89qMAz1aOyJ7iAxhxQ0NKC6
xtFT1iQKq+LnlavJrR6o8zo7U3/I95TDxmbkwPUPdDoJUhcC/zPRDgJUbkMs73bw
xVl26oAnw1N0Tt8ks7lnWre56S3lVkQe7p4O2cl5zfNtoTHwsKLFvZHAr1gX7m4L
M/aWeWXRAKbuXiuAP2Tl2VZuZ45071X4HDwJ8crgTde+Q+UMN69yY18GyQQhOLpC
JmdVijmyekUEO+p7PlXmof7iHKnng6tvsPb4GW6wVpJi5lAO/wDMhWY4F9oPhdLE
ohFhwT8/adh7am50E/qskIbkX1NNm+J87XIyVwIDAQABAoIBACwKJQGZeAkHgbW2
kP/Ics9Lbmvrdaula4wlhbM/HtaA4ymgFt5lDUCWYvLPLJxuAetidtui2ezT85Pl
MaB376XQ70Zz+aoVphPtMcx48AWDzgbHO3aOcM5dobvrn1RlcKrIpUR3g04/uJoz
YLjO5yskFoHxUYdwPFrQBVzKvEPkCWxBYJjLYlfOBHdwWPnNx33l3iQQl2Tgz9hg
D17p8fibrTJtPxcrNIaX8+4jXJHjC9kqkQ5H9mG7NGGOMVfZ+knLmIZhv4ptM9yF
3ML93rXSv6nEuLaGBz9hMQle6PQK0U7q2f9tzXYfgJG61vawXeW5A2ihoPLIu/xC
CeF/PnECgYEA6bcWQAOH1//rv1IfRgVfhwaHCQBQNKEsq+Fkn+Qd5B2cyjb1Aovm
7GOWQL6M7MizRdkJSdP2iofmQBj3LI9+uv4K9BiX5l3d6DMCXJ+mxNtfqmhCxPiT
h6OwDCj2ix/JH+PUIfRAvCQlKoBS4WxeuUHZZKrPyO59B+KZUZ+f3gUCgYEA0so5
f7UXvcV+6XoDDxlsiTijfHpHePBm9kRTdhK/mtgT5+Yp0Qw9a9KoDVHPOM5ya0Ln
7Z9V+8Nh/NST8kQkKVTYgwI2KuMBJSUAt/kiBEYf3KY9RtJYX0E6AitYzDkaTQnf
n2Wd5yAkCcMgeSjqea8oQoJ1bt3g+oBGb421YasCgYBXv7QM6MZyJNZAiPbQ9Wd+
bMb6bDGw8OqyxfdfyOgoI64ghi3LfPeAvYtGV8TVii01Bl3kaD7imE+stTLoeh/c
2VEHgMxXY9rTOYOjfxXAR5VNh8O57JKHlL+ecSrP5WlAHewhq3E6sl9566AyntuZ
ts2GbFODX3d2JG/oI4SEeQKBgCdI1Qp9/5y4j/yHZsaLoHS6f42VZHifpTDEbyGU
QO1k0+DmPmjddR0BN5yz4IDfyOdAouTgSzAOq9Zo7+G43VxumaNg6CN6Bx6bFNU0
syhEwW9n9Aec8CdgiqUY2wXEpqgw7OJSF+mZTd4b5ZNvErP29vPeSHCPHXzSJ05n
BKTdAoGBAM8e6URDWr6kQuiNp0dO1/9hRF0bX3/LKRc4rSuAhr87LLBspBm9TK1X
QukgocvWuEw3wwYaFS2VvR9sttml0FoCbQEQJySD0IqFSLEb77p733yCewWAaRBC
H3eISjXZxRjwAcI74UdEUOc5EViB+M0adrz7v9S+uP2IeYbW7E5O
-----END RSA PRIVATE KEY-----
```

In this way we obtain these two files. Now, we save the files and follow the instructions of the server:

```
socat stdio ssl:MACHINE_IP:54321,cert=<CERT_FILE>,key=<KEY_FILE>,verify=0
```

![](https://i.postimg.cc/9FcG232n/1-Rgs-Zex6ra-XNbkd9x2c-Li9w.webp)

Typing `help` or `passwd` returns Barney’s username and password. With this password we will be able to log in by ssh later.

```
Welcome: 'Barney Rubble' is authorized.
b3dr0ck> help
Password hint: d1ad7c0a3805955a35eb260dab4180dd (user = 'Barney Rubble')
b3dr0ck> passwd
Password hint: d1ad7c0a3805955a35eb260dab4180dd (user = 'Barney Rubble')
```

![](https://i.postimg.cc/3N10NR7d/1-9Lgti-Dp-Frf-U7l-Gf-PG6fg-Og.webp)

In this way we obtain the barney flag.

**Flag**: THM{f05780f08f0eb1de65023069d0e4c90c}

---

## What is fred’s password?

Using the command `sudo -l` we know that we can execute `/usr/bin/certutil` with the user sudo.

Looking for a bit of information, this [app manages certificates](https://manpages.ubuntu.com/manpages/xenial/en/man1/certutil.1.html).

By listing them with their command we get this:

```
barney@b3dr0ck:~$ sudo -u root /usr/bin/certutil ls
```

![](https://i.postimg.cc/pXgR8vdG/1-c7SRKd-XXAV5E64Bo-X9x-IVA.webp)

Now, we will regenerate the certificate of the other user of the system (fred) to repeat the same process that we have done to obtain Barney’s password.

```
barney@b3dr0ck:~$ sudo -u root /usr/bin/certutil -a fred.csr.pem
```

![](https://i.postimg.cc/T2s6Mxnd/1-GRml4UI9nw-J-C-6-4q-Cu-UQ.webp)

Save the files and repeat the same process with port 54321.

![](https://i.postimg.cc/v8CZ7fqt/1-az-Qy-HW2c6yf-Xctqo-Z8kazw.webp)

**Password**: YabbaDabbaD0000!

---

What is the fred.txt flag?
Once we have the password we can start using ssh or changing the user to the user fred:

![](https://i.postimg.cc/28ff8wXN/1-EDZx-D2Fhj-RW-r-Htmq-1BEg.webp)

**Flag**: THM{08da34e619da839b154521da7323559d}

---

## What is the root.txt flag?

This is the output of sudo -l

```
fred@b3dr0ck:~$ sudo -l
Matching Defaults entries for fred on b3dr0ck:
    insults, env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User fred may run the following commands on b3dr0ck:
    (ALL : ALL) NOPASSWD: /usr/bin/base32 /root/pass.txt
    (ALL : ALL) NOPASSWD: /usr/bin/base64 /root/pass.txt
```

```
fred@b3dr0ck:~$ sudo -u root /usr/bin/base64 /root/pass.txt
TEZLRUM1MlpLUkNYU1dLWElaVlU0M0tKR05NWFVSSlNMRldWUzUyT1BKQVhVVExOSkpWVTJSQ1dO
QkdYVVJUTEpaS0ZTU1lLCg==
```

We will [go to cibercheff](https://gchq.github.io/CyberChef/) and using base64 decoder and magic we will get a hash in md5 with the root password

![](https://i.postimg.cc/GtCSrM3S/1-C0Wd2mq-YEp-Z-xrb4mu4Vaw.webp)

![](https://i.postimg.cc/X7xDSkM4/1-w-Oub-FVCky8FVf-MHTy-NLzng.webp)

![](https://i.postimg.cc/Tw8tqkbP/1-l-Kd-QVi-Iom-Hfn-MBHc-Sox-Zw.webp)

**Root Password**: flintstonesvitamins

![](https://i.postimg.cc/jq4MP4SJ/1-h6HJs-L-ra4VQx-Bd-Q6F3EXg.webp)

**Flag**: THM{de4043c009214b56279982bf10a661b7}

<3 Carlos