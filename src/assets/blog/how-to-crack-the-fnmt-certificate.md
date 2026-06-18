---
title: 'How to Crack the FNMT Certificate?'
date: 'Aug 7, 2024'
description: 'FNMT Crack is a tool designed to recover the password of a natural person’s FNMT digital certificate by means of a brute force attack.'
category: 'Article'
cover: 'https://i.postimg.cc/rsT6Wjb7/1-I9-Dtk-GKx-YVk-R17-Zx-Xrv-L2w.webp'
tags: ['FNMT', 'Brute Force']
---

![](https://i.postimg.cc/rsT6Wjb7/1-I9-Dtk-GKx-YVk-R17-Zx-Xrv-L2w.webp)

The other day I had the great luck to corrupt my grub, which made me have to reinstall my entire operating system completely since I didn’t have any backups [:(](https://x.com/cpadlab/status/1815829896632979958).

So I had to completely reconfigure my computer and reinstall my digital certificate. To do this, I had to go to my Windows (because I have a dual boot) and export my fnmt certificate from the browser. But when it came to reinstall it on my Linux, I didn’t count on the fact that a year ago I had set a password which I no longer remembered.

From the web page of the Fábrica Nacional de Moneda y Timbre, they informed me that I had to [apply for another certificate](https://shorturl.at/ZrPUR). But for obvious reasons, I did not feel like having to go through the whole tedious process again.

![](https://i.postimg.cc/RF9GLYS1/1-9v6-Nws4sc69q-Jo-Q7u1d-Nxw.webp)

So knowing that it was a local file, I set myself the task of recovering the password and skipping that process. So with a few searches on stackoverflow I came up with a pretty quick solution using john. But the thing is that searching, I saw that there was no tool or script to do this, so I took the way to program it myself.

> If you want to skip the process of how I did it, you can see the repository directly [here](https://github.com/cpadlab/fnmtCrack):

## How does it work?

The fnmt certificate, for the moment is a p12 or pfx certificate, so if at any time it changes, this tool will be useless.

I found that the cryptography library has a module called _load_pkcs12_ in this path: _cryptography.hazmat.primitives.serialization.pkcs12_, so the base of this script would be as follows:

```
try:  
  return pkcs12.load_key_and_certificates(self.certp12, password.encode())  
except Exception:  
  return None
```

What this code does is to try to load the certificate with a specified password since it has to be in bytes. This simplified the process a lot, since the way I managed to crack it, I converted the certificate into a hash with pfx2john and then used john with p12 format to brute force it.

Then, the script simply added some more functions to make a system of threads and a system of blocks to the wordlist to make it a faster and more efficient tool. To do this, each worker had to execute this function:

```
def _worker(self, passwords, found_event, thread_id):  
    for password in passwords:         
        if found_event.is_set():  
            return  
        if self._load(password):  
            found_event.set();return
```

What it does is to cancel the loop if another thread has already discovered it or retry to run the crack function with the corresponding password.

Finally there is a function that reads the wordlist, divides it into blocks and assigns to each worker or each thread its corresponding block of passwords. Each block is calculated according to the number of threads and the number of passwords contained in the file.

```
with open(wordlist_path, 'r', encoding='UTF-8', errors='ignore') as f:  
    passwords = \[line.strip() for line in f\]  
              
found_event = threading.Event()  
block_size = len(passwords) // num_threads + 1  
  
for i in range(num_threads):  
              
    start_index = i \* block_size  
    end_index = min((i + 1) \* block_size, len(passwords))  
    thread_passwords = passwords\[start_index:end_index\]  
  
    thread = threading.Thread(  
        target=self._worker,   
        args=(thread_passwords, found_event, i)  
    )  
  
    threads.append(thread);thread.start()  
  
for thread in threads:thread.join()
```

Otherwise, it performs a series of checks to see if a password is needed or not, adds some arguments to improve the user experience and enhances the code. You can find out yourself by reading code outside the [repository](https://github.com/cpadlab/fnmtCrack)!


Thank you very much for reading, a star in the repository and in the blog is appreciated.

<3 Carlos