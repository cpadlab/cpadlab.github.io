
/* 
# ██╗    ██╗██╗   ██╗ █████╗ ██╗     
# ██║    ██║██║   ██║██╔══██╗██║     
# ██║ █╗ ██║██║   ██║███████║██║     (code by wual)
# ██║███╗██║██║   ██║██╔══██║██║     
# ╚███╔███╔╝╚██████╔╝██║  ██║███████╗
#  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝

# Reverse Shell Generator 'API' JS
# See proyect >> https://github.com/14wual/rsgen
# Follow me >> https://twitter.com/14wual
*/

const selectElement = document.getElementById("dev-rev-sele");
const title = document.getElementById("cs-title");

const ipInput = document.getElementById("cs-input-ip");
const portInput = document.getElementById("cs-input-port");
const ipParagraphs = document.querySelectorAll("#ip");
const portParagraphs = document.querySelectorAll("#port");

var copy_text = ''

ipInput.addEventListener("input", function (event) {
    event.preventDefault();

    const value = ipInput.value;

    ipParagraphs.forEach((ipParagraph) => {ipParagraph.innerText = value;});
});
  
portInput.addEventListener("input", function (event) {
    event.preventDefault();
  
    let value = parseInt(portInput.value);
    if (value <= 0) {document.getElementById("port-err").innerText = 'Oops! This port does not exist on your computer';
    } else if (value > 65536) {document.getElementById("port-err").innerText = 'Oops! This port does not exist on your computer';
    } else {document.getElementById("port-err").innerText = '';}
  
    portParagraphs.forEach((portParagraph) => {portParagraph.innerText = portInput.value;});
});

function hideAllClasses() {

    for (const className in codeDictionary) {
        const elements = document.getElementsByClassName(codeDictionary[className]);
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            element.style.display = "none";
        }
    }
}  

const codeDictionary = {
    None: "rs_none",
    Awk: "rs_awk",
    Bash: "rs_bash",
    Golang: "rs_golang",
    Groovy: "rs_groovy",
    Java: "rs_java",
    Lua: "rs_lua",
    Ncat: "rs_ncat",
    Netcat: "rs_netcat",
    NodeJS: "rs_nodejs",
    Perl: "rs_perl",
    PHP: "rs_php",
    Powershell: "rs_powershell",
    Python: "rs_python",
    Ruby: "rs_ruby",
    Telnet: "rs_telnet",
};

selectElement.addEventListener("change", function () {

    const selectedOption = selectElement.value;
    const className = codeDictionary[selectedOption];

    if (className) {

        hideAllClasses();
        title.textContent = selectedOption;

        const elements = document.getElementsByClassName(className);

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            element.style.display = "block";
        }
    }
});
