
########################
###COLOR.INDEX.PALETE###
########################

# ██╗    ██╗██╗   ██╗ █████╗ ██╗     
# ██║    ██║██║   ██║██╔══██╗██║     
# ██║ █╗ ██║██║   ██║███████║██║     (code by wual)
# ██║███╗██║██║   ██║██╔══██║██║     
# ╚███╔███╔╝╚██████╔╝██║  ██║███████╗
#  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝

# COLOR INDEX PALETE HTML
# See proyect >> https://github.com/14wual/14wual.github.io
# Follow me >> https://twitter.com/14wual

class getColors:

    def __init__(self) -> None:
    
        colors = Colors()

        neon = colors.neon
        basic = colors.basic

        print("Neon: " , neon , "\nBasics: " , basic)

class Colors:

    def __init__(self) -> None:
        
        self.neon = {
            'blue': '#01c4e7',
            'pink': '#e701c4',
            'yellow': '#c4e701',
        }

        self.basic = {
            'bg': '#1c1c1c',
            'white-text': '#f4f4f4',
            'grey-text': '#616161',
            'other': {
                '4d4d4d',
                '393939',
            }
        }

if __name__ == '__main__':
    getColors()